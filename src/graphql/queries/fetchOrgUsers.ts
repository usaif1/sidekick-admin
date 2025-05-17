import { gql } from "@apollo/client";

export const FETCH_ORG_USERS = gql(`
    query fetchOrgUsers {
      user_organizationsCollection(
        filter: {
          is_active: { eq: true },
          organization_id: { eq: "bbf0dda2-1c0b-4193-9ca0-0f4b45a8f8d0" }
        }
      ) {
        edges {
          node {
            employee_id
            users {
              id
              first_name
              last_name
              middle_name
              full_name
              ride_detailsCollection(orderBy: { updated_at: DescNullsLast }, first: 1) {
                edges {
                  node {
                    ride_stepsCollection(orderBy: { updated_at: DescNullsLast }, first: 1) {
                      edges {
                        node {
                          updated_at
                        }
                      }
                    }
                  }
                }
              }
              walletsCollection {
                edges {
                  node {
                    balance
                  }
                }
              }
            }
          }
        }
      }
}

`);
