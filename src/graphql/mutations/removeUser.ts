import { gql } from "@apollo/client";

export const REMOVE_USER = gql(`
  mutation removeUser($user_id: uuid = "", $organization_id: uuid = "bbf0dda2-1c0b-4193-9ca0-0f4b45a8f8d0") {
    update_user_organizations_by_pk(
      pk_columns: { organization_id: $organization_id, user_id: $user_id },
      _set: { is_active: false }
    ) {
      id
    }
  }
`);
