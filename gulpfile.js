/**
 * Created by florendegier on 02/03/16.
 */
var
    gulp = require('gulp'),
    inject = require('gulp-inject'),
    sass = require('gulp-sass');

var
    source = 'src/',
    dest = 'dist/';

var bootstrapSass = {
    in: './bower_components/bootstrap-sass/'
};

var fonts = {
    in: [source + 'fonts/*.*', bootstrapSass.in + 'assets/fonts/**/*'],
    out: dest + 'fonts/'
};

var css = {
    in: source + 'css/main.scss',
    out: dest + 'css/',
    watch: source + 'css/**/*',
    sassOpts: {
        outputStyle: 'nested',
        precision: 3,
        errLogToConsole: true,
        includePaths: [bootstrapSass.in + 'assets/stylesheets']
    }
};


gulp.task('fonts', function () {
    return gulp
        .src(fonts.in)
        .pipe(gulp.dest(fonts.out));
});

gulp.task('sass', ['fonts'], function () {
    return gulp.src(css.in)
        .pipe(sass(css.sassOpts))
        .pipe(gulp.dest(css.out));

});

gulp.task('inject',['sass'], function () {
    var target = gulp.src('./src/index.html');
    var sources = gulp.src(['./dist/css/*.css'],
        {read: false});
    return target.pipe(inject(sources,{relative:true}))
        .pipe(gulp.dest('./dist'));
});


gulp.task('test', function() {
   console.log("test Not implemented");
});

gulp.task('build', ['inject'] , function () {
   console.log("Building SASS");
});
