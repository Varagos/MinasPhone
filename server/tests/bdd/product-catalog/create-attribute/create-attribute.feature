# features/attribute/create-attribute.feature

Feature: Create Attribute
    As an administrator
    I want to create product attributes
    So that I can define product properties for filtering and display

    # ============================================
    # Happy Path Scenarios
    # ============================================

    Scenario Outline: Create a primitive type attribute
        When I create an attribute with name "<name>", valueType "<valueType>", inputType "<inputType>", and unit "<unit>"
        Then the attribute should be created successfully
        And the attribute should have no attribute values

        Examples:
            | name       | valueType | inputType | unit |
            | Brand      | string    | text      |      |
            | Battery    | number    | number    | mAh  |
            | 5G Enabled | boolean   | checkbox  |      |

    Scenario: Create an enum attribute with predefined values
        When I create an attribute with name "Brand", valueType "enum", inputType "select", and unit ""
        And the attribute has the following values:
            | value   | displayOrder |
            | Apple   | 1            |
            | Samsung | 2            |
            | Xiaomi  | 3            |
            | Google  | 4            |
        Then the attribute should be created successfully
        And the attribute should have 4 attribute values
        And the attribute values should be ordered correctly

    Scenario: Create a multiselect attribute with predefined values
        When I create an attribute with name "Tags", valueType "multiselect", inputType "multiselect", and unit ""
        And the attribute has the following values:
            | value    | displayOrder |
            | Flagship | 1            |
            | Budget   | 2            |
            | Gaming   | 3            |
            | 5G       | 4            |
        Then the attribute should be created successfully
        And the attribute should have 4 attribute values

    # ============================================
    # Validation: Name
    # ============================================

    Scenario: Cannot create attribute with empty name
        When I create an attribute with name "", valueType "string", inputType "text", and unit ""
        Then the attribute creation should fail
        And the error should be "Attribute name cannot be empty"

    Scenario: Cannot create attribute with whitespace-only name
        When I create an attribute with name "   ", valueType "string", inputType "text", and unit ""
        Then the attribute creation should fail
        And the error should be "Attribute name cannot be empty"


    # ============================================
    # Validation: Value Type
    # ============================================

    Scenario Outline: Cannot create attribute with invalid value type
        When I create an attribute with name "Test", valueType "<valueType>", inputType "text", and unit ""
        Then the attribute creation should fail
        And the error should be "Invalid value type: <valueType>"

        Examples:
            | valueType |
            | invalid   |
            | list      |
            | array     |
            | object    |

    # ============================================
    # Validation: Input Type
    # ============================================

    Scenario Outline: Cannot create attribute with invalid input type
        When I create an attribute with name "Test", valueType "string", inputType "<inputType>", and unit ""
        Then the attribute creation should fail
        And the error should be "Invalid input type: <inputType>"

        Examples:
            | inputType |
            | dropdown  |
            | textarea  |
            | slider    |
            | invalid   |

    # ============================================
    # Validation: Enum/Multiselect Must Have Values
    # ============================================

    Scenario: Cannot create enum attribute without values
        When I create an attribute with name "Brand", valueType "enum", inputType "select", and unit ""
        And the attribute has no values
        Then the attribute creation should fail
        And the error should be "Enum attributes must have at least one value"

    Scenario: Cannot create multiselect attribute without values
        When I create an attribute with name "Tags", valueType "multiselect", inputType "multiselect", and unit ""
        And the attribute has no values
        Then the attribute creation should fail
        And the error should be "Multiselect attributes must have at least one value"

    # ============================================
    # Validation: Non-Enum Cannot Have Values
    # ============================================

    Scenario: Cannot create string attribute with values
        When I create an attribute with name "Model", valueType "string", inputType "text", and unit ""
        And the attribute has the following values:
            | value      | displayOrder |
            | iPhone 15  | 1            |
            | Galaxy S24 | 2            |
        Then the attribute creation should fail
        And the error should be "String attributes cannot have predefined values"

    Scenario: Cannot create number attribute with values
        When I create an attribute with name "Battery", valueType "number", inputType "number", and unit "mAh"
        And the attribute has the following values:
            | value | displayOrder |
            | 3000  | 1            |
            | 4000  | 2            |
        Then the attribute creation should fail
        And the error should be "Number attributes cannot have predefined values"

    Scenario: Cannot create boolean attribute with values
        When I create an attribute with name "5G Enabled", valueType "boolean", inputType "checkbox", and unit ""
        And the attribute has the following values:
            | value | displayOrder |
            | true  | 1            |
            | false | 2            |
        Then the attribute creation should fail
        And the error should be "Boolean attributes cannot have predefined values"

    # ============================================
    # Validation: Attribute Values
    # ============================================

    Scenario: Cannot create enum attribute with empty value
        When I create an attribute with name "Brand", valueType "enum", inputType "select", and unit ""
        And the attribute has the following values:
            | value   | displayOrder |
            |         | 1            |
            | Samsung | 2            |
        Then the attribute creation should fail
        And the error should be "Attribute value cannot be empty"

    Scenario: Cannot create enum attribute with duplicate values
        When I create an attribute with name "Brand", valueType "enum", inputType "select", and unit ""
        And the attribute has the following values:
            | value   | displayOrder |
            | Apple   | 1            |
            | Samsung | 2            |
            | Apple   | 3            |
        Then the attribute creation should fail
        And the error should be "Duplicate attribute value: Apple"

    Scenario: Cannot create enum attribute with duplicate values (case insensitive)
        When I create an attribute with name "Brand", valueType "enum", inputType "select", and unit ""
        And the attribute has the following values:
            | value | displayOrder |
            | Apple | 1            |
            | APPLE | 2            |
        Then the attribute creation should fail
        And the error should be "Duplicate attribute value: APPLE (already exists as Apple)"

    Scenario: Cannot create enum attribute with negative display order
        When I create an attribute with name "Brand", valueType "enum", inputType "select", and unit ""
        And the attribute has the following values:
            | value   | displayOrder |
            | Apple   | -1           |
            | Samsung | 2            |
        Then the attribute creation should fail
        And the error should be "Display order must be a positive number"

    # ============================================
    # Edge Cases
    # ============================================

    Scenario: Create attribute with very long name
        When I create an attribute with name "This is a very long attribute name that exceeds normal length limits and continues for much longer than 255 characters which is the maximum allowed length for an attribute name in our system and therefore this should fail validation because it is way too long to be a reasonable attribute name", valueType "string", inputType "text", and unit ""
        Then the attribute creation should fail
        And the error should be "Attribute name exceeds maximum length of 255 characters"

    Scenario: Create attribute with special characters in name
        When I create an attribute with name "Brand (Manufacturer)", valueType "string", inputType "text", and unit ""
        Then the attribute should be created successfully
        And the attribute name should be "Brand (Manufacturer)"

    Scenario: Create attribute with unit for string type (unusual but allowed)
        When I create an attribute with name "Size", valueType "string", inputType "text", and unit "cm"
        Then the attribute should be created successfully
        And the attribute unit should be "cm"

    Scenario: Create enum attribute with single value
        When I create an attribute with name "Condition", valueType "enum", inputType "select", and unit ""
        And the attribute has the following values:
            | value | displayOrder |
            | New   | 1            |
        Then the attribute should be created successfully
        And the attribute should have 1 attribute value

    Scenario: Create enum attribute with many values
        When I create an attribute with name "Storage", valueType "enum", inputType "select", and unit "GB"
        And the attribute has 10 values
        Then the attribute should be created successfully
        And the attribute should have 10 attribute values

    # ============================================
    # Input Type Compatibility (Warnings)
    # ============================================

    Scenario: Create enum attribute with text input (unusual combination)
        When I create an attribute with name "Brand", valueType "enum", inputType "text", and unit ""
        And the attribute has the following values:
            | value   | displayOrder |
            | Apple   | 1            |
            | Samsung | 2            |
        Then the attribute should be created successfully
        But a warning should be logged "Enum value type with text input type is unusual"

    Scenario: Create number attribute with select input (unusual combination)
        When I create an attribute with name "Battery", valueType "number", inputType "select", and unit "mAh"
        Then the attribute should be created successfully
        But a warning should be logged "Number value type with select input type is unusual"