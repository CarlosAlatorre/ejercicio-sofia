<template>
  <div class="container d-flex justify-content-center align-items-center flex-column">

    <img src="@/assets/logo.png"
         alt=""
         class="logo">
    <h3>Iniciar sesión</h3>

    <div class="mt-4">
      <va-input type="fullName"
                placeholder="Nombre completo"
                v-model="fullName"/>

      <va-input type="email"
                class="mt-3"
                placeholder="Correo electrónico"
                v-model="email"/>

      <va-input class="mt-3"
                type="password"
                placeholder="Contraseña"
                v-model="password"/>

      <va-button class="mt-4"
                 block
                 @click="signUp">Registrarme
      </va-button>

      <va-button outline
                 block
                 class="mt-2"
                 @click="goToLogin">Ir a iniciar sesión
      </va-button>
    </div>
  </div>
</template>

<script>
import {VaButton, VaInput} from "vuestic-ui";
import {AlertService} from "@/@Core/services/Alert.service";
import {auth} from "@/firebase";
import {AuthService} from "@/@Core/services/Auth.service";
import {UserService} from "@/@User/services/User.service";

export default {
  name: "Register",
  components: {
    VaInput,
    VaButton
  },
  data() {
    return {
      fullName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    signUp() {
      if (!this.fullName) return AlertService.error('El campo de Nombre completo es obligatorio')
      if (!this.email) return AlertService.error('El campo de correo electrónico es obligatorio')
      if (!this.password) return AlertService.error('El campo contraseña es obligatorio')

      auth.createUserWithEmailAndPassword(this.email, this.password)
          .then(async userCredential => {
            await UserService.createUser({
              fullName: this.fullName,
              email: this.email
            })

            this.$router.push('/app/home')
          })
          .catch(error => {
            AlertService.error(AuthService.getMessageError(error.code))
          })
    },
    goToLogin: function () {
      this.$router.push('/auth/login')
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
