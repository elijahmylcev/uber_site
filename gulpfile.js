const gulp = require("gulp");
const browserSync = require("browser-sync");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");

gulp.task("server", function () {
  browserSync({
    server: {
      baseDir: "docs",
    },
  });

  gulp.watch("docs/*.html").on("change", browserSync.reload);
});

gulp.task("styles", function () {
  return gulp
    .src("src/sass/**/*.+(scss|sass)")
    .pipe(
      sass({
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(
      rename({
        suffix: ".min",
        prefix: "",
      })
    )
    .pipe(autoprefixer())
    .pipe(
      cleanCSS({
        compatibility: "ie8",
      })
    )
    .pipe(gulp.dest("docs/css/"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  gulp.watch("src/sass/**/*.+(scss|sass)", gulp.parallel("styles"));
});

gulp.task("build:styles", function () {
  return gulp
    .src("src/sass/**/*.+(scss|sass)")
    .pipe(
      sass({
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(
      rename({
        suffix: ".min",
        prefix: "",
      })
    )
    .pipe(autoprefixer())
    .pipe(
      cleanCSS({
        compatibility: "ie8",
      })
    )
    .pipe(gulp.dest("docs/css"));
});

gulp.task("html", function () {
  return gulp.src("src/index.html").pipe(gulp.dest("docs/"));
});

gulp.task("build:js", function () {
  return gulp.src("src/js/*.js").pipe(gulp.dest("docs/js/"));
});

gulp.task("img", function () {
  return gulp
    .src("src/img/**/*.+(jpg|png|jpeg)")
    .pipe(imagemin())
    .pipe(gulp.dest("docs/img/"));
});

gulp.task("icons", function () {
  return gulp
    .src("src/icons/**/*.+(png|svg|ico)")
    .pipe(imagemin())
    .pipe(gulp.dest("docs/icons/"));
});

gulp.task("lib", function () {
  return gulp.src("src/css/*.css").pipe(gulp.dest("docs/css/"));
});

gulp.task("default", gulp.parallel("watch", "server", "styles"));
gulp.task("build", gulp.parallel("html", "lib", "icons", "build:styles", "img", "build:js"))