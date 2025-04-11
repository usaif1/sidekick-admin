import { gql } from "@apollo/client";

export const FETCH_RIDES = gql(`
  query fetchRides {
    ride_details {
      scooter {
        registration_number
        status
      }
      start_time
      end_time
      user {
        full_name
        first_name
        middle_name
        last_name
      }
    }
  }
`);
