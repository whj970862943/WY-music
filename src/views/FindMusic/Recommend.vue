<template>
  <div class="main_song">
    <!-- 跑马灯 -->
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="200px">
        <!-- targetType: 1004为MV，1为歌曲，3000为广告 -->
        <el-carousel-item v-for="item in carousellist" :key="item.imageUrl">
          <img :src="item.imageUrl + '?param=514y200'" >
        </el-carousel-item>
      </el-carousel>
    </div>

    <!-- 推荐歌单 -->
    <div>
      <span class="font_list">推荐歌单</span>
      <div class="under_line"></div>
      <div class="tuijian">
        <router-link v-for="item in recommendedplaylist" :key="item.id" 
          :to="{
            name:'songlistdetail', 
            params:{musiclist_id:item.id}
          }" @click.native="addsonglistid(item.id)">
          <SongList :musicimg="item.picUrl + '?param=200y200'" 
            :musicabstract="item.name"></SongList>
        </router-link>
      </div>
    </div>

    <!-- 独家放送 -->
    <div>
      <span class="font_list">独家放送</span>
      <div class="under_line"></div>
      <div class="tuijian">
        <router-link v-for="item in exclusivebroadcastlist" :key="item.id"
        :to="{
            name:'currentmvdetail', 
            params:{currentmv_id:item.id}
          }" @click.native="addcurrentmvid(item.id)">
          <SongList :musicimg="item.sPicUrl + '?param=335y200'" 
            :musicabstract="item.name"
          ></SongList>
        </router-link>
      </div>
    </div>
  </div>
</template>



<script>
  import SongList from '../../components/SongList.vue'
  // import {mapState,mapMutation, mapGetters, mapMutations} from 'vuex'
  export default {
    components:{
      SongList
    },
    data(){
      return{
        carousellist:[],//跑马灯歌曲
        carouselimagelist:[],//跑马灯图片

        recommendedplaylist:[],//推荐歌单
        exclusivebroadcastlist:[]//独家放送歌单
      }
    },
    
    created(){
      this.getCarouselList()
      this.getSongList()
      this.getExclusiveBroadcast()
    },
    
    
    computed:{
      
    },
    methods:{
      
      // 获取跑马灯歌曲
      async getCarouselList(){
        const {data:res} = await this.$http.get('/banner')
        if(res.code !== 200){
          return this.$message.error('获取跑马灯歌曲失败')
        } 
        this.carousellist = res.banners
        // console.log(this.carousellist);
        
      },
      // 获取推荐歌单
      async getSongList(){
        const {data:res} = await this.$http.get('/personalized?limit=10')
        if(res.code !== 200){
          return this.$message.error('获取歌单失败')
        }
        this.recommendedplaylist = res.result
      },
      // 获取独家放送
      async getExclusiveBroadcast(){
        const {data:res} = await this.$http.get('/personalized/privatecontent')
        if(res.code !== 200){
          return this.$message.error('获取独家放送失败')
        }
        this.exclusivebroadcastlist = res.result
        console.log(this.exclusivebroadcastlist);
        
      },
      // 将歌单ID存到session中
      addsonglistid(id){
        this.$cookies.set('songlistid',id)
      },
      addcurrentmvid(id){
        this.$cookies.set('currentmvid',id)
      }
    }
  }
</script>

<style lang="scss" scoped>
.main_song{
  width:90%;
  margin: 0 auto;
  .carousel{
    margin-top:10px;
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
  }
  .font_list{
    font-size: 18px;
  }
  .under_line{
    margin-top: 7px;
    width: 1044px;
    border-top: 1px solid #e6e6e6;
  }
  li{
    list-style: none;
  }
  .tuijian{
    display: flex;
    width: 1044px;
    justify-content:space-between;
    flex-wrap:wrap;
    cursor: pointer;
  }
}



</style>
