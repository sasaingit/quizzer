import { writeFile } from 'fs/promises'
import { join } from 'path'
import {findUsers} from "@/lib/user-repo";

const AddFile = () => {

    async function upload(data: FormData) {
        "use server";
        const file: File | null = data.get('file') as unknown as File
        if (!file) {
            throw new Error('No file uploaded')
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const path = join('/', 'tmp', file.name)
        await writeFile(path, buffer)


        return { success: true, path }
    }

    return (
        <div>
            <form action={upload}>
                <input type="file" name="file"  className="file-input file-input-bordered file-input-primary w-full max-w-xs" />
                <button type="submit" className="btn btn-outline btn-primary">Upload</button>
            </form>
        </div>
    );
}

export default AddFile;