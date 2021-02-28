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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  chatList: Array<ChatRoom>;
  chatMessageGetAttachmentUploadUri: FileUri;
  chatMessageList: ChatMessagePaginated;
  userLogin: Scalars['String'];
  userGetCurrent?: Maybe<User>;
};


export type QueryChatMessageListArgs = {
  pagination?: Maybe<PaginatedInput>;
  data: ChatMessageListInput;
};


export type QueryUserLoginArgs = {
  data: UserLoginInput;
};

export type ChatRoom = {
  __typename?: 'ChatRoom';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  name: Scalars['String'];
  users: Array<User>;
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  email: Scalars['String'];
};

export type FileUri = {
  __typename?: 'FileUri';
  id: Scalars['String'];
  uri: Scalars['String'];
  mime?: Maybe<Scalars['String']>;
};

export type ChatMessagePaginated = {
  __typename?: 'ChatMessagePaginated';
  data: Array<ChatMessage>;
  pageMeta: PaginatedPageMeta;
};

export type ChatMessage = {
  __typename?: 'ChatMessage';
  id: Scalars['ID'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  text: Scalars['String'];
  author: User;
  chatRoom: BaseEntityId;
  attachments: Array<FileUri>;
};

export type BaseEntityId = {
  __typename?: 'BaseEntityId';
  id: Scalars['ID'];
};

export type PaginatedPageMeta = {
  __typename?: 'PaginatedPageMeta';
  hasMore: Scalars['Boolean'];
};

export type PaginatedInput = {
  initTimestamp?: Maybe<Scalars['Float']>;
  offset: Scalars['Float'];
  limit: Scalars['Float'];
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
  chatAttachmentIds?: Maybe<Array<Scalars['String']>>;
};

export type UserSignupInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};
