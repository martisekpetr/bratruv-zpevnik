<template>
  <span class="navigation">
    <span>
      <v-toolbar-side-icon @click="sidebar = !sidebar" />
    </span>
    <v-navigation-drawer
      v-model="sidebar"
      fixed
      temporary
      app
    >
      <v-list two-line>
        <v-list-tile
          key="toc"
          to="/toc"
        >
          <v-list-tile-action>
            <v-icon>list</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Obsah
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
          key="pdf"
          :href="zpevnikPdf"
        >
          <v-list-tile-action>
            <v-icon>save_alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Stáhnout PDF
          </v-list-tile-content>
        </v-list-tile>

        <v-divider />
        <v-subheader>
          Nastavení
        </v-subheader>
        <v-list-tile>
          <v-list-tile-content>
            <v-slider
              v-model="fontSize"
              append-icon="zoom_in"
              prepend-icon="zoom_out"
              :step="0.1"
              :min="0.6"
              :max="2.5"
              @click:append="increaseFontSize"
              @click:prepend="decreaseFontSize"
            />
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-switch v-model="showChords" color="primary" />
          </v-list-tile-action>

          <v-list-tile-content @click="showChords = !showChords">
            <v-list-tile-title>Akordy</v-list-tile-title>
            <v-list-tile-sub-title>Zobrazit akordy u písní</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-switch v-model="isDark" color="primary" />
          </v-list-tile-action>

          <v-list-tile-content @click="isDark = !isDark">
            <v-list-tile-title>Dark theme</v-list-tile-title>
            <!-- <v-list-tile-sub-title>Notify when receiving invites</v-list-tile-sub-title> -->
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </span>
</template>

<script>
import { mapMutations } from 'vuex'
import zpevnikPdf from '../assets/zpevnik.pdf'

export default {
  name: 'Toolbar',
  data: () => ({
    sidebar: false,
    zpevnikPdf,
  }),
  computed: {
    showChords: {
      get () {
        return this.$store.getters.shouldShowChords
      },
      set (value) {
        this.switchShowChords(value)
      },
    },
    fontSize: {
      get () {
        return this.$store.getters.fontSize
      },
      set (value) {
        this.changeFontSize(value)
      },
    },
    isDark: {
      get () {
        return this.$store.getters.isDark
      },
      set (value) {
        this.switchDarkTheme(value)
      },
    },
  },
  methods: {
    ...mapMutations([
      'switchShowChords',
      'changeFontSize',
      'switchDarkTheme',
    ]),
    increaseFontSize: function () {
      this.changeFontSize(this.fontSize + 0.1)
    },
    decreaseFontSize: function () {
      this.changeFontSize(this.fontSize - 0.1)
    },
  },
}
</script>

<style>
.v-toolbar .v-input {
  margin: 15px;
}

.v-toolbar__side-icon {
  z-index: 2;
  /* margin-bottom: 0; */
}
</style>
