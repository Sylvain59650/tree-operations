var babel = require("gulp-babel");
var gulp = require('gulp');
var concat = require("gulp-concat");
var watch = require('gulp-watch');
//var gutil = require('gulp-util');

var uglify = require('gulp-uglify');




gulp.task("tree-operations.min.js", () => {
  return gulp.src([
      "sources/tree-operations.js"
    ])
    .pipe(concat("tree-operations.min.js"))
    .pipe(babel({
      presets: ["es2015"],
      compact: true
    }))
    .pipe(gulp.dest("./distrib"))
});


gulp.task("tests-es5.js", () => {
  return gulp.src([
      "tests/tests-es6.js"
    ])
    .pipe(concat("tests-es5.js"))
    .pipe(babel({
      presets: ["es2015"],
      compact: false
    }))
    .pipe(gulp.dest("./tests"))
});


gulp.task('watch:tree-operations.min.js', function() {
  watch("./sources/tree-operations.js", function() {
    gulp.run('tree-operations.min.js');
  });
});



gulp.task('default', ['tree-operations.min.js', 'tests-es5.js']);


gulp.task('all', ['default']);

gulp.task("watch", ["watch:tree-operations.min.js"]);