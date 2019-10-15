<template>
  <section class="animated bounceIn">
    <h3 class="header white-text truncate" style="height: 64px;">{{ title }}</h3>
    <div class="card">
      <div class="row">
        <form class="col s12" onsubmit="return false">
          <div class="row section center">
            <img
              class="circle"
              style="object-fit: cover;"
              :src="photo"
              width="256px"
              height="256px"
            />
          </div>
          <div class="row center">
            <label class="btn green" for="file">
              Escolher
              Foto
            </label>
            <input
              style="display: none;"
              type="file"
              id="file"
              accept=".png, .jpg, .jpeg, .jfif"
              onchange="EnviarArquivo('aluno-foto-arquivo', 'aluno-foto-imagem', '/alunos/')"
            />
          </div>
          <div class="row">
            <div class="input-field col s4">
              <input
                class="validate"
                placeholder="Nome"
                type="text"
                required
                v-on:change="nameMask(name)"
                v-model="name"
                data-hj-whitelist
              />
            </div>
            <div class="input-field col s4">
              <input
                class="validate"
                placeholder="Nota"
                type="number"
                min="0"
                max="40"
                required
                value="40"
                step="0.1"
                v-model="note"
                data-hj-whitelist
              />
            </div>
            <div class="input-field col s4">
              <input
                class="validate"
                placeholder="Telefone"
                type="tel"
                required
                v-model="phone"
                v-mask="'+55 (##) 9 ####-####'"
                maxlength="20"
                minlength="20"
                data-hj-whitelist
              />
            </div>
          </div>
          <div class="row">
            <div class="input-field col s4 m4">
              <select class="browser-default" v-model="year" required>
                <option value disabled selected hidden>Ano</option>
                <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
              </select>
            </div>
            <div class="input-field col s4 m4">
              <select class="browser-default" v-model="school" required>
                <option value disabled selected hidden>Colégio</option>
                <option v-for="school in schools" :key="school" :value="school">{{ school }}</option>
              </select>
            </div>
            <div class="input-field col s4 m4">
              <select class="browser-default" v-model="group" required>
                <option value disabled selected hidden>Grupo</option>
                <option v-for="group in groups" :key="group" :value="group">{{ group }}</option>
              </select>
            </div>
          </div>
          <div class="section center">
            <div ref="editor" />
          </div>
          <div class="row center">
            <div class="col s4">
              <a class="waves-effect waves-light btn-large blue" v-on:click="back">Voltar</a>
            </div>
            <div class="col s4">
              <button class="waves-effect waves-light btn-large red" type="reset">Limpar</button>
            </div>
            <div class="col s4">
              <button
                class="waves-effect waves-light btn-large green"
                type="submit"
                v-on:click="addUser"
              >Salvar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
    <p class="white-text">{{ notice }}</p>
  </section>
</template>

<script>
import { db } from "../../firebase";

import Quill from "quill";

export default {
  data() {
    return {
      photo: "/img/gallery.webp",

      name: "",
      note: "",
      phone: this.$route.params.id === "new" ? "" : this.$route.params.id,

      year: "",
      school: "",
      group: "",

      editor: ""
    };
  },
  components: {},
  methods: {
    addUser() {
      let photoInput = this.photo;

      let nameInput = this.nameMask(this.name);
      let noteInput = this.note;
      let phoneInput = "+" + this.phone.replace(/\D/g, "");

      let yearInput = this.year;
      let schoolInput = this.school;
      let groupInput = this.group;

      let criteriaQuill = this.editor.root.innerHTML;

      if (
        nameInput !== "" &&
        noteInput !== "" &&
        phoneInput.length === 14 &&
        yearInput !== "" &&
        schoolInput !== "" &&
        groupInput !== ""
      ) {
        db.ref(this.databaseReference)
          .child(phoneInput)
          .set({
            foto: photoInput,

            nome: nameInput,
            nota: noteInput,

            ano: yearInput,
            colegio: schoolInput,
            grupo: groupInput,

            criterios: criteriaQuill
          })
          .then(() => {
            if (this.$route.params.id === "new") {
              if (this.databaseReference === "alunos") {
                this.$store.dispatch(
                  "record",
                  "O(a) administrador(a) " +
                    this.$store.state.auth.name +
                    " (" +
                    this.$store.state.auth.group +
                    ") adicionou o(a) " +
                    this.userRemovedGroup +
                    "(a) " +
                    this.nameMask(this.name) +
                    " (" +
                    this.group +
                    ") com a nota " +
                    this.note
                );
              } else if (this.databaseReference === "administradores") {
                this.$store.dispatch(
                  "record",
                  "O(a) administrador(a) " +
                    this.$store.state.auth.name +
                    " (" +
                    this.$store.state.auth.group +
                    ") adicionou o(a) " +
                    this.userRemovedGroup +
                    "(a) " +
                    this.nameMask(this.name) +
                    " (" +
                    this.group +
                    ") com a nota " +
                    this.note +
                    " e com o telefone " +
                    phoneInput
                );
              }
            } else if (this.$route.params.id.includes("+")) {
              if (phoneInput.replace(/\D/g, "") !== this.$route.params.id.replace(/\D/g, "")) {
                db.ref(this.databaseReference)
                  .child("+" + this.$route.params.id.replace(/\D/g, ""))
                  .remove();
              }
              if (this.databaseReference === "alunos") {
                this.$store.dispatch(
                  "record",
                  "O(a) administrador(a) " +
                    this.$store.state.auth.name +
                    " (" +
                    this.$store.state.auth.group +
                    ") atualizou o(a) " +
                    this.userRemovedGroup +
                    "(a) " +
                    this.nameMask(this.name) +
                    " (" +
                    this.group +
                    ") com a nota " +
                    this.note
                );
              } else if (this.databaseReference === "administradores") {
                this.$store.dispatch(
                  "record",
                  "O(a) administrador(a) " +
                    this.$store.state.auth.name +
                    " (" +
                    this.$store.state.auth.group +
                    ") atualizou o(a) " +
                    this.userRemovedGroup +
                    "(a) " +
                    this.nameMask(this.name) +
                    " (" +
                    this.group +
                    ") com a nota " +
                    this.note +
                    " e com o telefone " +
                    phoneInput
                );
              }
            }

            this.$router.back();
          })
          .catch(() => {
            this.$store.dispatch("record", "Você não tem permissão para isso");

            this.$router.back();
          });
      } else {
        this.$store.dispatch("toast", "Preencha todos os campos");
      }
    },
    back: function() {
      this.$router.back();
    },
    nameMask(Text) {
      if (Text != null && Text != "") {
        let Texto = Text.toLowerCase().trim();

        let Palavras = Texto.split(" ");

        for (let i = 0; i < Palavras.length; i++) {
          let Palavra = Palavras[i];

          let PrimeiraLetra = Palavra[0];

          if (Palavra.length > 2) {
            Palavra = PrimeiraLetra.toUpperCase() + Palavra.slice(1);
          } else {
            Palavra = PrimeiraLetra + Palavra.slice(1);
          }

          Palavras[i] = Palavra;
        }

        return Palavras.join(" ");
      }
    },
    getUser() {
      db.ref(this.databaseReference)
        .child(this.$route.params.id)
        .on("value", snapUser => {
          if (snapUser.exists()) {
            this.photo = snapUser.val().foto;

            this.name = this.nameMask(snapUser.val().nome);
            this.note = snapUser.val().nota;
            // this.phone = snapUser.key;

            this.year = snapUser.val().ano;
            this.school = snapUser.val().colegio;
            this.group = snapUser.val().grupo;

            this.editor.root.innerHTML = snapUser.hasChild("criterios")
              ? snapUser.val().criterios
              : this.$store.state.default.criteria;
          }
        });
    }
  },
  props: {
    notice: String,
    years: Array,
    schools: Array,
    groups: Array,
    reference: String,
    title: {
      type: String,
      default: "Título"
    },
    databaseReference: String,
    userRemovedGroup: String
  },
  mounted() {
    this.editor = new Quill(this.$refs.editor, {
      theme: "snow",
      modules: {
        toolbar: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          // [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ direction: "rtl" }],
          // [{ size: ["small", false, "large", "huge"] }],
          // [{ header: [1, 2, 3, 4, 5, 6, false] }],
          // [{ color: [] }, { background: [] }],
          // [{ font: [] }],
          // [{ align: [] }],
          ["clean"],
          ["link", "image", "video"]
        ]
      }
    });

    this.editor.root.innerHTML = this.$store.state.default.criteria;

    this.getUser();

    // this.mask.typedValue = this.phone;
  }
};
</script>