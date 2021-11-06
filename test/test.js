const path = require('path');
const test = require('ava');
const delay = require('delay');
const Bree = require('bree');

const plugin = require('../src');

Bree.extend(plugin);

const root = path.join(__dirname, 'jobs');
const baseConfig = {
  root,
  timeout: 0,
  interval: 0,
  hasSeconds: false,
  defaultExtension: 'js'
};

test('will validate job when given ts file string', (t) => {
  t.notThrows(() => {
    // eslint-disable-next-line no-unused-vars
    const bree = new Bree({
      jobs: ['short.ts'],
      ...baseConfig
    });
  });
});

test('will validate job when ".ts" is defined in config', (t) => {
  t.notThrows(() => {
    // eslint-disable-next-line no-unused-vars
    const bree = new Bree({
      ...baseConfig,
      jobs: ['short.ts'],
      acceptedExtensions: ['.ts', '.js', '.mjs']
    });
  });
});

test('will run job defined in ts', async (t) => {
  t.plan(2);

  const logger = {
    info: () => {}
  };

  const bree = new Bree({
    jobs: ['short.ts'],
    ...baseConfig,
    logger
  });

  bree.start();

  bree.on('worker created', (name) => {
    t.true(typeof bree.workers[name] === 'object');
  });

  bree.on('worker deleted', (name) => {
    t.true(typeof bree.workers[name] === 'undefined');
  });

  await delay(100);

  await bree.stop();
});

test('will run job defined in js', async (t) => {
  t.plan(2);

  const logger = {
    info: () => {}
  };

  const bree = new Bree({
    jobs: ['short.js'],
    ...baseConfig,
    logger
  });

  bree.start();

  bree.on('worker created', (name) => {
    t.true(typeof bree.workers[name] === 'object');
  });

  bree.on('worker deleted', (name) => {
    t.true(typeof bree.workers[name] === 'undefined');
  });

  await delay(100);

  await bree.stop();
});
