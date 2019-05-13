// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const fs = require('fs')
var chokidar = require('chokidar')
server.use(middlewares)

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
    res.jsonp(req.query)
})
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)
server.use((req, res, next) => {
    if (req.method === 'POST') {
        req.body.createdAt = Date.now()
    }
    // Continue to JSON Server router
    next()
})

// custom routes to add and delete resources
server.post('/resource', (req, res) => {
    fs.readFile('db.json', function (err, data) {
        var json = JSON.parse(data)
        const resourceName = req.body.ResourceName;
        json[resourceName] = req.body.ResourceData;
        // json.push(datalol);
        console.log("pass omar")
        console.log("json: ", json);
        fs.writeFile("db.json", JSON.stringify(json),
            function (err, result) {
                if (err) console.log('error', err);
            })
    })
    return res.jsonp(req.body)
})

server.delete('/resource/:id', (req, res) => {
    const resourceId = req.params.id;

    fs.readFile('db.json', function (err, data) {
        var json = JSON.parse(data)
        delete json[resourceId];
        console.log("json:", json);
        fs.writeFile("db.json", JSON.stringify(json),
            function (err, result) {
                if (err) console.log('error', err);
            })
    })
    return res.jsonp({
        works: true
    })
})

// var watcher = chokidar.watch('./db.json')
// watcher.on('ready', function () {
//     watcher.on('all', function () {
//         console.log("Clearing /dist/ module cache from server")
//         delete require.cache["D:\\jsonserver\\jsonserver2\\node_modules\\mime-db\\db.json"];
//         // Object.keys(require.cache).forEach(function (id) {
//         //     // if (/[\/\\]db[\/\\]/.test(id)) {

//         //         if(require.cache[id]) {
//         //             console.log("i am in la: ", id);
//         //             delete require.cache[id] 
//         //         }

//         //     // }
//         // })
//     })
// })

// fs.watchFile('db.json', (curr, prev) => {
//     console.log(`the current omar is: ${curr}`);
//     console.log(`the previous omar was: ${prev}`);
//   });

server.use(router)
server.listen(3000, () => {
    console.log('JSON Server is running on Port 3000')
})