import { gql } from "@apollo/client";

export const FETCH_WALLET_BALANCE = gql(`
  query fetchWalletBalance($_eq: uuid = "") {
    wallets(where: {organization: {id: {_eq: $_eq}}}) {
      balance
      id
    }
  }
`);
