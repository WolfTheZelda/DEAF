<template>
  <section v-if="type == 0" class="container white-text">
    <div class="section">
      <div class="row">
        <div class="col s12 center">
          <h3>{{title}}</h3>
          <p class="center-align light" v-html="text"></p>
        </div>
      </div>
    </div>
  </section>
  <section v-else-if="type == 1" class="container white-text">
    <div class="section">
      <div class="row">
        <h3 class="center">{{title}}</h3>

        <div class="col s12 m3" v-for="content in contentMultiple" :key="content.icon">
          <div class="icon-block">
            <h2 class="center" :class="content.class">
              <i class="material-icons large">{{content.icon}}</i>
            </h2>
            <h5 class="center">{{content.title}}</h5>
            <p class="center-align light" v-html="content.text"></p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    contentMultiple: [
      {
        title: "TEMA",
        text: "<p>Um homem comum deve ter o direito de tirar a vida de outro? Se um bandido anda armado porque um cidadão de bem não pode? Armar a população é a solução? Até quando a vida de homens honestos será tirada pela falta de proteção?</p> <p>No Debate Filosófico deste ano o tema discutido será a legalização do porte de armas, umas das promessas de campanha do atual presidente Jair Bolsonaro e que volta e meia é tema de discussão politica por tratar de questões de cunho religioso, social e moral. Portanto, no âmbito escolar, a discussão filosófica desse tema é essencial para desenvolver e estimular as opiniões divergentes dos estudantes e dos convidados.</p>",
        icon: "wb_sunny",
        class: "yellow-text"
      },
      {
        title: "TEXTO",
        text: "TEXTO",
        icon: "whatshot",
        class: "red-text"
      },
      {
        title: "TEXTO",
        text: "TEXTO",
        icon: "directions_run",
        class: "blue-text"
      },
      {
        title: "TEXTO",
        text: "TEXTO",
        icon: "public",
        class: "green-text"
      }
    ]
  }),
  props: {
    title: String,
    text: String,
    type: 0
  }
};
</script>
