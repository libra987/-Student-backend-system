//1.导入express
const express = require("express")
const path = require("path")

//2.创建路由对象
const accountRouter = express.Router();

//3.导入控制器
const accountCTRL = require(path.join(__dirname, "../controllers/accountController"))

//4.处理具体的请求
accountRouter.get('/login.html', accountCTRL.getLoginPage)

//5.导出
module.exports = accountRouter;
