<?php


use App\Models\CashBox;
use Illuminate\Auth\Access\AuthorizationException;

class CreateCashBoxTest extends TestCase
{
    /**
     * @throws AuthorizationException
     */
    public function testCreateCashBox()
    {
        $user = $this->createUser();
        $this->authenticate($user);

        $response = $this->post('/v1/cash-boxes/',
            [
                'name' => 'test cash box',
                'description' => 'description of test cash box'
            ],
            $this->headers);

        $response->assertResponseStatus(201);

        $cashBox = CashBox::findCashBox(1);
        $this->assertEquals('test cash box', $cashBox->name);
        $this->assertEquals('description of test cash box', $cashBox->description);
    }

    public function testCreateCashBoxWithTooLongNameValidation()
    {
        $user = $this->createUser();
        $this->authenticate($user);

        $response = $this->post('/v1/cash-boxes/',
            [
                'name' => str_repeat('x', 256),
                'description' => 'description of test cash box'
            ],
            $this->headers);

        $response->assertResponseStatus(422);
        $response->seeJsonEquals(['name' => ['The name may not be greater than 255 characters.']]);
    }

    public function testCreateCashBoxWithTooLongDescriptionValidation()
    {
        $user = $this->createUser();
        $this->authenticate($user);

        $response = $this->post('/v1/cash-boxes/',
            [
                'name' => 'test cash box',
                'description' => str_repeat('x', 256)
            ],
            $this->headers);

        $response->assertResponseStatus(422);
        $response->seeJsonEquals(['description' => ['The description may not be greater than 255 characters.']]);
    }
}
