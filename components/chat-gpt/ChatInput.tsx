import React from "react";
import sendMessage from "@assets/svg/send-message.svg";
import Image from "next/image";
import { Spinner } from "@components/spinner/Spinner";

interface IProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

const ChatInput: React.FC<IProps> = ({ disabled, onSend }) => {
  const [input, setInput] = React.useState("");

  const sendInput = () => {
    onSend(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      sendInput();
    }
  };

  return (
    <div className="bg-white w-full border-2 p-2 rounded-lg flex justify-center">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        placeholder="Ask me anything!"
        disabled={disabled}
        onKeyDown={handleKeyDown}
        className="w-full py-2 px-3 text-gray-800 rounded-lg focus:outline-none"
      />
      {!disabled && (
        <button
          className="p-2 rounded-md text-gray-500 bottom-2 right-1"
          disabled={disabled}
          onClick={sendInput}
        >
          <Image
            src={sendMessage}
            alt="profile"
            className="rounded-full"
            width={35}
            height={35}
          />
        </button>
      )}
      {disabled && <Spinner />}
    </div>
  );
};

export default ChatInput;
