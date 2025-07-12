Feature: Create Category
    As an admin
    I want to create product categories
    So that I can organize products in the catalog

    Scenario: Successfully create a top-level category
        Given I have valid category data
            | name        | slug        | parentId |
            | Electronics | electronics | null     |
        When I create the category
        Then the category should be created successfully

# Scenario: Fail to create duplicate category
#     Given a category with slug "electronics" already exists
#     When I try to create a category with slug "electronics"
#     Then I should receive a category exists error

# Scenario: Create a subcategory
#     Given a parent category with id "parent-123" exists
#     When I create a subcategory with parent "parent-123"
#     Then the subcategory should be created under the parent