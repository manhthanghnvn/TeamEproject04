var express =require("express");
var app = express();

const port = 8084;
app.listen(port,function (err){
    console.log("server is running....");
})
app.use(express.static("public"));
app.set("view engine","ejs");
app.get("/", function (req,res){
    res.render("home");
})
app.get("/Products_Detail", function (req,res) {
    res.render("Products_Detail");
})
app.get("/test", function (req,res) {
    res.render("test");
})
app.get("/showCategory", function (req,res){
    res.render("showCategory");
})
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

app.get("/products", function (req, res) {
    var sql_txt = "select * from products;";
    sql.query(sql_txt, function (err, rs) {
        if (err) res.send("Errors...");
        else res.send(rs.recordset);
    })
});