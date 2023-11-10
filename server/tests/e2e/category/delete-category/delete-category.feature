Feature: Delete category

    Background: Existing category
        Given category data
            | slug        | name        | parent_id |
            | electronics | Electronics | null      |
        When I send a request to create a category

    Scenario: I can delete a category
        Given I have a category ID
        When I send a request to delete the category with that ID
        Then I cannot see my category in a list of all categories
