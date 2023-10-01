import {NextResponse} from "next/server";
import {getResourceById} from "@/lib/resourceRepo";

export const GET = async (req: Request) => {
    const id = req.url.split('resources/')[1];
    const resource = await getResourceById(parseInt(id));
    return NextResponse.json({message: 'ok', resource});
}