var express = require('express');
var router = express.Router();

/*get home page */
Router.get('/', function (req,res,next){
    res.render('home', {title: 'HomePage'});
});


module.exports = router;