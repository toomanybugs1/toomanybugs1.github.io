<template>
  <v-container
    class="fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
      class="pt-12"
    >
    <v-col
      align="center"
      justify="center"
      class="col-1"
    >
      <v-btn v-on:click="calendarDown" icon>
        <v-icon>mdi-arrow-left-bold-circle</v-icon>
      </v-btn>
    </v-col>
      <v-col class="col-6">
        <v-card class="mx-auto">
          <v-card-title>NASA Photo of the Day</v-card-title>
          <v-img max-height="800" v-bind:src="potd"></v-img>
        </v-card>
      </v-col>

      <v-col
        align="center"
        justify="center"
        class="col-1"
      >
        <v-btn v-on:click="calendarUp" icon>
          <v-icon>mdi-arrow-right-bold-circle</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="12" sm="6" md="4">
        <v-dialog
            ref="dialog"
            v-model="modal"
            :return-value.sync="date"
            persistent
            width="290px"
          >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Image Date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" scrollable>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
            <v-btn text color="primary" @click="$refs.dialog.save(date); getImage()">OK</v-btn>
          </v-date-picker>
        </v-dialog>
    </v-col>
    </v-row>
    <v-row
      align="center"
      justify="center"
      class="mb-6"
    >
    <v-col class="col-6">
      <v-card class="mx-auto">
        <v-card-subtitle>{{title}}</v-card-subtitle>
        <v-card-text>{{explanation}}</v-card-text>
      </v-card>
    </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: "POTD",
    data: () => ({
      url: "https://api.nasa.gov/planetary/apod?api_key=zDMdh4zkdAad1of2a3yA1ndgfALwxcIhWhCDOkiL&date=",
      potd: "",
      explanation: "",
      title: "",
      date: new Date().toISOString().substr(0, 10),
      modal: false,
    }),
    methods: {
      async getImage() {
        await fetch(this.url + this.date)
          .then(response => {
            if (response.status >= 200 && response.status <= 299) {
              return response.json()
            } else {
              this.potd = ""
              this.explanation = "No data for this day. Have you entered a future date?"
              this.title = "No Image"
            }
        })
        .then(data => {
          this.potd = data.url
          this.explanation = data.explanation
          this.title = data.title
        })
        .catch(() => console.log("No image for that date."))
      },
      calendarUp() {
        var curDate = new Date(this.date)
        curDate.setDate(curDate.getDate() + 1)
        this.date = curDate.toISOString().substr(0, 10)

        this.getImage()
      },
      calendarDown() {
        var curDate = new Date(this.date)
        curDate.setDate(curDate.getDate() - 1)
        this.date = curDate.toISOString().substr(0, 10)

        this.getImage()
      }
    },
    created () {
      this.getImage()
    },
  }
</script>
