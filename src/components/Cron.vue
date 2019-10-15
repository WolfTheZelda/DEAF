<template>
  <div
    class="center"
    style="display: flex; flex-direction: column; align-items: center; justify-content: center;"
  >
    <h1 class="timer-text">{{ title }}</h1>

    <h1 id="timer-count" class="timer-text">{{ now }}</h1>

    <h1 class="timer-text">{{ notice }}</h1>
  </div>
</template>

<style scoped>
.timer-text {
  text-shadow: 5px 5px black;
}
#timer-count {
  font-size: 25vh;
}
</style>

<script>
import { firebase, db } from "../firebase";

export default {
  data: () => ({
    now: "00:00",
    group: "blue",
    target: "",
    notice: "AVISO",
    title: "TEMPORIZADOR",
    cleaned: false,
    paused: false
  }),
  props: {
    parent: String
  },
  methods: {
    startInterval: function() {
      setInterval(() => {
        if (this.target != "") {
          if (!this.paused) {
            /*
          this.target = this.target - 1000;

          // if (this.target > 0) {
            db.ref("temporizadores/instancia").update({
              timestamp: this.target + 225
            });
          // }
          */

            /*
          let minutes = Math.floor(this.target / 1000 / 60);
          let seconds = Math.floor(this.target / 1000 - 60 * minutes);
        */

            let target = new Date(this.target).getTime();
            let now = new Date().getTime();

            let distance = target - now;

            // let oneDay = 1000 * 60 * 60 * 24;
            let oneHour = 1000 * 60 * 60;
            let oneMinute = 1000 * 60;
            let oneSecond = 1000;

            // let days = Math.floor(distance / oneDay);
            // let hours = Math.floor((distance % oneDay) / oneHour);
            let minutes = Math.floor((distance % oneHour) / oneMinute);
            let seconds = Math.floor((distance % oneMinute) / oneSecond);

            if (minutes < 10) {
              minutes = "0" + minutes;
            }

            if (seconds < 10) {
              seconds = "0" + seconds;
            }

            this.now = minutes + ":" + seconds;

            if (distance > 10000) {
              this.removeClass();

              document.getElementById(this.parent).classList.add(this.group);
              document.getElementById(this.parent).classList.add("white-text");

              document.getElementById("timer-count").classList.remove("tada");
              document
                .getElementById("timer-count")
                .classList.remove("animated");
              document
                .getElementById("timer-count")
                .classList.remove("infinite");

              this.notice = "FIQUE ATENTO AO TEMPO";
            } else if (distance > 0 && distance <= 10000) {
              this.removeClass();

              document.getElementById(this.parent).classList.add("orange");
              document.getElementById(this.parent).classList.add("white-text");

              document.getElementById("timer-count").classList.remove("tada");
              document
                .getElementById("timer-count")
                .classList.remove("animated");
              document
                .getElementById("timer-count")
                .classList.remove("infinite");

              this.notice = "RESTAM 10 SEGUNDOS";
            } else if (distance <= 0) {
              this.removeClass();

              document.getElementById(this.parent).classList.add("purple");
              document.getElementById(this.parent).classList.add("white-text");

              document.getElementById("timer-count").classList.add("tada");
              document.getElementById("timer-count").classList.add("animated");
              document.getElementById("timer-count").classList.add("infinite");

              this.notice = "SEU MICROFONE SERÁ DESCONECTADO";

              this.now = "FIM";

              /* db.ref("temporizadores/instancia").update({
              timestamp: 0
            }); */
            }
          } else {
            db.ref("temporizadores/instancia").update({
              // timestamp: this.target + 1000
            });
          }
        }

        if (this.cleaned) {
          this.now = "00:00";
          this.group = "blue";
          this.target = 0;
          this.notice = "AVISO";
          this.title = "TEMPORIZADOR";
        }
      }, 1000);
    },
    setTimer() {
      firebase
        .database()
        .ref("temporizadores")
        .child("instancia")
        .on("value", snap => {
          if (snap.exists()) {
            this.title = snap.val().titulo;
            this.target = snap.val().timestamp;
            this.group = snap.val().grupo;
            this.paused = snap.val().pausa;
            this.cleaned = snap.val().limpeza;
          }
        });
    },
    removeClass() {
      document.getElementById(this.parent).classList.remove("green");
      document.getElementById(this.parent).classList.remove("red");

      document.getElementById(this.parent).classList.remove("blue");

      document.getElementById(this.parent).classList.remove("orange");
      document.getElementById(this.parent).classList.remove("purple");

      document.getElementById(this.parent).classList.remove("white-text");
    }
  },
  mounted() {
    this.setTimer();
    this.startInterval();
  }
};
</script>