const Course = require('../models/Course')
const { multipleMongooseToObject } = require('../../util/mongoose');

class MeController {
    // GET me/stored/courses
    storedCourses(req, res, next) {
        let courseQuery = Course.find({});  // This is a function

        if (req.query.hasOwnProperty('_sort')) {
            courseQuery = courseQuery.sort({
                [req.query.column]: req.query.type,
            })
        }

        Promise.all([courseQuery, Course.countDocumentsDeleted()])
            .then(([courses, countDeleted]) => {
                res.render('me/stored-Courses', {
                    countDeleted: countDeleted,
                    courses: multipleMongooseToObject(courses)
                })
            })
            .catch(next)
    }

    // GET me/trash/courses
    // findDeleted error
    trashCourses(req, res, next) {
        Course.findDeleted()
            .then(courses => {
                res.render('me/trash-Courses', {
                    courses: multipleMongooseToObject(courses)
                })
            })
            .catch(next)
    }
}

module.exports = new MeController;