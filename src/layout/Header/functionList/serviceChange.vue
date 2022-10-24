<template>
  <div title="切换应用服务" class="load-service">
    <el-dropdown size="medium" trigger="click" @visible-change="handleOpen">
    <span class="el-dropdown-link">
      <el-icon class="header-icon"><MostlyCloudy /></el-icon>
    </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item v-for="item in form.services"  :key="item.key" @click="handleCommand(item)">
            {{item.value }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { addRoutes } from '@/router'
import { useStore } from 'vuex'
import { useRouter} from 'vue-router'
import { ElLoading } from 'element-plus'
export default defineComponent({
  setup() {
    const router = useRouter();
    const store = useStore();
    const form = reactive({
      serviceModules:[],
      services:[],
      menusChange: [],  // 用户菜单
      menuElChange: [], // 用户菜单元素
      servicesChange:[] // 用户所有服务
    });
    //加载系统字典键值
    const handleOpen = () => {
      form.services = [];
      form.serviceModules = store.getters['dict/sysDict'].all.serviceModulesName;
      form.serviceModules .forEach(item => {
        store.state.user.services.forEach(s =>{
          if (item.key === s){
            form.services.push(item)
          }
        })
      });
    };
    //点击服务切换菜单
    const handleCommand = (item) => {
      ElLoading.service({
        lock: true,
        text: '正在切换应用服务...',
        background: '#fff',
      });
      form.menusChange = store.getters['user/menus'];
      form.menuElChange = store.getters['user/menuEl'];
      form.servicesChange = store.getters['user/services'];
      localStorage.removeItem('tabs');
      store.commit('user/menuElChange', []);
      store.commit('user/menusChange', []);
      store.commit('user/servicesChange', []);
      store.dispatch('user/getUserMenu',{userId: store.state.user.token.user_id,serviceModule:item.key}).then(res => {
        addRoutes()
        router.replace(res.data.treeMenu[0].redirect);
      }).catch(error => {
        store.commit('user/menuElChange', form.menuElChange);
        store.commit('user/menusChange',form.menusChange );
        store.commit('user/servicesChange', form.servicesChange);
      }).finally(()=>{
        setTimeout(() => {
          router.go(0);
        },500)
      })

    };
    return {
      form,
      handleOpen,
      handleCommand
    }
  }
})
</script>

<style lang="scss" scoped>
  .load-service{
    display: flex;
    align-items: center;
    :deep(){
      .el-loading-mask{
        .el-loading-spinner{
          .el-loading-text{
            color: #ffffff;
          }
        }
        .el-loading-spinner i{
         font-size: 40px;
        }
      }
      .el-dropdown{
        .el-dropdown-link{
          .header-icon{
            font-size: 20px;
            display: flex;
            align-items: center;
          }
        }
      }
    }
  }
</style>