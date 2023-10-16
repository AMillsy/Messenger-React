import { gql } from "@apollo/client";

export const SUBSCRIBE_MESSAGE = gql`
  subscription Subscription($userId: ID) {
    recieveMessage(userId: $userId) {
      dateCreated
      message
      user {
        _id
        username
      }
    }
  }
`;
