<template>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  name: "App",
  mounted() {
    document.body.style.backgroundColor = "transparent";
  }
};
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

/*
html {
  width: 100%;
  height: 100%;

  background: url("/img/background.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}
*/

body {  
  overflow-x: hidden;
}

.background {
  display: block;

  width: 100vw;
  height: 100vh;
  position: fixed;
  
  color: white;
  text-align: center;

  background: url("/img/background.jpg") no-repeat bottom center scroll;
  background-color: white;
  background-position: 30% 45%;

  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

/* Width */
::-webkit-scrollbar {
  width: 10px;
}
/* Track */
::-webkit-scrollbar-track {
  background: rgba(225, 225, 225);
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: rgb(45, 45, 35);
}
/* Handle On Hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(85, 85, 85);
}

/* Others */
.parallax-container {
  background-color: rgba(0, 0, 0, 0.5);
}
.link-active {
  background-color: rgba(0, 0, 0, 0.05);
}

/* Transitions Router */
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>