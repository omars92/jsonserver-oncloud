// server.js
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults();
const resourceRoutes = require("./api/routes/resource");
const routes = require('./routes.json');
// const middleware = require('./middleware');

server.use(middlewares)

// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// custom routes to add and delete resources
server.use("/resource", resourceRoutes);

server.use(jsonServer.rewriter(routes))
server.use(router);

const port =  process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`JSON Server is running on Port ${port}`)
})

// server.use('/', (req, res, next) => {
//     req.headers['token'] = "hello";
//     if (req.method === 'POST') {
//         // req.body.createdAt = Date.now()
//     }
//     // Continue to JSON Server router
//     next()
// })