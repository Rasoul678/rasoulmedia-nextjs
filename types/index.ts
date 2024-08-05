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

export type RepoType = {
  id: number;
  node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  owner: {
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
  };
  html_url: string;
  description: string;
  fork: boolean;
  url: string;
  forks_url: string;
  keys_url: string;
  collaborators_url: string;
  teams_url: string;
  hooks_url: string;
  issue_events_url: string;
  events_url: string;
  assignees_url: string;
  branches_url: string;
  tags_url: string;
  blobs_url: string;
  git_tags_url: string;
  git_refs_url: string;
  trees_url: string;
  statuses_url: string;
  languages_url: string;
  stargazers_url: string;
  contributors_url: string;
  subscribers_url: string;
  subscription_url: string;
  commits_url: string;
  git_commits_url: string;
  comments_url: string;
  issue_comment_url: string;
  contents_url: string;
  compare_url: string;
  merges_url: string;
  archive_url: string;
  downloads_url: string;
  issues_url: string;
  pulls_url: string;
  milestones_url: string;
  notifications_url: string;
  labels_url: string;
  releases_url: string;
  deployments_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string;
  has_issues: boolean;
  has_projects: boolean;
  has_downloads: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  has_discussions: boolean;
  forks_count: number;
  mirror_url: string;
  archived: boolean;
  disabled: boolean;
  open_issues_count: number;
  license: null;
  allow_forking: boolean;
  is_template: boolean;
  web_commit_signoff_required: boolean;
  topics: string[];
  visibility: string;
  forks: number;
  open_issues: number;
  watchers: number;
  default_branch: string;
  permissions: {
    admin: boolean;
    maintain: boolean;
    push: boolean;
    triage: boolean;
    pull: boolean;
  };
};

type NotionUser = "person" | "bot";

export type NotionUserType = {
  avatar_url: string;
  id: string;
  name: string;
  object: string;
  person: { email: string };
  type: NotionUser;
};

export type NotionUserResultType<RT> = {
  has_more: boolean;
  next_cursor: null | number;
  object: string;
  request_id: string;
  results: Array<RT>;
  type: NotionUser;
  user: {};
};
