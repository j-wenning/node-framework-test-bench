# Outline

Autocannon benchmarks testing load tolerance of Express, Koa, Marble, and h3 with logger and body-parsing middleware.  This felt like an adequate test for what's guaranteed to be run every request as an approximate minimum.  Feel free to extend this to cover additional cases with more complex implementations or lengthier computations/tasks.

Check/Modify any values in `scripts` before running anything.

# NPM Scripts

`test`

Output is sent to `results/test.txt` by default, but you can modify the script in the `package.json` as desired.
