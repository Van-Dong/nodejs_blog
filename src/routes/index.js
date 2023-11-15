// File này định hướng cho tất cả các tuyến đường
// Tức là nó gọi tuyến đường của các file khác như news, site --> không cần express, router làm gì
const newsRouter = require('./news');
const siteRouter = require('./site');
const coursesRouter = require('./courses');
const meRouter = require('./me');

function route(app) {
    // Ở hàm này, express kiểm tra sẽ biết được nó đang truyền vào một Router ở đối số thứ 2
    // khi đó nó sẽ hiểu là trong newsRouter sẽ có khá là nhiều cấu hình tuyến đường cho path '/news'
    // vì vậy thằng path '/news' sẽ chọc vào thằng newsRouter
    app.use('/me', meRouter);

    app.use('/courses', coursesRouter);

    app.use('/news', newsRouter);

    app.use('/', siteRouter);
}

module.exports = route;
