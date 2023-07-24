import Typewriter from "typewriter-effect";

interface TypewriterProps {
  strings?: string[];
  text?: string;
  autoStart?: boolean;
  loop?: boolean;
  deleteSpeed?: number;
  cursor?: string;
  delay?: number;
  wrapperClassName?: string;
  cursorClassName?: string;
}

export const CustomTypewriter: React.FC<TypewriterProps> = (props) => {
  const {
    strings,
    autoStart = true,
    cursor = "<",
    delay = 100,
    deleteSpeed = 10,
    loop = true,
    wrapperClassName,
    cursorClassName,
    text,
  } = props;

  return (
    <Typewriter
      options={{
        strings: text ? undefined : strings,
        autoStart,
        loop,
        deleteSpeed,
        cursor,
        delay,
        wrapperClassName,
        cursorClassName,
      }}
      onInit={(typewriter) => {
        typewriter.typeString(text || "").start();
      }}
    />
  );
};
