exports.books_getOne = function (req,res){
    Books.findById(req.params.id, function(err,book){
        if (err) return next(err);
        res.send(book);
    })
};

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
   
    var person = req.body.customerName;
    var sql = "SELECT c.customerName, SUM(itemPrice) as totalMoneySpent FROM Customer c INNER JOIN OrderHeader oh ON c.customerNo = oh.customerNo INNER JOIN (SELECT ob.orderNo, ob.qty*r.stdSellingPrice*ob.discountMultiple as itemPrice FROM OrderBody ob INNER JOIN recipe r ON ob.recipeNo = r.recipeNo) tbl  ON oh.orderNo = tbl.orderNo WHERE c.CustomerName = ";

    sql = sql + "'"+person+"'"; 
    console.log(sql);
    db.query(sql,function (err,result, fields){
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};


    //query for all categories
exports.getCategories = function(req,res){
    db.query("SELECT * FROM recipecategory",function (err,result,fields){
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
    var sql = "INSERT INTO recipe (recipeName,categoryNo,instructions,qtyPerRecipe,estPrepTime,estCookTime,qtyOnHand,stdSellingPrice) VALUES(\'"+rName+"\',"+catNo+ ",\'"+instrc + "\',"+qtyPer +","+estPrep+","+estCook+","+qtyHand+","+sp+")" ;
    console.log(sql)
    db.query(sql, function (err,result,fields) {
       if (err) throw err;
    console.log("1 record inserted");
    res.send("recipe inserted successfully")
  });
};

exports.fFour = function(req,res){
    console.log("funciton 4");
};
exports.fFive = function(req,res){
    console.log("function 5");
};
