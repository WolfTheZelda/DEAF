<template>
  <div id="timer" class="white-text">
    <div class="center">
      <h1>{{ title }}</h1>

      <h1 id="timer-count">{{ now }}</h1>

      <h1>{{ notice }}</h1>
    </div>
  </div>
</template>

<style scoped>
#timer {
  width: 100vw;
  height: 100vh;

  position: fixed;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;
}
#timer h1 {
  text-shadow: 5px 5px black;
}
#timer-count {
  font-size: 25vw;
}
</style>

<script>
import { firebase } from "../firebase";

export default {
  data: () => ({
    now: "",
    classList: "",
    title: "TEMPORIZADOR",
    target: "",
    notice: "",
    to: Date.now() + 15000
  }),
  methods: {
    startInterval: function() {
      setInterval(() => {
        if (this.target != "") {
          let target = new Date(this.target).getTime();
          let now = new Date().getTime();

          let distance = target - now;

          let oneDay = 1000 * 60 * 60 * 24;
          let oneHour = 1000 * 60 * 60;
          let oneMinute = 1000 * 60;
          let oneSecond = 1000;

          let days = Math.floor(distance / oneDay);
          let hours = Math.floor((distance % oneDay) / oneHour);
          let minutes = Math.floor((distance % oneHour) / oneMinute);
          let seconds = Math.floor((distance % oneMinute) / oneSecond);

          if (minutes < 10) {
            minutes = "0" + minutes;
          }

          if (seconds < 10) {
            seconds = "0" + seconds;
          }

          this.now = minutes + ":" + seconds;

          if (distance < 0) {
            document.getElementById("timer").classList = "red white-text";
            document.getElementById("timer-count").classList =
              "tada animated infinite";

            this.notice = "SEU MICROFONE SERÁ DESCONECTADO";

            this.now = "FIM";
          } else if (distance < 10000) {
            document.getElementById("timer").classList = "orange white-text";

            this.notice = "RESTAM 10 SEGUNDOS";
          } else if (distance > 0) {
            document.getElementById("timer").classList = "green white-text";

            this.notice = "FIQUE ATENTO AO TEMPO";
          }
        }
      }, 1000);
    },
    setTimer() {
      firebase
        .database()
        .ref("temporizadores")
        .child("instancia")
        .on("value", snap => {
          this.title = snap.val().titulo;
          this.target = snap.val().timestamp;
        });
    }
  },
  mounted() {
    this.startInterval();
    this.setTimer();
  }
};
</script>