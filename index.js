//Cái này dùng để import thư viện express bằng cách đi vào node_modules để tải express rồi nạp vào biến dưới dạng function
// Chú ý: biến express là một function
const express = require('express')
const app = express()  // trả lại một instance đại diện cho ứng dụng nodejs
const port = 3000




// Define route
// Tham số thứ hai là một hàm callback (ở đây là arrow function, có thể dùng function bình thường cũng được)
app.get('/trang-chu', (req, res) => {
    var x = 1, y = 2;
    let c = x + y;
  res.send('Hello World2!')
})

// Create port listener
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})