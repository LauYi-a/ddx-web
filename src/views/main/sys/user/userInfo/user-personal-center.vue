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
                    <el-descriptions-item label-class-name="premission-label">
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
                <el-descriptions  class="margin-top" title="我的接口权限" :column="1" size="small"  border  >
                    <template #extra>
                        <el-input v-model="form.premissionKey" type="text" placeholder="请输入接口权限关键字"  clearable @clear="selectPremissionKey"   @keyup.enter.native="selectPremissionKey">
                            <template #append>
                                <div class="cell-item" @click="selectPremissionKey">
                                    <el-icon><Search /></el-icon>
                                </div>
                            </template>
                        </el-input>
                    </template>
                    <el-descriptions-item label-class-name="premission-label">
                        <template #label>
                            <div class="cell-item">
                                <el-icon><Link /></el-icon>&nbsp;所拥有的接口
                            </div>
                        </template>
                        <div class="user-div-row">
                             <span v-for="(premission, id) in form.rolePremission" :key="id" class="user-el-tag">
                                 <el-tag size="small" style="margin-bottom: 5px;margin-right: 5px" >
                                     <span  v-for="(item, key) in form.serviceModulesName" :key="key"> {{item.key===premission.serviceModule? item.value:''}} </span>
                                     {{' | '+premission.name+'：'+premission.url}}
                                 </el-tag>
                            </span>
                            <div class="menu-empty-block-des">
                                <span v-if="form.rolePremission.length === 0">选择角色显示</span>
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
            rolePremission_copy:[],
            rolePremission:[],
            radioRole:'',
            premissionKey:'',
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
            form.rolePremission = [];
            form.rolePremission_copy = [];
            if (e.rolePremission){
                form.rolePremission = e.rolePremission;
                form.rolePremission_copy = e.rolePremission
            }
        };
        //通过接口权限key搜索
        const selectPremissionKey = () => {
            if(form.rolePremission_copy.length>0){
                form.rolePremission = [];
                form.rolePremission_copy.filter(function (item) {
                    if (item.name.indexOf(form.premissionKey) !=-1 || item.url.indexOf(form.premissionKey) !=-1  || item.serviceModule.indexOf(form.premissionKey) !=-1) {
                        form.rolePremission.push(item)
                    }
                })
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
            selectPremissionKey,
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
        .premission-label{
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