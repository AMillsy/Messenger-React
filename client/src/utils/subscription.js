import { gql } from "@apollo/client";

export const SUBSCRIBE_MESSAGE = gql`
  subscription Subscription($groupId: ID) {
    recieveMessage(groupId: $groupId) {
      dateCreated
      message
      user {
        _id
        username
      }
    }
  }
`;
