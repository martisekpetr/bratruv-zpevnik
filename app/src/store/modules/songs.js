import axios from 'axios'
import { parseAllSongs } from '../../helpers/parseTex'

export default {
  state: {
    songs: [],
    searchKeyword: null,
    isLoaded: false,
  },
  mutations: {
    setSongs (state, payload) {
      state.songs = payload
      state.isLoaded = true
    },
    setSearchKeyword (state, payload) {
      state.searchKeyword = payload ? payload.toLowerCase() : payload
    },
  },
  actions: {
    async loadSongs ({ commit }) {
      axios.get('https://raw.githubusercontent.com/martisekpetr/bratruv-zpevnik/master/zpevnik.tex')
        .then(response => {
          const songs = parseAllSongs(response)
          commit('setSongs', songs)
        })
        .catch(error => {
          console.log(error)
        })
    },

  },
  getters: {
    songs: state => state.songs,
    filteredSongs: state => state.searchKeyword && state.searchKeyword.length > 0
      ? state.songs
        .filter(song => (
          song.title.toLowerCase().indexOf(state.searchKeyword) >= 0 ||
          song.author.toLowerCase().indexOf(state.searchKeyword) >= 0
        ))
      : state.songs,
    searchKeyword: state => state.searchKeyword,
    isLoaded: state => state.isLoaded,
  },
}
