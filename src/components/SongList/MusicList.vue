<template>
  <div>
    <el-table
      :data="trackIds"
      size="mini" highlight-current-row
      style="width: 100%" stripe >
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column width="60" label="操作" align="center">
        <template>
          <i class="el-icon-star-off"></i>
          <i class="el-icon-download"></i>
        </template>
      </el-table-column>
      <el-table-column width="400" prop="name" label="音乐标题">
        <template slot-scope="scope">
          <span @click="playmusic(scope.row.name,scope.row.ar[0].name,scope.row.id,scope.row.al.picUrl)" class="musictitle">{{scope.row.name}}</span>
          <span class="musicvicetitle">{{ scope.row.alia[0] ? '(' + scope.row.alia[0] + ')' : '' }}</span>
        </template>
      </el-table-column>
      
      <el-table-column width="300" prop="ar[0].name" label="歌手">
        <template slot-scope="scope">
          {{scope.row.ar | artname}}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot="header">
          <el-input size="mini" placeholder="输入关键字搜索"/>
        </template>
        <el-table-column width="200" prop="al.name" label="专辑"></el-table-column>
        <el-table-column width="100" prop="dt" label="时长">
          <template slot-scope="scope">
            {{scope.row.dt | musictime}}
          </template>
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name:'MusicList',
    props:{
      trackIds:{
        type:Array,
        required:true
      }
    },
    data(){
      return{
        songname:'',
        singer:'',
        songurl:'',
        picurl:'',
        lrc:''
        
      }
    },
    computed:{
      
    },
    created(){
      
    },   
    methods:{ 
      async playmusic(songname,singer,id,pic){
        // console.log(this.trackIds);
        // 验证歌曲是否可用
        const {data:ans} = await this.$http.get('/check/music?id=' + id)
        if(!ans.success) return this.$message.error(ans.message)
        // 获取歌曲URL
        const {data:url} = await this.$http.get('/song/url?id=' + id)
        let murl = url.data[0].url
        // 获取歌词
        const {data:text} = await this.$http.get('/lyric?id=' + id)
        let musiclrc = text.lrc.lyric

        this.$store.commit('changemusic',{songname,singer,murl,pic,musiclrc})

      
        // console.log(this.getinfo);
        
      
      }  
    },
    filters:{
      artname(array){
        let arr = []
        array.forEach(item => {
          arr.push(item.name)
        });
        return arr.join('/')
      }
    }
  }
</script>

<style lang="scss" scoped>
.el-icon-star-off{
  cursor: pointer; 
  margin: 0 2px;
}
.el-icon-download{
  cursor: pointer; 
  margin: 0 2px;
}
.musictitle{
  color: black;
  cursor: pointer;
}
.musicvicetitle{
  color: #aca8a8;
}
</style>
