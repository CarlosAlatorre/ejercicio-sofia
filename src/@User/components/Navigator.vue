<template>
  <va-navbar color="dark"
             text-color="#cdcdcd"
             class="mb-2">
    <template #left>
      <va-navbar-item>
        <img src="@/assets/logo.png"
             class="logo"
             alt="">
      </va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item class=" ">
        <router-link class="link"
                     to="/app/Home"
                     style="color: white !important">Home
        </router-link>
      </va-navbar-item>

      <va-navbar-item>
        <router-link class="link"
                     to="/app/users"
                     style="color: white !important">Usuarios
        </router-link>
      </va-navbar-item>

      <va-navbar-item>
        <span class="link"
              @click="signout()">Cerrar sesión</span>
      </va-navbar-item>
    </template>
  </va-navbar>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {VaButton, VaIcon, VaInput, VaNavbar, VaNavbarItem} from "vuestic-ui";
import {auth} from "@/firebase";

export default defineComponent({
  name: 'Navigator',
  components: {
    VaButton,
    VaNavbar,
    VaNavbarItem,
    VaInput,
    VaIcon
  },
  methods: {
    signout() {
      auth.signOut();
      this.$router.push('/auth')
    }
  }
});
</script>

<style>
.logo {
  height: 45px
}

.link {
  color: white !important;
  text-decoration: none !important;
}
</style>
