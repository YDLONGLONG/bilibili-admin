import Vue from 'vue'
import {formatDate} from 'element-ui/src/utils/date-util'
//自定义时间过滤器 'yyyy-MM-dd HH:mm:ss'
Vue.filter('dateFormat', value => formatDate(value, 'yyyy-MM-dd'))
Vue.filter('fullDateFormat', value => formatDate(value, 'yyyy-MM-dd HH:mm'))
Vue.filter('urlFormat', value => 'http://localhost:3000' + value)
Vue.filter('livePushFormat', value => 'rtmp://localhost' + value)
Vue.filter('sexFormat', (value) => {
  switch (value) {
    case 0:
      return '男'
    case 1:
      return '女'
  }
})
Vue.filter('videoTypeFormat', value => {
  switch (value) {
    case 0:
      return '生活'
    case 1:
      return '科技'
    case 2:
      return '游戏'
    case 3:
      return '校园'
    case 4:
      return '教育'
    case 5:
      return '音乐'
    case 6:
      return '电影'
    case 7:
      return '首页'
  }
})
Vue.filter('onLiveFormat', value => {
  switch (value) {
    case true:
      return '在播'
    case false:
      return '未播'
  }
})
