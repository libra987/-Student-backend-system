//1.导入模块
const express =require("express")
const path =require("path")

//2.创建web服务
const app =express()



//3.集成路由(先导再用)
//router 分开请求,不把所有的请求都怼在入口函数中
const accountRouter =require(path.join(__dirname,"/routers/accountRouter.js"))
//创建router,导出=>入口文件集成,,导入 app.use(‘一级路径’,router.js)
app.use("/account",accountRouter)

//4.开启web服务
app.listen(8899,'127.0.0.1',err=>{
    if(err){
        console.log(err);
    }
    console.log('start OK');
    
})