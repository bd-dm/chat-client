import {
  ChatMessageListInput, PaginatedInput, UserLoginInput, UserSignupInput,
} from '@definitions/graphql';

import { gql } from '@apollo/client';

export interface IGQLVariables<Input> {
  data: Input;
  pagination?: PaginatedInput;
}

export default {
  userSignup: {
    query: gql`
      mutation UserSignup($data: UserSignupInput!) {
        userSignup(data: $data)
      }
    `,
    variables: (data: UserSignupInput): IGQLVariables<UserSignupInput> => ({ data }),
  },
  userLogin: {
    query: gql`
      query UserLogin($data: UserLoginInput!) {
        userLogin(data: $data)
      }
    `,
    variables: (data: UserLoginInput): IGQLVariables<UserLoginInput> => ({ data }),
  },
  userGetCurrent: {
    query: gql`
      query UserGetCurrent {
        userGetCurrent {
          id
          email
        }
      }
    `,
    variables: () => ({}),
  },
  chatList: {
    query: gql`
      query chatList {
        chatList {
          id
          name
        }
      }
    `,
    variables: () => ({}),
  },
  chatMessageList: {
    query: gql`
      query ChatMessageList($data: ChatMessageListInput!, $pagination: PaginatedInput) {
        chatMessageList(data: $data, pagination: $pagination) {
          data {
            id
            text
            createdAt
            author {
              id
              email
            }
          }
          pageMeta {
            hasMore
          }
        }
      }
    `,
    variables: (
      data: ChatMessageListInput,
      pagination?: PaginatedInput,
    ): IGQLVariables<ChatMessageListInput> => ({ data, pagination }),
  },
  chatMessageSend: {
    query: gql`
      mutation ChatMessageSend($data: ChatMessageSendInput!) {
        chatMessageSend(data: $data) {
          id
          text
          createdAt
          author {
            id
            email
          }
        }
      }
    `,
    variables: () => ({}),
  },
};
