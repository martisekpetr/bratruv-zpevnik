import axios from 'axios'
import { parseAllSongs } from '../../helpers/parseTex'

const normalizeString = (str) => str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

const matchSongVersionToKeyword = (song, keyword) => {
  return (song.title && normalizeString(song.title).indexOf(keyword) >= 0) ||
  (song.author && normalizeString(song.author).indexOf(keyword) >= 0)
}

const matchSongToKeyword = (song, keyword) => {
  if (!song.versions) {
    return matchSongVersionToKeyword(song, keyword)
  }
  for (const i in song.versions) {
    if (matchSongVersionToKeyword(song.versions[i].song, keyword)) {
      return true
    }
  }
  return false
}

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
      state.searchKeyword = payload
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
    filteredSongs: state => (
      state.searchKeyword && state.searchKeyword.length
        ? state.songs
          .filter(song => matchSongToKeyword(song, normalizeString(state.searchKeyword)))
        : state.songs
    ).map(song => song.versions ? { ...song.versions[0].song, index: song.index } : song),
    searchKeyword: state => state.searchKeyword,
    isLoaded: state => state.isLoaded,
    songsCount: state => state.songs.length,
  },
}
