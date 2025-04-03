import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router";
import { ApolloProvider, gql } from "@apollo/client";
import client from "@/api/client.ts";

// const client = ...

client
  .query({
    query: gql`
      query fetchUsers {
        users {
          phone_number
        }
      }
    `,
  })
  .then((result) => console.log(result));

createRoot(document.getElementById("root")!).render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
