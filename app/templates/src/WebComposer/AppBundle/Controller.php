<?php
namespace WebComposer\AppBundle;

use Symfony\Component\HttpFoundation\Response;

class Controller
{
    protected $twig;

    public function __construct($app)
    {
        $app['twig.loader']->addLoader(new \Twig_Loader_Filesystem(__DIR__.'/Views'));
        $this->twig = $app['twig'];
    }
}