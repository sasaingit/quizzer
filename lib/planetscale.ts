import 'server-only';
import { Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface ResourceType {
  id: number|null;
  name: string;
  path: string;
  data: string;
}

interface Database {
  users: User;
  // https://github.com/nextauthjs/next-auth/issues/4922
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL
  })
});
