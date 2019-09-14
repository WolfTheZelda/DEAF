<template>
  <div class="row animated bounceIn login-page" v-show="!this.$store.state.auth.login && type !== 2">
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
            <the-mask
              v-show="type === 0"
              id="input"
              type="tel"
              v-model="phone"
              mask="+55 (##) 9 ####-####"
              :masked="true"
              maxlength="20"
              minlength="20"
              required
              data-hj-whitelist
            />

            <input v-show="type === 1" id="input" type="password" v-model="password" required />

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
      </form>
    </div>

    <div class="center-align">
      <p class="white-text">{{ notice }}</p>
      <p class="white-text">{{ example }}</p>
      <P class="white-text">-</p>
    </div>

    <div>
      <div id="recaptcha-container"></div>
    </div>
  </div>
</template>

<script>
import { firebase, auth } from "../firebase";

import { mixin } from "../mixin";

export default {
  name: "Login",
  data() {
    return {
      title: "Acesso Restrito",
      label: "Telefone",
      type: 0,
      phone: null,
      password: null,
      notice: "# Insira o número telefone com o DDD e o 9 inclusos. Exemplo:",
      example: "+55 (00) 9 0000-0000"
    };
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
      if (this.phone || this.password) {
        if (
          (this.phone.length == 20 && this.type === 0) ||
          (this.password.length == 6 && this.type === 1)
        ) {
          if (window.confirmationResult === undefined) {
            auth
              .signInWithPhoneNumber(this.phone, window.recaptchaVerifier)
              .then(confirmationResult => {
                this.$store.dispatch(
                  "toast",
                  "Verifique a senha no seu telefone"
                );

                window.confirmationResult = confirmationResult;

                this.type = 1;
                this.phone = "";
                this.label = "Senha";
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
              .confirm(this.password)
              .then(result => {
                this.$store.state.auth.verified = false;
                this.$store.dispatch("toast", "Logado com sucesso");
                
                this.type = 0;
                this.password = "";
                this.label = "Telefone";
                
                window.confirmationResult = undefined;
                window.recaptchaVerifier = undefined;
              })
              .catch(error => {
                this.$store.dispatch("toast", "Erro ao logar");
              });
          }
        } else {
          this.$store.dispatch("toast", "Insira o telefone corretamente");
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
.login-page {
  min-width: 100px;
  max-width: 200px;
}

.grecaptcha-badge {
  top: 100% !important;
  right: -12.5% !important;
}
</style>