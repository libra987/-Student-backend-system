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
	2、根据关键字去数据库中模糊查询学生列表
	3、利用xtpl，根据查询到的最新数据，重新渲染
		一个是渲染列表
		一个是渲染
	4、通过响应返回给浏览器
















操作数据库,增删改查开始
当用户填好信息,点击登录的时候
1.拿到用户注册时输入用户名 发送请求 查看是否已经存在
2.对密码进行加密 利用md5或加盐	
3.发送post请求,添加到数据库


















> controllers 相当于中介,分发手上的资源给相应的routers做相应的工作,

>routers里面的accountRouter.js负责做账户方面的内容,所以涉及登录,注册的就要找他.

>accountRouter.js完成工作后,要(导出)去controllers公司的accountControllers.js部门报到,也就是集成.

>当后台需要用到账户相关的工具时,就导出accountControllers,用里面accountRouter.js的方法解决问题