# Bamazon Project

Bamazon is an interactive shopping application that allows the customer to view a table of items to purchase. The customer enters the Id of an item to purchase and the quantity of that item to purchase. The application contains customer input validation, which displays the appropropriate message if the customer presses a non-number key, such as a letter key, the space bar, the Enter key, or a special character key. After customer input, the application processes the customer purchase, and displays information about the purchase, including its total cost.

The stock quantity of the purchased item is reduced by the customer-purchase quantity. If this stock quantity is less than the customer-purchase quantity, the customer purchase is not completed, and the application displays a message about insufficent quantities available to fulfill the customer order.

After each purchase, the customer is prompted to purchase another item, but the customer can enter 'q' to exit the application at any time.

# Sample Screenshots

The following image shows the products table in the bamazon database befor customer input. Notice that the Monopoly Game item has a stock quantity of 100.

![Products_Before image](assets/images/productsBefore.png)

The following image shows the customer purchasing 3 Monopoly games and information about that purchase, including its total cost.

![Customer_Purchase_Under_Stock_Quantity image](assets/images/Under_Stock_Quantity.png)

The following image shows the product table in the bamazon database after customer input. Notice that the Monopoly Game item now has a stock quantity of 97 (100 games less the 3 games that the customer purchased).  

![Products_After image](assets/images/productsAfter.png)

The following image shows the customer attempting to purchase 200 Monopoly games and the message that is displayed about insufficient quantities available to fulfill the customer order.

![Customer_Purchase_Over_Stock_Quantity image](assets/images/Over_Stock_Quantity.png)

# Tools Used

- JavaScript
- node.js
- MySQL
- npm packages:
	- mysql
	- inquirer
	- cli-table   