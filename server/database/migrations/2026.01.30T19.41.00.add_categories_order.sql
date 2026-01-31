-- Add sort_order to categories table
ALTER TABLE categories
ADD COLUMN sort_order INT DEFAULT 0;
