import {Configuration, OpenAIApi} from "openai";

const getPrompt = (content: string) => {
    return `Generate 5 multiple-choice questions based on the provided content, each with 4 answer options. 
    Additionally, produce a concise summary (less than 100 words), a tagline (less than 5 words), and an emoji that represents the overall essence of the content in below json format

{
   "questions": [
      {
         "question": "Your Question 1?",
         "options": [
            "Option A",
            "Option B",
            "Option C",
            "Option D"
         ],
         "answer": "Correct Answer"
      }
   ],
   "summary": "Please generate a concise summary of the content in less than 100 words.",
   "tagline": "Create a catchy and relevant tagline in less than 5 words.",
   "emoji": "Choose an emoji that aptly represents the content."
}

Content:
${content}`;
}

const generateCompletion = async (content: string) => {

    const prompt = getPrompt(content);

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai
        .createCompletion({
            model: "gpt-3.5-turbo-instruct",
            prompt: prompt,
            max_tokens: 1000,
            temperature: 1,
        });

    return completion.data.choices[0].text
}

export default generateCompletion;