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

## Deployment

### Heroku

app-name=`minas-phone-api`

```bash
# Set environment variables on Heroku:
heroku config:set <KEY>=<VALUE> --app <app-name>,
#  e.g. NODE_ENV=production

# Navigate to the directory containing the Dockerfile: Navigate to the directory where your Dockerfile and your application code resides.

# Build and push your Docker image:
heroku container:push web --app minas-phone-api
# to build your Docker image and push it to the Heroku Container Registry.

# Release your Docker image
heroku container:release web --app minas-phone-api
# to release your Docker image and deploy your app.


# You should now be able to open
https://minas-phone-api.herokuapp.com/api
```

### Azure

```bash
az acr create --resource-group minas-phone --name minasphonecontainerregistry --sku Basic

# Update backend tag, then
docker compose -f docker-compose.prod.yml up --build -d

docker images

# Push changes to registry
docker compose -f docker-compose.prod.yml push

# Verify image is stored, (based on docker images above)
az acr repository show --name minasphonecontainerregistry --repository minas_phone_backend

docker login azure

# Skip if previously done
docker context create aci minasphoneacicontext

docker context ls

docker context use minasphoneacicontext

docker compose -f docker-compose.prod.yml up

```

### TODO CI/CD

```yaml
name: Deploy to Heroku

on:
  push:
    branches:
      - main
  jobs:
    build-and-deploy:
      runs-on: ubuntu-latest

      steps:
        - name: Checkout code
          uses: actions/checkout@v2

        - name: Login to Heroku Container Registry
          run: docker login --username=$HEROKU_USERNAME --password=$HEROKU_API_KEY registry.heroku.com
          env:
            HEROKU_USERNAME: ${{ secrets.HEROKU_USERNAME }}
            HEROKU_API_KEY: ${{ secrets.HEROKU_API_KEY }}

        - name: Build and push Docker image
          run: |
            docker build -t registry.heroku.com/$HEROKU_APP_NAME/web .
            docker push registry.heroku.com/$HEROKU_APP_NAME/web
          env:
            HEROKU_APP_NAME: ${{ secrets.HEROKU_APP_NAME }}

        - name: Release Docker image
          run: |
            heroku container:release web --app $HEROKU_APP_NAME
          env:
            HEROKU_APP_NAME: ${{ secrets.HEROKU_APP_NAME }}
```

### Neon

the postgres db is currently hosted on `neon.tech`

### Notes

Some potential bounded contexts/modules

- Product Catalog: This bounded context would be responsible for managing the product catalog, including adding new products, updating product details, managing inventory, and handling product queries.

- Order Management: This bounded context would handle the entire order management process, including order placement, payment processing, and order fulfillment.

- User Management: This bounded context would handle user registration, authentication, and account management, as well as any other customer-related features.

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

4. Verify the pushed image: After the push is complete, you can go to your Docker Hub account in a web browser and navigate to the repository you pushed the image to. You should see the image listed there.

By following these steps, you can publish your backend Docker image to Docker Hub, making it available for others to use and download. Remember to ensure that the image is properly tagged and that you have logged in to Docker Hub before pushing the image.
