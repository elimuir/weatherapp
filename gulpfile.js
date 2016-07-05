var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('styles', function() {
    gulp.src('precompiled/stylus/*.styl')
        .pipe(stylus({
          "include css": true,
        }))
        .pipe(gulp.dest('./css/'));
});

  // Watch task
gulp.task('default',function() {
    gulp.watch('precompiled/stylus/**/*.styl',['styles']);
});
