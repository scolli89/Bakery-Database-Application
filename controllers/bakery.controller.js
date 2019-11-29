exports.books_getOne = function (req,res){
    Books.findById(req.params.id, function(err,book){
        if (err) return next(err);
        res.send(book);
    })
};

//runctions needed to get the total spent by a customer
exports.getCustomers = function(req,res){
    console.log("Function 1");
        db.query("SELECT * FROM customer", function (err, result, fields) {
          if (err) throw err;
          //console.log(result);
          res.send(result);
        });

};

exports.getCustomerSpend = function(req,res){
    console.log(" Customer Spendt Function: ");
   
    var person = req.body.customerNo;
    var params = [req.body.customerNo];
    var sql = "SELECT c.customerName, SUM(itemPrice) as totalMoneySpent FROM Customer c INNER JOIN OrderHeader oh ON c.customerNo = oh.customerNo INNER JOIN (SELECT ob.orderNo, ob.qty*r.stdSellingPrice*ob.discountMultiple as itemPrice FROM OrderBody ob INNER JOIN recipe r ON ob.recipeNo = r.recipeNo) tbl  ON oh.orderNo = tbl.orderNo WHERE c.customerNo = ?";

     
    console.log(sql);
    db.query(sql,params,function (err,result, fields){
        if (err) throw err;
        //console.log(result);
        res.send(result);
    });
};

//functions needed for inserting a recipe
exports.getCategories = function(req,res){
    var sql = "SELECT * FROM recipecategory";
    db.query(sql,function (err,result,fields){
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
exports.insertRecipe = function(req,res){

    var rName = req.body.recipeName;
    var catNo = req.body.categoryNo;
    var instrc = req.body.instructions;
    var qtyPer = req.body.qtyPerRecipe;
    var estPrep = req.body.estPrepTime;
    var estCook = req.body.estCookTime;
    var qtyHand = req.body.qtyOnHand;
    var sp = req.body.stdSellingPrice;

    console.log("Lets make a recipe");
    var sql = "INSERT INTO recipe (recipeName,categoryNo,instructions,qtyPerRecipe,estPrepTime,estCookTime,qtyOnHand,stdSellingPrice) VALUES(?,?,?,?,?,?,?,?)";     
    var params = [rName, catNo, instrc, qtyPer, estPrep, estCook, qtyHand, sp];
    console.log(sql)
    db.query(sql, params, function (err,result,fields) {
       if (err) throw err;
    console.log("1 record inserted");

    res.send({words:"recipe inserted successfully"})
  });
};

// functions needed for getting the ten most popular
exports.mostPop = function(req,res){
    var sql = "SELECT * FROM most_popular_last_50_days LIMIT 10;"

    var s = "SELECT re.recipeName, sum(ob.qty) as qtyOrdered FROM OrderBody ob, Recipe re, OrderHeader oh WHERE ob.recipeNo=re.recipeNo AND ob.orderNo = oh.orderNo AND oh.dateCreated > ADDDATE(CURDATE(), INTERVAL -50 DAY) GROUP BY re.recipeNo ORDER BY sum(qty) DESC";


    db.query(s, function (err,result,field){
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};

exports.getAllRecipes = function (req,res){
    let sql = "SELECT recipeNo, recipeName FROM recipe";
    db.query(sql, function (err,result,field){
        if(err) throw err;
        //console.log(result);
        res.send(result);
    });
};
exports.getAllIngredients = function (req,res){
    let sql = "SELECT ingredientNo, ingredientName, qtyOnHand FROM ingredient";
    db.query(sql, function (err,result,field){
        if(err) throw err;
        //console.log(result);
        res.send(result);
    });
};
exports.getIforR = function (req,res){
    let params = [ req.body.recipeNo]
    let sql = "SELECT i.ingredientName, i.qtyOnHand, ri.amount FROM Ingredient i INNER JOIN RecipeIngredient ri ON i.ingredientNo = ri.ingredientNo INNER JOIN Recipe r ON ri.recipeNo = r.recipeNo WHERE r.recipeNo = ?";
    db.query(sql,params, function (err,result,field){
        if(err) throw err;
        //console.log(result);
        res.send(result);
    });

};




exports.makeRecipe = function (req,res){
    let params = [req.body.recipeNo];
    let sql = "SELECT i.ingredientName,  i.qtyOnHand, ri.amount FROM ingredient i INNER JOIN recipeIngredient ri ON i.ingredientNo = ri.ingredientNo INNER JOIN recipe r ON ri.recipeNo = r.recipeNo WHERE r.recipeNo = ? AND i.qtyOnHand < ri.amount";
    db.query(sql,params,function(err,result,field){
        if(err) throw err;
        if (result.length == 0){
            // subtract and return the grab ingredients
            
            let sql2 = "UPDATE Ingredient i INNER JOIN RecipeIngredient ri ON i.ingredientNo = ri.ingredientNo INNER JOIN Recipe r ON ri.recipeNo = r.recipeNo SET i.qtyOnHand = i.qtyOnHand - ri.amount WHERE r.recipeNo = (SELECT r.recipeNo FROM Recipe r WHERE r.recipeName = ?)";
            db.query(sql2,params,function (err,r,field){
                if (err) throw err;
                //res.send({word: "Success"});
            });

        } else{
            // cancel the requesy say it broke. 
            res.send({word: "Not enough ingredients"})
        }



        res.send(result);
    });

};



exports.fFour = function(req,res){
    console.log("funciton 4");
};
exports.fFive = function(req,res){
    console.log("function 5");
};

exports.recipeSearch = function(req,res){

    var sql = 'SELECT r.*, c.categoryName FROM recipe r INNER JOIN recipecategory c ON r.categoryNo = c.categoryNo WHERE recipeName LIKE ?';
    var params = [req.body.recipeName + "%"];
    db.query(sql,params,function (err,result,field){
        if(err) throw err;
        console.log("XXXXXXXXXX SEARCH COMPLETE: ");
        console.log(result);
        res.send(result);
    });
};