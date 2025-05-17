import { gql } from "@apollo/client";

export const FETCH_WALLET_BALANCE = gql(`
  query fetchWalletBalance($organizationId: UUID) {
    walletsCollection(first: 1, filter: {org_id: {eq: $organizationId}}) {
      edges {
        node {
          id
          balance
        }
      }
    }
  }
`);
