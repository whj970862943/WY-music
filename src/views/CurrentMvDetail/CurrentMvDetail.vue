<template>
  <div class="main">
    
    <div class="content">
      <!-- 内容 -->
      <el-row :gutter="5" class="content">
        <!-- left -->
        <el-col :span="16" class="left">
          <div>
            <span class="mvicon">MV</span>
            <span class="name">{{mvinfo.name}}</span>
            <span class="artistName">{{mvinfo.artistName}}</span>
          </div>

          <!-- 播放器 -->
          <videoPlayer
            class="video-player vjs-custom-skin"
            :options="playerOptions">
          </videoPlayer>
          <!-- 按钮 -->
          <div class="button">
            <el-button class="button_white" size="mini">
              <i class="el-icon-thumb"></i>
              点赞({{count.likedCount}})
            </el-button>
            <el-button class="button_white" size="mini">
              <i class="el-icon-folder-add"></i>
              收藏({{count.commentCount}})
            </el-button>
            <el-button class="button_white" size="mini">
              <i class="el-icon-share"></i>
              分享({{count.shareCount}})
            </el-button>
            <el-button class="button_white" size="mini">
              <i class="el-icon-download"></i>
              下载MV
            </el-button>
          </div>
        </el-col>

        <!-- right -->
        <el-col :span="8" class="right">  
          <span class="text">
            MV介绍
          </span>
          <div class="under_line"></div>
          <div class="middle">
            <span class="publish">发布时间：{{mvinfo.publishTime}}</span>
            <span class="count">播放次数：{{mvinfo.playCount}}</span>
          </div>

          <div>
            <div class="introduce">简介：{{mvinfo.desc}}</div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 评论 -->
    <div class="comment">
      <div class="title">
        <span>评论({{mvinfo.commentCount}})</span>
      </div>
      <!-- <div class="under_line"></div> -->
      <div class="pinglun">
        <el-input
          class="input"
          type="textarea"
          autosize
          maxlength="140" show-word-limit>
        </el-input>
        <el-button class="pinglunbutton" size="mini">评论</el-button>
      </div>
      
      <div class="plcontent">
        <span class="text">最新评论</span>
        <!-- 评论 -->
        <el-card class="commentdetail" v-for="item in this.commentlist" :key="item.commentId" shadow="hover" >
          <el-container>
            <!-- <el-aside> -->
            <el-avatar class="avatar"  size="medium" :src="item.user.avatarUrl"></el-avatar>
          <!-- </el-aside> -->
            <el-main>
              <div>
                <span class="nickname">{{item.user.nickname}}：</span>
                <span class="content">{{item.content}}</span>
              </div>
              <!-- 回复 -->
              <div v-if="item.beReplied.length" class="recall">
                <span class="renickname">@{{item.beReplied[0].user.nickname}}：</span>
                <span class="recontent">{{item.beReplied[0].content}}</span>
              </div>
              <div class="time">
                {{item.time | commentdate}}
              </div>
              <div class="zan">
                <el-col :span="8">
                  <i class="el-icon-thumb"></i>
                  <span v-if="item.likedCount">({{item.likedCount}})</span>
                </el-col>
                <el-col :span="8">
                  <span class="border">分享</span>
                </el-col>
                <el-col :span="8">
                  <span>回复</span>
                </el-col>
              </div>
            </el-main>
          </el-container> 
        </el-card>

        <!-- 评论分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="querInfo.pagenum"
          :page-sizes="[3, 5, 10, 15]"
          :page-size="querInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  // require styles
  import 'video.js/dist/video-js.css'

  import { videoPlayer } from 'vue-video-player'
  export default {
    name:'currentmvdetail',
    // props:[''],
    data () {
      return {
        count:{},
        mvinfo:{},
        // mv地址url
        mvurl:'',
        playerOptions: {
          // videojs options
          // muted: true,
          language: 'en',
          width:700,
          autoplay: true,
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src:''
            // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
          }],
          poster: "/static/images/author.jpg",
        },
        // 评论数据
        commentlist:[],
        // 分页查询
        total:0,
        querInfo:{
          // type:3,
          // 当前页数
          pagenum:1,
          // 每页几条
          pagesize:5
        },
      };
    },
    components: {
      videoPlayer
    },
    computed: {
      currentmv_id(){
        return this.$route.params.currentmv_id
      },
    },

    created() {
      this.getmvdetail()
      this.getcommentlist()
    },
    mounted() {
      
    },
    methods: {
      // 获取mv数据
      async getmvdetail(){
        let id = this.currentmv_id || this.$cookies.get('currentmvid') 
        // mv数据
        const {data:res} = await this.$http.get('/mv/detail?mvid=' + id)
        console.log(res);
        this.mvinfo = res.data
        // MV点赞评论分享数量
        const {data:info} = await this.$http.get('/mv/detail/info?mvid=' + id)
        this.count = info
        // mv视频地址
        const {data:ans} = await this.$http.get('/mv/url?id=' + id)
        // console.log(ans.data.url);
        
        this.playerOptions.sources[0].src = ans.data.url

        
      },
      async getcommentlist(){
        let id = this.currentmv_id || this.$cookies.get('currentmvid')
        const {data:com} = await this.$http.get
          (`/comment/mv?id=${id}&limit=${this.querInfo.pagesize}&offset=${this.querInfo.pagenum}`)
        // console.log(res);
        this.commentlist = com.comments
        this.total = com.total
        
      },
      handleSizeChange(newsize){
        this.querInfo.pagesize = newsize
        this.getcommentlist()
      },
      //监听pagenum改变
      handleCurrentChange(pagenum){
        this.querInfo.pagenum = pagenum
        this.getcommentlist()
      },
    },
    filters:{
      commentdate(date){
        const dt = new Date(date)
        const y = dt.getFullYear()
        const m = (dt.getMonth() + 1 +'').padStart(2,'0')
        const d = (dt.getDate( )+'').padStart(2,'0')

        const hh = (dt.getHours() + '').padStart(2,'0')
        const mm = (dt.getMinutes() + '').padStart(2,'0')
        // const ss = (dt.getSeconds() + '').padStart(2,'0')
        return `${y}年${m}月${d}日 ${hh}:${mm}`
      }
    },
    watch: {}

  }

</script>
<style lang='scss' scoped>
.main{
  
  .content{
    margin: 15px 15px 15px 20px;
    .left{
      .mvicon{
        border: 1px solid red;
        color: red;
        padding: 2px 4px;
        font-size: 11px;
        
      }
      .name{
        font-size: 18px;
        margin-left: 5px;
      }
      .artistName{
        font-size: 13px;
        margin-left: 7px;
      }
      .video-player{
        margin: 15px 0 15px 3px;
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
    }
    .right{
      margin-top: 5px;
      width: 250px;
      .text{
        font-size: 20px;
      }
      .under_line{
        margin-top: 7px;
        width: 250px;
        border-top: 1px solid #e6e6e6;
      }
      .middle{
        margin-top: 5px;
        display: flex;
        justify-content: space-between;
        .publish{
          font-size: 12px;
          color: #868383;
        }
        .count{
          font-size: 12px;
          color: #868383;
        }
        
      }
      .introduce{
        margin-top: 15px;
        font-size: 13px;
        color: #272727;
      }
    }
  }

  .comment{
    width: 61%;
    margin: 30px 30px;
    .title{
      // margin-bottom: 20px;
      font-size: 18px;
    }
    .under_line{
      margin: 15px 0;
      width: 700px;
      border-top: 1px solid #e6e6e6;
    }
    .pinglun{
      background-color: rgb(228, 228, 230);
      height: 70px;
      margin: 20px auto;
      box-shadow: -3px -3px 7px 10px rgb(228, 228, 230);
      .pinglunbutton{
        float: right;
        margin-top: 5px;
        display: block;
      }
    }
    .plcontent{
      .text{
        display: inline-block;
        margin: 20px 0 10px 0;
      }
      .commentdetail{
        // margin-top: 10px;
        .el-container{
          display: flex;
          align-items: center;
          .el-avatar{
            // margin: 3px;
          }
          .el-main{
            padding: 13px 10px 13px 14px;
            .nickname{
              color:#0C73C2;
              font-size: 12px;
            }
            .content{
              font-size: 12px;
            }
            .time{
              margin-top: 5px;
              font-size: 12px;
              float: left;
              color: #999999;
            }
            .zan{
              float: right;
              // display: flex;
              width: 100px;
              // justify-content: space-between;
              position: relative;
              right: 15px;
              font-size: 13px;
              color: #999999;
              
            }
            .recall{
              background-color: #F1F1F4;
              padding: 5px 0 5px 5px;
              margin: 3px 0;
              // width: 70%;
              .renickname{
                color:#0C73C2;
                font-size: 12px;
              }
              .recontent{
                font-size: 12px;
                color: #666666;
              }
            }
          }
        }
      }
      .el-pagination{
        margin: 15px 15%;
        

      }
    }
  }
}
</style>