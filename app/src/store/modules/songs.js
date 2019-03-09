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
          song.versions
            ? (
              song.versions[0].song.title.toLowerCase().indexOf(state.searchKeyword) >= 0 ||
              song.versions[0].song.author.toLowerCase().indexOf(state.searchKeyword) >= 0 ||
              song.versions[1].song.title.toLowerCase().indexOf(state.searchKeyword) >= 0 ||
              song.versions[1].song.author.toLowerCase().indexOf(state.searchKeyword) >= 0
            )
            : (
              (song.title && song.title.toLowerCase().indexOf(state.searchKeyword) >= 0) ||
              (song.author && song.author.toLowerCase().indexOf(state.searchKeyword) >= 0)
            )
        ))
        .map(song => song.versions ? { ...song.versions[0].song, index: song.index } : song)
      : state.songs.map(song => song.versions ? { ...song.versions[0].song, index: song.index } : song),
    searchKeyword: state => state.searchKeyword,
    isLoaded: state => state.isLoaded,
  },
}
