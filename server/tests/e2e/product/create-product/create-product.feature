# This is a Gherkin feature file for creating products.

Feature: Product Management

    Background: Existing category
        Given category data
            | slug        | name        | parent_id |
            | electronics | Electronics | null      |
        When I send a request to create a category

    Scenario: I can create a product with an existing category
        Given product data
            | name              | description                    | price | quantity | active | image                                   | sku         | category_slug |
            | Apple MacBook Pro | Great laptop for professionals | 1999  | 10       | true   | data:image/jpeg;base64,dG9ueVNvcHJhbm8= | prod_g7F54H | electronics   |
        When I send a request to create a product
        Then I receive the product ID
        And I can see my product in a list of all products

    Scenario Outline: I try to create a product with invalid data
        Given product data
            | name   | description | price   | quantity   | active   | image                      | sku         | category_slug |
            | <Name> | <Desc>      | <Price> | <Quantity> | <Active> | data:image/jpeg;base64,... | prod_g7F54H | electronics   |
        When I send a request to create a product
        Then I receive an error "Bad Request" with status code 400

        Examples:
            | Name              | Desc                           | Price | Quantity | Active        |
            |                   | Great laptop for professionals | 1999  | 10       | true          |
            | Apple MacBook Pro |                                | 1999  | 10       | true          |
            | Apple MacBook Pro | Great laptop for professionals | -50   | 10       | true          |
            | Apple MacBook Pro | Great laptop for professionals | 1999  | -1       | true          |
            | Apple MacBook Pro | Great laptop for professionals | 1999  | 10       | not a boolean |
