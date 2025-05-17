import { gql } from "@apollo/client";

export const FETCH_BLOCKED_USERS = gql(`
query fetchBlockedUsers {
  user_organizationsCollection(
    filter: {
      is_active: { eq: false }
      organization_id: { eq: "bbf0dda2-1c0b-4193-9ca0-0f4b45a8f8d0" }
    }
  ) {
    edges {
      node {
        employee_id
        organization_id
        users {
          full_name
          id
        }
      }
    }
  }
}

`);
