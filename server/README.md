## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn install
```

## Running the app

```bash
# Docker env
cd docker/dev
docker compose up -d
docker compose stop api
# development
$ npm run start:dev


# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests

# e2e tests
$ yarn test tests/e2e --runInBand

# test coverage
$ npm run test:cov
```

### First time Setup

Before running the app for the first time, you need to:

1. **Create environment files**

   - `.env.development` for development (`start:dev`)
   - `.env.prod` for production (`start:prod`)
   - `.env.test` for testing

   These files should contain the required environment variables for your setup (e.g., database connection string, secrets, etc).

2. **Run database migrations**

   If your database schema is empty or you have just spun up a new database, run:

   ```bash
   NODE_ENV=development yarn migration:up
   ```

   This will apply all pending migrations and initialize your database schema.

   To check executed or pending migrations:

   ```bash
   NODE_ENV=development yarn migration:executed
   NODE_ENV=development yarn migration:pending
   ```

3. **(Optional) Seed the database**

   If you want to populate the database with initial data (if seeds are provided):

   ```bash
   NODE_ENV=development yarn seed:up
   ```

### Notes

Some potential bounded contexts/modules

- Product Catalog: This bounded context would be responsible for managing the product catalog, including adding new products, updating product details, managing inventory, and handling product queries.

- Order Management: This bounded context would handle the entire order management process, including order placement, payment processing, and order fulfillment.

- User Management: This bounded context would handle user registration, authentication, and account management, as well as any other customer-related features.

- Shipping: This bounded context would handle the logistics of shipping, including order tracking, shipping carrier integration, and other related functionality.

- Marketing: This bounded context would handle all marketing activities, such as email marketing, promotions, discounts, and other customer acquisition and retention strategies.

- Analytics: This bounded context would be responsible for tracking and analyzing user behavior and customer data, such as clickstream data, user demographics, and other analytics-related features.

## Cart

The cart can be seen as a part of the Order Management bounded context, as it is directly related to the order process. It involves adding products to a cart, updating the cart contents, and eventually checking out and placing an order. However, depending on the complexity of your application, the cart could potentially be treated as a separate bounded context on its own.

Storing the cart data in a session or a cookie is a common pattern, especially for guest users or when you want to minimize database interaction. This approach can be both efficient and suitable for many e-commerce applications, at least in the early stages. Here are some considerations for this approach:

### Pros of Storing Cart in Session/Cookie:

1. **Simplicity** : You can avoid complexities related to database schema, synchronization, and transaction management.
2. **Performance** : Retrieving cart data from a session or cookie is often faster than a database query, leading to quicker response times.
3. **Guest Users** : You can easily support guest users (i.e., users not logged into an account) by associating the cart with their session.

### Cons and Considerations:

1. **Size Limitations** : Cookies have size limitations (around 4KB per cookie), so you must be mindful of how much data you are storing. Sessions can also have limitations depending on how they're implemented.
2. **Security Concerns** : Storing sensitive information in cookies can lead to security risks. Ensure that you're only storing necessary data and consider encrypting the contents if needed.
3. **Persistence** : If the user clears their cookies or if the session expires, the cart data will be lost. This might be acceptable for guest users but might not be ideal for registered users.
4. **Synchronization with Actual Prices** : Since the cart data is stored in the client's session or cookie, it may not automatically reflect changes in product prices or availability. You'll have to decide how to handle such scenarios.

### Transitioning to Database Storage Later:

If you start with session/cookie storage and decide to move to database storage later, you'll need to consider a migration strategy. Here's a common pattern:

1. **For Guest Users** : Continue using sessions/cookies as before.
2. **For Logged-in Users** : Upon login or cart modification, transfer the cart data from the session/cookie to the database, associating it with the user's account.
3. **Hybrid Approach** : You can use sessions/cookies for temporary storage (e.g., for guest users or before login) and then transfer to the database for more permanent storage (e.g., after login or for registered users).

### Conclusion:

Storing the cart in a session or cookie is a valid approach that offers simplicity and performance benefits, especially for guest users or in the early stages of development. Be aware of the limitations and potential security considerations and plan for a possible transition to database storage if your application's requirements grow. It aligns well with a Domain-Driven Design (DDD) approach, as it allows you to define the cart as an aggregate and encapsulate the behavior according to the business rules, whether stored in a cookie, session, or database.

Keeping only product IDs and quantities inside the cart cookie and then fetching the detailed information like product names, prices, and descriptions from the server when needed is a wise approach. This addresses several key concerns:

### Security:

By storing only product IDs and quantities in the cookie, you minimize the risk of malicious alteration. Clients can't modify product details, prices, or other attributes that should be controlled server-side.

### Consistency:

By retrieving product details from the server when displaying the cart, you ensure that the information is up-to-date and consistent with the current state of the product catalog. If prices, descriptions, or other details change, these updates are automatically reflected in the cart view.

### Size:

Storing only product IDs and quantities minimizes the amount of data stored in the cookie, helping you stay within the typical size limitations of cookies (around 4KB per cookie).

### Implementation:

Here's a high-level outline of how you might implement this:

1. **Add to Cart** : When a user adds a product to the cart, store the product ID and quantity in the cookie.
2. **View Cart** : When the user views the cart:

- Retrieve the product IDs and quantities from the cookie.
- Query the server for the corresponding product details using a dedicated "fetch cart" query or similar endpoint.
- Aggregate the information to present the complete cart view to the user, including product names, prices, images, etc.

3. **Update Cart** : If the user updates the cart (e.g., changing quantities, removing items), update the product IDs and quantities in the cookie, and refresh the view as needed.
4. **Validation** : You may want to implement server-side validation when processing the cart (e.g., during checkout) to ensure that the quantities, pricing, and other attributes are consistent with the current state of the product catalog and business rules.

### Conclusion:

Storing only product ID references in the cart cookie, coupled with server-side aggregation of product details, provides a robust and flexible approach that balances security, consistency, and efficiency. It allows you to maintain control over key product attributes while providing a seamless and responsive user experience. Make sure to include appropriate server-side validation and error handling to gracefully handle any discrepancies or issues that may arise.

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

Run the migration:create script to create a new migration file in the migrations directory.

```bash
# Enter a name that describes the action you want to perform, such as "create_users_table".
NODE_ENV=development yarn migration:create create_users_table.sql
```

Run the migration:up script to apply the new migration and create the users table in the database. The up command applies all migrations that have not been applied yet.

```bash
NODE_ENV=development yarn migration:up
```

Note that you can also use the migration:down script to roll back a migration if necessary.

## DockerHub

To publish your backend Docker image to Docker Hub, you can follow these steps:

1. Tag your Docker image: Before pushing the image to Docker Hub, you need to tag it with the appropriate repository name. Assuming you have already built your Docker image, you can use the following command to tag it:

```bash
docker tag <image_id> <docker_hub_username>/<repository_name>:<tag>
#Example: varagos/minas-phone-api:0.0.1

# Otherwise you can build and tag an image for Docker Hub in a single command using
docker build -t <docker_hub_username>/<repository_name>:<tag> .
```

Replace <image_id> with the ID or name of your Docker image, <docker_hub_username> with your Docker Hub username, <repository_name> with the desired repository name, and <tag> with a version or tag name for your image.

2. Log in to Docker Hub: To push the image, you need to log in to Docker Hub using the docker login command:

```bash
docker login
```

You will be prompted to enter your Docker Hub username and password.

3. Push the Docker image: Once you are logged in, you can push the Docker image to Docker Hub using the docker push command:

```bash
docker push <docker_hub_username>/<repository_name>:<tag>
```

Replace <docker_hub_username>, <repository_name>, and <tag> with the corresponding values you used while tagging the image.

Docker will start pushing the image to Docker Hub, and the progress will be displayed in the terminal.

### Notes:

If you are using an ARM-based processor, and your production server is probably AMD-based(most are), then you need to tell docker to build the image for AMD. You can do this by adding the `--platform linux/amd64` flag to the `docker build` command.

```bash
docker buildx build --platform linux/amd64 \
    -t <docker_hub_username>/<repository_name>:<tag> \
    -f Dockerfile \
    --push \
    --no-cache \
    .

```

## Deployment

### Publish using CI/CD

- To create a Git tag, you typically use the following command:

```bash

git tag <tagname>
```

So, in the context of the naming pattern mentioned earlier (`nestjs-server-v1.2.3`), you would create a tag for a new version by running:

```bash

git tag nestjs-server-v1.2.3
```

After creating the tag, you would need to push it to the remote repository. You can do that with the following command:

```bash

git push origin nestjs-server-v1.2.3
# or
git push --tags
```

This will push the specific tag `nestjs-server-v1.2.3` to the remote repository, and if your GitHub Actions workflow is configured as I described earlier, it will trigger the build and publish process.

Note: Make sure to run the `git tag` command on the commit you want to mark as a release. Typically, this would be the latest commit on your main branch or another branch you're using for production releases, but you can also tag previous commits if needed.

# Project Deployment Workflow

## Development and Pull Request

1. **Branching:** For new features or fixes, create a new branch from `main` (e.g., `feature/your-feature`).
2. **Development:** Implement your changes in the feature branch.
3. **Commit:** Regularly commit your changes and push the branch to the remote repository.
4. **Pull Request:** Once development is complete, open a Pull Request (PR) against the `main` branch.
5. **Review and Tests:** Ensure your PR passes all reviews and automated tests.

## Merging and Release

1. **PR Approval:** Once the PR is approved and all checks pass, merge it into `main`.
2. **Tagging:** Create a new release tag following semantic versioning (e.g., `nestjs-server-v1.0.0`).
3. **Push Tag:** Push the tag to the remote repository to trigger the deployment pipeline.

# Commands step-by-step

```bash
# Git checkout
gco main

git tag nestjs-server-v1.2.3

git push --tags

# Done! :)
```

### Neon

the postgres db is currently hosted on `neon.tech`

# Slonik, Write safe SQL queries

Here's a guide to help you understand the use cases for each utility:

1. `sql.array`
   Use when you need to pass an array of values to a query. It creates an array value binding, ensuring that the array is safely formatted for SQL.

```javascript
sql`SELECT * FROM users WHERE id = ANY(${sql.array([1, 2, 3], 'int4')})`;
```

2. `sql.binary`
   Use for binding binary data (like Buffer objects) in your queries.

```javascript
sql`INSERT INTO files (data) VALUES (${sql.binary(buffer)})`;
```

3. `sql.date`
   Use to safely insert a JavaScript Date object.

```javascript
sql`INSERT INTO events (date) VALUES (${sql.date(new Date())})`;
```

4. `sql.fragment`
   Use to build complex or conditional SQL fragments.

```javascript
const condition = sql.fragment`price > ${100}`;
sql`SELECT * FROM products WHERE ${condition}`;
```

5. `sql.identifier`
   Use for safely including identifiers (like table or column names) in your query, especially if they are dynamic.

```javascript
const columnName = 'username';
sql`SELECT ${sql.identifier([columnName])} FROM users`;
```

6. `sql.interval`
   Use for inserting interval values, particularly for date and time arithmetic.

```javascript
sql`SELECT NOW() - ${sql.interval({ days: 7 })}`;
```

7. `sql.join`
   Use for joining SQL fragments or values with a delimiter, such as in IN clauses.

```javascript
sql`SELECT * FROM users WHERE id IN (${sql.join([1, 2, 3], sql`, `)})`;
```

8. `sql.json and sql.jsonb`
   Use these to insert JSON or JSONB values. They ensure the value is serialized correctly for PostgreSQL.

```javascript
sql`INSERT INTO documents (data) VALUES (${sql.json({ key: 'value' })})`;
```

9. `sql.literalValue`
   Use with caution. This allows inserting raw values into queries and is typically used for building utility statements where parameterized queries aren't feasible. Avoid using it with user-supplied data to prevent SQL injection.

```javascript
sql`CREATE USER ${sql.identifier(['user'])} WITH PASSWORD ${sql.literalValue(
  'secret',
)}`;
```

10. `sql.timestamp`
    Use for inserting timestamps.

```javascript
sql`INSERT INTO events (timestamp) VALUES (${sql.timestamp(new Date())})`;
```

11. `sql.unnest`
    Use for creating an unnest expression, typically for bulk insert operations or complex queries.

```javascript
sql`INSERT INTO users (id, name) SELECT * FROM ${sql.unnest(
  [
    [1, 'Alice'],
    [2, 'Bob'],
  ],
  ['int4', 'text'],
)}`;
```

12. `sql.unsafe`
    Use only when necessary and with extreme caution. This allows executing raw SQL queries but bypasses Slonik's safety mechanisms. Avoid using it with user inputs.

```javascript
sql.unsafe`SELECT * FROM users WHERE id = ${rawUserId}`;
```

### Summary

- For most cases, use sql for queries with values to ensure safe parameter binding.
- Use sql.identifier for dynamic table or column names.
- Use sql.fragment for complex SQL snippets and sql.join for combining multiple conditions or values.
- Reserve sql.literalValue and sql.unsafe for special cases where other utilities don't fit, and never use them with direct user input to prevent SQL injections.
