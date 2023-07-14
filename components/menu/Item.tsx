import React from "react";
import { ArrowIcon } from "@components/icons";
import { useClickOutside } from "@hooks/useClickOutside";
import Link from "next/link";

type IProps = {
  name: string;
  noBorder?: boolean;
  href?: string;
  onClick?: () => void;
  subMenu?: IProps[];
  left?: number;
};

export const MenuItem: React.FC<IProps> = ({
  name,
  noBorder,
  href,
  onClick,
  subMenu,
  left,
}) => {
  const [showSub, setShowSub] = React.useState(false);
  const clickRef = React.useRef(null);

  useClickOutside({ ref: clickRef, callback: () => setShowSub(false) });

  const handleClickItem = () => {
    setShowSub(true);
    !href && !subMenu && onClick?.();
  };

  return (
    <div
      className={`py-3 flex w-full ${
        noBorder ? "" : "border-t"
      } border-gray-200`}
      onClick={handleClickItem}
    >
      {href ? (
        <Link href={href}>
          <div className="text-gray-400 flex-1 text-base hover:text-gray-100">
            {name}
          </div>
        </Link>
      ) : (
        <div className="relative flex-1">
          <div className="text-gray-400 text-base hover:text-gray-100 cursor-pointer">
            {name}
          </div>
          {subMenu && showSub && (
            <div
              ref={clickRef}
              className={`py-2 bg-gray-900 rounded-lg shadow-xl px-4 absolute left-${
                left ?? "36"
              } -top-0`}
            >
              {subMenu?.map((sub, idx) => {
                return (
                  <MenuItem noBorder={idx === 0} key={sub.name} {...sub} />
                );
              })}
            </div>
          )}
        </div>
      )}
      {!href && subMenu && (
        <div>
          <ArrowIcon />
        </div>
      )}
    </div>
  );
};
