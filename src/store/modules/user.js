// 引入登录|退出登录|获取用户信息接口函数
import { login, logout, getInfo } from '@/api/user'
// 获取token|设置token|删除token
import { getToken, setToken, removeToken } from '@/utils/auth'
// 重置路由的方法
import router, { resetRouter, anyRoutes, asyncRoutes, constantRoutes } from '@/router'

const getDefaultState = () => {
  // 获取token
  return {
    token: getToken(),
    // 存储用户名
    name: '',
    // 头像
    avatar: '',
    // 按钮
    buttons:[],
    // 菜单
    routes:[],
    // 角色信息
    roles:[],
    // 对比之后【项目中已有的异步路由，与服务器返回的标记信息进行对比最终需要展示的路由】
    resultAsyncRoutes:[],
    // 最终需要展示的全部路由
    resultAllRoutes:[],

  }
}

const state = getDefaultState()
// 修改state唯一的地方
const mutations = {
  // 重置state
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  // 存储token
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  // 存储用户名
  SET_NAME: (state, name) => {
    state.name = name
  },
  // 存储头像
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  // 存储用户信息
  SET_USERINFO: (state, userInfo)=>{
    // 用户头像
    state.name = userInfo.name
    // 用户名
    state.avatar = userInfo.name
    // 菜单权限标记
    state.routes = userInfo.routes
    // 按钮标记
    state.buttons = userInfo.buttons
    // 角色标记
    state.roles = userInfo.roles
  },
  // 最终计算出的异步路由
  SET_RESULTASYNCROUTES:(state,asyncRoutes)=>{
    // vuex保存当前用户异步路由，一个用户需要展示完成路由：常量，异步，任意路由
    state.resultAsyncRoutes = asyncRoutes
    // 计算出当前用户需要展示的所有路由
    state.resultAllRoutes =  constantRoutes.concat(state.resultAsyncRoutes,anyRoutes)
    // 给路由器添加新的路由
    router.addRoutes(state.resultAllRoutes)
  }
}

// 定义一个函数：两个数组进行对比，相比出当前用户到底显示哪些异步路由
const computedAsyncRoutes = (asyncRoutes,routes)=>{
  // 过滤出当前用户【超级管理员|普通员工】需要展示的异步路由
  return asyncRoutes.filter((item)=>{
    // 数组当中没有这个元素返回索引值-1，如果有这个元素返回的索引值一定不是-1
    if(routes.indexOf(item.name)!=-1){
      // 递归:可能还有234级路由
      if(item.children&&item.children.length){
        item.children = computedAsyncRoutes(item.children,routes)
      }
      return true
    }
  })

}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    let result = await login({ username: username.trim(), password: password })
    // 现在这个code还是mock数据
    console.log(result);
    if(result.code==20000){
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'))
    }
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // 获取用户信息
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        // 获取用户信息：返回数据包含用户名nama，用户头像avatar，toutes[返回的标志：不同用户应该展示哪些的标志]
        const { data } = response
        // vuex存储用户全部信息
        commit('SET_USERINFO',data)
        commit('SET_RESULTASYNCROUTES',computedAsyncRoutes(asyncRoutes,data.routes))

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

