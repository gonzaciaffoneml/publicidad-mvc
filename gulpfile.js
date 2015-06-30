'use strict';
// generated on 2015-06-18 using generator-ui-component 0.0.7
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('templates', function(){
    gulp.src(['app/templates/**/*.hbs'])
        .pipe($.handlebars)
        .pipe(wrap('Handlebars.template(<%= contents %>)'))
        .pipe(declare({
            namespace: '__templates',
            noRedeclare: true, // Avoid duplicate declarations
        }))
        .pipe($.concat('templates.js'))
        .pipe(gulp.dest('.temp'));
});

gulp.task('styles', function() {
    return gulp.src('build/styles/**/*.scss')
        .pipe($.sourcemaps.init())
        .pipe($.sass({
            outputStyle: 'nested',
            includePaths: ['.'],
            onError: console.error.bind(console, 'Sass error:')
        }))
        .pipe($.postcss([
            require('autoprefixer-core')({
                browsers: ['last 10 versions','ie 8']
            }),
            require('csswring')({
               preserveHacks: true
           })
        ]))
        .pipe($.sourcemaps.write())
        .pipe($.size({
            title: 'css size'
        }))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('js', function() {
    return gulp.src('build/js/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('images', function() {
    return gulp.src('build/images/**/*')
        .pipe(($.cache($.imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{
                cleanupIDs: false
            }]
        }))))
        .pipe($.size({
            title: 'images size'
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('watch', function() {
    gulp.watch('build/styles/**/*.scss', ['styles']);
    gulp.watch('build/images/**/*', ['images']);
    gulp.watch('app/templates/**/*', ['templates']);
    gulp.watch('build/js/**/*', ['js']);
});

gulp.task('clean', require('del').bind(null, ['images','css', 'js', 'templates']));

gulp.task('default', ['styles', 'images', 'js', 'templates']);

gulp.task('build', ['clean'], function() {
    gulp.start('default');
});
