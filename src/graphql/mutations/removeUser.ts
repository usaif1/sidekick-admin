import { gql } from "@apollo/client";

export const REMOVE_USER = gql(`
  mutation removeUser($userId: UUID!, $organizationId: UUID!) {
    updateuser_organizationsCollection(
      set: {is_active: false}
      filter: {user_id: {eq: $userId}, organization_id: {eq: $organizationId}}
      atMost: 1
    ) {
      records {
        id
      }
    }
  }
`);
