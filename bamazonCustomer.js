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
    console.log("connected as id " + connection.threadId);
    // Run the userOrder function after the connection is established
    userOrder();
});

// Create the table of products 
var table = new Table({
    head: ['Item Id', 'Product', 'Price'],
    colWidths: [15, 15, 15]
});
// Populate the table with data 
table.push(
    ['1', 'Monopoly', '20.50'], 
    ['2', 'Checkers', '10.25'], 
    ['3', 'Kill Everyone', '25.00'], 
    ['4', 'Slasher World', '35.00'], 
    ['5', 'Casablanca', '10.50'], 
    ['6', 'The Birds', '20.50'], 
    ['7', 'mens pants', '15.75'], 
    ['8', 'mens shirts', '9.75'], 
    ['9', 'Twinkies case', '40.00'], 
    ['10', 'Coke case', '50.00'],
);

function userOrder() {
    // Query the database for all products the user can purchase
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // console.log(results);
        // Display the table of products the user can purchase
        console.log(table.toString());
        // Prompt the user to select an item and an item amount
        inquirer
            .prompt([{
                    name: "purchase",
                    type: "input",
                    message: "What is the Id of the item you want to purchase?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like?"
                }
            ]).then(function(answer) {
                // Retrieve information about the purchased item
                var purchasedItem;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id == answer.purchase) {
                        purchasedItem = results[i];
                    }
                }
                // Determine if the purchase quantity is less than the stock quantity
                if (parseInt(answer.quantity) < parseInt(purchasedItem.stock_quantity)) {
                    // Decrease the stock quantity in the database by the purchase quantity, provide the user information about the purchase, and start over
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
                            console.log("\nItem you purchased: " + purchasedItem.product_name + "\nQuantity of this item you purchased: " + answer.quantity);
                            console.log("=============================================================");

                            userOrder();
                        }
                    );
                } else {
                    // If the order quantity is to high, start over
                    console.log("We have insufficient quantities to fullfill your order.");
                    console.log("=============================================================");
                    userOrder();
                }
            });
    });
}