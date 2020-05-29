export default{
  getToken(state){   // 获取本地存储的登录信息
    if(!state.token){
      state.token = JSON.parse(localStorage.getItem(token))
    }
    return state.token
  },
  getsongname(state){
    return state.songname
  },
  getsinger(state){
    return state.singer
  },
  getsongurl(state){
    return state.songurl
  },
  getpicurl(state){
    return state.picurl
  },
  getlrc(state){
    return state.lrc
  }
}

