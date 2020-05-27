<template>
  <div>
    <div class="audio_play">
      <aplayer :music="musicList">
      </aplayer>
    </div>
  </div>
</template>

<script>
  import aplayer from "vue-aplayer";
  export default {
    props: ["pdfurl"],
    components: {
      //引入组件
      aplayer: aplayer
    },
    data() {
      return {
        musicList: {
          title: "1223",
          artist: "111",
          src: 'http://m7.music.126.net/20200525153205/66a560e895016e2aca5856fff6481ed8/ymusic/f3fb/235e/a216/2f95cb16b58562445a95eadda702952d.mp3',
          pic: "",
          lrc: ""
        }
      };
    },
    computed: {
      url() {
        return this.pdfurl;
      }
    },
    mounted() {
      this.musicList = {
        title: "wwqe",
        artist: "sadsad",
        src: 'http://m7.music.126.net/20200525153205/66a560e895016e2aca5856fff6481ed8/ymusic/f3fb/235e/a216/2f95cb16b58562445a95eadda702952d.mp3',
        pic: "",
        lrc: ""
      }
    }
  }
</script>

<style lang="scss" scoped>
.audio_play{
  width: 1340px;
  margin-left: 20px; 

}

</style>
