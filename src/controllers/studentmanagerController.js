const xtpl = require('xtpl');
const path = require("path")

//连接数据库
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'szhmqd21';

/**
 * 最终处理，返回获取到的学生列表页面
*/
exports.getStudentListPage = (req, res) => {
    // console.log(req.query);
    //设置搜索词为用户输入的关键词或者空,空则会搜索全部的数据
    const keyword = req.query.keyword || ''
    MongoClient.connect(url, function (err, client) {

        const db = client.db(dbName);

        const collection = db.collection('studentInfo');

        // Find some documents
        collection.find({name:{$regex:keyword}}).toArray(function (err, docs) {
            // console.log(docs);
            //关闭与数据库的连接
            client.close();
            //动态渲染数据
            xtpl.renderFile(path.join(__dirname, "../statics/views/list.html"), {
                students:docs
            }, function (error, content) {
                res.send(content)
            });
        });
    });

}
