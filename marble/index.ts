import { createServer } from '@marblejs/http';
import { httpListener } from '@marblejs/http';
import { logger$ } from '@marblejs/middleware-logger';
import { bodyParser$ } from '@marblejs/middleware-body';
import { r } from '@marblejs/http';
import { map } from 'rxjs/operators';
import { initDB, insertValueIntoTest } from '../helpers';

const middlewares = [
  logger$(),
  bodyParser$(),
];

const test$ = r.pipe(
  r.matchPath('/'),
  r.matchType('POST'),
  r.useEffect(req$ => req$.pipe(
    map(req => req.body as { value: number; }),
    map(insertValueIntoTest),
    map(body => ({ body })),
  )));

const effects = [
  test$,
];

const listener = httpListener({
  middlewares,
  effects,
});

const server = createServer({
  port: 3000,
  listener,
});

(async () => {
  await initDB();
  (await server)();
})();
