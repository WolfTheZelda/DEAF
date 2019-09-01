<template>
  <ul class="sidenav sidenav-fixed" id="side-nav">
    <li class="section center red white-text">
      <img
        class="responsive-img circle animated infinite heartBeat"
        src="/img/icon.png"
        width="100px"
      />
      <p>
        <i
          class="material-icons white-text animated swing"
          style="vertical-align: text-bottom;"
        >verified_user</i>
        &nbsp; {{ "Bem-vindo, " + this.$store.state.auth.name + "!" }}
      </p>
      <p>
        <i
          class="material-icons white-text animated swing"
          style="vertical-align: text-bottom;"
        >phone</i>
        &nbsp; {{ this.$store.state.auth.phone }}
      </p>
      <p>
        <i
          class="material-icons white-text animated swing"
          style="vertical-align: text-bottom;"
        >stars</i>
        &nbsp; {{ this.$store.state.auth.note }}
      </p>
    </li>
    <li v-for="link in links" :key="link.name">
      <router-link v-if="!link.external" :to="link.href">
        {{ link.name }}
        <i class="material-icons right grey-text animated swing">{{ link.icon }}</i>
      </router-link>
      <a v-else target="_blank" :href="link.href">
        {{ link.name }}
        <i class="material-icons right grey-text animated swing">{{ link.icon }}</i>
      </a>
    </li>
  </ul>
</template>

<script>
import { Event } from "../../event.js";

export default {
  data() {
    return {
      userWelcome: "Bem-Vindo, " + this.$store.state.authName + "!",

      userName: "",
      userPhone: "",
      userNote: "",

      links: [
        {
          name: "Menu",
          icon: "dashboard",
          href: "/dashboard",
          external: false
        },
        {
          name: "Email",
          icon: "email",
          href: "https://webmail.acaofilosofica.com/",
          external: true
        },
        {
          name: "Alunos",
          icon: "face",
          href: "/dashboard/students",
          external: false
        },
        {
          name: "Registros",
          icon: "new_releases",
          href: "/dashboard/records",
          external: false
        },
        {
          name: "Postagens",
          icon: "description",
          href: "/dashboard/blog",
          external: false
        },
        {
          name: "Administradores",
          icon: "mood",
          href: "/dashboard/managers",
          external: false
        }
      ]
    };
  },
  props: {},
  mounted() {
    
  }
};
</script>