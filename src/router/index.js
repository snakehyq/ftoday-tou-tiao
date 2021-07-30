import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import { Dialog } from 'vant'

Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('views/login/Login'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    component: () => import('views/layout/'),
    redirect: '/home',
    meta: { requiresAuth: false },
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('views/home/Home'),
        meta: { requiresAuth: false }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('views/qa/Qa'),
        meta: { requiresAuth: false }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('views/video/Video'),
        meta: { requiresAuth: false }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('views/my/My'),
        meta: { requiresAuth: false }
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('views/search/Search'),
    meta: { requiresAuth: false }
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('views/article/Article'),
    props: true,
    meta: { requiresAuth: false }
  },
  {
    path: '/user/profile',
    name: 'userProfile',
    component: () => import('views/my-profile/MyProfile'),
    meta: { requiresAuth: false }
  },
  {
    path: '/user/chat',
    name: 'userChat',
    component: () => import('views/user-chat/UserChat'),
    meta: { requiresAuth: true }
  },
  {
    path: '/user/follfans',
    name: 'userFollFans',
    component: () => import('views/user-follfans/UserFollFans'),
    meta: { requiresAuth: false }
  },
  {
    path: '/user/scls',
    name: 'userScls',
    component: () => import('views/user-scls/UserScls'),
    meta: { requiresAuth: false }
  }
]

const router = new VueRouter({
  routes
})
// to: Route: 即将要进入的目标 路由对象
// from: Route: 当前导航正要离开的路由
// next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
// next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
// next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
// next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 next 传递任意位置对象，且允许设置诸如 replace: true、name: 'home' 之类的选项以及任何用在 router-link 的 to prop 或 router.push 中的选项。
// next(error): (2.4.0+) 如果传入 next 的参数是一个 Error 实例，则导航会被终止且该错误会被传递给 router.onError() 注册过的回调。
router.beforeEach((to, from, next) => {
  // 如果登录了，直接放行
  if (store.state.user) return next()
  // 访问该页面是否需要登录
  if (to.meta.requiresAuth) {
    // 需要去登录, 跳转到登录界面
    Dialog.confirm({
      title: '该功能需要登录，确认登录吗？'
    }).then(() => {
      next({
        name: 'login',
        query: {
          redirection: from.fullPath
        }
      })
    }).catch(() => {
      // on cancel
      next(false)
    })
  } else {
    // 不需要登录，放行
    next()
  }
})
export default router
