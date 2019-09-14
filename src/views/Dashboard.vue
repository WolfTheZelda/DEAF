<template>
  <div class="dashboard-page" v-show="this.$store.state.auth.value">  
    <header>
      <Navbar :trigger="this.navbarTrigger" />
      <Sidebar />
    </header>

    <main class="container">
      <router-view name="dashboard"></router-view>
    </main>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large red">
        <i class="large material-icons">settings</i>
      </a>
      <ul>
        <li>
          <a class="btn-floating indigo darken-4" v-if="!this.$store.state.default.dark" v-on:click="changeDarkMode">
            <i class="material-icons">brightness_2</i>
          </a>
          <a class="btn-floating yellow darken-4" v-else v-on:click="changeDarkMode">
            <i class="material-icons">brightness_7</i>
          </a>
        </li>
        <li v-if="this.$store.state.auth.group === 'Desenvolvedor'">
          <a class="btn-floating red" target="_blank" href="https://insights.hotjar.com/sites/1481774/dashboard">
            <i class="material-icons">whatshot</i>
          </a>
        </li>
        <li v-if="this.$store.state.auth.group === 'Desenvolvedor'">
          <a class="btn-floating amber" target="_blank" href="https://console.firebase.google.com/u/0/project/acaofilosofica/overview">
            <i class="material-icons">whatshot</i>
          </a>
        </li>
        <li v-if="this.$store.state.auth.group === 'Desenvolvedor'">
          <a class="btn-floating orange" target="_blank" href="https://dash.cloudflare.com/d6a80bf381ccfa399e11f6ba29667c5a/acaofilosofica.com">
            <i class="material-icons">cloud</i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Dashboard/Navbar";
import Sidebar from "../components/Dashboard/Sidebar";

import { db, auth } from "../firebase";

import { mixin } from "../mixin";

import M from "materialize-css";

import {
  enable as enableDarkMode,
  disable as disableDarkMode
} from "darkreader";

export default {
  name: "Dashboard",
  data() {
    return {
      navbarTrigger: ""
    };
  },
  mounted() {
    this.userData();
    this.navbarTrigger = window.location.pathname + "#";
    M.AutoInit();
  },
  updated() {
    this.userData();
    this.navbarTrigger = window.location.pathname + "#";
    M.AutoInit();
  },
  props: {},
  methods: {
    changeDarkMode() {
      if (!this.$store.state.default.dark) {
        enableDarkMode({
          brightness: 100,
          contrast: 90,
          sepia: 10
        });
      } else {
        disableDarkMode();
      }
      
        this.$store.state.default.dark = !this.$store.state.default.dark;
    },
    userData() {
      if (this.$store.state.auth.value === true) {
        var phone = this.$store.state.auth.phone;

        db.ref("/administradores/")
          .child(phone)
          .on("value", snapAdmin => {
            if (snapAdmin.exists()) {
              this.$store.state.auth.name = snapAdmin.val().nome;
              this.$store.state.auth.note = snapAdmin.val().nota;
              this.$store.state.auth.group = snapAdmin.val().grupo;

              this.$store.state.auth.criteria = snapAdmin.hasChild("criterios")
                ? snapAdmin.val().criterios
                : this.$store.state.auth.criteria;
            } else {
              db.ref("/alunos/")
                .child(phone)
                .on("value", snapStudent => {
                  if (snapStudent.exists()) {
                    this.$store.state.auth.name = snapStudent.val().nome;
                    this.$store.state.auth.note = snapStudent.val().nota;
                    this.$store.state.auth.group = snapStudent.val().grupo;

                    this.$store.state.auth.criteria = snapStudent.hasChild(
                      "criterios"
                    )
                      ? snapStudent.val().criterios
                      : this.$store.state.default.criteria;
                  } else {
                    this.$store.dispatch("toast", "Acesso não autorizado detectado, contate um Administrador");

                    auth.signOut();
                  }
                });
            }
          });
      }
    }
  },
  components: {
    Navbar,
    Sidebar
  },
  mixins: [mixin]
};
</script>

<style>
.dashboard-page header,
.dashboard-page main,
.dashboard-page footer {
  padding-left: 300px;
}
.dashboard-page header nav {
  padding-right: 300px;
}
@media only screen and (max-width: 992px) {
  .dashboard-page header,
  .dashboard-page main,
  .dashboard-page footer {
    padding-left: 0;
  }
  .dashboard-page header nav {
    padding-right: 0;
  }
}

/* Search Bar */
.dashboard-page header nav:last-child {
  margin-top: 64px;
}
@media only screen and (max-width: 600px) {
  .dashboard-page header nav:last-child {
    margin-top: 56px;
  }
}

.dashboard-page header {
  margin-bottom: 100px;
}
</style>