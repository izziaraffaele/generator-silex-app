<?php

// set the environment before everything else. Values are: development,production
define('ENVIRONMENT', 'development');

date_default_timezone_set ('Europe/Amsterdam');

require __DIR__.'/../app/bootstrap.php';

$app = require __DIR__.'/../app/app.php';

$app->run();