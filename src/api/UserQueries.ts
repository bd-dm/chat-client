import { gql } from '@apollo/client';

export default {
  userSignup: gql`
    mutation UserSignup($data: UserSignupInput!) {
      userSignup(data: $data)
    }
  `,
  userLogin: gql`
    query UserLogin($data: UserLoginInput!) {
      userLogin(data: $data)
    }
  `,
  userGetCurrent: gql`
    query UserGetCurrent {
      userGetCurrent {
        id
        email
      }
    }
  `,
  chatList: gql`
    query chatList {
      chatList {
        id
        name
      }
    }
  `,
  chatMessageList: gql`
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
  chatMessageSend: gql`
    mutation ChatMessageSend($data: ChatMessageSendInput!) {
      chatMessageSend(data: $data) {
        id
        text
      }
    }
  `,
};
