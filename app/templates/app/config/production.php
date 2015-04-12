<?php
// Configure your app for the production environment
$app['twig.options'] = array('cache' => __DIR__ . '/../cache/twig');

// Errors template path
$app['twig.path'] = array(
    __DIR__ . '/../errors'
);

// Add the routing
require __DIR__ . '/routing.php';