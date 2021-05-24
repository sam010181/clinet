<template>
  <form class="submitForm" @submit.prevent="login">
    <table align="center">
    <h2>Login</h2>
    <input type="text" v-model="username" placeholder="Username" required>
    <br />
    <input type="password" v-model="password" placeholder="Password" required>
    <br>
    <button type="submit">Login</button>
    </table>
  </form>
</template>

<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        username: '',
        password: ''
      }
    }, methods: {
      login() {
        // login account
        axios.post('https://samwu-flower-api.herokuapp.com/api/login', {
          username: this.username,
          password: this.password
        }).then(response => {
          localStorage.setItem('usename', response.data.username)
          localStorage.setItem('token', 'Bearer '+response.data.token)
          this.$router.go('/')
        }).catch(function(error) {
          if (error.response.status === 422) {
            alert(error.response.data.message)
          }
        })
      }
    }, created() {
      if (localStorage.token) {
        this.$router.push('/')
      }
    }
  }
</script>