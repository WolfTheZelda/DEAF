import {
  auth
} from "./firebase"

export const mixin = {
  mounted() {
    this.checkAuth();
  },
  updated() {
    this.checkAuth();
  },
  methods: {
    checkAuth() {
      auth.onAuthStateChanged(user => {
        if (user) {
          this.$store.state.auth.value = true;
          this.$store.state.auth.false = true;

          this.$store.state.auth.id = user.uid;
          this.$store.state.auth.phone = user.phoneNumber;

          if (this.$route.name === "login") {
            this.$router.push("dashboard");
          }

          this.checkPermission();
        } else {
          this.$store.state.auth.value = false;
          this.$store.state.auth.login = false;

          this.$store.state.auth.id = null;
          this.$store.state.auth.phone = null;

          if (this.$route.path.indexOf("dashboard") > -1 && this.$route.name !== "nothing") {
            this.$router.push({
              path: "/login"
            });
          }
        }
      });
    },
    checkPermission() {
      let URL = "https://us-central1-acaofilosofica.cloudfunctions.net/CheckUser?id=" + this.$store.state.auth.id + "&phone=" + this.$store.state.auth.phone;

      let XHTTP = new XMLHttpRequest();
      XHTTP.open("GET", URL, true);
      XHTTP.onload = () => {
        if (XHTTP.readyState === 4) {
          if (XHTTP.status === 200) {
            console.log(XHTTP.responseText);
          } else {
            console.error(XHTTP.statusText);
          }
        }
      };
      XHTTP.onerror = () => {
        console.error(XHTTP.statusText);
      };
      XHTTP.send(null);
    }
  }
}