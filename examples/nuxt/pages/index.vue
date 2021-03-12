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
    <client-only>
      <video-player ref="videoPlayer"
                    class="vjs-custom-skin"
                    :options="playerOptions"
                    @play="onPlayerPlay($event)"
                    @ready="onPlayerReady($event)"/>
    </client-only>
  </div>
</template>

<script>

export default {
  name: "index",
  data() {
    return {
      src: 'https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8',
      playerOptions: {
        autoplay: true,
        controls: true,
        controlBar: {
          timeDivider: false,
          durationDisplay: false
        }
      }
    }
  },
  methods: {
    onPlayerPlay(player) {
    },
    onPlayerReady(player) {
    },
    playVideo: function (source) {
      const player = this.$refs.videoPlayer.player
      const video = {
        withCredentials: false,
        type: 'application/x-mpegurl',
        src: source
      }
      player.reset() // in IE11 (mode IE10) direct usage of src() when <src> is already set, generated errors,
      player.src(video)
      // this.player.load()
      player.play()
    },
    switchPlayer: function () {
      this.playVideo(this.src)
    }
  },
  mounted() {
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
