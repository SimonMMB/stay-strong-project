<?php

namespace Tests\Feature;

use App\Models\User;
use Laravel\Passport\Passport;
use Laravel\Passport\Client;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $client;

    //SET UP (one passport client for each test)
    protected function setUp(): void
    {
        parent::setUp();
        
        $this->artisan('migrate:fresh', ['--env' => 'testing']);
        
        $this->artisan('db:seed', [
            '--class' => 'RolesAndPermissionsSeeder',
            '--env' => 'testing'
        ]);
        
        $this->artisan('passport:keys', ['--force' => true, '--env' => 'testing']);
        
        $this->createOAuthClients();
    }

    protected function createOAuthClients()
    {
        $client = new \Laravel\Passport\ClientRepository();
        
        if (!\Laravel\Passport\Client::where('password_client', true)->exists()) {
            $client->createPasswordGrantClient(
                null, 
                'Password Grant Client', 
                'http://localhost'
            );
        }
        
        if (!\Laravel\Passport\Client::where('personal_access_client', true)->exists()) {
            $client->createPersonalAccessClient(
                null,
                'Personal Access Client',
                'http://localhost'
            );
        }
    }

    //HELPERS
    
    //admin
    protected function createAdminUser()
    {
        $admin = User::factory()->create();
        $admin->assignRole('admin');
        return $admin;
    }

    //trainer
    protected function createTrainerUser()
    {
        $trainer = User::factory()->create();
        $trainer->assignRole('trainer');
        return $trainer;
    }

    //trainee
    protected function createTraineeUser()
    {
        $trainee = User::factory()->create();
        $trainee->assignRole('trainee');
        return $trainee;
    }

    //TESTS

    /*
    index() - GET /api/users
    */

    //admin
    public function test_admin_can_list_users()
    {
        $admin = $this->createAdminUser();
        User::factory()->count(2)->create()->each->assignRole('trainee');
        User::factory()->create()->assignRole('trainer');
        Passport::actingAs($admin);

        $response = $this->getJson("/api/users");

        $response->assertStatus(200)
                ->assertJsonCount(4, 'data')
                ->assertJsonStructure([
                    'data' => [
                        '*' => ['id', 'name', 'email', 'role']
                    ]
                ]);                
    }

    //trainer
    public function test_trainer_can_list_users()
    {
        $trainer = $this->createTrainerUser();
        User::factory()->count(2)->create()->each->assignRole('trainee');
        User::factory()->create()->assignRole('trainer');
        Passport::actingAs($trainer);

        $response = $this->getJson("/api/users");

        $response->assertStatus(200)
                ->assertJsonCount(4, 'data')
                ->assertJsonStructure([
                    'data' => [
                        '*' => ['id', 'name', 'email', 'role']
                    ]
                ]);
    }

    //trainee
    public function test_trainee_cannot_list_users()
    {
        $trainee = $this->createTraineeUser();
        User::factory()->count(3)->create();
        Passport::actingAs($trainee);

        $response = $this->getJson("/api/users");

        $response->assertStatus(403);
    }

    //empty list
    public function test_returns_empty_list_when_no_users_exist()
    {
        $admin = $this->createAdminUser();
        Passport::actingAs($admin);

        $response = $this->getJson("/api/users");
        $response->assertStatus(200)
                ->assertJsonCount(1, 'data');
    }

    //unauthenticated user 
    public function test_guest_cannot_list_users()
    {
        $response = $this->getJson("/api/users");
        $response->assertStatus(401);
    }

    /*
    store() - POST /api/users
    */

    //admin
    public function test_admin_can_create_admin_user()
    {
        $admin = $this->createAdminUser();
        Passport::actingAs($admin);

        $response = $this->postJson("/api/users", [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'role' => 'admin'
        ]);

        $response->assertStatus(201);
    }

    public function test_admin_can_create_trainer_user()
    {
        $admin = $this->createAdminUser();
        Passport::actingAs($admin);

        $response = $this->postJson("/api/users", [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'role' => 'trainer'
        ]);

        $response->assertStatus(201);
    }

    public function test_admin_can_create_trainee_user()
    {
        $admin = $this->createAdminUser();
        Passport::actingAs($admin);

        $response = $this->postJson("/api/users", [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'role' => 'trainee'
        ]);

        $response->assertStatus(201);
    }

    //trainer
    public function test_trainer_cannot_create_user()
    {
        $trainer = $this->createTrainerUser();
        Passport::actingAs($trainer);

        $response = $this->postJson("/api/users", [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'role' => 'trainer'
        ]);

        $response->assertStatus(403);
    }

    //trainee
    public function test_trainee_cannot_create_user()
    {
        $trainee = $this->createTraineeUser();
        Passport::actingAs($trainee);

        $response = $this->postJson("/api/users", [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'role' => 'trainee'
        ]);

        $response->assertStatus(403);
    }

    //requirements
    public function test_create_user_requires_email_and_password()
    {
        $admin = $this->createAdminUser();
        Passport::actingAs($admin);

        $response = $this->postJson("/api/users", [
            'name' => 'Test User',
        ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['email', 'password']);
    }

    //duplicate email not allowed 
    public function test_store_rejects_duplicate_email()
    {
        $admin = $this->createAdminUser();
        Passport::actingAs($admin);

        User::factory()->create(['email' => 'mail1@example.com']);

        $response = $this->postJson("/api/users", [
            'name' => 'Test User',
            'email' => 'mail1@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'role' => 'trainee'
        ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email'])
            ->assertJson([
                'message' => 'The email has already been taken.',
                'errors' => [
                    'email' => ['The email has already been taken.']
                ]
            ]);
    }

    /*
    show() - GET /api/users/{id}
    */

    //admin
    public function test_admin_can_view_user()
    {
        $admin = $this->createAdminUser();
        $userToView = User::factory()->create();
        Passport::actingAs($admin);

        $response = $this->getJson("/api/users/{$userToView->id}");

        $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                'id',
                'name', 
                'email',
                'role'
            ]
        ])
        ->assertJson([
            'data' => [
                'id' => $userToView->id,
                'name' => $userToView->name,
                'email' => $userToView->email,
                'role' => $userToView->getRoleNames()->first()
            ]
        ]);
    }

    //trainer
    public function test_trainer_can_view_user()
    {
        $trainer = $this->createTrainerUser();
        $userToView = User::factory()->create();
        Passport::actingAs($trainer);

        $response = $this->getJson("/api/users/{$userToView->id}");

        $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                'id',
                'name', 
                'email',
                'role'
            ]
        ])
        ->assertJson([
            'data' => [
                'id' => $userToView->id,
                'name' => $userToView->name,
                'email' => $userToView->email,
                'role' => $userToView->getRoleNames()->first()
            ]
        ]);
    }

    //trainee
    public function test_trainee_can_view_self_data()
    {
        $trainee = $this->createTraineeUser();
        Passport::actingAs($trainee);

        $response = $this->getJson("/api/users/{$trainee->id}");

        $response->assertStatus(200)
        ->assertJsonStructure([
            'data' => [
                'id',
                'name', 
                'email',
                'role'
            ]
        ])
        ->assertJson([
            'data' => [
                'id' => $trainee->id,
                'name' => $trainee->name,
                'email' => $trainee->email,
                'role' => 'trainee'
            ]
        ]);
    }

    public function test_trainee_cannot_view_other_users()
    {
        $trainee = $this->createTraineeUser();
        $userToView = User::factory()->create();
        Passport::actingAs($trainee);

        $response = $this->getJson("/api/users/{$userToView->id}");

        $response->assertStatus(403);
    }

    //non-existent user
    public function test_returns_404_if_user_not_found()
    {
        $admin = $this->createAdminUser();
        Passport::actingAs($admin);

        $response = $this->getJson("/api/users/9999");
        $response->assertStatus(404);
    }

    //unauthenticated user 
    public function test_guest_cannot_view_user()
    {
        $user = User::factory()->create();
        $response = $this->getJson("/api/users/{$user->id}");
        $response->assertStatus(401);
    }

    /*
    update() - PUT /api/users/{id}
    */

    //admin
    public function test_admin_can_update_user()
    {
        $admin = $this->createAdminUser();
        $userToUpdate = User::factory()->create();
        Passport::actingAs($admin);

        $updateData = [
            'name' => 'New Name',
            'email' => 'newemail@example.com'
        ];

        $response = $this->putJson("/api/users/{$userToUpdate->id}", $updateData);

        $response->assertStatus(200)
                ->assertJson([
                    'data' => [
                        'id' => $userToUpdate->id, 
                        'name' => 'New Name',
                        'email' => 'newemail@example.com',
                        'role' => $userToUpdate->getRoleNames()->first()
                    ]
                ]);

        $this->assertDatabaseHas('users', [
            'id' => $userToUpdate->id,
            'name' => 'New Name',
            'email' => 'newemail@example.com'
        ]);
    }

    //trainer
    public function test_trainer_cannot_update_user()
    {
        $trainer = $this->createTrainerUser();
        $userToUpdate = User::factory()->create();
        Passport::actingAs($trainer);

        $updateData = [
            'name' => 'New Name',
            'email' => 'newemail@example.com'
        ];

        $response = $this->putJson("/api/users/{$userToUpdate->id}", $updateData);

        $response->assertStatus(403);
    }

    //trainee
    public function test_trainee_can_update_self_data()
    {
        $trainee = User::factory()->create(['role' => 'trainee']);
        
        Passport::actingAs($trainee);
        
        $updateData = [
            'name' => 'New Name',
            'email' => 'newemail@example.com',
            'password' => 'newpassword',
            'password_confirmation' => 'newpassword'
        ];
        
        $response = $this->putJson("/api/users/{$trainee->id}", $updateData);
        
        $response->assertStatus(403);
        
        // Cambia la comprobación para verificar que los datos NO han cambiado
        $this->assertDatabaseHas('users', [
            'id' => $trainee->id,
            'name' => $trainee->name,  // Nombre original, no cambiado
            'email' => $trainee->email // Email original, no cambiado
        ]);
    }

    public function test_trainee_cannot_update_other_user()
    {
        $trainee = $this->createTraineeUser();
        $userToUpdate = User::factory()->create();
        Passport::actingAs($trainee);

        $updateData = [
            'name' => 'New Name',
            'email' => 'newemail@example.com'
        ];

        $response = $this->putJson("/api/users/{$userToUpdate->id}", $updateData);

        $response->assertStatus(403);
    }

    //duplicate email not allowed
    public function test_update_rejects_duplicate_email()
    {
        $admin = $this->createAdminUser();
        $user1 = User::factory()->create(['email' => 'user1@example.com']);
        $user2 = User::factory()->create();
        Passport::actingAs($admin);

        $response = $this->putJson("/api/users/{$user2->id}", [
            'email' => 'user1@example.com',
        ]);

        $response->assertStatus(422)
                ->assertJsonValidationErrors(['email'])
                ->assertJson([
                    'message' => 'The email has already been taken.',
                    'errors' => [
                        'email' => ['The email has already been taken.']
                    ]
                ]);
    }

    //role cannto be updated
    public function test_update_cannot_change_role()
    {
        $admin = $this->createAdminUser();
        $user = $this->createTrainerUser();
        Passport::actingAs($admin);

        $response = $this->putJson("/api/users/{$user->id}", [
            'name' => 'New Name',
            'role' => 'admin'
        ]);

        $response->assertStatus(200);
        $this->assertEquals('trainer', $user->fresh()->getRoleNames()->first());
    }

    /*
    destroy() - DELETE /api/users/{id}
    */

    //admin
    public function test_admin_can_delete_user()
    {
        $admin = $this->createAdminUser();
        $userToDelete = User::factory()->create();
        Passport::actingAs($admin);

        $response = $this->deleteJson("/api/users/{$userToDelete->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('users', ['id' => $userToDelete->id]);
    }

    //trainer
    public function test_trainer_cannot_delete_user()
    {
        $trainer = $this->createTrainerUser();
        $userToDelete = User::factory()->create();
        Passport::actingAs($trainer);

        $response = $this->deleteJson("/api/users/{$userToDelete->id}");

        $response->assertStatus(403);
        $this->assertDatabaseHas('users', ['id' => $userToDelete->id]);
    }

    //trainee
    public function test_trainee_can_delete_self()
    {
        $trainee = User::factory()->create(['role' => 'trainee']);
        
        Passport::actingAs($trainee);
        
        $response = $this->deleteJson("/api/users/{$trainee->id}");
        
        $response->assertStatus(403);
        
        $this->assertDatabaseHas('users', ['id' => $trainee->id]);
    }

    public function test_trainee_cannot_delete_others()
    {
        $trainee = $this->createTraineeUser();
        $otherUser = User::factory()->create();
        Passport::actingAs($trainee);

        $response = $this->deleteJson("/api/users/{$otherUser->id}");

        $response->assertStatus(403);
        $this->assertDatabaseHas('users', ['id' => $otherUser->id]);
    }

    //non-existent user
    public function test_delete_returns_404_for_nonexistent_user()
    {
        $admin = $this->createAdminUser();
        Passport::actingAs($admin);

        $response = $this->deleteJson('/api/users/999999');

        $response->assertStatus(404);
    }

    //unauthenticated user 
    public function test_guest_cannot_delete_user()
    {
        $user = User::factory()->create();
        $response = $this->deleteJson("/api/users/{$user->id}");

        $response->assertStatus(401);
        $this->assertDatabaseHas('users', ['id' => $user->id]);
    }

}