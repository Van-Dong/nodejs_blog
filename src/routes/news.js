// Định hướng cho tuyến đường /news
const express = require('express');
const router = express.Router(); // Ta cần config cho con router này
const newsController = require('../app/controllers/NewsController');

router.get('/:slug', newsController.show);
router.get('/', newsController.index); //Ở đây chỉ cần dùng / thôi vì ở đây tính là thư mục con của /news khi từ file index.js truyền vào

module.exports = router;
