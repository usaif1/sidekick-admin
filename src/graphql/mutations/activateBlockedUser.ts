import { gql } from "@apollo/client";

export const ACTIVATE_BLOCKED_USER = gql(`
  mutation activateBlockedUser($user_id: uuid = "", $organization_id: uuid = "") {
    update_user_organizations_by_pk(
      pk_columns: { organization_id: $organization_id, user_id: $user_id },
      _set: { is_active: true }
    ) {
      id
    }
  }
`);
