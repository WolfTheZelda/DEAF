<template>
  <UserTable
    :tableNotice="tableNotice"
    :tableHead="tableHead"
    :tableBody="tableBody"
    :titleAddTo="path + '/edit/new'"
    titleText="Alunos"
    tableReference="alunos"
    :showReference="path"
    userRemovedGroup="aluno"
  />
</template>

<script>
import UserTable from "../../components/Dashboard/UserTable";
import { db } from "../../firebase";

export default {
  name: "Students",
  data: () => ({
    tableNotice:
      "# Apenas aqueles sem liderança devem ser adicionados como Alunos...",
    tableHead: [
      "Nome",
      "Ano",
      "Colégio",
      "Grupo",
      "Nota",
      "Telefone",
      "Mostrar",
      "Deletar"
    ],
    tableBody: [],
    path: window.location.pathname
  }),
  components: {
    UserTable
  },
  firebase: {
    tableBody: db.ref("alunos")
  }
};
</script>