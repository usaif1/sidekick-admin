import { gql } from "@apollo/client";

export const UPDATE_USER_BALANCE = gql(`
  mutation updateUserBalance($balance: BigFloat!, $userIds: [UUID!]!) {
    updatewalletsCollection(
      set: {balance: $balance}
      filter: {user_id: {in: $userIds}}
    ) {
      records {
        id
        balance
      }
    }
  }
`);
