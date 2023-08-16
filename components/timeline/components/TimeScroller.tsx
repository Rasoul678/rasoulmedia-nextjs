import React, { CSSProperties } from "react";
import { useElementScroll } from "@hooks/useElementScroll";

type IProps = {
  color?: string;
};

const TimeScroller: React.FC<IProps> = ({ color = "8ce7f2" }) => {
  const ref = React.useRef(null);

  const { height } = useElementScroll(ref);

  return (
    <div
      ref={ref}
      className="absolute left-[10%] w-[0.3rem] rounded-sm h-[100%] bg-gray-800/70 test"
      style={
        { "--height": `${height}px`, "--color": `#${color}` } as CSSProperties
      }
    ></div>
  );
};

export default TimeScroller;
