import { gql } from "@apollo/client";

export const CREATE_NEW_USER = gql`
  mutation createNewUser($objects: [usersInsertInput!]!) {
    insertIntousersCollection(objects: $objects) {
      affectedCount
      records {
        id
      }
    }
  }
`;
