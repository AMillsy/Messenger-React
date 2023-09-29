import { gql } from "@apollo/client";

/**It will return data.posts*/
/**
 * const {loading, error, data} = useQuery(QUERY_POST);
 */
export const QUERY_USER = gql`
  query Users {
    users {
      username
      _id
    }
  }
`;

export const QUERY_MESSAGEGROUP = gql`
  query Query($userId: ID) {
    findMessages(userId: $userId) {
      _id
      messages {
        message
      }
      users {
        username
        _id
      }
    }
  }
`;
