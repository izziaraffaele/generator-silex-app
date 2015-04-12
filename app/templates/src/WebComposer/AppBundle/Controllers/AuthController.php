<?php
namespace WebComposer\AppBundle\Controllers;

use WebComposer\AppBundle\Controller;

class AuthController extends Controller
{
    public function login()
    {
        return $this->twig->render('auth.html.twig',['page'=>'login']);
    }

    public function signup()
    {
        return $this->twig->render('auth.html.twig',['page'=>'signup']);
    }
}