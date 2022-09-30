<template>
    <div class="full-body">
        <div class="flex-box">
            <div class="pager-header-right">
                <div class="header-title-common">白名单信息</div>
                <div class="pager-header">
                    <el-page-header content="白名单列表" @back="goBack" >
                        <template #icon>
                            <el-icon><ArrowLeftBold /></el-icon>
                        </template>
                    </el-page-header>
                </div>
            </div>
            <div class="bottom-form-content">
                <el-form  label-position="right" :rules="rules" ref="ruleForm"  label-width="150px" :model="form.whitelistInfo">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="白名单类型" prop="type">
                                <el-select v-model="form.whitelistInfo.type" placeholder="选择权限" size="mini" filterable clearable style="width: 100%;">
                                    <el-option v-for="item in form.whitelistType" :key="item.key"  :label="item.value" :value="item.key"  />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-alert :closable="false" type="info" show-icon v-if="form.whitelistInfo.type">
                                <span v-for="item in form.whitelistType">{{form.whitelistInfo.type === item.key?item.desc:'' }}</span>
                            </el-alert>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="白名单权限">
                                <el-select v-model="form.permissionVal" placeholder="选择权限" size="mini" filterable clearable style="width: 100%;" @clear="clearPermissionVal" @change="handleSelectionWhitelist">
                                    <el-option v-for="item in form.permissions" :key="item.id"  :label="item.name" :value="item.id"  />
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="9" style="text-align: left">
                            <el-form-item label="白名单名称" prop="name">
                                {{form.whitelistInfo.name}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24" style="text-align: left">
                            <el-form-item label="白名单路由" prop="url">
                                {{form.whitelistInfo.url}}
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" style="text-align: left">
                            <el-form-item label="所属服务模块" prop="serviceModule">
                                <span v-for="item in form.serviceModulesName">{{form.whitelistInfo.serviceModule == item.key?item.value:''}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>

        </div>
        <div class="affix-group-btns">
            <transition name="el-fade-in-linear">
                <img :src="ok" title="保存白名单信息" style="width: 40px;height: 40px;cursor: pointer" @click="submit" v-show="form.isLoad"/>
            </transition>
        </div>
    </div>
</template>

<script>
import { defineComponent,ref, reactive,onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter,onBeforeRouteLeave } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { sendNotification } from '@/utils/system/toolUtils'
import ok from "@/assets/images/add.png"
export default defineComponent({
    setup() {
        const ruleForm = ref(null);
        const store = useStore();
        const router = useRouter();
        const form = reactive({
            isSave:false,
            isLoad:true,
            whitelistInfo:{
                name:'',
                url:'',
                type:'',
                serviceModule:''
            },
            permissionVal:'',
            permissions:[],
            whitelistType:store.state.dict.sysDict.sys.whitelistType,
            serviceModulesName: store.state.dict.sysDict.all.serviceModulesName
        });
        const rules = {
            name: [{ required: true, message: '请输入白名单名称', trigger: 'blur' }],
            url: [{ required: true, message: '请输入白名单路由', trigger: 'blur' }],
            type: [{ required: true, message: '请输入白名单类型', trigger: 'blur' }],
            serviceModule: [{ required: true, message: '请输入白名单服务模块', trigger: 'blur' }]
        };
        //返回
        const goBack = () =>{
            ElMessageBox.confirm( '当前数据还未保存，确定需要返回吗？','返回提醒',{
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }).then(() => {
                form.isBack = true;
                router.back()
            }).catch(()=>{})
        };
        onBeforeRouteLeave((to, from,next) => {
            if (!form.isBack){
                ElMessageBox.confirm( '当前数据还未保存，确定需要离开吗？','离开提醒',{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    next();
                }).catch(()=>{})
            }else {
                next();
            }
            if(form.isSave){
                to.query  ={isAddOrEdit:form.isSave};
                next();
            }
        });
        /**
         * 提交保存
         */
        function submit() {
            if (ruleForm.value) {
                ruleForm.value.validate((valid) => {
                    if (valid) {
                        form.isLoad = false;
                        store.dispatch('whitelist/whitelistAdd',form.whitelistInfo).then(res => {
                            sendNotification(res.msg,res.type,3000);
                            form.isSave = true;
                            router.back();
                        }).finally(()=>{
                            form.isLoad = true;
                        })
                    }else {
                        return false;
                    }
                });
            }
        };
        /**
         * 选择权限
         */
        const handleSelectionWhitelist = (val) =>{
            form.permissions.forEach(e =>{
                if (e.id === val){
                    form.whitelistInfo={
                        name:e.name,
                        url:e.url.replace('POST:',''),
                        type:form.whitelistInfo.type,
                        serviceModule:e.serviceModule
                    }
                }
            })
        };
        /**
         * 清除选择权限
         */
        const clearPermissionVal = () =>{
            form.whitelistInfo={
                name:'',
                url:'',
                type:form.whitelistInfo.type,
                serviceModule:''
            }
        };
        /**
         * 查询所有权限
         */
        const selectPermissionAll = () =>{
            let queryPermission = {};
            store.dispatch('permission/selectPermissionAll',queryPermission).then(res => {
                form.permissions = res.data;
            })
        };
        // 组件挂载到页面之后执行
        onMounted(() => {
            selectPermissionAll();
        });
        return {
            ok,
            form,
            ruleForm,
            rules,
            goBack,
            submit,
            clearPermissionVal,
            handleSelectionWhitelist
        }
    }
})
</script>

<style lang="scss" scoped>
.bottom-form-content{
    margin-top: 2%;
    :deep() {
        .el-alert{
            background-color: var(--system-container-background);
            .el-alert__icon{
                font-size: 16px;
            }
            .el-alert__content{
                .el-alert__description{
                    margin: 0px;
                }
            }
        }
    }
}
</style>