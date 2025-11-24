# Opina+ - Documentação Completa

## 📱 Visão Geral

**Opina+** é uma PWA (Progressive Web App) para aumentar o engajamento cidadão em debates legislativos e governamentais, ampliando transparência, participação e compreensão pública sobre leis, pautas e decisões.

### Princípios Fundamentais
- ✅ 100% conteúdo institucional oficial
- ✅ Neutralidade política total
- ✅ Acessibilidade (WCAG AA/AAA)
- ✅ Transparência de dados
- ✅ LGPD compliant
- ✅ Inclusão digital

---

## 🎨 Design System

### Paleta de Cores
```css
--primary-green: #4BBF95    /* Verde institucional */
--secondary-blue: #003F7D   /* Azul confiança */
--accent-yellow: #FFC947    /* Amarelo destaque */
--background: #FAFAFA       /* Fundo neutro */
--foreground: #2A2A2A       /* Texto principal */
```

### Tipografia - Inter Font System
- **Família**: Inter (400, 500, 600, 700)
- **Escala**: 12px → 32px (Major Third ratio 1.25)
- **Line-height**: Mínimo 1.5 para body (WCAG)
- **Hierarquia completa**: H1-H6, body, labels, buttons, inputs, microtexts

#### Tamanhos
- H1: 32px (2rem) - Bold
- H2: 30px (1.875rem) - Bold
- H3: 24px (1.5rem) - Semibold
- H4: 20px (1.25rem) - Semibold
- Body: 16px (1rem) - Regular
- Small: 14px (0.875rem) - Regular
- Micro: 12px (0.75rem) - Regular

---

## 🧭 Estrutura da Aplicação

### 1. Onboarding (`/components/opina/OpinaOnboarding.tsx`)

**Etapa 1: Boas-vindas**
- Explicação simples do app
- Escolha de preferência: **Ler** ou **Ouvir** (acessibilidade)
- CTA: "Continuar"

**Etapa 2: Seleção de Interesses**
- 8 chips selecionáveis:
  - 📚 Educação
  - 🚗 Mobilidade
  - 🏥 Saúde
  - 🛡️ Segurança
  - 🏗️ Obras
  - 🌳 Meio Ambiente
  - 🎭 Cultura
  - 🤝 Social
- CTA: "Confirmar"

---

### 2. Feed Oficial (`/components/opina/OpinaFeed.tsx`)

**Características**:
- Design institucional (não é rede social)
- Apenas conteúdos oficiais verificados
- Sistema de relevância com 👍👎
- Score define ordem (não exibe número)

**Tipos de Cards**:
1. **Projeto de Lei** - PLs em tramitação
2. **Em Pauta** - Discussões em andamento
3. **Consulta Pública** - Votações abertas
4. **Transparência** - Resumos de gastos/obras
5. **Participe** - Chamadas para engajamento

**Estrutura do Card**:
```
┌─────────────────────────────────────┐
│ [Ícone] Tag do Tema                 │
│                                     │
│ Título do Conteúdo                  │
│ Resumo simples e claro             │
│                                     │
│ ✓ Fonte Oficial • Data             │
│                                     │
│ [👍] [👎] [% aprovação] [Compartilhar] │
│                                     │
│ [Ver mais]                          │
└─────────────────────────────────────┘
```

**Sistema de Compartilhamento**:
- WhatsApp
- Copiar link
- Template com marca Opina+

---

### 3. Educação Política (`/components/opina/OpinaEducation.tsx`)

**Funcionalidades**:
- Lista de tópicos educativos
- Sistema de busca
- Páginas internas com conteúdo completo
- **Botão "Ouvir conteúdo"** (acessibilidade)

**Tópicos Disponíveis**:
- O que é um Projeto de Lei?
- Como participar de Audiências Públicas
- Orçamento Público Simplificado
- FAQs sobre democracia local

**Estrutura da Página de Conteúdo**:
```
┌─────────────────────────────────────┐
│ ← Voltar                            │
│                                     │
│ Título do Tópico                    │
│ [📚 5 min leitura] [🔊 3 min áudio]│
│                                     │
│ ┌─────────────────────────────┐   │
│ │ 🔊 Prefere ouvir?           │   │
│ │ [Ouvir conteúdo]            │   │
│ └─────────────────────────────┘   │
│                                     │
│ Conteúdo educativo completo...     │
│                                     │
│ [Baixar PDF] [Compartilhar]        │
└─────────────────────────────────────┘
```

---

### 4. Transparência (`/components/opina/OpinaTransparency.tsx`)

**Abas**:
1. **Orçamento**
   - Gráfico de pizza: Distribuição por secretaria
   - Gráfico de barras: Execução mensal
   - KPIs principais

2. **Obras em andamento**
   - Lista com % de conclusão
   - Orçamento vs Executado
   - Prazo estimado

3. **Contratos e Licitações**
   - Empresa contratada
   - Valor
   - Data
   - Link para documento

**Visualizações**:
- Recharts (gráficos responsivos)
- Progress bars
- Cards informativos
- Filtros por tema e período

---

### 5. Chat de IA - Popup Fixo (`/components/AIChatPopup.tsx`)

**Características**:
- Ícone flutuante no canto inferior direito
- Popup minimizável
- Respostas com fonte oficial + data
- Bolhas estilo mensageria

**Perguntas Sugeridas**:
- "Quais projetos de lei estão em votação?"
- "Como está a execução do orçamento de saúde?"
- "Qual o valor do salário do prefeito?"

**Estrutura da Resposta**:
```
┌─────────────────────────────────────┐
│ 🤖 Assistente Cívico                │
│                                     │
│ Resposta detalhada...               │
│                                     │
│ ✨ Fontes:                          │
│ • Portal da Câmara - Link          │
│ • Relatório Oficial - Link         │
│                                     │
│ 🕐 22/11/2024                       │
└─────────────────────────────────────┘
```

---

### 6. Perfil (`/components/opina/OpinaProfile.tsx`)

**Seções**:

**Dados Básicos**
- Avatar
- Nome
- Data de entrada
- Badge "Verificado"

**Estatísticas**
- Votos dados
- Consultas participadas
- Conteúdos lidos
- Dias ativos

**Preferências**
- ✏️ Editar interesses
- 📚 Modo Leitura vs 🔊 Modo Áudio
- Toggle entre preferências

**Atividade Recente**
- Timeline de ações
- Últimas participações

**Ações**
- [Sair da conta]

---

### 7. Decisão Coletiva (`/components/opina/VotingModal.tsx`)

**Modelo 1: Votação de PL**
```
┌─────────────────────────────────────┐
│ 📋 Votação de PL                    │
│                                     │
│ PL 045/2024 - Título                │
│                                     │
│ Qual a relevância deste PL?         │
│                                     │
│ ⭕ Muito importante                 │
│ ⚪ Relevante                        │
│ ⚪ Pouco importante                 │
│                                     │
│ [Cancelar] [Confirmar voto]         │
└─────────────────────────────────────┘
```

**Modelo 2: Enquete Comunitária**
```
┌─────────────────────────────────────┐
│ 📊 Enquete Comunitária              │
│                                     │
│ Design do Parque Linear             │
│                                     │
│ Escolha seu projeto preferido:      │
│                                     │
│ ⭕ Opção A - Sustentabilidade       │
│ ⚪ Opção B - Áreas de lazer         │
│ ⚪ Opção C - Arquitetura moderna    │
│                                     │
│ [Cancelar] [Confirmar voto]         │
└─────────────────────────────────────┘
```

**Após votar**: Exibe resultados em % com barra de progresso

---

## 🎯 Componentes ShadCN Utilizados

- `Button` - Ações primárias e secundárias
- `Card` - Containers de conteúdo
- `Badge` - Tags e categorias
- `Dialog` - Modals (votação, compartilhamento)
- `Input` - Campos de texto
- `Progress` - Barras de progresso
- `Tabs` - Navegação de transparência
- `Avatar` - Perfil do usuário

---

## 📊 Sistema de Relevância

### Como Funciona
1. Usuário vota 👍 ou 👎 em cada post
2. Score = `likes - dislikes`
3. Feed reordena automaticamente por score
4. Posts com maior relevância sobem
5. **Percentual de aprovação**: `(likes / total) * 100`

### Não Exibido
- Número absoluto de likes/dislikes
- Score numérico

### Exibido
- Botões 👍👎 (preenchidos se votou)
- % de aprovação (ex: "68% aprovação")

---

## ♿ Acessibilidade

### Recursos Implementados
- ✅ Preferência Ler/Ouvir desde onboarding
- ✅ Botão "Ouvir conteúdo" em educação
- ✅ Line-height 1.5+ (WCAG)
- ✅ Contraste AA/AAA nas cores
- ✅ Focus styles visíveis
- ✅ Labels semânticos
- ✅ Alt text em elementos visuais
- ✅ Navegação por teclado

### Para Implementar (Produção)
- Web Speech API para leitura de texto
- Screen reader optimization
- Testes com NVDA/JAWS

---

## 🔒 Privacidade e Segurança

- Conformidade LGPD
- Dados anônimos em relatórios públicos
- Não coleta PII desnecessário
- Votações anônimas
- Aviso de privacidade no perfil

---

## 🚀 Próximos Passos (Produção)

### Backend
- [ ] API para conteúdos oficiais
- [ ] Sistema de autenticação
- [ ] Banco de dados de votos/interesses
- [ ] Integração com portais governamentais

### Features
- [ ] Notificações push (PWA)
- [ ] Modo offline
- [ ] Calendário de eventos
- [ ] Integração com calendário pessoal
- [ ] Histórico completo de participação

### IA
- [ ] RAG com documentos oficiais
- [ ] Web Speech API para áudio
- [ ] Resumos automáticos de PLs
- [ ] Alertas personalizados

### Compartilhamento
- [ ] Instagram Stories template
- [ ] Cards visuais para compartilhamento
- [ ] OG tags otimizadas

---

## 📱 PWA Features

```json
// manifest.json
{
  "name": "Opina+",
  "short_name": "Opina+",
  "description": "Sua voz na democracia",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#FAFAFA",
  "theme_color": "#4BBF95",
  "icons": [...]
}
```

---

## 🎓 Exemplos de Uso

### Cidadão quer acompanhar saúde
1. Onboarding → Seleciona "Saúde"
2. Feed mostra PLs, obras e atualizações de saúde
3. Vota 👍 em projeto de ampliação de horário UBS
4. Acessa Transparência → vê gráfico de execução orçamentária
5. Pergunta à IA: "Como está o orçamento de saúde?"

### Cidadão quer entender processo legislativo
1. Vai em Educação
2. Clica em "O que é um Projeto de Lei?"
3. Escolhe "Ouvir conteúdo" (acessibilidade)
4. Lê/ouve explicação didática
5. Baixa PDF para consulta posterior

### Cidadão quer participar de consulta
1. Feed mostra "Consulta Pública: Parque Linear"
2. Clica em "Ver mais"
3. Abre modal de votação
4. Escolhe projeto preferido
5. Confirma voto
6. Vê resultados em tempo real

---

## 📞 Suporte

Para dúvidas sobre implementação:
- Documentação completa nos componentes
- Comentários inline no código
- Arquitetura modular e escalável

---

**Desenvolvido com foco em democracia digital, transparência e inclusão. 🇧🇷**
