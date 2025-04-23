import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  Observable,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { getAuth } from "firebase/auth";

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_HASURA_ENDPOINT,
});

const authLink = setContext(async (_, { headers }) => {
  const user = getAuth().currentUser;
  if (!user) return { headers };
  const token = await user.getIdToken(false);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

let isRefreshing = false;
let pending: Array<() => void> = [];

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (
    graphQLErrors?.some(
      (e) =>
        e.extensions?.code === "UNAUTHENTICATED" ||
        /jwt expired/i.test(e.message)
    )
  ) {
    return new Observable((observer) => {
      pending.push(() => {
        const old = operation.getContext().headers || {};
        operation.setContext({
          headers: {
            ...old,
            authorization: `Bearer ${
              getAuth().currentUser?.refreshToken
                ? localStorage.getItem("token")
                : ""
            }`,
          },
        });
        forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      });

      if (!isRefreshing) {
        isRefreshing = true;
        // force a fresh ID token
        getAuth()
          .currentUser!.getIdToken(true)
          .then((newToken) => {
            localStorage.setItem("token", newToken);
            isRefreshing = false;
            pending.forEach((cb) => cb());
            pending = [];
          })
          .catch((err) => {
            isRefreshing = false;
            pending = [];
            observer.error(err);
          });
      }
    });
  }
});

const link = ApolloLink.from([errorLink, authLink, httpLink]);

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
