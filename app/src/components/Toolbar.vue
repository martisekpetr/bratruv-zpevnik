<template>
  <span class="navigation">
    <span>
      <v-toolbar-side-icon @click="sidebar = !sidebar" />
    </span>
    <button @click="randomSong">
      <v-icon>shuffle</v-icon>
    </button>
    <div>
      <v-text-field
        v-model="searchKeyword"
        class="search"
        prepend-inner-icon="search"
        label="Search"
        single-line
        hide-details
        clearable
      />
      <div v-if="searchKeyword && searchKeyword.length" class="toclist">
        <TocList />
      </div>
    </div>
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
          href="https://github.com/martisekpetr/bratruv-zpevnik/raw/master/zpevnik.pdf"
        >
          <v-list-tile-action>
            <v-icon>save_alt</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            Stáhnout PDF
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile @click="">
          <v-list-tile-action>
            <v-icon>help_outline</v-icon>
          </v-list-tile-action>
          <v-list-tile-content @click.stop="dialog = true">
            <v-list-tile-title>O zpěvníku</v-list-tile-title>
            <!-- <v-list-tile-sub-title>Notify when receiving invites</v-list-tile-sub-title> -->
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
        <v-list-tile>
          <v-list-tile-content>
            <v-layout
              align-center
              justify-space-between
              style="width: 100%;"
            >
              <v-btn
                flat
                icon
                @click="transposeDown"
              >
                <v-icon>exposure_neg_1</v-icon>
              </v-btn>
              <div>Transpozice: {{ transposition }}</div>
              <v-btn
                flat
                icon
                @click="transposeUp"
              >
                <v-icon>exposure_plus_1</v-icon>
              </v-btn>
            </v-layout>
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
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          O zpěvníku
        </v-card-title>

        <v-card-text>
          <h4>Verze</h4>
          5.0.0
          <h4>Autor</h4>
          Petr "Bratr" Martišek<br>
          <a href="mailto:martisekpetr@gmail.com">
            martisekpetr@gmail.com
          </a>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            flat
            @click="dialog=false"
          >
            Zavřít
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import { mapMutations } from 'vuex'
import TocList from './TocList'
import { debounce } from 'debounce'

export default {
  name: 'Toolbar',
  components: { TocList },
  data: () => ({
    sidebar: false,
    dialog: false,
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
    searchKeyword: {
      get () {
        return this.$store.getters.searchKeyword
      },
      set: debounce(function (value) {
        this.$store.commit('setSearchKeyword', value)
      }, 300),
    },
    transposition () { return this.$store.getters.transposition },
    songsCount () { return this.$store.getters.songsCount },
  },
  methods: {
    ...mapMutations([
      'switchShowChords',
      'changeFontSize',
      'switchDarkTheme',
      'transposeUp',
      'transposeDown',
    ]),
    increaseFontSize: function () {
      this.changeFontSize(this.fontSize + 0.1)
    },
    decreaseFontSize: function () {
      this.changeFontSize(this.fontSize - 0.1)
    },
    randomSong: function () {
      this.$router.push({
        name: 'song',
        params: { id: Math.floor(Math.random() * this.songsCount) },
      })
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
.navigation {
  display: flex;
  padding-right: 20px;
}
.search {
  margin-left: 10px;
  padding-top: 5px;
}
.search .v-input__control {
  width: 0;
  max-width: 0;
  transition: all 0.2s;
}

.search.v-input--is-focused .v-input__control {
  width: 100%;
  max-width: 100%;
}
.toclist {
  position: absolute;
  width: 90%;
  left: 5%;
  /* height: 0; */
  max-height: 50vh;
  overflow-y: auto;
  z-index: 2;
  box-shadow: 0px 10px 10px 0px rgba(0,0,0,0.25);
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}

.search.v-input--is-focused + .toclist {
  height: auto;
}

</style>
