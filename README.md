### 基于 uniCloud + element 的 前后台博客项目

#### 说明：

```
本项目是采用uniappH5开发的，集成了前台和后台PC博客项目，所有请求数据都使用了unicloud提供的阿里云函数+云数据库，可部署上线。
```

#### 特性：

- uniapp（）
- element-ui（）
- Markdown编辑器（）
- vue2.x（）
- vueX（）
- ​

#### 运行项目

```
1、cloudfunctions文件夹右键选择云空间(uniapp提供的免费空间)
2、上传云函数以及云数据库
3、采用HBuilder运行项目

```

#### 发布上线

```

```

#### FileTree 目录结构

```
├── bin                       // node 命令行构建工具 (无)
├── unpackage                     // 构建相关  
├── config                     // 配置相关 (无)
├── src                        // 源代码
│   ├── api                    // 所有请求
│   ├── components             // 全局UI组件
│   ├── mock                   // mock数据(无)
│   ├── router                 // 路由 (无)
│   ├── store                  // 全局store管理
│   ├── common                  // 全局公用方法
│   ├── containers              // 自适应布局组合 (无)
│   ├── page                  // view界面
│   │    ├── admin            //后台
│   │    ├── index         //前台
│   │    ├── login              //登录界面(无)
│   │    ├── errorPages           //错误界面(无)
│   │    └── permission        //权限测试界面(无)
│   ├── App.vue                // 入口页面
│   └── main.js                // 入口 加载组件 初始化等
├── static                     // 静态资源
│   ├── bower_components        //七牛SDK(无)
│   ├── css                     //css
│   ├── js                      //js
├── .babelrc                   // babel-loader 配置
├── eslintrc.js                // eslint 配置项(无)
├── .pages.json                // uniapp专属路由
├── favicon.ico                // favicon图标
├── index.html                 // html模板(无)
└── package.json               // package.json

```

#### 插件说明

1、marked mackdown文档样式化

```js
安装：npm install marked
使用方法：https://blog.csdn.net/weixin_45894305/article/details/106362783?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase
```



#### 项目开发中遇到的bug

```
1、JS切换背景图片时的“白色闪屏”问题(banner栏动态更换海报)
说明：
原先采用行内式赋值：// this.Bgc='background-image: url(../../../static/medias/banner/'+ new Date().getDay() +'.jpg);'
原因，图片加载需要一定的时间，所以就会出现短暂的闪烁
解决：
// 修复切换背景图时出现的“白色闪屏”现象
				let img = new Image();
				img.src = bannerList[Num].url
				// 确定图片加载完成后再进行背景图片切换
				img.onload = ()=> {
					this.$('.el-header').css("background-image","url(" + img.src + ")");
				}
```



#### 鸣谢：

1、uniapp官方

2、vue官方

3、uni-cloud-element-admin（serverless 后台管理系统）

演示地址:http://xl.hrai.online

留言：592394158@qq.com