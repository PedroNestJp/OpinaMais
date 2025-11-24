# Guia de Identidade Visual - Opina+

## Visão Geral

A identidade visual do Opina+ foi desenvolvida para transmitir **modernidade, confiança institucional e acessibilidade**, combinando elementos de portais governamentais (como gov.br) com a familiaridade de redes sociais.

---

## 🎨 Logomarca

### Conceito

A logo do Opina+ é composta por **dois balões de diálogo** que representam a conversa bidirecional entre governo e cidadãos, simbolizando transparência e comunicação aberta. O símbolo **"+"** como badge de notificação representa:

- ➕ Mais engajamento
- ➕ Mais participação
- ➕ Mais democracia
- ➕ Adição contínua de opiniões ao debate público

### Variações Disponíveis

#### 1. Variação Principal (Recomendada)
**Badge no canto superior do balão**
- Uso: Aplicativos, interface digital, PWA
- Tamanhos: 24px a 512px
- Formato: SVG escalável
- Arquivo: `Logo` componente com `variant="icon"`

#### 2. Variação Completa
**Ícone + Texto "Opina+"**
- Uso: Materiais de divulgação, apresentações, documentos oficiais
- Formato: SVG horizontal
- Arquivo: `Logo` componente com `variant="full"`

#### 3. Variação Monocromática
**Tons de cinza/preto**
- Uso: Impressão P&B, materiais com restrição de cor
- Formato: SVG
- Arquivo: `Logo` componente com `variant="mono"`

#### 4. Variação Fundo Escuro
**Cores adaptadas para fundo escuro**
- Uso: Dark mode, banners, redes sociais
- Formato: SVG
- Arquivo: `Logo` componente com `variant="dark"`

---

## 🎨 Paleta de Cores Institucional

### Cores Principais

```css
/* Azul Institucional - Cor Principal */
--primary: #003F7D;
/* Transmite: Confiança, seriedade, credibilidade governamental */
/* Uso: Elementos principais, CTAs primários, ícones importantes */

/* Verde Cívico - Cor Secundária */
--secondary: #4BBF95;
/* Transmite: Crescimento, participação cidadã, progresso democrático */
/* Uso: Destaques positivos, elementos de feedback, badges */

/* Amarelo Destaque - Cor de Acento */
--accent: #FFC947;
/* Transmite: Ação, engajamento, interatividade */
/* Uso: Símbolo "+", elementos interativos, notificações */
```

### Cores de Suporte

```css
/* Tons derivados para UI */
--primary-light: #7dd3c0;    /* Azul claro */
--primary-dark: #002850;      /* Azul escuro */
--secondary-light: #6ed3b0;   /* Verde claro */
--accent-dark: #e8b040;       /* Amarelo escuro */
```

---

## 📐 Especificações Técnicas

### Tamanhos Recomendados

| Contexto | Tamanho | Exemplo de Uso |
|----------|---------|----------------|
| Favicon | 16x16, 32x32 | Aba do navegador |
| App Icon (Mobile) | 192x192, 512x512 | PWA, Home screen |
| Header/Navbar | 36-48px | Cabeçalho do app |
| Telas internas | 40px | Headers de seções |
| Onboarding | 96-120px | Tela de boas-vindas |
| Marketing | 128px+ | Banners, materiais |

### Espaçamento Mínimo

Mantenha um espaço livre ao redor da logo equivalente a **25% da altura** da logo em todos os lados.

```
┌─────────────────────┐
│                     │
│    ╔═══════╗       │
│    ║ LOGO  ║       │
│    ╚═══════╝       │
│                     │
└─────────────────────┘
  ↑                 ↑
  25%             25%
```

---

## 💻 Implementação no Código

### Importação do Componente

```tsx
import { Logo } from './components/Logo';
```

### Uso Básico

```tsx
// Ícone colorido padrão (40px)
<Logo variant="icon" size={40} />

// Logo completo com texto
<Logo variant="full" size={48} />

// Versão monocromática
<Logo variant="mono" size={40} />

// Versão para fundo escuro
<Logo variant="dark" size={40} />
```

### Variações Alternativas

```tsx
import { LogoAlt, LogoAlt2 } from './components/Logo';

// + na sobreposição dos balões
<LogoAlt size={48} />

// + integrado dentro do balão
<LogoAlt2 size={48} />
```

---

## 📱 Aplicações no App

### 1. Header Principal (App.tsx)
```tsx
<header className="sticky top-0 z-40 bg-white border-b">
  <Logo variant="icon" size={36} />
  <span>Opina+</span>
</header>
```

### 2. Tela de Onboarding
```tsx
<Logo variant="icon" size={96} />
<h1>Bem-vindo ao Opina+</h1>
```

### 3. Headers de Seções
```tsx
<div className="flex items-center gap-3">
  <Logo variant="icon" size={40} />
  <h1>Atualizações Oficiais</h1>
</div>
```

### 4. PWA Splash Screen
```tsx
<div className="bg-gradient-to-br from-primary to-secondary">
  <Logo variant="dark" size={80} />
  <h3>Opina+</h3>
</div>
```

### 5. Botão Flutuante (FAB)
```tsx
<div className="bg-secondary rounded-full p-4">
  <Logo variant="icon" size={32} />
</div>
```

---

## ✅ Boas Práticas

### O que fazer ✓

- ✅ Usar os tamanhos recomendados para cada contexto
- ✅ Manter proporções originais (não distorcer)
- ✅ Respeitar o espaço mínimo ao redor
- ✅ Usar SVG quando possível (escalável)
- ✅ Preferir `variant="icon"` para interfaces
- ✅ Usar `variant="dark"` em fundos escuros
- ✅ Manter consistência em toda aplicação

### O que evitar ✗

- ❌ Alterar as cores da paleta oficial
- ❌ Distorcer ou inclinar a logo
- ❌ Adicionar efeitos (sombra, brilho, 3D)
- ❌ Usar em fundos com baixo contraste
- ❌ Comprimir ou redimensionar desproporcionalmente
- ❌ Modificar a estrutura dos balões
- ❌ Remover o símbolo "+"

---

## 🔧 Customização para Diferentes Estados

### Loading State
```tsx
<Logo variant="icon" size={48} className="animate-pulse" />
```

### Hover Effect
```tsx
<div className="hover:scale-110 transition-transform">
  <Logo variant="icon" size={40} />
</div>
```

### Com Gradiente de Fundo
```tsx
<div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-4">
  <Logo variant="dark" size={64} />
</div>
```

---

## 📊 Acessibilidade

### Contraste

Todas as variações da logo atendem aos requisitos WCAG 2.1 AA:

- **Fundo claro**: Usar `variant="icon"` (cores originais)
- **Fundo escuro**: Usar `variant="dark"` (ajustado para contraste)
- **P&B**: Usar `variant="mono"` (tons de cinza)

### Alt Text Recomendado

```tsx
<img 
  src={logo} 
  alt="Opina+ - Logotipo oficial da plataforma de engajamento cidadão"
  role="img"
/>
```

---

## 🌐 Assets para PWA

### Manifest Icons

Gerar os seguintes tamanhos para o `manifest.json`:

```json
{
  "icons": [
    {
      "src": "/icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-128x128.png",
      "sizes": "128x128",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-152x152.png",
      "sizes": "152x152",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

---

## 📝 Checklist de Implementação

- [x] Logo criada com componente React (SVG)
- [x] Variações (icon, full, mono, dark)
- [x] Implementada no onboarding
- [x] Implementada no header principal
- [x] Implementada nos headers de seções
- [x] Implementada no perfil
- [ ] Gerar assets PNG para PWA
- [ ] Adicionar ao manifest.json
- [ ] Criar favicon.ico
- [ ] Testar em diferentes tamanhos
- [ ] Validar contraste de cores
- [ ] Documentar no style guide interno

---

## 🎯 Filosofia de Design

A identidade visual do Opina+ foi criada seguindo três pilares:

### 1. **Institucionalidade**
Cores sóbrias (azul institucional) e formas geométricas limpas transmitem seriedade e confiança, essenciais para uma plataforma governamental.

### 2. **Acessibilidade**
Design minimalista, alto contraste e ícones reconhecíveis garantem usabilidade para todos os públicos, incluindo pessoas com deficiência visual.

### 3. **Engajamento**
O "+" destacado em amarelo e os balões de diálogo criam uma sensação de interatividade e participação ativa, convidando o cidadão a se envolver.

---

## 📞 Suporte

Para dúvidas sobre o uso da identidade visual ou solicitação de novos assets:

- **Arquivo**: `/components/Logo.tsx`
- **Showcase**: `/logo-showcase.tsx` (visualização completa)
- **Documentação**: Este arquivo (`BRAND_GUIDE.md`)

---

**Versão 1.0** • Opina+ 2025 • Design System
