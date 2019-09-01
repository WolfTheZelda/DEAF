<template>
  <footer class="page-footer blue">
    <div class="container">
      <div class="row">
        <div class="col s6">
          <h5 class="white-text">Apoio</h5>
          <ul>
            <li>
              <a
                class="grey-text text-lighten-4"
                href="#"
                target="_blank"
                rel="nofollow"
              >Colégio Joana D'Arc</a>
            </li>
            <li>
              <a
                class="grey-text text-lighten-4"
                href="#"
                target="_blank"
                rel="nofollow"
              >Colégio Jorge Amado</a>
            </li>
          </ul>
        </div>
        <div class="col s6">
          <h5 class="white-text">Redes</h5>
          <ul>
            <li>
              <a
                class="grey-text text-lighten-3"
                href="https://instagram.com/debatef.2019"
                target="_blank"
                rel="nofollow"
              >Instagram</a>
            </li>
            <li>
              <a class="grey-text text-lighten-3" href="#" target="_blank" rel="nofollow">Facebook</a>
            </li>
            <li>
              <a
                class="grey-text text-lighten-3"
                href="https://wa.me/5573988491510"
                target="_blank"
                rel="nofollow"
              >WhatsApp</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="footer-copyright blue darken-1">
      <div class="container">
        © 2019
        <a class="grey-text text-lighten-4" href="https://tecwolf.com.br/" target="_blank">TecWolf</a>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {
          name: "Ínicio",
          ref: "/"
        },
        {
          name: "Blog",
          ref: "/blog"
        },
        {
          name: "Dashboard",
          ref: "/dashboard"
        }
      ]
    };
  }
};
</script>