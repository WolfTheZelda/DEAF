import {
  auth
} from "./firebase"

export const mixin = {
  mounted() {
    this.checkAuth();
    this.cleanOverlay();
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

          if (!this.$store.state.auth.verified) {
            this.checkPermission();
            this.$store.state.auth.verified = true;
          }
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
    },
    cleanOverlay() {
      let links = document.querySelectorAll(".sidenav a");
      for (let link of links) {
        link.addEventListener("click", function () {
          let overlays = document.querySelectorAll(".sidenav-overlay");
          for (let overlay of overlays) {
            if (overlay.style.opacity == 1) {
              let sidenavs = document.querySelectorAll('.sidenav');

              for (let sidenav of sidenavs) {
                M.Sidenav.getInstance(sidenav).close();
              }
            }
          }
        });
      }
    }
  },
  watch: {
    "$route"(to, from) {
      this.cleanOverlay();
    }
  }
}