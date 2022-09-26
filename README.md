<h1 align="center">ddx-web</h1>
<p align="center">
    <a href="https://github.com/vuejs/vue-next">
        <img src="https://img.shields.io/badge/vue3-3.0.5-brightgreen.svg" alt="vue">
    </a>
    <a href="https://github.com/element-plus/element-plus">
        <img src="https://img.shields.io/badge/elementPlus-1.0.2beta.42-brightgreen.svg" alt="element-plus">
    </a>
    <a href="https://github.com/vitejs/vite">
        <img src="https://img.shields.io/badge/vite-2.2.3-brightgreen.svg" alt="vite">
    </a>
     <a href="https://www.npmjs.com/package/vue">
        <img src="https://img.shields.io/npm/v/vue.svg" alt="vite">
    </a>
</p>
 
## 简介
- ddx-web 创建于 2022 年 4 月 作者 YI.LAU 
- 此开源项目为个人开发，不限制任何商业使用和个人研究，使用之前请先点个Star对我进行鼓励
- 利用此开源项目参与的一切违法、色情相关的活动均与本源码无关，请勿以身示法

## 介绍
- ddx-web 是一个免费并且开源的中后台管理系统模板。使用最新版本的vue3+vite+element-plus开发而成，目的是为了解决通用型的业务中后台系统复杂的配置,极简的框架风格 支持 暗黑与亮色两种主题选择
- ddx-web 包含前端后端分离框架 整套集成，后端采用分布式微服务架构具体点击查看[后端GitHub源码详情](https://github.com/LauYi-a/ddxs) 
- 代码简洁 层次清晰 对部分共用代码进行了封装,适合中后台开发
- [更新日志](./VERSION.md)

## 技术栈
   - MVVM框架：vue v3
   - 工程化管理：vite v2
   - UI框架：element-plus
   - 路由管理：vue-router v4
   - 状态管理：vuex v4
   - 数据请求：axios
   - 实用工具库：@vueuse/core
   
## 基础功能
- 已对axios及api管理机制的完善封装
- 支持动态路由配置、状态管理机制（状态默认支持本地存储）、路由权限管理
- 简易配置的页面缓存功能，只需菜单配置noCache属性，无需配置其他的任何属性，如组件名称，路由名称等等很多框架需要配置的东西
```
 * 路由 meta 参数
 * cache: false  是否缓存路由  true 缓存 false 不缓存
 * hideTabs: true 是否显示页签按钮 true 显示 false 不显示
 * hideMenu: true 是否显示菜单 true 显示 false 不显示
```
- 支持无路由跳转的刷新功能，支持缓存页面刷新
- 自定义元素权限指令
- 缓存加密功能根据 .env 文件判断当前环境 开发环境默认不加密。可修改 package.json 文件中的 scripts 修改 vite --mode=development 命令参数
- 支持多服务切换
- 支持系统设置配置 如：【登入失效时间、接口频繁请求隔离、输入密码错误次数、密码错误账号锁定时间】等，可扩展其他设置
- 系统已完成 用户管理、角色管理、权限管理、菜单管理、系统参数管理、白名单管理 基本功能
#### 项目结构
```
ddx-web -- 主工程
|-public -- 公共部分
|-src -- 根路径
| |-api 全局api接口
| |-assets 全局静态资源
| | |-images 图片资源
| | |-style 共样式
| |-components 全局组件
| | |-layer 全局弹窗组件
| | |-menu 菜单跳转组件页面
| | |-table 全局表格组件
| |-config 全局静态配置
| |-directive 全局指令
| | |-drag 拖拉拽组件指令
| | |-permission 全局元素指令
| |-layout 全局布局组件
| | |-Header 头部
| | |-Logo 
| | |-Menu 菜单
| | |-Tabs 页签
| | |-index.vue 总组件
| |-router 路由配置
| |-store 全局缓存值 添加缓存组件
| |-template 模板
| |-theme 全局主题
| |-utils 全局工具包
| |-views 业务组件
| | |-main 业务模块部分
| | |-system 系统模板部分
|-App.vue
```
## 预览效果

![image](https://github.com/LauYi-a/ddx-wiki/blob/master/images/微信图片_20220812162735.png)
![image](https://github.com/LauYi-a/ddx-wiki/blob/master/images/微信图片_20220812162817.png)
![image](https://github.com/LauYi-a/ddx-wiki/blob/master/images/微信图片_20220812162854.png)
![image](https://github.com/LauYi-a/ddx-wiki/blob/master/images/微信图片_20220812163127.png)
![image](https://github.com/LauYi-a/ddx-wiki/blob/master/images/微信图片_20220812163253.png)
![image](https://github.com/LauYi-a/ddx-wiki/blob/master/images/微信图片_20220812163259.png)
#### 暗黑部分效果
![image](https://github.com/LauYi-a/ddx-wiki/blob/master/images/微信图片_20220812163004.png)
![image](https://github.com/LauYi-a/ddx-wiki/blob/master/images/微信图片_20220812163032.png)
![image](https://github.com/LauYi-a/ddx-wiki/blob/master/images/微信图片_20220812163247.png)

## 安装使用

1. 安装依赖，国内推荐使用cnpm或tyarn，国外推荐使用npm或yarn

   ```
   npm install
   ```

2. 运行

   ```
   npm run dev 或 npm run uat
   ```

3. 打包

   ```
   npm run build
   ```
 
 ## 相关文档
 ````
 后续补充
 ````

