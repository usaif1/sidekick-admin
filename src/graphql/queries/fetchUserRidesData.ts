import { gql } from "@apollo/client";

export const FETCH_USER_RIDES_DATA = gql(`
  query fetchUserRidesData($userId: uuid = "") {
    user_organizations(where: { user_id: { _eq: $userId } }) {
      employee_id
      user {
        full_name
        wallets {
          balance
        }
      }
    }
    ride_details(where: { user_id: { _eq: $userId } }) {
      scooter_id
      end_time
      start_time
      transactions {
        amount
        wallet {
          balance
        }
      }
    }
  }
`);
