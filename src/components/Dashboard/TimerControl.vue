<template>
  <section class="animated fadeInLeft">
    <Title titleText="Temporizador" />
    <div class="card orange white-text" id="timer-control">
      <div class="container center">
        <Timer parent="timer-control" />

        <ul
          class="row"
          style="display: flex; flex-direction: row; align-items: center; justify-content: center;"
        >
          <li>
            <button class="btn blue" v-on:click="playTimer()">
              <i class="material-icons">play_arrow</i>
            </button>
          </li>
          <li>
            <button class="btn blue" v-on:click="pauseTimer()">
              <i class="material-icons">pause</i>
            </button>
          </li>
          <li>
            <button class="btn red" v-on:click="removeTimer()">
              <i class="material-icons">delete</i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
ul li {
  margin: 5px 15px 5px 5px;
}
</style>

<script>
import Title from "../../components/Dashboard/Title";
import Timer from "../../components/Cron";
import { db, firebase } from "../../firebase";

export default {
  components: {
    Title,
    Timer
  },
  methods: {
    playTimer() {
      firebase
        .database()
        .ref("temporizadores")
        .child("instancia")
        .once("value", snap => {
          if (snap.exists()) {
            db.ref("temporizadores/instancia").update({
              titulo: snap.val().titulo_backup,
              pausa: false,
              timestamp: snap.val().timestamp + (Date.now() - snap.val().timestamp_pausa)
            });
          }
        });
    },
    pauseTimer() {
      db.ref("temporizadores/instancia").update({
        titulo: "PAUSA",
        pausa: true,
        timestamp_pausa: Date.now()
      });
    },
    removeTimer() {
      db.ref("temporizadores/instancia").set({
        grupo: "blue",
        timestamp: 0,
        titulo: "TEMPORIZADOR",
        titulo_backup: "TEMPORIZADOR",
        pausa: false,
        limpeza: true,
        minutos: "0",
        segundos: "0"
      });
    }
  }
};
</script>