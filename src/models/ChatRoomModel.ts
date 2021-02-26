import UserQueries from '@api/graphql/UserQueries';

import { ChatRoom, Query } from '@definitions/graphql';

import apolloClient from '@lib/classes/ApiClient';

import { ApolloClient } from '@apollo/client';

class ChatRoomModel {
  private apolloClient: ApolloClient<any>;

  constructor(_apolloClient: ApolloClient<any>) {
    this.apolloClient = _apolloClient;
  }

  async addLocalRoom(data: ChatRoom) {
    const queryParams = {
      query: UserQueries.chatList.query,
    };

    const prevData = apolloClient.readQuery<Pick<Query, 'chatList'>>(queryParams);
    if (!prevData?.chatList) {
      return;
    }

    this.apolloClient.writeQuery<Pick<Query, 'chatList'>>({
      ...queryParams,
      data: {
        chatList: [...prevData.chatList, data],
      },
    });
  }
}

export default ChatRoomModel;
