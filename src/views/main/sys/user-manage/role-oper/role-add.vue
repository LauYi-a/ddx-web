<template>
    <div class="operation">
        <div class="operation-top">
            <div class="pager-header-right">
                <div class="header-title-common">角色基本信息</div>
                <div class="pager-header">
                    <el-page-header content="角色列表" @back="goBack" >
                        <template #icon>
                            <el-icon><ArrowLeftBold /></el-icon>
                        </template>
                    </el-page-header>
                </div>
            </div>
            <div class="operation-top-form">
                <el-form  label-position="right"  :rules="rules" ref="ruleForm"  label-width="150px" :model="form.roleInfo">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="角色名称" prop="name">
                                <el-input v-model="form.roleInfo.name" size="mini" placeholder="输入角色名称" clearable />
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
        <div class="operation-bottom">
            <el-descriptions  class="margin-top" :column="1" size="small"  border  >
                <template #title>
                    <span class="desc-extra-title">角色权限信息</span>
                </template>
                <template #extra>
                    <el-row :gutter="10">
                        <el-col :span="12">
                            <el-select v-model="form.query.serviceKey" placeholder="选择服务模块" size="mini" style="width: 100%;">
                                <el-option v-for="item in form.serviceModulesName" :key="item.key"  :label="item.value" :value="item.key"  />
                            </el-select>
                        </el-col>
                        <el-col :span="12">
                            <el-input v-model="form.query.permissionKey" type="text" placeholder="请输入权限关键字"  clearable @clear="selectPermissionKey" @keyup.enter.native="selectPermissionKey">
                                <template #append>
                                    <div class="cell-item" @click="selectPermissionKey">
                                        <el-icon><Search /></el-icon>
                                    </div>
                                </template>
                            </el-input>
                        </el-col>
                    </el-row>
                </template>
                <el-descriptions-item label-class-name="permission-label">
                    <template #label>
                        <div class="cell-item">
                            <el-icon><Link /></el-icon>&nbsp;角色权限
                        </div><br>
                        <el-checkbox  v-model="form.checkAllPermission" :indeterminate="form.isIndeterminate" @change="handleCheckAllPermissionChange">全选权限</el-checkbox>
                    </template>
                    <el-checkbox-group v-model="form.roleInfo.rolePermissionId">
                        <el-checkbox v-for="permission in form.permissions" :key="permission.id" :label="permission.id" @change="handleCheckedPermissionChange">
                            <el-tag size="small" style="margin-bottom: 5px;margin-right: 5px" >
                                <span  v-for="(item, key) in form.serviceModulesName" :key="key"> {{item.key===permission.serviceModule? item.value:''}} </span>
                            </el-tag>
                            {{permission.name }}
                        </el-checkbox>
                    </el-checkbox-group>
                </el-descriptions-item>
            </el-descriptions>
        </div>
        <div class="affix-group-btns">
            <transition name="el-fade-in-linear">
                <img :src="ok" title="保存用户信息" style="width: 40px;height: 40px;cursor: pointer" @click="submit" v-show="form.isLoad"/>
            </transition>
        </div>
    </div>
</template>

<script>
import { defineComponent,ref, reactive,onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter,onBeforeRouteLeave } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import toolUtils from '@/utils/system/toolUtils'
import ok from "@/assets/images/add.png"
import api from '@/store/noCacheModules/index'
export default defineComponent({
    setup() {
        const ruleForm = ref(null);
        const store = useStore();
        const router = useRouter();
        const form = reactive({
            isSave:false,
            isLoad:true,
            checkAllPermission:false,
            isIndeterminate:false,
            permissions:[],
            permissions_copy:[],
            roleInfo: {
                name:"",
                rolePermissionId:[]
            },
            query:{
                permissionKey:'',
                serviceKey:store.state.user.services[0]
            },
            serviceModulesName: store.state.dict.sysDict.all.serviceModulesName

        });
        const rules = {
            name: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
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
                        if(form.roleInfo.rolePermissionId.length === 0){
                            toolUtils.sendNotification('请选择权限后进行保存','warning',3000);
                            return false;
                        }
                        form.isLoad = false;
                        api.role.roleAdd(form.roleInfo).then(res => {
                            toolUtils.sendNotification(res.msg,res.type,3000);
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
        //搜索
        const selectPermissionKey =()=>{
            if(form.permissions_copy.length>0){
                form.permissions = [];
                let permission_temp = [];
                form.permissions_copy.filter(function (item) {
                    if (item.serviceModule.indexOf(form.query.serviceKey) !=-1) {
                        permission_temp.push(item)
                    }
                });
                if (form.query.permissionKey !== ""){
                    permission_temp.filter(function (item) {
                        if (item.name.indexOf(form.query.permissionKey) !=-1 ||
                            item.url.indexOf(form.query.permissionKey) !=-1) {
                            form.permissions.push(item)
                        }
                    })
                }else{
                    form.permissions = permission_temp;
                }
            }else{
                toolUtils.sendNotification('无权限可搜索','warning',3000);
            }
        };
        /**
         * 选择全部权限
         */
        const handleCheckAllPermissionChange = () =>{
            if (form.checkAllPermission){
                form.roleInfo.rolePermissionId = [];
                form.permissions_copy.forEach(e =>{
                    form.roleInfo.rolePermissionId.push(e.id)
                });
            }else{
                form.roleInfo.rolePermissionId = [];
            }
            form.checkAllPermission =  form.roleInfo.rolePermissionId.length === form.permissions_copy.length;
            form.isIndeterminate = form.roleInfo.rolePermissionId.length > 0 && form.roleInfo.rolePermissionId.length !== form.permissions_copy.length;
        };
        /**
         * 选择权限
         */
        const handleCheckedPermissionChange = () =>{
            form.checkAllPermission =  form.roleInfo.rolePermissionId.length === form.permissions_copy.length;
            form.isIndeterminate = form.roleInfo.rolePermissionId.length > 0 && form.roleInfo.rolePermissionId.length !== form.permissions_copy.length;
        };
        /**
         * 查询所有权限
         */
        const selectPermissionAll = () =>{
            let queryPermission = {
                isRole:'0'
            };
            api.permission.selectPermissionAll(queryPermission).then(res => {
                form.permissions_copy = res.data;
                selectPermissionKey();
            })
        };
        // 组件挂载到页面之后执行
        onMounted(() => {
           selectPermissionAll()
        });
        return{
            ok,
            form,
            ruleForm,
            rules,
            goBack,
            submit,
            selectPermissionKey,
            handleCheckedPermissionChange,
            handleCheckAllPermissionChange
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
    .operation-top {
        height: 120px;
        margin: 5px 5px 0px 5px;
        min-height: 120px;
        overflow-y: auto;
        .operation-top-form{
            width: 100%;
            height:  calc(100% - 70px);
            overflow-y: auto;
            &::-webkit-scrollbar {
                display: none;
                width: 6px;
            }
            &::-webkit-scrollbar-thumb {
                border-radius: 10px;
                background: rgba(144, 147, 153, 0.3);
            }
        }
    }
    .operation-bottom{
        height: calc(100%);
        margin: 5px 5px 5px 5px;
        min-height: 350px;
        overflow-y: auto;
        :deep() {
            .el-descriptions__header{
                .el-descriptions__title{
                    color: var(--system-page-color);
                }
                .el-input-group__append{
                    cursor:pointer;
                    background:var(--system-container-background);
                    color: var(--system-page-tip-color);
                    border-color: var(--system-page-border-color);
                }
                .el-input{
                    .el-input__inner{
                        background:var(--system-container-background);
                        color: var(--system-page-tip-color);
                        border-color: var(--system-page-border-color);
                    }
                }
                margin-bottom: 10px;
            }
            .el-descriptions__body{
                .is-bordered{
                    .el-descriptions__label{
                        background:var(--system-container-background);
                        color: var(--system-page-tip-color);
                        border-color: var(--system-page-border-color);
                    }
                    .el-descriptions__content{
                        background:var(--system-container-main-background);
                        color: var(--system-page-color);
                        border-color: var(--system-page-border-color);
                    }
                    .el-input{
                        width: 150px;
                        height: 25px;
                        font-size: 9px;
                        display: flex;
                        align-items: center;
                        .el-input__inner{
                            height: 25px;
                            width: 150px;
                            font-size: 9px;
                            display: flex;
                            align-items: center;
                            background: var(--system-container-background);
                            color:var(--system-page-tip-color);
                            border-color: var(--system-page-border-color);
                        }
                        .el-input__suffix{
                            font-size: 9px;
                            display: flex;
                            align-items: center;
                        }
                    }
                }
            }
            .permission-label{
                width: 130px;
            }
        }
    }
    &::-webkit-scrollbar {
        display: none;
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(144, 147, 153, 0.3);
    }
    .operation-top,.operation-bottom{
        background-color: var(--system-container-main-background);
        color: var(--system-page-color);
        padding: 5px;
    }
}
</style>