<template>
  <div>
    <!-- 顶部区域 -->
    <header class="header">
      <div>
        <img class="logo" src="./music_logo.jpg" alt="logo">
        <el-input class="search_input"
          placeholder="搜索音乐" size="mini"
          suffix-icon="el-icon-search"
          v-model="music_search">
        </el-input>
      </div>      
      <div class="user">
        <!-- 登录相关 -->
        <!-- <img class="avatar" v-if="user_avatarUrl" :src="user_avatarUrl" alt="avatar"> -->
        <el-avatar size="small" :src="user_avatar"></el-avatar>
        <span class="" @click="loginDialogShow">{{user_nickname || '登录'}}</span>      
        <!-- 通知及设置 -->      
        <i class="el-icon-message size"></i>     
        <i class="el-icon-setting size"></i>
      </div>
    </header>

    <!-- 中间区域 -->
    <el-container class="article">
      <!-- 侧栏 -->
      <el-aside width="200px" class="left_aside">
        <div class="tuijian">推荐</div>       
        <el-menu>
            <el-menu-item>
              <i class="el-icon-headset"></i>
              <span>发现音乐</span>
            </el-menu-item>
            <el-menu-item>
              <i class="el-icon-mic"></i>
              <span>私人FM</span>
            </el-menu-item>
            <el-menu-item>
              <i class="el-icon-video-play"></i>
              <span>LOOK直播</span>
            </el-menu-item>
            <el-menu-item>
              <i class="el-icon-video-camera"></i>
              <span>视频</span>
            </el-menu-item>
            <el-menu-item>
              <i class="el-icon-user"></i>
              <span>朋友</span>
            </el-menu-item>
          
        </el-menu>
            
          
      </el-aside>

      <!-- 内容区 -->
      <el-main class="main_content">
        <keep-alive exclude="SongListDetail">
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </el-container>

    <!-- 底部播放区 -->
    <footer>
      <div class="footer">
        <AudioPlay></AudioPlay>
      </div>
    </footer>


    <!-- 用户登录对话框 -->
    <el-dialog
      title="手机号登录"
      :visible.sync="loginDialogVisible"
      width="30%">

      <el-form ref="userFormRef" :rules="loginFormRules"
      :model="userLoginInfo" label-width="70px">
        <el-form-item label="账号" prop="phonenumber">
          <el-input v-model="userLoginInfo.phonenumber" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="userLoginInfo.password" placeholder="密码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loginDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="userLogin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex'
  import AudioPlay from '../../components/AudioPlay.vue'
  export default {  
    components:{
      AudioPlay
    }, 
    data(){
      // 手机号码正则
      var checkMobile =(rule,value,cb) =>{
        const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
        if(regMobile.test(value)){
          return cb()
        }
        cb(new Error('请输入合法的手机号'))
      }
      return{
        loginDialogVisible:false,
        userLoginInfo:{
          phonenumber:'18010411379',
          password:'whj19980106..'
        },
        loginFormRules:{
          phonenumber:[
            {required:true,message:'请输入手机号',trigger:'blur'},
            {validator:checkMobile,trigger:'blur'}
          ],
          password:[
            {required:true,message:'请输入密码',trigger:'blur'},
          ]
        },
        music_search:'',
        // 存储token
        userToken:'',
        user_nickname:'',
        user_avatarUrl:''
      }
    },
    created(){

    },
    computed:{
      //用户头像
      user_avatar:function(){
        return this.user_avatarUrl || "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
      }
    },
    methods:{
      // 显示登录对话框
      loginDialogShow(){
        this.loginDialogVisible = true
      },
      userLogin(){
        this.$refs.userFormRef.validate(async valid => {
          if(!valid) return
          var {data:res} = await this.$http.post(`/login/cellphone?phone=${this.userLoginInfo.phonenumber}&password=${this.userLoginInfo.password}`)
          if(res.code !== 200) return this.$message.error('登录失败')
          // console.log(res.token);
          // console.log(res);
          this.$message.success('登录成功')
          // 配置token
          this.$store.commit('setToken', res.token) //调用mutation中的方法，设置token
          // 刷新登录状态
          await this.$http.get('/login/refresh')
          
          this.user_nickname = res.profile.nickname     
          this.user_avatarUrl = res.profile.avatarUrl
          
          // 关闭对话框
          this.loginDialogVisible = false
        })
        
      }
    }
  }
</script>

<style lang="scss" scoped>
.header{
  background-color:#C62F2F;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  >div{
    display: flex;
    align-items: center;
    // width: 50%;
    .logo{
      align-items: center;
      margin-left: 10px;
    }
    .search_input{
      // width: 80%;
      margin-left: 50px;
    }
  }
  .user{
    display: flex;
    width: 170px;
    margin-right: 50px;
    justify-content: space-between;
    color: rgba(255, 255, 255, 0.8);
    :hover{
      color: rgba(255, 255, 255, 1);
      cursor:pointer;
    }
    >i{
      font-size: 18px;
    }
    .avatar{
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
}
.article{

  .tuijian{
    margin: 8px 20px;
    color: rgba(0, 0, 0, 0.6);
    font-size: 14px;
  }
  .el-menu-item{
    height: 39px;
    line-height: 39px
  }
  .main_content{
    padding: 3px;
    margin-bottom:76px;
  }
}

.footer{
  position: fixed;
  z-index: 100;
  background-color: #fff;
  left: 0px;
  right: 0px;
  bottom: 0px;
  height: 70px;

  width:100%;
  display: flex;
  align-items: center;
  border-top: 1px solid rgb(218, 219, 223);
  
  .el-icon-video-play{
    font-size: 38px;
    color: #E83C3C;
    margin-left: 30px;
    
  }
  .el-icon-video-pause{
    font-size: 35px;
    color: #E83C3C;
    margin-left: 18px;
    
  }
  :hover{
      color: #C62F2F;
      cursor:pointer;
    }
}
</style>
