#!/usr/bin/env node

if (process.env.npm_execpath?.includes('pnpm')) {
  process.exit(0);
}

console.error('Please use pnpm to manage dependencies in this repository.');
console.error('Installation instructions: https://pnpm.io/installation');
process.exit(1); 