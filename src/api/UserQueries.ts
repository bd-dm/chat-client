import { gql } from '@apollo/client';

export default {
  signup: gql`
    mutation Signup($data: UserSignupInput!) {
      signup(
          data: $data
      )
    }
  `,
  login: gql`
    query Login($data: UserLoginInput!) {
      login(
          data: $data
      )
    }
  `,
  getCurrentUser: gql`
    query {
      getCurrentUser {
        id
        email      
      }
    }
  `,
};
