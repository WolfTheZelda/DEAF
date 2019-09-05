<template>
  <div class="navbar-fixed">
    <nav class="blue">
      <div class="nav-wrapper">
        <a class="brand-logo center" href>DEAF</a>
        <a class="sidenav-trigger" :href="trigger" data-target="side-nav">
          <i class="material-icons white-text">menu</i>
        </a>
        <ul class="right">
          <li v-on:click="signOutAuth">
            <router-link to="/">
              <i class="material-icons white-text">logout</i>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>

    <nav class="orange">
      <div class="nav-wrapper">
          <div class="input-field">
            <input
              id="search"
              type="search"
              v-on:keypress="searchTable"
              v-on:keyup="searchTable"
              v-on:focus="searchTable"
            />
            <label class="label-icon" for="search">
              <i class="material-icons">search</i>
            </label>
            <i class="material-icons">close</i>
          </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { auth } from "../../firebase";

export default {
  data() {
    return {};
  },
  props: {
    trigger: { type: String, default: "#" }
  },
  methods: {
    signOutAuth() {
      auth
        .signOut()
        .then(() => {
          this.$store.dispatch("toast", "Deslogado com sucesso");
        })
        .catch(() => {
          this.$store.dispatch("toast", "Erro ao deslogar");
        });
    },
    searchTable() {
      if(document.querySelector("table") !== null) {
        var input, filter, table, tr;

        input = document.getElementById("search");
        table = document.querySelector("table");
        tr = table.querySelectorAll("table tbody tr");

        filter = input.value.toUpperCase();

        for (var i = 0; i < tr.length; i++) {
          if (input.value.length > 0) {
            if (tr[i].innerText.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
            } else {
              tr[i].style.display = "none";
            }
          } else {
            tr[i].style.display = "";
          }
        }
      }
    }
  }
};
</script>
