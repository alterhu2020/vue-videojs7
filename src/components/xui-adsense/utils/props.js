export default {
  rootClass: {
    type: String,
    default: 'adswrapper'
  },
  insClass: {
    type: String,
    default: ''
  },
  isNonPersonalizedAds: {
    type: Boolean,
    default: false
  },
  dataAdClient: {
    type: String,
    default: 'ca-pub-1893384651266286'
  },
  dataAdSlot: {
    type: String,
    default: '1627649589'
  },
  dataAdLayoutKey: {
    type: String,
    default: '-6t+ed+2i-1n-4w'
  },
  dataAdTest: {
    type: String,
    default: process.env.NODE_ENV !== 'production' ? 'on' : 'off'
  },
  dataAdFormat: {
    type: String,
    default: 'auto'
  },
  dataFullWidthResponsive: {
    type: Boolean,
    default: true
  }
}
