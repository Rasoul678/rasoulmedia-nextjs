import { GitHubProfileType } from "@types";
import { sql } from "@vercel/postgres";
import { Account } from "next-auth";
import {
  AdapterAccount,
  AdapterSession,
  AdapterUser,
  VerificationToken,
} from "next-auth/adapters";

class PostgresAdapterService {
  public createUser = async (
    user: Omit<AdapterUser, "id">
  ): Promise<AdapterUser> => {
    const { rows } = await sql`
          INSERT INTO users (name, email, image) 
          VALUES (${user.name}, ${user.email}, ${user.image}) 
          RETURNING id, name, email, email_verified, image`;

    const newUser: AdapterUser = {
      ...rows[0],
      id: rows[0].id.toString(),
      emailVerified: rows[0].email_verified,
      email: rows[0].email,
    };

    return newUser;
  };

  public getUser = async (id: string) => {
    const { rows } = await sql`
        SELECT *
        FROM users
        WHERE id = ${id};
      `;

    return rows[0]
      ? {
          ...rows[0],
          id: rows[0].id.toString(),
          emailVerified: rows[0].email_verified,
          email: rows[0].email,
        }
      : null;
  };

  public getUserByEmail = async (email: string) => {
    const { rows } = await sql`SELECT * FROM users WHERE email = ${email}`;
    return rows[0]
      ? {
          ...rows[0],
          id: rows[0].id.toString(),
          emailVerified: rows[0].email_verified,
          email: rows[0].email,
        }
      : null;
  };

  public getUserByAccount = async ({
    provider,
    providerAccountId,
  }: {
    provider: string;
    providerAccountId: string;
  }): Promise<AdapterUser | null> => {
    const { rows } = await sql`
    SELECT u.* 
    FROM users u join accounts a on u.id = a.user_id 
    WHERE a.provider = ${provider} 
    AND a.provider_account_id = ${providerAccountId}`;
    const user = rows[0]
      ? {
          email: rows[0].email,
          emailVerified: rows[0].email_verified,
          id: rows[0].id,
        }
      : null;
    return user;
  };

  public updateUser = async (
    user: Partial<AdapterUser> & Pick<AdapterUser, "id">
  ): Promise<AdapterUser> => {
    const { rows } = await sql`
          UPDATE users
          SET name = ${user.name}, email = ${user.email}, image = ${user.image}
          WHERE id = ${user.id}
          RETURNING id, name, email, image;
          `;
    const updatedUser: AdapterUser = {
      ...rows[0],
      id: rows[0].id.toString(),
      emailVerified: rows[0].email_verified,
      email: rows[0].email,
    };
    return updatedUser;
  };

  public deleteUser = async (userId: string) => {
    await sql`DELETE FROM users WHERE id = ${userId}`;
    return;
  };

  public createSession = async ({
    sessionToken,
    userId,
    expires,
  }: {
    sessionToken: string;
    userId: string;
    expires: Date;
  }): Promise<AdapterSession> => {
    const expiresString = expires.toDateString();
    await sql`
      INSERT INTO auth_sessions (user_id, expires, session_token) 
      VALUES (${userId}, ${expiresString}, ${sessionToken})
    `;
    const createdSession: AdapterSession = {
      sessionToken,
      userId,
      expires,
    };
    return createdSession;
  };

  public getSessionAndUser = async (
    sessionToken: string
  ): Promise<{ session: AdapterSession; user: AdapterUser } | null> => {
    const session = await sql`
      SELECT * 
      FROM auth_sessions 
      WHERE session_token = ${sessionToken}`;
    const { rows } = await sql`
      SELECT * 
      FROM users 
      WHERE id = ${session.rows[0]?.user_id}`;
    const expiresDate = new Date(session.rows[0].expires);
    const sessionAndUser: { session: AdapterSession; user: AdapterUser } = {
      session: {
        sessionToken: session.rows[0].session_token,
        userId: session.rows[0]?.user_id,
        expires: expiresDate,
      },
      user: {
        id: rows[0].id,
        emailVerified: rows[0].email_verified,
        email: rows[0].email,
        name: rows[0].name,
        image: rows[0].image,
      },
    };

    return sessionAndUser;
  };

  public updateSession = async (
    session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
  ): Promise<AdapterSession | null | undefined> => {
    console.log(
      "Unimplemented function! updateSession in vercelPostgresAdapter. Session:",
      JSON.stringify(session)
    );
    return;
  };

  public deleteSession = async (sessionToken: string) => {
    await sql`
        DELETE FROM auth_sessions
        WHERE session_token = ${sessionToken};
      `;
    return;
  };

  public linkProfile = async (
    profile: GitHubProfileType & { userId: string }
  ): Promise<GitHubProfileType | null | undefined> => {
    await sql`
    INSERT INTO profiles (
        user_id, 
        name, 
        user_name, 
        blog, 
        avatar_url,
        profile_url,
        repos_url,
        public_repos,
        followers,
        following,
        created_at,
        updated_at
    ) 
    VALUES (
        ${profile.userId}, 
        ${profile.name},
        ${profile.login}, 
        ${profile.blog}, 
        ${profile.avatar_url}, 
        ${profile.html_url},
        ${profile.repos_url},
        ${profile.public_repos},
        ${profile.followers},
        ${profile.following},
        ${profile.created_at},
        ${profile.updated_at}
    )`;
    return profile;
  };

  public linkAccount = async (
    account: AdapterAccount
  ): Promise<AdapterAccount | null | undefined> => {
    await sql`
      INSERT INTO accounts (
          user_id, 
          provider, 
          provider_type, 
          provider_account_id, 
          access_token,
          token_type,
          scope
      ) 
      VALUES (
          ${account.userId}, 
          ${account.provider},
          ${account.type}, 
          ${account.providerAccountId}, 
          ${account.access_token}, 
          ${account.token_type},
          ${account.scope}
      )`;
    return account;
  };

  public unlinkAccount = async ({
    providerAccountId,
    provider,
  }: {
    providerAccountId: Account["providerAccountId"];
    provider: Account["provider"];
  }) => {
    await sql`
          DELETE FROM accounts 
          WHERE provider_account_id = ${providerAccountId} AND provider_id = ${provider}}`;
    return;
  };

  public createVerificationToken = async ({
    identifier,
    expires,
    token,
  }: VerificationToken): Promise<VerificationToken | null | undefined> => {
    const { rows } = await sql`
      INSERT INTO verification_tokens (identifier, token, expires) 
      VALUES (${identifier}, ${token}, ${expires.toString()})`;
    const createdToken: VerificationToken = {
      identifier: rows[0].identifier,
      token: rows[0].token,
      expires: rows[0].expires,
    };
    return createdToken;
  };

  public useVerificationToken = async ({
    identifier,
    token,
  }: {
    identifier: string;
    token: string;
  }) => {
    const { rows } = await sql`
      SELECT * FROM verification_tokens 
      WHERE identifier = ${identifier} 
      AND token = ${token} AND expires > NOW()`;
    await sql`
      DELETE FROM verification_tokens
      WHERE identifier = ${identifier}
      AND token = ${token}`;
    return {
      expires: rows[0].expires,
      identifier: rows[0].identifier,
      token: rows[0].token,
    };
  };
}

export const postgresAdapter = new PostgresAdapterService();
