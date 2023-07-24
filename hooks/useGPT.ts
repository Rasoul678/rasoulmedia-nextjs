import { useMutation } from "@tanstack/react-query";
import { Creator, GPTMessageType } from "@types";
import { clientService } from "@utils/api-service";

type IProps = {
  onSuccess: (message: GPTMessageType) => void;
};

export const useGPT = ({ onSuccess }: IProps) => {
  const {
    mutate: askGPT,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: async (prompt: string) => await clientService.callGPT(prompt),
    onSuccess: async (response) => {
      if (response.ok) {
        const data = await response.json();

        if (data.text) {
          const botMessage: GPTMessageType = {
            from: Creator.BOT,
            text: data.text,
            key: new Date().getTime(),
          };

          onSuccess(botMessage);
        }
      }
    },
  });

  return { askGPT, isLoading, isError };
};
