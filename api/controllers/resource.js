const fs = require('fs');

exports.createNewResource = (req, res) => {
    fs.readFile('db.json', function (err, data) {

        if (err) { throw err; }

        var json = JSON.parse(data)
        const resourceName = req.body.ResourceName;
        json[resourceName] = req.body.ResourceData;

        fs.writeFile("db.json", JSON.stringify(json),
            function (err, result) {
                if (err) { throw err; }
            });
    });
    fs.readFile('routes.json', function (err, data) {

        if (err) { throw err; }

        var json = JSON.parse(data)
        const resourceName = req.body.ResourceName;
        const createResource = '/' + resourceName + '/create';
        const updateResource = '/' + resourceName + '/update/:id';
        const deleteResource = '/' + resourceName + '/delete/:id';

        json[createResource] = '/' + resourceName;
        json[updateResource] = '/' + resourceName + '/:id';
        json[deleteResource] = '/' + resourceName + '/:id';

        fs.writeFile("routes.json", JSON.stringify(json),
            function (err, result) {
                if (err) { throw err; }
            });
    });
    return res.jsonp(req.body);
};


exports.deleteResource = (req, res) => {
    const resourceId = req.params.id;

    fs.readFile('db.json', function (err, data) {
        var json = JSON.parse(data)
        delete json[resourceId];
        fs.writeFile("db.json", JSON.stringify(json),
            function (err, result) {
                if (err) console.log('error', err);
            })
    });
    fs.readFile('routes.json', function (err, data) {

        if (err) { throw err; }

        var json = JSON.parse(data)
        const resourceName = resourceId;
        const createResource = '/' + resourceName + '/create';
        const updateResource = '/' + resourceName + '/update/:id';
        const deleteResource = '/' + resourceName + '/delete/:id';

        delete json[createResource];
        delete json[updateResource];
        delete json[deleteResource];

        fs.writeFile("routes.json", JSON.stringify(json),
            function (err, result) {
                if (err) { throw err; }
            });
    });
    return res.jsonp({
        works: true
    })
};