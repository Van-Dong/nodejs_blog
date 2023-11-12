//Cái này dùng để import thư viện express bằng cách đi vào node_modules để tải express rồi nạp vào biến dưới dạng function
// Chú ý: biến express là một function
const express = require('express');
const path = require('path'); // thư viện mặc định của express
const fs = require('fs'); // thư viện mặc định của express
const morgan = require('morgan'); // thư viện giúp quan sát log http request từ client gửi đến
const { engine } = require('express-handlebars'); // view engine

const route = require('./routes'); // default is index.js --> <=> ./routes/index.js
const db = require('./config/db');

const app = express(); // trả lại một instance đại diện cho ứng dụng nodejs
const port = 3000;

//Set middleware for form data with method POST
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

// Set up folder of static file
app.use(express.static(path.join(__dirname, 'public')));

// app.use(morgan('combined'))
// create a write stream (in append mode) to file access.log and setup the logger
var accessLogStream = fs.createWriteStream(
    path.join(__dirname, '..', 'log', 'access.log'),
    { flags: 'a' },
);
app.use(morgan('combined', { stream: accessLogStream }));

//connect db
db.connect();

// setup view engine
app.engine('hbs', engine({ extname: '.hbs' })); // extname default là .handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Define route
// Tham số thứ hai là một hàm callback (ở đây là arrow function, có thể dùng function bình thường cũng được)
// route init
route(app);

// Create port listener
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
