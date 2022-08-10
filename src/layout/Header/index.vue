<template>
  <header>
    <div class="left-box">
      <!-- 收缩按钮 -->
      <div class="menu-icon" @click="opendStateChange">
        <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
      </div>
      <Breadcrumb />
    </div>
    <div class="right-box">
      <!-- 快捷功能按钮 -->
      <div class="function-list">
        <div class="function-list-item hidden-sm-and-down"><Full-screen /></div>
        <div class="function-list-item"><ServiceChange /></div>
        <div class="function-list-item hidden-sm-and-down"><Theme /></div>
        <div class="function-list-item" v-if="isBut"><SystemSetting /></div>
      </div>
      <!-- 用户信息 -->
      <div class="user-info" title="用户信息">
        <el-dropdown  trigger="click">
          <span class="el-dropdown-link">
            {{nickname}}
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="showPasswordLayer">修改密码</el-dropdown-item>
              <el-dropdown-item @click="showUserInfo">个人中心</el-dropdown-item>
              <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
      <PasswordLayer :layer="layer" v-if="layer.show" />
    </div>
  </header>
</template>

<script>
import { defineComponent, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import FullScreen from './functionList/fullscreen.vue'
import SystemSetting from './functionList/systemSetting.vue'
import ServiceChange from './functionList/serviceChange.vue'
import Theme from './functionList/theme.vue'
import Breadcrumb from './Breadcrumb.vue'
import PasswordLayer from './passwordLayer.vue'
import { useRouter } from 'vue-router'
import { ElLoading } from 'element-plus'
import { decrypt} from '@/utils/system/cryptoAES'
export default defineComponent({
  components: {
    FullScreen,
    Breadcrumb,
    SystemSetting,
    ServiceChange,
    Theme,
    PasswordLayer
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const layer = reactive({
      show: false,
      showButton: true
    })
    const isCollapse = computed(() => store.state.app.isCollapse);
    const nickname = computed(() => store.state.user.token.nickname);
    const menuEl = JSON.parse(decrypt(localStorage.getItem("vuex"))).user.menuEl || {};
    // isCollapse change to hide/show the sidebar
    const opendStateChange = () => {
      store.commit('app/isCollapseChange', !isCollapse.value)
    };
    //判断用户是否有系统参数设置按钮权限
    const isBut = computed(() =>{
      let authCode = [];
      menuEl.forEach(m => {
        if (m.elValue.includes('param_config')) {
          return authCode = m.elValue
        }
      });
      return authCode.length > 0 ? true:false
    });
    const showUserInfo = () => {
      router.push('/sys/user/center')
    };

    // login out the system
    const loginOut = () => {
      ElLoading.service({
        lock: true,
        text: '正在退出系统...',
        background: 'rgba(0,0,0,0.3)',
      });
      store.dispatch('user/loginOut')
    };
    
    const showPasswordLayer = () => {
      layer.show = true
    };
    return {
      isCollapse,
      nickname,
      layer,
      isBut,
      opendStateChange,
      loginOut,
      showUserInfo,
      showPasswordLayer
    }
  }
})
</script>

<style lang="scss" scoped>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    background-color: var(--system-header-background);
    padding-right: 22px;
  }
  .left-box {
    height: 100%;
    display: flex;
    align-items: center;
    .menu-icon {
      width: 40px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      font-weight: 100;
      cursor: pointer;
      margin-right: 10px;
      &:hover {
        background-color: var(--system-header-item-hover-color);
      }
      i {
        color: var(--system-header-text-color);
      }
    }
  }
  .right-box {
    display: flex;
    justify-content: center;
    align-items: center;
    .function-list{
      display: flex;
      .function-list-item {
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor:pointer;
        :deep(i) {
          color: var(--system-header-text-color);
        }
      }
    }
    .user-info {
      margin-left: 20px;
      .el-dropdown-link {
        cursor:pointer;
        color: var(--system-header-breadcrumb-text-color);
      }
    }
  }
</style>