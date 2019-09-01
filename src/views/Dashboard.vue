<template>
  <div id="dashboard" v-show="this.$store.state.auth.value">
    <header>
      <Navbar :trigger="this.navbarTrigger" />
      <Sidebar />
    </header>

    <main class="container">
      <router-view name="dashboard"></router-view>
    </main>
  </div>
</template>

<script>
import Navbar from "../components/Dashboard/Navbar";
import Sidebar from "../components/Dashboard/Sidebar";

import { db, firebase, auth } from "../firebase";

import { mixin } from "../mixin";

import M from "materialize-css";

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
                    this.$store.dispatch("toast", "Acesso não autorizado");

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
#dashboard header,
#dashboard main,
#dashboard footer {
  padding-left: 300px;
}
#dashboard header nav {
  padding-right: 300px;
}
@media only screen and (max-width: 992px) {
  #dashboard header,
  #dashboard main,
  #dashboard footer {
    padding-left: 0;
  }
  #dashboard header nav {
    padding-right: 0;
  }
}

#dashboard header nav:last-child {
  margin-top: 64px;
}
@media only screen and (max-width: 600px) {
  #dashboard header nav:last-child {
    margin-top: 56px;
  }
}

#dashboard header {
  margin-bottom: 100px;
}
</style>