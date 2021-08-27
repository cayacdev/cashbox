[![CodeQL PHP](https://github.com/cayacdev/cashbox/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/cayacdev/cashbox/actions/workflows/codeql-analysis.yml)
[![Backend Tests](https://github.com/cayacdev/cashbox/actions/workflows/backend_tests.yml/badge.svg)](https://github.com/cayacdev/cashbox/actions/workflows/backend_tests.yml)
[![Frontend Tests](https://github.com/cayacdev/cashbox/actions/workflows/frontend_tests.yml/badge.svg)](https://github.com/cayacdev/cashbox/actions/workflows/frontend_tests.yml)

# CashBox Application 

I created this application because my girlfriend and me needed a digital *cash box*. Before COVID-19 we had an analog box to store cash every month. With this money we bought groceries or went out to eat. Since everybody now uses contactless payment the old approach is useless.

## Setup local environment

### Initial setup

For the lumen backend following steps are necessary:
* Generate secret key `php artisan jwt:secret`
* Copy and adapt environment file `cp .env.template .env`


### Start servers

* Start backend server: `php -S localhost:8080 -t public`
* Start frontend server: `ng serve --open`

### Run tests

* Run backend tests:
  * `./vendor/bin/phpunit`
  * `XDEBUG_MODE=coverage  ./vendor/bin/phpunit --coverage-html coverage`
* Run frontend tests
  * `ng test`
  * `ng test --code-coverage`
