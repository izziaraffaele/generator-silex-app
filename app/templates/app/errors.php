<?php

use Symfony\Component\HttpFoundation\Response;

$app->error(function (\Exception $e,$code) use ($app) {
    if ($app['debug'] && $code !== 404) {
        return;
    }

    // 404.html, or 40x.html, or 4xx.html, or error.html
    $templates = array(
        $code.'.html.twig',
        substr($code, 0, 2).'x.html.twig',
        substr($code, 0, 1).'xx.html.twig',
        'default.html.twig',
    );

    $app['twig.loader']->addLoader(new \Twig_Loader_Filesystem(__DIR__.'/errors'));

    foreach ($templates as $template) 
    {
        if( file_exists(__DIR__.'/errors/'.$template ) )
        {
            return $app['twig']->render($template, array('code' => $code));
        }
    }

    return $app['twig']->render('default.html.twig', array('code' => $code));
});