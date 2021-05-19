exports.config = {
  directConnect: true,
  capabilities: {
    'browserName': 'chrome'
  },
  framework: 'jasmine',
  specs: ['./spec/*.js'],
  jasmineNodeOpts: {
    defaultTimeoutInterval: 100000
  }
};