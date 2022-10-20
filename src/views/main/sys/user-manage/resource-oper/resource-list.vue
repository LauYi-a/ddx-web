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
                                  row-key="id"
                                  table-layout="auto" style="width: 100%" max-height="580">
                            <el-table-column prop="resourceName" label="资源名称" width="200" fixed="left" show-overflow-tooltip />
                            <el-table-column prop="sort" label="排序号" width="60" show-overflow-tooltip />
                            <el-table-column prop="resourceType" label="资源类型" :formatter="formatterResourceType" show-overflow-tooltip />
                            <el-table-column prop="cache" label="是否缓存" :formatter="formatterCache" show-overflow-tooltip />
                            <el-table-column prop="hideTabs" label="是否显示标签" width="100" :formatter="formatterHideTabs" show-overflow-tooltip />
                            <el-table-column prop="hideClose" label="是否关闭标签" width="100" :formatter="formatterHideClose" show-overflow-tooltip />
                            <el-table-column prop="hideMenu" label="是否隐藏菜单" width="100" :formatter="formatterHideMenu" show-overflow-tooltip />
                            <el-table-column prop="resourceUrl" label="资源路径" width="130" show-overflow-tooltip />
                            <el-table-column prop="redirect" label="重定向路径" width="130" show-overflow-tooltip />
                            <el-table-column prop="component" label="使用组件" width="100" show-overflow-tooltip />
                            <el-table-column prop="serviceModule" label="服务模块" width="100" :formatter="formatterServiceModule" show-overflow-tooltip />
                            <el-table-column label="操作" fixed="right" width="80" >
                                <template #default="scope">
                                    <el-dropdown trigger="click" v-if="scope.row.resourceType !== menuType.MENU_TYPE_2">
                                        <el-icon class="more-operation-icon"><MoreFilled /></el-icon>
                                        <template #dropdown>
                                            <el-dropdown-menu>
                                                <el-dropdown-item @click="handleToEditChange(scope.row)"><el-icon><Edit /></el-icon> 编 辑</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </template>
                                    </el-dropdown>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="table-page">
                    </div>
                </div>
                <div class="table-body-right animate__animated animate__headShake" v-bind:style="{ '--margin-left' : form.marginLeft,'--right-size' : form.rightSize,'--is-show' : form.display }">
                    <div class="right-select-header center">
                        <el-button type="primary" :loading="form.isSelectLoad" @click="handleSelectChange">查询</el-button>
                        <el-button  :loading="form.isClearLoad"  @click="handleClearChange" >重置</el-button>
                    </div>
                    <div class="right-select-body">
                        <el-form label-position="top"  label-width="100px" :modal="form.query" @keyup.enter.native="handleSelectChange">
                            <el-form-item label="服务模块">
                                <el-select v-model="form.query.serviceModule" placeholder="选择服务模块" size="mini" style="width: 100%;">
                                    <el-option v-for="item in form.serviceModule" :key="item.key"  :label="item.value" :value="item.key"  />
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
            <div class="table-body-bottom">
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
import dictUtils from '@/utils/sys/dictUtils'
import { menuType } from '@/utils/system/enumUtils'
import closeImages from "@/assets/images/colseSearch.png"
import openImages from "@/assets/images/openSearch.png"
import { encrypt} from '@/utils/system/cryptoAES'
import api from '@/store/noCacheModules/index'
export default defineComponent({
    setup() {
        const store = useStore();
        const router = useRouter();
        const ruleForm = ref(null);
        const iconIsShow = ref(false);
        const form = reactive({
            leftSize:store.state.app.tableSelect.leftSize,
            rightSize:store.state.app.tableSelect.rightSize,
            marginLeft:store.state.app.tableSelect.marginLeft,
            display:store.state.app.tableSelect.display,
            isSelectLoad:false,
            isClearLoad:false,
            tableLoading:true,
            query:{
                resourceName:'',
                resourceUrl:'',
                serviceModule:store.state.user.services[0]
            },
            serviceModule:store.state.dict.sysDict.all.serviceModulesName,
            menuType:store.state.dict.sysDict.sys.menuType,
            isRolePermission:store.state.dict.sysDict.sys.isRolePermission,
            tableData:[]
        });
        //监听路由变化刷新列表
        watch(()=>router.currentRoute.value.query, (newValue) => {
            if(newValue.isAddOrEdit){
                selectDataList()
            }
        }, { immediate: true });
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
        const formatterResourceType = (row) =>{
            return dictUtils.formatterDictVal(form.menuType,row.resourceType)
        };
        const formatterServiceModule = (row) =>{
            return dictUtils.formatterDictVal(form.serviceModule,row.serviceModule)
        };
        const formatterHideClose = (row) =>{
            if (row.resourceType === menuType.MENU_TYPE_2) {
                return "-"
            }
            return dictUtils.formatterDictVal(store.state.dict.sysDict.sys.menuHideClose,row.hideClose)
        };
        const formatterHideMenu = (row) =>{
            if (row.resourceType === menuType.MENU_TYPE_2) {
                return "-"
            }
            return dictUtils.formatterDictVal(store.state.dict.sysDict.sys.menuHide,row.hideMenu)
        };
        const formatterHideTabs = (row) =>{
            if (row.resourceType === menuType.MENU_TYPE_2) {
                return "-"
            }
            return dictUtils.formatterDictVal(store.state.dict.sysDict.sys.menuHideTabs,row.hideTabs)
        };
        const formatterCache = (row) =>{
            if (row.resourceType === menuType.MENU_TYPE_2) {
                return "-"
            }
            return dictUtils.formatterDictVal(store.state.dict.sysDict.sys.menuCache,row.cache)
        };
        /**
         * 条件搜索
         */
        const handleSelectChange = () =>{
            form.isSelectLoad = true;
            form.tableLoading = true;
            selectDataList();
        };
        /**
         * 重置搜索
         */
        const handleClearChange = () =>{
            form.query = {
                serviceModule:store.state.user.services[0]
            };
            form.isClearLoad = true;
            form.tableLoading = true;
            selectDataList();
        };
        /**
         * 列表数据查询
         */
        const selectDataList = () => {
            api.resource.selectMenuTreeList(form.query).then(res =>{
                form.tableData = res.data;
            }).finally(()=>{
                form.tableLoading = false;
                form.isSelectLoad = false;
                form.isClearLoad = false;
            })
        };
        /**
         * 去编辑
         */
        const handleToEditChange = (row) =>{
            localStorage.setItem("resource-"+row.id,encrypt(JSON.stringify(row)));
            router.push({
                path:'/sys/resource/edit',
                query:{key:"resource-"+row.id}
            })
        };
        // 组件挂载到页面之后执行
        onMounted(() => {
            selectDataList();
        });
        return{
            form,
            ruleForm,
            iconIsShow,
            closeImages,
            openImages,
            menuType,
            close,
            open,
            formatterResourceType,
            formatterServiceModule,
            formatterHideClose,
            formatterHideMenu,
            formatterHideTabs,
            formatterCache,
            handleClearChange,
            handleSelectChange,
            handleToEditChange
        }
    }
})
</script>

<style lang="scss" scoped>

</style>