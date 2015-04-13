<?php
use Silex\Application;
use Silex\Provider\ServiceControllerServiceProvider;
use Silex\Provider\TwigServiceProvider;
use Silex\Provider\UrlGeneratorServiceProvider;
use Silex\Provider\MonologServiceProvider;
use Silex\Provider\WebProfilerServiceProvider;
use Symfony\Component\Debug\Debug;
use Igorw\Silex\ConfigServiceProvider;
use WebComposer\AppBundle\Providers\RoutingServiceProvider;

$app = new Application();
$app->register(new ConfigServiceProvider(__DIR__ . '/config/'.ENVIRONMENT.'.php'));
$app->register(new ServiceControllerServiceProvider());
$app->register(new TwigServiceProvider());
$app->register(new UrlGeneratorServiceProvider());

if( $app['debug'] )
{
    $app['monolog.logfile'] = __DIR__ . '/logs/app-'.ENVIRONMENT.'.log';
    $app['profiler.cache_dir'] = __DIR__ . '/cache/profiler';

    // Dev logs
    $app->register(new MonologServiceProvider());

    // Web Debug Toolbar
    $profilerProvider = new WebProfilerServiceProvider();

    $app->register($profilerProvider);
    $app->mount('/_profiler', $profilerProvider);

    Debug::enable();
}
else
{
    ini_set('display_errors', 0);
}

//Routes
$app->register(new ConfigServiceProvider(__DIR__ .'/config/routes.json'));
$app->register(new RoutingServiceProvider());

include __DIR__.'/errors.php';

return $app;