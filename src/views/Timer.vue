<template>
  <div id="timer" class="orange white-text">
    <Timer parent="timer" />
  </div>
</template>

<script>
import Timer from "../components/Cron";

export default {
  components: {
    Timer
  }
};
</script>

<style>
#timer {
  width: 100vw;
  height: 100vh;

  position: fixed;
}
#timer-count {
  font-size: 25vw !important;
}
</style>