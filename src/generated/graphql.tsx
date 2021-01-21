import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
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
  getMe: UserEntity;
  getMyChannel: ChannelEntity;
  getChannels: Array<ChannelEntity>;
  getSingleChannel?: Maybe<ChannelEntity>;
  getChannelUsers?: Maybe<Array<UserEntity>>;
  hello: Scalars['String'];
  getChannelMessages: PaginatedMessages;
};


export type QueryGetSingleChannelArgs = {
  id: Scalars['Float'];
};


export type QueryGetChannelUsersArgs = {
  channelId: Scalars['Float'];
};


export type QueryGetChannelMessagesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Float'];
  channelId: Scalars['Float'];
};

export type UserEntity = {
  __typename?: 'UserEntity';
  id: Scalars['Float'];
  username: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  verified: Scalars['Boolean'];
  channel?: Maybe<ChannelEntity>;
  channelId?: Maybe<Scalars['Float']>;
  messages?: Maybe<Array<MessageEntity>>;
  createdAt: Scalars['String'];
};

export type ChannelEntity = {
  __typename?: 'ChannelEntity';
  id: Scalars['Float'];
  name: Scalars['String'];
  desc: Scalars['String'];
  users?: Maybe<Array<UserEntity>>;
  messages?: Maybe<Array<MessageEntity>>;
  createdAt: Scalars['String'];
};

export type MessageEntity = {
  __typename?: 'MessageEntity';
  id: Scalars['Float'];
  content: Scalars['String'];
  ivString: Scalars['String'];
  type: Scalars['String'];
  poster: UserEntity;
  channel: ChannelEntity;
  createdAt: Scalars['String'];
};

export type PaginatedMessages = {
  __typename?: 'PaginatedMessages';
  messages: Array<MessageEntity>;
  hasMore: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  forgotPassword: Scalars['Boolean'];
  resetPassword: Scalars['Boolean'];
  verifyEmail: Scalars['Boolean'];
  registerUser: UserEntity;
  loginUser: UserEntity;
  logoutUser: Scalars['Boolean'];
  joinChannel: Scalars['Boolean'];
  leaveChannel: Scalars['Boolean'];
  deleteUser: Scalars['Boolean'];
  addChannel: ChannelEntity;
  deleteChannel: Scalars['Boolean'];
  postMessage: MessageEntity;
  deleteMessage: Scalars['Boolean'];
};


export type MutationForgotPasswordArgs = {
  recaptchaToken?: Maybe<Scalars['String']>;
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  recaptchaToken?: Maybe<Scalars['String']>;
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};


export type MutationRegisterUserArgs = {
  recaptchaToken?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  username: Scalars['String'];
};


export type MutationLoginUserArgs = {
  recaptchaToken?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  username: Scalars['String'];
};


export type MutationJoinChannelArgs = {
  channelId: Scalars['Float'];
};


export type MutationLeaveChannelArgs = {
  channelId: Scalars['Float'];
};


export type MutationAddChannelArgs = {
  desc: Scalars['String'];
  name: Scalars['String'];
};


export type MutationDeleteChannelArgs = {
  id: Scalars['Float'];
};


export type MutationPostMessageArgs = {
  channelId: Scalars['Float'];
  content: Scalars['String'];
};


export type MutationDeleteMessageArgs = {
  id: Scalars['Float'];
};

export type Subscription = {
  __typename?: 'Subscription';
  newMessage: MessageEntity;
  removedMessage: MessageEntity;
  newNotification: Scalars['String'];
  joinedChannel: UserEntity;
  leftChannel: UserEntity;
};


export type SubscriptionNewMessageArgs = {
  channelId: Scalars['Float'];
};


export type SubscriptionRemovedMessageArgs = {
  channelId: Scalars['Float'];
};


export type SubscriptionNewNotificationArgs = {
  channelId: Scalars['Float'];
};


export type SubscriptionJoinedChannelArgs = {
  channelId: Scalars['Float'];
};


export type SubscriptionLeftChannelArgs = {
  channelId: Scalars['Float'];
};

export type DeleteMessageMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteMessageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteMessage'>
);

export type DeleteUserMutationVariables = Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteUser'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
  recaptchaToken: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type JoinChannelMutationVariables = Exact<{
  channelId: Scalars['Float'];
}>;


export type JoinChannelMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'joinChannel'>
);

export type LeaveChannelMutationVariables = Exact<{
  channelId: Scalars['Float'];
}>;


export type LeaveChannelMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'leaveChannel'>
);

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  recaptchaToken: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { loginUser: (
    { __typename?: 'UserEntity' }
    & Pick<UserEntity, 'name'>
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logoutUser'>
);

export type PostMessageMutationVariables = Exact<{
  channelId: Scalars['Float'];
  content: Scalars['String'];
}>;


export type PostMessageMutation = (
  { __typename?: 'Mutation' }
  & { postMessage: (
    { __typename?: 'MessageEntity' }
    & Pick<MessageEntity, 'content'>
  ) }
);

export type RegisterMutationVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
  name: Scalars['String'];
  email: Scalars['String'];
  recaptchaToken: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { registerUser: (
    { __typename?: 'UserEntity' }
    & Pick<UserEntity, 'name'>
  ) }
);

export type ResetPasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
  recaptchaToken: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'resetPassword'>
);

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyEmailMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'verifyEmail'>
);

export type GetChannelMessagesQueryVariables = Exact<{
  channelId: Scalars['Float'];
  limit: Scalars['Float'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type GetChannelMessagesQuery = (
  { __typename?: 'Query' }
  & { getChannelMessages: (
    { __typename?: 'PaginatedMessages' }
    & Pick<PaginatedMessages, 'hasMore'>
    & { messages: Array<(
      { __typename?: 'MessageEntity' }
      & Pick<MessageEntity, 'content' | 'id' | 'createdAt'>
      & { poster: (
        { __typename?: 'UserEntity' }
        & Pick<UserEntity, 'username' | 'id'>
      ) }
    )> }
  ) }
);

export type GetChannelUsersQueryVariables = Exact<{
  channelId: Scalars['Float'];
}>;


export type GetChannelUsersQuery = (
  { __typename?: 'Query' }
  & { getChannelUsers?: Maybe<Array<(
    { __typename?: 'UserEntity' }
    & Pick<UserEntity, 'username' | 'id'>
  )>> }
);

export type GetChannelsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetChannelsQuery = (
  { __typename?: 'Query' }
  & { getChannels: Array<(
    { __typename?: 'ChannelEntity' }
    & Pick<ChannelEntity, 'name' | 'id' | 'desc'>
  )> }
);

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = (
  { __typename?: 'Query' }
  & { getMe: (
    { __typename?: 'UserEntity' }
    & Pick<UserEntity, 'username' | 'id'>
  ) }
);

export type GetMyChannelQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMyChannelQuery = (
  { __typename?: 'Query' }
  & { getMyChannel: (
    { __typename?: 'ChannelEntity' }
    & Pick<ChannelEntity, 'id' | 'desc' | 'name'>
    & { users?: Maybe<Array<(
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'username'>
    )>> }
  ) }
);

export type GetSingleChannelQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type GetSingleChannelQuery = (
  { __typename?: 'Query' }
  & { getSingleChannel?: Maybe<(
    { __typename?: 'ChannelEntity' }
    & Pick<ChannelEntity, 'name' | 'desc'>
    & { users?: Maybe<Array<(
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'username' | 'id'>
    )>>, messages?: Maybe<Array<(
      { __typename?: 'MessageEntity' }
      & Pick<MessageEntity, 'content' | 'id'>
      & { poster: (
        { __typename?: 'UserEntity' }
        & Pick<UserEntity, 'username' | 'id'>
      ) }
    )>> }
  )> }
);

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'hello'>
);

export type JoinedChannelSubscriptionVariables = Exact<{
  channelId: Scalars['Float'];
}>;


export type JoinedChannelSubscription = (
  { __typename?: 'Subscription' }
  & { joinedChannel: (
    { __typename?: 'UserEntity' }
    & Pick<UserEntity, 'username' | 'id'>
  ) }
);

export type LeftChannelSubscriptionVariables = Exact<{
  channelId: Scalars['Float'];
}>;


export type LeftChannelSubscription = (
  { __typename?: 'Subscription' }
  & { leftChannel: (
    { __typename?: 'UserEntity' }
    & Pick<UserEntity, 'username' | 'id'>
  ) }
);

export type NewMessageSubscriptionVariables = Exact<{
  channelId: Scalars['Float'];
}>;


export type NewMessageSubscription = (
  { __typename?: 'Subscription' }
  & { newMessage: (
    { __typename?: 'MessageEntity' }
    & Pick<MessageEntity, 'content' | 'id' | 'createdAt'>
    & { poster: (
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'username'>
    ) }
  ) }
);

export type NewNotificationSubscriptionVariables = Exact<{
  channelId: Scalars['Float'];
}>;


export type NewNotificationSubscription = (
  { __typename?: 'Subscription' }
  & Pick<Subscription, 'newNotification'>
);

export type RemovedMessageSubscriptionVariables = Exact<{
  channelId: Scalars['Float'];
}>;


export type RemovedMessageSubscription = (
  { __typename?: 'Subscription' }
  & { removedMessage: (
    { __typename?: 'MessageEntity' }
    & Pick<MessageEntity, 'content' | 'id' | 'createdAt'>
    & { poster: (
      { __typename?: 'UserEntity' }
      & Pick<UserEntity, 'id' | 'username'>
    ) }
  ) }
);


export const DeleteMessageDocument = gql`
    mutation DeleteMessage($id: Float!) {
  deleteMessage(id: $id)
}
    `;
export type DeleteMessageMutationFn = Apollo.MutationFunction<DeleteMessageMutation, DeleteMessageMutationVariables>;

/**
 * __useDeleteMessageMutation__
 *
 * To run a mutation, you first call `useDeleteMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteMessageMutation, { data, loading, error }] = useDeleteMessageMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteMessageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteMessageMutation, DeleteMessageMutationVariables>) {
        return Apollo.useMutation<DeleteMessageMutation, DeleteMessageMutationVariables>(DeleteMessageDocument, baseOptions);
      }
export type DeleteMessageMutationHookResult = ReturnType<typeof useDeleteMessageMutation>;
export type DeleteMessageMutationResult = Apollo.MutationResult<DeleteMessageMutation>;
export type DeleteMessageMutationOptions = Apollo.BaseMutationOptions<DeleteMessageMutation, DeleteMessageMutationVariables>;
export const DeleteUserDocument = gql`
    mutation DeleteUser {
  deleteUser
}
    `;
export type DeleteUserMutationFn = Apollo.MutationFunction<DeleteUserMutation, DeleteUserMutationVariables>;

/**
 * __useDeleteUserMutation__
 *
 * To run a mutation, you first call `useDeleteUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUserMutation, { data, loading, error }] = useDeleteUserMutation({
 *   variables: {
 *   },
 * });
 */
export function useDeleteUserMutation(baseOptions?: Apollo.MutationHookOptions<DeleteUserMutation, DeleteUserMutationVariables>) {
        return Apollo.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument, baseOptions);
      }
export type DeleteUserMutationHookResult = ReturnType<typeof useDeleteUserMutation>;
export type DeleteUserMutationResult = Apollo.MutationResult<DeleteUserMutation>;
export type DeleteUserMutationOptions = Apollo.BaseMutationOptions<DeleteUserMutation, DeleteUserMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!, $recaptchaToken: String!) {
  forgotPassword(email: $email, recaptchaToken: $recaptchaToken)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *      recaptchaToken: // value for 'recaptchaToken'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const JoinChannelDocument = gql`
    mutation JoinChannel($channelId: Float!) {
  joinChannel(channelId: $channelId)
}
    `;
export type JoinChannelMutationFn = Apollo.MutationFunction<JoinChannelMutation, JoinChannelMutationVariables>;

/**
 * __useJoinChannelMutation__
 *
 * To run a mutation, you first call `useJoinChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinChannelMutation, { data, loading, error }] = useJoinChannelMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useJoinChannelMutation(baseOptions?: Apollo.MutationHookOptions<JoinChannelMutation, JoinChannelMutationVariables>) {
        return Apollo.useMutation<JoinChannelMutation, JoinChannelMutationVariables>(JoinChannelDocument, baseOptions);
      }
export type JoinChannelMutationHookResult = ReturnType<typeof useJoinChannelMutation>;
export type JoinChannelMutationResult = Apollo.MutationResult<JoinChannelMutation>;
export type JoinChannelMutationOptions = Apollo.BaseMutationOptions<JoinChannelMutation, JoinChannelMutationVariables>;
export const LeaveChannelDocument = gql`
    mutation LeaveChannel($channelId: Float!) {
  leaveChannel(channelId: $channelId)
}
    `;
export type LeaveChannelMutationFn = Apollo.MutationFunction<LeaveChannelMutation, LeaveChannelMutationVariables>;

/**
 * __useLeaveChannelMutation__
 *
 * To run a mutation, you first call `useLeaveChannelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveChannelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveChannelMutation, { data, loading, error }] = useLeaveChannelMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useLeaveChannelMutation(baseOptions?: Apollo.MutationHookOptions<LeaveChannelMutation, LeaveChannelMutationVariables>) {
        return Apollo.useMutation<LeaveChannelMutation, LeaveChannelMutationVariables>(LeaveChannelDocument, baseOptions);
      }
export type LeaveChannelMutationHookResult = ReturnType<typeof useLeaveChannelMutation>;
export type LeaveChannelMutationResult = Apollo.MutationResult<LeaveChannelMutation>;
export type LeaveChannelMutationOptions = Apollo.BaseMutationOptions<LeaveChannelMutation, LeaveChannelMutationVariables>;
export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!, $recaptchaToken: String!) {
  loginUser(
    username: $username
    password: $password
    recaptchaToken: $recaptchaToken
  ) {
    name
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *      recaptchaToken: // value for 'recaptchaToken'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logoutUser
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const PostMessageDocument = gql`
    mutation PostMessage($channelId: Float!, $content: String!) {
  postMessage(channelId: $channelId, content: $content) {
    content
  }
}
    `;
export type PostMessageMutationFn = Apollo.MutationFunction<PostMessageMutation, PostMessageMutationVariables>;

/**
 * __usePostMessageMutation__
 *
 * To run a mutation, you first call `usePostMessageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostMessageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postMessageMutation, { data, loading, error }] = usePostMessageMutation({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function usePostMessageMutation(baseOptions?: Apollo.MutationHookOptions<PostMessageMutation, PostMessageMutationVariables>) {
        return Apollo.useMutation<PostMessageMutation, PostMessageMutationVariables>(PostMessageDocument, baseOptions);
      }
export type PostMessageMutationHookResult = ReturnType<typeof usePostMessageMutation>;
export type PostMessageMutationResult = Apollo.MutationResult<PostMessageMutation>;
export type PostMessageMutationOptions = Apollo.BaseMutationOptions<PostMessageMutation, PostMessageMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($password: String!, $username: String!, $name: String!, $email: String!, $recaptchaToken: String!) {
  registerUser(
    password: $password
    username: $username
    name: $name
    email: $email
    recaptchaToken: $recaptchaToken
  ) {
    name
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      password: // value for 'password'
 *      username: // value for 'username'
 *      name: // value for 'name'
 *      email: // value for 'email'
 *      recaptchaToken: // value for 'recaptchaToken'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($newPassword: String!, $token: String!, $recaptchaToken: String!) {
  resetPassword(
    newPassword: $newPassword
    token: $token
    recaptchaToken: $recaptchaToken
  )
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      token: // value for 'token'
 *      recaptchaToken: // value for 'recaptchaToken'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const VerifyEmailDocument = gql`
    mutation VerifyEmail($token: String!) {
  verifyEmail(token: $token)
}
    `;
export type VerifyEmailMutationFn = Apollo.MutationFunction<VerifyEmailMutation, VerifyEmailMutationVariables>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyEmailMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEmailMutation, VerifyEmailMutationVariables>) {
        return Apollo.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument, baseOptions);
      }
export type VerifyEmailMutationHookResult = ReturnType<typeof useVerifyEmailMutation>;
export type VerifyEmailMutationResult = Apollo.MutationResult<VerifyEmailMutation>;
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const GetChannelMessagesDocument = gql`
    query GetChannelMessages($channelId: Float!, $limit: Float!, $cursor: String) {
  getChannelMessages(cursor: $cursor, limit: $limit, channelId: $channelId) {
    messages {
      content
      id
      poster {
        username
        id
      }
      createdAt
    }
    hasMore
  }
}
    `;

/**
 * __useGetChannelMessagesQuery__
 *
 * To run a query within a React component, call `useGetChannelMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelMessagesQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useGetChannelMessagesQuery(baseOptions: Apollo.QueryHookOptions<GetChannelMessagesQuery, GetChannelMessagesQueryVariables>) {
        return Apollo.useQuery<GetChannelMessagesQuery, GetChannelMessagesQueryVariables>(GetChannelMessagesDocument, baseOptions);
      }
export function useGetChannelMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelMessagesQuery, GetChannelMessagesQueryVariables>) {
          return Apollo.useLazyQuery<GetChannelMessagesQuery, GetChannelMessagesQueryVariables>(GetChannelMessagesDocument, baseOptions);
        }
export type GetChannelMessagesQueryHookResult = ReturnType<typeof useGetChannelMessagesQuery>;
export type GetChannelMessagesLazyQueryHookResult = ReturnType<typeof useGetChannelMessagesLazyQuery>;
export type GetChannelMessagesQueryResult = Apollo.QueryResult<GetChannelMessagesQuery, GetChannelMessagesQueryVariables>;
export const GetChannelUsersDocument = gql`
    query GetChannelUsers($channelId: Float!) {
  getChannelUsers(channelId: $channelId) {
    username
    id
  }
}
    `;

/**
 * __useGetChannelUsersQuery__
 *
 * To run a query within a React component, call `useGetChannelUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelUsersQuery({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useGetChannelUsersQuery(baseOptions: Apollo.QueryHookOptions<GetChannelUsersQuery, GetChannelUsersQueryVariables>) {
        return Apollo.useQuery<GetChannelUsersQuery, GetChannelUsersQueryVariables>(GetChannelUsersDocument, baseOptions);
      }
export function useGetChannelUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelUsersQuery, GetChannelUsersQueryVariables>) {
          return Apollo.useLazyQuery<GetChannelUsersQuery, GetChannelUsersQueryVariables>(GetChannelUsersDocument, baseOptions);
        }
export type GetChannelUsersQueryHookResult = ReturnType<typeof useGetChannelUsersQuery>;
export type GetChannelUsersLazyQueryHookResult = ReturnType<typeof useGetChannelUsersLazyQuery>;
export type GetChannelUsersQueryResult = Apollo.QueryResult<GetChannelUsersQuery, GetChannelUsersQueryVariables>;
export const GetChannelsDocument = gql`
    query GetChannels {
  getChannels {
    name
    id
    desc
  }
}
    `;

/**
 * __useGetChannelsQuery__
 *
 * To run a query within a React component, call `useGetChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetChannelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetChannelsQuery(baseOptions?: Apollo.QueryHookOptions<GetChannelsQuery, GetChannelsQueryVariables>) {
        return Apollo.useQuery<GetChannelsQuery, GetChannelsQueryVariables>(GetChannelsDocument, baseOptions);
      }
export function useGetChannelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetChannelsQuery, GetChannelsQueryVariables>) {
          return Apollo.useLazyQuery<GetChannelsQuery, GetChannelsQueryVariables>(GetChannelsDocument, baseOptions);
        }
export type GetChannelsQueryHookResult = ReturnType<typeof useGetChannelsQuery>;
export type GetChannelsLazyQueryHookResult = ReturnType<typeof useGetChannelsLazyQuery>;
export type GetChannelsQueryResult = Apollo.QueryResult<GetChannelsQuery, GetChannelsQueryVariables>;
export const GetMeDocument = gql`
    query GetMe {
  getMe {
    username
    id
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: Apollo.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        return Apollo.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, baseOptions);
      }
export function useGetMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          return Apollo.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, baseOptions);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetMyChannelDocument = gql`
    query GetMyChannel {
  getMyChannel {
    id
    desc
    name
    users {
      id
      username
    }
  }
}
    `;

/**
 * __useGetMyChannelQuery__
 *
 * To run a query within a React component, call `useGetMyChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyChannelQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyChannelQuery(baseOptions?: Apollo.QueryHookOptions<GetMyChannelQuery, GetMyChannelQueryVariables>) {
        return Apollo.useQuery<GetMyChannelQuery, GetMyChannelQueryVariables>(GetMyChannelDocument, baseOptions);
      }
export function useGetMyChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetMyChannelQuery, GetMyChannelQueryVariables>) {
          return Apollo.useLazyQuery<GetMyChannelQuery, GetMyChannelQueryVariables>(GetMyChannelDocument, baseOptions);
        }
export type GetMyChannelQueryHookResult = ReturnType<typeof useGetMyChannelQuery>;
export type GetMyChannelLazyQueryHookResult = ReturnType<typeof useGetMyChannelLazyQuery>;
export type GetMyChannelQueryResult = Apollo.QueryResult<GetMyChannelQuery, GetMyChannelQueryVariables>;
export const GetSingleChannelDocument = gql`
    query GetSingleChannel($id: Float!) {
  getSingleChannel(id: $id) {
    name
    desc
    users {
      username
      id
    }
    messages {
      poster {
        username
        id
      }
      content
      id
    }
  }
}
    `;

/**
 * __useGetSingleChannelQuery__
 *
 * To run a query within a React component, call `useGetSingleChannelQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSingleChannelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSingleChannelQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetSingleChannelQuery(baseOptions: Apollo.QueryHookOptions<GetSingleChannelQuery, GetSingleChannelQueryVariables>) {
        return Apollo.useQuery<GetSingleChannelQuery, GetSingleChannelQueryVariables>(GetSingleChannelDocument, baseOptions);
      }
export function useGetSingleChannelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSingleChannelQuery, GetSingleChannelQueryVariables>) {
          return Apollo.useLazyQuery<GetSingleChannelQuery, GetSingleChannelQueryVariables>(GetSingleChannelDocument, baseOptions);
        }
export type GetSingleChannelQueryHookResult = ReturnType<typeof useGetSingleChannelQuery>;
export type GetSingleChannelLazyQueryHookResult = ReturnType<typeof useGetSingleChannelLazyQuery>;
export type GetSingleChannelQueryResult = Apollo.QueryResult<GetSingleChannelQuery, GetSingleChannelQueryVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, baseOptions);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const JoinedChannelDocument = gql`
    subscription JoinedChannel($channelId: Float!) {
  joinedChannel(channelId: $channelId) {
    username
    id
  }
}
    `;

/**
 * __useJoinedChannelSubscription__
 *
 * To run a query within a React component, call `useJoinedChannelSubscription` and pass it any options that fit your needs.
 * When your component renders, `useJoinedChannelSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useJoinedChannelSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useJoinedChannelSubscription(baseOptions: Apollo.SubscriptionHookOptions<JoinedChannelSubscription, JoinedChannelSubscriptionVariables>) {
        return Apollo.useSubscription<JoinedChannelSubscription, JoinedChannelSubscriptionVariables>(JoinedChannelDocument, baseOptions);
      }
export type JoinedChannelSubscriptionHookResult = ReturnType<typeof useJoinedChannelSubscription>;
export type JoinedChannelSubscriptionResult = Apollo.SubscriptionResult<JoinedChannelSubscription>;
export const LeftChannelDocument = gql`
    subscription LeftChannel($channelId: Float!) {
  leftChannel(channelId: $channelId) {
    username
    id
  }
}
    `;

/**
 * __useLeftChannelSubscription__
 *
 * To run a query within a React component, call `useLeftChannelSubscription` and pass it any options that fit your needs.
 * When your component renders, `useLeftChannelSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLeftChannelSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useLeftChannelSubscription(baseOptions: Apollo.SubscriptionHookOptions<LeftChannelSubscription, LeftChannelSubscriptionVariables>) {
        return Apollo.useSubscription<LeftChannelSubscription, LeftChannelSubscriptionVariables>(LeftChannelDocument, baseOptions);
      }
export type LeftChannelSubscriptionHookResult = ReturnType<typeof useLeftChannelSubscription>;
export type LeftChannelSubscriptionResult = Apollo.SubscriptionResult<LeftChannelSubscription>;
export const NewMessageDocument = gql`
    subscription NewMessage($channelId: Float!) {
  newMessage(channelId: $channelId) {
    content
    id
    poster {
      id
      username
    }
    createdAt
  }
}
    `;

/**
 * __useNewMessageSubscription__
 *
 * To run a query within a React component, call `useNewMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewMessageSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useNewMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewMessageSubscription, NewMessageSubscriptionVariables>) {
        return Apollo.useSubscription<NewMessageSubscription, NewMessageSubscriptionVariables>(NewMessageDocument, baseOptions);
      }
export type NewMessageSubscriptionHookResult = ReturnType<typeof useNewMessageSubscription>;
export type NewMessageSubscriptionResult = Apollo.SubscriptionResult<NewMessageSubscription>;
export const NewNotificationDocument = gql`
    subscription NewNotification($channelId: Float!) {
  newNotification(channelId: $channelId)
}
    `;

/**
 * __useNewNotificationSubscription__
 *
 * To run a query within a React component, call `useNewNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNewNotificationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewNotificationSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useNewNotificationSubscription(baseOptions: Apollo.SubscriptionHookOptions<NewNotificationSubscription, NewNotificationSubscriptionVariables>) {
        return Apollo.useSubscription<NewNotificationSubscription, NewNotificationSubscriptionVariables>(NewNotificationDocument, baseOptions);
      }
export type NewNotificationSubscriptionHookResult = ReturnType<typeof useNewNotificationSubscription>;
export type NewNotificationSubscriptionResult = Apollo.SubscriptionResult<NewNotificationSubscription>;
export const RemovedMessageDocument = gql`
    subscription RemovedMessage($channelId: Float!) {
  removedMessage(channelId: $channelId) {
    content
    id
    poster {
      id
      username
    }
    createdAt
  }
}
    `;

/**
 * __useRemovedMessageSubscription__
 *
 * To run a query within a React component, call `useRemovedMessageSubscription` and pass it any options that fit your needs.
 * When your component renders, `useRemovedMessageSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRemovedMessageSubscription({
 *   variables: {
 *      channelId: // value for 'channelId'
 *   },
 * });
 */
export function useRemovedMessageSubscription(baseOptions: Apollo.SubscriptionHookOptions<RemovedMessageSubscription, RemovedMessageSubscriptionVariables>) {
        return Apollo.useSubscription<RemovedMessageSubscription, RemovedMessageSubscriptionVariables>(RemovedMessageDocument, baseOptions);
      }
export type RemovedMessageSubscriptionHookResult = ReturnType<typeof useRemovedMessageSubscription>;
export type RemovedMessageSubscriptionResult = Apollo.SubscriptionResult<RemovedMessageSubscription>;