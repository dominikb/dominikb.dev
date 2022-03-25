---
title: 'Using Logstash with Laravel'
tags: ["laravel", "php",]
published: true
date: '2018-11-13'
---

Lately, I have been developing an application based on Laravel 5.7 that makes heavy use of Laravels Queue feature.

In order to easier structure different debug information for multiple hosts we use Elastic Logstash and Kibana.

Laravel does not come with a pre-configured Logstash driver option, but I got it up and running with very little work.

## Logstash Driver

Laravels logging configuration is placed within the `config/logging.php` file. In order to add our configuration for Logstash, we simply add a custom provider.

```php
<?php

return [
    // ... other configuration stuff

    'channels' => [
        // ... other channels like stack or single

        'logstash' => [
            'driver' => 'custom',
            'via'    => \App\LogstashLogger::class,
            'host'   => env('LOGSTASH_HOST', '127.0.0.1'),
            'port'   => env('LOGSTASH_PORT', 4718),
        ],
    ],

];
```

For more on how to define custom loggers, refer to the [Laravel documentation](https://laravel.com/docs/5.7/logging#creating-channels-via-factories).

## Logstash Logger Provider

So what does our factory class do? All it needs to do is to implement PHPs magic method `__invoke()` and return an instance of `\Psr\Log\LoggerInterface`


```php
<?php

namespace App;


use Monolog\Formatter\LogstashFormatter;
use Monolog\Handler\SocketHandler;
use Monolog\Logger;
use Psr\Log\LoggerInterface;

class LogstashLogger {

    /**
     * @param array $config
     * @return LoggerInterface
     */
    public function __invoke(array $config): LoggerInterface
    {
        $handler = new SocketHandler("udp://{$config['host']}:{$config['port']}");
        $handler->setFormatter(new LogstashFormatter(config('app.name')));

        return new Logger('logstash.main', [$handler]);
    }

}
```

</br>

## … and done!

Now you are ready to use the custom channel to ship your logs via UDP to any Logstash Host that accepts data on the specified port.

To use the new configuration add it to a logging channel of type `'stack'` or make use of it directly: `Log::channel('logstash')->debug('Logging to logstash');`