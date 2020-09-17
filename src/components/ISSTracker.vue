<template>
  <v-container
    fluid
  >
    <v-row
      align="center"
      justify="center"
      class="pt-12"
    >
    <v-col class="col-7">
      <v-card width="100%" class="mt-6">
        <v-subheader elevation="2">International Space Station Tracker</v-subheader>
        <v-card elevation="1" id="mapContainer" style="height:600px"></v-card>
      </v-card>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import mapboxgl from 'mapbox-gl';

  export default {
    name: 'ISSTracker',
    methods: {
      async getCoordinates() {
        await fetch('http://api.open-notify.org/iss-now.json')
          .then(response => response.json())
          .then(data => {
            var long = data.iss_position.longitude
            var lat = data.iss_position.latitude

            this.coords = [long, lat]
          })
      }
    },
    data() {
      return {
        accessToken: "pk.eyJ1IjoidG9vbWFueWJ1Z3MiLCJhIjoiY2tmNXZtMjNjMDEzaTJ6bXpvb3NyZnViaSJ9.4WufFuTdkdhR1YHbqt4hlA",
      };
    },
    mounted() {
      mapboxgl.accessToken = this.accessToken;

      this.getCoordinates().then(() => {
        this.map = new mapboxgl.Map({
          container: "mapContainer",
          style: "mapbox://styles/toomanybugs/ckf5vtee0308g19s11hg1r7fz",
          center: this.coords,
          zoom: 6
        })

        this.marker = new mapboxgl.Marker()
        .setLngLat(this.coords)
        .addTo(this.map);
      })

      window.setInterval(() => {
        this.getCoordinates()
          .then(() => {
            this.marker.setLngLat(this.coords)
          })
      }, 500)
    }
  }
</script>
