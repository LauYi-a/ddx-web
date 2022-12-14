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
                                  @selection-change="handleSelectionChange"
                                  table-layout="auto" style="width: 100%" max-height="580">
                            <el-table-column type="selection" width="55" />
                            <el-table-column prop="code" label="角色编号" show-overflow-tooltip/>
                            <el-table-column prop="name" label="角色名称"/>
                            <el-table-column prop="roleType" label="角色类型" :formatter="roleTypeFormatter"/>
                            <el-table-column prop="defaultSelect" label="注册是否默认选择" :formatter="defaultSelectFormatter"/>
                            <el-table-column prop="status" label="角色状态" :formatter="formatter"/>
                            <el-table-column prop="createTime" label="创建时间"/>
                            <el-table-column prop="updateTime" label="修改时间"/>
                            <el-table-column label="操作" fixed="right" width="80" >
                                <template #default="scope">
                                    <el-dropdown trigger="click">
                                        <el-icon class="more-operation-icon"><MoreFilled /></el-icon>
                                        <template #dropdown>
                                            <el-dropdown-menu>
                                                <el-dropdown-item @click="handleToInfoChange(scope.row)" v-has="'info'"><el-icon><View /></el-icon> 详 情</el-dropdown-item>
                                                <el-dropdown-item @click="handleToEditChange(scope.row)" v-has="'edit'"><el-icon><Edit /></el-icon> 编 辑</el-dropdown-item>
                                                <el-dropdown-item @click="handleDeleteChange(scope.row.id)" v-has="'delete'"><el-icon><Delete /></el-icon> 删 除</el-dropdown-item>
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
                                :page-sizes="form.pageSizes"
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
                        <el-form label-position="top" label-width="100px" :modal="form.query" @keyup.enter.native="handleSelectChange">
                            <el-form-item label="角色名称">
                                <el-input v-model="form.query.name" size="mini" placeholder="请输入角色名称"  clearable />
                            </el-form-item>
                            <el-form-item label="角色编号">
                                <el-input v-model="form.query.code" size="mini" placeholder="请输入角色编号"  clearable />
                            </el-form-item>
                            <el-form-item label="角色状态">
                                <el-select v-model="form.query.status" placeholder="选择角色状态" size="mini" clearable style="width: 100%;">
                                    <el-option v-for="item in form.roleStatus" :key="item.key"  :label="item.value" :value="item.key"  />
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="table-body-bottom">
                <el-button title="新增信息" type="primary" @click="handleToAddChange" v-has="'create'">新增</el-button>
                <el-popconfirm title="确定是否需要批量删除选择的数据？" confirm-button-text="确定" cancel-button-text="取消" @confirm="handleBatchDeleteChange">
                    <template #reference>
                        <el-button title="批量删除" type="primary" :loading="form.isBatchDeleteLoad" v-has="'batch_delete'">批量删除</el-button>
                    </template>
                </el-popconfirm>
                <img :src="closeImages" title="关闭搜索栏" @click="close(true)" v-show="!iconIsShow" style="width: 30px;height: 30px;cursor: pointer; margin-left: 5px" class="animate__animated animate__bounceIn"/>
                <img :src="openImages" title="打开搜索栏" @click="open(false)" v-show="iconIsShow" style="width: 30px;height: 30px;cursor: pointer; margin-left: 5px" class="animate__animated animate__bounceIn"/>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent,ref, reactive,onMounted,watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { encrypt} from '@/utils/system/cryptoAES'
import dictUtils from '@/utils/sys/dictUtils'
import closeImages from "@/assets/images/colseSearch.png"
import openImages from "@/assets/images/openSearch.png"
import toolUtils from '@/utils/system/toolUtils'
import api from '@/store/noCacheModules/index'
export default defineComponent({
    name: 'role-list',
    setup() {
        const store = useStore();
        const router = useRouter();
        const iconIsShow = ref(false);
        const form = reactive({
            leftSize:store.state.app.tableSelect.leftSize,
            rightSize:store.state.app.tableSelect.rightSize,
            marginLeft:store.state.app.tableSelect.marginLeft,
            display:store.state.app.tableSelect.display,
            isSelectLoad:false,
            isBatchDeleteLoad:false,
            isClearLoad:false,
            tableLoading:true,
            roleStatus: store.state.dict.sysDict.sys.roleStatus,
            total:store.state.app.tableQuery.total,
            pageSizes:store.state.app.tableQuery.pageSizes,
            query:{
                page:store.state.app.tableQuery.page,
                perPage:store.state.app.tableQuery.perPage,
                name:'',
                code:'',
                status:''
            },
            multipleSelection:[],
            tableData:[]
        });
        //打开搜索栏
        const open = (value) =>{
            form.leftSize = store.state.app.tableSelect.leftSize;
            form.rightSize = store.state.app.tableSelect.rightSize;
            form.marginLeft = store.state.app.tableSelect.marginLeft;
            form.display = store.state.app.tableSelect.display;
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
        //表格格式化
        const formatter = (row) =>{
            return dictUtils.formatterDictVal(store.state.dict.sysDict.sys.roleStatus,row.status)
        };
        //是否默认选择
        const defaultSelectFormatter = (row) =>{
            return dictUtils.formatterDictVal(store.state.dict.sysDict.sys.defaultSelect,row.defaultSelect)
        };
        //角色状态
        const roleTypeFormatter = (row) =>{
            return dictUtils.formatterDictVal(store.state.dict.sysDict.sys.roleType,row.roleType)
        };
        //监听路由变化刷新列表
        watch(()=>router.currentRoute.value.query, (newValue) => {
            if(newValue.isAddOrEdit){
                selectDataList()
            }
        }, { immediate: true });
        // 组件挂载到页面之后执行
        onMounted(() => {
            selectDataList();
        });
        /**
         * 列表数据查询
         */
        const selectDataList = () => {
            api.role.selectPageRoleList(form.query).then(res =>{
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
         * 表格多选框
         */
        const handleSelectionChange = (val) =>{
            form.multipleSelection = toolUtils.arrayIdList(val,'id');
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
        /**
         * 批量删除
         */
        const handleBatchDeleteChange = () =>{
            form.isBatchDeleteLoad = toolUtils.validationMultipleSelection(form.multipleSelection);
            if (form.isBatchDeleteLoad) {
                api.role.batchDeleteRoleInfoByIds({keyWords:form.multipleSelection}).then(res =>{
                    toolUtils.sendNotification(res.msg,res.type,3000);
                    selectDataList();
                }).finally(()=>{
                    form.isBatchDeleteLoad = false
                })
            }
        };
        /**
         * 删除
         */
        const handleDeleteChange = (id) =>{
            api.role.deleteRoleInfoById({keyWord:id}).then(res =>{
                toolUtils.sendNotification(res.msg,res.type,3000);
                selectDataList();
            })
        };

        /**
         * 去查看详情
         */
        const handleToInfoChange = (row) =>{
            localStorage.setItem(row.code,encrypt(JSON.stringify(row)));
            router.push({
                path:'/sys/role/info',
                query:{key:row.code}
            })
        };

        /**
         * 去新增
         */
        const handleToAddChange = () =>{
            router.push('/sys/role/add')
        };
        /**
         * 去编辑
         */
        const handleToEditChange = (row) =>{
            localStorage.setItem(row.code,encrypt(JSON.stringify(row)));
            router.push({
                path:'/sys/role/edit',
                query:{key:row.code}
            })
        };
        return {
            form,
            iconIsShow,
            closeImages,
            openImages,
            open,
            close,
            formatter,
            defaultSelectFormatter,
            roleTypeFormatter,
            handleSelectChange,
            handleSelectionChange,
            handleSizeChange,
            handleCurrentChange,
            handleBatchDeleteChange,
            handleDeleteChange,
            handleClearChange,
            handleToAddChange,
            handleToEditChange,
            handleToInfoChange
        }
    }
})
</script>

<style lang="scss" scoped>

</style>