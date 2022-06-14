//引入登录|退出登录|获取用户信息的接口函数
import { login, logout, getInfo } from '@/api/user'
//获取token|设置token|删除token的函数
import { getToken, setToken, removeToken } from '@/utils/auth'
//路由模块当中重置路由的方法
import { resetRouter } from '@/router'

//箭头函数
const getDefaultState = () => {
  return {
    //获取token
    token: getToken(),
    //存储用户名
    name: '',
    //存储用户头像
    avatar: ''
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
  //存储用户名
  SET_NAME: (state, name) => {
    state.name = name
  },
  //存储用户头像
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
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

        const { name, avatar } = data

        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
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

