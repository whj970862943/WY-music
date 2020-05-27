export default{
  getToken(state){   // 获取本地存储的登录信息
    if(!state.token){
      state.token = JSON.parse(localStorage.getItem(token))
    }
    return state.token
  },
  
}

