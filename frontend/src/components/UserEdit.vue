<template>
    <div >
        <div v-if="message"> <span> {{ message }} </span> </div>
        <div v-if="this.showsForm">
            Nome: <input v-model="user.firstname">
            Sobrenome: <input v-model="user.lastname">
            Data de nascimento: <input v-model="user.birth_date">
            Telefone: <input v-model="user.phone">
            Email: <input v-model="user.email">
            CPF: <input v-model="user.cpf">
            Status: <input v-model="user.status">

        <button v-on:click="saveUser()">Salvar</button>
        <button v-if="this.$route.params.cpf" v-on:click="deleteUser()">Excluir</button>
        </div>
    </div>
</template>
<script>

export default {
  name: 'UserEdit',
  data () {
    return {
        user: {},
        showsForm: true,
        message: null,
    }
  },
  methods: {
      getUser: function() {
          this.$http.get('http://localhost:3001/user/' + this.$route.params.cpf)
          .then(function(result) {
              this.user = result.body;
          }, function(error) {
              this.message = error.body.message;
              this.showsForm = false;
          }); 
      },
      deleteUser: function() {
          this.$http.delete('http://localhost:3001/user/' + this.$route.params.cpf)
          .then(function(result) {
            this.openUsers();
          }, function(error) {
              this.message = error.body.message;
          }); 
      },
      updateUser: function() { 
          this.$http.put('http://localhost:3001/user/' + this.$route.params.cpf, this.user)
          .then(function(result) {
              this.openUsers();
          }, function(error) {
              this.message = error.body.message;
          }); 
      },
      createUser: function() {
          this.$http.post('http://localhost:3001/user', this.user)
          .then(function(result) {
              this.openUsers();
          }, function(error) {
              this.message = error.body.message;
          }); 
      },
      saveUser: function() {
          if(this.$route.params.cpf) {
              this.updateUser();
          } else {
              this.createUser();
          }
      },
      openUsers: function() {
          this.$router.push({name: 'Users'});
      }
  },
  created: function() {
      if(this.$route.params.cpf) {
        this.getUser();
      }
  }
}
</script>

