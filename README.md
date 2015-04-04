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

Remember to give read/write permission to `app/cache` and `app/logs` folders

Now, when everything is ready, make your first build using gulp command
```
$ gulp build
```

and run the watch task and begin to develop your React components.

```
$ gulp watch
```

How to run test?  
Currently, I prefer to run test tasks from npm. Please run this command.
```
$ npm test
```

## License

MIT
