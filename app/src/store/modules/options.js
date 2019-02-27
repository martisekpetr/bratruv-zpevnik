export default {
  state: {
    shouldShowChords: true,
    isDark: false,
    // in rem
    fontSize: 1.2,
    transposition: 0,
  },
  mutations: {
    switchShowChords (state, payload) {
      state.shouldShowChords = payload
    },
    changeFontSize (state, payload) {
      state.fontSize = payload
    },
    switchDarkTheme (state, payload) {
      state.isDark = payload
    },
    transposeUp (state) {
      state.transposition = (state.transposition + 1) % 12
    },
    transposeDown (state) {
      state.transposition = (state.transposition - 1) % 12
    },
    transposeReset (state) {
      state.transposition = 0
    },
  },
  getters: {
    shouldShowChords: state => state.shouldShowChords,
    fontSize: state => state.fontSize,
    isDark: state => state.isDark,
    transposition: state => state.transposition,
  },
}
