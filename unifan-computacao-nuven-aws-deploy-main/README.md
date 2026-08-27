# Backend - API REST (Node.js + Express)

CRUD simples de `usuarios` + upload de imagens para o S3, conectado a um MySQL no RDS.

## Rodando localmente

```bash
npm install
cp .env.example .env   # preencha com seus dados de RDS/S3
npm run dev
```

A API sobe em `http://localhost:3000`.

## Rotas

| Método | Rota          | Descrição                          |
|--------|---------------|--------------------------------------|
| GET    | `/`           | Health check                         |
| GET    | `/usuarios`   | Lista todos os usuários              |
| GET    | `/usuarios/:id` | Busca um usuário pelo id           |
| POST   | `/usuarios`   | Cria um usuário (`nome`, `email`, `foto_url`) |
| PUT    | `/usuarios/:id` | Atualiza um usuário                |
| DELETE | `/usuarios/:id` | Remove um usuário                  |
| POST   | `/upload`     | Upload de imagem (form-data, campo `imagem`) → retorna a URL pública no S3 |

## Banco de dados

Execute `src/db/schema.sql` no seu MySQL (RDS) antes de usar a API.

## Docker

```bash
docker build -t api-backend .
docker run -p 3000:3000 --env-file .env api-backend
```

## Deploy

O pipeline em `.github/workflows/deploy-backend.yml` builda a imagem, publica no ECR
com tag semântica e faz o deploy via SSH em uma instância EC2. Veja o `README.md`
na raiz do projeto para o passo a passo completo.
