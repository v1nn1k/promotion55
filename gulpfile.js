const gulp = require('gulp');
const stylus = require('gulp-stylus');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();


gulp.task('stylus', () => {
    return gulp.src('*.styl')
        .pipe(stylus())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('.'))
        .pipe(browserSync.stream());

});

//gulp.task('watch', function() {
//    gulp.watch('*.styl', gulp.series('stylus'));
//});

gulp.task('serve', () => {
    browserSync.init({
        server: "."
    });
    gulp.watch('*.styl', gulp.series('stylus'));
    gulp.watch('*.js', gulp.series('stylus'));


});

gulp.task('default', gulp.series('stylus', 'serve'));