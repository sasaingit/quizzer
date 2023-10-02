import {NextResponse} from "next/server";
import {getQuizContentById} from "@/app/_data/quizContentRepo";

export const GET = async (req: Request) => {
    const id = req.url.split('resources/')[1];
    const resource = await getQuizContentById(parseInt(id));
    return NextResponse.json({message: 'ok', resource});
}