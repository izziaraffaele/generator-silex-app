<?php

namespace WebComposer\Tests\AppBundle\Controllers;

use WebComposer\TestBundle\WebTestCase;

class AuthControllerTest extends WebTestCase{

    public function testLogin()
    {
        $client = $this->createClient();
        $crawler = $client->request('GET', '/login');

        $this->assertTrue($client->getResponse()->isOk());
        $this->assertCount(1, $crawler->filter('div#login'));
    }

    public function testSignup()
    {
        $client = $this->createClient();
        $crawler = $client->request('GET', '/signup');

        $this->assertTrue($client->getResponse()->isOk());
        $this->assertCount(1, $crawler->filter('div#signup'));
    }

    public function testNotFound()
    {
        $client = $this->createClient();
        $crawler = $client->request('GET', '/notfoundroute');

        $this->assertTrue($client->getResponse()->isNotFound());
    }
}