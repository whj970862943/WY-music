<template>
  <div class="findmusic">
    <div class="content"> 
      <el-menu class="el-menu-demo" 
        mode="horizontal" :router="true" default-active="/findmusic/recommend">
        <el-menu-item index="/findmusic/recommend">个性推荐</el-menu-item>
        <el-menu-item index="/findmusic/songlist">歌单</el-menu-item>
        <el-menu-item index="/findmusic/anchorstation">主播电台</el-menu-item>
        <el-menu-item index="/findmusic/leaderboard">排行榜</el-menu-item>
        <el-menu-item index="/findmusic/singer">歌手</el-menu-item>
        <el-menu-item index="/findmusic/latestmusic">最新音乐</el-menu-item>
      </el-menu>
    </div>
    <router-view></router-view>   
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>

.content{
  display: flex;
  justify-content: center;
  border-bottom: solid 1px #e6e6e6;
  .el-menu-demo{
    border: none;
    .el-menu-item.is-active{
      border-bottom: 2px solid red;

    }
  }
}

</style>
