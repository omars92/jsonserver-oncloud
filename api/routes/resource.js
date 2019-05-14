const jsonServer = require('json-server');
const router = jsonServer.create();
const resourceController = require('../controllers/resource');

router.post('/', resourceController.createNewResource);
router.delete('/:id', resourceController.deleteResource);

module.exports = router;