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

exports.getCategories = function(req,res){
    console.log("get all categories");
    //query for all categories 
    db.query("SELECT * FROM recipecategory",function (err,result,fields){
        if (err) throw err;
        console.log(result);
        res.send(result);
    });
};
exports.insertRecipe = function(req,res){

    // var rName = req.body.recipeName;
    // var catNo = req.body.categoryNo;
    // var instrc = req.body.instructions;
    // var qtyPer = req.body.qtyPerRecipe;
    // var estPrep = req.body.estPrepTime;
    // var estCook = req.body.estCookTime;
    // var qtyHand = req.body.qtyOnHand;
    // var sp = req.body.stdSellingPrice;

    var rName = "t";
    var catNo = 4;
    var instrc = "ccccc";
    var qtyPer = 3;
    var estPrep = 3;
    var estCook = 3;
    var qtyHand = 0;
    var sp = 13.56;

    console.log("Lets make a recipe");
    var sql = "INSERT INTO recipe (recipeName,categoryNo,instructions,qtyPerRecipe,estPrepTime,estCookTime,qtyOnHand,stdSellingPrice)" +
        "VALUES(\'"+rName+"\',\'"+catNo+ ",\'"+instrc + "\',"+qtyPer +","+estPrep+","+estCook+","+qtyHand+","+sp+")" ;
    console.log(sql)
    //db.query(sql, function (err,result,fields) {
     //   if (err) throw err;
    //console.log("1 record inserted");
    res.send("recipe inserted successfully")
  }//);
//};
exports.fFour = function(req,res){
    console.log("funciton 4");
};
exports.fFive = function(req,res){
    console.log("function 5");
};