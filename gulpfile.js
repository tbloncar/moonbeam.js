var fs = require('fs');
var path = require('path');
var through = require('through2');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var util = require('gulp-util');
var gulp = require('gulp');

var paths = {
  src: ['./src/**/*.js'],
  templates: ['./src/templates/*.html']
};

gulp.task('lint', function() {
  return gulp.src(paths.src)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('scripts', function() {
  return gulp.src(paths.src)
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(concat('moonbeam.min.js'))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('demo'));
});

// Plugin generates custom template cache
function compile() {
  var cachePath = './src/templates/cache.js';
  var cacheFD = fs.openSync(cachePath, 'a');
  var cacheWritten = false;

  function CompileTemplates(file, enc, cb) {
    if(file.isBuffer()) {
      var fname = path.basename(file.path).split('.')[0];
      var contents = String(file.contents).trim();

      // Create template cache assignment string
      var assignmentStr = 'TEMPLATECACHE["' + fname + '"] = \'' +
        contents.split('\n').join('\' + \'') + '\'; // jshint ignore:line';

      // If the cache has not yet been written,
      // write over existing content and set up TEMPLATECACHE
      // store
      if(!cacheWritten) {
        fs.writeFileSync(cachePath, '');
        fs.writeSync(cacheFD, 'var TEMPLATECACHE = {};');
      }

      // Add the template string to the TEMPLATECACHE store;
      // it is indexed by its file name
      fs.writeSync(cacheFD, "\n" + assignmentStr);

      if(!cacheWritten) {
        cacheWritten = true; 
      }
    }

    cb(null, file);
  }

  return through.obj(CompileTemplates);
}

gulp.task('templates', function() {
  return gulp.src(paths.templates)
    .pipe(compile());
});

gulp.task('watch', function() {
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.src, ['lint', 'scripts'])
});

gulp.task('default', ['watch']);