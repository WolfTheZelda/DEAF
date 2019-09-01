<template>
  <section class="animated fadeInLeft" id="alunos">
    <Title :titleText="titleText" :titleAddTo="titleAddTo" />
    <div class="card">
      <table class="responsive-table striped centered" style="width: 100%;" data-page-length="25">
        <thead class="white">
          <tr>
            <th v-for="head in tableHead" :key="head">{{ head }}</th>
          </tr>
        </thead>
        <tbody id="alunos-lista">
          <tr v-for="body in tableBody" :key="body['.key']">
            <td>{{ body.nome }}</td>
            <td>{{ body.ano }}</td>
            <td>{{ body.colegio }}</td>
            <td>{{ body.grupo }}</td>
            <td>{{ body.nota }}</td>
            <td>
              <a
                class="btn green"
                target="_blank"
                :href="'https://wa.me/' + body['.key']"
              >{{ body['.key'] }}</a>
            </td>
            <td>
              <button class="btn blue" v-on:click="showUser(body)">
                <i class="material-icons">remove_red_eye</i>
              </button>
            </td>
            <td>
              <button v-if="body.grupo != groupMaster" class="btn red" v-on:click="removeUser(body)">
                <i class="material-icons">delete</i>
              </button>
              <button v-else class="btn red disabled">
                <i class="material-icons">delete</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="white-text">{{ tableNotice }}</p>
  </section>
</template>

<script>
import Title from "./Title";

import { db } from "../../firebase";

export default {
  data: () => ({
    count: 0
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
  components: {
    Title
  },
  methods: {
    removeUser: function(user) {
      if (confirm("Tenha cuidado ao cometer o ato de remover um usuário(a)")) {
        db.ref(this.tableReference)
          .child(user[".key"])
          .remove();

        this.$store.dispatch("record", "O(a) administrador(a) " + this.$store.state.auth.name + " (" + this.$store.state.auth.group + ") removeu o(a) "+ this.userRemovedGroup +"(a) " + user.nome + " (" + user.grupo + ") com a nota " + user.nota);
      }
    },
    showUser(user) {
      this.$router.push({ path: this.$route.path + "/edit/" + user[".key"] });
    }
  }
};
</script>