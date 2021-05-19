let SpecReporter = require('jasmine-spec-reporter').SpecReporter

exports.config = {
  directConnect: true,
  capabilities: {
    'browserName': 'chrome'
  },
  framework: 'jasmine',
  specs: ['./spec/*.js'],
  jasmineNodeOpts: {
    defaultTimeoutInterval: 100000,
    print: function() {}
  },
  onPrepare: function () {
    jasmine.getEnv().addReporter(
      new SpecReporter({
        spec: {
          displayStacktrace: true,
        },
      })
    )
  },
};