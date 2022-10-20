import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import 'element-plus/lib/theme-chalk/display.css' // 引入基于断点的隐藏类
import 'normalize.css' // css初始化
import './assets/style/common.scss' // 公共css
import animated from 'animate.css'
import { ElNotification } from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { ElCollapseTransition } from 'element-plus'
import App from './App.vue'
import store from './store'
import router from './router'
import dialogDrag  from './directive/drag/dialogDrag'
import has from './directive/permission/has'
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(ElementPlus, { size: store.state.app.elementSize });
app.use(store);
app.use(ElNotification);
app.use(router);
app.use(has);
app.use(dialogDrag);
app.use(ElCollapseTransition);
app.use(animated);
app.mount('#app');
