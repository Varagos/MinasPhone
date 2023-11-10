Feature: Cart Management

    Background: Existing category and product
        Given category data
            | slug        | name        | parent_id |
            | electronics | Electronics | null      |
        And I send a request to create a category
        And product data
            | name              | description                    | price | quantity | active | image                                   | sku         | category_slug |
            | Apple MacBook Pro | Great laptop for professionals | 1999  | 10       | true   | data:image/jpeg;base64,dG9ueVNvcHJhbm8= | prod_g7F54H | electronics   |
        And I send a request to create a product

    Scenario: Fetching the cart creates a new cart if none exists
        When I fetch the cart
        Then I receive a cart cookie

    Scenario: Adding a product to the cart
        Given I fetch the cart
        And Cart item data
            | name              | quantity |
            | Apple MacBook Pro | 5        |
        When I send a request to add the product to the cart
        Then the product should be added to the cart
        And the cart should contain the product with the specified quantity

    Scenario Outline: Adding a product with invalid data to the cart
        Given I fetch the cart
        And Cart item data
            | name          | quantity   |
            | <ProductName> | <Quantity> |
        When I send a request to add the product to the cart
        Then I receive an error "Bad Request" with status code 400

        Examples:
            | ProductName       | Quantity |
            | Apple MacBook Pro | 0        |
            | Apple MacBook Pro | -5       |
