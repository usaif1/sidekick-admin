import { gql } from "@apollo/client";

export const FETCH_RECENT_RIDES = gql`
  query fetchRecentRides(
    $scooterId: uuid = "10bc1578-73fd-4a84-8f20-695b3db4899d"
    $organization_id: uuid = "15fbefc7-aaa4-4335-ae7d-09bdc8fe3c7b"
  ) {
    ride_details(
      order_by: { updated_at: desc }
      where: {
        scooter_id: { _eq: $scooterId }
        user: {
          user_organizations: { organization_id: { _eq: $organization_id } }
        }
      }
    ) {
      user {
        full_name
        user_organizations {
          employee_id
        }
        wallets {
          balance
        }
      }
      start_time
      end_time
      total_cost
    }
    scooters(where: { id: { _eq: $scooterId } }) {
      registration_number
      status
      imei
    }
  }
`;
