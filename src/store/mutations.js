export default {
  setToken(state, value) { // 设置存储token
    state.token = value; //设置state中的token
    localStorage.setItem('token', value);//localStorage中的token
  },
  removeStorage(state, value){  // 删除token
    localStorage.removeItem('token');
  },
}