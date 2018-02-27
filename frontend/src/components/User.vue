<template>
    <div>
        <header>
        <nav>
            <ul> Você está em: 
                <router-link to="Users">Usuários</router-link>
                <router-link to="User"> > Usuário</router-link>
            </ul>
        </nav>
        </header>
        <div v-if="requestError"> <span> {{ requestError }} </span> </div>
        <form v-if="this.showsForm">
            <p v-if="formErrors.length">
                <ul>
                    <li v-for="error in formErrors">
                        {{ error }}
                    </li>
                </ul>
            </p>
            <div id="register">
                <div class="field-row">
                    <div class="field-box">
                        <span>NOME</span>
                    </div>
                <input v-model="user.firstname" placeholder="Nome" >
                </div>
                <div class="field-row">
                    <div class="field-box">
                        <span>SOBRENOME</span>
                    </div>
                <input v-model="user.lastname" placeholder="Sobrenome">
                </div>
                <div class="field-row">
                    <div class="field-box">
                        <span>EMAIL</span>
                    </div>
                <input v-model="user.email" placeholder="Email">
                </div>

                <div class="field-row">
                    <div class="field-box">
                        <span>DATA DE NASCIMENTO</span>
                    </div>
                <input v-model="user.birth_date" placeholder="Data de nascimento">
                    <div class="field-box">
                        <span>TELEFONE</span>
                    </div>
                <input v-model="user.phone" placeholder="Telefone">
                </div>
                <div class="field-row">
                    <div class="field-box">
                        <span>CPF</span>
                    </div>
                <input v-model="user.cpf" placeholder="CPF">
                </div>
                <div class="field-row">
                    <div class="field-box">
                        <span>STATUS</span>
                </div>
            <input type="checkbox" v-model="user.status" true-value="1" false-value="0">
            </div>
            </div>
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