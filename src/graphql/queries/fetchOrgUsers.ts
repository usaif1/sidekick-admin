import { gql } from "@apollo/client";

export const FETCH_ORG_USERS = gql(`
  query fetchOrgUsers {
    user_organizations(where: {is_active: {_eq: true}, organization_id: {_eq: "15fbefc7-aaa4-4335-ae7d-09bdc8fe3c7b"}}) {
      employee_id
      user {
        id
        first_name
        last_name
        middle_name
        full_name
        ride_details(order_by: {updated_at: desc}, limit: 1) {
          ride_steps(order_by: {updated_at: desc}, limit: 1) {
            updated_at
          }
        }
        wallets {
          balance
        }
      }
    }
  }
`);
