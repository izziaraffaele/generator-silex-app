<?php 

define('ENVIRONMENT', 'testing');

date_default_timezone_set ('Europe/Amsterdam');

if (!file_exists($autoloadFile = __DIR__ . '/../vendor/autoload.php')) {
    die('You must set up the project dependencies, run the following commands:'.PHP_EOL.
        'curl -s http://getcomposer.org/installer | php'.PHP_EOL.
        'php composer.phar install --dev'.PHP_EOL);
}

$loader = require $autoloadFile;
$loader->add('WebComposer\Tests', __DIR__);