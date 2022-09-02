import Layout from '@/layout/index.vue'
import { createNameComponent } from '../createNode'
/*
 * meta 参数
 * cache: false  是否缓存路由  true 缓存 false 不缓存
 * hideTabs: true 是否显示页签按钮 true 显示 false 不显示
 * hideMenu: true 是否显示菜单 true 显示 false 不显示
 * */
const route = [
  {
    path: '/sys/user/center',
    component: Layout,
    redirect: '/sys/user/personalCenter',
    hideMenu: true,
    meta: { title: '用户信息' },
    children: [
      {
        path: '/sys/user/personalCenter',
        component: createNameComponent(() => import('@/views/main/sys/user/userInfo/user-personal-center.vue')),
        meta: { title: '个人中心', hideTabs: true }
      }
    ]
  },
  {
    path: '/sys/user/info',
    name:'user-info',
    component: Layout,
    redirect: '/sys/user/userInfo',
    hideMenu: true,
    meta: { title: '用户详情' },
    children: [
      {
        path: '/sys/user/userInfo',
        component: createNameComponent(() => import('@/views/main/sys/user/userInfo/user-info.vue')),
        meta: { title: '详情信息', hideTabs: true }
      }
    ]
  },
  {
    path: '/sys/user/add',
    name:'user-add',
    component: Layout,
    redirect: '/sys/user/userAdd',
    hideMenu: true,
    meta: { title: '注册用户' },
    children: [
      {
        path: '/sys/user/userAdd',
        component: createNameComponent(() => import('@/views/main/sys/user/userOper/user-add.vue')),
        meta: { title: '创建用户信息', hideTabs: true }
      }
    ]
  },
  {
    path: '/sys/user/edit',
    name:'user-edit',
    component: Layout,
    redirect: '/sys/user/userEdit',
    hideMenu: true,
    meta: { title: '编辑用户' },
    children: [
      {
        path: '/sys/user/userEdit',
        component: createNameComponent(() => import('@/views/main/sys/user/userOper/user-edit.vue')),
        meta: { title: '编辑用户信息', hideTabs: true }
      }
    ]
  },
  {
    path: '/system',
    component: Layout,
    redirect: '/404',
    hideMenu: true,
    meta: { title: '系统目录' },
    children: [
      {
        path: '/404',
        component: createNameComponent(() => import('@/views/system/404.vue')),
        meta: { title: '404', hideTabs: true }
      },
      {
        path: '/redirect/:path(.*)',
        component: createNameComponent(() => import('@/views/system/redirect.vue')),
        meta: { title: 'redirect', hideTabs: true }
      }
    ]
  },
  {
    path: '/401',
    component: Layout,
    redirect: '/401',
    hideMenu: true,
    meta: { title: '系统目录' },
    children: [
      {
        path: '/401',
        component: createNameComponent(() => import('@/views/system/401.vue')),
        meta: { title: '401', hideTabs: true }
      },
      {
        path: '/redirect/:path(.*)',
        component: createNameComponent(() => import('@/views/system/redirect.vue')),
        meta: { title: 'redirect', hideTabs: true }
      }
    ]
  },
  {
    path: '/login',
    component: createNameComponent(() => import('@/views/system/login.vue')),
    hideMenu: true,
    meta: { title: '登录', hideTabs: true }
  },
  {
    // 找不到路由重定向到404页面
    path: "/:pathMatch(.*)",
    component: Layout,
    redirect: "/404",
    hideMenu: true
  },
]

export default route