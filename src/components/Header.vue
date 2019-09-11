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
              <a href="mailto:email@acaofilosofica.com">Email</a>
            </li>
            <li>
              <a
                href="https://surveys.hotjar.com/s?siteId=1481774&surveyId=141779"
                target="_blank"
              >Pesquisa</a>
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
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/blog">Blog</router-link>
      </li>
      <li>
        <a href="mailto:email@acaofilosofica.com">Email</a>
      </li>
      <li>
        <a
          href="https://surveys.hotjar.com/s?siteId=1481774&surveyId=141779"
          target="_blank"
        >Pesquisa</a>
      </li>
      <li>
        <router-link to="/login">
          <span v-if="this.$store.state.auth.value">Dashboard</span>
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