<template>
    <div class="full-body">
        <div class="flex-box">
            <div class="pager-header-right">
                <div class="header-title-common">编辑菜单基本信息</div>
                <div class="pager-header">
                    <el-page-header content="菜单列表" @back="goBack" >
                        <template #icon>
                            <el-icon><ArrowLeftBold /></el-icon>
                        </template>
                    </el-page-header>
                </div>
            </div>
            <div class="bottom-form-content">
                <el-form  label-position="right" :rules="rules" ref="ruleForm"  label-width="150px" :model="form.resourceInfo">
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="资源菜单名称" prop="resourceName">
                                <el-input v-model="form.resourceInfo.resourceName" type="text" placeholder="请输入资源菜单名称"  clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="排序号" prop="sort">
                                <el-input v-model="form.resourceInfo.sort" type="text" placeholder="请输入排序号"  clearable></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="是否缓存菜单" prop="cache">
                                <el-select v-model="form.resourceInfo.cache" placeholder="选择是否缓存菜单" size="mini" filterable clearable style="width: 100%;">
                                    <el-option v-for="item in form.menuCache" :key="item.key"  :label="item.value" :value="item.key"  />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-alert :closable="false" type="info" show-icon>
                                <span v-for="item in form.menuCache">{{form.resourceInfo.cache === item.key?item.desc:'' }}</span>
                            </el-alert>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="是否显示标签" prop="hideTabs">
                                <el-select v-model="form.resourceInfo.hideTabs" placeholder="选择是否显示标签" size="mini" filterable clearable style="width: 100%;">
                                    <el-option v-for="item in form.menuHideTabs" :key="item.key"  :label="item.value" :value="item.key"  />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-alert :closable="false" type="info" show-icon>
                                <span v-for="item in form.menuHideTabs">{{form.resourceInfo.hideTabs === item.key?item.desc:'' }}</span>
                            </el-alert>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="是否关闭标签" prop="hideClose">
                                <el-select v-model="form.resourceInfo.hideClose" placeholder="选择是否关闭标签" size="mini" filterable clearable style="width: 100%;">
                                    <el-option v-for="item in form.menuHideClose" :key="item.key"  :label="item.value" :value="item.key"  />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-alert :closable="false" type="info" show-icon>
                                <span v-for="item in form.menuHideClose">{{form.resourceInfo.hideClose === item.key?item.desc:'' }}</span>
                            </el-alert>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="8">
                            <el-form-item label="是否隐藏菜单" prop="hideMenu">
                                <el-select v-model="form.resourceInfo.hideMenu" placeholder="选择是否隐藏菜单" size="mini" filterable clearable style="width: 100%;">
                                    <el-option v-for="item in form.menuHide" :key="item.key"  :label="item.value" :value="item.key"  />
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="9">
                            <el-alert :closable="false" type="info" show-icon>
                                <span v-for="item in form.menuHide">{{form.resourceInfo.hideMenu === item.key?item.desc:'' }}</span>
                            </el-alert>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>
        <div class="affix-group-btns">
            <transition name="el-fade-in-linear">
                <img :src="ok" title="保存菜单信息" style="width: 40px;height: 40px;cursor: pointer" @click="submit" v-show="form.isLoad"/>
            </transition>
        </div>
    </div>
</template>

<script>
import { defineComponent,ref, reactive,onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter,useRoute,onBeforeRouteLeave } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { decrypt} from '@/utils/system/cryptoAES'
import { sendNotification } from '@/utils/system/toolUtils'
import ok from "@/assets/images/ok.ico"
export default defineComponent({
    setup() {
        const ruleForm = ref(null);
        const store = useStore();
        const router = useRouter();
        const route = useRoute();
        const initResourceInfoInfo = JSON.parse(decrypt(localStorage.getItem(route.query.key)) || '{}');
        const form = reactive({
            isSave:false,
            isLoad:true,
            isIndeterminate:false,
            checkAllPermission:false,
            permissions:[],
            permissions_copy:[],
            resourceInfo: {
                id:initResourceInfoInfo.id,
                sort:initResourceInfoInfo.sort,
                resourceName:initResourceInfoInfo.resourceName,
                cache:initResourceInfoInfo.cache,
                hideTabs:initResourceInfoInfo.hideTabs,
                hideClose:initResourceInfoInfo.hideClose,
                hideMenu:initResourceInfoInfo.hideMenu
            },
            menuCache:store.state.dict.sysDict.sys.menuCache,
            menuHideClose:store.state.dict.sysDict.sys.menuHideClose,
            menuHide:store.state.dict.sysDict.sys.menuHide,
            menuHideTabs:store.state.dict.sysDict.sys.menuHideTabs,
            serviceModulesName: store.state.dict.sysDict.all.serviceModulesName
        });
        const rules = {
            resourceName: [{ required: true, message: '请输入资源菜单名单', trigger: 'blur' }],
            sort: [{ required: true, message: '请输入排序号', trigger: 'blur' }],
            cache: [{ required: true, message: '请选择是否缓存菜单', trigger: 'blur' }],
            hideTabs: [{ required: true, message: '请选择是否显示标签', trigger: 'blur' }],
            hideClose: [{ required: true, message: '请选择是否关闭标签', trigger: 'blur' }],
            hideMenu: [{ required: true, message: '请选择是否隐藏菜单', trigger: 'blur' }],
        };
        //返回
        const goBack = () =>{
            ElMessageBox.confirm( '当前编辑数据还未保存，确定需要返回吗？','返回提醒',{
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
                ElMessageBox.confirm( '当前编辑数据还未保存，确定需要离开吗？','离开提醒',{
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
                        store.dispatch('resource/resourceEdit',form.resourceInfo).then(res => {
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
        //组件卸载之前执行的函数
        onUnmounted(() => {
            localStorage.removeItem(route.query.key)
        });
        return {
            ok,
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