import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const pathResolve = (dir) => {
  return resolve(__dirname, ".", dir)
}

const alias = {
  '@': pathResolve("src")
}

// https://vitejs.dev/config/
export default ({ command }) => {
  return {
    base: './',
    resolve: {
      alias
    },
    server: {
      port: 3002,
      host: '0.0.0.0',
      open: true,
      proxy: { // 代理配置
        '/ddx': 'http://127.0.0.1:9999'
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            
          }
        }
      }
    },
    plugins: [
      vue()
    ]
  };
}
