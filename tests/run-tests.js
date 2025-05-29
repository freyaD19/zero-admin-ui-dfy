/* eslint-disable @typescript-eslint/no-var-requires */
const { spawn } = require('child_process');
const { kill } = require('cross-port-killer');

const env = Object.create(process.env);
env.BROWSER = 'none';
env.TEST = true;
env.UMI_UI = 'none';
env.PROGRESS = 'none';
// flag to prevent multiple test
let once = false;

const startServer = spawn(/^win/.test(process.platform) ? 'npm.cmd' : 'npm', ['run', 'serve'], {
  env,
});

startServer.stderr.on('data', (data) => {
  // eslint-disable-next-line
  console.log(data.toString());
});

startServer.on('exit', () => {
  // In some minimal CI environments the "lsof" binary required by
  // cross-port-killer may be unavailable, causing the entire test script
  // to throw and surface as a failed run. Since the development server
  // has already exited at this point, it is safe to swallow any error
  // from the "kill" helper.
  kill(process.env.PORT || 8000).catch(() => {
    // ignore – best-effort cleanup only
  });
});

console.log('Starting development server for e2e tests...');
startServer.stdout.on('data', (data) => {
  console.log(data.toString());
  // hack code , wait umi
  if (!once && data.toString().indexOf('Serving your umi project!') >= 0) {
    // eslint-disable-next-line
    once = true;
    console.log('Development server is started, ready to run tests.');
    const testCmd = spawn(
      /^win/.test(process.platform) ? 'npm.cmd' : 'npm',
      ['run', 'playwright'],
      {
        stdio: 'inherit',
      },
    );
    testCmd.on('exit', (code) => {
      console.log(code);
      startServer.kill();
      process.exit(code);
    });
  }
});
