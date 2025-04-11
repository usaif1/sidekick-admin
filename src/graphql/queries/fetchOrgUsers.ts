import { gql } from "@apollo/client";

export const FETCH_ORG_USERS = gql(`
  query fetchOrgUsers {
    user_organizations(where: {is_active: {_eq: true}, organization_id: {_eq: "bbf0dda2-1c0b-4193-9ca0-0f4b45a8f8d0"}}) {
      employee_id
      user {
        id
        first_name
        last_name
        middle_name
        full_name
        rides(order_by: {updated_at: desc}, limit: 1) {
          ride_steps(order_by: {updated_at: desc}, limit: 1) {
            updated_at
          }
        }
        wallet {
          balance
        }
      }
    }
  }
`);
