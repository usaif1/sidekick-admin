import { gql } from "@apollo/client";

export const FETCH_USER_RIDES_DATA = gql(`
query fetchUserRidesData($userId: UUID!) {
  user_organizationsCollection(filter: {user_id: {eq: $userId}}) {
    edges {
      node {
        employee_id
        users {
          full_name
          walletsCollection(first: 1) {
            edges {
              node {
                balance
              }
            }
          }
        }
      }
    }
  }
  ride_detailsCollection(filter: {user_id: {eq: $userId}}) {
    edges {
      node {
        scooter_id
        end_time
        start_time
        transactionsCollection {
          edges {
            node {
              amount
              wallets {
                balance
              }
            }
          }
        }
      }
    }
  }
}
`);
