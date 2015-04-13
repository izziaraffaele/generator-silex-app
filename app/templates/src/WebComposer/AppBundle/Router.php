<?php 

namespace WebComposer\AppBundle;

use Silex\Application;

class Router{

    public static function parseRoutes( $routesFile )
    {
        if( !file_exists( $routesFile ) )
        {
            $app->abort(500, "Cannot find routes file in ".$routesFile);
        }
        
        $rawContent = file_get_contents($routesFile);
        return json_decode($rawContent, TRUE);
    }

    public static function registerRoutes($app, $routes)
    {
        foreach ($routes as $route) 
        {
            call_user_func_array([$app,$route['method']], [$route['path'],$route['controller']]);
        }
    }
}