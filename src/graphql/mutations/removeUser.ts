import { gql } from "@apollo/client";

export const REMOVE_USER = gql(`
  mutation removeUser($user_id: uuid = "", $organization_id: uuid = "") {
    update_user_organizations(where: {organization_id: {_eq: $organization_id}, user_id: {_eq: $user_id}}, _set: {is_active: false}) {
      returning {
        id
      }
    }
  }
`);
