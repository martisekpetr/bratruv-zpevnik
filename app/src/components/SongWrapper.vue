<template>
  <v-layout
    v-touch="{
      left: nextSong,
      right: previousSong,
    }"
    column
    fill-height
  >
    <button
      v-show="!isPreviousDisabled"
      class="prev-button hidden-sm-and-down"
      @click="previousSong"
    >
      <v-icon large>
        arrow_back_ios
      </v-icon>
    </button>
    <button
      v-show="!isNextDisabled"
      class="next-button hidden-sm-and-down"
      @click="nextSong"
    >
      <v-icon large>
        arrow_forward_ios
      </v-icon>
    </button>
    <Song :song="songs[currentSongIndex]" />
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'
import Song from './Song.vue'

export default {
  name: 'SongWrapper',
  components: {
    Song,
  },
  computed: {
    currentSongIndex () {
      return this.$route.params.id || 0
    },
    isNextDisabled () {
      return parseInt(this.$route.params.id) >= this.songs.length - 1
    },
    isPreviousDisabled () {
      return parseInt(this.$route.params.id) <= 0
    },
    ...mapGetters([
      'songs',
    ]),
  },
  mounted () {
    const self = this
    window.addEventListener('keydown', function (event) {
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault()
          self.previousSong()
          break
        case 'ArrowRight':
          event.preventDefault()
          self.nextSong()
          break
        case 'Home':
          if (event.ctrlKey) {
            event.preventDefault()
            self.goToBeginning()
          }
          break
        case 'End':
          if (event.ctrlKey) {
            event.preventDefault()
            self.goToEnd()
          }
          break
      }
    })
  },
  methods: {
    nextSong: function () {
      if (this.isNextDisabled) {
        return
      }
      this.$router.push({
        name: 'song',
        params: { id: parseInt(this.$route.params.id) + 1 },
      })
    },
    previousSong: function () {
      // console.log(this.isPreviousDisabled)
      if (this.isPreviousDisabled) {
        return
      }
      this.$router.push({
        name: 'song',
        params: { id: parseInt(this.$route.params.id) - 1 },
      })
    },
    goToBeginning: function () {
      this.$router.push({
        name: 'song',
        params: { id: 0 },
      })
    },
    goToEnd: function () {
      this.$router.push({
        name: 'song',
        params: { id: this.songs.length - 1 },
      })
    },
  },
  beforeRouteUpdate (to, from, next) {
    this.$store.commit('setSearchKeyword', '')
    next()
  }
}
</script>

<style>
.next-button, .prev-button {
  border: none;
  background-color: transparent;
  position: fixed;
  padding: 0 1vw;
  top: 10vh;
  bottom: 10vh;
  outline: none;
  transition: all 0.3s;
}

.next-button:hover,
.prev-button:hover,
.next-button:hover::after,
.prev-button:hover::after
{
  background-color: lightgrey;
}

.next-button {
  right:0;
  border-top-left-radius: 100%;
  border-bottom-left-radius: 100%;
}
.prev-button {
  left: 0;
  border-top-right-radius: 100%;
  border-bottom-right-radius: 100%;
}

</style>
