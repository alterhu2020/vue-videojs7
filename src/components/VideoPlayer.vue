<template>
  <div  v-if="reseted">
    <video class="video-js" ref="video">
      <track v-for="(crtTrack,index) in trackList"
             :key="index"
             :kind="crtTrack.kind" :label="crtTrack.label"
             :src="crtTrack.src" :srcLang="crtTrack.srcLang"
             :default="crtTrack.default"/>
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a web browser that
        <a href="https://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
      </p>
    </video>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import _videojs from 'video.js'
const videojs = window.videojs || _videojs

export default {
  name: 'VideoPlayer',
  props: {
    crossOrigin: {
      type: String,
      default: ''
    },
    playsinline: {
      type: Boolean,
      default: false
    },
    customEventName: {
      type: String,
      default: 'statechanged'
    },
    options: {
      type: Object,
      required: true
    },
    events: {
      type: Array,
      default: () => []
    },
    globalOptions: {
      type: Object,
      default: () => ({
        // document: https://docs.videojs.com/tutorial-options.html#fluid
        autoplay: true,
        controls: true,
        language: 'zh',
        inactivityTimeout: 0,
        preload: 'auto',
        fluid: false,
        techOrder: ['html5'],
        plugins: {}
      })
    },
    globalEvents: {
      type: Array,
      default: () => []
    },
    trackList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      player: null,
      reseted: true
    }
  },
  methods: {
    initialize: function () {
      const self = this
      const videoObj = this.$refs.video
      // videojs options
      const videoOptions = Object.assign({}, this.globalOptions, this.options)
      // ios fullscreen
      if (this.playsinline) {
        videoObj.setAttribute('playsinline', this.playsinline)
        videoObj.setAttribute('webkit-playsinline', this.playsinline)
        videoObj.setAttribute('x5-playsinline', this.playsinline)
        videoObj.setAttribute('x5-video-player-type', 'h5')
        videoObj.setAttribute('x5-video-player-fullscreen', false)
      }
      // cross origin
      if (this.crossOrigin !== '') {
        videoObj.crossOrigin = this.crossOrigin
        videoObj.setAttribute('crossOrigin', this.crossOrigin)
      }
      // avoid error "VIDEOJS: ERROR: Unable to find plugin: __ob__"
      if (videoOptions.plugins) {
        delete videoOptions.plugins.__ob__
      }
      // emit event
      const emitPlayerState = (event, value) => {
        if (event) {
          this.$emit(event, this.player)
        }
        if (value) {
          this.$emit(this.customEventName, { [event]: value })
        }
      }
      // player
      this.player = videojs(videoObj, videoOptions, function () {
        // events
        const DEFAULT_EVENTS = [
          'loadeddata',
          'canplay',
          'canplaythrough',
          'play',
          'pause',
          'waiting',
          'playing',
          'ended',
          'error'
        ]
        const events = DEFAULT_EVENTS.concat(self.events).concat(
          self.globalEvents
        )

        // watch events
        const onEdEvents = {}
        for (let i = 0; i < events.length; i++) {
          if (
            typeof events[i] === 'string' &&
              onEdEvents[events[i]] === undefined
          ) {
            (event => {
              onEdEvents[event] = null
              this.on(event, () => {
                emitPlayerState(event, true)
              })
            })(events[i])
          }
        }
        // player readied
        self.$emit('ready', this)
      })
    },
    dispose (callback) {
      if (this.player && this.player.dispose) {
        if (this.player.techName_ !== 'Flash') {
          this.player.pause && this.player.pause()
        }
        this.player.dispose()
        this.player = null
        this.$nextTick(() => {
          this.reseted = false
          this.$nextTick(() => {
            this.reseted = true
            this.$nextTick(() => {
              callback && callback()
            })
          })
        })
      }
    }
  },
  watch: {
    options: {
      deep: true,
      handler (options, oldOptions) {
        this.dispose(() => {
          if (options && options.sources && options.sources.length) {
            this.initialize()
          }
        })
      }
    }
  },
  mounted () {
    if (!this.player) {
      this.initialize()
    }
  },
  beforeDestroy () {
    if (this.player) {
      this.dispose()
    }
  }
}

</script>

<style scoped>

</style>
