// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-sabarivka-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/cashbox-frontend'),
      reporters: [{ type: 'lcov', subdir: '.' }, { type: 'text-summary' }],
      fixWebpackSourcePaths: true,
      include: [
        // Specify include pattern(s) first
        'src/**/*.(ts|js)',
        // Then specify "do not touch" patterns (note `!` sign on the beginning of each statement)
        '!src/main.(ts|js)',
        '!src/**/*.spec.(ts|js)',
        '!src/**/*.module.(ts|js)',
        '!src/**/environment*.(ts|js)',
      ],
    },
    reporters: ['progress', 'sabarivka', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false,
    restartOnFileChange: true,
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },
  });
};
