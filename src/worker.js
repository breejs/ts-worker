const { workerData } = require('worker_threads');

require('ts-node').register();
require('tsconfig-paths').register();

require(workerData.path);
