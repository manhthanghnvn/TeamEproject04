var express =require("express");
var app = express();
var createError = require('http-errors');


const port = 8084;
app.listen(port,function (err){
    console.log("server is running....");
});
app.set("view engine","ejs");
app.use(express.static('public'));





// // catch 404 and forward to error handler
// app.use(express.static("public"));
// app.use(function (req,res,next){
//     next(createError(404));
// });
// // error handler
// app.use(function(err, req, res, next) {
//     // set locals, only providing error in development
//     res.locals.message = err.message;
//     res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//     // render the error page
//     res.status(err.status || 500);
//     res.render('error');
// });

    var mssql = require("mssql/msnodesqlv8");
    var config = {
        port: 1433,
        server: "118.70.125.210",
        user: "sa",
        password: "z@GH7ytQ",
        database: "Nhom4",
     }
    mssql.connect(config,function (err){
      if(err) console.log(err);
      else console.log("connected database....")
    });
var sql = new mssql.Request();
app.get("/", function (req,res){
    var tv=" select * from Products";
    sql.query(tv,function (err,rs){
        if(err) console.log(err)
        else {
            console.log(rs.recordset);
            res.render('home',{
                Products:rs.recordset
            })
        }
    })
});


app.get("/test", function (req,res) {
    var parama =req.query.nameProduct;
    var sql_txt = "select * from products where nameProduct like 'VFe34'";
    sql.query(sql_txt,function (err,rs){
        if(err) res.send("error...");
        else res.render("test",{
            products:rs.recordset[0]
        });;
        console.log(rs.recordset[0])

    })
});

