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
    console.log("Lets make a recipe");
    var sql = "INSERT INTO customer (customerName, address) VALUES ('Company Inc', 'Highway 37')";
    db.query(sql, function (err,result,fields) {
        if (err) throw err;
    console.log("1 record inserted");
  });
};
exports.fFour = function(req,res){
    console.log("funciton 4");
};
exports.fFive = function(req,res){
    console.log("function 5");
};
