<template>
  <div class="songlistdetail">
    <!-- 歌单介绍 -->
    <!-- <div>  -->
      <el-container>
        <!-- 图片 -->
        <!-- <el-aside> -->
        <img class="image" :src="this.songlistinfo.coverImgUrl">
        <!-- </el-aside> -->

        <!-- 文字 -->
        <el-main :class="this.fold ? 'addheight' : ''">
          <div>
            <span class="gedan">歌单</span>
            <span class="title">{{this.songlistinfo.name}}</span>
            
            <!-- 右上角数量 -->
            <div class="count">
              <div class="songcount">
                <div>歌曲数</div>
                <div class="center">{{this.songlistinfo.trackCount}}</div>
              </div>             
              <div class="playcount"> 
                <div>播放数</div>
                <div class="center">{{this.playcount}}</div>
              </div>  
            </div>
            <!-- 创建者 -->
            <div class="create">
              <el-avatar size="medium" :src="this.songlistinfo.creator.avatarUrl"></el-avatar>
              <span class="nickname">{{this.songlistinfo.creator.nickname}}</span>
              <span class="trackUpdateTime">{{this.songlistinfo.trackUpdateTime | dateFormat}}更新</span> 
            </div>
            <!-- 按钮 -->
            <div class="button">
              <el-button class="button_play" size="mini">
                <i class="el-icon-video-play"></i>
                播放全部
              </el-button>
              <el-button class="button_white" size="mini">
                <i class="el-icon-folder-add"></i>
                收藏({{this.songlistinfo.subscribedCount}})
              </el-button>
              <el-button class="button_white" size="mini">
                <i class="el-icon-share"></i>
                分享({{this.songlistinfo.shareCount}})
              </el-button>
              <el-button class="button_white" size="mini">
                <i class="el-icon-download"></i>
                VIP下载
              </el-button>
            </div>

            <!-- 标签 -->
            <div class="tag">
              <span>标签：</span>
              {{this.tag}}
            </div>

            <!-- 简介 -->
            <div class="introduce">
              <span>简介：</span>
              {{this.introduce}}
            </div>

            <div class="fold">
              <i :class="foldclass" @click="isfold()"></i>
            </div>
          </div>
          
        </el-main>
      </el-container>
    <!-- </div> -->

    <!-- 歌单列表 -->
    <div class="songlist">
      <!-- 标签 -->
      <div class="tabs">
        <el-tabs v-model="activeName">
          <el-tab-pane label="歌曲列表" class="textcolor" name="musiclist">
            <MusicList :trackIds="this.moremusiclist"></MusicList>
          </el-tab-pane>
          <el-tab-pane :label="'评论(' +  this.songlistinfo.commentCount + ')'" name="comment">
            <Comment></Comment>
          </el-tab-pane>
          <el-tab-pane label="收藏者" name="collector">
            <Collector></Collector>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
  import MusicList from '../../components/SongList/MusicList'
  import Comment from '../../components/SongList/Comment'
  import Collector from '../../components/SongList/Collector'
  export default {
    name:'SongListDetail',
    components:{
      MusicList,
      Comment,
      Collector,
    },
    data(){
      return{
        // 音乐列表信息
        songlistinfo:{
          creator:{
            nickname:'',
            avatarUrl:'',
          },
          
        },
        tags:[],
        // 简介：
        description:'',
        // 折叠箭头
        fold:true,
        // 音乐列表
        musiclist:[],
        activeName:'musiclist',
        trackIds:[],
        // 获取更多音乐数组
        moremusiclist:[],
        musicids:[],
        musicidstr:''
      }
    },
    computed:{
      // 音乐列表ID
      musiclist_id(){
        return this.$route.params.musiclist_id
      },
      // 播放数量
      playcount(){
        return Math.round(this.songlistinfo.playCount / 10000) + '万'
      },
      tag(){
        return this.tags.join(' / ')
      },
      introduce(){
        return this.description
      },
      foldclass(){
        return this.fold ? 'el-icon-arrow-down' : 'el-icon-arrow-up'
      },
    },
    created(){
      this.getSongListInfo()
    },
    mounted(){
      
    },
    methods:{
      async getSongListInfo(){
        let id = this.musiclist_id || this.$cookies.get('songlistid')  
        const {data:res} = await this.$http.get('/playlist/detail?id=' + id)
        if(res.code !== 200) return this.$message.error('获取歌单列表失败！')
        // console.log(res.playlist);
        this.songlistinfo = res.playlist
        // console.log(this.songlistinfo.creator);
        this.tags = res.playlist.tags
        // console.log(this.tags);
        this.description = res.playlist.description
        this.trackIds = res.playlist.trackIds        
        this.trackIds.forEach(item => {         
          this.musicids.push(item.id)
        })
        this.musicidstr = this.musicids.join(',')
        const {data:ans} = await this.$http.get('/song/detail?ids=' + this.musicidstr)
        this.moremusiclist = ans.songs
        // console.log(this.moremusiclist);
      },
      isfold(){
        this.fold = !this.fold
      },
    },
  }
</script>

<style lang="scss" scoped>

.image{
  width: 200px;
  height: 200px;
  margin: 30px 10px 20px 30px;
}
.addheight{
  height: 215px;
}
.el-main{
  padding: 35px 20px 30px 20px;
  
  overflow: hidden;

  .gedan{
    color: rgb(207, 53, 53);
    border: 1px solid rgb(207, 53, 53);
    border-radius: 2px;
    padding: 0px 4px;
    font-size: 14px;
    margin-right: 10px;
  }
  .title{
    font-size: 22px;
  }
  .count{
    float: right;
    font-size: 14px;
    color: rgba( #727272, 0.7);
    .songcount{
      float: left;
      border-right: 1px solid rgba( #727272, 0.5);
      padding-right: 10px;
    }
    .playcount{
      float: right;
      padding-left: 10px;
    }
    .center{
      text-align: center;
    
    }
    
  }
  .create{
    margin: 12px 0 15px 0;
    span{
      vertical-align:middle
    }
    .nickname{
      margin: 0 10px 0 8px;
      color: rgba( black, 0.7);
    }
    .trackUpdateTime{
      color: rgba( #727272, 0.7);
      font-size: 14px;
    }
  }
  .button{
    .button_play{
      background-color:#C62F2F;
      border-color:#C62F2F;
      color: rgb(248, 245, 245);
      font-size: 15px;
      border-radius: 6px;
      .el-icon-video-play{
        font-size: 15px;
        margin-left: -5px;
      }
      
    }
    .button_play:hover{
      background-color:rgb(182, 34, 34);
    }
    
    .button_white{
      font-size: 15px;
      border-radius: 6px;
      .el-icon-folder-add{
        font-size: 15px;
        margin-left: -5px;
      }
    }
    .button_white:hover{
      background-color:rgba(#F5F5F7,0.7);
      color:black;
    }
  }
  .tag{
    margin: 15px 5px 5px 0;
    font-size: 14px;
  }
  .introduce{
    width: 500px;
    font-size: 14px;
    display: inline-block;
  }
  .fold{
    float: right;
    cursor: pointer;
  }
}

.songlist{
  position: absolute;
  top: 330px;
  width: 1140px;
  margin-bottom: 76px;
  .tabs{
    width: 1140px;
    float: left;
  }
  
}
</style>
