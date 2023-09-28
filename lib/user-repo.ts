import 'server-only';
import {queryBuilder} from "./planetscale";
import {User} from "./planetscale";

export const findUsers = async (searchParam?: string): Promise<User[]> => {
    let query = queryBuilder
        .selectFrom('users')
        .select(['id', 'name', 'username', 'email']);

    if(searchParam) {
        query = query.where('name', 'like', `%${searchParam}%`);
    }

    return await query.execute<User[]>();
}

