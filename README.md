## Como testar o projeto

- Clone o repo, navegue até a pasta do projeto e execute os comandos:
 1. ` docker compose run app npx prisma migrate dev --name init `
 2. ` docker compose up `

## Manualmente

- Comandos disponíveis:
1. ` npm run test ` executa todos os testes realizados.
2. ` npm run dev ` faz o build e executa o código do build.

## Rotas disponíveis
 1. ` POST /api/users/ ` Cria usuário
 2. ` GET /api/users/:id ` Busca um usuário pelo ID
 3. ` PUT /api/users/:id ` Atualiza um usuário, apenas nome e email
 4. ` PATCH /api/users/:id/password` Atualiza senha do usuário

   
Não utilizei nenhum comando usando nodemon por exemplo, pois utilizei os testes para validar o projeto, executando apenas o projeto para realizar testes finais e não durante o desenvolvimento.
