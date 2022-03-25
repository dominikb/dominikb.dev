---
title: 'Getting started with Test Driven Development in Laravel'
tags: ["laravel", "php",]
published: true
date: '2018-12-07'
---

During the last few months, I’ve read a lot of blog posts and guides that talk about the benefits and joys of TDD.

Although they all were credible sources and I believed the points they made about all the benefits you get when applying this style of development, I just could not quite get myself to try it out.

The biggest hurdle for me seemed, that there were no clear instructions on how to get started.

## My problem with Test Driven Development

How development works, how I have been taught and taught myself to write code, always followed a simple pattern:

* You grasp the existing problem and think of a solution
* You abstract the solution into a flow and break it down to smaller steps
* You implement those steps in code

Of course, you should always follow the best practices of loose coupling or the use of common patterns, but there simply was no room within this process to test the implemented solution.

And I was pretty confident with this workflow, properly planning ahead my tasks and implementing one small, comprehensible step at a time, in order for the software that I was producing to be of decent quality.

It always seemed pretty intimidating to start with automated testing. There is so much to know about programming already, I can’t probably learn everything there is to learn about testing as well.

How do I set up testing at all? What do I test for? What can I do if my implementation uses another class’ function? How do I even prepare the state of my application that I would need, to test a specific scenario?

This is too much, surely I’m fine without this, I thought.

Boy, was I wrong.

## Getting a hold of TDD

A few weeks ago I was purchasing something from Amazon when I got the suggestion for a book: The Clean Coder. I took a look into the books reviews and although the book’s quite pricey and has aged somewhat, I rather quickly decided to get a hard copy and give it a try.

Let me tell you, this book is well worth its cost!

It goes into depth about what it means to be a professional programmer and how much farther our responsibility extends than just towards our code.

### Chapter 5 — Test Driven Development
After being hooked by the first chapter, I seemingly devoured the book until I’ve reached chapter 5. There it was, the ubiquitous topic of testing.
And this time I decided to give it a try for real.

</hr>

## First Steps

Most of the examples that were given to me about TDD, were applications that already had high a good amount of tests. But where would I start with my applications, that have had no tests at all?

The plain and simple answer to this is: Anywhere!

### Any tests are better than no tests

The hurdle of you writing your first test is not as big of a challenge as it might seem. You must not strive for 100% coverage or perfect tests, as they are an ever-evolving part of your code base.

They too can be refactored and improved at a later stage, the key is just getting started.

## My first test

There is no secret to testing, but to start small. The value of your tests will accumulate on its own and at some point provide great value to your code base.

```php
<?php

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * @return string
     */
    public function getFullNameAttribute(): string
    {
        return "$this->first_name $this->last_name";
    }
}
```

Our first goal is to test this existing class. Assuming we have not yet set up any tests and this code is already implemented.
Simply run `php artisan make:test UserTest --unit` to create a test stub for you and this is what you will end up with.

```php
<?php

namespace Tests\Unit;

use Tests\TestCase;

class UserTest extends TestCase
{
    /**
     * A basic test example.
     *
     * @return void
     */
    public function testExample()
    {
        $this->assertTrue(true);
    }
}
```

What we now want is to test, that our `getFullNameAttribute()` method indeed concatenates the first name and last name of our user to build the full name.

Our first implementation of the test could look like this.

```php
<?php

namespace Tests\Unit;

use App\User;
use Tests\TestCase;

class UserTest extends TestCase
{
    /** @test */
    public function it_concatenates_first_and_last_name_to_build_the_full_name()
    {
        $user = new User;
        $user->first_name = "John";
        $user->last_name = "Doe";
        
        $this->assertTrue(
            $user->getFullNameAttribute() === "John Doe"
        );
    }
}
```

The `@test` annotation describes to the underlying PhpUnit testing framework, that this function is a test.

We specified a descriptive name for our method and built the state we require to make an assertion about our code. At a later point, we could refactor this to use [Laravels model factories](https://laravel.com/docs/5.7/seeding), but as of now, this will suffice.

If we run the code by executing PhpUnit from the command line `vendor/bin/phpunit` we should see all tests passing.

To validate our test, change the first name to `Jane` and re-execute the test. It should now fail.

## This was easy, what now?

Testing methods on classes, that do not require interaction with the outside world, is pretty straightforward. If, however, we would need to ask a service for a potential nickname of our user, this changes.

```php
<?php

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    /**
     * @return string
     */
    public function getFullNameAttribute(): string
    {
        if ($nickName = NicknameService::getNickname($this)) {
            return "$this->first_name $nickName $this->last_name";
        }

        return "$this->first_name $this->last_name";
    }
}
```

In order not to depend on the implementation of the NicknameService, we need to “mock” it. This means that we intercept the call to the service and return a static result.

(This makes use of Laravel Facades, you can learn more about them [here](https://laravel.com/docs/5.7/facades).)

```php
<?php

namespace Tests\Unit;

use App\User;
use Tests\TestCase;

class UserTest
    extends TestCase {
    
    // first test ...

    /** @test */
    public function it_puts_the_nickname_between_first_and_last_name()
    {
        $user = new User;
        $user->first_name = "John";
        $user->last_name = "Doe";

        NicknameService::shouldReceive('getNickname')
            ->once()
            ->with($user)
            ->andReturn("'The Outlaw'");                  
        
        $this->assertTrue(
            $user->getFullNameAttribute() === "John 'The Outlaw' Doe"
        );
    }
}
```

What this test does should be pretty self-explanatory. By using a Facade we make it really easy to “mock” the result of the function and decouple it from the specific implementation of the actual Nickname service.

Combined with factories and great helper methods, this makes for a really pleasant testing experience.

## Reaping the benefits

If learning the practices of testing seems like overhead, you will quickly realize, that using a testing framework will remove a lot of manual testing and actually be a huge time saver.

Furthermore, once the time was invested to implement a test, it can be re-run in the future without any effort, giving you the benefit of being sure, that your changes did not break the tested functionality.

If you’ve always wanted to contribute to open source, but did not know how or where intimidated, that any contribution required tests to go along with it, you can now confidently go ahead and implement your feature with ease.

In short, testing your code will give you a huge confidence boost in your code. Mistakes will still happen, we are human after all, but they will be much rarer and easier to track down.

## Next Steps

As already mentioned, there is a lot to learn about testing. So go ahead and pick up a book, an online course or just read through the documentation of Laravel and PhpUnit.

I can personally recommend Laracasts course on [Testing Laravel](https://laracasts.com/series/phpunit-testing-in-laravel). Jeffrey Wey does a great job explaining TDD in more detail and gives useful tips that will make you better at testing immediately.

When implementing new features, write tests, that describe your implementation, before actually implementing the functionality.

### Links

- https://laravel.com/docs/5.7/testing
- https://phpunit.de/