import { gql } from "@apollo/client";

export const ACTIVATE_BLOCKED_USER = gql(`
  mutation activateBlockedUser($user_id: UUID!, $organization_id: UUID!) {
    updateuser_organizationsCollection(
      filter: {organization_id: {eq: $organization_id}, user_id: {eq: $user_id}}
      set: {is_active: true}
    ) {
      records {
        id
      }
    }
  }
`);
