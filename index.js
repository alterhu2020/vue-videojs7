/*
* Vue-Video-Player ssr.js
* Author: alterhu2020@gmail.com
* Github: https://github.com/alterhu2020/vue-videojs7
* Adapted from Videojs (https://github.com/videojs/video.js)
*/
import videoPlayer from './src/components/VideoPlayer.vue'

const install = function (Vue, config) {
  if (config) {
    if (config.options) {
      videoPlayer.props.globalOptions.default = () => config.options
    }
    if (config.events) {
      videoPlayer.props.globalEvents.default = () => config.events
    }
  }
  Vue.component(videoPlayer.name, videoPlayer)
}

export { videoPlayer, install }
