import { gql } from "@apollo/client";

export const FETCH_WALLET_TRANSACTIONS = gql(`
query fetchWalletTransactions($_gte: Datetime!, $_lte: Datetime!) {
  wallet_transactionsCollection(
    first: 50
    filter: {created_at: {gte: $_gte, lte: $_lte}}
  ) {
    edges {
      node {
        created_at
        amount
        state
        user_organizations {
          users {
            first_name
            middle_name
            last_name
            full_name
          }
        }
        wallets {
          balance
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}
`);
