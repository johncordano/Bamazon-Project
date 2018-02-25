DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  	item_id INT NOT NULL AUTO_INCREMENT,
  	product_name VARCHAR(45) NULL,
  	department_name VARCHAR(45) NULL,
  	price DECIMAL(10,2) NULL,
  	stock_quantity INT NULL,
  	PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Monopoly", "Board Games", 20.50, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Checkers", "Board Games", 10.25, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Kill Everyone", "Video Games", 25.00, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Slasher World", "Video Games", 35.00, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Casablanca", "Films", 10.50, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("The Birds", "Films", 20.50, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mens pants", "Apparal", 15.75, 60);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("mens shirts", "Apparal", 9.75, 120);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Twinkies case", "Food & Drink", 40.00, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coke case", "Food & Drink", 50.00, 400);

