module.exports = function(grunt) {
  grunt.initConfig({
    info: grunt.file.readJSON('bower.json'),
    meta: {
      banner: '/*!\n'+
              ' * <%= info.name %> - <%= info.description %>\n'+
              ' * v<%= info.version %>\n'+
              ' * <%= info.homepage %>\n'+
              ' * copyright <%= info.copyright %> <%= grunt.template.today("yyyy") %>\n'+
              ' * <%= info.license %> License\n'+
              '*/\n'
    },
    jshint: {
      main: [
        'Gruntfile.js',
        'bower.json',
        'lib/**/*.js',
        'test/*.js'
      ]
    },
    bower: {
      main: {
        dest: 'dist/_bower.js',
        exclude: [
          'assert'
        ]
      }
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: [
          'lib/{%= name %}.js'
        ],
        dest: 'dist/{%= name %}.js'
      },
      full: {
        src: [
          'dist/_bower.js',
          'lib/{%= name %}.js'
        ],
        dest: 'dist/{%= name %}.full.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: 'dist/{%= name %}.js',
        dest: 'dist/{%= name %}.min.js'
      },
      full: {
        src: 'dist/{%= name %}.full.js',
        dest: 'dist/{%= name %}.full.min.js'
      }
    },
    clean: {
      bower: [
        'dist/_bower.js'
      ],
      dist: [
        'dist'
      ]
    },
    watch: {
      scripts: {
        files: '<%= jshint.main %>',
        tasks: 'scripts',
        options: {
          livereload: true
        }
      },
      example: {
        files: [
          'example/*'
        ],
        options: {
          livereload: true
        }
      },
      ci: {
        files: [
          'Gruntfile.js',
          'test/index.html'
        ],
        tasks: 'default'
      }
    },
    mocha: {
      all: {
        src: 'test/index.html',
        options: {
          run: true,
          growl: true
        }
      }
    },
    plato: {
      main: {
        files: {
          'reports': ['lib/*.js']
        }
      }
    },
    connect: {
      server:{
        port: 8000,
        base: '.'
      },
      plato: {
        port: 8000,
        base: 'reports',
        options: {
          keepalive: true
        }
      }
    },
    bytesize: {
      scripts: {
        src: [
          'dist/*'
        ]
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-concat-bower');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-bytesize');
  grunt.loadNpmTasks('grunt-mocha');
  grunt.loadNpmTasks('grunt-plato');
  grunt.registerTask('scripts', ['jshint', 'bower', 'concat', 'uglify', 'clean:bower', 'mocha', 'bytesize']);
  grunt.registerTask('default', ['scripts']);
  grunt.registerTask('dev', ['default', 'connect:server', 'watch']);
  grunt.registerTask('reports', ['plato', 'connect:plato']);
};
