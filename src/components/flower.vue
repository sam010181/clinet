<template>
          <a :href="'/Flower-client/detail/'+flower._id">
          <h1>{{ flower.name }}</h1></a>
          <img width="400" height="300" v-if="flower.picture" :src="flower.picture">
          <button v-if="login" @click="handleFavourite(flower._id)">{{ favourite? 'remove from favourites':'favourites' }}</button>
</template>

<script setup>
  import { defineProps } from 'vue'
  defineProps({
    flower: JSON,
    isFavourite: Boolean
  })
</script>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        login: false,
        favourite: false
      }
    }, methods: {
      handleFavourite(flowerID) { 
        if (this.favourite) {
          this.deleteFavourite(flowerID)
        } else {
          this.addFavourite(flowerID)
        }
      },
      addFavourite(flowerID) { // Add the recipe to favorites
        axios.put('https://samwu-flower-api.herokuapp.com/api/favourite/'+flowerID, {}, {
          headers: {
            Authorization: localStorage.token,
          }
        }).then(response => {
          alert(response.data.message)
          this.favourite = true
        }).catch(function(error) {
          if (error.response.status === 400) {
            alert(error.response.data.message)
          }
        })
      },
      deleteFavourite(flowerID) { // Remove the recipe from favorites
        axios.delete('https://samwu-flower-api.herokuapp.com/api/favourite/'+flowerID, {
          headers: {
            Authorization: localStorage.token,
          }
        }).then(response => {
          alert(response.data.message)
          this.favourite = false
        })
      }
    }, created() {
      
      if (localStorage.token) {
        this.login = true
      }
      
      if (this.isFavourite) {
        this.favourite = true
      } else {
        this.favourite = this.flower.isFavourite
      }
    }
  }
</script>