//引入登录|退出登录|获取用户信息的接口函数
import { login, logout, getInfo } from '@/api/user'
//获取token|设置token|删除token的函数
import { getToken, setToken, removeToken } from '@/utils/auth'
//路由模块当中重置路由的方法
import { asyncRoutes, resetRouter, constantRoutes, anyRoutes } from '@/router'
import router from '@/router'

//箭头函数
const getDefaultState = () => {
  return {
    //获取token
    token: getToken(),
    //存储用户名
    name: '',
    //存储用户头像
    avatar: '',
    //服务器返回的菜单信息[根据不同的角色：返回的标记信息，数据里面的元素是字符串]
    routes: [],
    //角色信息
    roles: [],
    //按钮权限的信息
    buttons: [],
    //对比之后：[项目已有的异步路由，与服务器返回的标记信息进行对比最终需要展示的路由]
    resultAsyncRoutes: [],
    //用户最终需要展示的全部路由
    resultAllRoutes: [],
  }
}

const state = getDefaultState()

//唯一修改state的地方
const mutations = {
  //重置state
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  //存储token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  /* //存储用户名
  SET_NAME: (state, name) => {
    state.name = name
  },
  //存储用户头像
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  } */
  //存储用户信息
  SET_USERINFO: (state, userInfo) => {
    //用户名
    state.name = userInfo.name;
    //用户头像
    state.avatar = userInfo.avatar;
    //菜单权限标记
    state.routes = userInfo.routes;
    //按钮权限标记
    state.buttons = userInfo.buttons;
    //角色
    state.roles = userInfo.roles;
  },
  //最终计算出的异步路由
  SET_RESULTASYNCROUTES: (state, resultAsyncRoutes) => {
    //vuex保存当前用户的异步路由
    state.resultAsyncRoutes = resultAsyncRoutes;
    //常量路由合并异步路由、任意路由==>所有路由
    state.resultAllRoutes = constantRoutes.concat(state.resultAsyncRoutes, anyRoutes);
    //给路由器添加新的路由
    router.addRoutes(state.resultAllRoutes);
  },
}

//定义一个函数：两个数据进行对比，对比出当前用户到底显示哪些异步路由
const computedAsyncRoutes = (asyncRoutes, routes) => {
  //过滤出当前用户[超级管理员|普通员工]需要展示的异步路由
  return asyncRoutes.filter(item => {
    //数组中没有这个元素返回索引值为-1
    if(routes.indexOf(item.name) !== -1){
      //递归:别忘记可能还有2、3、4、5、6级路由
      if(item.children && item.children.length){
        item.children = computedAsyncRoutes(item.children, routes);
      }
      return true;
    }
  })
}

const actions = {
  //这里在处理登录业务
  login({ commit }, userInfo) {
    //解构出用户名与密码
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        //获取用户信息: 返回数据包含：用户名name、用户头像avatar、routes[返回的标记：不同的用户应该展示哪些菜单的标记]、
        //roles（用户角色信息）、buttons[按钮信息：按钮权限使用的标记]
        const { data } = response

        if (!data) {
          return reject('Verification failed, please Login again.')
        }
        // console.log(data);
        //vuex存储用户的全部信息
        commit('SET_USERINFO', data);
        commit('SET_RESULTASYNCROUTES', computedAsyncRoutes(asyncRoutes, data.routes));
        // const { name, avatar } = data
        // commit('SET_NAME', name)
        // commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}