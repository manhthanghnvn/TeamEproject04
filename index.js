const  express=require('express');
const index=express();
const port= process.env.PORT || 8084;

index.listen(port,function (err){
    console.log('Serve is running. localhost:8084');
});

index.use(express.static('public'));
index.set('view engine','ejs');
index.set('views','./views');

// app.use('/users', userRoute);
var mysql=require('mysql');
var db_config = {
    host:'remotemysql.com',
    user:'O2hyBoqSJS',
    password:'XSkeoP7BD7',
    database:'O2hyBoqSJS',
    port:3306,
    stream:false,
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
    }
};
var conn;

function handleDisconnect() {
    conn = mysql.createConnection(db_config);


    conn.connect(function(err) {
        if(err) {
            console.log('error when connecting to db:', err);
            setTimeout(handleDisconnect, 2000);
        }// to avoid a hot loop, and to allow our node script to
        else console.log('Connected to database')// to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    conn.on('error', function(err) {
        console.log('db error', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
            handleDisconnect();                         // lost due to either server restart, or a
        } else {                                      // connnection idle timeout (the wait_timeout
            throw err;                                  // server variable configures this)
        }
    });
}

handleDisconnect();




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



index.get("/", function (req, res){
    var tv=" select * from Products";
    conn.query(tv,function (err,rs){
        if(err) console.log(err)
        else {
            res.render('home',{
                Products:rs
            })
        }
    })
});
index.get("/Vehicles", function (req, res){
    var tv="SELECT * FROM `Products`";
    conn.query(tv,function (err,rs){
        if(err) console.log(err)
        else {
           console.log(rs);
           res.render('Vehicles',{
               Products:rs
           })
        }
    })
});

index.get("/Services", function (req, res){
    var tv=" select * from Products";
    conn.query(tv,function (err,rs){
        if(err) console.log(err)
        else {
            res.render('Services',{
                Products:rs
            })
        }
    })
});
index.get("/featured", function (req, res){
    var tv="SELECT * FROM `Products`";
    conn.query(tv,function (err,rs){
        if(err) console.log(err)
        else {
            res.render('featured',{
                Products:rs
            })
        }
    })
});

index.get("/detail-product", function (req, res){
    var tv=" select * from Products";
    conn.query(tv,function (err,rs){
        if(err) console.log(err)
        else {
            res.render('detail-product',{
                Products:rs
            })
        }
    })
});


index.get("/Contact", function (req, res){

            res.render('Contact')


});

index.get("/Reviews", function (req, res){
    res.render('Reviews');
});
index.get("/searchResult",function (req, res){
    var param=req.query.nameProduct;
    console.log(param);
    let tv="select * from  Products where nameProduct like '%"+param+"%'";
    conn.query(tv,function (err,rs){
        if (err) console.log(err)
        else {
            res.render('detail-product',{
                Products:rs
            })
        }
    })
})
index.get("/247Support", function (req, res){
    res.render('247Support')
});
index.get("/BatteryReplacement", function (req, res){
    res.render('BatteryReplacement')
});
index.get("/Carinsurance", function (req, res){
    res.render('Carinsurance')
});
index.get("/oilchange", function (req, res){
    res.render('oilchange')
});
index.get("/PartsRepair", function (req, res){
    res.render('PartsRepair')
});

index.get("/deposit", function (req, res){
    res.render('deposit')
});
index.get("/product-detail/:ID", function (req, res){
    var ID=req.params.ID;
    console.log(ID)
    var tv=" select * from Products where ID="+ID+"";
    conn.query(tv,function (err,rs){
        if(err) console.log(err)
        else {
            res.render('product-detail',{
                Products:rs[0]
            })
        }
    })
});



