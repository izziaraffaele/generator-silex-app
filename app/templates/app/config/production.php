<?php
// Configure your app for the production environment
$app['twig.options'] = array('cache' => __DIR__ . '/../cache/twig');
// Template path
$app['twig.path'] = array(
    __DIR__ . '/../../src/AppBundle/Views'
);
// Add the routing
require __DIR__ . '/routing.php';