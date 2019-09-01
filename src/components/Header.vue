<template>
  <header>
    <div class="navbar-fixed">
      <nav class="blue" role="navigation">
        <div class="nav-wrapper container">
          <a class="brand-logo" id="logo-container" href="#">DEAF</a>
          <ul class="right hide-on-med-and-down">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/blog">Blog</a>
            </li>
            <li>
              <router-link class="btn green waves-effect waves-light" to="/login">
                <span v-if="this.$store.state.auth.value">Dashboard</span>
                <span v-else>Login</span>
              </router-link>
            </li>
          </ul>
          <a class="sidenav-trigger" href="#" data-target="nav-mobile">
            <i class="material-icons">menu</i>
          </a>
        </div>
      </nav>
    </div>
    <ul class="sidenav" id="nav-mobile">
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/blog">Blog</a>
      </li>
      <li>
        <router-link to="/login">
          <span v-if="login">Dashboard</span>
          <span v-else>Login</span>
        </router-link>
      </li>
    </ul>
  </header>
</template>

<script>
import { mixin } from "../mixin";

export default {
  mixins: [mixin],
  props: {},
  beforeMount() {
    this.checkAuth();
  }
};
</script>