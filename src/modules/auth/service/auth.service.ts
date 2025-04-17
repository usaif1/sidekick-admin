import { auth } from "@/firebase";
import { signInWithEmailAndPassword, signOut, User } from "firebase/auth";

type HasuraClaims = {
  "https://hasura.io/jwt/claims": {
    "x-hasura-default-role": string;
  };
};

export const signin = async (
  email: string,
  password: string
): Promise<{ token: string; user: User; roles: string }> => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  const { claims } = await user.getIdTokenResult(true);

  const hasuraClaims = (claims as HasuraClaims)["https://hasura.io/jwt/claims"];
  const role = hasuraClaims?.["x-hasura-default-role"];

  if (role !== "manager") {
    throw new Error("You need to register as a user to continue");
  }

  const token = await user.getIdToken();

  return { token, user, roles: role };
};

export const signOutUser = async () => {
  await signOut(auth);
};
