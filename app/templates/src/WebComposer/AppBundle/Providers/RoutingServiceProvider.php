<?php
namespace WebComposer\AppBundle\Providers;

use InvalidArgumentException;
use Silex\Application;
use Silex\ServiceProviderInterface;

/**
 * Class RoutingServiceProvider
 */
class RoutingServiceProvider implements ServiceProviderInterface
{
    private $app;
    protected $appRoutingKey = 'config.routes';


    /**
     * @param Application $app
     * @throws \InvalidArgumentException
     */
    public function register(Application $app)
    {
        $this->app = $app;
        $this->addRoutes($app[$this->appRoutingKey]);
    }

    /**
     * @param Application $app
     * @codeCoverageIgnore
     */
    public function boot(Application $app)
    {
    }

    /**
     * Adds all routes
     *
     * @param Application $app
     * @param $routes
     */
    public function addRoutes($routes)
    {
        foreach ($routes as $routeName => $route) {
            if(!array_key_exists('routeName', $route)){
                if(is_string($routeName) && !array_key_exists('routeName', $route)){
                    $route['routeName'] = $routeName;
                }
            }
            $this->addRoute($route);
        }
    }

    /**
     * Adds a route, a given route-name (for named routes) and all of its methods
     *
     * @param Application $app
     * @param array $route
     * @throws InvalidArgumentException
     */
    public function addRoute(Array $route)
    {
        $this->validateRoute($route);
        $route['controller'] = $this->prepareController($route['controller']);

        $route['routeName'] = (!array_key_exists('routeName', $route)) ? '' : $this->sanitizeRouteName($route['routeName']);

        foreach ($route['method'] as $method) 
        {
            $controller = call_user_func_array([$this->app,$method],[$route['pattern'],$route['controller']])
                ->bind($route['routeName']);
        }

        $supportedProperties = array('value', 'assert', 'before', 'after');
        foreach ($supportedProperties AS $property) {
            if (isset($route[$property])) {
                $this->addActions($controller, $route[$property], $property);
            }
        }

        if (isset($route['scheme'])) {
            if ('https' === $route['scheme']) {
                $controller->requireHttps();
            }
        }
    }

    /**
     * Validates the given methods. Only get, put, post, delete, options, head
     * are allowed
     *
     * @param array $methods
     */
    protected function validateMethods(Array $methods)
    {
        $availableMethods = array('get', 'put', 'post', 'delete', 'options', 'head');
        foreach(array_map('strtolower', $methods) as $method){
            if(!in_array($method, $availableMethods)){
                throw new InvalidArgumentException('Method "' . $method . '" is not valid, only the following methods are allowed: ' . join(', ', $availableMethods));
            }
        }
    }

    /**
     * Validates the given $route Array
     *
     * @param $route
     * @throws \InvalidArgumentException
     */
    protected function validateRoute($route)
    {
        if (!isset($route['pattern']) || !isset($route['method']) || !isset($route['controller'])) {
            throw new InvalidArgumentException('Required parameter (pattern/method/controller) is not set.');
        }

        $arrayParameters = array('method', 'assert', 'value');

        foreach ($arrayParameters as $parameter) {
            if (isset($route[$parameter]) && !is_array($route[$parameter])) {
                throw new InvalidArgumentException(sprintf(
                    '%s is not of type Array (%s)',
                    $parameter, gettype($route[$parameter])
                ));
            }
        }

        $this->validateMethods($route['method']);
    }


    /**
     * Sanitizes the routeName for named route:
     *
     * - replaces '/', ':', '|', '-' with '_'
     * - removes special characters
     *
     *  Algorithm copied from \Silex\Controller->generateRouteName
     *  see: https://github.com/silexphp/Silex/blob/1.2/src/Silex/Controller.php
     *
     * @param string $routeName
     * @return string
     */
    protected function sanitizeRouteName($routeName)
    {
        if(empty($routeName)){
            //If no routeName is specified,
            //we set an empty route name to force the default route name e.g. "GET_myRouteName"
            return '';
        }
        $routeName = str_replace(array('/', ':', '|', '-'), '_', $routeName);
        $routeName = preg_replace('/[^a-z0-9A-Z_.]+/', '', $routeName);
        return $routeName;
    }

    /**
     * @param Controller $controller
     * @param $actions
     * @param $type
     * @throws \InvalidArgumentException
     */
    protected function addActions(Controller $controller, $actions, $type)
    {
        if (!is_array($actions)) {
            throw new InvalidArgumentException(
                sprintf(
                    'Action %s is not of type Array (%s)',
                    $type, gettype($actions)
                )
            );
        }

        foreach ($actions as $name => $value) {
            switch ($type) {
                case 'after':
                case 'before':
                    $controller->$type($value);
                    break;

                default:
                    $this->addAction($controller, $name, $value, $type);
                    break;
            }
        }
    }

    /**
     * @param Controller $controller
     * @param $name
     * @param $value
     * @param $type
     */
    protected function addAction(Controller $controller, $name, $value, $type)
    {
        call_user_func_array(array($controller, $type), array($name, $value));
    }

    protected function prepareController( $controller )
    {
        list($controllerClass,$controllerMethod) = explode(':',$controller);
        $classPath = explode('\\',$controllerClass);
        $className = array_pop($classPath);
        $controllerKey = 'controllers.'.strtolower($className);

        $this->registerController( $controllerKey, $controllerClass );

        return $controllerKey.':'.$controllerMethod;
    }

    protected function registerController($controllerKey, $controllerClass)
    {
        if( !isset( $this->app[$controllerKey]))
        {
            $this->app[$controllerKey] = new $controllerClass($this->app);
        }
    }
}
