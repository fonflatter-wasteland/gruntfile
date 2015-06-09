module.exports = require('gruntfile')(function(grunt) {
  'use strict';

  var path = require('path');

  var filesToCheck = ['{lib,test}/**/*.js',
    '*.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jscs: {
      files: filesToCheck,
      options: {
        config: '.jscsrc',
        requireCurlyBraces: ['if']
      }
    },
    jshint: {
      files: filesToCheck,
      options: {
        jshintrc: true,
      }
    },
    mocha_istanbul: {
      coverage: {
        src: 'test'
      }
    }
  });

  var plugins = ['grunt-contrib-jshint',
    'grunt-jscs',
    'grunt-mocha-istanbul',
  ];

  plugins.forEach(function(pluginName) {
    grunt.loadNpmTasks(pluginName);
  });

  grunt.registerTask('pre-test', ['npm-check',
    'jscs',
    'jshint',
  ]);

  grunt.registerTask('test', ['mocha_istanbul:coverage']);

  grunt.registerTask('npm-check', 'Checks package dependencies.', function() {
    var npmCheck = require('npm-check');
    var output = require('npm-check/lib/output');
    var options = {};

    var done = this.async();

    return npmCheck(options)
      .catch(function(err){
        grunt.log.writeln('[npm-check]', err.stack || err);
        process.exit(1);
      })
      .then(function(modules) {
        return output(modules, options);
      })
      .catch(function(err){
        grunt.log.writeln('[npm-check]', err.stack || err);
        process.exit(1);
      })
      .then(function () {
        return done(true);
      })
      .done();
  });
});
