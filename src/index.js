//Cái này dùng để import thư viện express bằng cách đi vào node_modules để tải express rồi nạp vào biến dưới dạng function
// Chú ý: biến express là một function
const express = require('express')
const path = require('path')  // thư viện mặc định của express
const fs = require('fs')   // thư viện mặc định của express
const morgan = require('morgan')  // thư viện giúp quan sát log http request từ client gửi đến
const { engine } = require('express-handlebars');  // view engine


const app = express()  // trả lại một instance đại diện cho ứng dụng nodejs
const port = 3000

// Set up folder of static file
app.use(express.static(path.join(__dirname, 'public')));

// app.use(morgan('combined'))
// create a write stream (in append mode) to file access.log
var accessLogStream = fs.createWriteStream(path.join(__dirname, '../log/access.log'), { flags: 'a' })
 
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

// setup view engine
app.engine('hbs', engine({extname: '.hbs'}));  // extname default là .handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources\\views'));

// Define route
// Tham số thứ hai là một hàm callback (ở đây là arrow function, có thể dùng function bình thường cũng được)
app.get('/', (req, res) => {
  res.render('news')
})

// Create port listener
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})