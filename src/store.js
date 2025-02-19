import Vue from "vue";
import Vuex from "vuex";

import {
  db
} from "./firebase"

import M from "materialize-css";

Vue.use(Vuex);

const defaultCriteria = "<ol><li>Presença nas reuniões (1,0)</li><li>Cumprir os prazos (1,0)</li><li>Participante nas discussões (1,0)</li><li>Participação nas atividades (1,0)</li><li>Ser pro-ativo (1,0)</li><li>Saber atuar em grupo (1,0)</li><li>Execução de trabalhos extra (1,0)</li><li>Comportamento (1,0)</li><li>Atividade passada pelo Professor Welldon (2,0)</li></ol>";

export default new Vuex.Store({
  state: {
    auth: {
      id: "",
      login: true,
      value: false,
      name: "Usuário",
      phone: "Telefone",
      note: "Nota",
      group: "Grupo",
      criteria: defaultCriteria,
      verified: false
    },
    default: {
      criteria: defaultCriteria,
      dark: false
    }
  },
  mutations: {},
  actions: {
    toast(state, html) {
      M.toast({
        html: html
      });
    },
    record(state, html) {
      this.dispatch("toast", html);

      db.ref("registros").push().set({
        registro: html,
        timestamp: Date.now()
      });
    }
  }
})