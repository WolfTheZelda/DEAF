<template>
  <section class="animated bounceIn" id="menu">
    <div class="col s12 m7">
      <div class="card video-container">
        <iframe
          id="menu-video"
          type="text/html"
          width="640"
          height="360"
          allow="autoplay"
          frameborder="0"
          :src="srcVideo"
        ></iframe>
      </div>
    </div>
    <div class="col s12 m7">
      <h3 class="header white-text truncate" style="height: 64px;">Aviso</h3>
      <div class="card horizontal">
        <img class="responsive-img hide-on-med-and-down" src="/img/gif.gif" width="25%" />
        <div class="card-stacked">
          <div class="card-content">
            <p>
              Olá, eu sou um cartão muito simples e também sou bom em conter pequenos bits de
              informação.
            </p>
            <p>Fique sempre atento aqui para quando aparecer alguma novidade:</p>
            <br />
            <p>
              <b># Aviso</b>
            </p>
            <br />
            <p>
              Favor não se esquecer de colocar o 9 durante a inserção do telefone de alunos ou
              administradores
            </p>
            <br />
            <p>
              <b># Critérios</b>
            </p>
            <p v-html="this.$store.state.auth.criteria"></p>
          </div>
          <div class="card-action">
            <a href>Acessar</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      srcVideo:
        "https://www.youtube.com/embed?list=PLwxNMb28XmpeypJMHfNbJ4RAFkRtmAN3P&index=" +
        // Receber vídeo aleatório da Playlist.
        Math.floor(Math.random() * (35 - 1))
    };
  },
  mounted() {}
};
</script>