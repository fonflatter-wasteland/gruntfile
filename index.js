module.exports = require('gruntfile')(function(grunt) {
  'use strict';

  var path = require('path');

  var filesToCheck = ['{lib,test}/**/*.js',
    '*.js'
  ];

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    depcheck: {
      options: {
        withoutDev: false,
        ignoreMatches: ['grunt*']
      },
      files: {
        src: ['.']
      }
    },
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
    'grunt-depcheck',
    'grunt-jscs',
    'grunt-mocha-istanbul',
  ];

  plugins.forEach(function(pluginName) {
    grunt.loadNpmTasks(pluginName);
  });

  grunt.registerTask('pre-test', ['depcheck',
    'jscs',
    'jshint',
  ]);

  grunt.registerTask('test', ['mocha_istanbul:coverage']);
});
