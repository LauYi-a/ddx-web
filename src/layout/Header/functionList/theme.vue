<template>
  <div title="系统风格设置" @click="drawerChange(true)">
      <el-icon  class="header-icon"><Grid /></el-icon>
  </div>
   <div class="drawer-box">
       <el-drawer
               title="系统风格设置"
               v-model="drawer"
               size="300px"
               :show-close="false"
               direction="rtl">
           <div class="theme-box">
               <h3>整体风格设置</h3>
               <theme-icon
                       v-model:active="state.style"
                       v-for="(row, index) in style"
                       :key="index"
                       :name="index"
                       :tip="row.name"
                       :logo="row.logo.background"
                       :menu="row.menu.background"
                       :header="row.header.background"
                       :main="row.container.background"
                       :activeColor="row.page.color"
               ></theme-icon>
               <h3>主题色</h3>
               <theme-color
                       v-for="(item, key) in themeColorArr"
                       v-model:active="state.primaryColor"
                       v-model:activeTextColor="state.primaryTextColor"
                       :key="key"
                       :color="item.color"
                       :textColor="item.textColor"
                       :tip="item.tip"
               ></theme-color>
               <h3>其他设置</h3>
               <div class="list">
                   <div class="list-item" v-for="option in options" :key="option.name">
                       <span>{{ option.name }}</span>
                       <el-switch
                               v-model="option.value"
                               active-color="var(--system-primary-color)"
                               inactive-color="#ff4949"
                               @change="change(option)"
                       >
                       </el-switch>
                   </div>
               </div>
           </div>
           <div class="theme-footer">
               <el-button @click="drawer = false">关 闭</el-button>
           </div>
       </el-drawer>
   </div>
</template>

<script>
import { defineComponent, ref, reactive, computed, watch } from 'vue'
import { useStore } from 'vuex'
import themeIcon from './theme/theme-icon.vue'
import themeColor from './theme/theme-color.vue'
import { style } from '@/theme/index'

export default defineComponent({
  components: {
    themeIcon,
    themeColor
  },
  setup() {
    const store = useStore()
    // 只取值，不做computed
    const state = reactive({
      style: store.state.app.theme.state.style,
      primaryColor: store.state.app.theme.state.primaryColor,
      primaryTextColor: store.state.app.theme.state.primaryTextColor,
      menuType: store.state.app.theme.state.menuType
    })
    const themeColorArr = [
      { color: '#333', textColor: '#fff', tip: '极客黑' },
      { color: '#409eff', textColor: '#fff', tip: '默认蓝' }

    ]
    const setTheme = () => {
      const userTheme = style[state.style]
      const body = document.getElementsByTagName('body')[0]
      // 设置全局顶部body上的class名称，即为主题名称，便于自定义配置符合当前主题的样式统一入口
      body.className = state.style
      // 需要设置的颜色参照theme.scss，位置：assets/style/theme.scss
      // 设置主题色
      body.style.setProperty('--system-primary-color', state.primaryColor)
      for (let i in userTheme) {
        const item = userTheme[i]
        for (let y in item) {
          let cssVarName = '--system-' + i + '-' + y.replace(/([A-Z])/g, "-$1").toLowerCase()
          body.style.setProperty(cssVarName, item[y])
        }
      }
    }
    // 监听数据的变化
    watch(state, (newVal) => {
      const theme = {
        state: {
          ...state
        }
      }
      store.commit('app/stateChange', {
        name: 'theme',
        value: theme
      })
      setTheme()
    })
    let drawer = ref(false)
    const options = reactive([
      { name: '显示 logo', value: store.state.app.showLogo, store: 'showLogo' },
      { name: '显示面包屑导航', value: store.state.app.showTabs, store: 'showTabs' },
      { name: '保持一个菜单展开', value: store.state.app.expandOneMenu, store: 'expandOneMenu' }
    ])
    const drawerChange = (value) => {
      drawer.value = value
    }
    const change = (option) => {
      store.commit(`app/stateChange`, { name: option.store, value: option.value })
    }
    setTheme()
    return {
      drawer,
      options,
      state,
      style,
      themeColorArr,
      drawerChange,
      change
    }
  }
})
</script>

<style lang="scss" scoped>
  .list {
    padding: 0 20px;
    &-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
      span {
        font-size: 16px;
      }
    }
  }
  .header-icon{
      font-size: 17px;
      display: flex;
      align-items: center;
  }
</style>