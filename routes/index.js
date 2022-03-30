const express = require('express');

const router = express.Router();

const homeController = require('../controllers/home_control');

console.log('router loaded');

router.get('/', homeController.home);
router.use('/likes', require('./likes'))
router.use('/users', require('./users'));
router.use('/posts', require('./post'));
router.use('/comments', require('./comments'));


router.use('/api', require('./api'));

// for any further routes, access from here 
// router.use('/routerName', require(../routerFile));


module.exports = router;