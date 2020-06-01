<template>
  <div>
    <!-- {{collectlist}} -->
    <div class="container">
      <div class="item" v-for="item in collectlist" :key="item.userId">
        <el-avatar class="avatar" :size="70" :src="item.avatarUrl"></el-avatar>
        <div class="name">
          <span class="text">{{item.nickname}}</span>
        </div>
      </div>
      
    </div>
    <!-- 收藏者分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="querInfo.pagenum"
      :page-sizes="[21, 28, 49, 70]"
      :page-size="querInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name:'Collector',
    props:{
      musiclistid:Number
    },
    data(){
      return{
        collectlist:[],
        total:0,
        querInfo:{
          
          // 当前页数
          pagenum:1,
          // 每页几条
          pagesize:21
        },

      }
    },
    created(){
      this.getcollectorlist()
    },
    methods:{
      async getcollectorlist(){
        let id = this.musiclistid || this.$cookies.get('songlistid')
        const {data:ans} = await this.$http.get('/playlist/detail?id=' + id)
        this.total = ans.playlist.subscribedCount

        const {data:res} = await this.$http.get(`/playlist/subscribers?id=${id}&limit=${this.querInfo.pagesize}&offset=${this.querInfo.pagenum}`)
        console.log(res);
        if(res.code !== 200) return this.$message.error('获取收藏者失败')
        this.collectlist = res.subscribers
      },
      //监听pagesize改变
      handleSizeChange(newsize){
        this.querInfo.pagesize = newsize
        this.getcollectorlist()
      },
      //监听pagenum改变
      handleCurrentChange(pagenum){
        this.querInfo.pagenum = pagenum
        this.getcollectorlist()
      },
    }
  }
</script>

<style lang="scss" scoped>
.container{
  // height: 500px;
  width: 1100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-wrap:wrap;
  padding-left: 20px;

  .item{
    width: 126px;
    height: 120px;
    margin: 10px 15px 20px 15px;
    overflow: hidden;
    flex-wrap:wrap;
    .avatar{
      display: block;
      margin: 0 auto;
      

    }
    .name{
      display: block;
      text-align: center;
      width: 126px;
      

    }

  }
}
.el-pagination{
  margin: 0  15% 15px 15%;
}
</style>
