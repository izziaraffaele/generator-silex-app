'use strict';

var gulp = require('gulp');
var del = require('del');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

<% if (includeJest) { %>
var path = require('path');
<% } %>

var appPath = {
    rootIn:'./assets',
    rootOut:'./web/assets',
    scriptDir: 'scripts',
    sassDir: 'styles',
    imagesDir: 'images'
};

var vendorAssets = [
    './assets/bower_components/jquery/dist/jquery.js',
    './assets/bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.js'
];

gulp.task('styles', ['sass']);

gulp.task('sass', function () {
    return gulp.src(appPath.rootIn+'/'+appPath.sassDir+'/**/*(*.scss|*.css)')
        .pipe($.rubySass({
            style: 'expanded',
            precision: 10,
            loadPath: [appPath.rootIn+'/bower_components']}))
        .pipe($.autoprefixer('last 1 version'))
        .pipe(gulp.dest(appPath.rootOut+'/'+appPath.sassDir))
        .pipe($.size());
});

// Scripts
gulp.task('scripts', function () {
    var sourceFile = appPath.rootIn+'/'+appPath.scriptDir+'/app.js';
    var destFileName = 'app.js';
    var destFolder = appPath.rootOut+'/'+appPath.scriptDir;

    var bundler = watchify(browserify({
        entries: [sourceFile],
        insertGlobals: true,
        transform:[reactify],
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

// Vendor Scripts
gulp.task('vendorScripts', function() {
    var destFileName = 'vendor.js';
    var destFolder = appPath.rootOut+'/'+appPath.scriptDir;

    return browserify(vendorAssets)
            .bundle()
            .pipe(source(destFileName))
            .pipe(gulp.dest(destFolder));
});

// Images
gulp.task('images', function () {
    return gulp.src(appPath.rootIn+'/'+appPath.imagesDir+'/**/*')
        .pipe($.cache($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(appPath.rootOut+'/'+appPath.imagesDir))
        .pipe($.size());
});

// Robots.txt and favicon.ico
gulp.task('extras', function () {
    return gulp.src([appPath.rootIn+'/*(*.txt|*.ico)'])
        .pipe(gulp.dest(appPath.rootOut+'/'))
        .pipe($.size());
});

// Bower helper
gulp.task('bower', function() {
    gulp.src(appPath.rootIn+'/bower_components/**/*(*.js|*.eot|*.svg|*.ttf|*.woff|*.woff2)', {base: appPath.rootIn+'/bower_components'})
        .pipe(gulp.dest(appPath.rootOut+'/bower_components/'));

});

// clean
gulp.task('clean', function (cb) {
    $.cache.clearAll();
    cb(del.sync([appPath.rootOut+'/'+appPath.sassDir, appPath.rootOut+'/'+appPath.scriptDir, appPath.rootOut+'/'+appPath.imagesDir,appPath.rootOut+'/bower_components']));
});

gulp.task('build', ['clean','bower', 'styles', 'vendorScripts','scripts', 'images', 'extras']);

gulp.task('dist', ['build'],function(){
    console.log('start minifying css');
    //minify-css
    gulp.src(appPath.rootOut+'/'+appPath.sassDir+'/**/*.css')
        .pipe($.minifyCss())
        .pipe(gulp.dest(appPath.rootOut+'/'+appPath.sassDir+'/min'))
        .pipe($.size());;


    console.log('start uglifying js');

    //uglify-js
    gulp.src(appPath.rootOut+'/'+appPath.scriptDir+'/**/*.js')
        .pipe($.uglify())
        .pipe($.stripDebug())
        .pipe(gulp.dest(appPath.rootOut+'/'+appPath.scriptDir+'/min'))
        .pipe($.size());;
});

gulp.task('watch', ['build'], function () {

    browserSync({
        notify: false,
        logPrefix: 'BS',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        proxy: "<%= _.slugify(projectName) %>.dev"
    });

    gulp.watch(appPath.rootIn+'/'+appPath.scriptDir+'/**/*(*.js|*.jsx)', ['scripts', reload]);
    gulp.watch(appPath.rootIn+'/'+appPath.sassDir+'/**/*(*.scss|*.css)', ['styles', reload]);
    gulp.watch(appPath.rootIn+'/'+appPath.imagesDir+'/**/*', reload);
});

// Default task
gulp.task('default', ['dist']);
