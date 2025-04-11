import { gql } from "@apollo/client";

export const FETCH_RECENT_RIDES = gql`
  query fetchRecentRides($scooterId: uuid = "") {
    ride_details(
      order_by: { updated_at: desc }
      where: { scooter_id: { _eq: $scooterId } }
    ) {
      user {
        full_name
      }
      start_time
      end_time
      total_cost
    }
    scooters(where: { id: { _eq: $scooterId } }) {
      registration_number
      status
    }
  }
`;
