/**
 * Dependencies
 */
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concate = require('gulp-concat'),
    handlebars = require('gulp-handlebars'),
    wrap = require('gulp-wrap'),
    declare = require('gulp-declare'),
    sass = require('gulp-sass'),
    size = require('gulp-size'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    minifyCSS = require('gulp-minify-css'),
    clean = require('gulp-clean');

/**
 * Template task
 */
gulp.task('templates', function(){
    gulp.src(['app/templates/**/*.hbs'])
        .pipe(handlebars())
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: '__templates',
            noRedeclare: true, // Avoid duplicate declarations
        }))
        .pipe(concate('templates.js'))
        .pipe(gulp.dest('app/templates'));
});


/**
 * Images task
 */
gulp.task('images', function(){
    gulp.src('app/images/**/*')
        .pipe (imagemin({
            progressive: true,
            interlaced: true
        }))
        .pipe(size({
            title: 'Images size:'
        }))
        .pipe(gulp.dest('/build/images'));
});


/**
 * Js task
 */
gulp.task('js-build', function() {
    gulp.src([
        'bower_components/jquery/dist/jquery.js',
        'bower_components/handlebars/handlebars.js',
        'bower_components/underscore/underscore.js',
        'bower_components/backbone/backbone.js',
        'bower_components/chico/dist/ui/chico.js',

        //// MOCKS /////
        'bower_components/jquery-mockjax/jquery.mockjax.js',
        'mocks/mocks.js',


        /////// APPLICATION ///////
        // templates
        'app/templates/templates.js',

        // app init
        'app/app.js',

        // messaging files
        'app/views/**/*.js',
        'app/models/**/*.js',
        'app/collections/**/*.js',
        'app/router.js',
        'app/utils/*.js',

    ])
    .pipe(concate('bundle.js'))
    .pipe(size({
        title: 'JS size:'
    }))
    .pipe(gulp.dest('build/scripts/'));
});

gulp.task('js-dist', function() {
    gulp.src([
        'build/scripts/bundle.js',
    ])
    .pipe(uglify())
    .pipe(size({
        title: 'JS size:'
    }))
    .pipe(gulp.dest('dist/'));
});


/**
 * Css task
 */
gulp.task('styles-build', function() {
    gulp.src([
            'app/styles/*'
        ])
        .pipe(sass({
            style: 'expanded'
        }))
        .pipe(autoprefixer({
            browsers: ['last 5 versions','Firefox ESR']
        }))
        .pipe(concate('bundle.css'))
        .pipe(size({
            title: 'CSS size:'
        }))
        .pipe(gulp.dest('build/styles/'));
});

gulp.task('styles-dist', function() {
    gulp.src([
            'build/styles/bundle.css'
        ])
        .pipe(minifyCSS())
        .pipe(size({
            title: 'CSS size:'
        }))
        .pipe(gulp.dest('dist/'));
});


/**
 * General task
 */
gulp.task('clean-build-js', function () {
    return gulp.src('build/js', {read: true})
        .pipe(clean());
});

gulp.task('clean-build-css', function () {
    return gulp.src('build/css', {read: true})
        .pipe(clean());
});

gulp.task('clean-dist', function () {
    return gulp.src('dist/', {read: false})
        .pipe(clean());
});

/**
 * Gulp tasks names
 */
gulp.task('default', ['clean-build-js', 'clean-build-css','templates', 'images', 'js-build', 'styles-build']);
gulp.task('build', ['default']);

gulp.task('dist', ['build', 'clean-dist'], function () {
    setTimeout(function () {
        gulp.start(['js-dist', 'styles-dist']);
    }, 100);
});

gulp.task('watch', function() {
    gulp.start('default');
    gulp.watch([
        'app/*.js',
        'app/**/*.js',
        'mocks/mock.js'
    ], ['js-build']);

    gulp.watch([
        'app/**/*.scss'
    ], ['styles-build']);

    gulp.watch([
        'app/**/*.hbs'
    ], ['templates', 'js-build']);

});
