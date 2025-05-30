import { gql } from "@apollo/client";

export const FETCH_WALLET_TRANSACTIONS = gql(`
query fetchWalletTransactions($_gte: timestamptz = "", $_lte: timestamptz = "") {
  wallet_transactions(where: {created_at: {_gte: $_gte, _lte: $_lte}}) {
    created_at
    amount
    user_organization {
      user {
        first_name
        full_name
        last_name
        middle_name
      }
    }
    wallet {
      balance
    }
    state
  }
}
`);
