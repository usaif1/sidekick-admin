import { gql } from "@apollo/client";

export const FETCH_ACTIVE_SCOOTERS = gql`
  query fetchActiveScooters {
    scootersCollection(first: 50, filter: { is_active: { eq: true } }) {
      edges {
        node {
          registration_number
          is_active
          id
          latitude
          longitude
          ride_detailsCollection {
            edges {
              node {
                users {
                  full_name
                }
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;
