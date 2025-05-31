import { gql } from "@apollo/client";

export const ACTIVATE_BLOCKED_USER = gql(`
  mutation activateBlockedUser($user_id: uuid = "", $organization_id: uuid = "") {
    update_user_organizations(where: {organization_id: {_eq: $organization_id}, user_id: {_eq: $user_id}}, _set: {is_active: true}) {
      returning {
        id
      }
    }
  }
`);
