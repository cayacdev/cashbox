[![CodeQL PHP](https://github.com/cayacdev/cashbox/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/cayacdev/cashbox/actions/workflows/codeql-analysis.yml)
[![PHPUnit](https://github.com/cayacdev/cashbox/actions/workflows/laravel_phpunit.yml/badge.svg)](https://github.com/cayacdev/cashbox/actions/workflows/laravel_phpunit.yml)

# Cashbox Application 

I created this application because my girlfriend and me needed a digital *cash box*. Before COVID-19 we had an analog box to store cash every month. With this money we bought groceries or went out to eat. Since everybody now uses contactless payment the old approach is useless.

## Setup local environment

### Installation

In the backend:

Generate secret key `php artisan jwt:secret`

Copy and adapt environment file `cp .env.template .env`


### Start servers

Start backend server: `php -S localhost:8080 -t public`

Start frontend server: `ng serve --open`

## Backend

### Start tests

`cd` into backend directory

**Run tests**

`./vendor/bin/phpunit`

**Run tests with coverage**

`XDEBUG_MODE=coverage  ./vendor/bin/phpunit --coverage-html coverage`
