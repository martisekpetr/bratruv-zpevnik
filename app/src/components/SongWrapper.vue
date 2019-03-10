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
}
</script>

<style>
.next-button, .prev-button {
  border: none;
  background-color: transparent;
  position: fixed;
  top: 0;
  bottom: 0;
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
  padding-right: 1vw;
}
.prev-button {
  padding-left: 1vw;
  left: 0;
}

.prev-button::after {
  content: "";
  height: 100%;
  width: 2vw;
  background-color: transparent;
  position: absolute;
  top: 0;
  left: 100%;
  border-top-right-radius: 50%;
  border-bottom-right-radius: 50%;
  transition: all 0.3s;
}

.next-button::after {
  content: "";
  height: 100%;
  width: 2vw;
  background-color: transparent;
  position: absolute;
  top: 0;
  right: 100%;
  border-top-left-radius: 50%;
  border-bottom-left-radius: 50%;
  transition: all 0.3s;
}

</style>
