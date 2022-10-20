<template>
  <Layer :layer="layer" @confirm="submit" ref="layerDom">
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="120px" style="margin-right:30px;">
        <el-form-item label="用户名：" prop="name">
            {{nickname}}
        </el-form-item>
        <el-form-item label="原密码：" prop="oldPassword">
            <el-input v-model="form.oldPassword" placeholder="请输入原密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="newPassword">
            <el-input v-model="form.newPassword" placeholder="请输入新密码" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="newPasswordYes">
            <el-input v-model="form.newPasswordYes" placeholder="请确认新密码" show-password></el-input>
        </el-form-item>
    </el-form>
  </Layer>
</template>

<script>
import { defineComponent,computed, ref } from 'vue'
import toolUtils from '@/utils/system/toolUtils'
import { useStore } from 'vuex'
import Layer from '@/components/layer/index.vue'
import api from '@/store/noCacheModules/index'
export default defineComponent({
  components: {
    Layer
  },
  props: {
    layer: {
      type: Object,
      default: () => {
        return {
          show: false,
          title: '',
          showButton: true
        }
      }
    }
  },
  setup(props, ctx) {
    const ruleForm = ref(null)
    const layerDom = ref(null)
    const store = useStore()
    const nickname = computed(() => store.state.user.token.nickname)
    let form = ref({
        userId: store.state.user.token.user_id,
        oldPassword: '',
        newPassword: '',
        newPasswordYes: ''
    });
    const rules = {
      oldPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
      newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
      newPasswordYes: [{ required: true, message: '请输入确认新密码', trigger: 'blur' }],
    };
    function submit() {
      if (ruleForm.value) {
        ruleForm.value.validate((valid) => {
          if (valid) {
            let params = {
              id: form.value.userId,
              oldPassword: form.value.oldPassword,
              newPassword: form.value.newPassword,
              newPasswordYes: form.value.newPasswordYes
            };
            api.user.passwordChange(params).then(res => {
                toolUtils.sendNotification(res.msg,res.type,3000);
                layerDom.value && layerDom.value.close()
                setTimeout(() => {
                    api.user.loginOut()
                }, 2000)
            })
          } else {
            return false;
          }
        });
      }
    }
    return {
      form,
      rules,
      nickname,
      layerDom,
      ruleForm,
      submit
    }
  }
})
</script>

<style lang="scss" scoped>
  
</style>