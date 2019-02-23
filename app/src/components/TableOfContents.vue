<template>
  <v-layout row>
    <v-flex
      xs12
      sm10
      offset-sm1
    >
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="searchKeyword"
            prepend-icon="search"
            label="Search"
            single-line
            hide-details
            clearable
          />
        </v-card-title>
        <v-card-text>
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
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TableOfContents',
  components: {},
  computed: {
    searchKeyword: {
      get () {
        return this.$store.getters.searchKeyword
      },
      set (value) {
        this.$store.commit('setSearchKeyword', value)
      },
    },
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
