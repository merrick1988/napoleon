module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        buildFolder: 'build/',
        sourceFolder: 'src/',
        clean: {
            'styles': '<%= buildFolder %>/styles/',
            'fonts': '<%= buildFolder %>/fonts/',
            'images': '<%= buildFolder %>/images/',
            'scripts': '<%= buildFolder %>/scripts/',
            'views': '<%= buildFolder %>/views/'
        },
        env: {
            dev: {
                NODE_ENV: 'development'
            },
            dist: {
                NODE_ENV: 'distribution'
            }
        },
        copy: {
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= sourceFolder %>/fonts',
                        src: '**',
                        dest: '<%= buildFolder %>/fonts'
                    }
                ]
            },
            images: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= sourceFolder %>/images',
                        src: '**',
                        dest: '<%= buildFolder %>/images'
                    }
                ]
            },
            views: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= sourceFolder %>/views/',
                        src: '**/*.html',
                        dest: '<%= buildFolder %>/views/'
                    }
                ]
            }
        },
        sass: {
            dev: {
                options: {
                    style: 'expanded'
                },
                files: {
                    '<%= buildFolder %>/styles/styles.css': '<%= sourceFolder %>/styles/app/styles.scss'
                }
            },
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    '<%= buildFolder %>/styles/styles.css': '<%= sourceFolder %>/styles/app/styles.scss'
                }
            }
        },
        preprocess: {
            index: {
                src: '<%= sourceFolder %>/index.html',
                dest: '<%= buildFolder %>/index.html'
            }
        },
        watch: {
            options: {
                spawn: false
            },
            'styles-app': {
                files: ['<%= sourceFolder %>/styles/app/*.scss'],
                tasks: 'sass:dev'
            },
            'styles-vendor': {
                files: '<%= sourceFolder %>/styles/vendor/**/*',
                tasks: ['clean:styles', 'copy:styles']
            },
            fonts: {
                files: '<%= sourceFolder %>/fonts/**/*',
                tasks: ['clean:fonts', 'copy:fonts']
            },
            images: {
                files: ['<%= sourceFolder %>/images/**/*'],
                tasks: ['clean:images', 'copy:images']
            },
            'scripts-app': {
                files: '<%= sourceFolder %>/scripts/app/**/*',
                tasks: ['copy:scripts-app']
            },
            'scripts-vendor': {
                files: '<%= sourceFolder %>/scripts/vendor/**/*',
                tasks: ['clean:scripts', 'copy:scripts']
            },
            index: {
                files: '<%= sourceFolder %>/index.html',
                tasks: 'preprocess'
            },
            views: {
                files: '<%= sourceFolder %>/views/**/*.html',
                tasks: ['copy:views']
            }
        },
        concat: {
            'scripts': {
                files: {
                    '<%= buildFolder %>/scripts/vendor.js': '<%= sourceFolder %>/scripts/vendor/*.js',
                    '<%= buildFolder %>/scripts/app.js': '<%= sourceFolder %>/scripts/app/*.js'
                }
            },
            'styles': {
                files: {
                    '<%= buildFolder %>/styles/vendor.css': '<%= sourceFolder %>/styles/vendor/**/*.css'
                }
            }
        }
    });

    // Load the plugins that provide tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-env');
    grunt.loadNpmTasks('grunt-preprocess');


    // Registering tasks
    grunt.registerTask('development', ['clean', 'env:dev', 'copy', 'preprocess', 'sass:dev', 'concat']);
//    grunt.registerTask('distribution', ['clean:all', 'env:dist', ' distribution-copy', 'uglify', 'concat', 'preprocess', 'sprite', 'cssmin', 'clean:styles-icons', 'sass:dist']);

    grunt.registerTask('dev', 'Main task for development', function () {   /* Run this task - 'grunt dev' */
        grunt.task.run('development');
        grunt.task.run('watch');
    });

//    grunt.registerTask('dist', 'Main task for production, to create minified app', function () {   /* Run this task - 'grunt dist' */
//        grunt.task.run('distribution');
//    });

};
