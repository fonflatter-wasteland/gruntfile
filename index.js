module.exports = function(grunt) {
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
    }
  });

  var plugins = ['grunt-contrib-jshint',
    'grunt-depcheck',
    'grunt-jscs',
  ];

  plugins.forEach(function(pluginName) {
    grunt.loadTasks(path.join(__dirname, 'node_modules', pluginName, 'tasks'));
  });

  grunt.registerTask('pre-test', ['depcheck',
    'jscs',
    'jshint',
  ]);
};
