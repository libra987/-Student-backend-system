const express = require("express")
const path = require("path")

const studentmanagerRouter = express.Router()

const studentmanagerCTRL = require(path.join(__dirname, "../controllers/studentmanagerController.js"))

//处理具体请求
//获得学生列表页
studentmanagerRouter.get('/list', studentmanagerCTRL.getStudentListPage)
//获得新增页面
studentmanagerRouter.get('/add',studentmanagerCTRL.getAddStudentPage )
//进行新增操作
studentmanagerRouter.post('/add',studentmanagerCTRL.addStudent)



module.exports = studentmanagerRouter;