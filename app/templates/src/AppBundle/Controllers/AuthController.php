<?php
namespace AppBundle\Controllers;

use AppBundle\Controller;

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