<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
    >
      <v-list dense>
        <v-list-item link href="/">
          <v-list-item-action>
            <v-icon>mdi-space-station</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>ISS Tracker</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="/potd">
          <v-list-item-action>
            <v-icon>mdi-moon-waning-crescent</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>NASA Photo of the Day</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link href="/mars">
          <v-list-item-action>
            <v-icon>mdi-cloud-alert</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Mars Weather</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Space Viewer</v-toolbar-title>
    </v-app-bar>

    <router-view></router-view>

    <v-footer app>
      <span>Tasztm</span>
    </v-footer>
  </v-app>
</template>


<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
    }),
    created () {
      this.$vuetify.theme.dark = true
    },
  }
</script>
