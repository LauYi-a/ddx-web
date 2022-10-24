/**
 * @description 所有人可使用的参数配置列表
 * @params hideMenu: 是否隐藏当前路由结点不在导航中展示
 * @params alwayShow: 只有一个子路由时是否总是展示菜单，默认false
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import store from '@/store'
import { decrypt} from '@/utils/system/cryptoAES'
import NProgress from '@/utils/system/nprogress'
import { changeTitle } from '@/utils/system/title'
// 动态路由相关引入数据
import Layout from '@/layout/index.vue'
import MenuBox from '@/components/menu/index.vue'
import { createNameComponent } from './createNode'
import { menuType } from '@/utils/system/enumUtils'

// 引入modules
import System from './modules/system'

let modules = [
  ...System
]
const routes = modules;

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

// 动态路由的权限新增，供登录后调用
export function addRoutes() {
  let menus = JSON.parse(decrypt(localStorage.getItem("vuex"))).user.menus;
  eachData(menus);
  menus.forEach(item => {
    modules.push(item);
    router.addRoute(item)
   })
}

// 重置匹配所有路由的解决方案
export function eachData(menus,lastPath) {
  menus.forEach(menu => {
    //判断是否有子路由
    if (menu.meta.resourceType !== menuType.MENU_TYPE_1) {
      if (menu.component === 'Layout') {
        menu.component = Layout
      } else {
        menu.component = createNameComponent(MenuBox)
      }
      if (menu.children.length >=2){
        lastPath = menu.path
      }
      eachData(menu.children,lastPath);
      if (lastPath) {
        lastPath = undefined
      }
    }else{
      let url = lastPath ? lastPath+'/'+menu.path+'/'+ menu.component+'.vue': menu.path+'/'+ menu.component+'.vue';
      menu.component = createNameComponent(() => import(/* @vite-ignore */`../views/main${url}`))
    }
  });
}

if (store.state.user.token) {
  addRoutes()
}

const whiteList = ['/login'];

router.beforeEach((to, _from, next) => {
  NProgress.start();
  if (store.state.user.token || whiteList.indexOf(to.path) !== -1) {
    to.meta.title ? (changeTitle(to.meta.title)) : ""; // 动态title
    next()
  } else {
    next("/login"); // 全部重定向到登录页
    to.meta.title ? (changeTitle(to.meta.title)) : ""; // 动态title
  }
});

router.afterEach((to, _from) => {
  const keepAliveComponentsName = store.getters['keepAlive/keepAliveComponentsName'] || []
  const name = to.matched[to.matched.length - 1].components.default.name
  if (to.meta && to.meta.cache && name && !keepAliveComponentsName.includes(name)) {
    store.commit('keepAlive/addKeepAliveComponentsName', name)
  }
  NProgress.done();
});

export {
  modules
}

export default router