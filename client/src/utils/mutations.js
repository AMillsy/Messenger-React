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

export const CREATE_MESSAGEGROUP = gql`
  mutation CreateMessageGroup($userId: ID) {
    createMessageGroup(userId: $userId) {
      _id
      users {
        _id
        username
      }
      messages {
        message
        user {
          _id
          username
        }
      }
    }
  }
`;

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($message: String, $groupId: ID) {
    createMessage(message: $message, groupId: $groupId) {
      message
      user {
        _id
        username
      }
    }
  }
`;

export const SIGNUP_USER = gql`
  mutation SignupUser($username: String!, $password: String!, $email: String!) {
    signupUser(username: $username, password: $password, email: $email) {
      token
      user {
        username
        _id
      }
    }
  }
`;
