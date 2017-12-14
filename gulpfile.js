var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var minify = require('gulp-minify');
var cleancss = require('gulp-clean-css');
var watch = require('gulp-watch');
var runsequence = require('run-sequence');
var browserSync = require('browser-sync')
var prettify = require('gulp-prettify');
var concat = require('gulp-concat');

var buildpath = 'build';

gulp.task('sass', function(){
  return gulp.src('build/scss/*.scss')
  .pipe(plumber())
  .pipe(sass())
  .pipe(cleancss())
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest(buildpath+'/css'));
});

gulp.task('js', function(){
  return gulp.src(['js/classes.js',
  'js/form-module.js',
  'js/activity-module.js',
  'js/storage.js',
  'js/template.js',
  'js/ui.js',
  'js/main-module.js',
  'js/modal.js'])
  .pipe(concat('main.js'))
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest(buildpath+'/js'));
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
  })
});

gulp.task('watch', function(){
  runsequence('sass','js','browserSync');
  gulp.watch('build/scss/*.scss', ['sass']);
  gulp.watch('js/*.js', ['js']);
});
