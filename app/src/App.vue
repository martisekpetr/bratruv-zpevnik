<template>
  <v-app :dark="isDark">
    <Toolbar />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import Toolbar from './components/Toolbar'

export default {
  name: 'App',
  components: {
    Toolbar,
  },
  computed: {
    ...mapGetters([
      'isDark',
    ]),
  },
  created () {
    this.loadSongs()
    this.$router.afterEach(() => {
      this.transposeReset()
    })
  },
  methods: {
    ...mapMutations([
      'transposeReset',
    ]),
    ...mapActions([
      'loadSongs',
    ]),
  },
}
</script>

<style></style>
