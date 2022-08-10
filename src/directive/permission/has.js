import router from '@/router'
import { decrypt} from '@/utils/system/cryptoAES'
/**
 * 定义全局元素权限指令
 */
export default {
    install (app) {
        app.directive('has', {
            mounted (el, binding) {
                // v-has="binding.value"就是这里表达式的值
                const value = binding.value
                //将后端返回的权限列表从localStorage中取出（为一个数组）
                const menuEl = JSON.parse(decrypt(localStorage.getItem("vuex"))).user.menuEl || {};
                let authCode = [];
                menuEl.forEach(m => {
                    if (m.elKey === router.currentRoute.value.meta.id) {
                        authCode = m.elValue
                    }
                });
                if (!authCode.includes(value)) {
                    // 为防止用户F12查看元素修改display属性，此地方用删除元素的做法
                    el.remove()
                }
            }
        })
    },
}