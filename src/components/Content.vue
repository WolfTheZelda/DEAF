<template>
  <section v-if="type == 0" class="container white-text">
    <div class="section">
      <div class="row">
        <div class="col s12 center">
          <h3>{{title}}</h3>
          <p class="center-align light">{{text}}</p>
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
            <p class="center-align light">{{content.text}}</p>
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
        title: "TEXTO",
        text: "TEXTO",
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
