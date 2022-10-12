<template>
  <div class="container">
    <div class="box">
      <h1>{{ systemTitle }}</h1>
      <el-form class="form">
        <el-input
          size="large"
          v-model="form.username"
          placeholder="用户账号/手机号"
          type="text"
          maxlength="50"
        >
          <template #prepend>
            <i class="sfont system-xingmingyonghumingnicheng"></i>
          </template>
        </el-input>
        <el-input
          size="large"
          ref="password"
          v-model="form.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          maxlength="50"
          @keyup.enter.native="submit"
        >
          <template #prepend>
            <i class="sfont system-mima"></i>
          </template>
          <template #append>
            <i class="sfont password-icon" :class="passwordType ? 'system-yanjing-guan': 'system-yanjing'" @click="passwordTypeChange"></i>
          </template>
        </el-input>
        <el-button type="primary" @click="submit" @keyup.enter.native="submit" style="width: 100%;" size="medium" :loading="form.isLoad">{{form.loginTex}}</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import { systemTitle } from '@/config'
import { defineComponent, ref, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { addRoutes } from '@/router'
import { ElNotification } from 'element-plus'
import { sendNotification } from '@/utils/system/toolUtils'
export default defineComponent({
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const form = reactive({
      username: 'adminroot',
      password: '123456',
      client_id: 'ddx',
      client_secret: 'ddx-key',
      loginTex: '登录',
      isLoad: false,
      grant_type: 'password'
    });
    const passwordType = ref('password');
    const passwordTypeChange = () => {
      passwordType.value === '' ? passwordType.value = 'password' : passwordType.value = ''
    };
    const checkForm = () => {
      return new Promise((resolve, reject) => {
        if (form.name === '') {
          ElNotification.warning({
            message: '用户名不能为空',
            type: 'warning'
          });
          form.loginTex = '登录';
          form.isLoad = false;
          return;
        }
        if (form.password === '') {
          ElNotification.warning({
            message: '密码不能为空',
            type: 'warning'
          });
          form.loginTex = '登录';
          form.isLoad = false;
          return;
        }
        resolve(true)
      })
    };
    const submit = () => {
      form.loginTex = '登录中...';
      form.isLoad = true;
      checkForm().then(() => {
        let params = {
          username: form.username,
          password: form.password,
          client_id: form.client_id,
          client_secret: form.client_secret,
          grant_type: form.grant_type
        };
        let isOk = false;
        store.dispatch('user/login',params).then(res => {
          store.dispatch('user/getUserMenu',{userId: res.data.user_id,serviceModule:store.state.user.token.loginService}).then(() => {
            sendNotification(res.msg,res.type,2000);
            addRoutes()
            router.push(route.query.redirect || '/')
          }).finally( ()=>{
            form.loginTex = '登录';
            form.isLoad = false
          })
        }).catch(error =>{
          isOk = true;
        }).finally( ()=>{
          if (isOk) {
            form.loginTex = '登录';
            form.isLoad = false
          }
        })
      })
    };
    return {
      systemTitle,
      form,
      passwordType,
      passwordTypeChange,
      submit
    }
  }
})
</script>

<style lang="scss" scoped>
  .container {
    position: relative;
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right,#909399,#020202);
    .box {
      width: 500px;
      position: absolute;
      left: 50%;
      top: 50%;
      background: white;
      border-radius: 8px;
      transform: translate(-50%, -50%);
      height: 440px;
      overflow: hidden;
      h1 {
        margin-top: 80px;
        text-align: center;
      }
      .form {
        width: 80%;
        margin: 50px auto 15px;
        .el-input {
          margin-bottom: 20px;
        }
        .password-icon {
          cursor: pointer;
          color: #409EFF;
        }
      }
      .fixed-top-right {
        position: absolute;
        top: 10px;
        right: 10px;
      }
    }
  }
  @media screen and ( max-width: 750px ) {
    .container .box {
      width: 100vw;
      height: 100vh;
      box-shadow: none;
      left: 0;
      top: 0;
      transform: none;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      h1 {
        margin-top: 0;
      }
      .form {
        
      }
    }
  }
</style>