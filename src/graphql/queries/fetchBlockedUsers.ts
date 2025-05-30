import { gql } from "@apollo/client";

export const FETCH_BLOCKED_USERS = gql(`
  query fetchBlockedUsers {
    user_organizations(where: {is_active: {_eq: false}, organization_id: {_eq: "15fbefc7-aaa4-4335-ae7d-09bdc8fe3c7b"}}) {
      employee_id
      user {
        full_name
        id
      }
      organization_id
    }
  }
`);
