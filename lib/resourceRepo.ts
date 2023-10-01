import {queryBuilder, ResourceType} from "./planetscale";

export const findResources = async (searchParam?: string): Promise<ResourceType[]> => {
    try {
        let query = queryBuilder
            .selectFrom('resources')
            .select(['id', 'name', 'path', 'data']);

        if(searchParam) {
            query = query.where('name', 'like', `%${searchParam}%`);
        }

        return await query.execute<ResourceType[]>();
    } catch (error) {
        console.error('Error finding resources:', error);
        throw new Error('Error finding resources');
    }
}


export const deleteResource = async (id: number): Promise<boolean> => {
    try {
        const deleteResult = await queryBuilder
            .deleteFrom('resources')
            .where('id', '=', id)
            .execute();

        return deleteResult.length > 0;
    } catch (error) {
        console.error(`Error deleting resource with id ${id}: `, error);
        throw error;
    }
}

export const getResourceById = async (id: number): Promise<ResourceType | null> => {
    try {
        const query = queryBuilder
            .selectFrom('resources')
            .select(['id', 'name', 'path'])
            .where('id', '=', id);

        const resources = await query.execute<ResourceType[]>();

        if (resources.length === 0) return null; // or throw an Error if preferable.

        return resources[0]; // Since ID should be unique, we return the first and only element.

    } catch (error) {
        console.error(`Error getting resource with id ${id}:`, error);
        throw new Error(`Error getting resource with id ${id}`);
    }
}

export const addResource = async (resource: ResourceType): Promise<ResourceType> => {
    try {
        const result = await queryBuilder
            .insertInto('resources')
            .values(resource)
            .execute<ResourceType[]>();

        if (result.length === 0) throw new Error('Resource could not be created');

        return result[0]; // Returning the created resource.

    } catch (error) {
        console.error('Error adding resource:', error);
        throw new Error('Error adding resource');
    }
}


