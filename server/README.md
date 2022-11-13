## Start a mysql server instance

### Starting a MySQL instance is simple:

```bash
$ docker run --name some-mysql -e MYSQL_ROOT_PASSWORD=bestPassword42 -d mysql:8.0
```

## Supertokens auth

```bash
docker run -p 3567:3567 -d registry.supertokens.io/supertokens/supertokens-postgresql
# or
docker compose up
```

### Stock is not reduced when an item is added to the cart

This is designed by choice since

- If stock was reduced when an item added to the cart, probably small store owners would lose customers due to lack of stock.
- It frees up actual stock for real paying
  customers. (since fair deal of shopping carts remain unfulfilled)

Two customers can still add the same item even though there's only one item left. This will cause an error for one of the two customers if they both decide to proceed
with the order. Reserving the items when put into cart, would be appropriate in large inventory ecommerce site, and small shopping cart ttl.

## Dynamic Prices

Prices are not stored in the Cart itself but are loaded on demand.
This is a common use-case because we usually need fresh prices from a database or ERP.
Cart is separated from "loading prices" by an interface Prices.
This is a domain element but have to be implemented by the project needs - by API calls or database queries.

# Shopping cart expiry

A cron job removes shopping carts after 1 week of idleness. In the future a redis could be used instead for carts.

### TODO - Roadmap

- Retrieve cart use-Case, fetch with associated line items, save with associated items
