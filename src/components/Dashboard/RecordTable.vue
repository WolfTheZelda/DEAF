<template>
  <section class="animated fadeInLeft">
    <Title :titleText="tableTitle" :titleAddTo="tableTitleAddTo" />
    <div class="card">
      <div style="overflow-x:auto;">
        <table class="striped centered">
          <thead class="white">
            <tr>
              <th v-for="head in tableHead" :key="head">{{ head }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="tableBody.length == 0">
              <td>...</td>
              <td>...</td>
              <td>...</td>
            </tr>
            <tr v-for="body in tableBody" :key="body['.key']">
              <td>{{ body.timestamp }}</td>
              <td>{{ body.registro }}</td>
              <td>{{ new Date(body.timestamp).toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p class="white-text">{{ tableNotice }}</p>
  </section>
</template>

<script>
import Title from "./Title";

export default {
  props: {
    tableNotice: String,
    tableHead: Array,
    tableBody: Array,

    tableTitleAddTo: String,
    tableTitle: String
  },
  components: {
    Title
  }
};
</script>