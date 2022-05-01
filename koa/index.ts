import Koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-body';
import Router from '@koa/router';
import { initDB, insertValueIntoTest } from '../helpers';

export const app = new Koa();

app.use(logger());

app.use(bodyParser());

const routing = new Router();

routing.post('/', async ctx => {
  ctx.body = await insertValueIntoTest(ctx.request.body);
});

app.use(routing.routes());

(async () => {
  await initDB();
  app.listen(3000);
})();
