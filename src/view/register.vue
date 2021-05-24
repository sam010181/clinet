<template>
  <form class="submitForm" @submit.prevent="register">
    <table align="center">
    <h2>Register</h2>
    <input type="text" v-model="username" placeholder="Username" required />
    <br />
    <input type="password" v-model="password" placeholder="Password" required />
    <br />
    <input type="password" v-model="rPassword" placeholder="Repeat password" required />
    <br />
    <button type="submit">Register</button>
    </table>
  </form>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        username: '',
        password: '',
        rPassword: ''
      }
    }, methods: {
      register() {
        if (this.password != this.rPassword) {
          alert('The password does not match the repeated password')
        } else {
          // Register account
          axios.post('https://samwu-flower-api.herokuapp.com/api/register', {
            username: this.username,
            password: this.password
          }).then(response => {
            alert(response.data.message)
            // Redirect to login page
            this.$router.push('/login')
          }).catch(function(error) {
            if (error.response.status === 422) {
              alert(error.response.data.message)
            }
          })
        }
      }
    }
  }
</script>