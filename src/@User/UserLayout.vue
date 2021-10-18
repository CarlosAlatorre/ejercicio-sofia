<template>
  <Navigator/>

  <router-view/>
</template>

<script>
import Navigator from '@/@User/components/Navigator'

export default {
  name: 'Layout',
  components: {
    Navigator
  }
}
</script>

<style scoped>

</style>
