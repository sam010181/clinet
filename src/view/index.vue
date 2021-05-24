<template>
<Search />
    <table class="flower" border = 1 border-collapse: separate>
      <tr>
        <td v-for="flower in flowers" style="width:600px">
   <Flower :flower="flower" :isFavourite="false" /> 
        </td>
   </tr>
   </table>

</template>

<script setup>
   import Search  from '../components/search.vue'
   import Flower from '../components/flower.vue'
</script>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        flowers: '',
        favourites: ''
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
      axios.get('https://samwu-flower-api.herokuapp.com/api/flower?num=3', config)
      .then(response => {
        this.flowers = response.data
      })
    }
  }
</script>
