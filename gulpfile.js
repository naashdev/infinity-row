var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');

gulp.task('dist-build', function(){

  gulp.src(['src/js/infinityRow.js'])
    .pipe(uglify({
      preserveComments: 'license'
    }))
    .pipe(rename({
			suffix: '.min',
			extname: '.js'
		}))
    .pipe(gulp.dest('dist/js/'))

  gulp.src('src/js/infinityRow.js')
  	.pipe(gulp.dest('dist/js/'));

  gulp.src('src/js/lib/modernizr.custom.js')
    .pipe(gulp.dest('dist/js/lib/'));

  gulp.src('src/css/core.css')
    .pipe(gulp.dest('dist/css/'));

});
