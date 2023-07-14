import React, { RefObject } from "react";

type Args = {
  ref: RefObject<HTMLElement>;
  callback: () => void;
};

export const useClickOutside = (args: Args) => {
  const handleClick = (e: MouseEvent) => {
    if (
      args.ref.current &&
      !args.ref.current.contains(e.target as HTMLElement)
    ) {
      args.callback();
    }
  };
  React.useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};
