<template>
  <h2 style="text-align: center;">Search: {{ name }}</h2>
  <div v-for="flower in flowers">
    <Flower :flower="flower" :isFavourite="false" />
  </div>
</template>

<script setup>
  import Flower from '../components/flower.vue'
</script>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        flowers: '',
        name: this.$route.params.name
      }
    }, created() {
      let config;
      // Add header if user is logged in
      if (localStorage.token) {
        config = {
          headers: {
            Authorization: localStorage.token,
          }
        }
      }
      // Search recipes from API
      axios.get('https://samwu-flower-api.herokuapp.com/api/flower/name/'+this.name, config)
      .then(response => {
        this.flowers = response.data
      })
      .catch(function(error) {
        if (error.response.status === 401) {
          alert(error.response.data.message)
          this.$router.push('/logout')
        }
      })
    }
  }
</script>