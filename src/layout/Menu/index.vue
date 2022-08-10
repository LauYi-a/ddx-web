<template>
  <el-scrollbar>
    <el-menu
      class="layout-menu system-scrollbar"
      background-color="var(--system-menu-background)"
      text-color="var(--system-menu-text-color)"
      active-text-color="var(--system-primary-color)"
      :default-active="activeMenu"
      :class="isCollapse? 'collapse': ''"
      :collapse="isCollapse"
      :collapse-transition="false"
      :unique-opened="expandOneMenu"
    >
      <menu-item v-for="(menu, key) in allRoutes" :key="key" :menu="menu" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { defineComponent, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import MenuItem from './MenuItem.vue'
export default defineComponent({
  components: {
    MenuItem
  },
  setup() {
    const store = useStore()
    const isCollapse = computed(() => store.state.app.isCollapse)
    const expandOneMenu = computed(() => store.state.app.expandOneMenu)
    const allRoutes = useRouter().options.routes
    const route = useRoute()
    const activeMenu = computed(() => {
      const { meta, path } = route;
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    });
    onMounted(() => {

    })
    return {
      isCollapse,
      expandOneMenu,
      allRoutes,
      activeMenu,
    }
  }
})
</script>
<style>
  .el-menu--popup{
    min-width:0px !important;
    padding: 0px !important;
    border: none !important;
  }
  .el-popper,.is-light,.is-pure{
    border: none !important;
  }
  .el-menu-item{
    height: 40px !important;
    line-height: 40px !important;
    border: none !important;
    font-size: 10px;
  }
</style>
<style lang="scss" scoped>
  .el-scrollbar {
    background-color: var(--system-menu-background);
  }
  .layout-menu {
    width: 100%;
    border: 0px;
    &.collapse {
      margin-left: 0px;
    }
    :deep() {
      .el-menu-item div:nth-child(1) {
        padding-left: 5px !important;
      }
      .el-menu-item{
        padding-left: 5px !important;
      }
      .el-menu-item, .el-submenu {
        background-color: var(--system-menu-background) !important;
      }
      .el-menu-item i, .el-menu-item-group__title, .el-submenu__title i {
        font-size: 10px !important;
        color: var(--system-menu-text-color);
      }
      .el-menu-item, .el-submenu__title{
        height: 40px;
        line-height: 40px;
        padding: 0px;
        font-size: 10px !important;
        &.is-active {
          background-color: var(--system-primary-color) !important;
          color: var(--system-primary-text-color) !important;
          i {
            color: var(--system-primary-text-color) !important;
          }
          &:hover {
            background-color: var(--system-primary-color) !important;
            color: var(--system-primary-text-color) !important;
          }
        }
        &:hover {
          background-color: var(--system-menu-hover-background) !important;
        }
      }
      .el-submenu {
        .el-menu a{
          .el-menu-item{
            padding-left:20px !important;
            padding-right: 0px !important;
            font-size: 10px !important;
          }
        }
        &.is-active {
          >.el-submenu__title, >.el-submenu__title i {
            font-size: 10px !important;
            color: var(--system-menu-submenu-active-color) !important;
          }
        }
        .el-menu-item {
          background-color: var(--system-menu-children-background) !important;
          &.is-active {
            background-color: var(--system-primary-color) !important;
            color: var(--system-primary-text-color) !important;
            &:hover {
              background-color: var(--system-primary-color) !important;
              color: var(--system-primary-text-color) !important;
            }
          }
          &:hover {
            background-color: var(--system-menu-hover-background) !important;
          }
        }
      }
      .el-submenu {
        .el-submenu__title {
          padding-left: 5px !important;
          background-color: var(--system-menu-children-background) !important;
          &:hover {
            background-color: var(--system-menu-hover-background) !important;
          }
        }
      }
    }
  }
</style>