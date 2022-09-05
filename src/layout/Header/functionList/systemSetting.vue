<template>
  <div title="系统参数设置" @click="drawerChange(true)">
    <i class="sfont system-shezhi"></i>
  </div>
  <div class="drawer-box">
    <el-drawer  title="系统参数设置"  v-model="drawer" size="330px" :show-close="false" direction="rtl">
      <h3>参数设置</h3>
      <div class="theme-box">
        <el-form  label-position="left"  :rules="rules" ref="ruleForm"  label-width="150px" :model="form.paramConfig"  style="max-width: 290px" >
            <el-space fill>
                <el-alert :closable="false" type="info"  show-icon v-if="isShowDesc">密码输入错误{{form.paramConfig.lpec}}次后账号进行锁定</el-alert>
                <el-form-item label="密码错误次数" prop="lpec">
                    <el-input v-model="form.paramConfig.lpec" size="mini" placeholder="输入密码错误次数" clearable >
                        <template #append>次</template>
                    </el-input>
                </el-form-item>
            </el-space>
            <el-space fill>
                <el-alert :closable="false" type="info"  show-icon  v-if="isShowDesc">输入密码错误{{form.paramConfig.lpec}}次账号锁定等待解锁时间</el-alert>
                <el-form-item label="密码错误锁定时间" prop="accountLockTime" size="mini" placeholder="输入密码错误锁定时间" clearable>
                    <el-input v-model="form.paramConfig.accountLockTime">
                        <template #append>秒</template>
                    </el-input>
                </el-form-item>
            </el-space>
            <el-space fill>
                <el-alert :closable="false" type="info"  show-icon  v-if="isShowDesc">账号登入{{form.paramConfig.accessTokenTime}}小时TOKEN失效需重新认证</el-alert>
                <el-form-item label="TOKEN有效期时间" prop="accessTokenTime" size="mini" placeholder="输入TOKEN有效期时间" clearable>
                    <el-input v-model="form.paramConfig.accessTokenTime">
                        <template #append>时</template>
                    </el-input>
                </el-form-item>
            </el-space>
            <el-space fill>
                <el-alert :closable="false" type="info"  show-icon  v-if="isShowDesc">每隔多少天刷新服务器所有TOKEN</el-alert>
                <el-form-item label="刷新TOKEN时间" prop="refreshTokenTime" size="mini" placeholder="输入刷新TOKEN时间" clearable>
                    <el-input v-model="form.paramConfig.refreshTokenTime">
                        <template #append>天</template>
                    </el-input>
                </el-form-item>
            </el-space>
            <el-space fill>
                <el-alert :closable="false" type="info"  show-icon  v-if="isShowDesc">每次请求同一接口间隔时间不能大于{{form.paramConfig.sysRequestTime}}秒</el-alert>
                <el-form-item label="HTTP请求间隔时间" prop="sysRequestTime" size="mini" placeholder="输入HTTP请求间隔时间" clearable>
                    <el-input v-model="form.paramConfig.sysRequestTime">
                        <template #append>秒</template>
                    </el-input>
                </el-form-item>
            </el-space>
        </el-form>
      </div>
        <el-button type="primary" @click="submit" :loading="form.isLoad">确认</el-button>
        <el-button @click="showDesc(true)" v-if="!isShowDesc">显示备注</el-button>
        <el-button @click="showDesc(false)" v-if="isShowDesc">隐藏备注</el-button>
        <el-button @click="close">取消</el-button>
    </el-drawer>
  </div>
</template>

<script>
import { defineComponent, ref,reactive } from 'vue'
import { useStore } from 'vuex'
import { sendNotification } from '@/utils/system/toolUtils'
export default defineComponent({
  setup() {
      const store = useStore();
      let drawer = ref(false);
      let isShowDesc = ref(true);
      const ruleForm = ref(null);
      const form = reactive({
         paramConfig:{
            lpec:'',
            accountLockTime:'',
            accessTokenTime:'',
            refreshTokenTime:'',
            sysRequestTime:''
         },
         isLoad:false
      });
      const rules = {
          lpec: [{ required: true, message: '请输入密码错误次数', trigger: 'blur' }],
          accountLockTime: [{ required: true, message: '请输入密码错误锁定时间', trigger: 'blur' }],
          accessTokenTime: [{ required: true, message: '请输入TOKEN有效时间', trigger: 'blur' }],
          refreshTokenTime: [{ required: true, message: '请输入TOKEN刷新时间', trigger: 'blur' }],
          sysRequestTime: [{ required: true, message: '请输入HTTP请求间隔时间', trigger: 'blur' }],
      };
      //打开弹窗查询系统参数配置
      const drawerChange = (value) => {
        drawer.value = value;
        store.dispatch('paramConfig/getSysParamConfig').then(res =>{
          form.paramConfig = res.data;
        })
      };
      //关闭弹窗
      const close =() =>{
          drawer.value = false;
      };
      const showDesc = (item) =>{
          isShowDesc.value = item;
      };
      //修改参数配置提交
      function submit() {
          if (ruleForm.value) {
              ruleForm.value.validate((valid) => {
                  if (valid) {
                      form.isLoad = true;
                      store.dispatch('paramConfig/updateParamConfig',form.paramConfig).then(res => {
                          sendNotification(res.msg,res.type,3000);
                      }).finally(()=>{
                          form.isLoad = false;
                      })
                  }else {
                      return false;
                  }
              });
          }
      }
      return {
          drawer,
          isShowDesc,
          rules,
          form,
          ruleForm,
          submit,
          close,
          showDesc,
          drawerChange,
      }
  }
})
</script>

<style lang="scss" scoped>
  i {
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
  h3 {
    margin-top: 40px;
    margin-bottom: 20px;
    color: var(--system-page-color);
    font-size: 14px;
    line-height: 22px;
    text-align: left;
    padding: 0 20px;
    &:first-child {
      margin-top: 0;
    }
  }

  .theme-box {
    text-align: left;
    padding-left: 20px;
    :deep() {
        //提示描述样式
        .el-alert{
            background-color: var(--system-container-background);
            i{
                margin-top: 5px;
                font-size: 16px;
            }
        }
    }
  }
  .drawer-box{
    :deep() {
      .el-drawer{
        background: var(--system-page-background);
      }
      .el-drawer__header{
        color: var(--system-page-color);
      }
      .list-item{
        color: var(--system-page-color);
      }
    }
  }
</style>