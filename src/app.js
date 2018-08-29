//1.导入模块
const express = require("express")
const path = require("path")
const bodyParser = require('body-parser')
//2.创建web服务
const app = express()
//位置也有关系...
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//3.集成路由(先导再用)
//router 分开请求,不把所有的请求都怼在入口函数中
const accountRouter = require(path.join(__dirname, "/routers/accountRouter.js"))
//app.use相当于一个入口函数
app.use("/account", accountRouter)

//4.开启web服务
app.listen(8899, '127.0.0.1', err => {
    if (err) {
        console.log(err);
    }
    console.log('start OK');

})