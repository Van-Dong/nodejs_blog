// Định tuyến cho các trang chỉ có một mà không có nhiều đường dẫn con
const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.use('/search', siteController.search);
router.use('/', siteController.index);

module.exports = router;
