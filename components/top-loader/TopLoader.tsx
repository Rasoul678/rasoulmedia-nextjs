import React from "react";
import NextTopLoader, { NextTopLoaderProps } from "nextjs-toploader";

interface IProps extends NextTopLoaderProps {}

export const TopLoader: React.FC<IProps> = (props) => {
  const {
    color = "#2299DD",
    crawl = true,
    crawlSpeed = 200,
    easing = "ease",
    height = 3,
    initialPosition = 0.08,
    shadow = "0 0 10px #2299DD,0 0 5px #2299DD",
    showSpinner = false,
    speed = 200,
  } = props;

  return (
    <NextTopLoader
      color={color}
      initialPosition={initialPosition}
      crawlSpeed={crawlSpeed}
      height={height}
      crawl={crawl}
      showSpinner={showSpinner}
      easing={easing}
      speed={speed}
      shadow={shadow}
    />
  );
};
