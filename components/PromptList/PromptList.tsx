import Link from "next/link";
import React from "react";

const PromptList = ({ prompts }: any) => {
  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Latest Prompts:</h2>
      <ul className="p-7 rounded-lg bg-[#0d1117] divide-y divide-gray-300">
        {prompts.map((prompt: any) => (
          <li key={prompt.id} className="py-4">
            <Link href={`/posts/${prompt.id}`} className="text-sky-500 text-lg">
              {prompt.title}
            </Link>
            <p className="text-gray-500">{prompt.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PromptList;
