import UserQueries from '@api/graphql/UserQueries';

import { IChatMessage } from '@definitions/entities/ChatMessage';

import apolloClient from '@lib/classes/ApiClient';

import { ApolloClient } from '@apollo/client';

class ChatMessageModel {
  private apolloClient: ApolloClient<any>;

  constructor(_apolloClient: ApolloClient<any>) {
    this.apolloClient = _apolloClient;
  }

  async addLocalMessage(chatRoomId: string, data: IChatMessage) {
    const queryParams = {
      query: UserQueries.chatMessageList.query,
      variables: UserQueries.chatMessageList.variables({
        chatRoomId,
      }),
    };

    const prevData = apolloClient.readQuery(queryParams);
    if (!prevData?.chatMessageList) {
      return;
    }

    this.apolloClient.writeQuery({
      ...queryParams,
      data: {
        chatMessageList: [...prevData.chatMessageList, data],
      },
    });
  }
}

export default ChatMessageModel;
