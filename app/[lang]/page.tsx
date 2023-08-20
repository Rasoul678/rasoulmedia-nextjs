import React from "react";
import Hero from "@components/home_hero/Hero";
import TimeLine from "@components/timeline/TimeLine";
import { RepoType } from "@types";
import { octokit } from "@utils/octokit";

const Home = async () => {
  const { data } = await octokit.request(
    "GET /users/rasoul678/repos?per_page=100"
  );

  const myRepos = (data as RepoType[])
    ?.sort(
      (a, b) => Number(new Date(b.created_at)) - Number(new Date(a.created_at))
    )
    .filter((repo) => {
      return !repo.fork && repo.stargazers_count;
    })
    .slice(0, 20);

  return (
    <main className="min-h-screen">
      <Hero />
      <TimeLine repos={myRepos} />
    </main>
  );
};

export default Home;
