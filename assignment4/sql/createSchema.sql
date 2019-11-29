CREATE TABLE Customer(
	customerNo INT NOT NULL AUTO_INCREMENT,
    customerName VARCHAR(30),
    address VARCHAR(50),
    PRIMARY KEY(customerNo)
);
CREATE TABLE OrderHeader(
	orderNo INT NOT NULL AUTO_INCREMENT,
    customerNo INT NOT NULL,
    dateCreated DATETIME,
    dateRequested DATETIME,
    dateFulfilled DATETIME,
    PRIMARY KEY(orderNo),
    FOREIGN KEY(customerNo) REFERENCES Customer(customerNo)
);
CREATE TABLE Ingredient(
	ingredientNO INT NOT NULL AUTO_INCREMENT,
    ingredientName VARCHAR(30),
    qtyOnHand SMALLINT,
    PRIMARY KEY(ingredientNo)
);
CREATE TABLE RecipeCategory(
	categoryNo INT NOT NULL AUTO_INCREMENT,
    categoryName VARCHAR(30),
    PRIMARY KEY (categoryNo)
);
CREATE TABLE Recipe(
	recipeNO INT NOT NULL AUTO_INCREMENT,
    recipeName VARCHAR(30),
    categoryNo INT NOT NULL,
    instructions VARCHAR(250),
    qtyPerRecipe SMALLINT,
    estPrepTime SMALLINT,
    estCookTime SMALLINT,
    qtyOnHand SMALLINT,
    stdSellingPrice DECIMAL(5,2),
	PRIMARY KEY(recipeNo),
    FOREIGN KEY(categoryNo) REFERENCES RecipeCategory(categoryNo)
);
CREATE TABLE RecipeIngredient(
	recipeNo INT NOT NULL,
    ingredientNo INT NOT NULL,
    amount SMALLINT,
    PRIMARY KEY (recipeNo,ingredientNo),
    FOREIGN KEY (recipeNo) REFERENCES Recipe(recipeNo),
    FOREIGN KEY (ingredientNo) REFERENCES Ingredient(ingredientNo)
);
CREATE TABLE OrderBody(
	orderNo INT NOT NULL,
    recipeNo INT NOT NULL,
    qty SMALLINT,
    dateStarted DATETIME,
    dateFinished DATETIME,
    discountMultiple DECIMAL(2,2),
    PRIMARY KEY (orderNo, recipeNo),
    FOREIGN KEY (orderNo) REFERENCES OrderHeader(orderNo),
    FOREIGN KEY (recipeNo) REFERENCES Recipe(recipeNo)
);
CREATE TABLE TransactionHistory(
	recipeNo INT NOT NULL,
    transactionDate DATETIME,
    qtyOfItem SMALLint,
    PRIMARY KEY (recipeNo, transactionDate),
    FOREIGN KEY	(recipeNo) REFERENCES Recipe(recipeNo)
);  

#Create View of the Most Popular Products and average order quantity
CREATE VIEW most_popular_last_50_days AS
SELECT re.recipeName, sum(ob.qty) as qtyOrdered
FROM OrderBody ob, Recipe re, OrderHeader oh
WHERE ob.recipeNo=re.recipeNo
AND ob.orderNo = oh.orderNo
AND oh.dateCreated > ADDDATE(CURDATE(), INTERVAL -50 DAY)
GROUP BY re.recipeNo
ORDER BY sum(qty) DESC;

#View the 10 most recent orders, who ordered them, each item ordered, and the quantity of each item ordered
CREATE VIEW recent_orders AS
SELECT oh.dateCreated, c.customerName, oh.orderNo, r.recipeName, ob.qty
FROM Customer c
INNER JOIN (
    SELECT customerNo, orderNo, dateCreated
    FROM OrderHeader
    ORDER BY dateCreated DESC
    LIMIT 10
) oh
    ON c.customerNo = oh.customerNo
INNER JOIN OrderBody ob
    ON oh.orderNo = ob.orderNo
INNER JOIN Recipe r
    ON ob.recipeNo = r.recipeNo;

# List of all of the Customers and how many orders that they have
CREATE VIEW orders_per_customer AS
SELECT c.customerNo, c.customerName, count(oh.orderNo) as numOrders
FROM Customer c
INNER JOIN OrderHeader oh
    ON c.customerNo = oh.customerNo
GROUP BY c.customerNo
ORDER BY count(oh.orderNo) DESC;




