const path = require('path');
const { Worker } = require('worker_threads');

function plugin(opts, Bree) {
  opts = opts || {};

  const oldInit = Bree.prototype.init;

  // define accepted extensions
  Bree.prototype.init = function () {
    if (!this.config.acceptedExtensions.includes('.ts'))
      this.config.acceptedExtensions.push('.ts');

    oldInit.bind(this)();
  };

  const oldCreateWorker = Bree.prototype.createWorker;

  Bree.prototype.createWorker = function (filename, options) {
    if (filename.endsWith('.ts')) {
      options.workerData.path = filename;

      return new Worker(path.resolve(__dirname, 'worker.js'), options);
    }

    return oldCreateWorker(filename, options);
  };
}

module.exports = plugin;
