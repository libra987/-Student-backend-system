const xtpl = require('xtpl');
const path = require("path")

const databasetool = require(path.join(__dirname, "../tools/databasetool.js"))


/*
* 最终处理，返回获取到的学生列表页面
*/
exports.getStudentListPage = (req, res) => {
    // console.log(req.query);
    //设置搜索词为用户输入的关键词或者空,空则会搜索全部的数据
    const keyword = req.query.keyword || ''

    //调用databasetool.findList的方法,拿到数据,渲染列表页面,返回给浏览器
    databasetool.findList("studentInfo", { name: { $regex: keyword } }, (err, docs) => {
        xtpl.renderFile(path.join(__dirname, "../statics/views/list.html"), {
            students: docs,
            keyword
        }, function (error, content) {
            res.send(content)
        });
    })

}
/*
* 最终处理，返回获取到的学生列表页面
*/
exports.getAddStudentPage  = (req, res) => {
    xtpl.renderFile(path.join(__dirname, "../statics/views/add.html"), {
       
    }, function (error, content) {
        res.send(content)
    });
}

/*
*  最终处理，返回新增操作之后的html(html中有一段可以执行js)
*/
exports.addStudent =(req,res)=>{
    // console.log(req.body);
    databasetool.insertOne("studentInfo", req.body, (err,result)=>{
        if(result ==null){
            //表示新增失败
            res.send(`<script>alert("新增失败!");</script>`);
        }else{
            res.send(`<script>window.location.href='/studentmanager/list'</script>`)
        }
    })
}
