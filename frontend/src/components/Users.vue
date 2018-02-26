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
                <value-text :cpf="user.cpf" :value="user.firstname"></value-text>
                <value-text :cpf="user.cpf" :value="user.lastname"></value-text>
                <value-text :cpf="user.cpf" :value="user.phone"></value-text>
                <value-text :cpf="user.cpf" :value="user.cpf"></value-text>
                <value-text :cpf="user.cpf" :value="user.email"></value-text>
                <value-text :cpf="user.cpf" :value="user.birth_date"></value-text>
                <value-checkbox :cpf="user.cpf" :status="user.status" true-value="1" false-value="0"></value-checkbox>
                <td><button v-on:click="deleteUser()">Deletar</button></td>
            </tr>
        </table>
    </div>
</template>
<script>

import Vue from 'vue'

Vue.component('value-text', {
    template: '<td v-on:click="openUser(cpf)">{{ value }}</td>',
    props: ["cpf", "value"],
    methods: {
        openUser: function(cpf) {
          this.$router.push({ name: 'EditUser', params: { cpf: cpf } })
        }
    }
});

Vue.component('value-checkbox', {
    template: '<td><input type="checkbox" v-model="status" true-value="1" false-value="0" v-on:click="changeStatus(cpf, $event)"/></td>',
    props: ["cpf", "status"],
    methods: {
        changeStatus: function(cpf, event) {
            const status = event.target.checked ? 1: 0;
            this.$http.put('http://localhost:3001/user/' + cpf + '/' + status)
            .then(function(result) {
                
            }, function(error) {
                this.requestError = error.body.message;
            }); 
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