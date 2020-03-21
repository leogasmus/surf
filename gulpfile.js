const gulp         = require('gulp');
const sass         = require('gulp-sass');
const browserSync  = require('browser-sync');
const uglify       = require('gulp-uglify');
const concat       = require('gulp-concat');
const rename       = require('gulp-rename');
const del          = require('del');
const autoprefixer = require('gulp-autoprefixer');

/*
=============
#    Task   # 
============*/

gulp.task('clean', async function() {
  del.sync('dist')
});


// Styles
gulp.task('scss', function () {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(autoprefixer())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function() {
  return gulp.src([
    'node_modules/normalize.css/normalize.css',
    'node_modules/slick-carousel/slick/slick.css',
  ])
    .pipe(concat('_libs.scss'))
    .pipe(gulp.dest('app/scss'))
    .pipe(browserSync.reload({stream: true}))
});

// HTML

gulp.task('html', function() {
  return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}))
});

// JavaScript

gulp.task('js', function() {
  return gulp.src([
    'node_modules/slick-carousel/slick/slick.js',
  ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function() {
  return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({stream: true}))
});

// Live-Reload
gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });
});

/*
# Watchers
==========*/ 
gulp.task('watch', function() {
  gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('app/*.html', gulp.parallel('html'));
  gulp.watch('app/js/*.js', gulp.parallel('script'));
});


/*
#Build
========*/ 
gulp.task('export', async function() {
  const buildHtml = gulp.src('app/**/*.html')
    .pipe(gulp.dest('dist'))
  const builCss = gulp.src('app/css/**/*.css')
    .pipe(gulp.dest('dist/css'))
  const builJS = gulp.src('app/js/**/*.js')
    .pipe(gulp.dest('dist/js'))
  const builFonts = gulp.src('app/fonts/**/*.*')
    .pipe(gulp.dest('dist/fonts'))
  const builImg = gulp.src('app/img/**/*.*')
    .pipe(gulp.dest('dist/img'))
  
});

gulp.task('build', gulp.series('clean', 'export'))

gulp.task('default', gulp.parallel('css', 'scss', 'js', 'browser-sync', 'watch'));