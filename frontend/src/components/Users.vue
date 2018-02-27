<template>
    <div id="container">
        <div id="filter">
            <input placeholder="Pesquisar por nome" v-model="search.firstname" />
            <input placeholder="Pesquisar por email" v-model="search.email" />
            <select v-model="search.status">
                <option value="all">Status</option>
                <option value="1">Ativo</option>
                <option value="0">Inativo</option>
            </select>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>Telefone</th>
                    <th>CPF</th>
                    <th>Email</th>
                    <th>Data de Nascimento</th>
                    <th>Status</th>
                    <th>Ação</th>
                </tr>
            </thead>
            <tbody>
                <tr id="users-message" v-if="users.length==0">
                    <td colspan="8">Não há usuários cadastrados.</td>
                </tr>
                <tr v-for="user in users" v-if="filterRow(user)">
                    <value-text :cpf="user.cpf" :value="user.firstname"></value-text>
                    <value-text :cpf="user.cpf" :value="user.lastname"></value-text>
                    <value-text :cpf="user.cpf" :value="user.phone"></value-text>
                    <value-text :cpf="user.cpf" :value="user.cpf"></value-text>
                    <value-text :cpf="user.cpf" :value="user.email"></value-text>
                    <value-text :cpf="user.cpf" :value="user.birth_date" ></value-text>
                    <value-checkbox :cpf="user.cpf" :status="user.status" true-value="1" false-value="0"></value-checkbox>
                    <td class="action">
                        <button class="delete" v-on:click="deleteUser(user)">Deletar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

import Vue from 'vue'

Vue.component('value-text', {
    template: '<td v-on:click="openUser(cpf)">{{ value }}</td>',
    props: ['cpf', 'value'],
    methods: {
        openUser: function(cpf) {
          this.$router.push({ name: 'EditUser', params: { cpf: cpf } });
        }
    }
});

Vue.component('value-checkbox', {
    template: '<td><input type="checkbox" v-model="status" true-value="1" false-value="0" v-on:click="changeStatus(cpf, $event)"/></td>',
    props: ['cpf', 'status'],
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
        users: [],
        search: { email: '', status: 'all', firstname: '' }
    }
  },
  methods: {
      deleteUser: function(user) {
        if(!confirm('Você deseja deletar?')) { return }
          
        this.$http.delete('http://localhost:3001/user/' + user.cpf)
        .then(function(result) {
            this.users.pop(user);
        }, function(error) {
            alert(error.body.message);
        }); 
      },
      filterRow: function(user) {
          const hasFirstName = user.firstname.indexOf(this.search.firstname) >= 0;
          const hasEmail = user.email.indexOf(this.search.email) >= 0;
          const hasStatus = this.search.status == 'all' || user.status == this.search.status;
          return hasFirstName && hasEmail && hasStatus;
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

<style scoped>

#container {
    width: 90%;
    margin: 0 auto;
}

#filter {
    width: 100%;
    height: 40px;
}

#filter input { 
    margin-right: 20px;
    float: left;
    width: 200px;
    min-width: 200px;
}

#filter select {
    float: right;
}

table {
    width: 100%;
}

table thead tr th {
    background: #EA287E;
    padding: 10px 20px;
    font-size: 14px;
    color: white;
    font-weight: bold;
    text-align: center;
}

table tbody tr td {
    font-size: 14px;
    padding: 10px;
    text-align: center;
}

table tbody tr:not(:no-button):hover {
    background: #dadada;
    cursor: pointer;
}

table tbody tr:nth-child(odd) {
    background: #f1f1f1;
}

#users-message {
    text-align: center;
}

</style>