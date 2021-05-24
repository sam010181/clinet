<template>
  <div v-if="flower">
    <table align="center">
    <img height="500" v-if="flower.picture" :src="flower.picture">
    </table>
    <h1 align="center">{{ flower.name }}</h1>
    <p>{{ flower.description }}</p>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        flower: '',
        comments: '',
        commentText: ''
      }
    }, methods: {
      addComment() { // Add comment to the database
        if (this.commentText != '') {
          let config = {
            headers: {
              Authorization: localStorage.token,
            }
          }
          axios.put('https://alan-recipe-api.herokuapp.com/api/v1/comment/'+this.$route.params.id, {
            comment: this.commentText
          }, config).then(response => {
            alert(response.data.message)
            this.$router.go(0)
          }).catch(function(error) {
            if (error.response.status === 422) {
            alert(error.response.data.message)
            }
          })
        }
      },
      deleteComment(commentID) { // Delete comment from the database
        axios.delete('https://alan-recipe-api.herokuapp.com/api/v1/comment/'+this.$route.params.id, {
          headers: {
            Authorization: localStorage.token,
          },
          data: {
            commentID: commentID
          }
        }).then(response => {
          alert(response.data.message)
          this.$router.go(0)
        }).catch(function(error) {
          if (error.response.status === 422) {
          alert(error.response.data.message)
          }
        })
      }
    }, created() {
      // Get recipe details
      axios.get('https://samwu-flower-api.herokuapp.com/api/flower/id/'+this.$route.params.id)
      .then(response => {
        this.flower = response.data
      })
      .catch(function(error) {
        if (error.response.status === 400) {
          alert(error.response.data.message);
        }
      })
      //Get recipe comments
      axios.get('https://alan-recipe-api.herokuapp.com/api/v1/comment/'+this.$route.params.id)
      .then(response => {
        this.comments = response.data
      })
      .catch(function(error) {
        if (error.response.status === 400) {
          alert(error.response.data.message);
        }
      })
    }, computed: {
      token() {
        return localStorage.getItem('token');
      },
      userID() {
        return localStorage.getItem('userID');
      }
    }
  }
</script>
