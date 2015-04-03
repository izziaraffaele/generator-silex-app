<?php

use AppBundle\Controllers\AuthController;

// Register Controllers and their dependencies
$app['auth.controller'] = $app->share(function() use ($app) {
    return new AuthController($app['twig']);
});

// Register routes
$app->get('/login', 'auth.controller:login');
$app->get('/signup', 'auth.controller:signup');