<template>
    <div class="full-body">
        <div class="flex-box">
            <div class="top-box">
                <el-descriptions  class="margin-top" title="我的基本信息" :column="4" size="small"  border  >
                    <template #extra>
                        <el-button type="primary" @click="toUserInfo" v-if="!form.isEdit">修改基本信息</el-button>
                        <el-button type="primary" @click="saveUserInfo"  v-if="form.isEdit">保存基本信息</el-button>
                        <el-button @click="closeUserInfo"  v-if="form.isEdit">取消</el-button>
                    </template>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item" >
                                <el-icon><Avatar /></el-icon> &nbsp;用户昵称
                            </div>
                        </template>
                        <span v-if="!form.isEdit">{{form.user.nickname}}</span>
                        <el-input v-model="form.updateUserInfo.nickname" size="mini" placeholder="输入用户昵称" v-if="form.isEdit" clearable />
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon><Iphone /></el-icon> &nbsp;手机号
                            </div>
                        </template>
                        <span v-if="!form.isEdit">{{form.user.mobile}}</span>
                        <el-input v-model="form.updateUserInfo.mobile"  size="mini" placeholder="输入手机号" v-if="form.isEdit" clearable />
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon><Message /></el-icon>&nbsp;用户邮箱
                            </div>
                        </template>
                        <span v-if="!form.isEdit">{{form.user.email}}</span>
                        <el-input v-model="form.updateUserInfo.email"  size="mini" placeholder="输入用户邮箱" v-if="form.isEdit" clearable />
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon><Male /></el-icon> &nbsp;性别
                            </div>
                        </template>
                        <span v-for="(item, key) in form.userGender" :key="key" v-if="!form.isEdit">
                             {{item.key===form.user.gender? item.value:''}}
                        </span>
                        <el-select v-model="form.updateUserInfo.gender" placeholder="性别" size="mini" v-if="form.isEdit" clearable filterable >
                            <el-option v-for="item in form.userGender" :key="item.key"  :label="item.value" :value="item.key"  />
                        </el-select>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon><MostlyCloudy /></el-icon>&nbsp;默认登入服务
                            </div>
                        </template>
                        <span  v-for="(item, key) in form.services" :key="key" v-if="!form.isEdit">
                              {{item.key===form.user.loginService? item.value:''}}
                        </span>
                        <el-select v-model="form.updateUserInfo.loginService" placeholder="服务" size="mini" v-if="form.isEdit" clearable filterable >
                            <el-option v-for="item in form.services" :key="item.key"  :label="item.value" :value="item.key" ></el-option>
                        </el-select>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon><Flag /></el-icon> &nbsp;账户状态
                            </div>
                        </template>
                        <span v-for="(item, key) in form.userStatus" :key="key" >
                             {{item.key===form.user.status? item.value:''}}
                        </span>
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon><Close /></el-icon> &nbsp;登入错误次数
                            </div>
                        </template>
                        {{form.user.errorCount}}（次）
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon><Postcard /></el-icon> &nbsp;用户身份ID
                            </div>
                        </template>
                        {{form.user.userId}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon><User /></el-icon> &nbsp;用户名/账户
                            </div>
                        </template>
                        {{form.user.username}}
                    </el-descriptions-item>
                    <el-descriptions-item>
                        <template #label>
                            <div class="cell-item">
                                <el-icon><Timer /></el-icon>&nbsp;创建时间
                            </div>
                        </template>
                        {{form.user.createTime}}
                    </el-descriptions-item>
                    <el-descriptions-item :span="2">
                        <template #label>
                            <div class="cell-item">
                                <el-icon><AlarmClock /></el-icon>&nbsp;最后更新时间
                            </div>
                        </template>
                        {{form.user.updateTime}}
                    </el-descriptions-item>
                    <el-descriptions-item :span="2">
                        <template #label>
                            <div class="cell-item">
                                <el-icon><ScaleToOriginal /></el-icon>&nbsp;拥有角色
                            </div>
                        </template>
                        <el-radio-group v-model="form.radioRole" size="mini">
                            <el-radio v-for="(role, id) in form.user.roleList" :key="id" :label="role.name" @click="clickRole(role)" border/>
                        </el-radio-group>
                    </el-descriptions-item>
                </el-descriptions>
            </div>
            <div class="bottom-box">
                <el-descriptions  class="margin-top" title="我的系统的菜单" :column="1" size="small"  border  >
                    <template #extra>
                        <el-input v-model="form.menuKey" type="text" placeholder="请输入菜单关键字"  clearable @clear="selectMenuKeyKey"   @keyup.enter.native="selectMenuKeyKey">
                            <template #append>
                                <div class="cell-item" @click="selectMenuKeyKey">
                                    <el-icon><Search /></el-icon>
                                </div>
                            </template>
                        </el-input>
                    </template>
                    <el-descriptions-item label-class-name="permission-label">
                        <template #label>
                            <div class="cell-item">
                                <el-icon><SetUp /></el-icon>&nbsp;所拥有的菜单
                            </div>
                        </template>
                        <div class="user-div-row">
                             <span v-for="(menu, id) in form.menuList" :key="id" class="user-el-tag">
                                  <el-popover  placement="top-start" title="菜单权限按钮" :width="260" trigger="hover">
                                     <template #reference>
                                         <el-tag size="small" style="margin-bottom: 5px;margin-right: 5px" @click="toMenu(menu)">{{menu.title}}</el-tag>
                                     </template>
                                      <span  v-for="(menuEl, elKey) in form.user.resource.menuEl" :key="elKey">
                                          <el-tag size="small" style="margin-bottom: 5px;margin-right: 5px" v-if="menuEl.elKey === menu.id" v-for="(el) in menuEl.elValue" >{{el}} </el-tag>
                                      </span>
                                  </el-popover>
                            </span>
                            <div class="menu-empty-block-des">
                                <span v-if="form.menuList.length === 0">用户无菜单</span>
                            </div>
                        </div>
                    </el-descriptions-item>
                </el-descriptions>
            </div>
            <div class="bottom-box">
                <el-descriptions  class="margin-top" title="我的校色权限" :column="1" size="small"  border  >
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
                                <el-icon><Link /></el-icon>&nbsp;所拥有的权限
                            </div>
                        </template>
                        <div class="user-div-row">
                             <span v-for="(permission, id) in form.rolePermission" :key="id" class="user-el-tag">
                                 <el-tag size="small" style="margin-bottom: 5px;margin-right: 5px" >
                                     <span  v-for="(item, key) in form.serviceModulesName" :key="key"> {{item.key===permission.serviceModule? item.value:''}} </span>
                                     {{' | '+permission.name+'：'+permission.url}}
                                 </el-tag>
                            </span>
                            <div class="menu-empty-block-des">
                                <span v-if="form.rolePermission.length === 0">选择角色显示</span>
                            </div>
                        </div>
                    </el-descriptions-item>
                </el-descriptions>
            </div>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { sendNotification } from '@/utils/system/toolUtils'
export default defineComponent({
    setup() {
        const store = useStore();
        const router = useRouter();
        const form = reactive({
            user:{
                nickname:'',
                userId:'',
                username:'',
                gender:'',
                mobile:'',
                status:'',
                email:'',
                errorCount:'',
                createTime:'',
                updateTime:'',
                loginService:'',
                resource:{
                    treeMenu:[],
                    menuEl:[]
                },
                roleList:[]
            },
            rolePermission_copy:[],
            rolePermission:[],
            radioRole:'',
            query:{
                permissionKey:'',
                serviceKey:store.state.user.services[0]
            },
            userGender:[],
            userStatus:[],
            serviceModulesName:[],
            menuList:[],
            menuList_copy:[],
            menuKey:'',
            services:[],
            isEdit:false,
            updateUserInfo:{
                userId:'',
                nickname:'',
                gender:'',
                mobile:'',
                loginService:'',
                email:''
            }
        });
        //取消修改
        const closeUserInfo =() =>{
            form.isEdit = false;
        };
        //打开修改状态
        const toUserInfo =() =>{
            form.isEdit = true;
            form.updateUserInfo = {
                userId: form.user.userId,
                nickname:form.user.nickname,
                gender:form.user.gender,
                mobile:form.user.mobile,
                loginService:form.user.loginService,
                email:form.user.email
            }
        };
        //点击角色
        const clickRole = (e) => {
            form.rolePermission = [];
            form.rolePermission_copy = [];
            if (e.rolePermission){
                form.rolePermission = e.rolePermission;
                form.rolePermission_copy = e.rolePermission
            }
        };
        //通过接口权限key搜索
        const selectPermissionKey = () => {
            if(form.rolePermission_copy.length>0){
                form.rolePermission = [];
                let rolePermission_temp = [];
                form.rolePermission_copy.filter(function (item) {
                    if (item.serviceModule.indexOf(form.query.serviceKey) !=-1) {
                        rolePermission_temp.push(item)
                    }
                });
                if (form.query.permissionKey !== ""){
                    rolePermission_temp.filter(function (item) {
                        if (item.name.indexOf(form.query.permissionKey) !=-1 ||
                            item.url.indexOf(form.query.permissionKey) !=-1) {
                            form.rolePermission.push(item)
                        }
                    })
                }else{
                    form.rolePermission = rolePermission_temp;
                }
            }else{
                sendNotification('请点击选择角色后在进行搜索','warning',3000);
            }
        };
        //加载用户菜单
        const loadUserMenu = (menus,lastPath) => {
            menus.forEach(d => {
                if (d.children && d.children.length > 0) {
                    if (d.children.length >=2){
                        lastPath = d.path
                    }
                    loadUserMenu(d.children,lastPath)
                } else {
                    let menu = {id:d.meta.id, path:lastPath ? lastPath+'/'+d.path:d.path, title:d.meta.title};
                    form.menuList.push(menu)
                    form.menuList_copy.push(menu)
                }
            })
        };
        //点击菜单跳转
        const toMenu = (menu) => {
            router.push(menu);
        };
        //通过菜单key进行搜索
        const selectMenuKeyKey = () => {
            if(form.menuList_copy.length>0){
                form.menuList = [];
                form.menuList_copy.filter(function (item) {
                    if (item.title.indexOf(form.menuKey) !=-1 ) {
                        form.menuList.push(item)
                    }
                })
            }else{
                sendNotification('无菜单可以进行筛选','warning',3000);
            }
        };
        //获取用户详细信息
        const getUserInfoById = () => {
            store.dispatch('user/getUserInfoById').then(res =>{
                form.user = res.data;
                loadUserMenu(res.data.resource.treeMenu);
            })
        };
        //保存修改用户信息
        const saveUserInfo =() =>{
            store.dispatch('user/updateByUserId',form.updateUserInfo).then(res =>{
                sendNotification(res.msg,res.type,3000);
                form.isEdit = false;
                getUserInfoById();
            })
        };
        //加载系统字典键值
        const loadDictKeyValue = () => {
            form.userGender = store.state.dict.sysDict.sys.userGender;
            form.userStatus = store.state.dict.sysDict.sys.userStatus;
            form.serviceModulesName = store.state.dict.sysDict.all.serviceModulesName;
            form.serviceModulesName .forEach(item => {
                store.state.user.services.forEach(s =>{
                    if (item.key === s){
                        form.services.push(item)
                    }
                })
            });
        };
        /**
         * 获取用户信息对象
         */
        getUserInfoById();

        /**
         * 加载字典 键值
         */
        loadDictKeyValue();
        return {
            form,
            selectPermissionKey,
            selectMenuKeyKey,
            saveUserInfo,
            toUserInfo,
            closeUserInfo,
            toMenu,
            clickRole
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
     line-height: 155px;
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
     height: 155px;
     overflow: auto;
 }
 .user-el-tag{
     cursor:pointer;
     width:100%;
 }
 .bottom-box{
     margin-top: 20px;
 }
</style>