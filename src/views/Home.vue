<template>
  <div>
    <Header />

    <Parallax
      src="/img/weapon-1.jpg"
      text="PREPARE-SE!"
      subText="DEBATE FILOSÓFICO - PORTE DE ARMAS"
      :useTimer="true"
    />
    <Iframe
      src="https://www.youtube.com/embed/OAgVYzUoDo8"
      align="center"
      justify="center"
      title="O QUE É O DEBATE FILOSÓFICO?"
    />
    <Parallax src="/img/weapon-2.jpg" text="O PORTE" />
    <Content />
    <Parallax src="/img/weapon-3.jpg" text="O TRÁFICO" />
    <Content />
    <Parallax src="/img/weapon-4.jpg" text="A JUSTIÇA" />
    <Content />
    <Parallax src="/img/weapon-5.jpg" text="O PRESIDENTE" />
    <Content />

    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header";
import Parallax from "../components/Parallax";
import Content from "../components/Content";
import Iframe from "../components/Iframe";
import Footer from "../components/Footer";

export default {
  name: "Home",
  data() {
    return {};
  },
  mounted() {
    M.AutoInit();
  },
  updated() {
    M.AutoInit();
  },
  props: {},
  methods: {},
  components: {
    Header,
    Parallax,
    Content,
    Iframe,
    Footer
  }
};
</script>
