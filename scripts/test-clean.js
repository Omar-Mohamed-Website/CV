#!/usr/bin/env node

const { spawn } = require('child_process');
const process = require('process');

const vitest = spawn('npx', ['vitest', ...process.argv.slice(2)], {
  stdio: ['inherit', 'inherit', 'pipe'],
  env: { ...process.env, NODE_NO_WARNINGS: '1' },
});

vitest.stderr.on('data', (data) => {
  const output = data.toString();
  if (!output.includes("The CJS build of Vite's Node API is deprecated")) {
    process.stderr.write(data);
  }
});

vitest.on('close', (code) => {
  process.exit(code || 0);
});

vitest.on('error', (error) => {
  console.error('Failed to start vitest:', error);
  process.exit(1);
});
