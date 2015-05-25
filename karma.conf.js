
module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'browserify'],
    files: [
      'test/setup.js',
      'app/**/*.js'
    ],
    preprocessors: {
      'test/setup.js': ['browserify'],
      'app/**/*.js': ['browserify']
    },
    browserify: {
      bare: true,
      debug: true
    },
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeCanary'],
    singleRun: false
  });
};
