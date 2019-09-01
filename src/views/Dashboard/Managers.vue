<template>
  <UserTable
    :tableNotice="tableNotice"
    :tableHead="tableHead"
    :tableBody="tableBody"
    titleAddTo="/dashboard/managers/edit/new"
    titleText="Administradores"
    userRemovedGroup="administrador"
    groupMaster="Desenvolvedor"
    tableReference="administradores"
  />
</template>

<script>
import UserTable from "../../components/Dashboard/UserTable";
import { db } from "../../firebase";

export default {
  name: "Managers",
  data: () => ({
    tableNotice:
      "# Apenas aqueles com liderança devem ser adicionados como Administradores...",
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
    tableBody: []
  }),
  components: {
    UserTable
  },
  firebase: {
    tableBody: db.ref("administradores")
  }
};
</script>