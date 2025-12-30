-- migrations/2024-12-10-001-add-product-types.sql

-- Product types
CREATE TABLE IF NOT EXISTS product_types (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Attributes
CREATE TABLE IF NOT EXISTS attributes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    value_type TEXT NOT NULL CHECK (value_type IN ('string', 'number', 'boolean', 'enum', 'multiselect')),
    input_type TEXT CHECK (input_type IN ('text', 'number', 'select', 'multiselect', 'checkbox', 'radio')),
    unit TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Controlled vocabulary for enum/multiselect attributes
CREATE TABLE IF NOT EXISTS attribute_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    attribute_id UUID NOT NULL REFERENCES attributes(id) ON DELETE CASCADE,
    value TEXT NOT NULL,
    display_order INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(attribute_id, value)
);

CREATE INDEX IF NOT EXISTS idx_attribute_values_attribute ON attribute_values(attribute_id);

-- Link product types to attributes
CREATE TABLE IF NOT EXISTS product_type_attributes (
    product_type_id UUID REFERENCES product_types(id) ON DELETE CASCADE,
    attribute_id UUID REFERENCES attributes(id) ON DELETE CASCADE,
    is_required BOOLEAN DEFAULT false,
    is_filterable BOOLEAN DEFAULT true,
    is_searchable BOOLEAN DEFAULT false,
    display_order INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (product_type_id, attribute_id)
);

CREATE INDEX IF NOT EXISTS idx_pta_product_type ON product_type_attributes(product_type_id);
CREATE INDEX IF NOT EXISTS idx_pta_attribute ON product_type_attributes(attribute_id);

-- Many-to-many: Products can appear in multiple categories
CREATE TABLE IF NOT EXISTS product_categories (
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    is_primary BOOLEAN DEFAULT false,
    display_order INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (product_id, category_id)
);

CREATE INDEX IF NOT EXISTS idx_pc_product ON product_categories(product_id);
CREATE INDEX IF NOT EXISTS idx_pc_category ON product_categories(category_id);

-- Store actual attribute values for each product
CREATE TABLE IF NOT EXISTS product_attribute_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    attribute_id UUID REFERENCES attributes(id) ON DELETE CASCADE,
    attribute_value_id UUID REFERENCES attribute_values(id) ON DELETE SET NULL,
-- For non-enum types, store value directly
    text_value TEXT,
    numeric_value NUMERIC(10, 2),
    boolean_value BOOLEAN,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

    CHECK (
    (attribute_value_id IS NOT NULL)::int +
    (text_value IS NOT NULL)::int +
    (numeric_value IS NOT NULL)::int +
    (boolean_value IS NOT NULL)::int
    = 1
    )
);

CREATE UNIQUE INDEX uniq_enum_values
ON product_attribute_values (product_id, attribute_id, attribute_value_id)
WHERE attribute_value_id IS NOT NULL;

CREATE UNIQUE INDEX uniq_non_enum_values
ON product_attribute_values (product_id, attribute_id)
WHERE attribute_value_id IS NULL;



CREATE INDEX IF NOT EXISTS idx_pav_product ON product_attribute_values(product_id);
CREATE INDEX IF NOT EXISTS idx_pav_attribute ON product_attribute_values(attribute_id);
CREATE INDEX IF NOT EXISTS idx_pav_value ON product_attribute_values(attribute_value_id);

-- Add product_type_id column (nullable for backward compatibility)
ALTER TABLE products
ADD COLUMN IF NOT EXISTS product_type_id UUID REFERENCES product_types(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_products_type ON products(product_type_id);