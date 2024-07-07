[![CodeQL PHP](https://github.com/cayacdev/cashbox/actions/workflows/codeql-analysis.yml/badge.svg?branch=main)](https://github.com/cayacdev/cashbox/actions/workflows/codeql-analysis.yml)
[![Backend Tests](https://github.com/cayacdev/cashbox/actions/workflows/backend_tests.yml/badge.svg?branch=main)](https://github.com/cayacdev/cashbox/actions/workflows/backend_tests.yml)
[![Frontend Tests](https://github.com/cayacdev/cashbox/actions/workflows/frontend_tests.yml/badge.svg?branch=main)](https://github.com/cayacdev/cashbox/actions/workflows/frontend_tests.yml)
[![codecov](https://codecov.io/gh/cayacdev/cashbox/branch/main/graph/badge.svg?token=SWJO8H1U9H&branch=main)](https://codecov.io/gh/cayacdev/cashbox)

# CashBox Application

I created this application because my girlfriend and me needed a digital *cash box*. Before
COVID-19, we had an analog box to store cash every month. With this money we bought groceries or
went out to eat. Since everybody now uses contactless payment the old approach is useless.

## Setup local environment

### Initial setup

For the lumen backend following steps are necessary:

* Generate secret key `php artisan jwt:secret`
* Copy and adapt environment file `cp .env.template .env`

### Create test data for development

This command creates test data with four users
`cd backend; php artisan migrate:fresh --seed`

| User           | Password |
|----------------|----------|
| test1@test.com | 12345678 |
| test2@test.com | 12345678 |
| test3@test.com | 12345678 |
| test4@test.com | 12345678 |

### Start servers

* Start backend server: `php -S localhost:8080 -t public`
* Start frontend server: `ng serve --open`

### Run tests

* Run backend tests:
    * `./vendor/bin/phpunit`
    * `XDEBUG_MODE=coverage ./vendor/bin/phpunit --coverage-html coverage`
* Run frontend tests
    * `ng test`
    * `ng test --code-coverage`
