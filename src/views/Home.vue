<template>
    <div class="player">
        <h3>Using Vue with html5 to play m3u8 media file with video.js 7 player</h3>
        <h4>Free m3u8 player demo test resource: <a href="https://bitmovin.com/mpeg-dash-hls-examples-sample-streams/">https://bitmovin.com/mpeg-dash-hls-examples-sample-streams/</a>
        </h4>
        <div>
            <button @click="switchPlayer">Play</button> &nbsp;
            <input type="text" v-model="src" style="width: 500px">
        </div>
        <br>

        <video-player ref="videoPlayer"
                      class="vjs-custom-skin"
                      :options="playerOptions"
                      @play="onPlayerPlay($event)"
                      @ready="onPlayerReady($event)">
        </video-player>
        <h3 style="text-align:center">Thanks for your support</h3>
        <adsense
                root-class="wrapper"
                data-ad-client="ca-pub-1893384651266286"
                data-ad-slot="2627967536"
        ></adsense>
        <Ribbon text='Vue videojs7' url="https://github.com/alterhu2020/vue-videojs7" color='#ff7600' position='right-top'/>
    </div>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer.vue'
import Adsense from '@/components/xui-adsense/InArticleAdsense.vue'
import Ribbon from 'vue-ribbon'

export default {
  name: 'home',
  components: {
    VideoPlayer, Adsense, Ribbon
  },
  data () {
    return {
      src: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
      playerOptions: {
        autoplay: true,
        controls: true,
        controlBar: {
          timeDivider: false,
          durationDisplay: false
        }
        // poster: 'https://surmon-china.github.io/vue-quill-editor/static/images/surmon-5.jpg'
      }
    }
  },
  computed: {
    player () {
      return this.$refs.videoPlayer.player
    }
  },
  methods: {
    onPlayerPlay (player) {
      console.log('player play!', player)
    },
    onPlayerReady (player) {
      console.log('player ready!', player)
      this.player.play()
    },
    playVideo: function (source) {
      const video = {
        withCredentials: false,
        type: 'application/x-mpegurl',
        src: source
      }
      this.player.reset() // in IE11 (mode IE10) direct usage of src() when <src> is already set, generated errors,
      this.player.src(video)
      // this.player.load()
      this.player.play()
    },
    switchPlayer: function () {
      this.playVideo(this.src)
    }
  },
  mounted () {
    const src = 'https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8'
    this.playVideo(src)
  }
}
</script>

<style scoped>
    .player {
        position: absolute !important;
        width: 100%;
        height: 100%;
    }

    .vjs-custom-skin {
        height: 90% !important;
    }

    .vjs-custom-skin /deep/ .video-js {
        width: 100% !important;
        height: 90%;
    }
</style>
