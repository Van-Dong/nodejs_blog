const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class NewsController {
    // [GET] /news
    index(req, res, next) {
        res.render('news');
    }

    // [GET] /news/:slug
    show(req, res) {
        res.send('NEWS DETAIL!!!');
    }
}

module.exports = new NewsController();
