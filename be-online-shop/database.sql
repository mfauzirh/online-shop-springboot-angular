-- Create database for online shop
CREATE DATABASE onlineshop;

-- Create the `customers` table
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_address TEXT,
    customer_code VARCHAR(36) UNIQUE NOT NULL,
    customer_phone VARCHAR(20),
    is_active BOOLEAN DEFAULT TRUE,
    last_order_date DATETIME,
    pic VARCHAR(255)
);

-- Create the `items` table
CREATE TABLE items (
    items_id INT AUTO_INCREMENT PRIMARY KEY,
    items_name VARCHAR(255) NOT NULL,
    items_code VARCHAR(36) UNIQUE NOT NULL,
    stock INT DEFAULT 0,
    price DECIMAL(15, 2) NOT NULL,
    is_available BOOLEAN DEFAULT TRUE,
    last_re_stock DATETIME,
);

-- Create the `orders` table
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_code VARCHAR(36) UNIQUE NOT NULL,
    order_date DATETIME NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    customer_id INT,
    items_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE SET NULL,
    FOREIGN KEY (items_id) REFERENCES items(items_id) ON DELETE SET NULL
);

-- Add indices for faster lookups
CREATE INDEX idx_customer_id ON orders(customer_id);
CREATE INDEX idx_items_id ON orders(items_id);

