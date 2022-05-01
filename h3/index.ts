import { createServer } from 'http';
import { createApp, createRouter, useBody } from 'h3';
import logger from 'morgan';
import { initDB, insertValueIntoTest } from '../helpers';

const app = createApp();

app.use(logger('common'));

const router = createRouter()
  .post('/', async (req: any) => {
    return insertValueIntoTest(await useBody(req));
  });

app.use(router);

const server = createServer(app);

(async () => {
  await initDB();
  server.listen(3000);
})();
