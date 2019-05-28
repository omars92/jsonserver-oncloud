const fs = require('fs');
const responseTemplateDto = require('../dto/responsetemplatedto');

exports.createNewResource = (req, res) => {
    try {
        fs.readFile('db.json', function (err, data) {

            if (err) {
                console.log("err: ", err);
                throw new Error();
                //  res.status(500).json({
                //     error: err
                // });
            }

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
        return res.status(201).jsonp(responseTemplateDto(req.body));
    } catch (err) {
        throw err;
    }
};


exports.deleteResource = (req, res) => {
    try {
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
        return res.status(200).jsonp(responseTemplateDto());
    } catch (err) {
        throw err;
    }
};