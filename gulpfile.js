var gulp = require('gulp');
var path = require('path');
var rename = require('gulp-rename');

gulp.task('default', function(){
    gulp.src('./dist/antd-demo/1.0.0/*.js')
        .pipe(gulp.dest(path.join(__dirname, '../swide/assets/js/userinfo/')));

    gulp.src('./dist/antd-demo/1.0.0/*.css')
        .pipe(gulp.dest(path.join(__dirname, '../swide/assets/css/userinfo/')))

    gulp.src('./indexm.html')
        .pipe(rename({
            basename: 'index'
        }))
        .pipe(gulp.dest(path.join(__dirname, '../swide/views/me/')));
});