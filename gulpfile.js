var fs = require('fs');
var gulp = require('gulp');
var merge = require('merge-stream');
var spritesmith = require('gulp.spritesmith');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var spritePath = './images/sprites';
var imagePath = '../images/';

gulp.task('sprite', function () {
  fs.readdir(spritePath, function (err, files) {
    files.forEach(function (spriteName) {
      var spriteData = gulp.src(spritePath + '/' + spriteName + '/*.png').pipe(spritesmith({
        imgName: imagePath + spriteName + '.png',
        cssName: '_' + spriteName + '.scss'
      }));
     
      var imgStream = spriteData.img
        .pipe(gulp.dest('images/'));
     
      var cssStream = spriteData.css
        .pipe(gulp.dest('stylesheets/sprites/'));

      merge(imgStream, cssStream);
    });
  });
});

gulp.task('sprite-retina', function () {
  fs.readdir(spritePath, function (err, files) {
    files.forEach(function (spriteName) {
      var spriteData = gulp.src(spritePath + '/' + spriteName + '/*.png').pipe(spritesmith({
        retinaSrcFilter: [spritePath + '/' + spriteName + '/*@2x.png'],
        imgName: imagePath + spriteName + '.png',
        retinaImgName: imagePath + spriteName + '@2x.png',
        cssName: '_' + spriteName + '.scss'
      }));
     
      var imgStream = spriteData.img
        .pipe(gulp.dest('images/'));
     
      var cssStream = spriteData.css
        .pipe(gulp.dest('stylesheets/sprites/'));

      merge(imgStream, cssStream);
    });
  });
});

gulp.task('sass', function () {
  gulp.src('stylesheets/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('stylesheets/'));
});
