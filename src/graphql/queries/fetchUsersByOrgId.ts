import { gql } from "@apollo/client";

export const FETCH_USERS_BY_ORG_ID = gql(`
  query fetchUsersByOrgId($_eq: uuid = "bbf0dda2-1c0b-4193-9ca0-0f4b45a8f8d0") {
    users(where: { user_organizations: { organization_id: { _eq: $_eq } } }) {
      id
      full_name
    }
  }
`);
