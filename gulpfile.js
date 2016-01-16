var gulp = require('gulp');
var clean = require('gulp-clean');
var minifyHTML = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');
var runSequence = require('run-sequence');
var w3cjs = require('gulp-w3cjs');
var root_dir = 'dev/';
var deploy_dir = 'dist';
 
gulp.task('clean', function() {
	return gulp.src([deploy_dir], { read: false })
		.pipe(clean());
});
  
gulp.task('w3cjs', function () {
	return gulp.src(root_dir + 'index.html')
        .pipe(w3cjs());
});
 
gulp.task('minify-css', function() {
	return gulp.src(root_dir + 'css/*.css')
		.pipe(minifyCSS())
		.pipe(gulp.dest(deploy_dir + "/css"));
})

gulp.task('minify-html', function() {
	return gulp.src(root_dir + 'index.html')
		.pipe(minifyHTML())
		.pipe(gulp.dest(deploy_dir));
});

gulp.task('copy', function() {
	return gulp.src(root_dir + "img/**")
		.pipe(gulp.dest(deploy_dir + '/img'));
});

gulp.task('build', function(cb) {
	runSequence('clean', 'copy', ['minify-html', 'minify-css'], 'w3cjs', cb)
});
  