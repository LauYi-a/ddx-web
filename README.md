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
</p>

### 

## 简介

- [更新日志](./VERSION.md)
- ddx-web 创建于 2022 年 4 月 作者 YI.LAU 
- 主要技术栈
   - MVVM框架：vue v3
   - 工程化管理：vite v2
   - UI框架：element-plus
   - 路由管理：vue-router v4
   - 状态管理：vuex v4
   - 数据请求：axios
   - 实用工具库：@vueuse/core

## 介绍
- ddx-web 极简的框架风格 支持 暗黑与亮色两种主题选择
##### 特色功能
- 适合中后台开发的路由配置、状态管理机制（状态默认支持本地存储）、已封装完善的axios及api管理机制
- 简易配置的页面缓存功能，只需配置noCache属性，无需配置其他的任何属性，如组件名称，路由名称等等很多框架需要配置的东西
- 无路由跳转的刷新功能，支持缓存页面刷新
- 手写版本的各类自定义指令
##### 项目结构
- -api 全局api
- -assets 全局静态资源
- -components 全局组件
- --layer 全局弹窗
- --menu 菜单跳转组件页面
- --table 全局表格组件
- -config 全局静态配置
- -directive 全局指令
- --drag 拖拉拽组件指令
- -layout 全局布局组件
- -router 路由配置
- -store 全局存储值
- -template 模板
- -theme 全局主题
- -utils 全局工具包
- -views 业务组件


## 使用
   

1. 安装依赖，国内推荐使用cnpm或tyarn，国外推荐使用npm或yarn

   ```
   npm install
   ```

   

2. 运行

   ```
   npm run dev 或 npm run start
   ```

   

3. 打包

   ```
   npm run build
   ```
   

