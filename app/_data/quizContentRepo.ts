import { queryBuilder, QuizContent } from "../_utils/planetscale";

export const findQuizContents = async (searchParam?: string): Promise<QuizContent[]> => {
    try {
        let query = queryBuilder
            .selectFrom('quiz_data') // updated table name to 'quiz_data'
            .select(['content_id', 'quiz_name', 'summary', 'data', 'created_at', 'updated_at', 'quiz_icon', 'document_hash']);

        if (searchParam) {
            query = query.where('quiz_name', 'like', `%${searchParam}%`); // changed column name to 'quiz_name'
        }

        return await query.execute<QuizContent[]>();
    } catch (error) {
        console.error('Error finding quiz contents:', error);
    }
}

export const deleteQuizContent = async (id: number): Promise<boolean> => {
    try {
        const deleteResult = await queryBuilder
            .deleteFrom('quiz_data') // updated table name to 'quiz_data'
            .where('content_id', '=', id) // changed column name to 'content_id'
            .execute();

        return deleteResult.length > 0;
    } catch (error) {
        console.error(`Error deleting quiz content with id ${id}: `, error);
        throw error;
    }
}

export const getQuizContentById = async (id: number): Promise<QuizContent | null> => {
    try {
        const query = queryBuilder
            .selectFrom('quiz_data') // updated table name to 'quiz_data'
            .select(['content_id', 'quiz_name', 'summary', 'data', 'created_at', 'updated_at', 'quiz_icon', 'document_hash'])
            .where('content_id', '=', id); // changed column name to 'content_id'

        const contents = await query.execute<QuizContent[]>();

        if (contents.length === 0) return null;

        return contents[0];
    } catch (error) {
        console.error(`Error getting quiz content with id ${id}:`, error);
        throw new Error(`Error getting quiz content with id ${id}`);
    }
}

export const addQuizContent = async (quizContent: QuizContent): Promise<QuizContent> => {
    try {
        const result = await queryBuilder
            .insertInto('quiz_data') // updated table name to 'quiz_data'
            .values(quizContent)
            .execute<QuizContent[]>();

        if (result.length === 0) throw new Error('Quiz content could not be created');

        return result[0];
    } catch (error) {
        console.error('Error adding quiz content:', error);
        throw new Error('Error adding quiz content');
    }
}
