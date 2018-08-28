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




















> controllers 相当于中介,分发手上的资源给相应的routers做相应的工作,

>routers里面的accountRouter.js负责做账户方面的内容,所以涉及登录,注册的就要找他.

>accountRouter.js完成工作后,要(导出)去controllers公司的accountControllers.js部门报到,也就是集成.

>当后台需要用到账户相关的工具时,就导出accountControllers,用里面accountRouter.js的方法解决问题