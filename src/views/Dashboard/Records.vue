<template>
  <RecordTable
    :tableTitle="tableTitle"
    :tableHead="tableHead"
    :tableBody="tableBody"
    tableNotice="# Registros..."
  />
</template>

<script>
import RecordTable from "../../components/Dashboard/RecordTable";

import { db } from "../../firebase";

export default {
  name: "Records",
  data: () => ({
    tableTitle: "Registros",
    tableHead: ["Marca Temporal", "Registro", "Data"],
    tableBody: []
  }),
  components: {
    RecordTable
  },
  firebase: {
    tableBody: db.ref("registros")
  }
};
</script>