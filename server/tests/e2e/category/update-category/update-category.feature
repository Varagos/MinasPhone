Feature: Update Category

    Background: Existing category
        Given category data
            | slug        | name        | parent_id |
            | electronics | Electronics | null      |
        When I send a request to create a category

    Scenario Outline: I can update a category
        Given I have a category ID
        When I send a request to update the category with ID and new data
            | slug      | name      |
            | <NewSlug> | <NewName> |
        Then I should see the category with ID updated in the list of all categories
            | slug      | name      |
            | <NewSlug> | <NewName> |

        Examples:
            | NewSlug     | NewName     |
            | smartphones | Smartphones |
