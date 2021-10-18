<template>
  <div class="container d-flex justify-content-center align-items-center flex-column">

    <img src="@/assets/logo.png"
         alt=""
         class="logo">
    <h3>Iniciar sesión</h3>

    <div class="mt-4">
      <va-input type="email"
                placeholder="Correo electrónico"
                v-model="email"/>

      <va-input class="mt-3"
                type="password"
                placeholder="Contraseña"
                v-model="password"/>

      <va-button class="mt-4"
                 block
                 @click="signIn">Acceder
      </va-button>

      <va-button outline
                 block
                 class="mt-2"
                 @click="goToRegister">Ir a Registrarme
      </va-button>
    </div>
  </div>
</template>

<script>
import {VaButton, VaInput} from "vuestic-ui";
import {AlertService} from "@/@Core/services/Alert.service";
import {auth} from "@/firebase";
import {AuthService} from "@/@Core/services/Auth.service";

export default {
  name: "Login",
  components: {
    VaInput,
    VaButton
  },
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signIn: function () {
      if (!this.email) return AlertService.error('El campo de correo electrónico es obligatorio')
      if (!this.password) return AlertService.error('El campo contraseña es obligatorio')

      auth.signInWithEmailAndPassword(this.email, this.password)
          .then(userCredential => {
            this.$router.push('/app/home')
          })
          .catch(error => {
            AlertService.error(AuthService.getMessageError(error.code))
          })
    },
    goToRegister: function () {
      this.$router.push('/auth/register')
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh
}

.logo {
  width: 100px;
  height: auto
}
</style>
