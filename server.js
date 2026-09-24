const { spawn } = require('child_process');
const path = require('path');

const isWin = process.platform === 'win32';
const nextCmd = isWin 
  ? path.join(__dirname, 'node_modules', '.bin', 'next.cmd')
  : path.join(__dirname, 'node_modules', '.bin', 'next');

const child = spawn(nextCmd, ['start', '-p', '3000'], {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_ENV: 'production',
    PORT: '3000'
  }
});

child.on('close', (code) => {
  process.exit(code);
});