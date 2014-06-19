var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('default', function() {
    gulp.src('index.js')
        .pipe(browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./bundle.js'))
});