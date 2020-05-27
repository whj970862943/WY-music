<template>
  <div class="songlist">
    <div class="musicinfo">
      <img :src="musicimg">
      <div class="song_abstract" 
        :style="{width:font_width + 'px'}">{{musicabstract}}</div>
    </div>
    
  </div>
</template>

<script>
  export default {
    props:{
      musicimg:String,
      musicabstract:String,
      id:String
    },
    data(){
      return{
        
      }
    },
    computed:{
      font_width:function(){
        let wid = this.musicimg.split('?')[1].split('=')[1].split('y')[0]
        return parseInt(wid) 
      }
    },
    methods:{
      goMusicDetial(id){
        // 到音乐详情页并播放歌曲
        // console.log(id);
        
      }
    }
  }
</script>

<style lang="scss" scoped>

.musicinfo{
  margin: 10px 4.3px;
  color: #000;
  .song_abstract{
    text-align: center;
    
  }
    
  
}
</style>
