"use server";

import {addResource} from "@/lib/resourceRepo";
import generateCompletion from "@/lib/generate";

export default async function uploadFile(data: FormData) {
    const file: File | null = data.get('file') as unknown as File;
    if (!file) {
        throw new Error('No file uploaded');
    }

    const content = await file.text();
    const gptGeneratedData = await generateCompletion(content);

    const resource = {
        id: null,
        name: 'test2',
        path: 'test2',
        data: gptGeneratedData,
    }

    await addResource(resource);
    return {success: true}
}

