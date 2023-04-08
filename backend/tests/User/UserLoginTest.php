<?php
namespace User;

use TestCase;

class UserLoginTest extends TestCase
{
    public function testLogin_expect_userCanLogin()
    {
        $user = $this->createUser();

        $response = $this->post('/v1/auth/login', [
            'email' => $user->email,
            'password' => '12345678'
        ]);

        $response->assertResponseOk();
    }

    public function testLogin_passwordIsWrong_expect_userCannotLogin()
    {
        $user = $this->createUser();

        $response = $this->post('/v1/auth/login', [
            'email' => $user->email,
            'password' => 'wrongpassword'
        ]);

        $response->assertResponseStatus(401);
    }

    public function testRegister_expect_userCanRegisterAndLogin()
    {
        $userName = 'Test User';
        $userEmail = 'testuser@mailinator.com';
        $password = '12345678';

        $response = $this->post('/v1/auth/register',
            ['name' => $userName, 'email' => $userEmail, 'password' => $password]);
        $response->assertResponseOk();

        $response = $this->post('/v1/auth/login', ['email' => $userEmail, 'password' => $password]);
        $response->assertResponseOk();
        $response->seeJsonStructure(['access_token', 'expires_in', 'token_type']);
    }

    public function testRegister_noAttributes_expect_validationError()
    {
        $response = $this->post('/v1/auth/register');

        $response->assertResponseStatus(422);
        $response->seeJsonEquals([
            'email' => ['The email field is required.'],
            'name' => ['The name field is required.'],
            'password' => ['The password field is required.']
        ]);
    }

    public function testRegister_invalidEmail_expect_validationError()
    {
        $userName = 'Test User';
        $userEmail = 'invalidEmail';
        $password = '12345678';

        $response = $this->post('/v1/auth/register',
            ['name' => $userName, 'email' => $userEmail, 'password' => $password]);

        $response->assertResponseStatus(422);
        $response->seeJsonEquals([
            'email' => ['The email must be a valid email address.'],
        ]);
    }
}
