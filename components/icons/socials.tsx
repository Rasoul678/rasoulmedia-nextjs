import Image from "next/image";
import githubSVG from "@assets/icon-pack/icons8-github-420.svg";
import discordSVG from "@assets/icon-pack/icons8-discord-420.svg";
import linkedinSVG from "@assets/icon-pack/icons8-linkedin-circled-420.svg";
import mediumSVG from "@assets/icon-pack/icons8-medium-420.svg";
import redditSVG from "@assets/icon-pack/icons8-reddit-420.svg";
import stackSVG from "@assets/icon-pack/icons8-stack-overflow-500.svg";
import twitterSVG from "@assets/icon-pack/icons8-twitter-circled-420.svg";

export const socials = {
  discord: (
    <Image
      src={discordSVG}
      alt="discord"
      width={50}
      className="cursor-pointer"
      title="discord"
    />
  ),
  github: (
    <Image
      src={githubSVG}
      alt="github"
      width={50}
      className="cursor-pointer"
      title="github"
    />
  ),
  linkedin: (
    <Image
      src={linkedinSVG}
      alt="linkedin"
      width={50}
      className="cursor-pointer"
      title="linkedin"
    />
  ),
  medium: (
    <Image
      src={mediumSVG}
      alt="medium"
      width={50}
      className="cursor-pointer"
      title="medium"
    />
  ),
  reddit: (
    <Image
      src={redditSVG}
      alt="reddit"
      width={50}
      className="cursor-pointer"
      title="reddit"
    />
  ),
  stackOverflow: (
    <Image
      src={stackSVG}
      alt="stackOverflow"
      width={50}
      className="cursor-pointer"
      title="stackOverflow"
    />
  ),
  twitter: (
    <Image
      src={twitterSVG}
      alt="twitter"
      width={50}
      className="cursor-pointer"
      title="twitter"
    />
  ),
};
