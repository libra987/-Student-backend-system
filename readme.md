### 一.初始化文件
```
    |--src
		|--controllers 处理业务逻辑
		|--routers 路由
		|--statics 静态资源及页面
		|--tools 工具类
		|--app.js 入口文件
    |--package.json 项目的描述文件
```
### 二.获取登录页

```
1.app.js中开启web服务
    1.1安装express
    1.2 使用expres写代码开启web服务

2、写好我们accountRouter,并且最终在app.js中集成
		accountRouter:
			2.1、使用express创建Router
			
			2.2、使用router处理具体的请求
			
			2.3、把router导出去
			
	    app.js
			2.1、导入accountRouter
			
			2.2、使用中间件的写法，集成路由
3、在我们的accountController中处理具体路基
		去读取服务器上面的login.html并且返回给浏览器
```

### 三.注册页

#### 1 显示注册页
```
	1.1同登录页一样的操作
	1.2 给登录页的注册按钮绑定点击事件,点击即跳转到注册页
```
#### 2.完成注册操作
```
浏览器:
		1、通过jquery操作拿到用户输入的 用户名和密码
		
		2、对密码进行加密(md5)
			哈希算法
			加盐
				注册&登录保持一致
				多端保持同样的盐
					iOS、Android
		
		3、通过$.post()
```
```	
	服务器:
		1、接收到浏览器通过POST传递过来的参数
			body-parser
			
			1.1、安装包
			1.2、在app.js中使用中间件的方式集成body-parser
			
		2、利用图像化工具，robomongo，把集合创建好
			accountInfo
			
		3、在控制器中，连接到MongoDB数据库
			如果用户名已经存在，那就给用户提示
			说用户名存在，如果不存在，那么就注册
			并且给用户一个反馈
```
### 四.登录页
>验证码要先通过校验,验证码通过才发请求验证用户名和密码,这是为了防止恶意注册;
	浏览器端
		发请求给服务器要图片验证码，并且要注意，每次请求
		url不能一样
	
	服务端
		生成【captchapng】
			服务器端生成验证码，并且要在服务器端保存起来
			
			使用步骤:
				1、安装
				2、调用响应的API生成图片验证码
					把生成随机数绘制到画布上，最终生成一张图片
	存储
			session 会话技术
			
			node:express-session
			
			使用步骤:
				https://www.npmjs.com/package/express-session
				1、安装
				2、使用app.use来集成我们的express-session这个中间件
				3、req.session.xxx = yyy
				   req.session.xxx
				
		cookies & session
			跟现实生活中我们去超市购物，使用储物柜的方式很像			
#### 1.完成图片验证码
	1.1安装captchapng,利用img标签的src发送请求,二级目录为vcode
	1.2点击图片刷新,浏览器会自动忽略相同的请求,因此如果要重新生成新的验证码图片,利用模板拼接url生成随机数即可
#### 2.完成验证码的检验
	2.1 利用node的express-session包,将生成的验证码保存到session中
	2.2 实现用户输入和系统生成的验证码的比对

#### 3.完成登录功能

### 五.利用模板显示列表页

####1.利用xtemplate的继承模板,渲染页面
	xtemplate  
	父模板
```js	
<!doctype html>
<html>
    <head>
        <meta name="charset" content="utf-8" />
        <title>{{title}}</title>
        {{{block ("head")}}}
    </head>
    <body>
        {{{block ("body")}}}
    </body>
</html>
```
	子模板
```js	
{{extend ("./parent")}}
{{#block ("body")}}
    <h2>{{title}}</h2>
{{/block}}
```
2.xtpl 渲染
```js
/*
* 参数1：要渲染的页面的路径，最终找到list.html是根据绝对路径去找
* 参数2：渲染页面所需要的数据
* 参数3：渲染完毕之后的回调
*/
var xtpl = require('xtpl');
xtpl.renderFile('url',{
	x:1
},function(error,content){
	//content是字符串,是子模板html的内容
});
```
####2.动态渲染数据
```txt
	1.连接数据库,查出所有数据
	2.利用Xtemplate的循环语法写模板语法
		{{#each(array)}}
		    {{xindex}} {{this.name}}
		{{/each}}
	3.用xtpl.rendFile()渲染模板
```
####3.完成学生信息的模糊查询
浏览器
	发送请求，带上参数(拼接字符串)
	http://127.0.0.1/studentmanager/list?keyword=德

服务器
	1、获取关键字
	(将关键词设为获取到的用户输入的关键词或者空字符串,这样即使关键词为空时,则搜索查找所有 数据) 
	2、根据关键字去数据库中模糊查询学生列表
	  collection.find({name:{$regex:keyword}}).toArray(function (err, docs) {})
	3、利用xtpl，根据查询到的最新数据，重新渲染
		一个是渲染列表
		一个是渲染
	4、通过响应返回给浏览器
--优化:搜索关键词后页面刷新,搜索框中的关键词应该显示=>可以将用户输入的关键词搞成模板,利用xtpl渲染到模板中
####4.完成数据库封装操作
异步的结果或数据是在回调函数中获取的,所以后面操作这些数据的时候,要写在回调函数中,比如fd.readFile的同步和异步.

### 完成新增操作
获取新增页面
	浏览器，发送请求
		http://127.0.0.1:3000/studentmanager/add

	后台
		找到新增页面，使用xtpl渲染（因为使用了模版语法），并且返回给浏览器

新增操作
	浏览器端，用户填写内容，然后发送POST请求
	
	后台:
		1、接收传递过来的POST参数
		
		2、插入数据库
		
		3、响应数据（html里面包含js脚本）给浏览器，让浏览器执行一些操作

### 完成修改页面
1.获取修改页面
	params传参
	
	浏览器端
		发送求 
		http://127.0.0.1:3000/studentmanager/edit/5b8643af36c9ad1a6a9ea78b
		
	后台
		router 中处理请求的时候	xxx/:变量名称
		controller 获取 req.params.变量名称
		
		id值需要经过ObjectId封装
		
		要整一个修改页面

点击修改的时候,获得选中对象的id,连接数据库,查找对应id的信息渲染到页面中
点击保存到时候,获得用户输入的信息,连接数据库,添加到时数据库中

2.完成修改操作
	浏览器:
		发送POST请求
		url中国要通过params传递_id
		通过请求体传递参数
		
	后台:
		1、既要获取url中的_id，也要获取请求体中的内容
		
		2、在databasetool中新增修改学生的方法
		
		3、在控制器中调用修改的方法
		
		4、根据数据库操作的结果，返回html代码给浏览器
			html就会包含一段可以直接执行的脚本


(难点,用parmas传参,需要用到db的objectID)

### 完成删除操作
浏览器
	给删除绑定点击事件,判断(confirm)
后台
	1.获得用户id
	2.连接数据库
	3.做删除操作




操作数据库,增删改查开始
当用户填好信息,点击登录的时候
1.拿到用户注册时输入用户名 发送请求 查看是否已经存在
2.对密码进行加密 利用md5或加盐	
3.发送post请求,添加到数据库


















> controllers 相当于中介,分发手上的资源给相应的routers做相应的工作,

>routers里面的accountRouter.js负责做账户方面的内容,所以涉及登录,注册的就要找他.

>accountRouter.js完成工作后,要(导出)去controllers公司的accountControllers.js部门报到,也就是集成.

>当后台需要用到账户相关的工具时,就导出accountControllers,用里面accountRouter.js的方法解决问题