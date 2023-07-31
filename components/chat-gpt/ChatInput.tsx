import React from "react";
import Image from "next/image";
import sendMessage from "@assets/svg/send-message.svg";
import { Spinner } from "@components/spinner/Spinner";
import { useObservable, observer } from "@legendapp/state/react";

interface IProps {
  onSend: (text: string) => void;
  disabled: boolean;
  userName: string;
}

const ChatInput: React.FC<IProps> = observer(
  ({ disabled, onSend, userName }) => {
    const userInput = useObservable("");

    const sendInput = () => {
      const value = userInput.get();
      if (value) {
        onSend(value);
        userInput.set("");
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        sendInput();
      }
    };

    return (
      <div className="w-full flex justify-center p-3 bg-gray-800/40 rounded-md">
        <input
          value={userInput.get()}
          onChange={(e) => userInput.set(e.target.value)}
          type="text"
          placeholder={`Hi ${userName}, ask me anything!`}
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
        {disabled && (
          <div className="px-4 flex justify-center items-center">
            <Spinner />
          </div>
        )}
      </div>
    );
  }
);

export default ChatInput;
