const express = require('express')
const router = express.Router()

router.use('/api/tags', require('./controllers/tags/index'));
// router.use('/api/users', require('./controllers/users/index'));
router.use('/api/carts', require('./controllers/carts/index'));
router.use('/api/tokens', require('./controllers/tokens/index'));
router.use('/api/indexs', require('./controllers/indexs/index'));
router.use('/api/orders', require('./controllers/orders/index'));
router.use('/api/images', require('./controllers/images/index'));
router.use('/api/banners', require('./controllers/banners/index'));
router.use('/api/contents', require('./controllers/contents/index'));
router.use('/api/payments', require('./controllers/payments/index'));
router.use('/api/products', require('./controllers/products/index'));
router.use('/api/categories', require('./controllers/categories/index'));
router.use('/api/advertisements', require('./controllers/advertisements/index'));
router.use('/api/payments/location', require('./controllers/payments/location'));

router.use('/api/subject', require('./controllers/subjects/index'));
router.use('/api/projectstype', require('./controllers/projectstypes/index'));
router.use('/api/project', require('./controllers/projects/index'));
router.use('/api/user', require('./controllers/users/index'));

module.exports = router