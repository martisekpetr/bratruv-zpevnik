<template>
  <v-list v-if="isLoaded" two-line>
    <template
      v-for="(song, index) in songs"
    >
      <v-list-tile
        :key="song.title"
        :to="`/song/${song.index}`"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{ song.title }}</v-list-tile-title>
          <v-list-tile-sub-title>{{ song.author }}</v-list-tile-sub-title>
        </v-list-tile-content>
        <!-- <span class="font-weight-medium">
          {{ song.title }}
        </span>
        <v-spacer />
        <span class="text--secondary">
          {{ song.author }}
        </span> -->
      </v-list-tile>
      <v-divider
        :key="index"
      />
    </template>
  </v-list>
  <div v-else class="text-xs-center">
    <v-progress-circular
      indeterminate
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TocList',
  components: {},
  computed: {
    ...mapGetters({
      songs: 'filteredSongs',
      isLoaded: 'isLoaded',
    }),
  },
  methods: {},
}
</script>

<style>
.toc {
  text-align: left;
}

.v-list--two-line .v-list__tile {
  height: 60px;
}
</style>
