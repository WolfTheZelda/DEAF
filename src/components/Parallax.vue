<template>
  <section class="parallax-container z-depth-5">
    <div class="section no-pad-bot">
      <div class="container">
        <div class="center white-text">
          <h1 class="header col s12 light">{{ text }}</h1>
          <h4 class="header col s12 light">{{ subText }}</h4>
          <Timer v-if="useTimer" target="2019-10-25 17:00:00" />
        </div>
      </div>
    </div>
    <div class="parallax">
      <img :src="src" />
    </div>
  </section>
</template>

<script>
import Timer from "./Timer";

export default {
  name: "Parallax",
  data: () => ({
    // text: "PREPARE-SE!",
    // subtext: ""
  }),
  props: {
    src: String,
    text: String,
    subText: String,
    useTimer: Boolean
  },
  components: {
    Timer
  }
};
</script>