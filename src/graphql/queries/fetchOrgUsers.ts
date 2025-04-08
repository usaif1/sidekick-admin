import { gql } from "@apollo/client";

export const FETCH_ORG_USERS = gql(`
  query fetchOrgUsers {
    user_organizations(where: { is_active: { _eq: true } }) {
      employee_id
      user {
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
