<template>
  <fragment>
    <tr>
      <td>
        <input class="validate" required type="text" v-model="input.titulo" placeholder="Título" />
      </td>
      <td>
        <select v-model="input.grupo" class="browser-default">
          <option selected value="green" class="green-text">Favor</option>
          <option value="red" class="red-text">Contra</option>
          <option value="blue" class="blue-text">Mediador</option>
          <option value="yellow" class="yellow-text">Outro</option>
          <option value="grey" class="grey-text">Divisor</option>
        </select>
      </td>
      <td>
        <input
          type="number"
          class="validate"
          placeholder="Minutos"
          min="0"
          max="59"
          required
          value="0"
          data-hj-whitelist
          v-model="input.minutos"
        />
      </td>
      <td>
        <input
          type="number"
          class="validate"
          placeholder="Segundos"
          min="0"
          max="59"
          required
          value="0"
          data-hj-whitelist
          v-model="input.segundos"
        />
      </td>
      <td>
        <button class="btn blue disabled" v-on:click="updateTimer(body, 1)">
          <i class="material-icons">check</i>
        </button>
      </td>
      <td>
        <button class="btn blue" v-on:click="updateTimer(input, 0)">
          <i class="material-icons">send</i>
        </button>
      </td>
      <td>
        <button class="btn red disabled">
          <i class="material-icons">delete</i>
        </button>
      </td>
    </tr>

    <tr v-for="body in tableBody" :key="body['.key']">
      <fragment v-if="body.grupo != 'grey'">
        <td>
          <input
            class="validate"
            required
            placeholder="Título"
            type="text"
            :value="body.titulo"
            :id="body['.key'] + '-' + body.titulo"
          />
        </td>
        <td>
          <select
            :id="body['.key'] + '-' + body.grupo"
            :value="body.grupo"
            class="browser-default"
            :class="body.grupo + '-text'"
          >
            <option selected value="green" class="green-text">Favor</option>
            <option value="red" class="red-text">Contra</option>
            <option value="blue" class="blue-text">Mediador</option>
            <option value="yellow" class="yellow-text">Outro</option>
            <option value="grey" class="grey-text">Divisor</option>
          </select>
        </td>
        <td>
          <input
            type="number"
            class="validate"
            placeholder="Minutos"
            min="0"
            max="9"
            required
            data-hj-whitelist
            :value="body.minutos"
            :id="body['.key'] + '-' + body.minutos"
          />
        </td>
        <td>
          <input
            type="number"
            class="validate"
            placeholder="Segundos"
            min="0"
            max="59"
            required
            :value="body.segundos"
            :id="body['.key'] + '-' + body.segundos"
            data-hj-whitelist
          />
        </td>
        <td>
          <button class="btn blue" v-on:click="updateTimer(body, 1)">
            <i class="material-icons">play_arrow</i>
          </button>
        </td>
        <td>
          <button class="btn blue" v-on:click="updateTimer(body, 0)">
            <i class="material-icons">refresh</i>
          </button>
        </td>
        <td>
          <button class="btn red" v-on:click="removeTimer(body)">
            <i class="material-icons">delete</i>
          </button>
        </td>
      </fragment>
      <fragment v-else>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>
          <button class="btn red" v-on:click="removeTimer(body)">
            <i class="material-icons">delete</i>
          </button>
        </td>
      </fragment>
    </tr>

    <tr style="height: 75px;">
      <td style="min-width: 115px;"></td>
      <td style="width: 12.5%; min-width: 115px;"></td>
      <td style="width: 7.5%"></td>
      <td style="width: 7.5%"></td>
      <td style="width: 7.5%"></td>
      <td style="width: 7.5%"></td>
      <td style="width: 7.5%"></td>
    </tr>
  </fragment>
</template>

<script>
import { db, firebase } from "../../firebase";

export default {
  data: () => ({
    count: 0,
    input: {
      titulo: "",
      grupo: "green",
      minutos: "0",
      segundos: "0"
    }
  }),
  props: {
    tableNotice: String,
    tableHead: Array,
    tableBody: Array,

    titleAddTo: String,
    titleText: String,

    tableReference: String,

    showReference: String,

    userRemovedGroup: String,

    groupMaster: String
  },
  methods: {
    removeTimer: function(body) {
      if (confirm("Tenha cuidado ao cometer o ato de remover um tempo")) {
        db.ref("temporizadores/tabela")
          .child(body[".key"])
          .remove()
          .then(() => {
            this.$store.dispatch(
              "record",
              "O(a) administrador(a) " +
                this.$store.state.auth.name +
                " (" +
                this.$store.state.auth.group +
                ") removeu o tempo " +
                body.titulo +
                " (" +
                body.minutos +
                "m " +
                body.segundos +
                "s)"
            );
          })
          .catch(() => {
            this.$store.dispatch(
              "toast",
              "Você não tem permissão para realizar o ato"
            );
          });
      }
    },
    updateTimer(body, mode) {
      let creation;

      let parent;

      db.ref("temporizadores/tabela")
        .child(String(body[".key"]))
        .once("value", snapshot => {
          if (snapshot.exists()) {
            parent = body[".key"];
            creation = false;
          } else {
            parent = db
              .ref("temporizadores/tabela")
              .push()
              .getKey();
            creation = true;
          }
        });

      let titulo =
        document.getElementById(body[".key"] + "-" + body.titulo) === null
          ? this.input.titulo
          : document.getElementById(body[".key"] + "-" + body.titulo).value;
      let grupo =
        document.getElementById(body[".key"] + "-" + body.grupo) === null
          ? this.input.grupo
          : document.getElementById(body[".key"] + "-" + body.grupo).value;
      let minutos =
        document.getElementById(body[".key"] + "-" + body.minutos) === null
          ? this.input.minutos
          : document.getElementById(body[".key"] + "-" + body.minutos).value;
      let segundos =
        document.getElementById(body[".key"] + "-" + body.segundos) === null
          ? this.input.segundos
          : document.getElementById(body[".key"] + "-" + body.segundos).value;

      minutos = minutos > 0 ? minutos : 0;
      segundos = segundos > 0 ? segundos : 0;

      let timestamp = minutos * 60 * 1000 + segundos * 1000;

      titulo = grupo != "grey" ? titulo.toUpperCase() : "DIVISOR";
      minutos = grupo != "grey" ? minutos : 0;
      segundos = grupo != "grey" ? segundos : 0;
      timestamp = grupo != "grey" ? timestamp : 1000;

      if (String(titulo) && String(titulo) !== "" && timestamp > 0) {
        if (mode == 0) {
          db.ref("temporizadores/tabela")
            .child(parent)
            .set({
              titulo: titulo.toUpperCase(),
              grupo,
              minutos,
              segundos,
              timestamp
            })
            .then(() => {
              if (creation) {
                this.$store.dispatch(
                  "record",
                  "O(a) administrador(a) " +
                    this.$store.state.auth.name +
                    " (" +
                    this.$store.state.auth.group +
                    ") adicionou o tempo " +
                    titulo.toUpperCase() +
                    " (" +
                    minutos +
                    "m " +
                    segundos +
                    "s)"
                );

                this.input.titulo = "";
                this.input.grupo = "green";
                this.input.minutos = "0";
                this.input.segundos = "0";
              } else {
                this.$store.dispatch(
                  "record",
                  "O(a) administrador(a) " +
                    this.$store.state.auth.name +
                    " (" +
                    this.$store.state.auth.group +
                    ") atualizou o tempo " +
                    body.titulo.toUpperCase() +
                    " (" +
                    body.minutos +
                    "m " +
                    body.segundos +
                    "s) para " +
                    titulo.toUpperCase() +
                    " (" +
                    minutos +
                    "m " +
                    segundos +
                    "s)"
                );
              }
            })
            .catch(() => {
              this.$store.dispatch("toast", "Você não tem permissão para isso");
            });
        } else if (mode == 1) {
          db.ref("temporizadores/instancia")
            .set({
              titulo: body.titulo,
              titulo_backup: body.titulo,
              grupo: body.grupo,
              grupo_backup: body.grupo,
              minutos: body.minutos,
              segundos: body.segundos,
              pausa: false,
              limpeza: false,
              timestamp: Date.now() + timestamp
            })
            .then(() => {
              this.$store.dispatch("toast", "Tempo selecionado com sucesso");
            })
            .catch(() => {
              this.$store.dispatch("toast", "Você não tem permissão para isso");
            });
        }
      } else {
        this.$store.dispatch("toast", "Preencha todos os campos");
      }
    },
    startInterval() {
      setInterval(() => {
        firebase
          .database()
          .ref("temporizadores")
          .child("instancia")
          .on("value", snap => {
            if (snap.exists()) {
              if (snap.val().timestamp > 0) {
                db.ref("temporizadores/instancia").update({
                  timestamp: snap.val().timestamp - 1000
                });
              }
            }
          });
      }, 1000);
    }
  },
  mounted() {}
};
</script>