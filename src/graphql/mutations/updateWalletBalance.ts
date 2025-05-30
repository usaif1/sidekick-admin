import { gql } from "@apollo/client";

export const UPDATE_WALLET_BALANCE = gql`
  mutation updateWalletBalance($id: uuid = "", $balance: numeric = "") {
    update_wallets_by_pk(pk_columns: { id: $id }, _inc: { balance: $balance }) {
      id
    }
  }
`;
