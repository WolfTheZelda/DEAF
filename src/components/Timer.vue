<template>
  <h1>{{ now }}</h1>
</template>

<script>
export default {
  name: "Timer",
  data: () => ({
    now: "..."
  }),
  props: {
    target: String
  },
  methods: {
    startInterval: function() {
      setInterval(() => {
        let target = new Date(this.target).getTime();
        let now = new Date().getTime();

        let distance = target - now;

        let oneDay = 1000 * 60 * 60 * 24;
        let oneHour = 1000 * 60 * 60;
        let oneMinute = 1000 * 60;
        let oneSecond = 1000;

        let days = Math.floor(distance / oneDay);
        let hours = Math.floor((distance % oneDay) / oneHour);
        let minutes = Math.floor((distance % oneHour) / oneMinute);
        let seconds = Math.floor((distance % oneMinute) / oneSecond);

        if (distance <= 0) {
          this.now = "COMEÇOU, ESTAMOS AO VIVO!";
        } else if (distance > 0) {
          this.now =
            days +
            " D : " +
            hours +
            " H : " +
            minutes +
            " M : " +
            seconds +
            " S";
        }
      }, 1000);
    }
  },
  mounted() {
    this.startInterval();
  }
};
</script>