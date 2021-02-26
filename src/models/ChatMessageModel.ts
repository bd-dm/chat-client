import UserQueries from '@api/graphql/UserQueries';

import { ChatMessage, Query } from '@definitions/graphql';

import apolloClient from '@lib/classes/ApiClient';

import { ApolloClient } from '@apollo/client';

class ChatMessageModel {
  private apolloClient: ApolloClient<any>;

  constructor(_apolloClient: ApolloClient<any>) {
    this.apolloClient = _apolloClient;
  }

  async addLocalMessage(chatRoomId: string, data: ChatMessage) {
    const queryParams = {
      query: UserQueries.chatMessageList.query,
      variables: UserQueries.chatMessageList.variables({
        chatRoomId,
      }),
    };

    const prevData = apolloClient.readQuery<Pick<Query, 'chatMessageList'>>(queryParams);
    if (!prevData?.chatMessageList) {
      return;
    }

    this.apolloClient.writeQuery<Pick<Query, 'chatMessageList'>>({
      ...queryParams,
      data: {
        chatMessageList: [...prevData.chatMessageList, data],
      },
    });
  }
}

export default ChatMessageModel;
