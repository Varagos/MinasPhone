Feature: Create Product Type
    As an administrator
    I want to create product types
    So that I can define different kinds of products with their specific attributes

    # ============================================
    # Happy Path Scenarios
    # ============================================

    Scenario: Create a simple product type
        When I create a product type with name "Smartphone" and isFilterable "true"
        Then the product type should be created successfully
        And the product type should have name "Smartphone"
        And the product type should be filterable

    Scenario: Create a product type with attributes
        When I create a product type with name "Laptop" and isFilterable "true"
        And the product type has the following attributes:
            | attributeId                          | isRequired | isFilterable | isSearchable | displayOrder |
            | attr-uuid-brand                      | true       | true         | true         | 1            |
            | attr-uuid-ram                        | true       | true         | false        | 2            |
        Then the product type should be created successfully
        And the product type should have 2 attributes

    # ============================================
    # Validation: Name
    # ============================================

    Scenario: Cannot create product type with empty name
        When I create a product type with name "" and isFilterable "true"
        Then the product type creation should fail
        And the error should be "Product type name cannot be empty"

    Scenario: Cannot create product type with whitespace-only name
        When I create a product type with name "   " and isFilterable "true"
        Then the product type creation should fail
        And the error should be "Product type name cannot be empty"

    Scenario: Create product type with very long name
        When I create a product type with name "This is a very long product type name that exceeds normal length limits and continues for much longer than 255 characters which is the maximum allowed length for a product type name in our system and therefore this should fail validation because it is way too long to be a reasonable product type name" and isFilterable "true"
        Then the product type creation should fail
        And the error should be "Product type name exceeds maximum length of 255 characters"
