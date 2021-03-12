# vue-videojs7

A vue video.js7 plugin, so you can play hls video(m3u8 format) within html5 easily, original forked from : 
[https://github.com/surmon-china/vue-video-player](https://github.com/surmon-china/vue-video-player)

## Demo Page 

[Demo for Video.js 7 m3u8 player](https://code.seniortesting.club/vue-videojs7/)

## How to use 

### 1. Install the plugin
```
yarn add vue-videojs7
npm install vue-videojs7 --save
```
### 2. usage

#### 2.1 Method1: Use with mount as global
```
import Vue from 'vue'
import {VideoPlayer} from 'vue-videojs7'

Vue.use(VideoPlayer, /* {
  options: global default videojs options,
  events: global videojs videojs events
} */)
```

#### 2.2 Method2: Use with mount as component 

```
import {videoPlayer} from 'vue-videojs7'

export default {
  components: {
    videoPlayer
  }
}

```

#### 2.3 Method3: Integration with nuxt as plugin

1. Create a nuxt plugin located in this place: `~/plugins/vue-videojs7.js`, put below code:

```vue
import Vue from 'vue'
import VideoPlayer from 'vue-videojs7'


Vue.use(VideoPlayer, /* {
  options: global default videojs options,
  events: global videojs videojs events
} */)

```
2. Register the plugin in your `nuxt.config.js` file:

```vue
    plugins: [
        {src: '~/plugins/vue-videojs7.js', mode: 'client'}
    ]
```
3. import the component in your vue file:

```vue
    <video-player ref="videoPlayer"
                  class="vjs-custom-skin"
                  :options="playerOptions"
                  @play="onPlayerPlay($event)"
                  @ready="onPlayerReady($event)">
    </video-player>
 
```

For detail configuration in nuxt project, check the [example nuxt code](https://github.com/alterhu2020/vue-videojs7/tree/master/examples/nuxt/)

## Example code

Detail full copied example from [Home.vue](https://github.com/alterhu2020/vue-videojs7/blob/master/src/views/Home.vue)

```
<template>
  <div class="player">
    <h3>Using Html5 to play m3u8 media file</h3>
    <video-player ref="videoPlayer"
                  class="vjs-custom-skin"
                  :options="playerOptions"
                  @play="onPlayerPlay($event)"
                  @ready="onPlayerReady($event)">
    </video-player>
  </div>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer.vue'

export default {
  name: 'home',
  components: {
    VideoPlayer
  },
  data () {
    return {
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
    height: 60%;
  }
  .vjs-custom-skin {
    height: 60% !important;
  }

  .vjs-custom-skin /deep/ .video-js {
    height: 60%;
  }
</style>


```

## Contact/Issues

Email: alterhu2020@gmail.com
