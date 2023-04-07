<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

Some potential bounded contexts/modules

- Product Catalog: This bounded context would be responsible for managing the product catalog, including adding new products, updating product details, managing inventory, and handling product queries.

- Order Management: This bounded context would handle the entire order management process, including order placement, payment processing, and order fulfillment.

- Customer Management: This bounded context would handle customer registration, authentication, and account management, as well as any other customer-related features.

- Shipping: This bounded context would handle the logistics of shipping, including order tracking, shipping carrier integration, and other related functionality.

- Marketing: This bounded context would handle all marketing activities, such as email marketing, promotions, discounts, and other customer acquisition and retention strategies.

- Analytics: This bounded context would be responsible for tracking and analyzing user behavior and customer data, such as clickstream data, user demographics, and other analytics-related features.

The cart can be seen as a part of the Order Management bounded context, as it is directly related to the order process. It involves adding products to a cart, updating the cart contents, and eventually checking out and placing an order. However, depending on the complexity of your application, the cart could potentially be treated as a separate bounded context on its own.

### To create a users table using @slonik/migrator, you would need to follow these steps:

Create a new SQL file in the migrations directory with a name that describes the action you want to perform. For example, 20220404123456*create_users_table.sql. The format of the filename should be <timestamp>*<description>.sql, where the timestamp is in the format YYYYMMDDHHmmss.

In the SQL file, write the SQL statements to create the users table. For example:

```sql
Copy code
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);
```

Run the migration:create script to create a new migration file in the migrations directory. The script should prompt you for a name for the migration file. Enter a name that describes the action you want to perform, such as "create_users_table".

Run the migration:up script to apply the new migration and create the users table in the database. The up command applies all migrations that have not been applied yet.

Note that you can also use the migration:down script to roll back a migration if necessary.
