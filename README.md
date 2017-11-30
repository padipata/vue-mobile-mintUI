# 基于vue2.js移动端单页应用模板

更新时间| 更新内容|更新说明
---|---|---
2017-09-12 | 搭建基本项目模板|无
2017-09-12 | 增加服务器基本配置
2017-09-16 | 增加HTTP逻辑层示例
2017-09-18 | 添加全局默认样式 | 路径：assets/css/reset.css
2017-09-18 | 添加移动端rem布局，路径：jslib/UIAdapter | 当前检测宽度为750
2017-09-20 | 配置vue-router
2017-09-25 | 增加vue轮播插件 vue-awesome-swiper | ^2.6.4
2017-09-26 | 增加jquery，并引入全局变量 | ^3.2.1
~~2017-09-27~~ | ~~Vuex状态管理~~ | ~~^2.2.9~~
2017-09-28 | 增加mint-ui组件库，并添加style-loader和css-loader到webpack中 | ^2.2.9
2017-09-28 | 引入css-loader & style-loader
2017-09-28 | 引入地区联动插件LArea | 按项目需求取舍
2017-11-30 | 引入 sha1 加密插件 | ^1.1.1
2017-11-30 | 引入 URLEncode 加/解码插件 | ^1.1.0
2017-11-30 | 引入 axios 并配置 HttpRequest.js文件 | ^0.16.1


## 安装与运行

```
git clone https://github.com/padipata/vue-template.git

cd vue-music

cnpm i

npm run dev //服务端运行 访问 http://localhost:8080

npm run build 项目打包 

感兴趣的童鞋可以来个star
