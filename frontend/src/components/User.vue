<template>
    <div >
        <div v-if="requestError"> <span> {{ requestError }} </span> </div>
        <form v-if="this.showsForm">
            <p v-if="formErrors.length">
                <ul>
                    <li v-for="error in formErrors">
                        {{ error }}
                    </li>
                </ul>
            </p>
            Nome: <input v-model="user.firstname" placeholder="Nome" >
            Sobrenome: <input v-model="user.lastname" placeholder="Sobrenome">
            Data de nascimento: <input v-model="user.birth_date" placeholder="Data de nascimento">
            Telefone: <input v-model="user.phone" placeholder="Telefone">
            Email: <input v-model="user.email" placeholder="Email">
            CPF: <input v-model="user.cpf" placeholder="CPF">
            Status: <input type="checkbox" v-model="user.status" true-value="1" false-value="0">

        <button v-on:click="saveUser()">Salvar</button>
        <button v-if="this.$route.params.cpf" v-on:click="deleteUser()">Excluir</button>
        </form>
    </div>
</template>
<script>

export default {
  name: 'User',
  data () {
    return {
        user: {},
        showsForm: true,
        requestError: null,
        formErrors: []
    }
  },
  methods: {
      getUser: function() {
          this.$http.get('http://localhost:3001/user/' + this.$route.params.cpf)
          .then(function(result) {
              this.user = result.body;
          }, function(error) {
              this.requestError = error.body.message;
              this.showsForm = false;
          }); 
      },
      deleteUser: function() {
          if(!confirm('Você deseja deletar?')) { return }
          
          this.$http.delete('http://localhost:3001/user/' + this.$route.params.cpf)
          .then(function(result) {
            this.openUsers();
          }, function(error) {
              this.requestError = error.body.message;
          }); 
      },
      updateUser: function() {
          this.$http.put('http://localhost:3001/user/' + this.$route.params.cpf, this.user)
          .then(function(result) {
              this.openUsers();
          }, function(error) {
              this.requestError = error.body.message;
          }); 
      },
      createUser: function() {
          this.$http.post('http://localhost:3001/user', this.user)
          .then(function(result) {
              this.openUsers();
          }, function(error) {
              this.requestError = error.body.message;
          }); 
      },
      saveUser: function() {
          if(this.validateForm()) {
            if(this.$route.params.cpf) {
                this.updateUser();
            } else {
                this.createUser();
            }
          }
      },
      openUsers: function() {
          this.$router.push({name: 'Users'});
      },
      validateForm: function() {
          this.formErrors = [];
          if(!this.user.firstname) {
              this.formErrors.push('Campo nome obrigatório');
          }
          if(!this.user.lastname) {
              this.formErrors.push('Campo sobrenome obrigatório');
          }
          if(!this.user.birth_date) {
              this.formErrors.push('Campo data de nascimento obrigatório');
          }
          if(!this.user.phone) {
              this.formErrors.push('Campo telefone obrigatório');
          }
          if(!this.user.email) {
              this.formErrors.push('Campo email obrigatório');
          }
          if(!this.user.cpf) {
              this.formErrors.push('Campo cpf obrigatório');
          }
          return this.formErrors.length == 0
      }
  },
  created: function() {
      if(this.$route.params.cpf) {
        this.getUser();
      }
  }
}
</script>

