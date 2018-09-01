const express = require("express")
const path = require("path")

const studentmanagerRouter = express.Router()

const studentmanagerCTRL = require(path.join(__dirname, "../controllers/studentmanagerController.js"))

//处理具体请求
//获得学生列表页
studentmanagerRouter.get('/list', studentmanagerCTRL.getStudentListPage)
//获得新增页面
studentmanagerRouter.get('/add',studentmanagerCTRL.getAddStudentPage)
//进行新增操作
studentmanagerRouter.post('/add',studentmanagerCTRL.addStudent)
//获得修改页面(动态路径参数)
studentmanagerRouter.get('/edit/:studentId',studentmanagerCTRL.getEditStudentPage )
//进行修改操作
studentmanagerRouter.post('/edit/:studentId',studentmanagerCTRL.editStudent)
//进行删除操作
studentmanagerRouter.get('/delete/:studentId',studentmanagerCTRL.deleteStudent )

//导出模块
module.exports = studentmanagerRouter;