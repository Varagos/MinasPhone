Feature: Create a product

    Scenario: I can create a product
        Given product data
            | name      | description       | price | quantity | active | image_uri | sku  | category_id                          |
            | iPhone 13 | The latest iPhone | 1099  | 50       | true   | file-url  | A123 | 9d7205a5-794a-42de-8163-8b35dcb0d6f1 |
        When I send a request to create a product
        Then The product is created

# Scenario Outline: I try to create a product with invalid data
#     Given product data
#         | name   | description   | slug   | price   | quantity   | active   | image_uri  | sku   | category_id  |
#         | <Name> | <Description> | <Slug> | <Price> | <Quantity> | <Active> | <ImageUri> | <Sku> | <CategoryId> |
#     When I send a request to create a product
#     Then I receive an error "Bad Request" with status code 400

#     Examples:
#         | Name      | Description   | Slug      | Price | Quantity | Active | ImageUri | Sku  | CategoryId                           |
#         | iPhone 13 |               | iphone-13 | 1099  | 50       | true   | file-url | A123 | 9d7205a5-794a-42de-8163-8b35dcb0d6f1 |
#         | iPhone 13 | Latest iPhone |           | 1099  | 50       | true   | file-url | A123 | 9d7205a5-794a-42de-8163-8b35dcb0d6f1 |
#         |           | Latest iPhone | iphone-13 | 1099  | 50       | true   | file-url | A123 | 9d7205a5-794a-42de-8163-8b35dcb0d6f1 |
#         | iPhone 13 | Latest iPhone | iphone-13 |       | 50       | true   | file-url | A123 | 9d7205a5-794a-42de-8163-8b35dcb0d6f1 |
#         | iPhone 13 | Latest iPhone | iphone-13 | 1099  |          | true   | file-url | A123 | 9d7205a5-794a-42de-8163-8b35dcb0d6f1 |
