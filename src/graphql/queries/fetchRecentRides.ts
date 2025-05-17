import { gql } from "@apollo/client";

export const FETCH_RECENT_RIDES = gql`
query fetchRecentRides($scooterId: UUID) {
  ride_detailsCollection(
    filter: {scooter_id: {eq: $scooterId}}
    orderBy: {updated_at: DescNullsLast}
  ) {
    edges {
      node {
        users {
          full_name
        }
        start_time
        end_time
        total_cost
      }
    }
  }
  scootersCollection(filter: {id: {eq: $scooterId}}) {
    edges {
      node {
        registration_number
        status
      }
    }
  }
}
`;
