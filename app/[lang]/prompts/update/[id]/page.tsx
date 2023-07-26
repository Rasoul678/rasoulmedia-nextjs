import { dehydrate } from "@tanstack/react-query";
import { serverService } from "@utils/api-service";
import getQueryClient from "@utils/react-query/getQueryClient";
import Hydrate from "@utils/react-query/hydrate.client";
import UpdatePrompt from "./UpdatePrompt";

interface IProps {
  params: { id: string };
}

const EditPrompt: React.FC<IProps> = async (props) => {
  const { params } = props;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    ["hydrate-user-prompt"],
    async () => await serverService.getPromptById(params.id)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <UpdatePrompt params={params} />
    </Hydrate>
  );
};

export default EditPrompt;
