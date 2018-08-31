const express = require("express")
const path = require("path")

const studentmanagerRouter = express.Router()

const studentmanagerCTRL = require(path.join(__dirname, "../controllers/studentmanagerController.js"))

//处理具体请求
studentmanagerRouter.get('/list', studentmanagerCTRL.getStudentListPage)




module.exports = studentmanagerRouter;