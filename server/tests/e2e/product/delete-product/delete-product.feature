Feature: Delete product

    Background: Existing category and product
        Given category data
            | slug        | name        | parent_id |
            | electronics | Electronics | null      |
        And I send a request to create a category
        And product data
            | name              | description                    | price | quantity | active | image                                   | sku         | category_slug |
            | Apple MacBook Pro | Great laptop for professionals | 1999  | 10       | true   | data:image/jpeg;base64,dG9ueVNvcHJhbm8= | prod_g7F54H | electronics   |
        And I send a request to create a product

    Scenario: I can delete a product
        Given I have a product ID
        When I send a request to delete the product with that ID
        Then I cannot see my product in a list of all products