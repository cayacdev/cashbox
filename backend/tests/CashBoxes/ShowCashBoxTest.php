<?php

class ShowCashBoxTest extends TestCase
{
    public function testIndex_expect_seeAssignedCashBoxes()
    {
        $user = $this->createUser();
        $cashBox = $this->createCashBox($user);
        $this->createCashBox($this->createUser());

        $this->authenticate($user);
        $response = $this->get('/v1/cash-boxes/', $this->headers);

        $response->assertResponseOk();
        $response->seeJsonStructure([['id', 'name', 'description']]);
        $response->seeJsonEquals([
            [
                'id' => $cashBox->id,
                'name' => $cashBox->name,
                'description' => $cashBox->description,
                'pivot' => ['cash_box_id' => $cashBox->id, 'user_id' => $user->id]
            ]
        ]);
    }

    public function testShow_expect_seeCashbox()
    {
        $user = $this->createUser();
        $cashBox = $this->createCashBox($user);

        $this->authenticate($user);
        $response = $this->get('/v1/cash-boxes/'.$cashBox->id, $this->headers);

        $response->assertResponseOk();
        $response->seeJsonStructure(['id', 'name', 'description']);
        $response->seeJsonEquals(
            [
                'description' => $cashBox->description,
                'id' => $cashBox->id,
                'name' => $cashBox->name,
                'users' => [
                    [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'created_at' => $user->created_at,
                        'updated_at' => $user->updated_at,
                        'pivot' => ['cash_box_id' => $cashBox->id, 'user_id' => $user->id]
                    ]
                ],
            ]
        );
    }
}
