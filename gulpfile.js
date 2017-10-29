var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var svgSymbols = require('gulp-svg-symbols');



gulp.task('styles', function ()  {
  gulp.src('assets/css/main.sass')
    .pipe(sass({
        precision: 10,
        indentedSyntax: true
      }).on('error',  sass.logError))
    .pipe(gulp.dest('assets/css'))
    .pipe(browserSync.stream());
});

gulp.task('serve', function () {
  browserSync.init({
    injectChanges: true,
    server: {
      baseDir: './'
    }
  });

  gulp.watch('assets/css/**/*.sass',  ['styles']);
  gulp.watch('./**/*.html').on('change', browserSync.reload );
});

gulp.task('sprites', function () {
  return gulp.src('assets/img/svg/*.svg')
    .pipe(svgSymbols())
    .pipe(gulp.dest('assets/img'));
});

gulp.task('default', ['styles', 'serve', 'sprites']);
