import { gql } from "@apollo/client";

export const FETCH_ALL_SCOOTERS = gql(`
  query fetchAllScooters {
    scooters {
      registration_number
      is_active
      id
      rides(order_by: {updated_at: desc}, limit: 1) {
        user {
          full_name
        }
        ride_steps(order_by: { updated_at: desc }, limit: 1) {
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
