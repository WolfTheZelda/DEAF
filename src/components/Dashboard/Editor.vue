<template>
  <div ref="editor"></div>
</template>

<script>
import Quill from "quill";

export default {
  props: {
    value: {
      type: String,
      default:
        "<ol><li>Presença nas reuniões (1,0)</li><li>Cumprir os prazos (1,0)</li><li>Participante nas discussões (1,0)</li><li>Participação nas atividades (1,0)</li><li>Ser pro-ativo (1,0)</li><li>Saber atuar em grupo (1,0)</li><li>Execução de trabalhos extra (1,0)</li><li>Comportamento (1,0)</li><li>Atividade passada pelo Professor Welldon (2,0)</li></ol>"
    }
  },

  data() {
    return {
      editor: null
    };
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

    this.editor.root.innerHTML = this.value;

    this.editor.on("text-change", () => this.update());
  },

  methods: {
    update() {
      this.$emit(
        "input",
        this.editor.getText() ? this.editor.root.innerHTML : ""
      );
    }
  }
};
</script>