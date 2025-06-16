import { gql } from "@apollo/client";

export const FETCH_ALL_SCOOTERS = gql(`
  query fetchAllScooters {
  scooters(where: {is_active: {_eq: true}}) {
    registration_number
    is_active
    id
    ride_details(order_by: {updated_at: desc}, limit: 1) {
      user {
        full_name
      }
      ride_steps(order_by: {updated_at: desc}, limit: 1) {
        updated_at
        ride_detail {
          user {
            full_name
          }
        }
      }
    }
    status
  }
}
`);
