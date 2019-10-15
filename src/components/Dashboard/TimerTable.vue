<template>
  <section class="animated fadeInLeft">
    <Title :titleText="titleText" />
    <div class="card">
      <div style="overflow-x: auto;">
        <table
          class="striped centered"
          style="width: 100%; min-height: 256px;"
          data-page-length="25"
        >
          <thead class="white">
            <tr>
              <th v-for="head in tableHead" :key="head">{{ head }}</th>
            </tr>
          </thead>
          <tbody id="alunos-lista">
            <TimerForm :tableBody="tableBody" />
          </tbody>
        </table>
      </div>
    </div>
    <p class="white-text">{{ tableNotice }}</p>
  </section>
</template>

<script>
import Title from "./Title";
import TimerForm from "./TimerForm";

export default {
  data: () => ({
    count: 0
  }),
  props: {
    tableNotice: String,
    tableHead: Array,
    tableBody: Array,

    titleAddTo: String,
    titleText: String,

    tableReference: String,

    showReference: String,

    userRemovedGroup: String,

    groupMaster: String
  },
  components: {
    Title,
    TimerForm
  }
}
</script>