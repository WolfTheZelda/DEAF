<template>
  <fragment>
    <TimerControl />
    <TimerTable
      :tableNotice="tableNotice"
      :tableHead="tableHead"
      :tableBody="tableBody"
      :titleAddTo="path + '/edit/new'"
      titleText="Temporizadores"
      tableReference="temporizadores"
      :showReference="path"
    />
  </fragment>
</template>

<script>
import TimerTable from "../../components/Dashboard/TimerTable";
import TimerControl from "../../components/Dashboard/TimerControl";
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
      "Selecionar",
      "Atualizar",
      "Deletar"
    ],
    tableBody: [],
    path: window.location.pathname
  }),
  components: {
    TimerTable,
    TimerControl
  },
  firebase: {
    tableBody: db.ref("temporizadores/tabela")
  }
};
</script>