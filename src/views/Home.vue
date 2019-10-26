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
      src="https://www.youtube.com/embed/live_stream?channel=UC0DRZ6GoPOBbt7bRFxTwd_Q"
      align="center"
      justify="center"
      title="O QUE É O DEBATE FILOSÓFICO?"
    />

    <Parallax src="/img/weapon-2.jpg" text="O PORTE" />

    <Content title="O QUE ESTÁ EM PAUTA?" type="1" />

    <Parallax src="/img/weapon-3.jpg" text="O TRÁFICO" />

    <Content title="NÃO ESTÁ CONVENCIDO?" :text="text1" type="0" />

    <Parallax src="/img/weapon-4.jpg" text="A JUSTIÇA" />

    <Content title="FICOU INTERESSADO?" text="email@acaofilosofica.com" type="0" />

    <Parallax src="/img/weapon-5.jpg" text="O PRESIDENTE" />

    <Footer />
  </div>
</template>

<script>
import Header from "../components/Header";
import Parallax from "../components/Parallax";
import Content from "../components/Content";
import Iframe from "../components/Iframe";
import Footer from "../components/Footer";

import M from "materialize-css";

import { mixin } from "../mixin";

export default {
  name: "Home",
  data() {
    return {
      text1:
        "<p>O Debate Filosófico é um evento realizado pelos alunos  do 9º ano do Ensino Fundamental ao Ensino Médio que busca promover uma discussão, em que há um confronto de ideias sobre determinado assunto que revigora no Brasil ou no mundo, e tem como seu principal objetivo garantir que nas discussões ambos os lados argumentem mostrando os pontos que os levam a concordar ou discordar do tema proposto. O evento não pretende fazer nenhuma apologia a nenhum dos lados do debate, apenas oferecer um espaço propício para que se possa construir opiniões e pensamentos justificáveis. Esse projeto é uma iniciativa, do professor de filosofia Moisés Welldon que conta com a colaboração ativa dos professores Domingos da Cruz, Rosália Ramos e Vivyanne Jesus, em que os alunos do Colégio Jorge Amado e Instituto de Ensino Joana D'arc participam integralmente para poder proporcionar um debate sério com dados verídicos.</p>",
      
    };
  },
  mounted() {
    M.AutoInit();
    document.querySelector(".background").style.zIndex  = "-10";
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
  },

  mixins: [mixin]
};
</script>
