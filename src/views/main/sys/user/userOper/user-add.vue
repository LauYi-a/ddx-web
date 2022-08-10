<template>
    <div class="operation">
        <div class="operation-top">
            <el-page-header content="用户列表" @back="goBack" >
                <template #icon>
                    <el-icon><ArrowLeftBold /></el-icon>
                </template>
            </el-page-header>
            <div class="header-title-common">用户基本信息</div>
            <div class="operation-top-form">
                <el-form  label-position="right"  :rules="rules" ref="ruleForm"  label-width="150px" :model="form.userInfo">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="登入账号" prop="username">
                                <el-input v-model="form.userInfo.username" size="mini" placeholder="输入登入账号" clearable />
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="账号名称" prop="nickname">
                                <el-input v-model="form.userInfo.nickname" size="mini" placeholder="输入账号名称" clearable/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="手机号" prop="mobile">
                                <el-input v-model="form.userInfo.mobile" size="mini" placeholder="输入手机号" clearable/>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="邮箱号" prop="email">
                                <el-input v-model="form.userInfo.email" size="mini" placeholder="输入邮箱号" clearable/>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="性别" prop="gender">
                                <el-select v-model="form.userInfo.gender" placeholder="选择性别" size="mini" clearable style="width: 100%;">
                                    <el-option v-for="item in form.genders" :key="item.key"  :label="item.value" :value="item.key"  />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="角色" prop="roleIds">
                                <el-select v-model="form.userInfo.roleIds" placeholder="选择角色" size="mini"
                                           clearable filterable multiple collapse-tags collapse-tags-tooltip style="width: 100%;">
                                    <el-option v-for="item in form.roleList" :key="item.id"  :label="item.name" :value="item.id"  />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
        <div class="operation-bottom">
            <div class="header-title-common">菜单资源信息</div>
        </div>
        <div class="affix-group-btns">
            <el-button title="保存用户信息" type="primary" @click="submit" :loading="form.isLoad" circle ><el-icon><Finished /></el-icon></el-button>
        </div>
    </div>
</template>

<script>
import { defineComponent,ref, reactive,onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { sendNotification } from '@/utils/system/toolUtils'
export default defineComponent({
    setup() {
        const ruleForm = ref(null);
        const store = useStore();
        const router = useRouter();
        const form = reactive({
            userInfo: {
                username:"",
                nickname:"",
                mobile:"",
                email:"",
                gender:"",
                roleIds:[],
                resourceIds:[]
            },
            genders: store.state.dict.sysDict.sys.userGender,
            isLoad:false,
            roleList:[],
            resourceList:[]
        });
        const rules = {
            username: [{ required: true, message: '请输入登入账号', trigger: 'blur' }],
            nickname: [{ required: true, message: '请输入账号名称', trigger: 'blur' }],
            mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
            email: [{ required: true, message: '请输入邮箱号', trigger: 'blur' }],
            gender: [{ required: true, message: '请选择性别', trigger: 'blur' }],
            roleIds: [{ required: true, message: '请选择角色', trigger: 'blur' }],
        };
        //返回
        const goBack = () =>{
            router.back()
        };
        function submit() {
            if (ruleForm.value) {
                ruleForm.value.validate((valid) => {
                    if (valid) {
                        form.isLoad = true;
                        store.dispatch('',form.userInfo).then(res => {
                            sendNotification(res.msg,res.type,3000);
                        }).finally(()=>{
                            form.isLoad = false;
                        })
                    }else {
                        return false;
                    }
                });
            }
        };
        /**
         * 查询所有角色键值
         */
        const selectRoleKyeAndValAll = () => {
            store.dispatch('role/selectRoleKyeAndValAll',form.query).then(res => {
                form.roleList = res.data;
            })
        };
        /**
         * 查询所有系统菜单资源
         */
        const selectResourceList = () =>{
            store.dispatch('role/selectRoleKyeAndValAll',form.query).then(res => {
                form.resourceList = res.data;
            })
        };
        // 组件挂载到页面之后执行
        onMounted(() => {
            selectRoleKyeAndValAll();
            selectResourceList();
        });
        return {
            form,
            ruleForm,
            submit,
            goBack,
            rules
        }
    }
})
</script>

<style lang="scss" scoped>
.operation{
    width: 100%;
    height: 100%;
    display: flex;
    overflow-y: auto;
    flex-direction: column;
    box-sizing: border-box;
    .operation-top{
        height: 185px;
        margin: 5px 5px 0px 5px;
        overflow-y: auto;
        .operation-top-form{
            width: 100%;
        }
    }
    .operation-bottom{
        height: calc(100% - 200px);
        margin: 5px 5px 5px 5px;
        overflow-y: auto;
    }
    .operation-top,.operation-bottom{
        background-color: var(--system-container-main-background);
        color: var(--system-page-color);
        padding: 5px;
        width: calc(100% - 20px);
        &::-webkit-scrollbar {
            display: none;
            width: 6px;
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            background: rgba(144, 147, 153, 0.3);
        }
        //鼠标悬浮显示滚动条
        &:hover {
            &::-webkit-scrollbar {
                display: block;
            }
            &::-webkit-scrollbar-thumb {
                border-radius: 10px;
                background: rgba(144, 147, 153, 0.3);
                &:hover {
                    background: rgba(144, 147, 153, 0.5);
                }
            }
        }
    }

}
</style>