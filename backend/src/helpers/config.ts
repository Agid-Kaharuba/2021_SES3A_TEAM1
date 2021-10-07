import dotenv from 'dotenv';

dotenv.config();

export default {
  STAGE: process.env.STAGE as string,
  API_PORT: process.env.API_PORT as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
  DATABASE_NAME: process.env.DATABASE_NAME as string,
  TEST_DATABASE_NAME: process.env.TEST_DATABASE_NAME as string,
  TOKEN_SECRET: process.env.TOKEN_SECRET as string,
  SALT: Number(process.env.SALT),
};
