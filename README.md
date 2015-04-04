# generator-silex-app 

> [Yeoman](http://yeoman.io) generator for a Silex based web app. It creates a simple web application based on Silex PHP framework with 2 routes ("/login", "/signup"). It also includes React, browserify, SASS support, Bootstrap and gulp.

## What's inside?

Bundled:

* Silex
* Gulp
* Bower
* jQuery
* Browserify
* Reactify - Help to transform JSX
* watchify support!
* livereload (BrowserSync)

Optional:

* Sass with Compass
* Bootstrap - Twitter Bootstrap's official Sass version
* Modernizr
* Jest for unit tests

## Getting Started

```
$ npm install -g yo                                # Install Yeoman (if you don't have it yet)...
$ npm install -g generator-silex-app               # ...then install this generator...
$ yo silex-app                                     # ...and run it.
```

If you chose to use sass, you'll need to install it with `gem install sass`.
If you find your css build results are empty, update your sass gem.

Now, when everything is ready, run the `watch` task and begin to develop your application.
```
$ gulp watch
```

The `dist` task helps you preparing your file for the live deploy, minifying and uglifyng both CSS and JS

```
$ gulp dist
```

How to run test?  
Currently, I prefer to run test tasks from npm. Please run this command.
```
$ npm test
```

## License

MIT
