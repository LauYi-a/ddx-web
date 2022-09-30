import { createStore, createLogger } from 'vuex'
import Presistent from './plugins/persistent'
const debug = process.env.NODE_ENV !== 'production';

const files= import.meta.globEager('./modules/*.js');
const sysFiles= import.meta.globEager('./modules/cache/sys/*.js');

let modules = {};
Object.keys(files).forEach((c) => {
  const module = files[c].default
  const moduleName = c.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$2');
  modules[moduleName] = module
});
Object.keys(sysFiles).forEach((c) => {
  const module = sysFiles[c].default;
  const moduleName = c.replace(/^\.\/(.*)\/(.*)\.\w+$/, '$2');
  modules[moduleName] = module
});

const presistent = Presistent({ key: 'vuex', modules, modulesKeys: {
  local: Object.keys(modules),
  session: []
} });

export default createStore({
  modules: {
    ...modules
  },
  strict: debug,
  plugins: debug ? [createLogger(), presistent] : [presistent]
})