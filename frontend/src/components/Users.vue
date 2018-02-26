<template>
    <div>
        <button v-on:click="register()">Cadastre-se</button>
        <table>
            <tr>
                <th>Nome</th>
                <th>Sobrenome</th>
                <th>Telefone</th>
                <th>CPF</th>
                <th>Email</th>
                <th>Data de Nascimento</th>
                <th>Status</th>
            </tr>
            <tr v-for="user in users">
                <value-row :cpf="user.cpf" :value="user.firstname"></value-row>
                <value-row :cpf="user.cpf" :value="user.lastname"></value-row>
                <value-row :cpf="user.cpf" :value="user.phone"></value-row>
                <value-row :cpf="user.cpf" :value="user.cpf"></value-row>
                <value-row :cpf="user.cpf" :value="user.email"></value-row>
                <value-row :cpf="user.cpf" :value="user.birth_date"></value-row>
                <value-row :cpf="user.cpf" :value="user.status"></value-row>
                <td><button v-on:click="deleteUser()">Deletar</button></td>
            </tr>
        </table>
    </div>
</template>
<script>

import Vue from 'vue'

Vue.component('value-row', {
    template: '<td v-on:click="openUser(cpf)">{{ value }}</td>',
    props: ["cpf", "value"],
    methods: {
        openUser: function(cpf) {
          this.$router.push({ name: 'EditUser', params: { cpf: cpf } })
        }
    }
});

export default {
  name: 'Users',
  data () {
    return {
        users: []
    }
  },
  methods: {
      register: function() {
          this.$router.push({ name: 'CreateUser' })
      },
      deleteUser: function() {
        if(!confirm('Você deseja deletar?')) { return }
          
        this.$http.delete('http://localhost:3001/user/' + this.$route.params.cpf)
        .then(function(result) {

        }, function(error) {
            this.requestError = error.body.message;
        }); 
      }
  },
  created: function() {
      this.$http.get('http://localhost:3001/users')
      .then(function(result) {
          this.users = result.body;
      });
  }
}
</script>