import { getAuth } from "firebase/auth";

type HasuraJwtClaims = {
  "x-hasura-organization-id": string;
  "x-hasura-user-id"?: string;
  "x-hasura-default-role"?: string;
  "x-hasura-allowed-roles"?: string[];
};

export const getOrgIdFromClaims = async (): Promise<string> => {
  const user = getAuth().currentUser;
  if (!user) throw new Error("Not authenticated");

  const tokenResult = await user.getIdTokenResult();
  const hasuraClaims = tokenResult.claims["https://hasura.io/jwt/claims"] as HasuraJwtClaims;

  if (!hasuraClaims?.["x-hasura-organization-id"]) {
    throw new Error("Organization ID not found in Hasura claims");
  }

  return hasuraClaims["x-hasura-organization-id"];
};
