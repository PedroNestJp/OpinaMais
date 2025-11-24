# Opina+ (Frontend)

Interface React/Vite para o projeto Opina+. Este README cobre setup, variáveis de ambiente, comandos e integrações já implementadas com o backend.

## Requisitos
- Node 18+ (recomendado: 20+)
- NPM (ou pnpm/yarn, ajuste os comandos conforme o gerenciador)

## Instalação
```bash
cd frontend/Opina+
npm install
```

## Variáveis de ambiente
Crie um `.env` na raiz de `frontend/Opina+` com base no `.env.example`:
```
VITE_API_BASE_URL=http://localhost:8080/api/v1
```
Pontos importantes:
- `VITE_API_BASE_URL` deve apontar para o backend Laravel (porta 8080 se usando docker-compose do backend).
- O backend deve ter `FRONTEND_URL` configurado (ex.: `http://localhost:3000`) para liberar CORS.

## Comandos
- `npm run dev` – inicia o Vite na porta 3000.
- `npm run build` – build de produção.

## Integrações com o backend
- **Autenticação**: login/cadastro/logout usando token JWT/Sanctum; token e usuário são persistidos em localStorage.
- **Categorias**: lista categorias (`/categories`), segue/dessegue (`/categories/follow`), carrega posts de categorias seguidas (`/categories/followed/posts`).
- **Posts**: carrega posts por categoria (`/posts/category/:id`); posts retornados exibem áudio via `audioUrl` quando disponível.
- **Enquetes (Polls)**: lista enquetes (`/polls`) e vota (`/polls/{id}/vote`) com token.
- **Artigos**: endpoint `/articles/all` disponível (requer auth).
- **Chat**: OpinAI integrado a `/chat/create` e `/chat/send-message` (requer login).

## Áudio e acessibilidade
- Se a API retorna `audioUrl`, o player usa o arquivo. Caso contrário, há fallback para síntese de voz (`SpeechSynthesisUtterance`) configurada para `pt-BR` e tentando voz feminina.
- Banner e preferências de áudio no app para alternar leitura/escuta.

## Notas de uso
- Garanta que o backend esteja rodando e com CORS liberado para `http://localhost:3000`.
- Ao seguir categorias e votar em enquetes, é necessário estar autenticado.
- Para o chat, o token é obrigatório; sem login o input fica desabilitado.

## Estrutura rápida
- `src/App.tsx` – fluxo de telas (welcome, login/signup, onboarding, feed, profile, dashboard).
- `src/components/opina/*` – componentes principais do app (feed, perfil, onboarding, chat, etc.).
- `src/lib/api.ts` – cliente HTTP com base configurável e helpers de token/usuário.
