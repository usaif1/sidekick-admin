import { gql } from "@apollo/client";

export const FETCH_RIDES = gql`
  query fetchRides {
    ride_detailsCollection(first: 50) {
      edges {
        node {
          start_time
          end_time
          scooters {
            registration_number
            status
          }
          users {
            full_name
            first_name
            middle_name
            last_name
          }
        }
      }
    }
  }
`;
