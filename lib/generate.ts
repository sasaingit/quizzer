import {Configuration, OpenAIApi} from "openai";

const getPrompt = (content: string) => {
    return `Based on the following content, generate 5 multiple-choice questions, each with 4 answer options and correct answer in the following JSON format:

[
    {
        "question": "Example Question?",
        "options": ["Option A", "Option B", "Option C", "Option D"],
        "answer": "Correct Answer"
    }
]

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