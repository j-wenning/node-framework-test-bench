import autocannon from 'autocannon';
import { spawn } from 'child_process';

const DURATION = 20; // s
const INIT_BUFFER = 1500; // ms
const CONNECTIONS = [10, 50, 100, 1000];
const DIRECTORIES = ['express', 'h3', 'koa', 'marble'];

console.log(
  'Running tests with current configuration:',
  { DURATION, DIRECTORIES, CONNECTIONS },
  '\n\n'
);

(async () => {
  for (const dirName of DIRECTORIES) {
    const child = spawn('npx', ['ts-node', dirName]);
    await new Promise(res => setTimeout(res, INIT_BUFFER));
    for (const connCt of CONNECTIONS) {
      const {
        errors,
        // @ts-ignore // node formats 2XX as 2xx
        '2xx': successes,
        latency,
        requests,
        throughput
      } = await autocannon({
        url: 'http://localhost:3000',
        duration: DURATION,
        connections: connCt,
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ value: 123 }),
      });
      const result = {
        successes,
        errors,
        latency: {
          average: latency.average,
          mean: latency.mean,
          min: latency.min,
          max: latency.max,
        },
        requests: {
          average: requests.average,
          mean: requests.mean,
          min: requests.min,
          max: requests.max,
        },
        throughput: {
          average: throughput.average,
          mean: throughput.mean,
          min: throughput.min,
          max: throughput.max,
        },
      };
      console.log(`${dirName}, ${connCt} connections:`, result, '\n');
    }
    const closedPromise = new Promise((res, rej) => {
      child.on('close', res);
      child.on('error', rej);
    });
    child.kill('SIGINT');
    try {
      await closedPromise;
    } catch (e: any) {
      console.error(`Failed on process '${dirName}'.\n`);
      console.error(e);
      process.exit(1);
    }
  }
})();
