var gulp = require('gulp');
var runSequence = require('run-sequence');
var conventionalChangelog = require('gulp-conventional-changelog');
var conventionalGithubReleaser = require('conventional-github-releaser');
var bump = require('gulp-bump');
var gutil = require('gulp-util');
var git = require('gulp-git');
var fs = require('fs');
var pug = require('gulp-pug');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var connect = require('gulp-connect');


gulp.task('changelog', function () {
    return gulp.src('CHANGELOG.md', {
      buffer: false
    })
    .pipe(conventionalChangelog({
      preset: 'angular' // Or to any other commit message convention you use.
      }))
      .pipe(gulp.dest('./'));
  });
gulp.task('log', function() {
    gutil.log('== My Log Task ==');
    });
gulp.task('github-release', function(done) {
    conventionalGithubReleaser({
        type: "oauth",
        token: '0126af95c0e2d9b0a7c78738c4c00a860b04acc8' // change this to your own GitHub token or use an environment variable
      }, {
        preset: 'angular' // Or to any other commit message convention you use.
      }, done);
    });
// run this task by typing in gulp pug in CLI
gulp.task('pug', function() {  
  return gulp.src('./views/main.pug')
      .pipe(pug({pretty: true, basedir: __dirname + '/'}))
      .pipe(pug()) // pipe to pug plugin
      .pipe(gulp.dest('./public/html/')); // tell gulp our output folder
});
gulp.task('js', function() {
    gulp.src('js/*.js')
    .pipe(uglify())
    .pipe(concat('script.js'))
    .pipe(gulp.dest('./public/js/'));
  });
  gulp.task('css', function() {
    gulp.src('./styles/*.css')
    .pipe(concat('styles.css'))
    .pipe(gulp.dest('./public/styles/'));
  });
  gulp.task('html', function() {
    return gulp.src(['./public/html/layout.html','./public/html/main.html'])
    .pipe(concat('index.html'))
    .pipe(gulp.dest('./public'));
    });
  
