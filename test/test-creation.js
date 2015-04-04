/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('generator-silex-app', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('react-gulp-browserify:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
        'bower.json',
        'package.json',
        'gulpfile.js',
        'composer.json',
        'assets/scripts/ui/LoginForm.jsx',
        'assets/styles/_main.scss',
    ];


    helpers.mockPrompt(this.app, {
        features: [
            'includeSass',
            'includeBootstrap',
            'includeModernizr',
        ]
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
