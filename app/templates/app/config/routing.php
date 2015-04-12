<?php

use WebComposer\AppBundle\Controllers\AuthController;

// Register Controllers and their dependencies
$app['auth.controller'] = $app->share(function() use ($app) {
    return new AuthController($app);
});

// Register routes
$app->get('/login', 'auth.controller:login');
$app->get('/signup', 'auth.controller:signup');