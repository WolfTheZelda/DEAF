<template>
  <transition name="fade" mode="out-in">
    <router-view></router-view>
  </transition>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
html {
  height: 100%;
}
body {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;

  overflow-x: hidden;
}

/* Background */
body {
  background: url("/img/background.jpg") no-repeat center center fixed;
  background-color: rgb(205, 205, 205);
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

/* Animations Off On Mobile */
@media only screen and (max-width: 768px) {
  * {
    -o-transition-property: none !important;
    -moz-transition-property: none !important;
    -ms-transition-property: none !important;
    -webkit-transition-property: none !important;
    transition-property: none !important;

    -webkit-animation: none !important;
    -moz-animation: none !important;
    -o-animation: none !important;
    -ms-animation: none !important;
    animation: none !important;
  }
  .animated {
    -o-transition-property: none !important;
    -moz-transition-property: none !important;
    -ms-transition-property: none !important;
    -webkit-transition-property: none !important;
    transition-property: none !important;

    -o-transform: none !important;
    -moz-transform: none !important;
    -ms-transform: none !important;
    -webkit-transform: none !important;
    transform: none !important;

    -webkit-animation: none !important;
    -moz-animation: none !important;
    -o-animation: none !important;
    -ms-animation: none !important;
    animation: none !important;
  }
}
</style>