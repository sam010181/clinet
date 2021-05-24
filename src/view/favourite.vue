<template>
  <h2 style="text-align: center;">Favourites</h2>
  <table border = 1 >
      <tr>
          <td v-for="flower in flowers">
    <Flower :flower="flower" :isFavourite="true" />
  </td>
  </tr>
  </table>
</template>

<script setup>
  import Flower from '../components/flower.vue'
</script>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        flowers: ''
      }
    }, created() {
      let config = {
        headers: {
          Authorization: localStorage.token,
        }
      }
      // Get user's favorite
      axios.get('https://samwu-flower-api.herokuapp.com/api/favourite', config)
      .then(response => {
        this.flowers = response.data
      })
      .catch(function(error) {
        console.log(error)
      })
    }
  }
</script>