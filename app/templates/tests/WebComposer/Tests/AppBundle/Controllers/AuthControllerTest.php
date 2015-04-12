<?php

namespace WebComposer\Tests\AppBundle\Controllers;

use WebComposer\TestBundle\WebTestCase;

class AuthControllerTest extends WebTestCase{

    public function testLogin()
    {
        $client = $this->createClient();
        $crawler = $client->request('GET', '/login');

        $this->assertTrue($client->getResponse()->isOk());
        $this->assertCount(1, $crawler->filter('input[name="email"]'));
        $this->assertCount(1, $crawler->filter('input[name="password"]'));
    }

    public function testSignup()
    {
        $client = $this->createClient();
        $crawler = $client->request('GET', '/signup');

        $this->assertTrue($client->getResponse()->isOk());
        $this->assertCount(1, $crawler->filter('input[name="first_name"]'));
        $this->assertCount(1, $crawler->filter('input[name="last_name"]'));
        $this->assertCount(1, $crawler->filter('input[name="email"]'));
        $this->assertCount(1, $crawler->filter('input[name="password"]'));
    }
}