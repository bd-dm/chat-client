import { ApolloClient } from '@apollo/client';

import UserQueries from '@/api/graphql/UserQueries';

import { ChatMessage, PaginatedPageMeta, Query } from '@/definitions/graphql';

import apolloClient from '@/lib/classes/ApiClient';

class ChatMessageModel {
  private apolloClient: ApolloClient<any>;

  constructor(_apolloClient: ApolloClient<any>) {
    this.apolloClient = _apolloClient;
  }

  async addLocalMessages(chatRoomId: string, data: ChatMessage[], toTheEnd: boolean = false) {
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
        chatMessageList: {
          ...prevData.chatMessageList,
          data: toTheEnd
            ? [...prevData.chatMessageList.data, ...data]
            : [...data, ...prevData.chatMessageList.data],
        },
      },
    });
  }

  async setPageMeta(chatRoomId: string, data: PaginatedPageMeta) {
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
        chatMessageList: {
          ...prevData.chatMessageList,
          pageMeta: data,
        },
      },
    });
  }
}

export default ChatMessageModel;
