import { gql } from "@apollo/client";

export const CREATE_USER_ORG = gql`
  mutation createUserOrg($objects: [user_organizations_insert_input!] = []) {
    insert_user_organizations(objects: $objects) {
      affected_rows
      returning {
        id
        user_id
        user {
          full_name
        }
      }
    }
  }
`;
