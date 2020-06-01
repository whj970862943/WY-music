<template>
  <div class="comment">
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
</template>

<script>
  export default {
    name:'Comment',
    props:{
      musiclistid:Number
    },
    data(){
      return{
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
      }
    },
    computed:{
      
    },
    created(){
      // console.log(this.musiclistid);
      this.getcommentlist()
    },
    methods:{
      async getcommentlist(){
        let id = this.musiclistid || this.$cookies.get('songlistid')
        const {data:res} = await this.$http.get
          (`/comment/playlist?id=${id}&limit=${this.querInfo.pagesize}&offset=${this.querInfo.pagenum}`)
        console.log(res);
        this.commentlist = res.comments
        this.total = res.total
        
      },
      //监听pagesize改变
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
    }
    

  

  }
</script>

<style lang="scss" scoped>
.comment{
  width: 94%;
  margin: 0 auto;
  .pinglun{
    background-color: rgb(228, 228, 230);
    height: 70px;
    margin: 10px auto;
    box-shadow: -5px -5px 10px 15px rgb(228, 228, 230);
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
</style>
