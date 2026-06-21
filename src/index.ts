import { Elysia } from 'elysia';
import { db } from './db';
import { users } from './db/schema';

const app = new Elysia()
  .get('/ping', () => ({ status: 'OK', message: 'pong' }))
  .get('/users', async () => {
    try {
      const allUsers = await db.select().from(users);
      return allUsers;
    } catch (error) {
      return { error: 'Database connection failed or table does not exist yet.' };
    }
  })
  .listen(process.env.PORT || 3000);

console.log(
  `🚀 Server is running at http://${app.server?.hostname}:${app.server?.port}`
);
