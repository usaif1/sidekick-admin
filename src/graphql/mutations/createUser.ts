import { gql } from "@apollo/client";

export const CREATE_NEW_USER = gql`
  mutation createNewUser($objects: [users_insert_input!] = []) {
    insert_users(objects: $objects) {
      affected_rows
      returning {
        id
      }
    }
  }
`;
