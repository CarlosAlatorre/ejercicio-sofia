<template>
  <va-modal size="small"
            v-model="isVisible"
            cancel-text="Cerrar"
            ok-text="Guardar"
            hide-default-actions
            no-esc-dismiss
            no-dismiss
            no-outside-dismiss>
    <template #header>
      <h4 class="mb-4">Usuario</h4>
    </template>

    <template #default>
      <span class="text-muted">Nombre completo:</span>
      <va-input v-model="fullName"
                type="text"
                class="mb-4"
                placeholder="Nombre completo"/>

      <span class="text-muted">Correo electrónico:</span>
      <va-input v-model="email"
                type="email"
                class="mb-4"
                placeholder="Correo electrónico"/>

      <span class="text-muted">Contraseña:</span>
      <va-input v-model="password"
                type="password"
                placeholder="Contraseña"/>
    </template>

    <template #footer>
      <va-button color="danger"
                 @click="close">
        Cerrar
      </va-button>
      <va-button class="ml-2"
                 @click="submit">
        Guardar
      </va-button>
    </template>
  </va-modal>
</template>

<script>
import {VaButton, VaInput, VaModal} from "vuestic-ui";
import {UserService} from "@/@User/services/User.service";
import {AlertService} from "@/@Core/services/Alert.service";

export default {
  name: "UserModal",
  props: {
    isVisible: Boolean
  },
  data() {
    return {
      fullName: '',
      email: '',
      password: ''
    }
  },
  components: {
    VaModal,
    VaInput,
    VaButton
  },
  methods: {
    submit: async function () {
      await UserService.createUser({
        fullName: this.fullName,
        email: this.email
      })

      AlertService.success('Se ha creado el usuario exitosamente')
      this.close()
    },
    close: function () {
      this.$emit('close')
    }
  }
}
</script>

<style scoped>

</style>
