const Course = require('../models/Course');
const { mongooseToObject, multipleMongooseToObject } = require('../../util/mongoose');

class CourseController {

    // GET /courses/
    async index(req, res, next) {
        Course.find({})
            .then((courses) => {
                res.render('home', {
                    courses: multipleMongooseToObject(courses),
                });
            })
            .catch(next);
    }

    // [GEt] /courses/:slug
    show(req, res, next) {
        Course.findOne({ slug: req.params.slug })
            .then((course) => {
                res.render('courses/show', {
                    course: mongooseToObject(course),
                });
            })
            .catch(next);
    }

    // GET /courses/create
    create(req, res) {
        res.render('courses/create');
    }

    // POST /courses/store
    store(req, res) {
        const course = new Course(req.body);
        course
            .save()
            .then((result) => {
                res.redirect('/');
            })
            .catch((error) => {
                console.log('Error: \n' + error);
            });
    }

    // GET /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => {
                res.render('courses/edit', {
                    course: mongooseToObject(course)
                })
            })
            .catch(next)
    }

    // PUT /courses/:id
    update(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => {
                res.redirect('/me/stored/courses')
            })
            .catch(next)
    }

    // DELETE /courses/:id
    delete(req, res, next) {
        Course.delete({_id: req.params.id})
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    // PATCH /courses/:id/restore
    restore(req, res, next) {
        Course.restore({_id: req.params.id})
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    // DELETE /courses/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({_id: req.params.id})
            .then(() => {
                res.redirect('back')
            })
            .catch(next)
    }

    handleFormAction(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                    Course.delete({ _id: { $in: req.body.courseIds}})
                        .then(() => res.redirect('back'))
                        .catch(next)

            break;
            default:
                res.json({message: 'Action is invalid!'})
        }
    }
}

module.exports = new CourseController();
