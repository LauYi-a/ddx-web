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
                            <el-table-column type="selection" width="55"/>
                            <el-table-column prop="name" label="权限名称" show-overflow-tooltip width="150" />
                            <el-table-column prop="url" label="权限路由" show-overflow-tooltip />
                            <el-table-column prop="type" label="白名单类型" width="140"  show-overflow-tooltip :formatter="whitelistFormatter"/>
                            <el-table-column label="白名单描述" width="140"  show-overflow-tooltip :formatter="whitelistDescFormatter"/>
                            <el-table-column prop="serviceModule" label="所属模块" width="110" :formatter="serviceFormatter"/>
                            <el-table-column prop="createTime" label="创建时间" width="140" />
                            <el-table-column prop="updateTime" label="修改时间" width="140"/>
                            <el-table-column label="操作" fixed="right" width="80" >
                                <template #default="scope">
                                    <el-dropdown trigger="click">
                                        <el-icon class="more-operation-icon"><MoreFilled /></el-icon>
                                        <template #dropdown>
                                            <el-dropdown-menu>
                                                <el-dropdown-item @click="handleToEditChange(scope.row)" v-has="'edit'"><el-icon><Edit /></el-icon> 编 辑 </el-dropdown-item>
                                                <el-dropdown-item @click="handleDeleteChange(scope.row.id)" v-has="'delete'"><el-icon><Edit /></el-icon> 删 除 </el-dropdown-item>
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
                            <el-form-item label="白名单类型">
                                <el-select v-model="form.query.type" placeholder="请选择类型" size="mini" clearable style="width: 100%;">
                                    <el-option v-for="item in form.whitelistType" :key="item.key"  :label="item.value" :value="item.key"  />
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="table-body-bottom">
                <el-button title="新增用户信息" type="primary" @click="handleToAddChange" v-has="'create'">新增</el-button>
                <el-popconfirm title="是否确定需要删除选择数据？" confirm-button-text="确定" cancel-button-text="取消" @confirm="handleBatchDeleteChange">
                    <template #reference>
                        <el-button title="批量删除用户" type="primary" :loading="form.isBatchDeleteLoad" v-has="'batch_delete'">批量删除</el-button>
                    </template>
                </el-popconfirm>
                <img :src="closeImages" title="关闭搜索栏" @click="close(true)" v-if="!iconIsShow" style="width: 30px;height: 30px;cursor: pointer; margin-left: 8px" class="animate__animated animate__bounceIn"/>
                <img :src="openImages" title="打开搜索栏" @click="open(false)" v-if="iconIsShow" style="width: 30px;height: 30px;cursor: pointer; margin-left: 8px" class="animate__animated animate__bounceIn"/>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent,ref, reactive,onMounted,watch } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { formatterDictVal,formatterDictDesc} from '@/utils/sys/dictUtils'
import closeImages from "@/assets/images/colseSearch.png"
import openImages from "@/assets/images/openSearch.png"
import { sendNotification,validationMultipleSelection,arrayIdList} from '@/utils/system/toolUtils'
export default defineComponent({
    setup() {
        const store = useStore();
        const iconIsShow = ref(false);
        const router = useRouter();
        const form = reactive({
            leftSize: '15%',
            rightSize: '85%',
            marginLeft: '5px',
            display: 'hidden',
            isSelectLoad: false,
            isClearLoad: false,
            tableLoading:true,
            editDialog: false,
            isSaveEdit: false,
            isBatchDeleteLoad: false,
            total:0,
            query:{
                page:1,
                perPage:15,
                name:'',
                url:'',
                type:'',
                serviceModule:''
            },
            serviceModule:store.state.dict.sysDict.all.serviceModulesName,
            whitelistType:store.state.dict.sysDict.sys.whitelistType,
            tableData:[],
            multipleSelection:[]
        });
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
        //监听路由变化刷新列表
        watch(()=>router.currentRoute.value.query, (newValue) => {
            if(newValue.isAddOrEdit){
                selectDataList()
            }
        }, { immediate: true });
        //服务名称格式化
        const serviceFormatter = (row) =>{
            return formatterDictVal(form.serviceModule,row.serviceModule)
        };
        //白名单类型格式化
        const whitelistDescFormatter = (row) =>{
            return formatterDictDesc(form.whitelistType,row.type)
        };
        const whitelistFormatter = (row) =>{
            return formatterDictVal(form.whitelistType,row.type)
        };
        /**
         * 表格多选框
         */
        const handleSelectionChange = (val) =>{
            form.multipleSelection = arrayIdList(val,'id');
        };
        // 组件挂载到页面之后执行
        onMounted(() => {
            selectDataList();
        });
        /**
         * 列表数据查询
         */
        const selectDataList = () => {
            store.dispatch('whitelist/selectWhitelistRequestList',form.query).then(res =>{
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
         *  去新增权限
         */
        const handleToAddChange = () =>{
            router.push('/sys/whitelist/add')
        };
        /**
         * 编辑权限
         */
        const handleToEditChange = (row) =>{

        };
        /**
         * 删除
         */
        const handleDeleteChange = (id) =>{
            store.dispatch('whitelist/deleteWhitelistById',{keyWord:id}).then(res =>{
                sendNotification(res.msg,res.type,3000);
                selectDataList();
            })
        };
        /**
         * 批量删除
         */
        const handleBatchDeleteChange = () =>{
            form.isBatchDeleteLoad = validationMultipleSelection(form.multipleSelection);
            if (form.isBatchDeleteLoad) {
                store.dispatch('whitelist/batchDeleteWhitelistByIds',{keyWords:form.multipleSelection}).then(res =>{
                    sendNotification(res.msg,res.type,3000);
                    selectDataList();
                }).finally(()=>{
                    form.isBatchDeleteLoad = false
                })
            }
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
            iconIsShow,
            closeImages,
            openImages,
            close,
            open,
            serviceFormatter,
            whitelistFormatter,
            whitelistDescFormatter,
            handleSelectChange,
            handleClearChange,
            handleSizeChange,
            handleCurrentChange,
            handleToEditChange,
            handleToAddChange,
            handleSelectionChange,
            handleDeleteChange,
            handleBatchDeleteChange
        }
    }
})
</script>

<style scoped>

</style>