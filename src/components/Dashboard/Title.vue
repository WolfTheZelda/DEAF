<template>
  <h3 class="header white-text truncate" style="height: 75px;">
    {{ titleText }}
    <router-link class="btn-floating btn-large red right waves-effect waves-light" :to="titleAddTo" v-if="titleAddTo !== undefined">
      <i class="large material-icons">add</i>
    </router-link>
  </h3>
</template>

<script>
export default {
  props: {
    titleText: String,
    titleAddTo: String
  }
};
</script>