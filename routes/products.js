const router = require('express').Router()
const controller = require('../controllers/products')


router.get('/products', controller.list)
router.post('/products', controller.post)
router.patch('/products/:id', controller.patch)
router.put('/products/:id', controller.delete)
router.delete('/products/:id', controller.delete)

module.exports = router
