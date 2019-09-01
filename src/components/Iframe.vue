<template>
  <section class="container white-text">
    <div class="section center">
      <h2 class="row header">{{ title }}</h2>
      <br />
      <div class="row video-container">
        <iframe
          type="text/html"
          allow="autoplay"
          frameborder="0"
          allowfullscreen="allowfullscreen"
          :src="src"
        ></iframe>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Iframe",
  data() {
    return {};
  },
  props: {
    title: String,
    src: String
  }
};
</script>