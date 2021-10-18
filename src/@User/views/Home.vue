<template>
  <div class="container">
    <div class="d-flex flex-row search mt-5">
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

    <ResultList title="Canciones"
                v-bind:results="tracks"/>

    <ResultList title="Albumes"
                v-bind:results="albums"/>

    <ResultList title="Artistas"
                v-bind:results="artists"/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {VaButton, VaIcon, VaInput} from "vuestic-ui";
import ResultList from "@/@User/views/ResultList.vue";
import axios from "axios";

export default defineComponent({
  name: 'Home',
  components: {
    ResultList,
    VaInput,
    VaIcon,
    VaButton
  },
  data() {
    return {
      tracks: [],
      albums: [],
      artists: [],
      title: ''
    }
  },
  methods: {
    search: function () {
      axios.post(`https://ws.audioscrobbler.com/2.0/?method=track.search&track=${this.title}&api_key=7902c2cf60dde5b7e6d433ac7a35c6b3&format=json`)
          .then((resp: any) => {
            this.tracks = resp.data.results.trackmatches.track.slice(0, 5)
          })

      axios.post(`http://ws.audioscrobbler.com/2.0/?method=album.search&album=${this.title}&api_key=7902c2cf60dde5b7e6d433ac7a35c6b3&format=json`)
          .then((resp: any) => {
            this.albums = resp.data.results.albummatches.album.slice(0, 5)
          })

      axios.post(`http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${this.title}&api_key=7902c2cf60dde5b7e6d433ac7a35c6b3&format=json`)
          .then((resp: any) => {
            this.artists = resp.data.results.artistmatches.artist.slice(0, 5)
          })
    }
  },
  created() {
    this.search()
  }
});
</script>

<style scoped>
.search {

}
</style>
