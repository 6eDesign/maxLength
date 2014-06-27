// gulp task dependencies
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var less = require('gulp-less');
var minifyCSS = require('gulp-minify-css');
var livereload = require('gulp-livereload');
var path = require('path');

// 
// BASE PREFIX
//

var input = 'build/';
var output = 'dist/';


// 
// DIST PATHS
// 

var dist = {
  outfile: 'maxLength.min.js',
  files: [
    input + 'js/jDom.js',
    input + 'js/maxLength.js'
  ]
};

//
// DIST TASK
//

gulp.task('scripts:dist', function() {
  return gulp.src(dist.files)
    .pipe(uglify())
    .pipe(concat(dist.outfile))
    .pipe(gulp.dest(output + 'js/'))
    .pipe(livereload());
});

// 
// VENDOR PATHS
// 
var vendor = {
  outfile: 'vendor.min.js',
  files: [
    input + 'js/jquery.min.js'
  ]
};

//
// VENDOR TASK
//

gulp.task('scripts:vendor', function() {
  return gulp.src(vendor.files)
    .pipe(uglify())
    .pipe(concat(vendor.outfile))
    .pipe(gulp.dest(output + 'js/'))
    .pipe(livereload());
});

//
// Demo JS: 
//
var demoJS = { 
  outfile: 'demo.min.js',
  files: [
    // input + 'js/jquery.min.js', 
    input + 'js/markdown.min.js', 
    input + 'js/jDom.js', 
    input + 'js/maxLength.js', 
    input + 'js/rainbow-custom.min.js', 
    input + 'js/demo.js'
  ]
}; 

//
// Demo JS Task: 
//

gulp.task('scripts:demo', function(){
  return gulp.src(demoJS.files)
    // .pipe(uglify())
    .pipe(concat(demoJS.outfile))
    .pipe(gulp.dest(output+'js/'))
    .pipe(livereload())
}); 

// 
// LESS PATHS
// 

var demoCSS = {
  files: [input + 'less/**/*.less'],
  prefix: input + 'less',
  outfile: 'demo.min.css'
};

//
// STYLESHEET TASK
//

gulp.task('stylesheet:demo', function () {
  return gulp.src(demoCSS.prefix + '/demo.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(concat(demoCSS.outfile))
    .pipe(gulp.dest(output + 'css/'))
    .pipe(livereload());
});

//
// HTML Task
//
gulp.task('html', function(){
  return gulp.src('*.html')
  .pipe(gulp.dest(''))
  .pipe(livereload()); 
}); 


//
// WATCHER TASK
//

gulp.task('watch', function() {
  gulp.watch(dist.files, ['scripts:dist']);
  gulp.watch(dist.files, ['scripts:demo']);
  gulp.watch(vendor.files, ['scripts:vendor']);
  gulp.watch(demoCSS.files, ['stylesheet:demo']);
  gulp.watch('*.html', ['html']); 
});

//
// TASK ALIAS'
//

gulp.task('js', ['scripts:dist', 'scripts:vendor', 'scripts:demo']);
gulp.task('less', ['stylesheet:demo']);
gulp.task('uber', ['scripts:dist', 'scripts:vendor', 'scripts:demo', 'stylesheet:demo', 'watch']);
