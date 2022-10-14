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
    path: '/sys/resource/edit',
    component: Layout,
    redirect: '/sys/resource/resourceList',
    hideMenu: true,
    meta: { title: '新增白名单' },
    children: [
      {
        path: '/sys/resource/resourceList',
        component: createNameComponent(() => import('@/views/main/sys/user-manage/resource-oper/resource-edit.vue')),
        meta: { title: '新增白名单信息', hideTabs: true }
      }
    ]
  },
  {
    path: '/sys/whitelist/add',
    component: Layout,
    redirect: '/sys/whitelist/whitelistAdd',
    hideMenu: true,
    meta: { title: '新增白名单' },
    children: [
      {
        path: '/sys/whitelist/whitelistAdd',
        component: createNameComponent(() => import('@/views/main/sys/whitelist/whitelist-add.vue')),
        meta: { title: '新增白名单信息', hideTabs: true }
      }
    ]
  },
  {
    path: '/sys/role/edit',
    component: Layout,
    redirect: '/sys/role/roleEdit',
    hideMenu: true,
    meta: { title: '编辑角色' },
    children: [
      {
        path: '/sys/role/roleEdit',
        component: createNameComponent(() => import('@/views/main/sys/user-manage/role-oper/role-edit.vue')),
        meta: { title: '编辑角色信息', hideTabs: true }
      }
    ]
  },
  {
    path: '/sys/role/info',
    component: Layout,
    redirect: '/sys/role/roleInfo',
    hideMenu: true,
    meta: { title: '角色信息' },
    children: [
      {
        path: '/sys/role/roleInfo',
        component: createNameComponent(() => import('@/views/main/sys/user-manage/role-oper/role-info.vue')),
        meta: { title: '角色详情', hideTabs: true }
      }
    ]
  },
  {
    path: '/sys/role/add',
    component: Layout,
    redirect: '/sys/role/roleAdd',
    hideMenu: true,
    meta: { title: '新增角色' },
    children: [
      {
        path: '/sys/role/roleAdd',
        component: createNameComponent(() => import('@/views/main/sys/user-manage/role-oper/role-add.vue')),
        meta: { title: '创建角色信息', hideTabs: true }
      }
    ]
  },
  {
    path: '/sys/user/center',
    component: Layout,
    redirect: '/sys/user/personalCenter',
    hideMenu: true,
    meta: { title: '用户信息' },
    children: [
      {
        path: '/sys/user/personalCenter',
        component: createNameComponent(() => import('@/views/main/sys/user-manage/user-oper/user-personal-center.vue')),
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
        component: createNameComponent(() => import('@/views/main/sys/user-manage/user-oper/user-info.vue')),
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
        component: createNameComponent(() => import('@/views/main/sys/user-manage/user-oper/user-add.vue')),
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
        component: createNameComponent(() => import('@/views/main/sys/user-manage/user-oper/user-edit.vue')),
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
    redirect: '/system/401',
    hideMenu: true,
    meta: { title: '系统目录' },
    children: [
      {
        path: '/system/401',
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