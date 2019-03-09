<template>
  <v-container>
    <div
      :class="['song', {'no-chords': !shouldShowChords }]"
      :style="{ fontSize: fontSize + 'rem'}"
    >
      <h1>
        {{ songData.title }}
      </h1>
      <h2>{{ songData.author }}</h2>
      <div class="top-right">
        <h3 v-if="songData.capo" class="capo">
          Capo {{ songData.capo }}
        </h3>
        <button
          v-if="hasVersions"
          class="lang_button"
          @click="flip"
        >
          <country-flag
            :country="flagCountry"
            size="normal"
          />
        </button>
      </div>

      <div class="song-text" v-html="songText" />
    </div>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import CountryFlag from 'vue-country-flag'

import { transposeChord } from '../helpers/transposition'

export default {
  name: 'Song',
  components: {
    CountryFlag,
  },
  props: {
    song: {
      type: Object,
      default: function () { return {} },
    },
  },
  data: function () {
    return {
      currentVersionIndex: 0,
      flip: () => {
        this.currentVersionIndex = (this.currentVersionIndex + 1) % this.song.versions.length
      },
    }
  },
  computed: {
    hasVersions () {
      return this.song.versions
    },
    songData () {
      return this.hasVersions ? this.song.versions[this.currentVersionIndex].song : this.song
    },
    songText () {
      return this.songData.text && this.songData.text.replace(/%CHORD_([^%]+)%/g, transposeChord(this.transposition))
    },
    currentLanguage () {
      return this.hasVersions ? this.song.versions[(this.currentVersionIndex + 1) % 2].language : ''
    },
    flagCountry () {
      const map = {
        czech: 'cz',
        english: 'gb',
      }
      return map[this.currentLanguage]
    },
    ...mapGetters([
      'shouldShowChords',
      'fontSize',
      'transposition',
    ]),
  },
}
</script>

<style scoped>
h1 {
  font-size: 2rem;
  line-height: 1.2;
}
h2 {
  margin-bottom: 1em;
  font-weight: normal;
  font-size: 1.2rem;
}

.song-wrapper {
  padding: 1rem;
}
.container {
  padding-top: 0;
}
.song {
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  padding: 0 7vw;
}
.song-text {
  text-align: left;
  display: inline-block;
  /* font-size: 1.2rem; */
  line-height: normal;
}

.top-right {
  position: absolute;
  top: -2.8rem;
  right: 1.2rem;
  margin: 0;
  display: flex;
  align-items: flex-end;
}

.lang_button {
  height: 30px;
  margin-left: 1rem;
  outline: none;
}

.flag {
  transform-origin: top;
}

.song.no-chords >>> .chord-wrapper,
.song.no-chords >>> .hskip {
  display: none;
}

.song >>> .chord-wrapper {
  display: inline-block;
  position: relative;
  /* width: 3px;
  height: 3px;
  background-color: #42b983; */
  margin-top: 4ex;
}

.song >>> .chord {
  /* content: attr(chord); */
  font-weight: bold;
  font-style: normal;
  position: absolute;
  /* left: 0; */
  bottom: 1.6ex;
  /* display: inline-block; */
}

.song >>> .fermata {
  font-size: x-large;
  transform: translateY(50%);
}

.song >>> .verse {
  position: relative;
}

.song >>> .verse::after {
  content: attr(verse);
  font-weight: bold;
  transform: translateX(-100%);
  position: absolute;
  bottom: 0;
}

.song >>> .chorus {
  position: relative;
}

.song >>> .chorus::after {
  content: "R:\00a0";
  font-weight: bold;
  transform: translateX(-100%);
  position: absolute;
  bottom: 0;
  /* display: inline-block; */
}

.song >>> .chorus.alt::after {
  content: attr(label)"\00a0";
}

.song >>> .recitativ-head {
  position: relative;
}

.song >>> .recitativ-head::after {
  content: "Rec:\00a0";
  font-weight: bold;
  transform: translateX(-100%);
  position: absolute;
  bottom: 0;
  /* display: inline-block; */
}
.song >>> .recitativ-body {
  font-style: italic;
}

.song >>> .hskip {
  display: inline-block;
}
</style>
