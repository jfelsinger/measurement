'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    mocha = require('gulp-mocha');

gulp.task('lint', function() {
    return gulp.src([
            'gulpfile.js',
            'test/**/*.js',
            'src/**/*.js'
        ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(notify({ message: 'Linting task complete' }));
});

gulp.task('test', ['build'], function() {
    return gulp.src('test/**/*.js')
        .pipe(mocha({ reporter: 'list' }))
        .pipe(notify({ message: 'Testing task complete' }));
});

gulp.task('build', ['lint'], function() {
    return gulp.src('src/**/*.js')

        .pipe(uglify())

        .pipe(gulp.dest('dist'))
        .pipe(notify({ message: 'Script building task complete' }));
});

gulp.task('watch', ['test'], function() {
    // Tests
    gulp.watch('test/**/*.js', ['test']);

    // Linting Tasks
    gulp.watch('**/*.js', ['lint']);

    // Building Tasks
    gulp.watch('src/**/*.js', ['build']);
});

gulp.task('default', ['watch']);
