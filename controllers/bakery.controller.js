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
          console.log(result);
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
        console.log(result);
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

    db.query(sql, function (err,result,field){
        if (err) throw err;
        console.log(result);
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

    var sql = 'SELECT * FROM recipe r WHERE recipeName = ?';
    var params = [req.body.recipeName + "%"];
    db.query(sql,params,function (err,result,field){
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
};