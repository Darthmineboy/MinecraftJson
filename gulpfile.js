var gulp = require('gulp'),
    plugins = require('gulp-load-plugins')({
        rename: {
            'gulp-live-server': 'serve'
        }
    }),
    uglify = require('gulp-uglify-es').default,
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    cssMin = require('gulp-css'),
    connect = require('gulp-connect'),
    ngAnnotate = require('gulp-ng-annotate'),
    htmlmin = require('gulp-htmlmin');

var htmlFiles = ['index.html', 'app/**/*.html'];

gulp.task('build-html', function() {
    gulp.src('index.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./build'));
    return gulp.src('app/**/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('./build/app'))
        .pipe(plugins.livereload());
});

var assetsFiles = ['assets/**/*'];

gulp.task('build-assets', function() {
    return gulp.src(assetsFiles).pipe(gulp.dest('./build')).pipe(plugins.livereload());
});

var cssFiles = [
    './node_modules/bootstrap/dist/css/bootstrap.min.css',
    './css/styles.css',
    './node_modules/font-awesome/css/font-awesome.min.css'
];

gulp.task('build-css', function() {
    return gulp.src(cssFiles)
        .pipe(concat('app.css'))
        .pipe(cssMin())
        .pipe(gulp.dest('./build'))
        .pipe(plugins.livereload());

});

var libsFiles = [
    './node_modules/angular/angular.min.js',
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/fastclick/lib/fastclick.js'
];

gulp.task('build-libs', function () {
    return gulp.src(libsFiles)
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('./build'))
        .pipe(plugins.livereload());
});

var jsFiles = [
    './app/app.module.js',
    './app/**/*.js'
];

gulp.task('build-js', function () {
    return gulp.src(jsFiles)
        .pipe(concat('app.js'))
        .pipe(babel({presets: ['es2015']}))
        .pipe(ngAnnotate({add: true}))
        .pipe(uglify({mangle: false}))
        .pipe(gulp.dest('./build'))
        .pipe(plugins.livereload());
});

gulp.task('build', gulp.parallel('build-css', 'build-libs', 'build-js', 'build-html', 'build-assets'));

// Default task
gulp.task('watch', function () {
    plugins.livereload.listen();
    gulp.watch(libsFiles, gulp.parallel('build-libs'));
    gulp.watch(jsFiles, gulp.parallel('build-js'));
    gulp.watch(cssFiles, gulp.parallel('build-css'));
    gulp.watch(htmlFiles, gulp.parallel('build-html'));
    gulp.watch(assetsFiles, gulp.parallel('build-assets'));
});

gulp.task('serve', function() {
    connect.server({
        root: 'build',
        port: 8888,
        host: 'localhost',
        fallback: 'index.html',
        livereload: true
    });
});

gulp.task('server', gulp.parallel('build', 'watch', 'serve'));

gulp.task('default', gulp.parallel('server'));