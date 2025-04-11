import { gql } from "@apollo/client";

export const UPDATE_USER_BALANCE = gql(`
  mutation updateUserBalance($balance: numeric = "", $_in: [uuid!] = "") {
    update_wallets(where: { user_id: { _in: $_in } }, _inc: { balance: $balance }) {
      returning {
        id
        balance
      }
    }
  }
`);
