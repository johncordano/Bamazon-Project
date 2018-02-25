var Table = require('cli-table');
var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "0673Cord",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    // Run the managerMenu function after the connection is established.
    managerMenu();
});

// Create the managerMenu function.
function managerMenu() {
    // Prompt the manager to select a task from a menu.
    inquirer
        .prompt({
            name: "managerChoice",
            type: "list",
            message: "Select a task to complete:",
            choices: ["View the products for sale.", "View the products with less than 50 items in stock.", "Add to existing inventory.", "Add a new product to existing inventory.", "Exit the application."]
        })
        // Use the manager answer to call the appropriate function.
        .then(function(answer) {
            if (answer.managerChoice === "View the products for sale.") {
                viewProducts();
            } else if (answer.managerChoice === "View the products with less than 50 items in stock.") {
                viewLowInventory();
            } else if (answer.managerChoice === "Add to existing inventory.") {
                addToInventory();
            } else if (answer.managerChoice === "Add a new product to existing inventory.") {
                addProductToInventory();
            } else if (answer.managerChoice === "Exit the application.") {
                console.log("\n  Exiting...");
                process.exit();
            }
        });
}

// Create the viewProducts function.
function viewProducts() {
    // Query the database for all products.
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // Create the headings for the table of products. 
        var table = new Table({
            head: ['Item Id', 'Product', 'Department', 'Price', 'Stock Quantity'],
            colWidths: [10, 20, 15, 10, 18],
        });
        // Loop through the results of the product table query, and populate the new table with all data.
        for (var i = 0; i < results.length; i++) {
            table.push([results[i].item_id, results[i].product_name, results[i].department_name, parseFloat(results[i].price).toFixed(2), results[i].stock_quantity]);
        }
        // Display the table of products, and return to the manager menu.
        console.log("\n" + table.toString());
        managerMenu();
    });
}

// Create the viewLowInventory function.
function viewLowInventory() {
    // Query the database for all products.
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // Create the headings for the table of products. 
        var table = new Table({
            head: ['Item Id', 'Product', 'Department', 'Price', 'Stock Quantity'],
            colWidths: [10, 20, 15, 10, 18],
        });
        // Loop through the results of the product table query, and populate the new table with data for products that have a stock quantity less than 50.
        for (var i = 0; i < results.length; i++) {
            if (results[i].stock_quantity < 50) {
                table.push([results[i].item_id, results[i].product_name, results[i].department_name, parseFloat(results[i].price).toFixed(2), results[i].stock_quantity]);
            }
        }
        // Display the table of products, and return to the manager menu.
        console.log("\n" + table.toString());
        managerMenu();
    });
}

// Create the addToInventory function.
function addToInventory() {
    // Query the database for all products.
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // Prompt the manager to select an item and enter an item quantity.
        inquirer
            .prompt([{
                    name: "replenish",
                    type: "input",
                    message: "What is the Id of the item for which you want to replenish inventory?",
                    validate: function(value) {
                        // Display the appropropriate message if the manager presses a non-number key, such as a letter key, the space bar, the Enter key, or a special character key. 
                        if (isNaN(parseInt(value)) === true) {
                            console.log("\n  You must enter a number.");
                            return false;
                        }
                        return true;
                    }
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many items would you like to add to inventory?",
                    validate: function(value) {
                        // Display the appropropriate message if the manager presses a non-number key, such as a letter key, the space bar, the Enter key, or a special character key.
                        if (isNaN(parseInt(value)) === true) {
                            console.log("\n  You must enter a number.");
                            return false;
                        }
                        return true;
                    }
                }
            ]).then(function(answer) {
                // Retrieve information about the item to replenish.
                var replenishedItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id == answer.replenish) {
                        replenishedItem = results[i];
                    }
                }
                // Increase the stock quantity in the products table of the database by the replenish quantity, provide the manager a message about the replenishment, and return to the manager menu.
                connection.query(
                    "UPDATE products SET ? WHERE ?", [{
                            stock_quantity: (parseInt(replenishedItem.stock_quantity) + parseInt(answer.quantity))
                        },
                        {
                            item_id: replenishedItem.item_id
                        }
                    ],
                    function(error) {
                        if (error) throw err;
                        console.log("\n  View the products for sale to see the replenished inventory.");
                        console.log("======================================================================");
                        managerMenu();
                    }
                );
            });
    });
}

// Create the addProductToInventory function.
function addProductToInventory() {
    // Prompt the manager for information about the product to add to inventory.
    inquirer
        .prompt([{
                name: "product_name",
                type: "input",
                message: "What is the product that you want to add to inventory?"
            },
            {
                name: "department_name",
                type: "list",
                message: "Select a department.",
                choices: ["Board Games", "Video Games", "Film", "Apparal", "Food & Drink"]
            },
            {
                name: "price",
                type: "input",
                message: "What is the price of this product?",
                validate: function(value) {
                    // Display the appropropriate message if the manager presses a non-number key, such as a letter key, the space bar, the Enter key, or a special character key. 
                    if (isNaN(parseInt(value)) === true) {
                        console.log("\n  You must enter a number.");
                        return false;
                    }
                    return true;
                }
            },
            {
                name: "stock_quantity",
                type: "input",
                message: "How many units of this product do you want to add to inventory?",
                validate: function(value) {
                    // Display the appropropriate message if the manager presses a non-number key, such as a letter key, the space bar, the Enter key, or a special character key. 
                    if (isNaN(parseInt(value)) === true) {
                        console.log("\n  You must enter a number.");
                        return false;
                    }
                    return true;
                }
            }
        ])
        .then(function(answer) {
            // Add the new product to the products table in the database, provide the manager a message about the new product, and return to the manager menu.
            connection.query(
                "INSERT INTO products SET ?", {
                    product_name: answer.product_name,
                    department_name: answer.department_name,
                    price: answer.price,
                    stock_quantity: answer.stock_quantity
                },
                function(err) {
                    if (err) throw err;
                    console.log("\n  View the products for sale to see the new product.");
                        console.log("========================================================");
                    managerMenu();
                }
            );
        });
}