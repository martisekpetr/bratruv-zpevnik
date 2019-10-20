<template>
  <v-layout row>
    <v-flex
      xs12
      sm10
      offset-sm1
    >
      <v-card>
        <v-card-text>
          <TocList />
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import TocList from './TocList'

export default {
  name: 'TableOfContents',
  components: { TocList },
  methods: {},
}
</script>

<style>
</style>
