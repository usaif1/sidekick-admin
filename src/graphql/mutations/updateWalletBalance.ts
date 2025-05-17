import { gql } from "@apollo/client";

export const UPDATE_WALLET_BALANCE = gql`
  mutation updateWalletBalance($id: UUID!, $balance: BigFloat!) {
    updatewalletsCollection(
      set: { balance: $balance }
      filter: { id: { eq: $id } }
      atMost: 1
    ) {
      records {
        id
      }
    }
  }
`;
