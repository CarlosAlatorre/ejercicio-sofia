<template>
  <div class="d-flex flex-row search mt-5 container mb-4">
    <va-input placeholder="Buscar..."
              v-model="title"
              v-on:keypress.enter="search">
      <template #prepend>
        <va-icon name="search"
                 color="#000"
        />
      </template>
    </va-input>
    <va-button @click="search">Buscar</va-button>
  </div>

  <div class="va-table-responsive container">
    <table class="va-table w-100">
      <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in filteredUsers"
          :key="user.id">
        <td>{{ user.fullName }}</td>
        <td>{{ user.email }}</td>
        <td>
          <va-icon name="delete"
                   color="danger"
                   class="cursor-pointer"
                   @click="deleteUser(user.key)"></va-icon>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <UserModal v-bind:isVisible="isVisibleUserModal"
             v-on:close="closeUserModal"/>

  <FloatButton @click="openUserModal"/>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {VaButton, VaIcon, VaInput} from "vuestic-ui";
import FloatButton from "@/@User/components/FloatButton.vue"
import UserModal from "@/@User/components/UserModal.vue"
import {UserService} from "@/@User/services/User.service";
import {AlertService} from "@/@Core/services/Alert.service";

export default defineComponent({
  name: 'Users',
  components: {
    VaButton,
    VaIcon,
    FloatButton,
    VaInput,
    UserModal
  },
  data() {
    return {
      users: [],
      filteredUsers: [],
      isVisibleUserModal: false,
      title: ''
    }
  },
  methods: {
    loadUsers: async function () {
      this.users = await UserService.getAll();
      this.filteredUsers = [...this.users]
    },
    openUserModal: function () {
      this.isVisibleUserModal = !this.isVisibleUserModal;
    },
    closeUserModal: function () {
      this.isVisibleUserModal = false;
      this.loadUsers();
    },
    deleteUser: async function (userKey: string) {
      if (await AlertService.confirm('¿Estás seguro que deseas eliminar este usuario?')) {
        await UserService.delete(userKey)

        AlertService.success('Se ha eliminado correctamente')
        this.loadUsers()
      }
    },
    search: function () {
      this.filteredUsers = this.users.filter(item => {
        const last = Object.keys(item)[Object.keys(item).length - 1];

        for (const itemProperty in item) {
          if (item[itemProperty] != null) {
            let index = item[itemProperty].toString().toLowerCase().indexOf(this.title.toString().toLowerCase());
            if (index >= 0) {
              return true;
            }
            if (last === itemProperty && index === -1) {
              return false;
            }
          }
        }
      })
    }
  },
  created() {
    this.loadUsers();
  }
});
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer !important;
}

.va-table-responsive {
  overflow: auto;
}
</style>
