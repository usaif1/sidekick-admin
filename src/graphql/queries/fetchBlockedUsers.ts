import { gql } from "@apollo/client";

export const FETCH_BLOCKED_USERS = gql(`
  query fetchBlockedUsers {
    user_organizations(where: {is_active: {_eq: false}, organization_id: {_eq: "bbf0dda2-1c0b-4193-9ca0-0f4b45a8f8d0"}}) {
      employee_id
      user {
        full_name
        id
      }
      organization_id
    }
  }
`);
