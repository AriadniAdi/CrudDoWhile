<template>
    <div>
        <form>
            <div class="title">
                <span>Cadastro de Usuário</span>
            </div>
            <div class="separator"></div>
            <div id="container">
                <div class="field-row">
                    <div class="field-box">
                        <span>NOME</span>
                        <input v-model="user.firstname" placeholder="Nome">
                        <div class="field-error">
                            <span v-if="errors.firstname">* campo obrigatório</span>
                        </div>
                    </div>
                </div>
                <div class="field-row">
                    <div class="field-box">
                        <span>SOBRENOME</span>
                        <input v-model="user.lastname" placeholder="Sobrenome">
                        <div class="field-error"> 
                            <span v-if="errors.lastname">* campo obrigatório</span>
                        </div>
                    </div>
                </div>
                <div class="field-row">
                    <div class="field-box">
                        <span>EMAIL</span>
                        <input v-model="user.email" placeholder="Email">
                        <div class="field-error"> 
                            <span v-if="errors.email">* campo obrigatório</span>
                        </div>
                    </div>
                </div>
                <div class="field-row">
                    <div class="field-box">
                        <span>CPF</span>
                         <input v-model="user.cpf" placeholder="CPF">
                         <div class="field-error">
                            <span v-if="errors.cpf">* campo obrigatório</span>
                        </div>
                    </div>
                    <div class="field-box field-box-right">
                        <span>TELEFONE</span>
                        <input v-model="user.phone" placeholder="Telefone">
                        <div class="field-error">
                            <span v-if="errors.phone">* campo obrigatório</span>
                        </div>
                    </div>
                </div>
                <div class="field-row">
                    <div class="field-box" id="field-box-datebirth">
                        <span>DATA DE NASCIMENTO</span>
                        <input v-model="user.birth_date" placeholder="Data de nascimento">
                        <div class="field-error">
                            <span v-if="errors.birth_date">* campo obrigatório</span>
                        </div>
                    </div>
                    <div class="field-box field-box-right" id="field-status" v-if="this.$route.params.cpf">
                        <span>STATUS</span>
                        <input type="checkbox" v-model="user.status" true-value="1" false-value="0">
                    </div>
                </div>
                <div id="actions">
                    <button v-on:click="saveUser()" id="save">Salvar</button>
                    <button v-if="this.$route.params.cpf" v-on:click="deleteUser()" class="delete">Excluir</button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>

export default {
  name: 'User',
  data () {
    return {
        user: {},
        errors: {},
    }
  },
  methods: {
      getUser: function() {
          this.$http.get('http://localhost:3001/user/' + this.$route.params.cpf)
          .then(function(result) {
              this.user = result.body;
          }, function(error) {
              alert(error.body.message);
              this.openUsers();
          }); 
      },
      deleteUser: function() {
          if(!confirm('Você deseja deletar?')) { return }
          
          this.$http.delete('http://localhost:3001/user/' + this.$route.params.cpf)
          .then(function(result) {
            this.openUsers();
          }, function(error) {
              alert(error.body.message);
          }); 
      },
      updateUser: function() {
          this.$http.put('http://localhost:3001/user/' + this.$route.params.cpf, this.user)
          .then(function(result) {
              this.openUsers();
          }, function(error) {
              alert(error.body.message);
          }); 
      },
      createUser: function() {
          this.user.status = 1;
          this.$http.post('http://localhost:3001/user', this.user)
          .then(function(result) {
              this.openUsers();
          }, function(error) {
              alert(error.body.message);
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
          this.errors = {};
          const message = 'Campo obrigatório';

          if(!this.user.firstname) {
              this.errors.firstname = message;
          }
          if(!this.user.lastname) {
              this.errors.lastname = message;
          }
          if(!this.user.birth_date) {
              this.errors.birth_date = message;
          }
          if(!this.user.phone) {
              this.errors.phone = message;
          }
          if(!this.user.email) {
              this.errors.email = message;
          }
          if(!this.user.cpf) {
              this.errors.cpf = message;
          }
          return Object.keys(this.errors).length == 0;
      }
  },
  created: function() {
      if(this.$route.params.cpf) {
        this.getUser();
      }
  }
}
</script>

<style scoped>

.field-box {
    display: inline-block;
    width: 100%;
    margin-bottom: 0px;
}

#field-status input {
    width: 20px;
    margin: 0 auto;
}

#field-status span {
    text-align: center;
}

.field-box input {
    height: 30px;
    display: block;
    width: 100%;
    box-sizing: border-box;
}

.field-box span {
    font-size: 12px;
    display: block;
    width: 100%;
}

.field-row > div:not(:only-child) {
    width: 30%;
    min-width: 150px;
}

#field-box-datebirth {
    width: 30%;
    min-width: 150px;
}

.field-row > div:not(:only-child):last-child {
    float: right;
}

.field-error {
    height: 20px;
}

.field-error span {
    font-size: 12px;
    color: red;
    display: inline;
}

form {
    width: 60%;
    margin: 0 auto;
}

form > div {
    min-width: 400px;
    width: 100%;
    
}

form .title {
    background: #fbfbfb;
    padding: 10px 0px;
    font-size: 20px;
    text-align: center;
}
.separator {
    height: 2px;
    background: #EA287E;
}

#container {
    background: #fdfdfd;
    border-width: 1px;
    border-color: #efefef;
    border-style: solid;
    padding: 20px;
    box-sizing: border-box;
    text-align: left;
}

#container button {
    width: 45%;
    display: inline-block;
    height: 34px;
    margin-top: 10px;
}

#container button:hover {
    cursor: pointer;
}

#save {
    background-color: #51b156;
}

#actions > button:not(:only-child):last-child {
    float: right;
}
</style>
