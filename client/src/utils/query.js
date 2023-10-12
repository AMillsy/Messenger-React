import { gql } from "@apollo/client";

/**It will return data.posts*/
/**
 * const {loading, error, data} = useQuery(QUERY_POST);
 */
export const QUERY_USER = gql`
  query Users($username: String) {
    users(username: $username) {
      _id
      username
    }
  }
`;

export const QUERY_MESSAGEGROUP = gql`
  query Query($userId: ID) {
    findMessages(userId: $userId) {
      _id
      messages {
        message
        dateCreated
        user {
          _id
          username
        }
      }
      users {
        username
        _id
      }
    }
  }
`;

export const QUERY_ME = gql`
  query Me {
    me {
      username
      _id
      friends {
        _id
        username
      }
    }
  }
`;
