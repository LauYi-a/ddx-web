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
- 代码简介 层次清晰 对很多代码进行了封装
##### 特色功能
- 适合中后台开发、动态路由配置、状态管理机制（状态默认支持本地存储）、已封装完善的axios及api管理机制
- 简易配置的页面缓存功能，只需配置noCache属性，无需配置其他的任何属性，如组件名称，路由名称等等很多框架需要配置的东西
- 无路由跳转的刷新功能，支持缓存页面刷新
- 手写版本的各类自定义指令
- 缓存加密功能根据 .env 文件判断当前环境 开发环境默认不加密。
可修改 package.json 文件中的 scripts 修改 vite --mode=development 命令参数
- 支持多服务切换
- 支持系统设置配置 如：【登入失效时间、接口频繁请求隔离、输入密码错误次数、密码错误账号锁定时间】等，可扩展其他设置
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
## 项目展示

## 使用
   

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
   

