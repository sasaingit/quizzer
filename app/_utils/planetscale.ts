import 'server-only';
import { Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface QuizContent {
  content_id: number | null;
  quiz_name: string;
  summary: string;
  data: string;
  created_at?: Date;
  updated_at?: Date;
  quiz_icon?: string | null;
  document_hash?: string | null;
}

interface Database {
  users: User;
  quizContents: QuizContent
  // https://github.com/nextauthjs/next-auth/issues/4922
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL
  })
});
