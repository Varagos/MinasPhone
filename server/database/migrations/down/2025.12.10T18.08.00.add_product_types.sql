-- ============================================
-- MIGRATION DOWN for 2024-12-10-001-add-product-types.sql
-- ============================================

-- 1. Remove index + column added to products
DROP INDEX IF EXISTS idx_products_type;
ALTER TABLE products DROP COLUMN IF EXISTS product_type_id;

-- 2. Drop product_attribute_values (depends on products, attributes, attribute_values)
DROP INDEX IF EXISTS idx_pav_value;
DROP INDEX IF EXISTS idx_pav_attribute;
DROP INDEX IF EXISTS idx_pav_product;

DROP TABLE IF EXISTS product_attribute_values;

-- 3. Drop product_categories (depends on products and categories)
DROP INDEX IF EXISTS idx_pc_category;
DROP INDEX IF EXISTS idx_pc_product;

DROP TABLE IF EXISTS product_categories;

-- 4. Drop product_type_attributes (depends on product_types + attributes)
DROP INDEX IF EXISTS idx_pta_attribute;
DROP INDEX IF EXISTS idx_pta_product_type;

DROP TABLE IF EXISTS product_type_attributes;

-- 5. Drop attribute_values (depends on attributes)
DROP INDEX IF EXISTS idx_attribute_values_attribute;

DROP TABLE IF EXISTS attribute_values;

-- 6. Drop attributes
DROP TABLE IF EXISTS attributes;

-- 7. Drop product_types
DROP TABLE IF EXISTS product_types;

