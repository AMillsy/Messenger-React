import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation Mutation($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;
