# This is a Gherkin feature file https://cucumber.io/docs/gherkin/reference/

Feature: Category Management

    # Scenario for creating a new category
    Scenario: I can create a category
        Given category data
            | slug        | name        | parentId |
            | electronics | Electronics | null     |
        When I send a request to create a category
        Then I receive the category ID
        And I can see my category in a list of all categories

    # Scenario outline for trying to create a category with invalid data
    Scenario Outline: I try to create a category with invalid data
        Given category data
            | slug   | name   | parentId   |
            | <Slug> | <Name> | <ParentId> |
        When I send a request to create a category
        Then I receive an error "Bad Request" with status code 400

        Examples:
            | Slug        | Name        | ParentId                                 |
            | electronics |             | null                                     |
            |             | Electronics | null                                     |
            | electronics | Electronics | invalid-uuid                             |
            | electronics | Electronics | 123e4567-e89bavbc-12d3-a456-426655440000 |
