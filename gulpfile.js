/// <binding BeforeBuild='scss, bundle' ProjectOpened='watch-scss, scss, watch-js, bundle' />
//SASS config from https://www.sitepoint.com/simple-gulpy-workflow-sass/

var gulp = require('gulp');
var sass = require("gulp-sass");
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var gutil = require('gulp-util');
var rename = require('gulp-rename');
var purgeSourcemaps = require('gulp-purge-sourcemaps');

var inputScss = "./dist/scss/**/*.scss"; /*watches sub folders inside sass folder */
var output = "./static/css";

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'expanded'
};

gulp.task('scss', function () {
  return gulp
    .src(inputScss)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(output))
    .pipe(purgeSourcemaps())
    .pipe(rename({
      extname: '.min.css'
    }))
    .pipe(cleanCSS({
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest(output));
});

gulp.task('watch-scss', function () {
  gulp.watch(inputScss, ['scss']);

  gutil.log(process.version);
  gutil.log("You must be running on node version 6.1.x or higher for the compiler to work. Note: Visual Studio may need to path to your version of node, otherwise it defaults to an older version, Follow this link for more details: https://stackoverflow.com/questions/43849585/update-node-version-in-visual-studio-2017");
});