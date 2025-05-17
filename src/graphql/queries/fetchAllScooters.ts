import { gql } from "@apollo/client";

export const FETCH_ALL_SCOOTERS = gql(`
  query fetchAllScooters {
    scootersCollection {
      edges {
        node {
          registration_number
          is_active
          id
          status
          ride_detailsCollection(orderBy: {updated_at: DescNullsLast}, first: 1) {
            edges {
              node {
                users {
                  full_name
                }
                ride_stepsCollection(orderBy: {updated_at: DescNullsLast}, first: 1) {
                  edges {
                    node {
                      updated_at
                      ride_details {
                        users {
                          full_name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`);
