var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
    gulp.src('index.js')
        .pipe(browserify({
            insertGlobals : true,
            standalone : 'skynetPlugins.skynet-mobile-plugin-greeting',
            debug : true
        }))
        .pipe(rename('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./'))
});