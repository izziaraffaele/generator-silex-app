'use strict';

var gulp = require('gulp');
var del = require('del');

<% if (includeJest) { %>
var path = require('path');
<% } %>

// Load plugins
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream'),
    sourceFile = './assets/scripts/app.js',
    destFolder = './web/assets/scripts',
    destFileName = 'app.js';

var browserSync = require('browser-sync');
var reload = browserSync.reload;

// Styles
gulp.task('styles', ['sass']);

gulp.task('sass', function () {
    return gulp.src(['assets/styles/**/*.scss', 'assets/styles/**/*.css'])
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10,
            loadPath: ['app/bower_components']}))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest('web/assets/styles'))
        .pipe($.size());
});

// Scripts
gulp.task('scripts',['vendorScripts'], function () {
    var bundler = watchify(browserify({
        entries: [sourceFile],
        insertGlobals: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    }));

    bundler.on('update', rebundle);

    function rebundle() {
        return bundler.bundle()
            // log errors if they happen
            .on('error', $.util.log.bind($.util, 'Browserify Error'))
            .pipe(source(destFileName))
            .pipe(gulp.dest(destFolder));
    }

    return rebundle();
});

gulp.task('vendorScripts', function () {
    var bundler = watchify(browserify({
        entries: [
            './assets/bower_components/jquery/dist/jquery.js',
            './assets/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js',
        ],
        insertGlobals: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    }));

    bundler.on('update', rebundle);

    function rebundle() {
        return bundler.bundle()
            // log errors if they happen
            .on('error', $.util.log.bind($.util, 'Browserify Error'))
            .pipe(source('vendor.js'))
            .pipe(gulp.dest('./web/assets/scripts'));
    }

    return rebundle();
});

gulp.task('buildScripts', function() {
    return browserify(sourceFile)
            .bundle()
            .pipe(source(destFileName))
            .pipe(gulp.dest('web/assets/scripts'));
});

// Images
gulp.task('images', function () {
    return gulp.src('assets/images/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('web/assets/images'))
        .pipe($.size());
});

// Clean
gulp.task('clean', function (cb) {
    $.cache.clearAll();
    cb(del.sync(['web/assets/styles', 'web/assets/scripts', 'web/assets/images']));
});

// Bundle
gulp.task('bundle', ['styles', 'scripts', 'bower']);

gulp.task('buildBundle', ['styles', 'buildScripts', 'bower']);

// Bower helper
gulp.task('bower', function() {
    gulp.src('assets/bower_components/**/*(*.js|*.eot|*.svg|*.ttf|*.woff|*.woff2)', {base: 'assets/bower_components'})
        .pipe(gulp.dest('web/assets/bower_components/'));

});

gulp.task('json', function() {
    gulp.src('assets/scripts/json/**/*.json', {base: 'assets/scripts'})
        .pipe(gulp.dest('web/assets/scripts/'));
});

// Robots.txt and favicon.ico
gulp.task('extras', function () {
    return gulp.src(['assets/*.txt', 'assets/*.ico'])
        .pipe(gulp.dest('web/assets/'))
        .pipe($.size());
});

// Watch
gulp.task('watch', ['bundle'], function () {

    browserSync({
        notify: false,
        logPrefix: 'BS',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        proxy: "silex-app.dev/web"
    });

    gulp.watch('assets/scripts/**/*.js', ['scripts', reload]);
    gulp.watch('assets/scripts/**/*.jsx', ['scripts', reload]);

    // Watch .json files
    gulp.watch('assets/scripts/**/*.json', ['json']);

    // Watch .html files
    gulp.watch('src/AppBundle/Views/**/*.html.twig', reload);

    gulp.watch(['assets/styles/**/*.scss', 'assets/styles/**/*.css'], ['styles', reload]);

    // Watch image files
    gulp.watch('assets/images/**/*', reload);
});

// Build
gulp.task('build', ['buildBundle', 'images', 'extras'], function() {
    gulp.src('web/assets/scripts/app.js')
        .pipe($.uglify())
        .pipe($.stripDebug())
        .pipe(gulp.dest('web/assets/scripts'));
});

// Default task
gulp.task('default', ['clean', 'build', <% if (includeJest) { %>, 'jest' <% } %> ]);
