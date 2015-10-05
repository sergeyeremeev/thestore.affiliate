/*jslint node: true */
'use strict';

var gulp = require('gulp'),
    minifyHTML = require('gulp-minify-html'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    minifyCSS = require('gulp-minify-css'),
    imageop = require('gulp-image-optimization'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer');

// clean task to clean build folder before building an entire app
gulp.task('clean', function (cb) {
    del('build/**/*', cb);
});

// minify scripts
gulp.task('scriptsMin', function () {
    gulp.src('dev/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build'))
        .pipe(reload({ stream: true }));
});

// copy scripts
gulp.task('copy-scripts', function () {
    return gulp.src('dev/**/*.js')
        .pipe(gulp.dest('build'));
});

// sass to css
gulp.task('sass', function () {
    gulp.src('dev/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(autoprefixer({browsers: ['last 2 versions']}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('build/css/'));
});

// minify styles
gulp.task('stylesMin', function () {
    gulp.src('dev/**/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('build'))
        .pipe(reload({ stream: true }));
});

// minify html
gulp.task('htmlMin', function () {
    var opts = {
        empty: true,
        spare: true
    };

    return gulp.src('dev/**/*.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest('build'));
});

// copy html
gulp.task('copy-html', function () {
    return gulp.src('dev/**/*.html')
        .pipe(gulp.dest('build'));
});

// optimize images
gulp.task('images', function (cb) {
    gulp.src(['dev/**/*.png', 'dev/**/*.jpg', 'dev/**/*.gif', 'dev/**/*.jpeg'])
        .pipe(imageop({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('build'));
});

// watch task
gulp.task('serve', function () {
    browserSync({
        port: 8000,
        server: {
            baseDir: 'build'
        }
    });

    gulp.watch('dev/**/*.scss', ['sass']);
    gulp.watch('dev/**/*.html', ['copy-html']);
    gulp.watch(['dev/**/*.png', 'dev/**/*.jpg'], ['images']);
    //gulp.watch('dev/**/*.js', ['scripts']);
});

// default build task to clean build directory, then create the correct folder
// structure with minified files and optimized images.
gulp.task('default', function () {
    gulp.start('copy-scripts', 'copy-html', 'sass', 'images');
});
