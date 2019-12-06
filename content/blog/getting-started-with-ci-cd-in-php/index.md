---
title: "Getting started with CI/CD in PHP"
tags: ["php", "gitlab", "cicd",]
published: true
date: '2019-03-24'
---

## What is CI/CD?

CI/CD is short for __C__ontinues __I__ntegration and __C__ontinues __D__elivery (sometimes also called __C__ontinues __D__eployment). Both terms group steps and actions that occur during the lifetime of your project. Red Hat has [a great article](https://www.redhat.com/en/topics/devops/what-is-ci-cd), where all these acronyms are explained in a little more detail.

I will go over my setup, mainly for CI jobs and tools, and give a short explainer, as well as some useful links to get you started with your own pipeline. For this post, I will spare the topic of automatic deployment.

## What advantages do you gain?
The effects may vary depending on a variety of factors, but speaking from personal experience these are some areas you will benefit in:

* Keeping the code base organized
* Having consistent formatting throughout your codebase
* Giving (new) contributors some guidelines to follow when developing their feature
* Bringing value to your users faster

## Code Functionality and Quality

Arguably the most important part of setting up a pipeline is getting set up with tests. Testing your application thoroughly will ensure that your business logic works the way it should.

### Automated Testing

In order to get the most out of your tests, they should run on all of your supported PHP versions. Another criterion to test for is your third-party dependencies. When you require a package with `composer` , you can give it some version constraints. To ensure that we actually support the versions specified, we should run our tests multiple times with different `composer install` flags.

### Travis CI ([Link](https://docs.travis-ci.com/user/languages/php/))

Travis CI is easy to set up, free to use for open source projects and a somewhat standard tool in the PHP community for automatically running your tests.
It integrates nicely with Github and by following their [setup instructions](https://docs.travis-ci.com/user/tutorial/), you are up and running in a matter of minutes. It’s also easily configured by putting a _.travis-ci.yml_ file in your project.

* [Laravel Travis CI configuration](https://github.com/laravel/framework/blob/5.8/.travis.yml)
* [Spatie Package Travis CI configuration](https://github.com/spatie/laravel-query-builder/blob/1.17.0/.travis.yml)

### Code Duplication

Given a growing codebase, it’s easy to forget that some code-snippet, that you’ve just introduced with your new feature, has already been used somewhere. The duplicated code will lead to a messy codebase and add maintenance cost to your project.

### PHP Duplicate Code Detector ([Github](https://github.com/sebastianbergmann/phpcpd))

[Sebastian Bergmann](https://sebastian-bergmann.de/), who created PHPUnit, also created a PHP CLI tool that automatically detects duplicate code.

It may take some time to find a good balance of parameters for your project, but it is an easy win regarding clean code, that I can highly recommend.

### Code Coverage

A metric that is often mentioned in regards to testing is “Code Coverage”. It describes, how much of your production code is covered when running your tests.

Although the sound of saying “I have 100 percent code coverage” might be compelling to strive for high coverage, this alone does not guarantee, that your code is well tested and functional. More important than a high coverage is that code coverage allows you to track down paths in your application, that are not tested at all.

### Scrutinizer CI ([Website](https://scrutinizer-ci.com/))

Scrutinizer CI is a quite powerful tool, that offers lots of insights into your code. Besides running tests for code coverage, it also analyses the complexity of your code and brings up potential issues, that otherwise may go undiscovered.

It’s free for open source projects and especially easy to set up for your Github projects by following the [setup-up guide](https://scrutinizer-ci.com/docs/guides/php/continuous-integration-deployment).

## Code Formatting

Consistent styling helps contributors and consumers of your code, to read and comprehend code more easily.

Code formatting is a very opinionated topic and it’s borderline impossible to come to terms with everybody on how code should be formatted. (Spaces!)

It’s best to define a set of styles you want to adhere to when developing a specific project right at the beginning. Generally, it is recommended to adhere to PSR-1 and PSR-2, but as long as you stick to a consistent style and enforce it in your whole project, you are good to go.

__(PSR is short for PHP Standard Recommendation and is issued by the PHP-FIG. You can read more about them here.)__

### Tools

Personally, I’ve been mainly using two tools for enforcing coding styles.

### PHP CS Fixer ([Github Link](https://github.com/FriendsOfPHP/PHP-CS-Fixer))

This is an open source project with highly customizable options. It can be run both locally and in a pipeline.

[Mlocati’s PHP CS Fixer — Configurator](https://mlocati.github.io/php-cs-fixer-configurator/#version:2.16) is a great addition to play around with all the possible options.

* [My personal PHP CS configuration](https://gist.github.com/dominikb/c06c426b2e1c0f55f3ac4fe04e6eabf5)
* [Laravel PHP CS Configuration (up until 5.4)](https://github.com/laravel/framework/blob/5.4/.php_cs)

Adding custom scripts to your composer.json file makes it a breeze to quickly check if all your code is formatted correctly, or to let it be fixed automatically.

### Style CI (Website)

Style CI is a tool that can be hooked into your repositories to automatically check for a given set of style rules on new pushes for a given branch. It offers additional functionality besides styling of PHP files, by also supporting Vue, CSS, JavaScript and more.

It’s free for open source projects and can be easily configured with a _.styleci.yml_ file in your repository.

Check out their [documentation](https://docs.styleci.io/) to find out more.

## Code Integrity

We use a lot of third-party code within our applications, that helps us do things more quickly, and that is fine. However, this could potentially expose us to security vulnerabilities.

Another problem could be, that we do not always check thoroughly enough, how our dependencies are licensed.

### SensioLabs Security Checker ([Github](https://github.com/sensiolabs/security-checker))

Sensio Labs offers a tool that helps us to determine if we use dependencies with known security vulnerabilities. It reads from your _composer.lock_ file and checks your dependencies and versions against their records.

### Checking Licences

Composer comes with a pre-packed command that scans your dependencies and lists all of them with their associated licenses.

Run __composer licenses__ within your project to get a listing of your dependencies, their installed version, and their used license.

I am currently working on a CLI tool that empowers the built-in composer command, adds additional information to used licenses and lets your pipeline fail when unwanted licenses were used within third-party dependencies. You can keep up with the development [here](https://github.com/dominikb/composer-license-checker).