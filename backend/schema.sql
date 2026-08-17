-- schema.sql
-- Run this once in MySQL to set up the database and table.
-- Command: mysql -u root -p < schema.sql

CREATE DATABASE IF NOT EXISTS canteen_db;

USE canteen_db;

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    item_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    order_date DATETIME DEFAULT CURRENT_TIMESTAMP
);
