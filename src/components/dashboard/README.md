# 👑 Dashboard do Assinante - Opina+

Sistema completo de Dashboard Premium para assinantes e gestores acompanharem métricas de desempenho e participação da plataforma.

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Componentes](#componentes)
- [Telas](#telas)
- [Métricas Disponíveis](#métricas-disponíveis)
- [Uso dos Componentes](#uso-dos-componentes)
- [Origem dos Dados](#origem-dos-dados)

---

## 🎯 Visão Geral

O Dashboard do Assinante fornece:

✅ **Métricas resumidas** - Total de participantes, visualizações, engajamento  
✅ **Rankings de posts** - Mais curtidos, visualizados e compartilhados  
✅ **Métricas de votações** - Em andamento e encerradas  
✅ **Artigos populares** - Mais acessados da Educação Política  
✅ **Filtros avançados** - Por período e tipo de conteúdo  
✅ **Geração de relatórios** - Exportação em PDF, CSV e Excel  

---

## 🧩 Componentes

### 1. **MetricCard**
Card de métrica resumida com ícone e indicador de tendência.

```tsx
<MetricCard
  title="Total de participantes"
  value="47.8K"
  subtitle="Último mês"
  icon={TrendingUp}
  iconColor="#008344"
  trend={{ value: '+12.5%', isPositive: true }}
/>
```

**Props:**
- `title`: Título da métrica
- `value`: Valor principal (string ou number)
- `subtitle`: Subtítulo opcional
- `icon`: Ícone Lucide opcional
- `iconColor`: Cor do ícone (hex)
- `trend`: Objeto com `value` e `isPositive`

---

### 2. **FilterBar**
Barra de filtros com período e tipo de conteúdo.

```tsx
<FilterBar
  onPeriodChange={(period) => console.log(period)}
  onContentTypeChange={(type) => console.log(type)}
/>
```

**Períodos disponíveis:**
- `week`: Última semana
- `month`: Último mês
- `custom`: Período personalizado

**Tipos de conteúdo:**
- `all`: Geral
- `pl`: PLs
- `poll`: Enquetes
- `education`: Educação Política

---

### 3. **PostRankingCard**
Card de ranking de posts (curtidos, visualizados, compartilhados).

```tsx
<PostRankingCard
  title="Posts mais curtidos"
  data={mockTopLikes}
  metricType="likes"
/>
```

**Tipos de métrica:**
- `likes`: Posts mais curtidos (❤️)
- `views`: Posts mais visualizados (👁️)
- `shares`: Posts mais compartilhados (📤)

**Estrutura de dados:**
```typescript
interface PostRankingData {
  id: string;
  title: string;
  type: 'PL' | 'Enquete' | 'Educação Política' | 'Discussão';
  metric: number;
  metricLabel: string;
  badge?: string; // Ex: "Alto alcance", "Trending"
  category?: string;
  categoryColor?: string;
}
```

---

### 4. **PollMetricsCard**
Card de métricas de enquetes e votações.

```tsx
<PollMetricsCard
  title="Votações em andamento"
  data={mockActivePolls}
  status="active"
  onViewDetails={(id) => console.log('View poll:', id)}
/>
```

**Status:**
- `active`: Votações em andamento
- `closed`: Votações encerradas

**Estrutura de dados:**
```typescript
interface PollData {
  id: string;
  title: string;
  type: 'PL' | 'Enquete';
  plNumber?: string;
  status: 'active' | 'closed';
  totalParticipants: number;
  options: {
    label: string;
    percentage: number;
    votes: number;
    color: string;
  }[];
  closedDate?: string;
  category?: string;
  categoryColor?: string;
}
```

---

### 5. **EducationArticlesCard**
Card de artigos mais acessados da Educação Política.

```tsx
<EducationArticlesCard
  data={mockArticles}
  onArticleClick={(id) => console.log('View article:', id)}
/>
```

**Estrutura de dados:**
```typescript
interface ArticleData {
  id: string;
  title: string;
  views: number;
  category: string;
  readTime?: string;
  trend?: string; // Ex: "+125%"
}
```

---

### 6. **ReportGeneratorModal**
Modal para gerar e exportar relatórios.

```tsx
<ReportGeneratorModal
  isOpen={true}
  onClose={() => setIsOpen(false)}
  onGenerate={(options) => console.log(options)}
/>
```

**Seções disponíveis:**
- `likes`: Posts mais curtidos ❤️
- `views`: Posts mais visualizados 👁️
- `shares`: Posts mais compartilhados 📤
- `articles`: Artigos mais acessados 📚
- `polls`: Enquetes com maior participação 📊

**Formatos de exportação:**
- `pdf`: Documento formatado com gráficos
- `csv`: Planilha compatível com Excel
- `excel`: Arquivo .xlsx nativo

**Retorno:**
```typescript
interface ReportOptions {
  sections: string[];
  format: 'pdf' | 'csv' | 'excel';
}
```

---

### 7. **DashboardAccessButton**
Botão de acesso rápido ao Dashboard (2 variantes).

```tsx
// Variante padrão (card grande)
<DashboardAccessButton
  onClick={() => navigate('/dashboard')}
  variant="default"
/>

// Variante compacta (lista)
<DashboardAccessButton
  onClick={() => navigate('/dashboard')}
  variant="compact"
/>
```

---

## 📱 Telas

### **Tela Principal: Dashboard do Assinante**

#### **Header Premium**
- Gradient azul (#003F7D → #002a56)
- Ícone de coroa com badge "PREMIUM"
- Título: "Dashboard do Assinante"
- Subtítulo: "Visão geral de desempenho e participação"
- Botão "Gerar relatório" destacado em amarelo

#### **Seções:**

1. **Filtros**
   - Período: Chips selecionáveis
   - Tipo de conteúdo: Chips selecionáveis
   - Fundo branco, borda suave

2. **Métricas Resumidas** (Grid 4 colunas)
   - Total de participantes (verde #008344)
   - Visualizações totais (azul #007AFF)
   - Engajamento médio (vermelho #E5484D)
   - Votações ativas (amarelo #FFC947)
   - Cada card com ícone, valor, tendência

3. **Rankings de Posts** (Grid 3 colunas)
   - Posts mais curtidos
   - Posts mais visualizados
   - Posts mais compartilhados
   - Top 5 com numeração destacada (1º ouro, 2º prata, 3º bronze)

4. **Métricas de Votações** (Grid 2 colunas)
   - Votações em andamento (ícone relógio)
   - Votações encerradas (ícone check)
   - Barras de progresso com percentuais
   - Total de participantes
   - Botão "Ver resultados" para encerradas

5. **Artigos de Educação Política**
   - Top 5 artigos mais acessados
   - Badge "Educação Política"
   - Categoria, tempo de leitura, visualizações
   - Indicador de tendência (opcional)

6. **Origem dos Dados** (Info Card)
   - Feed (Início): Posts mais curtidos/visualizados/compartilhados
   - Educação Política: Artigos mais acessados
   - Votação Coletiva: Percentuais e participantes

---

## 📊 Métricas Disponíveis

### **Posts**

#### **Mais Curtidos**
- Título do post
- Tipo (PL, Enquete, Discussão, Educação)
- Número de curtidas
- Categoria e cor
- Badge opcional ("Alto alcance", "Trending")

#### **Mais Visualizados**
- Título do post
- Tipo
- Número de visualizações
- Categoria e cor
- Badge opcional ("Alto alcance")

#### **Mais Compartilhados**
- Título do post
- Tipo
- Número de compartilhamentos
- Categoria e cor

---

### **Enquetes e Votações**

#### **Em Andamento**
- Título
- Tipo (PL ou Enquete)
- Número do PL (se aplicável)
- Status: "Em andamento"
- Percentual de votos por opção (barras coloridas)
- Total de participantes
- Categoria

#### **Encerradas**
- Título
- Tipo (PL ou Enquete)
- Número do PL (se aplicável)
- Status: "Encerrada"
- Percentual final de votos por opção
- Total de participantes
- Data de encerramento
- Botão "Ver resultados"

---

### **Educação Política**

#### **Artigos Mais Acessados**
- Título do artigo
- Número de acessos
- Categoria (Processo Legislativo, Orçamento, etc.)
- Tempo de leitura estimado
- Badge "Educação Política"
- Indicador de tendência ("+125%", etc.)

---

## 💻 Uso dos Componentes

### **Exemplo 1: Dashboard completo**

```tsx
import { SubscriberDashboard } from './components/dashboard';

function App() {
  return (
    <SubscriberDashboard
      onBack={() => navigate('/')}
    />
  );
}
```

### **Exemplo 2: Métricas isoladas**

```tsx
import { MetricCard, PostRankingCard } from './components/dashboard';
import { TrendingUp } from 'lucide-react';

function MyDashboard() {
  return (
    <div>
      <MetricCard
        title="Participantes"
        value="47.8K"
        icon={TrendingUp}
        iconColor="#008344"
        trend={{ value: '+12.5%', isPositive: true }}
      />
      
      <PostRankingCard
        title="Top Posts"
        data={myPosts}
        metricType="likes"
      />
    </div>
  );
}
```

### **Exemplo 3: Modal de relatórios**

```tsx
import { ReportGeneratorModal } from './components/dashboard';
import { useState } from 'react';

function ReportsPage() {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleGenerate = (options) => {
    console.log('Generating report:', options);
    // Chamar API de geração de relatório
    // downloadReport(options);
    setIsOpen(false);
  };
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Gerar Relatório
      </button>
      
      <ReportGeneratorModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onGenerate={handleGenerate}
      />
    </>
  );
}
```

---

## 📂 Origem dos Dados

### **Feed (Início)**
Base para:
- Posts mais curtidos
- Posts mais visualizados
- Posts mais compartilhados
- Total de participantes
- Engajamento médio

### **Educação Política**
Base para:
- Artigos mais acessados
- Tempo de leitura
- Categorias de artigos
- Tendências de acesso

### **Votação Coletiva**
Base para:
- Percentuais de votos por opção
- Número total de participantes
- Status das enquetes/PLs (andamento/encerrada)
- Data de encerramento
- Votações ativas (métrica resumida)

---

## 🎨 Estilos e Design

### **Paleta de Cores**

| Elemento | Cor | Uso |
|----------|-----|-----|
| **Header Gradient** | `#003F7D` → `#002a56` | Background do header |
| **Premium Badge** | `#FFC947` | Badge "PREMIUM", ícone coroa |
| **Verde** | `#008344` | Métricas positivas, exportar |
| **Azul** | `#007AFF` | Visualizações, links |
| **Vermelho** | `#E5484D` | Curtidas, contra |
| **Amarelo** | `#FFC947` | Em andamento, destaque |
| **Fundo** | `#FAFAFA` | Background geral |
| **Cards** | `#FFFFFF` | Background de cards |
| **Bordas** | `#E4E4E4` | Borders padrão |

### **Rankings**
- **1º lugar**: Badge dourado `#FFC947`
- **2º lugar**: Badge cinza claro `#E4E4E4`
- **3º lugar**: Badge laranja claro `#FFB84D`/30
- **4º+**: Badge cinza `#F5F5F5`

### **Tipografia**

```css
Fonte: Inter
Pesos: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

Header do Dashboard: 28px, weight 700
Títulos de cards: 16px, weight 700
Valores de métricas: 28px, weight 700
Títulos de posts: 14px, weight 600
Textos corpo: 13px, weight 400
Labels e badges: 11-13px, weight 500-600
```

### **Componentes Shadcn Utilizados**

- `Card` - Todos os cards de métricas
- `Button` - Botões de ação
- `Dialog` - Modal de relatórios
- `Checkbox` - Seleção de seções do relatório

---

## 🔧 Integração com Backend

### **APIs Necessárias**

#### **1. Métricas Resumidas**
```typescript
GET /api/dashboard/metrics?period=month&type=all
```

**Response:**
```json
{
  "totalParticipants": 47800,
  "totalViews": 142000,
  "avgEngagement": 65,
  "activePolls": 2,
  "trends": {
    "participants": "+12.5%",
    "views": "+8.3%",
    "engagement": "+5.2%"
  }
}
```

#### **2. Rankings de Posts**
```typescript
GET /api/dashboard/posts/top?metric=likes&period=month&type=all&limit=5
```

**Response:**
```json
{
  "posts": [
    {
      "id": "1",
      "title": "PL 123/2025 - Ampliação do atendimento médico",
      "type": "PL",
      "metric": 15482,
      "category": "Saúde",
      "categoryColor": "#4BBF95"
    }
  ]
}
```

#### **3. Votações**
```typescript
GET /api/dashboard/polls?status=active&period=month
```

**Response:**
```json
{
  "polls": [
    {
      "id": "1",
      "title": "Qual prioridade para saúde pública?",
      "type": "Enquete",
      "status": "active",
      "totalParticipants": 8234,
      "options": [
        { "label": "Mais médicos", "percentage": 45, "votes": 3705, "color": "#4BBF95" }
      ],
      "category": "Saúde",
      "categoryColor": "#4BBF95"
    }
  ]
}
```

#### **4. Artigos**
```typescript
GET /api/dashboard/articles/top?period=month&limit=5
```

**Response:**
```json
{
  "articles": [
    {
      "id": "1",
      "title": "Como funciona o processo legislativo brasileiro?",
      "views": 18543,
      "category": "Processo Legislativo",
      "readTime": "8 min",
      "trend": "+125%"
    }
  ]
}
```

#### **5. Geração de Relatórios**
```typescript
POST /api/dashboard/reports/generate
```

**Request Body:**
```json
{
  "sections": ["likes", "views", "shares", "articles", "polls"],
  "format": "pdf",
  "filters": {
    "period": "month",
    "type": "all"
  }
}
```

**Response:**
```json
{
  "reportUrl": "https://cdn.opina.com/reports/report-2025-11-23.pdf",
  "expiresAt": "2025-11-30T23:59:59Z"
}
```

---

## 📱 Responsividade

### **Breakpoints**

- **Mobile** (< 768px): 1 coluna
- **Tablet** (768px - 1024px): 2 colunas
- **Desktop** (> 1024px): 3-4 colunas

### **Grid Layouts**

```css
/* Métricas Resumidas */
grid-cols-1 md:grid-cols-2 lg:grid-cols-4

/* Rankings de Posts */
grid-cols-1 lg:grid-cols-3

/* Votações */
grid-cols-1 lg:grid-cols-2

/* Filtros */
grid-cols-1 md:grid-cols-2
```

---

## 🚀 Próximos Passos

### **Fase 1 - Implementado ✅**
- Dashboard completo
- Todos os componentes de métricas
- Filtros de período e tipo
- Modal de geração de relatórios
- Botão de acesso na Welcome

### **Fase 2 - Backend (A implementar)**
- APIs de métricas em tempo real
- Sistema de geração de relatórios (PDF/CSV/Excel)
- Cache de métricas
- Autenticação de assinantes

### **Fase 3 - Recursos Avançados (Futuro)**
- Gráficos interativos (charts)
- Exportação agendada de relatórios
- Alertas customizados por métrica
- Comparação entre períodos
- Dashboard público (versão reduzida)
- Widgets embarcáveis

---

## 💡 Dicas de Uso

### **Performance**
- Use cache para métricas que não mudam constantemente
- Pagine rankings de posts (lazy loading)
- Gere relatórios de forma assíncrona
- Use skeleton loaders durante carregamento

### **UX**
- Permita salvar filtros preferidos
- Mostre tooltips com explicações das métricas
- Adicione atalhos de teclado para navegação
- Permita exportar métricas individuais

### **Acessibilidade**
- Garanta contraste adequado (WCAG AA)
- Use labels descritivos em gráficos
- Adicione `aria-labels` em botões de ação
- Permita navegação por teclado

---

**🇧🇷 Dashboard Premium do Opina+ está pronto para uso!** ✅👑📊🚀

Sistema completo de métricas e relatórios para assinantes e gestores acompanharem o desempenho da plataforma de participação cidadã.
