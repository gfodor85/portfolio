var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var clean = require('gulp-clean');
var browsersync = require('browser-sync').create();
var svgSprite = require('gulp-svg-sprites');



// Delete the dist directory
gulp.task('clean', function() {
  return gulp.src('dist')
 .pipe(clean());
});

//Copy files to dist directory
gulp.task('copy_index', function () {
   gulp.src('src/index.html')
  .pipe(gulp.dest('dist'));
});

gulp.task('copy_css', function () {
   gulp.src('src/assets/css/main.css')
  .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('copy_fonts', function () {
   gulp.src('src/assets/fonts/font-awesome.min.css')
  .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('copy_img', function () {
   gulp.src('src/assets/img/*.png')
  .pipe(gulp.dest('dist/assets/img'));
});

gulp.task('copy_svg', function () {
   gulp.src('src/assets/img/svg/symbols.svg')
  .pipe(gulp.dest('dist/assets/img/svg'));
});

gulp.task('copy_js', function () {
   gulp.src('src/assets/js/**/*.js')
  .pipe(gulp.dest('dist/assets/js'));
});


gulp.task('styles', function ()  {
  gulp.src('src/assets/css/main.sass')
    .pipe(sass({
        precision: 10,
        indentedSyntax: true
      }).on('error',  sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('src/assets/css'))
    .pipe(browsersync.stream());
});

gulp.task('browsersync', function () {
  browsersync.init({
    injectChanges: true,
    server: {
      baseDir: './src'
    }
  });

  gulp.watch(['src/assets/css/**/*.sass',  'styles']);
  gulp.watch('src/index.html').on('change', browsersync.reload );
});

gulp.task('sprites', function () {
    return gulp.src('src/assets/img/svg/*.svg')
    .pipe(svgSprite({
        mode: 'symbols',
        preview: false
    }))
    .pipe(gulp.dest('src/assets/img'));
});

gulp.task('default', ['copy_index', 'copy_css', 'copy_fonts',  'copy_img',  'copy_svg',  'copy_js', 'styles', 'browsersync', 'sprites']);
