/* jshint node: true */
module.exports = function(grunt) {

    grunt.initConfig({

        npmPackage: grunt.file.readJSON('package.json'),
        bowerPackage: grunt.file.readJSON('bower.json'),

        uglify: {
            min: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**/*.js',
                    dest: 'dist',
                    ext: '.min.js'
                }],
                options: {

                }
            }
        },

        sass: {
            min: {
                files: {
                    'dist/scrollSlider.min.css': 'src/scrollSlider.scss'
                },
                options: {
                    outputStyle: 'compressed',
                    sourceMap: false,
                    precision: 5,
                    includePaths: ['node_modules']
                }
            },
            expanded: {
                files: {
                    'dist/scrollSlider.css': 'src/scrollSlider.scss'
                },
                options: {
                    outputStyle: 'expanded',
                    sourceMap: false,
                    precision: 5,
                    includePaths: ['node_modules']
                }
            }
        },

        copy: {
            jsFiles: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.js'],
                    dest: 'dist'
                }]
            }
        },

        jshint: {
            options: {
                'jshintrc': '.jshintrc'
            },
            all: ['src', 'Gruntfile.js']
        },

        jscs: {
            options: {
                config: '.jscsrc'
            },
            scripts: {
                files: {
                    src: ['src/**/*.js', 'Gruntfile.js']
                }
            }
        },

        includereplace: {
            dist: {
                options: {
                    globals: {
                        repositoryUrl: '<%= npmPackage.repository.url %>',
                        npmRepositoryName: '<%= npmPackage.name %>',
                        bowerRepositoryName: '<%= bowerPackage.name %>'
                    },
                    prefix: '{{ ',
                    suffix: ' }}'
                },
                src: 'demo/index.html',
                dest: 'index.html'
            }
        },

        watch: {
            jsFiles: {
                expand: true,
                files: ['src/**/*.js', 'Gruntfile.js'],
                tasks: ['jshint', 'jscs', 'copy', 'uglify'],
                options: {
                    spawn: false
                }
            },
            cssFiles: {
                expand: true,
                files: ['src/**/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false
                }
            },
            demoFiles: {
                expand: true,
                files: ['demo/**/*.html'],
                tasks: ['includereplace'],
                options: {
                    spawn: false
                }
            }
        },

        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                commitFiles: ['package.json', 'bower.json'],
                tagName: '%VERSION%',
                push: false
            }
        }

    });

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['jshint', 'jscs', 'uglify', 'sass', 'copy', 'includereplace']);

};
