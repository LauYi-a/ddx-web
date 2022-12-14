<template>
    <div class="operation">
        <div class="operation-top">
            <div class="pager-header-right">
                <div class="header-title-common">平台基本信息</div>
                <div class="pager-header">
                    <el-page-header content="平台用户列表" @back="goBack" >
                        <template #icon>
                            <el-icon><ArrowLeftBold /></el-icon>
                        </template>
                    </el-page-header>
                </div>
            </div>
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
                                           clearable filterable multiple collapse-tags reserve-keyword style="width: 100%;">
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
            <el-tabs v-model="form.activeTabName" class="demo-tabs" tab-position="left" @tab-click="handleTabsClick">
                <el-tab-pane v-for="item in form.resourceList" :label="item.serviceName" :name="item.serviceCode">
                    <div class="tab-tree-body">
                        <el-tree
                                :data="item.treeMenuVo"
                                show-checkbox
                                node-key="id"
                                :expand-on-click-node="false"
                                :check-on-click-node="true"
                                check-strictly="true"
                                default-expand-all="true"
                                @check="tabsTreeCurrentChecked"
                        ></el-tree>
                    </div>
                </el-tab-pane>
            </el-tabs>
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
            isLoad:true,
            roleList:[],
            isSave:false,
            isBack:false,
            activeTabName:"",
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
         * 选中的标签页
         */
        const handleTabsClick = (name) =>{
            form.activeTabName = name.props.name;
        };

        /**
         * 选中菜单节点
         */
        const tabsTreeCurrentChecked = (nodeObj, SelectedObj) =>{
            form.userInfo.resourceIds = SelectedObj.checkedKeys;
        };

        /**
         * 提交保存
         */
        function submit() {
            if (ruleForm.value) {
                ruleForm.value.validate((valid) => {
                    if (valid) {
                        if(form.userInfo.resourceIds.length === 0){
                            toolUtils.sendNotification('请选择菜单后进行保存','warning',3000);
                            return false;
                        }
                        form.isLoad = false;
                        api.user.userAdd(form.userInfo).then(res => {
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
        /**
         * 查询所有角色键值
         */
        const selectRoleKyeAndValAll = () => {
            api.role.selectRoleKyeAndValAll().then(res => {
                form.roleList = res.data;
            })
        };
        /**
         * 查询资源菜单树
         */
        const selectMenuTree = () =>{
            api.resource.selectMenuTree().then(res => {
                form.resourceList = res.data;
                form.activeTabName = res.data[0].serviceCode;
            })
        };
        // 组件挂载到页面之后执行
        onMounted(() => {
            selectRoleKyeAndValAll();
            selectMenuTree();
        });
        return {
            ok,
            form,
            ruleForm,
            submit,
            goBack,
            handleTabsClick,
            tabsTreeCurrentChecked,
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
        min-height: 185px;
        .operation-top-form{
            width: 100%;
            height:  calc(100% - 75px);
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
        height: calc(100% - 200px);
        margin: 5px 5px 5px 5px;
        min-height: 300px;
        overflow-y: auto;
        .demo-tabs{
            height:  calc(100% - 60px);
            overflow-y: auto;
            .tab-tree-body{
                height: 400px;
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
            :deep(){
                .el-tabs__content{
                    height:  calc(100% - 10px) !important;
                }
            }
        }
    }
    .operation-top,.operation-bottom,.demo-tabs{
        background-color: var(--system-container-main-background);
        color: var(--system-page-color);
        padding: 5px;
    }
    &::-webkit-scrollbar {
        display: none;
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background: rgba(144, 147, 153, 0.3);
    }
}
</style>