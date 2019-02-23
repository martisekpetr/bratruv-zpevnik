import Vue from 'vue'
import Vuex from 'vuex'
import songs from './modules/songs'
import options from './modules/options'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    songs,
    options,
  },
  strict: debug,
})
