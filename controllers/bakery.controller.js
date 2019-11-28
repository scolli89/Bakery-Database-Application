/*exports.books_getOne = function (req,res){
    Books.findById(req.params.id, function(err,book){
        if (err) return next(err);
        res.send(book);
    })
};

/*exports.fOne = function(req,res){
    console.log("Function 1");

        db.query("SELECT * FROM customer", function (err, result, fields) {
          if (err) throw err;
          console.log(result);
          res.send(result);
        });



};*/

exports.fTwo = function(req,res){
    console.log("function 2");
};
exports.fThree = function(req,res){
    console.log("function 3");
};
exports.fFour = function(req,res){
    console.log("funciton 4");
};
exports.fFive = function(req,res){
    console.log("function 5");
};
