<template>
  <div class="row animated bounceIn" id="login" v-show="!this.$store.state.auth.login">
    <div class="col s12 z-depth-4 card-panel">
      <form onsubmit="return false">
        <div class="row">
          <div class="input-field col s12 center">
            <img class="circle responsive-img animated infinite heartBeat" src="/img/icon.png" />

            <p class="center login-form-text">{{ title }}</p>
          </div>
        </div>

        <div class="row margin">
          <div class="input-field col s12">
            <input
              v-if="type === 'tel'"
              id="input"
              type="tel"
              v-model="input"
              v-imask="mask"
              maxlength="20"
              minlength="20"
              required
            />
            <input
              v-else
              id="input"
              type="password"
              v-model="input"
              required
            />

            <label class="center-align" for="input">{{ label }}</label>
          </div>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <button
              class="btn waves-effect waves-light blue col s12"
              id="sign-in-button"
              v-on:click="signInAuth"
            >Continuar</button>
          </div>
        </div>

        <div class>
          <div id="recaptcha-container"></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { firebase, auth } from "../firebase";

import { mixin } from "../mixin";

import { IMaskDirective } from "vue-imask";

export default {
  name: "Login",
  data() {
    return {
      title: "Acesso Restrito",
      label: "Telefone",
      type: "tel",
      input: null,
      mask: {
        mask: "{+55} {(00)} {9} {0000}{-}{0000}",
        lazy: true
      }
    };
  },
  directives: {
    imask: IMaskDirective
  },
  beforeMount() {
    this.checkAuth();
  },
  mounted() {
    this.checkRecaptcha();
  },
  mixins: [mixin],
  methods: {
    signInAuth() {
      if (this.input) {
        if (window.confirmationResult === undefined) {
          auth
            .signInWithPhoneNumber(this.input, window.recaptchaVerifier)
            .then(confirmationResult => {
              this.$store.dispatch(
                "toast",
                "Verifique a senha no seu telefone"
              );

              window.confirmationResult = confirmationResult;

              this.input = "";
              this.label = "Senha";
              this.type = "password";
            })
            .catch(error => {
              this.$store.dispatch(
                "toast",
                "Erro ao enviar senha para o telefone"
              );

              window.recaptchaVerifier.render().then(widgetId => {
                grecaptcha.reset(widgetId);
              });
            });
        } else {
          window.confirmationResult
            .confirm(this.input)
            .then(result => {
              this.$store.dispatch("toast", "Logado com sucesso");
            })
            .catch(error => {
              this.$store.dispatch("toast", "Erro ao logar");
            });
        }
      }
    },
    checkRecaptcha() {
      if (!this.$store.state.auth.value) {
        auth.languageCode = "pt-BR";

        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          "sign-in-button",
          {
            size: "invisible"
          }
        );

        window.recaptchaVerifier.render().then(function(widgetId) {
          window.recaptchaWidgetId = widgetId;
        });
      }
    }
  }
};
</script>

<style>
#login {
  min-width: 100px;
  max-width: 200px;

  margin: 5% auto;
}

.grecaptcha-badge {
  top: 100% !important;
  right: -12.5% !important;
}
</style>