var express = require('express');

var resp = require('../Respo/Res');

var router = express.Router();

router.get('/', function (req, res) {
    res.render('table', {data:{}});
})

function node1(req, res, next) {
    var data = resp.loadAll();
    console.log('node1');
    data.then(function (rows) {
        result = {
            rows: rows,
            error: false
        }
        console.log(rows);
        res.render('table', {data: result});
        return next();
    }).catch(function (err) {
        var result = {
            error: "Could not get data"
        };
        console.log('error');
        res.render('table', {data: result});
        return next(err);
    });
}

function node2(req, res, next) {
    var data = resp.loadAll2();
    console.log('node2');
    data.then(function (row) {
        result = {
            rows: row,
            error: false
        }
        console.log(row);
        res.render('table', {data: result});
        return next();
    }).catch(function (err) {
        var result = {
            error: "Could not get data"
        };
        console.log('error');
        res.render('table', {data: result});
    });
}

router.get('/table', node1, node2);

// router.get('/table', function (req, res, next) {
//     var data = resp.loadAll();
//     console.log('node1');
//     data.then(function (rows) {
//         result = {
//             rows: rows,
//             error: false
//         }
//         console.log(rows);
//         res.render('table', {data: result});
//     }).catch(function (err) {
//         var result = {
//             error: "Could not get data"
//         }  
//         console.log('error');
//         res.render('table', {data: result});
//         next(err);
//     });
//     var data2 = resp.loadAll2();
//     console.log('node2');
//     data2.then(function (row) {
//         result2 = {
//             row: row,
//             error: false
//         }
//         console.log(row);
//         res.render('table', {data2: result2});
//     }).catch(function (err) {
//         var result2 = {
//             error: "Not data"
//         }
//         console.log('err');
//         res.render('table', {data2: result2});
//     })
// })

module.exports = router;