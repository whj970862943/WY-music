export default {
  //存储token
  token:localStorage.getItem('token') 
    ? localStorage.getItem('token'):'',   // token

  
  // 当前歌单
  // currentmusiclist:[],

  // 当前播放歌曲信息
  // currentmusicinfo:{
  songname:'',
  singer:'',
  songurl:'',
  picurl:'',
  lrc:''
  // }

}