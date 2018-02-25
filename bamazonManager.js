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
    // console.log("connected as id " + connection.threadId);
    // Run the managerMenu function after the connection is established.
    managerMenu();
});



function managerMenu() {
  inquirer
    .prompt({
      name: "managerChoice",
      type: "list",
      message: "Select the task that you want to complete:",
      choices: ["View the products for sale", "View low inventory", "Add to inventory", "Add a new product to inventory"]
    })
    .then(function(answer) {
      // based on their answer, either call the bid or the post functions
      if (answer.managerChoice === "View the products for sale") {
        viewProducts();
      }
      else if (answer.managerChoice === "View low inventory") {
        viewLowInventory();
      }
      else if (answer.managerChoice === "Add to inventory") {
        addToInventory();
      }
      else if (answer.managerChoice === "Add a new product to inventory") {
        addProductToInventory();
      }
    });
}

function viewProducts () {
    connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // console.log(results);
    // Create the heading for the table of products. 
    var table = new Table({
    head: ['Item Id', 'Product', 'Department', 'Price', 'Stock Quantity'],
    colWidths: [20, 20, 20, 20, 20],
    });
    // Loop through the results of the product table selection, and populate the new table with data.
    for (var i = 0; i < results.length; i++) {
        table.push([results[i].item_id, results[i].product_name, results[i].department_name, parseFloat(results[i].price).toFixed(2), results[i].stock_quantity]);
    }
    // Display the table of products, and return to the manager menu.
    console.log(table.toString());
    managerMenu(); 
    });
    // managerMenu();
}

function viewLowInventory () {
    console.log("view low inventory");
}

function addToInventory () {
    console.log("add to inventory");
}

function addProductToInventory () {
    console.log("add product to inventory");
}
