import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import { initDB, insertValueIntoTest } from '../helpers';

const app = express();

app.use(bodyParser.json());

app.use(logger('dev'));

app.post('/', async (req, res) => {
  res.json(await insertValueIntoTest(req.body));
});

(async () => {
  await initDB();
  app.listen(3000);
})();
