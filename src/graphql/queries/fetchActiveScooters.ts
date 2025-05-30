import { gql } from "@apollo/client";

export const FETCH_ACTIVE_SCOOTERS = gql`
  query fetchActiveScooters {
    scooters(where: { is_active: { _eq: true } }) {
      registration_number
      is_active
      id
      latitude
      longitude
      ride_details {
        user {
          full_name
        }
      }
    }
  }
`;
