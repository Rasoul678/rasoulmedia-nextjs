import { UserRole } from "@prisma/client";
import type { BuiltInProviderType } from "next-auth/providers";
import type { LiteralUnion, ClientSafeProvider } from "next-auth/react";

export type SelectEvent = React.ChangeEvent<HTMLSelectElement>;
type StringOrNull = string | null;

export type ProvidersType = Record<
  LiteralUnion<BuiltInProviderType, string>,
  ClientSafeProvider
> | null;

export type GitHubProfileType = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string;
  hireable: string | null;
  bio: string | null;
  twitter_username: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  private_gists: number;
  total_private_repos: number;
  owned_private_repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: boolean;
  plan: {
    name: string;
    space: number;
    collaborators: number;
    private_repos: number;
  };
};

export type UserType = {
  id?: string;
  email?: StringOrNull;
  emailVerified?: StringOrNull;
  followedBy?: UserType[];
  following?: UserType[];
  prompts?: PromptType[];
  image?: StringOrNull;
  name?: StringOrNull;
  password?: StringOrNull;
  role?: UserRole;
  accounts?: any;
  sessions?: any;
  profiles?: ProfileType[];
  lastJoin?: StringOrNull;
  _count: {
    followedBy: number;
    following: number;
    prompts: number;
  };
  createdAt?: string;
  updatedAt?: string;
};

export type ProfileType = {
  id?: string;
  userId?: string;
  avatarUrl?: StringOrNull;
  company?: StringOrNull;
  email?: StringOrNull;
  firstName?: StringOrNull;
  lastName?: StringOrNull;
  webUrl?: StringOrNull;
  occupation?: StringOrNull;
  education?: StringOrNull;
  createdAt?: string;
  updatedAt?: string;
};

export type PromptType = {
  id?: string;
  userId?: string;
  text?: string;
  tag?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type ProfileWithUserType = ProfileType & { user: UserType };
export type PromptWithUserType = PromptType & { user: UserType };

export type LoginRequestType = {
  email: string;
  password: string;
};

export type RegisterRequestType = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};

export enum Creator {
  ME = 0,
  BOT = 1,
}

export type GPTMessageType = {
  text: string;
  from: Creator;
  key: number;
};

export type InfiniteResponseDataType<T> = {
  data: T;
  metaData: {
    lastCursor: string;
    hasNextPage: boolean;
  };
};

export type FormPromptType = Partial<PromptType> | null | undefined;

export type PromptQueryParams = {
  take?: number | string | null;
  lastCursor?: string | null;
  searchText?: string | null;
  userId?: string | null;
};

export type IconType = {
  alt?: string;
  width?: number;
  height?: number;
  title?: string;
  className?: string;
};
