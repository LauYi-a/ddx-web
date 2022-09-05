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
                            <el-table-column prop="userId" label="用户ID"/>
                            <el-table-column prop="username" label="用户账号"/>
                            <el-table-column prop="nickname" label="用户名称"/>
                            <el-table-column prop="mobile" label="手机号"/>
                            <el-table-column prop="email" label="用户邮箱"/>
                            <el-table-column prop="gender" label="性别" :formatter="genderFormatter" width="60" />
                            <el-table-column prop="status" label="状态" :formatter="statusFormatter"  width="60" />
                            <el-table-column prop="loginService" label="默认登入服务" :formatter="serviceFormatter" width="120" />
                            <el-table-column prop="errorCount" label="登入错误次数" width="100" />
                            <el-table-column label="操作" fixed="right" width="80" >
                                <template #default="scope">
                                    <el-dropdown trigger="click">
                                        <span class="el-dropdown-link">操 作<el-icon class="el-icon--right"><arrow-down /></el-icon> </span>
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
                                :page-sizes="[10, 20, 30, 40]"
                                :background="true"
                                layout="total,prev,pager,next,sizes"
                                @size-change="handleSizeChange"
                                @current-change="handleCurrentChange"
                        ></el-pagination>
                    </div>
                </div>
                <div class="table-body-right" v-bind:style="{ '--margin-left' : form.marginLeft,'--right-size' : form.rightSize,'--is-show' : form.display }">
                    <div class="right-select-header center">
                        <el-button type="primary" :loading="form.isSelectLoad" @click="handleSelectChange">查询</el-button>
                        <el-button  :loading="form.isClearLoad"  @click="handleClearChange" >重置</el-button>
                    </div>
                    <div class="right-select-body">
                        <el-form label-position="top"  label-width="100px" :modal="form.query" @keyup.enter.native="handleSelectChange">
                            <el-form-item label="用户账号">
                                <el-input v-model="form.query.username" size="mini" placeholder="请输入用户账号"  clearable />
                            </el-form-item>
                            <el-form-item label="昵称">
                                <el-input v-model="form.query.nickname" size="mini" placeholder="请输入昵称"  clearable />
                            </el-form-item>
                            <el-form-item label="手机号">
                                <el-input v-model="form.query.mobile" size="mini" placeholder="请输入手机号"  clearable />
                            </el-form-item>
                            <el-form-item label="用户邮箱">
                                <el-input v-model="form.query.email" size="mini" placeholder="请输入用户邮箱"  clearable />
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
                <img :src="closeImages" title="关闭搜索栏" @click="close(true)" v-if="!iconIsShow" style="width: 30px;height: 30px;cursor: pointer; margin-left: 8px"/>
                <img :src="openImages" title="打开搜索栏" @click="open(false)" v-if="iconIsShow" style="width: 30px;height: 30px;cursor: pointer; margin-left: 8px"/>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent,ref, reactive,onMounted ,watch} from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { formatterDict} from '@/utils/sys/dictUtils'
import { encrypt} from '@/utils/system/cryptoAES'
import closeImages from "@/assets/images/colseSearch.png"
import openImages from "@/assets/images/openSearch.png"
import { arrayIdList,validationMultipleSelection,sendNotification} from '@/utils/system/toolUtils'
export default defineComponent({
    setup() {
        const store = useStore();
        const router = useRouter();
        const iconIsShow = ref(false);
        const form = reactive({
            leftSize:'15%',
            rightSize:'85%',
            marginLeft:'5px',
            display:'hidden',
            isSelectLoad:false,
            isBatchDeleteLoad:false,
            isClearLoad:false,
            tableLoading:true,
            total:0,
            query:{
                page:1,
                perPage:10,
                username:'',
                nickname:'',
                mobile:'',
                email:''
            },
            multipleSelection:[],
            tableData:[]
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
        //性别格式化
        const genderFormatter = (row) =>{
            return formatterDict(store.state.dict.sysDict.sys.userGender,row.gender)
        };
        //状态格式化
        const statusFormatter = (row) =>{
            return formatterDict(store.state.dict.sysDict.sys.userStatus,row.status)
        };
        //服务名称格式化
        const serviceFormatter = (row) =>{
            return formatterDict(store.state.dict.sysDict.all.serviceModulesName,row.loginService)
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
            store.dispatch('user/selectUserList',form.query).then(res =>{
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
            selectDataList();
        };
        /**
         * 重置搜索
         */
        const handleClearChange = () =>{
            form.query = {};
            form.query.page = 1;
            form.query.perPage = 10;
            form.isClearLoad = true;
            selectDataList();
        };
        /**
         * 表格多选框
         */
        const handleSelectionChange = (val) =>{
            form.multipleSelection = arrayIdList(val,'id');
        };
        /**
         * 分页操作方法
         * @param val
         */
        const handleSizeChange = (val) => {
            form.query.page = val;
            selectDataList();
        };
        const handleCurrentChange = (val) => {
            form.query.page = 1;
            form.query.perPage = val;
            selectDataList();
        };
        /**
         * 批量删除
         */
        const handleBatchDeleteChange = () =>{
            form.isBatchDeleteLoad = validationMultipleSelection(form.multipleSelection);
            if (form.isBatchDeleteLoad) {
                store.dispatch('user/batchDeleteUserInfoByIds',{keyWords:form.multipleSelection}).then(res =>{
                    sendNotification(res.msg,res.type,3000);
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
            store.dispatch('user/deleteUserInfoById',{keyWord:id}).then(res =>{
                sendNotification(res.msg,res.type,3000);
                selectDataList();
            })
        };
        /**
         * 去新增
         */
        const handleToAddChange = () =>{
            router.push('/sys/user/add')
        };
        /**
         * 去编辑
         */
        const handleToEditChange = (row) =>{
            localStorage.setItem(row.userId, encrypt(JSON.stringify(row)));
            router.push({
                path:'/sys/user/edit',
                query:{userId:row.userId}
            })
        };
        /**
         * 去查看详情
         */
        const handleToInfoChange = (row) =>{
            localStorage.setItem(row.userId, encrypt(JSON.stringify(row)));
            router.push({
                path:'/sys/user/info',
                query:{userId:row.userId}
            })
        };
        return {
            form,
            iconIsShow,
            closeImages,
            openImages,
            open,
            close,
            genderFormatter,
            statusFormatter,
            serviceFormatter,
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