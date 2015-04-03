<?php
require __DIR__.'/../app/bootstrap.php';

use Silex\Application;
use Silex\Provider\ServiceControllerServiceProvider;
use Silex\Provider\TwigServiceProvider;
use Silex\Provider\UrlGeneratorServiceProvider;

$app = new Application();
$app->register(new ServiceControllerServiceProvider());
$app->register(new TwigServiceProvider());
$app->register(new UrlGeneratorServiceProvider());
$app['twig'] = $app->share($app->extend('twig', function($twig, $app) {
    return $twig;
}));

require __DIR__.'/../app/errors.php';

return $app;