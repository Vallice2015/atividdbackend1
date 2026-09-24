# API — Node + express
API REST em **Node.js + Express**, com **Sequelize** e banco **SQLite** (arquivo local, sem precisar instalar MySQL/Postgres).

## 1. Estrutura de pastas 

```
api-projetos/
├── package.json
├── server.js                     # ponto de entrada: sincroniza o banco e sobe o servidor
└── src/
    ├── app.js                    # configuração do Express (middlewares, rotas, 404, erros)
    ├── config/
    │   └── database.js           # instância única do Sequelize (SQLite)
    ├── models/
    │   ├── Profile.js
    │   ├── Project.js
    │   ├── Technology.js
    │   ├── Feedback.js
    │   └── index.js               # define os relacionamentos entre os modelos
    ├── dtos/
    │   ├── helpers.js
    │   ├── profile.dto.js
    │   ├── technology.dto.js
    │   ├── project.dto.js
    │   └── feedback.dto.js
    ├── controllers/
    │   ├── profile.controller.js
    │   ├── technology.controller.js
    │   ├── project.controller.js
    │   └── feedback.controller.js
    └── routes/
        ├── index.js                # agrega todas as rotas sob /api
        ├── profile.routes.js
        ├── technology.routes.js
        ├── project.routes.js
        └── feedback.routes.js
```

## 2. Como rodar

```bash
npm install
npm start
```

O servidor sobe em `http://localhost:3000`. Um arquivo `database.sqlite` é criado automaticamente na primeira execução.

## 3. Relacionamentos implementados (`src/models/index.js`)

| Relação | Tipo |
|---|---|
| `Profile` → `Project` | 1 : N (um perfil tem vários projetos) |
| `Project` ↔ `Technology` | N : N (via tabela `project_technologies`) |
| `Project` → `Feedback` | 1 : N (um projeto tem vários feedbacks) |

## 4. DTOs de validação (`src/dtos/`)

- **CreateProfileDTO**: `name` (obrigatório), `email` (obrigatório, formato válido), `bio` (opcional), `avatarUrl` (opcional)
- **CreateTechnologyDTO**: `name` (obrigatório, único)
- **CreateProjectDTO**: `title` (obrigatório), `description` (obrigatório), `profileId` (obrigatório, deve existir), `repositoryUrl` (opcional), `technologyIds` (opcional, array de ids existentes)
- **CreateFeedbackDTO**: `author` (obrigatório), `message` (obrigatório), `rating` (opcional, 1 a 5)

Toda validação retorna **400** com a lista de erros quando algum campo é inválido.

## 5. Endpoints

### Perfis
```bash
# Cadastrar perfil
curl -X POST http://localhost:3000/api/profiles \
  -H "Content-Type: application/json" \
  -d '{"name":"Maria Silva","email":"maria@email.com","bio":"Dev full-stack"}'

# Buscar perfil por id
curl http://localhost:3000/api/profiles/1
```

### Tecnologias
```bash
# Cadastrar tecnologia
curl -X POST http://localhost:3000/api/technologies \
  -H "Content-Type: application/json" \
  -d '{"name":"Node.js"}'

# Listar tecnologias
curl http://localhost:3000/api/technologies
```

### Projetos
```bash
# Cadastrar projeto (associando tecnologias já existentes, ex: ids 1 e 2)
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{"title":"Sistema de Vendas","description":"API para gestão de vendas","profileId":1,"technologyIds":[1,2]}'

# Listar projetos
curl http://localhost:3000/api/projects

# Buscar projeto por id
curl http://localhost:3000/api/projects/1
```

### Feedbacks (bônus, usando a relação Project 1:N Feedback)
```bash
# Cadastrar feedback em um projeto
curl -X POST http://localhost:3000/api/projects/1/feedbacks \
  -H "Content-Type: application/json" \
  -d '{"author":"João","message":"Ótimo projeto!","rating":5}'

# Listar feedbacks de um projeto
curl http://localhost:3000/api/projects/1/feedbacks
```

## 6. Ordem recomendada de testes

1. `POST /api/profiles` → guarde o `id` retornado.
2. `POST /api/technologies` (uma ou mais vezes) → guarde os `id`s retornados.
3. `POST /api/projects` usando o `profileId` e (opcionalmente) `technologyIds` do passo 1 e 2.
4. `GET /api/projects` e `GET /api/profiles/:id` para ver os dados relacionados aninhados.
5. `POST /api/projects/:id/feedbacks` para testar a relação 1:N com Feedback.

## 7. Códigos de resposta

- `201` — recurso criado com sucesso
- `200` — consulta realizada com sucesso
- `400` — erro de validação (DTO inválido)
- `404` — recurso não encontrado (perfil, projeto ou tecnologia inexistente)
- `409` — conflito (e-mail de perfil ou nome de tecnologia já cadastrados)
- `500` — erro interno do servidor
______________________________________________________
## http://localhost:3000/api/profiles/1
POST
{
  "name": "Nome",
  "bio": "Desenvolvedor Fullstack"
}
_________________________________________________________
## http://localhost:3000/api/technologies
POST 
{
  "name": "Node.js"
}
________________________________________________________
## http://localhost:3000/api/projects
POST
{
  "title": "Sistema de Feedback",
  "description": "Projeto para gerenciar feedbacks",
  "technologies": ["Node.js", "React"]
}

## http://localhost:3000/api/projects/1
GET Resultado esperado: Lista todos os projetos.


___________________________________________________

## http://localhost:3000/api/projects/1/feedbacks
{
  "author": "Maria",
  "message": "Ótimo projeto!",
  "rating": 5
}
_________________________________________________________
## http://localhost:3000/api/projects/1/feedbacks
