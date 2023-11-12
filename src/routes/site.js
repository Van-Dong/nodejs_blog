// Định tuyến cho các trang chỉ có một mà không có nhiều đường dẫn con
const express = require('express');
const router = express.Router();
const siteController = require('../app/controllers/SiteController');

router.get('/search', siteController.search);
router.get('/', siteController.index);

module.exports = router;
