import axios from 'axios'
import store from '@/store'
import { ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'
const router = useRouter()
const baseURL = import.meta.env.VITE_BASE_URL
const service = axios.create({
  baseURL: baseURL
})

/**
 * 请求前的统一处理  - 请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    if (store.state.user.token) {
      const token = store.state.user.token
      config.headers['Authorization'] = token.token_type+" "+token.access_token
    }
    return config
  },(error) => {
    return Promise.reject(error)
  }
)

/**
 * 请求响应拦截器
 */
service.interceptors.response.use(
  (response) => {
    const res = response.data;
      if (res.type === 'success'|| res.type === 'info') {
          return res
      }else{
          return showError(res)
      }
  },(error)=> {
    const badMessage = error.message || error;
    return showError({ type: 'error', msg: badMessage })
  }
)

/**
 * 异常处理 普通业务异常需将错抛出调用放单独处理
 * 系统错误 需定制化处理
 * @param error
 * @returns {Promise<never>}
 */
function showError(error) {
    //4003 token 过期处理
    if (error.code === 4003) {
        const noToken = JSON.parse(localStorage.getItem('noToken') || false);
        if (!noToken) {
            localStorage.setItem('noToken',true);
            ElMessageBox.confirm(error.msg, error.type, {
                confirmButtonText: '确定',
                type: error.type,
                draggable: true,
                closeOnClickModal:false,
                closeOnPressEscape:false,
                showClose:false,
                showCancelButton:false
            }).then(({ value }) => {
                localStorage.clear();
                location.reload()
            })
        }
    }else {
        //4001 用户权限不足处理
        if (error.code === 4001) {
            router.push('/401')
        }
        console.error(error);
        return Promise.reject(error)
    }
}

export default service