'use strict';
// generated on 2015-06-18 using generator-ui-component 0.0.7
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('styles', function() {
    return gulp.src('src/styles/**/*.scss')
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
    return gulp.src('src/js/**/*.js')
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('images', function() {
    return gulp.src('src/images/**/*')
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
    gulp.watch('src/styles/**/*.scss', ['styles']);
    gulp.watch('src/images/**/*', ['images']);
});

gulp.task('clean', require('del').bind(null, ['images','css']));

gulp.task('default', ['styles', 'images']);

gulp.task('build', ['clean'], function() {
    gulp.start('default');
});
