# 🇧🇷 Opina+ - PWA de Engajamento Cidadão

<div align="center">

![Opina+ Logo](https://via.placeholder.com/150x150/4BBF95/FFFFFF?text=Opina%2B)

**Conectando cidadãos às decisões públicas**

[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4.0-38bdf8.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

</div>

---

## 📱 Sobre o Opina+

**Opina+** é uma Progressive Web App (PWA) que aumenta o engajamento cidadão em debates legislativos e governamentais através de:

- ✅ **Informação oficial** e verificada
- ✅ **Acessibilidade total** (modo leitura/áudio)
- ✅ **Interface simples** para todos os públicos
- ✅ **Transparência** de dados públicos
- ✅ **Participação ativa** em consultas e votações

---

## 🎨 Design System

### Paleta de Cores

```css
--primary: #4BBF95      /* Verde institucional */
--secondary: #003F7D    /* Azul confiança */
--accent: #FFC947       /* Amarelo destaque */
--background: #FAFAFA   /* Fundo neutro */
--foreground: #2A2A2A   /* Texto principal */
```

### Tipografia

- **Fonte:** Inter (Google Fonts)
- **Pesos:** 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- **Escala:** 12px → 32px (ratio 1.25)
- **Line-height:** Mínimo 1.5 (WCAG AA/AAA)

---

## 🧭 Estrutura da Aplicação

### 1. 🚀 Onboarding (3 telas)

#### Tela 1: Boas-vindas
- Mensagem simples e acolhedora
- Botão "Começar"

#### Tela 2: Preferência de Acesso ⭐
```
Como você prefere receber as informações?

┌──────────────┐  ┌──────────────┐
│  📝 LER      │  │  🔊 OUVIR    │
│              │  │              │
│ Vou ler os   │  │ Prefiro      │
│ textos na    │  │ ouvir as     │
│ tela         │  │ informações  │
└──────────────┘  └──────────────┘
```
**Implementação:**
- Backend salva `LER` ou `OUVIR`
- Ativa/desativa botões de áudio globalmente
- Usuário pode alterar no perfil

#### Tela 3: Escolha de Interesses
- 8 chips selecionáveis (Educação, Saúde, Mobilidade, etc.)
- Mínimo 1 tema obrigatório

---

### 2. 📰 Feed Oficial (Tela Início)

**Características:**
- Apenas conteúdos institucionais verificados
- Design limpo e institucional (não é rede social)
- Sistema de relevância com 👍 Like e 👎 Deslike
- Score oculto (apenas % de aprovação exibido)

**Estrutura do Card:**
```
┌────────────────────────────────────┐
│ [Ícone] TAG DO TEMA                │
│                                    │
│ Título do Conteúdo                 │
│ Resumo simples e direto            │
│                                    │
│ ✓ Fonte Oficial • Data             │
│                                    │
│ [👍 Like] [👎 Deslike] [🔊 Ouvir]  │
│                                    │
│ 68% de aprovação da comunidade     │
│                                    │
│ [Ver detalhes] [Compartilhar]      │
└────────────────────────────────────┘
```

**Botão "🔊 Ouvir este card":**
- Aparece em TODOS os cards
- Quando clicado, usa TTS para narrar título + resumo
- Implementação: `window.speechSynthesis.speak()`

**Tipos de Cards:**
1. 📜 Atualização de PL
2. 📊 Pautas em discussão
3. 🗳️ Enquetes/consultas públicas
4. 💬 "Participe da discussão"
5. 📈 Resumos de transparência

**Compartilhamento:**
```
Compartilhar conteúdo:
┌──────────────────┐
│ 💬 WhatsApp      │
│ 📸 Instagram     │
│ 🔗 Copiar link   │
└──────────────────┘
```

---

### 3. 📚 Educação Política

**Tópicos disponíveis:**
- O que é um Projeto de Lei?
- Como participar de Audiências Públicas
- Orçamento Público Simplificado
- O papel do vereador

**Página interna:**
```
┌────────────────────────────────────┐
│ ← Voltar                           │
│                                    │
│ 📜 Título do Tópico                │
│ [⏱️ 5 min de leitura]              │
│                                    │
│ ┌────────────────────────────────┐ │
│ │ 🔊 OUVIR ESTE CONTEÚDO        │ │
│ │ (botão fixo no topo)          │ │
│ └────────────────────────────────┘ │
│                                    │
│ Conteúdo educativo em linguagem    │
│ simples, sem juridiquês...         │
│                                    │
│ ✓ Conteúdo verificado              │
└────────────────────────────────────┘
```

**Botão "🔊 Ouvir este conteúdo":**
- Sempre no topo da página
- Narra o artigo completo usando TTS
- Sticky (acompanha scroll)

---

### 4. 📊 Transparência

**3 Abas:**

#### 💰 Orçamento
- KPIs principais (Total, Executado, Mês)
- Gráfico de pizza: Distribuição por área
- Gráfico de barras: Execução mensal
- Detalhamento por secretaria

#### 🏗️ Obras
- Cards com:
  - Título e localização
  - Orçamento vs Executado
  - % de conclusão (barra de progresso)
  - Status e prazo

#### 📄 Contratos
- Cards com:
  - Título do contrato
  - Empresa contratada
  - Valor e data
  - Tipo de licitação
  - Link para documento

**Filtros:**
- Período (2024, 2023, 2022...)
- Tema (Todos, Educação, Saúde...)

---

### 5. 🤖 Chat de IA (Botão Flutuante)

**Posição:**
- Canto inferior direito
- Acima da bottom bar
- Ícone de Bot pulsante

**Popup:**
```
┌────────────────────────────────────┐
│ 🤖 Assistente Cívico  [−] [×]      │
├────────────────────────────────────┤
│                                    │
│ [Bot] Olá! Posso ajudar com...     │
│                                    │
│       Quais PLs em votação? [User] │
│                                    │
│ [Bot] Resposta detalhada...        │
│      ✨ Fontes:                    │
│      • Portal Câmara + link + data │
│      • Relatório Oficial + link    │
│                                    │
├────────────────────────────────────┤
│ [Digite sua pergunta...] [Enviar] │
│ ✨ IA com dados oficiais           │
└────────────────────────────────────┘
```

**Características:**
- Bolhas de mensagem estilo chat
- Cada resposta DEVE ter:
  - Texto da resposta
  - Fontes oficiais com links
  - Data de atualização
- Minimizável

---

### 6. 👤 Perfil

**Seções:**

#### Dados Básicos
- Avatar
- Nome (editável)
- Badge "Verificado"
- Estatísticas (Votos, Consultas, Conteúdos, Dias)

#### ⚙️ Acessibilidade (IMPLEMENTÁVEL)
```
Como você prefere receber as informações?

( ) 📝 Ler textos
    Vou ler os textos na tela

(•) 🔊 Ouvir informações
    Prefiro ouvir as informações
```

**Radio buttons (não toggle):**
- Mais acessível
- Mais claro visualmente
- Fácil de implementar no backend

**Quando "Ouvir" está ativo:**
- Banner no topo: "🔊 Modo áudio ativado"
- Botões "Ouvir" aparecem em cards e conteúdos
- Nada é lido automaticamente (apenas quando clicar)

#### Meus Interesses
- Edição de chips
- Mínimo 1 tema

#### Ações
- [Sair da conta]
- [Excluir conta]

---

## 🔊 Sistema de Áudio (Implementável)

### Como Funciona

1. **No Onboarding:**
   - Usuário escolhe LER ou OUVIR
   - Backend salva preferência: `user.audioMode = true/false`

2. **No Feed:**
   - Se `audioMode = true`: Mostra botão "🔊 Ouvir" em cada card
   - Ao clicar: `speechSynthesis.speak(titulo + resumo)`

3. **Na Educação:**
   - Botão "🔊 Ouvir este conteúdo" sempre visível no topo
   - Ao clicar: `speechSynthesis.speak(artigo completo)`

4. **Banner global:**
   - Se `audioMode = true`: Banner fixo no topo
   - "🔊 Modo áudio ativado – toque em 'Ouvir' em qualquer card"

### Implementação Web Speech API

```javascript
function speakText(text: string) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'pt-BR';
  utterance.rate = 1.0;
  utterance.pitch = 1.0;
  window.speechSynthesis.speak(utterance);
}

// Exemplo de uso:
<Button onClick={() => speakText(post.title + '. ' + post.summary)}>
  🔊 Ouvir
</Button>
```

**Alternativa (Produção):**
- Gerar áudios pré-gravados com TTS de qualidade
- Servir como arquivos .mp3
- Usar `<audio>` tag com controles

---

## 📱 Bottom Navigation

```
┌────────────────────────────────────┐
│                                    │
│         [Conteúdo da aba]          │
│                                    │
└────────────────────────────────────┘
┌────────────────────────────────────┐
│ [🏠] [📚] [📊] [👤]                │
│ Início Educação Trans. Perfil     │
└────────────────────────────────────┘
```

**Ícones grandes e claros:**
- Home (preenchido quando ativo)
- BookOpen
- BarChart3
- User

**Botão de IA flutuante:**
- Posicionado ACIMA da bottom bar
- Sempre visível
- `bottom-24` (mobile) ou `bottom-6` (desktop)

---

## 🎯 Filosofia de Design

### Princípios

1. **Simplicidade extrema**
   - Linguagem clara, sem juridiquês
   - Ícones grandes e intuitivos
   - Hierarquia visual óbvia

2. **Acessibilidade total**
   - WCAG AA/AAA compliance
   - Modo leitura/áudio
   - Contraste adequado
   - Focus states visíveis

3. **Confiança institucional**
   - Design sóbrio e profissional
   - Fontes oficiais sempre visíveis
   - Badges de verificação
   - Evitar elementos de "rede social"

4. **Inclusão digital**
   - Interface para baixa familiaridade digital
   - Textos grandes e legíveis
   - Feedback visual claro
   - Sem complexidade desnecessária

---

## 🚀 Stack Técnico

- **Framework:** React 18+ com TypeScript
- **Styling:** Tailwind CSS 4.0
- **Components:** Shadcn/ui
- **Charts:** Recharts
- **Icons:** Lucide React
- **PWA:** Service Workers + Manifest

---

## 📦 Componentes Criados

### Layout
- `App.tsx` - App principal com bottom nav
- `OpinaOnboarding.tsx` - 3 telas de onboarding

### Features
- `OpinaFeed.tsx` - Feed oficial com cards
- `OpinaEducation.tsx` - Educação política
- `OpinaTransparency.tsx` - Transparência (3 abas)
- `OpinaProfile.tsx` - Perfil com radio buttons
- `AIChatButton.tsx` - Chat IA flutuante

### UI (Shadcn)
- Button, Card, Badge, Input, Label
- Tabs, Select, Progress, Dialog
- RadioGroup, Avatar

---

## 🔒 Privacidade e Segurança

- ✅ LGPD compliant
- ✅ Dados anônimos em relatórios
- ✅ Votações anônimas
- ✅ Sem coleta de PII desnecessário
- ✅ Aviso de privacidade no perfil

---

## 🎓 Casos de Uso

### Cidadão com baixa familiaridade digital

1. Entra no app
2. Onboarding explica de forma simples
3. Escolhe "🔊 Ouvir" (modo áudio)
4. Seleciona "Saúde"
5. No feed, vê card sobre ampliação de postos
6. Clica "🔊 Ouvir" → Escuta o resumo
7. Clica "👍 Like"
8. Banner mostra: "Modo áudio ativado"

### Cidadão quer aprender sobre democracia

1. Vai na aba "Educação"
2. Clica em "O que é um Projeto de Lei?"
3. Vê artigo com linguagem simples
4. Clica "🔊 Ouvir este conteúdo"
5. Escuta enquanto faz outra atividade
6. Aprende sobre processo legislativo

### Cidadão quer fiscalizar gastos

1. Vai na aba "Transparência"
2. Seleciona ano "2024"
3. Filtra por "Saúde"
4. Vê gráficos de execução orçamentária
5. Vê obras em andamento com % de conclusão
6. Clica "Ver detalhes da obra"

---

## 📋 Checklist de Implementação Backend

### Onboarding
- [ ] Salvar preferência de áudio (`user.audioMode`)
- [ ] Salvar interesses do usuário
- [ ] Criar perfil inicial

### Feed
- [ ] API de conteúdos oficiais
- [ ] Sistema de likes/dislikes
- [ ] Ordenação por score
- [ ] Filtro por interesses

### Educação
- [ ] CMS para artigos educativos
- [ ] (Opcional) Gerar áudios TTS pré-gravados

### Transparência
- [ ] Integração com portal de transparência
- [ ] API de orçamento
- [ ] API de obras
- [ ] API de contratos

### Chat IA
- [ ] RAG com documentos oficiais
- [ ] API de perguntas/respostas
- [ ] Cache de respostas comuns

### Perfil
- [ ] CRUD de dados do usuário
- [ ] Update de preferências
- [ ] Exclusão de conta (LGPD)

---

## 🌐 PWA Features

```json
{
  "name": "Opina+",
  "short_name": "Opina+",
  "description": "Sua voz na democracia",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FAFAFA",
  "theme_color": "#4BBF95",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 📈 Próximos Passos

### Fase 1: MVP
- [x] Design system completo
- [x] Onboarding com acessibilidade
- [x] Feed com sistema de relevância
- [x] Educação com áudio
- [x] Transparência visual
- [x] Chat IA
- [x] Perfil com preferências

### Fase 2: Backend
- [ ] API REST
- [ ] Autenticação
- [ ] Banco de dados
- [ ] Integração com portais oficiais

### Fase 3: Áudio
- [ ] Web Speech API
- [ ] Áudios pré-gravados
- [ ] Player com controles

### Fase 4: PWA
- [ ] Service workers
- [ ] Modo offline
- [ ] Notificações push
- [ ] Add to home screen

---

## 🤝 Contribuindo

Este projeto visa democratizar o acesso à informação pública e fortalecer a participação cidadã. Contribuições são bem-vindas!

---

## 📄 Licença

MIT License - Veja [LICENSE](LICENSE) para mais detalhes

---

<div align="center">

**Desenvolvido com 💚 para fortalecer a democracia brasileira**

[Website](#) • [Documentação](#) • [Suporte](#)

</div>
