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
    // Run the userOrder function after the connection is established.
    userOrder();
});

// Create the userOrder function.
function userOrder() {
    // Query the database for all products the customer can purchase.
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // Create the heading for the table of products. 
        var table = new Table ({
            head: ['Item Id', 'Product', 'Price'],
            colWidths: [15, 15, 15]
        });
        // Loop through the results of the product table query, and populate the new table with data.
        for (var i = 0; i < results.length; i++) {
        table.push([results[i].item_id, results[i].product_name, parseFloat(results[i].price).toFixed(2)]);
        }
        // Display the table of products that the customer can purchase.
        console.log(table.toString());
        // Prompt the customer to select an item and enter an item quantity.
        inquirer
            .prompt([{
                    name: "purchase",
                    type: "input",
                    message: "What is the Id of the item you want to purchase? (Enter 'q' to exit)",
                    validate: function(value) {
                        // Exit the application when the customer presses the 'q' key.
                        if ((value) === "q") {
                            console.log("\n  Exiting...");
                            process.exit();
                        }
                        // Display the appropropriate message if the customer presses a non-number key, such as a letter key, the space bar, the Enter key, or a special character key. 
                        else if (isNaN(parseInt(value)) === true) {
                            console.log("\n  You must enter a number.");
                            return false;
                        }
                        return true;    
                    }
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like? (Enter 'q' to exit)",
                    validate: function(value) {
                        // Exit the application when the customer presses the 'q' key.
                        if ((value) === "q") {
                            console.log("\n  Exiting...");
                            process.exit();
                        }
                        // Display the appropropriate message if the customer presses a non-number key, such as a letter key, the space bar, the Enter key, or a special character key.
                        else if (isNaN(parseInt(value)) === true) {
                            console.log("\n  You must enter a number.");
                            return false;
                        }
                        return true;
                    }
                }
            ]).then(function(answer) {
                // Retrieve information about the item to purchase.
                var purchasedItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id == answer.purchase) {
                        purchasedItem = results[i];
                    }
                }
                // Determine if the purchase quantity is less than the stock quantity.
                if (parseInt(answer.quantity) < parseInt(purchasedItem.stock_quantity)) {
                    // Decrease the stock quantity in the table of products of the database by the purchase quantity, provide the customer information about the purchase, and start over.
                    connection.query(
                        "UPDATE products SET ? WHERE ?", [{
                                stock_quantity: (purchasedItem.stock_quantity - answer.quantity)
                            },
                            {
                                item_id: purchasedItem.item_id
                            }
                        ],
                        function(error) {
                            if (error) throw err;
                            console.log("\n  Item you purchased: " + purchasedItem.product_name + "\n  Quantity of this item you purchased: " + answer.quantity + "\n  Your total cost: " + "$" + parseFloat(purchasedItem.price * answer.quantity).toFixed(2));
                            console.log("=============================================================");

                            userOrder();
                        }
                    );
                } else {
                    // If the purchase quantity is to high, display an appropriate message, and start over.
                    console.log("\n  We have insufficient quantities to fullfill your order.");
                    console.log("=============================================================");
                    userOrder();
                }
            });
    });
}
