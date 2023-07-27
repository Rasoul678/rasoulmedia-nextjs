import { InfiniteResponseDataType, ProfileWithUserType, PromptQueryParams, PromptWithUserType, RegisterRequestType } from "@types";
import { parseDate } from "@utils";

class APIClientSide {
  public getProfile = async (userId?: string) => {
    let profile: ProfileWithUserType | null = null;
    let url = userId ? `/api/profile/${userId}` : "/api/profile";

    try {
      const response = await fetch(url);
      const { profile: p } = (await response.json()) as {
        profile: ProfileWithUserType;
      };

      p.user.createdAt = parseDate(String(p.user.createdAt)).relativeTime;
      p.user.lastJoin = parseDate(String(p.user.lastJoin)).relativeTime;

      profile = p;
    } catch (error: any) {
      console.log(error);
    }

    return profile;
  };

  public registerUser = async (formValues: RegisterRequestType) => {
    const response = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(formValues),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  };

  public followOrUnfollowUser = async (
    userId: string,
    followerId: string,
    type: "follow" | "unfollow"
  ) => {
    let method = type === "follow" ? "POST" : "PUT";

    const response = await fetch(`/api/follow/${userId}`, {
      method,
      body: JSON.stringify({ userId: followerId }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  };

  public callGPT = async (prompt: string) => {
    const response = await fetch("/api/ask-gpt", {
      method: "POST",
      body: JSON.stringify({ prompt }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  };

  public getUserPrompt = async (promptId: string) => {
    const response = await fetch(`/api/prompt/${promptId}`);
    const prompt = (await response.json()) as PromptWithUserType;
    return prompt;
  };

  public allUserPrompts = async (args: PromptQueryParams) => {
    const { take, lastCursor, searchText } = args;
    const response = await fetch(
      `/api/prompt?take=${take}&lastCursor=${lastCursor}&search=${searchText}`
    );
    const data = (await response.json()) as InfiniteResponseDataType<PromptWithUserType[]>;
    return data;
  };
}

export const clientService = new APIClientSide();
