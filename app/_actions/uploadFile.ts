"use server";

import {addQuizContent} from "@/app/_data/quizContentRepo";
import generateCompletion from "@/app/_utils/openAi";
import {createHash} from "crypto";

export default async function uploadFile(data: FormData) {
    const file: File | null = data.get('file') as unknown as File;
    if (!file) {
        throw new Error('No file uploaded');
    }

    const content = await file.text();
    const hash = createHash('md5').update(content).digest('hex');
    const gptGeneratedData = await generateCompletion(content);
    const parsedData = JSON.parse(gptGeneratedData)

    const quizContent = {
        content_id: null,
        quiz_name: parsedData.tagline,
        summary: parsedData.summary,
        quiz_icon: parsedData.emoji,
        document_hash: hash,
        data: JSON.stringify(parsedData.questions)
    }

    await addQuizContent(quizContent);
    return {success: true}
}

