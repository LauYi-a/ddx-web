const state = () => ({
  isCollapse: false, // 侧边栏是否收缩展示
  contentFullScreen: false, // 内容是否可全屏展示
  showLogo: true, // 是否显示Logo
  showTabs: true, // 是否显示导航历史
  expandOneMenu: true, // 一次是否只能展开一个菜单
  elementSize: 'mini', // element默认尺寸，支持官网四个大小参数
  //主题
  theme: {
    state: {
      style: 'default',
      primaryColor: '#333',
      menuType: 'side'
    }
  },
  //表格侧边搜索栏
  tableSelect:{
    leftSize:'15%', //搜索栏布局大小
    rightSize:'85%', //表格布局大小
    marginLeft:'5px',//边距大小
    display:'hidden',//缩放状态
  },
  //列表搜索默认值
  tableQuery:{
    page:1,//默认初始页
    perPage:15,//每页最大条数
    total:0,//总数
    pageSizes:[15, 20, 30, 40]//每页查询数
  }
});

// mutations
const mutations = {
  isCollapseChange(state, type) {
    state.isCollapse = type
  },
  contentFullScreenChange(state, type) {
    state.contentFullScreen = type
  },
  menuListChange(state, arr) {
    state.menuList = arr
  },
  stateChange(state, option) {
    state[option.name] = option.value
  }
};

// actions
const actions = {

};

export default {
  namespaced: true,
  state,
  actions,
  mutations
}