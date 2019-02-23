import Vue from 'vue'
import Router from 'vue-router'
import SongWrapper from './components/SongWrapper.vue'
import TableOfContents from './components/TableOfContents.vue'

Vue.use(Router)

export default new Router({
  // scroll to top on route change
  scrollBehavior () {
    return { x: 0, y: 0 }
  },
  routes: [
    { path: '/', redirect: '/song/0' },
    { path: '/song', redirect: '/song/0' },
    {
      path: '/song/:id',
      name: 'song',
      component: SongWrapper,
    },
    {
      path: '/toc',
      name: 'toc',
      component: TableOfContents,
    },
  ],
})
