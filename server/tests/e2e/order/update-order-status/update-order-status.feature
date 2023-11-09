Feature: Update Order Status

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

    Scenario Outline: Update order status
        Given I have items in the cart and order information
            | firstName | lastName | email          | phoneNumber   |
            | John      | Doe      | test@email.com | +306900000000 |
        And I send a request to checkout the cart
        When I send a request to update the order status
            | status   |
            | <Status> |
        Then the order status should be updated
            | status   |
            | <Status> |

        Examples:
            | Status    |
            | delivered |
            | cancelled |
