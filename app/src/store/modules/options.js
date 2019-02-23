export default {
  state: {
    shouldShowChords: true,
    isDark: false,
    // in rem
    fontSize: 1.2,
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
  },
  getters: {
    shouldShowChords: state => state.shouldShowChords,
    fontSize: state => state.fontSize,
    isDark: state => state.isDark,
  },
}
