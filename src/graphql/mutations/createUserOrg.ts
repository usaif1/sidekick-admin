import { gql } from "@apollo/client";

export const CREATE_USER_ORG = gql`
  mutation createUserOrg($objects: [user_organizationsInsertInput!]!) {
    insertIntouser_organizationsCollection(objects: $objects) {
      affectedCount
      records {
        id
        user_id
        users {
          full_name
        }
      }
    }
  }
`;
