import React from "react";
import Link from "next/link";
import { iconsList } from "@components/icons";
import { RepoType } from "@types";
import { octokit } from "@utils/octokit";
import { useQuery } from "@tanstack/react-query";

type IProps = {
  repo: RepoType;
};

const Repo: React.FC<IProps> = ({ repo }) => {
  const {
    data: res,
    isLoading,
    isFetching,
    error,
  } = useQuery({
    queryKey: [`repo-${repo.name}`],
    queryFn: () =>
      octokit.request(`GET /repos/Rasoul678/${repo.name}/languages`),
    keepPreviousData: true,
  });

  const languages = Object.keys(res?.data || {});

  return (
    <>
      {iconsList.stacks.git({ width: 30, alt: repo.name })}
      <code className="mt-2 flex gap-2 truncate">
        <Link
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="blue_gradient text-xl"
        >
          {repo.name}
        </Link>
      </code>
      <div className="flex-grow text-end hidden sm:block">
        {languages.slice(0, 3).map((lang, i) => (
          <code key={i} className="text-sm mx-[0.2rem] underline text-green-400 font-bold">
            {lang}
          </code>
        ))}
      </div>
    </>
  );
};

export default Repo;
