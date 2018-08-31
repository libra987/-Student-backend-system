//连接数据库
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'szhmqd21';



/**
 * 暴露给控制器用的，查询列表的方法
 * @param {*} collectionName 集合名称
 * @param {*} params 参数对象
 * @param {*} callback 回调函数
 */
exports.findList = (collectionName, params, callback) => {
    // 
    MongoClient.connect(
        url,
        { useNewUrlParser: true },
        function (err, client) {
            //拿到db对象
            const db = client.db(dbName);
            //拿到合集
            const collection = db.collection(collectionName);

            collection.find(params).toArray(function (err, docs) {
                client.close();
                callback(err, docs)
            });
        });
}

/**
 * 暴露给控制器用的，查询一个的方法
 * @param {*} collectionName 集合名称
 * @param {*} params 参数对象
 * @param {*} callback 回调函数
 */
exports.findOne = (collectionName, params, callback) => {
    MongoClient.connect(
        url,
        { useNewUrlParser: true },
        function (err, client) {
            //拿到db对象
            const db = client.db(dbName);
            //拿到合集
            const collection = db.collection(collectionName);

            collection.findOne(params, (err, doc) => {
                client.close();
                callback(err, doc)
            });
        });
}

/**
 * 暴露给控制器用的，添加一个的方法
 * @param {*} collectionName 集合名称
 * @param {*} params 参数对象
 * @param {*} callback 回调函数
 */
exports.insertOne = (collectionName, params, callback) => {
    MongoClient.connect(
        url,
        { useNewUrlParser: true },
        function (err, client) {
            //拿到db对象
            const db = client.db(dbName);
            //拿到合集
            const collection = db.collection(collectionName);

            collection.insertOne(params, (err, result) => {
                client.close();
                callback(err, result)
            });
        });
}