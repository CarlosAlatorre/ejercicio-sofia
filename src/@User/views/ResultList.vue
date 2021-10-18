<template>
  <h2 class="mt-4">{{ title }}</h2>
  <div class="d-flex flex-column mb-4" v-if="results.length > 0">

    <div class="va-table-responsive container">
      <table class="va-table w-100">
        <thead>
        <tr>
          <th>Nombre</th>
          <th v-if="!!results[0].artist">Artista</th>
          <th v-if="!!results[0].listeners">Reproducciones</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="item in results">
          <td>
            <div class="d-flex flex-row">
              <img v-bind:src="item.image[0]['#text']"
                   alt="">
              <p class="ml-2">{{ item.name }}</p>
            </div>
          </td>
          <td v-if="!!results[0].artist">
            <p>{{ item?.artist }}
            </p></td>
          <td v-if="!!results[0].listeners">
            <p>{{ item.listeners }}</p>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>

  <h4 v-if="results.length == 0" class="text-muted mt-3">No se encontraron resultados</h4>
</template>
<script lang="ts">
export default {
  name: 'ResultList',
  props: {
    title: '',
    results: []
  }
}
</script>
