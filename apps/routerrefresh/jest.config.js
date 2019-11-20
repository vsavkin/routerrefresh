module.exports = {
  name: 'routerrefresh',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/routerrefresh',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
