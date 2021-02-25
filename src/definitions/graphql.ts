export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  chatList: Array<ChatRoom>;
  chatMessageList: Array<ChatMessage>;
  userLogin: Scalars['String'];
  userGetCurrent?: Maybe<User>;
};


export type QueryChatMessageListArgs = {
  data: ChatMessageListInput;
};


export type QueryUserLoginArgs = {
  data: UserLoginInput;
};

export type ChatRoom = {
  __typename?: 'ChatRoom';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  name: Scalars['String'];
  users: Array<User>;
  chatMessageIds: Array<Scalars['String']>;
  chatMessages: Array<ChatMessage>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  email: Scalars['String'];
  userToChatRooms: Array<UserToChatRoom>;
  chatMessages: Array<ChatMessage>;
};

export type UserToChatRoom = {
  __typename?: 'UserToChatRoom';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
  chatRoomId: Scalars['String'];
  role: Scalars['String'];
  user: User;
  chatRoom: ChatRoom;
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  id: Scalars['ID'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  text: Scalars['String'];
  author: User;
  chatRoom: ChatRoom;
};

export type ChatMessageListInput = {
  chatRoomId: Scalars['String'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  chatCreate: ChatRoom;
  chatMessageSend: ChatMessage;
  userSignup: Scalars['String'];
};


export type MutationChatCreateArgs = {
  data: ChatCreateInput;
};


export type MutationChatMessageSendArgs = {
  data: ChatMessageSendInput;
};


export type MutationUserSignupArgs = {
  data: UserSignupInput;
};

export type ChatCreateInput = {
  name: Scalars['String'];
  userIds: Array<Scalars['String']>;
};

export type ChatMessageSendInput = {
  chatRoomId: Scalars['String'];
  text: Scalars['String'];
};

export type UserSignupInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};
