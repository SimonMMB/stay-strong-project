<?php

use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Livewire\Attributes\Layout;
use Livewire\Volt\Component;

new #[Layout('layouts.guest')] class extends Component
{
    public string $name = '';
    public string $email = '';
    public string $password = '';
    public string $password_confirmation = '';

    /**
     * Handle an incoming registration request.
     */
    public function register(): void
    {
        $validated = $this->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:'.User::class],
            'password' => ['required', 'string', 'confirmed', Rules\Password::defaults()],
        ]);

        $validated['password'] = Hash::make($validated['password']);

        event(new Registered($user = User::create($validated)));

        Auth::login($user);

        $this->redirect(route('dashboard', absolute: false), navigate: true);
    }
}; 

?>

    <div class="bg-white shadow-md rounded-lg p-6">
        <div class="mb-6">
            <x-auth-session-status class="mb-4" :status="session('status')" />
        </div>

        <form method="POST" action="{{ route('register') }}">
            @csrf

            <!-- Name -->
            <div>
                <x-input-label for="name" :value="__('Name')" />
                <x-text-input id="name" class="block mt-1 w-full" type="text" name="name" value="{{ old('name') }}" required autofocus />
                <x-input-error :messages="$errors->get('name')" class="mt-2" />
            </div>

            <!-- Surname -->
            <div class="mt-4">
                <x-input-label for="surname" :value="__('Surname')" />
                <x-text-input id="surname" class="block mt-1 w-full" type="text" name="surname" value="{{ old('surname') }}" />
                <x-input-error :messages="$errors->get('surname')" class="mt-2" />
            </div>

            <!-- Email Address -->
            <div class="mt-4">
                <x-input-label for="email" :value="__('Email')" />
                <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" value="{{ old('email') }}" required />
                <x-input-error :messages="$errors->get('email')" class="mt-2" />
            </div>

            <!-- Password -->
            <div class="mt-4">
                <x-input-label for="password" :value="__('Password')" />
                <x-text-input id="password" class="block mt-1 w-full" type="password" name="password" required />
                <x-input-error :messages="$errors->get('password')" class="mt-2" />
            </div>

            <!-- Confirm Password -->
            <div class="mt-4">
                <x-input-label for="password_confirmation" :value="__('Confirm Password')" />
                <x-text-input id="password_confirmation" class="block mt-1 w-full" type="password" name="password_confirmation" required />
                <x-input-error :messages="$errors->get('password_confirmation')" class="mt-2" />
            </div>

            <!-- Training Frequency -->
            <div class="mt-4">
                <x-input-label for="training_frequency" :value="__('Training Frequency')" />
                <x-text-input id="training_frequency" class="block mt-1 w-full" type="number" name="training_frequency" value="{{ old('training_frequency') }}" />
                <x-input-error :messages="$errors->get('training_frequency')" class="mt-2" />
            </div>

            <!-- Training Duration -->
            <div class="mt-4">
                <x-input-label for="training_duration" :value="__('Training Duration (months)')" />
                <x-text-input id="training_duration" class="block mt-1 w-full" type="number" name="training_duration" value="{{ old('training_duration') }}" />
                <x-input-error :messages="$errors->get('training_duration')" class="mt-2" />
            </div>

            <!-- Start Date -->
            <div class="mt-4">
                <x-input-label for="start_date" :value="__('Start Date')" />
                <x-text-input id="start_date" class="block mt-1 w-full" type="date" name="start_date" value="{{ old('start_date') }}" />
                <x-input-error :messages="$errors->get('start_date')" class="mt-2" />
            </div>

            <!-- Estimated End Date -->
            <div class="mt-4">
                <x-input-label for="estimated_end_date" :value="__('Estimated End Date')" />
                <x-text-input id="estimated_end_date" class="block mt-1 w-full" type="date" name="estimated_end_date" value="{{ old('estimated_end_date') }}" />
                <x-input-error :messages="$errors->get('estimated_end_date')" class="mt-2" />
            </div>

            <div class="flex items-center justify-end mt-4">
                <x-primary-button class="ml-4">
                    {{ __('Register') }}
                </x-primary-button>
            </div>
        </form>
    </div>

