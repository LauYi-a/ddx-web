<template>
    <div class="full-body">
        <div class="flex-box">
            <div class="top-box">
                <el-descriptions  class="margin-top" title="角色基本信息" :column="3" size="small"  border  >
                    <template #title>
                        <span class="desc-extra-title">角色基本信息</span>
                    </template>
                    <template #extra>
                        <el-page-header content="角色列表" @back="goBack" >
                            <template #icon>
                                <el-icon><ArrowLeftBold /></el-icon>
                            </template>
                        </el-page-header>
                    </template>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item" >
                                <el-icon><User /></el-icon> &nbsp;角色名称
                            </div>
                        </template>
                        {{form.role.name}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item" >
                                <el-icon><ScaleToOriginal /></el-icon> &nbsp;角色编号
                            </div>
                        </template>
                        {{form.role.code}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item" >
                                <el-icon><Flag /></el-icon>> &nbsp;角色状态
                            </div>
                        </template>
                        <span v-for="(item, key) in form.roleStatus" :key="key" >
                             {{item.key===form.role.status? item.value:''}}
                        </span>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item" >
                                <el-icon><Timer /></el-icon> &nbsp;创建时间
                            </div>
                        </template>
                        {{form.role.createTime}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item" >
                                <el-icon><Timer /></el-icon> &nbsp;修改时间
                            </div>
                        </template>
                        {{form.role.updateTime}}
                    </el-descriptions-item>
                </el-descriptions>
            </div>
            <div class="bottom-box">
                <el-descriptions  class="margin-top" :column="1" size="small"  border  >
                    <template #title>
                        <span class="desc-extra-title">角色权限</span>
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
                            </div>
                        </template>
                        <div class="user-div-row">
                             <span v-for="(permission, id) in form.role.rolePermission" :key="id" class="user-el-tag">
                                 <el-tag size="small" style="margin-bottom: 5px;margin-right: 5px" >
                                     <span  v-for="(item, key) in form.serviceModulesName" :key="key"> {{item.key===permission.serviceModule? item.value:''}} </span>
                                     {{' | '+permission.name+'：'+permission.url}}
                                 </el-tag>
                            </span>
                            <div class="menu-empty-block-des">
                                <span v-if="form.role.rolePermission.length === 0">无权限</span>
                            </div>
                        </div>
                    </el-descriptions-item>
                </el-descriptions>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent,reactive,onUnmounted } from 'vue'
import { decrypt} from '@/utils/system/cryptoAES'
import { useRoute,useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { sendNotification } from '@/utils/system/toolUtils'
export default defineComponent({
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();
        const initRoleInfo = JSON.parse(decrypt(localStorage.getItem(route.query.key)) || '{}');
        const form = reactive({
            role:{
                name:initRoleInfo.name,
                code:initRoleInfo.code,
                status:initRoleInfo.status,
                createTime:initRoleInfo.createTime,
                updateTime:initRoleInfo.updateTime,
                rolePermission:initRoleInfo.rolePermission || [],
                rolePermission_copy:initRoleInfo.rolePermission || [],
            },
            roleStatus: store.state.dict.sysDict.sys.roleStatus,
            serviceModulesName: store.state.dict.sysDict.all.serviceModulesName,
            query:{
                permissionKey:'',
                serviceKey:store.state.dict.sysDict.all.serviceModulesName[0].key
            }
        });
        //返回
        const goBack = () =>{
            router.back()
        };
        //搜索
        const selectPermissionKey =()=>{
            if(form.role.rolePermission_copy.length>0){
                form.role.rolePermission = [];
                let rolePermission_temp = [];
                form.role.rolePermission_copy.filter(function (item) {
                    if (item.serviceModule.indexOf(form.query.serviceKey) !=-1) {
                        rolePermission_temp.push(item)
                    }
                });
                if (form.query.permissionKey !== ""){
                    rolePermission_temp.filter(function (item) {
                        if (item.name.indexOf(form.query.permissionKey) !=-1 ||
                            item.url.indexOf(form.query.permissionKey) !=-1) {
                            form.role.rolePermission.push(item)
                        }
                    })
                }else{
                    form.role.rolePermission = rolePermission_temp;
                }
            }else{
                sendNotification('无权限可搜索','warning',3000);
            }
        };
        //组件卸载之前执行的函数
        onUnmounted(() => {
            let roleKey = initRoleInfo.code+'_'+initRoleInfo.id;
            localStorage.removeItem(roleKey)
        });
        return {
            form,
            goBack,
            selectPermissionKey
        }
    }
})
</script>

<style lang="scss" scoped>
    .top-box,.bottom-box{
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
    .menu-empty-block-des{
        line-height: 450px;
        text-align: center;
        font-size: 15px;
        color: var(--system-page-tip-color);
        font-weight: 600;
    }
    .cell-item {
        display: flex;
        align-items: center;
    }
    .user-div-row{
        height: 450px;
        overflow: auto;
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
    .user-el-tag{
        cursor:pointer;
        width:100%;
    }
    .bottom-box{
        margin-top: 20px;
    }
</style>