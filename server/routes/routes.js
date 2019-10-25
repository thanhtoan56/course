const express = require('express')
const router = express.Router()

router.use('/api/tokens', require('./controllers/tokens/index'));
router.use('/api/indexs', require('./controllers/indexs/index'));

router.use('/api/subject', require('./controllers/subjects/index'));
router.use('/api/projectstype', require('./controllers/projectstypes/index'));
router.use('/api/project', require('./controllers/projects/index'));
router.use('/api/registration', require('./controllers/registrations/index'));
router.use('/api/user', require('./controllers/users/index'));

module.exports = router