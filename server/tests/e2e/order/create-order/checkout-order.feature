Feature: Checkout Order

    Background: Existing category, product and cart
        Given category data
            | slug        | name        | parent_id |
            | electronics | Electronics | null      |
        And I send a request to create a category
        And product data
            | name              | description                    | price | quantity | active | image                                   | sku         | category_slug |
            | Apple MacBook Pro | Great laptop for professionals | 1999  | 10       | true   | data:image/jpeg;base64,dG9ueVNvcHJhbm8= | prod_g7F54H | electronics   |
        And I send a request to create a product
        And I fetch the cart
        And Cart item data
            | name              | quantity |
            | Apple MacBook Pro | 5        |
        When I send a request to add the product to the cart

    Scenario: Successfully creating an order
        Given I have items in the cart and order information
            | firstName | lastName | email          | phoneNumber   |
            | John      | Doe      | test@email.com | +306900000000 |
        When I send a request to checkout the cart
        Then an order should be created
        And the order should contain the correct items and quantities
        And the stock quantity of the product should become "5"

# Scenario Outline: Attempt to checkout with an empty cart
#     Given I have an empty cart
#     When I send a request to checkout the cart
#     Then I receive an error "Bad Request" with status code 400

# Scenario Outline: Attempt to checkout with insufficient product stock
#     Given I have items in the cart
#     But the product stock is less than the cart quantity
#     When I send a request to checkout the cart
#     Then I receive an error "Insufficient stock" with status code 400

# Scenario Outline: Attempt to checkout with inactive product
#     Given I have items in the cart
#     But one of the products is inactive
#     When I send a request to checkout the cart
#     Then I receive an error "Inactive product" with status code 400