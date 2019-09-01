<template>
  <section class="container white-text">
    <div class="section">
      <div class="row">
        <h3 class="center">O QUE ESTÁ EM PAUTA?</h3>
        <div class="col s12 m3">
          <div class="icon-block">
            <h2 class="center yellow-text">
              <i class="material-icons large">wb_sunny</i>
            </h2>
            <h5 class="center">TEXTO</h5>
            <p class="center-align light">TEXTO</p>
          </div>
        </div>
        <div class="col s12 m3">
          <div class="icon-block">
            <h2 class="center red-text">
              <i class="material-icons large">whatshot</i>
            </h2>
            <h5 class="center">TEXTO</h5>
            <p class="center-align light">TEXTO</p>
          </div>
        </div>
        <div class="col s12 m3">
          <div class="icon-block">
            <h2 class="center blue-text">
              <i class="material-icons large">directions_run</i>
            </h2>
            <h5 class="center">TEXTO</h5>
            <p class="center-align light">TEXTO</p>
          </div>
        </div>
        <div class="col s12 m3">
          <div class="icon-block">
            <h2 class="center green-text">
              <i class="material-icons large">public</i>
            </h2>
            <h5 class="center">TEXTO</h5>
            <p class="center-align light">TEXTO</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data: () => ({
    ecosystem: [
      {
        text: "vuetify-loader",
        href: "https://github.com/vuetifyjs/vuetify-loader"
      },
      {
        text: "github",
        href: "https://github.com/vuetifyjs/vuetify"
      },
      {
        text: "awesome-vuetify",
        href: "https://github.com/vuetifyjs/awesome-vuetify"
      }
    ],
    importantLinks: [
      {
        text: "Documentation",
        href: "https://vuetifyjs.com"
      },
      {
        text: "Chat",
        href: "https://community.vuetifyjs.com"
      },
      {
        text: "Made with Vuetify",
        href: "https://madewithvuejs.com/vuetify"
      },
      {
        text: "Twitter",
        href: "https://twitter.com/vuetifyjs"
      },
      {
        text: "Articles",
        href: "https://medium.com/vuetify"
      }
    ],
    whatsNext: [
      {
        text: "Explore components",
        href: "https://vuetifyjs.com/components/api-explorer"
      },
      {
        text: "Select a layout",
        href: "https://vuetifyjs.com/layout/pre-defined"
      },
      {
        text: "Frequently Asked Questions",
        href: "https://vuetifyjs.com/getting-started/frequently-asked-questions"
      }
    ]
  })
};
</script>
