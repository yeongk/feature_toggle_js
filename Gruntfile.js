module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        test: 'test/unittest',
        src: ['index.js', 'lib'],
        dist: 'dist',

        clean: {
            build: {
                options: {
                    force: true
                },
                src: ['<%= dist %>']
            }
        },

        mocha_istanbul: {
            coverage: {
                src: ['<%= test %>/**/*.test.js'],
                options: {
                    reportFormats: ['cobertura', 'lcov'],
                    check: {
                        statements: 30,
                        lines: 30
                    },
                    ignoreLeaks: false,
                    ui: 'bdd',
                    excludes: ['<%= src %>/*.js'],
                    reporter: 'tap'
                }
            }
        },

        eslint: {
            options: {
                configFile: '.eslintrc.json'
            },
            target: ['<%= src %>/**/*.js']
        }

    });
    grunt.loadNpmTasks('gruntify-eslint');

    grunt.registerTask('test', ['eslint', 'mocha_istanbul:coverage']);

    grunt.registerTask('build', ['test']);

    grunt.registerTask('default', ['build']);

};