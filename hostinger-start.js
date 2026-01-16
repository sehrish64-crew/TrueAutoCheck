#!/usr/bin/env node

/**
 * Hostinger Next.js Server Starter
 * This script starts the Next.js application on Hostinger
 */

const { spawn } = require('child_process');
const path = require('path');

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'production';

console.log(`Starting TrueAutoCheck Next.js Server`);
console.log(`Environment: ${NODE_ENV}`);
console.log(`Port: ${PORT}`);
console.log('-------------------------------------------\n');

// Start Next.js server
const server = spawn('node', [
  path.join(__dirname, 'node_modules', '.bin', 'next'),
  'start',
  '-p',
  PORT
], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV,
    PORT
  }
});

server.on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

server.on('exit', (code) => {
  console.log(`\nServer exited with code ${code}`);
  process.exit(code);
});

// Handle signals
process.on('SIGTERM', () => {
  console.log('\nReceived SIGTERM, shutting down gracefully...');
  server.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('\nReceived SIGINT, shutting down gracefully...');
  server.kill('SIGINT');
});
