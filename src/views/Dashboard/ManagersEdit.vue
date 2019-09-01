<template>
  <UserForm
    :groups="groups"
    :schools="schools"
    :years="years"
    :notice="notice"
    databaseReference="administradores"
  />
</template>

<script>
import UserForm from "../../components/Dashboard/UserForm";
import { db } from "../../firebase";

export default {
  name: "ManagersEdit",
  data: () => ({
    notice:
      "# Apenas aqueles sem liderança devem ser adicionados como Alunos...",

    groups: ["Líder", "Vice-Líder", "Orientador", "Desenvolvedor"],
    schools: ["Joana D'Arc", "Jorge Amado", "Irrelevante"],
    years: ["9° Ano", "1° Ano", "2° Ano", "3° Ano", "Irrelevante"],

    tableBody: []
  }),
  components: {
    UserForm
  },
  firebase: {
    tableBody: db.ref("administradores")
  }
};
</script>