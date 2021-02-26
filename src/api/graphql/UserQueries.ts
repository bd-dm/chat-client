import { ChatMessageListInput, UserLoginInput, UserSignupInput } from '@definitions/graphql';

import { gql } from '@apollo/client';

export interface IGQLVariables<Input> {
  data: Input;
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
      query ChatMessageList($data: ChatMessageListInput!) {
        chatMessageList(data: $data) {
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
    variables: (data: ChatMessageListInput): IGQLVariables<ChatMessageListInput> => ({ data }),
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
