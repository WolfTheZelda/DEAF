<template>
  <TimerTable
    :tableNotice="tableNotice"
    :tableHead="tableHead"
    :tableBody="tableBody"
    :titleAddTo="path + '/edit/new'"
    titleText="Temporizador"
    tableReference="temporizadores"
    :showReference="path"
  />
</template>

<script>
import TimerTable from "../../components/Dashboard/TimerTable";
import { db } from "../../firebase";

export default {
  name: "Students",
  data: () => ({
    tableNotice:
      "# Apenas aqueles com liderança do Tempo devem manipular o Temporizador...",
    tableHead: [
      "Título",
      "Grupo",
      "Minutos",
      "Segundos",
      "Rodar",
      "Mostrar",
      "Deletar"
    ],
    tableBody: [],
    path: window.location.pathname
  }),
  components: {
    TimerTable
  },
  firebase: {
    tableBody: db.ref("temporizadores")
  }
};
</script>