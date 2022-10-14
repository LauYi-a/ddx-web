<template>
    <div class="table-body-tbs">
        <div class="flex-box">
            <div class="table-body-top">
                <div class="table-body-left" v-bind:style="{ '--left-size' : form.leftSize }">
                    <div class="table-content">
                        <el-table :data="form.tableData"
                                  v-loading="form.tableLoading"
                                  element-loading-background="rgba(0,0,0,0.3)"
                                  element-loading-text="正在加载数据..."
                                  table-layout="auto" style="width: 100%" max-height="580">
                            <el-table-column prop="name" label="权限名称" width="150" show-overflow-tooltip />
                            <el-table-column prop="url" label="权限路由" show-overflow-tooltip />
                            <el-table-column prop="serviceModule" label="所属模块" width="120" :formatter="serviceFormatter"/>
                            <el-table-column prop="isRole" label="是否授权角色" width="100" show-overflow-tooltip :formatter="isRolePermissionFormatter"/>
                            <el-table-column label="描述" width="140" show-overflow-tooltip :formatter="isRolePermissionDescFormatter"/>
                            <el-table-column prop="createTime" label="创建时间" width="140" />
                            <el-table-column prop="updateTime" label="修改时间" width="140"/>
                            <el-table-column label="操作" fixed="right" width="80" >
                                <template #default="scope">
                                    <el-dropdown trigger="click">
                                        <el-icon class="more-operation-icon"><MoreFilled /></el-icon>
                                        <template #dropdown>
                                            <el-dropdown-menu>
                                                <el-dropdown-item @click="handleToEditChange(scope.row)" v-has="'edit'"><el-icon><Edit /></el-icon> 编 辑 </el-dropdown-item>
                                            </el-dropdown-menu>
                                        </template>
                                    </el-dropdown>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="table-page">
                        <el-pagination
                                v-model:currentPage="form.query.page"
                                v-model:page-size="form.query.perPage"
                                v-model:total="form.total"
                                :page-sizes="[15, 20, 30, 40]"
                                :background="true"
                                layout="total,prev,pager,next,sizes"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                        ></el-pagination>
                    </div>
                </div>
                <div class="table-body-right animate__animated animate__headShake" v-bind:style="{ '--margin-left' : form.marginLeft,'--right-size' : form.rightSize,'--is-show' : form.display }">
                    <div class="right-select-header center">
                        <el-button type="primary" :loading="form.isSelectLoad" @click="handleSelectChange">查询</el-button>
                        <el-button  :loading="form.isClearLoad"  @click="handleClearChange" >重置</el-button>
                    </div>
                    <div class="right-select-body">
                        <el-form label-position="top"  label-width="100px" :modal="form.query" @keyup.enter.native="handleSelectChange">
                            <el-form-item label="权限名称">
                                <el-input v-model="form.query.name" size="mini" placeholder="请输入权限名称"  clearable />
                            </el-form-item>
                            <el-form-item label="权限路由">
                                <el-input v-model="form.query.url" size="mini" placeholder="请输入权限路由"  clearable />
                            </el-form-item>
                            <el-form-item label="所属模块">
                                <el-select v-model="form.query.serviceModule" placeholder="请选择所属模块" size="mini" clearable style="width: 100%;">
                                    <el-option v-for="item in form.serviceModule" :key="item.key"  :label="item.value" :value="item.key"  />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="是否授权角色" prop="isRole">
                                <el-select v-model="form.query.isRole" placeholder="请选择是否授权角色" size="mini" clearable style="width: 100%;">
                                    <el-option v-for="item in form.isRolePermission" :key="item.key"  :label="item.value" :value="item.key"  />
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="table-body-bottom">
                <el-button title="刷新权限缓存" type="primary" @click="handleRefreshCacheChange" v-has="'refreshCache'" :loading="form.isRefreshCacheLoad">刷新缓存</el-button>
                <img :src="closeImages" title="关闭搜索栏" @click="close(true)" v-if="!iconIsShow" style="width: 30px;height: 30px;cursor: pointer; margin-left: 8px" class="animate__animated animate__bounceIn"/>
                <img :src="openImages" title="打开搜索栏" @click="open(false)" v-if="iconIsShow" style="width: 30px;height: 30px;cursor: pointer; margin-left: 8px" class="animate__animated animate__bounceIn"/>
            </div>
        </div>
    </div>
    <div  v-dialogDrag >
        <el-dialog :model-value="form.editDialog" title="编辑权限" width="30%" @close="form.editDialog = false" :modal="false">
            <el-form  label-position="right" :rules="rules" ref="ruleForm"  label-width="140px" :model="form.update">
                <el-form-item label="权限名称" prop="name">
                    <el-input v-model="form.update.name" size="mini" placeholder="请输入权限名称"  clearable />
                </el-form-item>
                <el-form-item label="是否授权角色" prop="isRole">
                    <el-select v-model="form.update.isRole" placeholder="请选择是否授权角色" size="mini" clearable style="width: 100%;">
                        <el-option v-for="item in form.isRolePermission" :key="item.key"  :label="item.value" :value="item.key"  />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
            <span class="dialog-footer">
                <el-button @click="form.editDialog = false">取消</el-button>
                <el-button type="primary" @click="saveEdit" :loading="form.isSaveEdit">提交</el-button>
            </span>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { defineComponent,ref, reactive,onMounted } from 'vue'
import { useStore } from 'vuex'
import { formatterDictVal,formatterDictDesc} from '@/utils/sys/dictUtils'
import closeImages from "@/assets/images/colseSearch.png"
import openImages from "@/assets/images/openSearch.png"
import { sendNotification} from '@/utils/system/toolUtils'
export default defineComponent({
    setup() {
        const store = useStore();
        const ruleForm = ref(null);
        const iconIsShow = ref(false);
        const form = reactive({
            leftSize:'15%',
            rightSize:'85%',
            marginLeft:'5px',
            display:'hidden',
            isSelectLoad:false,
            isClearLoad:false,
            isRefreshCacheLoad:false,
            tableLoading:true,
            editDialog: false,
            isSaveEdit: false,
            total:0,
            query:{
                page:1,
                perPage:15,
                name:'',
                url:'',
                serviceModule:'',
                isRole:''
            },
            update:{
                id:'',
                name:'',
                isRole:''
            },
            serviceModule:store.state.dict.sysDict.all.serviceModulesName,
            isRolePermission:store.state.dict.sysDict.sys.isRolePermission,
            tableData:[]
        });
        const rules = {
            name: [{ required: true, message: '请输入权限名称', trigger: 'blur' }],
            isRole: [{ required: true, message: '请选择是否需要授权角色', trigger: 'blur' }],
        };
        //打开搜索栏
        const open = (value) =>{
            form.leftSize = '15%';
            form.rightSize = '85%';
            form.display = 'hidden';
            form.marginLeft = '5px';
            iconIsShow.value = value;
        };
        //关闭搜索栏
        const close = (value) =>{
            form.leftSize = '0%';
            form.rightSize = '100%';
            form.display = 'none';
            form.marginLeft = '0px';
            iconIsShow.value = value;
        };
        //是否授予角色 格式化
        const isRolePermissionDescFormatter = (row) =>{
            return formatterDictDesc(form.isRolePermission,row.isRole)
        };
        const isRolePermissionFormatter = (row) =>{
            return formatterDictVal(form.isRolePermission,row.isRole)
        };
        //服务名称格式化
        const serviceFormatter = (row) =>{
            return formatterDictVal(form.serviceModule,row.serviceModule)
        };
        // 组件挂载到页面之后执行
        onMounted(() => {
            selectDataList();
        });
        /**
         * 列表数据查询
         */
        const selectDataList = () => {
            store.dispatch('permission/selectPermissionList',form.query).then(res =>{
                form.tableData = res.data.resultData;
                form.query.page = res.data.currentPage;
                form.total = res.data.totalCount;
            }).finally(()=>{
                form.tableLoading = false;
                form.isSelectLoad = false;
                form.isClearLoad = false;
            })
        };
        /**
         * 编辑权限
         */
        const handleToEditChange = (row) =>{
            form.update.id = row.id;
            form.update.name = row.name;
            form.update.isRole = row.isRole;
            form.editDialog = true;
        };
        /**
         *  保存编辑
         */
        const saveEdit = () =>{
            if (ruleForm.value) {
                ruleForm.value.validate((valid) => {
                    if (valid) {
                        form.isSaveEdit = true;
                        store.dispatch('permission/editPermission',form.update).then(res =>{
                            sendNotification(res.msg,res.type,3000);
                            selectDataList();
                        }).finally(()=>{
                            form.editDialog = false;
                            form.isSaveEdit = false;
                        })
                    }else {
                        return false;
                    }
                });
            }
        };
        /**
         * 刷新缓存
         */
        const handleRefreshCacheChange = () =>{
            form.isRefreshCacheLoad = true;
            store.dispatch('permission/refreshCachePermission',form.query).then(res =>{
                sendNotification(res.msg,res.type,3000);
            }).finally(()=>{
                form.isRefreshCacheLoad = false;
            })
        };
        /**
         * 条件搜索
         */
        const handleSelectChange = () =>{
            form.query.page = 1;
            form.isSelectLoad = true;
            form.tableLoading = true;
            selectDataList();
        };
        /**
         * 重置搜索
         */
        const handleClearChange = () =>{
            form.query = {};
            form.query.page = 1;
            form.query.perPage = 15;
            form.isClearLoad = true;
            form.tableLoading = true;
            selectDataList();
        };
        /**
         * 分页操作方法
         * @param val
         */
        const handleSizeChange = (val) => {
            form.query.perPage = val;
            form.tableLoading = true;
            selectDataList();
        };
        const handleCurrentChange = (val) => {
            form.query.page = val;
            form.tableLoading = true;
            selectDataList();
        };
        return{
            form,
            ruleForm,
            rules,
            iconIsShow,
            closeImages,
            openImages,
            close,
            open,
            saveEdit,
            serviceFormatter,
            handleSelectChange,
            handleClearChange,
            handleSizeChange,
            handleCurrentChange,
            handleToEditChange,
            isRolePermissionFormatter,
            isRolePermissionDescFormatter,
            handleRefreshCacheChange,
        }
    }
})
</script>

<style lang="scss" scoped>

</style>