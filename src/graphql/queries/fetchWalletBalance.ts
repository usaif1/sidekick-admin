import { gql } from "@apollo/client";

export const FETCH_WALLET_BALANCE = gql(`
  query fetchWalletBalance {
    wallets {
      balance
      id
    }
  }
`);
