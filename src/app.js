//1.导入模块
const express = require("express")
const path = require("path")
const bodyParser = require('body-parser')
const session = require('express-session')

//2.创建web服务
const app = express()

//位置也有关系...
//使用body-parser的中间件解析post请求 parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// 使用session这个中间件,并设置缓存时间为10分钟 Use the session middleware
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: false, cookie: { maxAge: 600000 } }))

//3.集成路由(先导再用)
//router 分开请求,不把所有的请求都怼在入口函数中
const accountRouter = require(path.join(__dirname, "/routers/accountRouter.js"))
const studentmanagerRouter =require(path.join(__dirname,"/routers/studentmanagerRouter.js"))
//app.use相当于一个入口函数
app.use("/account", accountRouter)
app.use('/studentmanager',studentmanagerRouter)


//4.开启web服务
app.listen(8899, '127.0.0.1', err => {
    if (err) {
        console.log(err);
    }
    console.log('start OK');

})