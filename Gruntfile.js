'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Configurable paths
    var paths = {
        tmp: '.tmp',
        assets: './public/map_templates'
    };

    grunt.initConfig({

        // Project settings
        paths: paths,
        config: { version: '1.0.0'},

        // Watches files for changes and runs tasks based on the changed files
        watch: {                        
            less: {
                files: ['./src/bootstrap-gisp/less/**/*.less'],
                tasks: ['less', 'usebanner', 'autoprefixer', 'copy']
            }
        },

        // Clean out gen'd folders
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '<%= paths.tmp %>',
                        '<%= paths.assets %>'                       
                    ]
                }]
            }
        },

        // Lint LESS
        lesslint: {
            src: ['.src/bootstrap-gisp/less/**/*.less'],
            options: {
                csslint: {
                    'box-model': false,
                    'adjoining-classes': false,
                    'qualified-headings': false,
                    'empty-rules': false,
                    'outline-none': false,
                    'unique-headings': false
                }
            }
        },

        // Lint JS
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= paths.assets %>/js/**/*.js'
            ]
        },

        // LESS -> CSS
        less: {
            options: {
                paths: ['bootstrap-gisp/less', 'bower_components'],
                compress: true,
                sourceMap: false
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: './src/bootstrap-gisp/less',
                    src: ['gisp-theme.less'],
                    dest: './public/css/',
                    ext: '.min.css'
                }]                
            }
        },

        // Add vendor prefixed styles to CSS
        autoprefixer: {
            options: {
                browsers: ['> 4%', 'last 4 versions']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= paths.assets %>/css/',
                    src: '{,*/}*.css',
                    dest: '<%= paths.assets %>/css/'
                }]                
            }
        },

        // Compress images
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: './src/images',
                    src: '{,*/}*.{png,gif,jpeg,jpg}',
                    dest: '<%= paths.assets %>/images'
                }]
            }
        },        

        // Bundle JS/CSS files
        concat: {
            // bootstrap plugins
            pluginsjs: {
                src: [
                    // 'bower_components/bootstrap/js/affix.js',
                    // 'bower_components/bootstrap/js/alert.js',
                    'bower_components/bootstrap/js/dropdown.js',
                    'bower_components/bootstrap/js/tooltip.js',
                    // 'bower_components/bootstrap/js/modal.js',
                    //'bower_components/bootstrap/js/transition.js'
                    // 'bower_components/bootstrap/js/button.js',
                    // 'bower_components/bootstrap/js/popover.js',
                    // 'bower_components/bootstrap/js/carousel.js',
                    // 'bower_components/bootstrap/js/scrollspy.js',
                    // 'bower_components/bootstrap/js/collapse.js'
                    // 'bower_components/bootstrap/js/tab.js',
                ],
                dest: './public/js/vendor/bootstrap.min.js'
            }         
        },

        // Add a banner to the top of the generated LESS file.
        usebanner: {
            taskName: {
                options: {
                    position: 'top',
                    banner: '/* FCC GISP Theme v<%= config.version %> | http://fcc.github.io/design-standards/ */\n\n',
                    linebreak: true
                },
                files: {
                    src: ['<%= paths.assets %>/css/gisp-theme.min.css'],
                }
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                
                 { // fonts 
                    dot: true,
                    expand: true,
                    cwd: 'bower_components/font-awesome/fonts',
                    src: '**',
                    dest: '<%= paths.assets %>/fonts'
                }]
            }
                       
        }
    });

    grunt.registerTask('build', [
       // 'clean:dist',
        // 'jshint',
        'less',
        // 'imagemin',
        'usebanner',
        'concat',
        'autoprefixer',
        //'copy',
        //'clean:delTempFolders'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
};
