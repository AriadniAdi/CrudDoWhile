# CrudDoWhile
Teste para desenvolvedor web FulStack da empresa DoWhile


## Funcionalidades:

* Listagem de usuários.
* Pesquisa pelos campos: usuário, e-mail e status (ativo/inativo).
* Remover um usuário através da listagem, com tela de confirmação.
* Criar um usuário com obrigatoriedade de campos.
* Editar um usuário.

## Validações:
* Email único.

## Campos:

* Nome
* Sobrenome
* E-mail
* CPF
* Telefone
* Data Nascimento
* Status (Ativo/Inativo)

## Linguagem para o Back-end:

* JavaScript (NodeJS)

## Framework/Lib para o Front-end:

* Vue

## Banco de Dados:

 [MySQL](https://dev.mysql.com/downloads/mysql/)

## Execução
### Servidor Node

1. Edite o arquivo database-service para incluir seus dados de conexão.
2. No terminal abra a pasta server dentro da raiz do projeto.
3. Execute: ``node create-table.js``  para criação das tabelas e database.
4. Execute ``node server.js`` para iniciar o servidor node.
