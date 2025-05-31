import { gql } from "@apollo/client";

export const FETCH_BLOCKED_USERS = gql(`
  query fetchBlockedUsers {
    user_organizations(where: {is_active: {_eq: false} }) {
      employee_id
      user {
        full_name
        id
      }
      organization_id
    }
  }
`);
