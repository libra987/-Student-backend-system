//1.导入express
const express = require("express")
const path = require("path")


//2.创建路由对象
const accountRouter = express.Router();

//3.导入控制器
const accountCTRL = require(path.join(__dirname, "../controllers/accountController"))

//4.处理具体的请求
//  4.1获取登录页面的请求
accountRouter.get('/login', accountCTRL.getLoginPage)
//  4.2获取注册页面的请求
accountRouter.get('/register', accountCTRL.getRegisterPage)
//  4.3处理注册请求
accountRouter.post('/register',accountCTRL.register)
// 4.4 获取图片验证码
accountRouter.get('/vcode', accountCTRL.getVcodeImage)
// 4.5 处理登录请求
accountRouter.post('/login', accountCTRL.login)
//5.导出
module.exports = accountRouter;
