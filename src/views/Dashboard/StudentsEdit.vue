<template>
  <UserForm
    :groups="groups"
    :schools="schools"
    :years="years"
    :notice="notice"
    databaseReference="alunos"
    userRemovedGroup="aluno"
  />
</template>

<script>
import UserForm from "../../components/Dashboard/UserForm";
import { db } from "../../firebase";

export default {
  name: "StudentsEdit",
  data: () => ({
    notice:
      "# Apenas aqueles sem liderança devem ser adicionados como Alunos...",

    groups: [
      "Tempo",
      "Fomento",
      "Finanças",
      "Arrumação",
      "Alimentação",
      "Produção Técnica",
      "Apoio Pedagógico"
    ],
    schools: ["Joana D'Arc", "Jorge Amado"],
    years: ["9° Ano", "1° Ano", "2° Ano", "3° Ano"],

    tableBody: []
  }),
  components: {
    UserForm
  },
  firebase: {
    tableBody: db.ref("alunos")
  },
  mounted() {
  }
};
</script>