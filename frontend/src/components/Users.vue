<template>
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
            <td>{{ user.firstname }}</td>
            <td>{{ user.lastname }}</td>
            <td>{{ user.phone }}</td>
            <td>{{ user.cpf }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.birth_date }}</td>
            <td>{{ user.status }}</td>
        </tr>
    </table>
</template>
<script>
export default {
  name: 'Users',
  data () {
    return {
        users: []
    }
  },
  created: function() {
      this.$http.get('http://localhost:3001/users')
      .then(function(result) {
          this.users = result.body
      });
  }
}
</script>