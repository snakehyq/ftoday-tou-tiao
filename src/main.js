import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 导入vant组件
import Vant from 'vant'
import 'vant/lib/index.css'

// 加载全局样式
import 'style/index.scss'

// 导入用于设置 rem 基准值的插件amfe-flexible
import 'amfe-flexible'

// 加载dayjs的时间
import 'common/day.js'

// 使用事件总线
Vue.prototype.$bus = new Vue()

Vue.config.productionTip = false

// 安装插件
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
