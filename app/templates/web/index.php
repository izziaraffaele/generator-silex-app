<?php

// set the environment before everything else. Values are: development,production
define('ENVIRONMENT', 'development');

date_default_timezone_set ('Europe/Amsterdam');

$app = require __DIR__.'/../app/app.php';

switch (ENVIRONMENT) {
    case 'production':
        ini_set('display_errors', 0);
        require __DIR__ . '/../app/config/production.php';
        break;
    
    case 'development':
        // This check prevents access to debug front controllers that are deployed by accident to production servers.
        // Feel free to remove this, extend it, or make something more sophisticated.
        if (isset($_SERVER['HTTP_CLIENT_IP'])
            || isset($_SERVER['HTTP_X_FORWARDED_FOR'])
            || !in_array(@$_SERVER['REMOTE_ADDR'], array('127.0.0.1', 'fe80::1', '::1'))
        ) {
            header('HTTP/1.0 403 Forbidden');
            exit('You are not allowed to access this file. Check '.basename(__FILE__).' for more information.');
        }

        Symfony\Component\Debug\Debug::enable();
        require __DIR__ . '/../app/config/development.php';
        break;
}

$app->run();