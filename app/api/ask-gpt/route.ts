import { NextRequest } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const POST = async (req: NextRequest) => {
  const { prompt } = (await req.json()) as {
    prompt: string;
  };

  if (!prompt || prompt === "") {
    return new Response("Please send your prompt!", { status: 400 });
  }

  try {
    const chatCompletion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0.9, // Higher values means that the model will take more risks.
      max_tokens: 2048, // The maximum number of tokens to generate in the completion.
      frequency_penalty: 0.5, // Number between -2.0 and 2.0.
      presence_penalty: 0, // Number between -2.0 and 2.0.
    });

    const response =
      chatCompletion.data.choices[0].text?.trim() ||
      "Sorry, There was a problem!";

    return new Response(JSON.stringify({ text: response }), { status: 200 });
  } catch (error: any) {
    if (error.response) {
      return new Response(JSON.stringify({ error: error.response.data }), {
        status: error.response.status,
      });
    } else {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 400,
      });
    }
  }
};
