<template>
  <v-container
    fluid
  >
    <v-row
      align="center"
      justify="center"
      class="pt-12"
    >
      <v-col class="col-8 pt-6">
        <v-card class="mx-auto">
          <v-card-title>Mars Weather</v-card-title>
          <v-card-subtitle>See the weather for the last 7 sols (martian days)</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <v-row
      align="start"
      justify="center"
      class="pt-2"
    >
      <v-col class="col-4">
        <v-card
          class="mx-auto"
          max-width="600"
        >
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline">Sol {{sol_keys[selected_sol]}}</v-list-item-title>
              <v-list-item-subtitle v-if="typeof sol_data[sol_keys[selected_sol]].Last_UTC !== 'undefined'">{{sol_data[sol_keys[selected_sol]].Last_UTC}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <v-row align="center">
              <v-col class="display-3" cols="8">
                {{sol_data[sol_keys[selected_sol]].AT.av}}&deg;F
              </v-col>
              <v-col cols="4">
                <v-img
                  src="../assets/mars.png"
                  alt="Sunny image"
                  width="150"
                ></v-img>

              </v-col>
            </v-row>
          </v-card-text>

          <v-list-item>
            <v-list-item-subtitle>{{sol_data[sol_keys[selected_sol]].AT.mn}}&deg;F / {{sol_data[sol_keys[selected_sol]].AT.mx}}&deg;F</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-send</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle v-if="typeof sol_data[sol_keys[selected_sol]].HWS !== 'undefined'">{{sol_data[sol_keys[selected_sol]].HWS.av}} m/h</v-list-item-subtitle>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-cloud-download</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>{{sol_data[sol_keys[selected_sol]].PRE.av}} Pa</v-list-item-subtitle>
          </v-list-item>

          <v-slider
            v-model="selected_sol"
            :max="6"
            :tick-labels="sol_keys"
            class="mx-4"
            ticks
          ></v-slider>

        </v-card>
      </v-col>
      <v-col class="col-4">
        <v-card
          class="mx-auto"
          max-width="600"
        >
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline">Rover Photo from Yesterday</v-list-item-title>
              <v-list-item-subtitle>Rover: {{rover_name}} - {{cam_name}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <v-row align="center" justify="center">
              <v-col cols="8">
                <v-img width="400" v-bind:src="rover_img"></v-img>
              </v-col>
            </v-row>
          </v-card-text>

        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "MarsWeather",
    data: () => ({
      sol_keys: [],
      selected_sol: 0,
      sol_data: {},
      rover_img : '',
      rover_name: '',
      cam_name: ''
    }),
    methods: {
      async getSolWeek() {
        await fetch("https://api.nasa.gov/insight_weather/?api_key=zDMdh4zkdAad1of2a3yA1ndgfALwxcIhWhCDOkiL&feedtype=json&ver=1.0")
          .then(response => response.json())
          .then(data => {
            this.sol_keys = data.sol_keys
            this.sol_data = data
          })
      }
    },
    created () {
      this.getSolWeek()
      var api_key = "&api_key=zDMdh4zkdAad1of2a3yA1ndgfALwxcIhWhCDOkiL"
      var url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date='
      var curDate = new Date()
      curDate.setDate(curDate.getDate() - 1)
      curDate = curDate.toISOString().substr(0, 10)

      fetch(url + curDate + api_key)
        .then(response => response.json())
        .then(data => {
          this.rover_img = data.photos[0].img_src
          this.rover_name = data.photos[0].rover.name
          this.cam_name = data.photos[0].camera.full_name
        })
    },
  }
</script>
