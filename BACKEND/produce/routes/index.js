var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sanpham',
  password: '111111',
  port: 5432,
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.get('/data', function(req, res, next) {
  // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // // Request methods you wish to allow
  // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // // Set to true if you need the website to include cookies in the requests sent
  // // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);


  pool.query('select * from produce', (err, response) => {
    if (!err) 
    {
      return res.send(response.rows);
    }
    else 
    {
      return console.log(err);
    }
    pool.end()
  })
});
router.get('/addData',function(req,res,next) {
  res.render('addData');
})
router.post('/addData',function(req,res,next) {
  var dulieu = {
    name:req.body.name,
    price:req.body.price
  }
  const name = req.body.name;
  const price = req.body.price;
  // res.send(dulieu);
  pool.query('INSERT INTO produce(name,price) VALUES ($1,$2)',[name,price],(err,respont) => {
    if (!err) 
    {
      return res.send("343");
    }
    else 
    {
      return res.send(err);
    }
    pool.end()
  })
})
module.exports = router;
