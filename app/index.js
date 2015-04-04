'use strict';

var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var Generator = yeoman.generators.Base.extend({
    init: function () {
        this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

        this.on('end', function () {
            if (!this.options['skip-install']) {
                this.installDependencies();
                this.spawnCommand('composer', ['install']);
                this.spawnCommand('chmod', ['777','app/cache']);
                this.spawnCommand('chmod', ['777','app/logs']);
            }
        });
    },
    askFor: function () {
        var done = this.async();

        // have Yeoman greet the user
        console.log(this.yeoman);

        // replace it with a short and sweet description of your generator
        console.log(chalk.magenta('You\'re using A Yeoman Generator for a Silex based web app!!'));

        var prompts = [{
            name: 'project',
            message: 'What is this project\'s name?'
        },
        {
            type: 'checkbox',
            name: 'features',
            message: 'What more would you like?',
            choices: [{
                name: 'Sass with Compass',
                value: 'includeSass',
                checked: true
            }, {
                name: 'Bootstrap',
                value: 'includeBootstrap',
                checked: true
            }, {
                name: 'Modernizr',
                value: 'includeModernizr',
                checked: true
            }, {
                name: 'Jest for unit tests',
                value: 'includeJest',
                checked: true
            }]
        }];

        this.prompt(prompts, function (answers) {
            var features = answers.features;

            this.projectName = answers.project || 'myApp';

            function hasFeature(feat) { return features.indexOf(feat) !== -1; }

            // manually deal with the response, get back and store the results.
            // we change a bit this way of doing to automatically do this in the self.prompt() method.
            this.includeSass = hasFeature('includeSass');
            this.includeBootstrap = hasFeature('includeBootstrap');
            this.includeModernizr = hasFeature('includeModernizr');
            this.includeJest = hasFeature('includeJest');

            done();
        }.bind(this));
    },

    app: function () {
        // main htaccess
        this.copy('htaccess','.htaccess');
        this.template('_package.json', 'package.json');
        this.template('_gulpfile.js', 'gulpfile.js');
        this.template('_bower.json', 'bower.json');
        this.template('_composer.json', 'composer.json');
        this.copy('bowerrc', '.bowerrc');
        this.copy('gitignore', '.gitignore');
        this.copy('preprocessor.js', 'preprocessor.js');


        // webroot
        this.mkdir('web');
        this.copy('web/htaccess','web/.htaccess');
        this.copy('web/index.php','web/index.php');

        // silex app
        this.directory('app','app');
        this.mkdir('app/cache');
        this.mkdir('app/logs');

        // src application directory
        this.directory('src','src');

        // Now lets build assets
        this.mkdir('assets');
        this.directory('assets/images','assets/images');
        this.directory('assets/scripts','assets/scripts');

        if (this.includeJest) {
            this.directory('assets/scripts/ui/__tests__','assets/scripts/ui/__tests__');
        }

        this.mkdir('assets/styles');
        this.template('assets/styles/_main.scss', 'assets/styles/_main.scss');
        this.copy('assets/styles/auth.scss','assets/styles/auth.scss');
        this.copy('assets/styles/errors.scss','assets/styles/errors.scss');
        this.copy('assets/favicon.ico','assets/favicon.ico');
        this.copy('assets/robots.txt','assets/robots.txt');
    }
});

module.exports = Generator;
