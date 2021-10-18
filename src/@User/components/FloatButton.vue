<template>
  <va-button class="float-button"
             icon="add"
             size="large"/>
</template>

<script>
import {VaButton} from "vuestic-ui";

export default {
  name: "FloatButton",
  components: {
    VaButton
  }
}
</script>

<style scoped>
.float-button {
  position: fixed;
  bottom: 35px;
  right: 35px;
}
</style>
