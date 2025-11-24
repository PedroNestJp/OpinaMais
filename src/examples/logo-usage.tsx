/**
 * Exemplos de Uso do Componente Logo
 * 
 * Este arquivo contém exemplos práticos de como usar
 * o componente Logo em diferentes contextos da aplicação.
 */

import React from 'react';
import { Logo, LogoAlt, LogoAlt2 } from '../components/Logo';

// ============================================
// EXEMPLO 1: Header Principal
// ============================================
export function HeaderExample() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo variant="icon" size={36} />
          <span className="font-semibold text-lg">Opina+</span>
        </div>
        <div className="text-xs text-gray-500">
          Sua voz na democracia
        </div>
      </div>
    </header>
  );
}

// ============================================
// EXEMPLO 2: Header de Seção
// ============================================
export function SectionHeaderExample() {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-4">
        <Logo variant="icon" size={40} />
        <h1 className="text-3xl font-bold text-gray-900 mb-0">
          Título da Seção
        </h1>
      </div>
      <p className="text-gray-600 text-lg">
        Descrição ou subtítulo da seção
      </p>
    </div>
  );
}

// ============================================
// EXEMPLO 3: Splash Screen / Loading
// ============================================
export function SplashScreenExample() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#003F7D] to-[#4BBF95] flex flex-col items-center justify-center">
      <Logo variant="dark" size={120} />
      <h1 className="text-white text-3xl font-bold mt-6">Opina+</h1>
      <p className="text-white/80 mt-2">Carregando...</p>
    </div>
  );
}

// ============================================
// EXEMPLO 4: Cartão de Boas-Vindas
// ============================================
export function WelcomeCardExample() {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="flex justify-center mb-6">
        <Logo variant="icon" size={96} />
      </div>
      <h1 className="text-3xl font-bold text-center mb-4">
        Bem-vindo ao Opina+
      </h1>
      <p className="text-gray-600 text-center text-lg">
        Conecte-se com as decisões públicas da sua cidade
      </p>
    </div>
  );
}

// ============================================
// EXEMPLO 5: Botão Flutuante (FAB)
// ============================================
export function FloatingButtonExample() {
  return (
    <button className="fixed bottom-6 right-6 bg-gradient-to-br from-[#4BBF95] to-[#003F7D] rounded-full p-4 shadow-2xl hover:scale-110 transition-transform">
      <Logo variant="dark" size={32} />
    </button>
  );
}

// ============================================
// EXEMPLO 6: Footer
// ============================================
export function FooterExample() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-4">
          <Logo variant="dark" size={48} />
          <span className="text-2xl font-bold">Opina+</span>
        </div>
        <p className="text-gray-400">
          Plataforma de engajamento cidadão e transparência pública
        </p>
      </div>
    </footer>
  );
}

// ============================================
// EXEMPLO 7: Variações em Grid
// ============================================
export function VariationsGridExample() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-8">
      {/* Colorida */}
      <div className="text-center">
        <div className="bg-white p-6 rounded-xl shadow-md mb-3 flex justify-center items-center h-32">
          <Logo variant="icon" size={64} />
        </div>
        <p className="text-sm font-medium">Colorida</p>
      </div>

      {/* Completa */}
      <div className="text-center">
        <div className="bg-white p-6 rounded-xl shadow-md mb-3 flex justify-center items-center h-32">
          <Logo variant="full" size={32} />
        </div>
        <p className="text-sm font-medium">Completa</p>
      </div>

      {/* Monocromática */}
      <div className="text-center">
        <div className="bg-white p-6 rounded-xl shadow-md mb-3 flex justify-center items-center h-32">
          <Logo variant="mono" size={64} />
        </div>
        <p className="text-sm font-medium">Monocromática</p>
      </div>

      {/* Fundo Escuro */}
      <div className="text-center">
        <div className="bg-gray-900 p-6 rounded-xl shadow-md mb-3 flex justify-center items-center h-32">
          <Logo variant="dark" size={64} />
        </div>
        <p className="text-sm font-medium">Fundo Escuro</p>
      </div>
    </div>
  );
}

// ============================================
// EXEMPLO 8: Diferentes Tamanhos
// ============================================
export function SizesExample() {
  return (
    <div className="flex items-end justify-around gap-4 p-8 bg-white rounded-xl">
      <div className="text-center">
        <Logo variant="icon" size={24} />
        <p className="text-xs mt-2">24px</p>
      </div>
      <div className="text-center">
        <Logo variant="icon" size={32} />
        <p className="text-xs mt-2">32px</p>
      </div>
      <div className="text-center">
        <Logo variant="icon" size={48} />
        <p className="text-xs mt-2">48px</p>
      </div>
      <div className="text-center">
        <Logo variant="icon" size={64} />
        <p className="text-xs mt-2">64px</p>
      </div>
      <div className="text-center">
        <Logo variant="icon" size={96} />
        <p className="text-xs mt-2">96px</p>
      </div>
    </div>
  );
}

// ============================================
// EXEMPLO 9: Com Animações
// ============================================
export function AnimatedLogoExamples() {
  return (
    <div className="space-y-8 p-8">
      {/* Loading pulsante */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Loading (Pulse)</h3>
        <Logo variant="icon" size={64} className="animate-pulse" />
      </div>

      {/* Hover scale */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Hover Scale</h3>
        <div className="hover:scale-110 transition-transform cursor-pointer inline-block">
          <Logo variant="icon" size={64} />
        </div>
      </div>

      {/* Spin (não recomendado, apenas exemplo) */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-4">Spin (exemplo)</h3>
        <div className="animate-spin">
          <Logo variant="icon" size={64} />
        </div>
      </div>
    </div>
  );
}

// ============================================
// EXEMPLO 10: Variações Alternativas
// ============================================
export function AlternativeVariationsExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
      {/* Variação Principal */}
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <Logo variant="icon" size={96} />
        <h3 className="font-semibold mt-4 mb-2">Variação Principal</h3>
        <p className="text-sm text-gray-600">
          Badge "+" no canto superior
        </p>
      </div>

      {/* Variação Alt 1 */}
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <LogoAlt size={96} />
        <h3 className="font-semibold mt-4 mb-2">Variação Alt 1</h3>
        <p className="text-sm text-gray-600">
          "+" na sobreposição
        </p>
      </div>

      {/* Variação Alt 2 */}
      <div className="bg-white p-6 rounded-xl shadow-md text-center">
        <LogoAlt2 size={96} />
        <h3 className="font-semibold mt-4 mb-2">Variação Alt 2</h3>
        <p className="text-sm text-gray-600">
          "+" integrado ao balão
        </p>
      </div>
    </div>
  );
}

// ============================================
// EXEMPLO 11: Em Diferentes Fundos
// ============================================
export function BackgroundsExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8">
      {/* Fundo branco */}
      <div className="bg-white border-2 border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center h-48">
        <Logo variant="icon" size={64} />
        <p className="text-sm mt-4 text-gray-600">Fundo Claro</p>
      </div>

      {/* Fundo escuro */}
      <div className="bg-gray-900 rounded-xl p-8 flex flex-col items-center justify-center h-48">
        <Logo variant="dark" size={64} />
        <p className="text-sm mt-4 text-white">Fundo Escuro</p>
      </div>

      {/* Fundo gradiente */}
      <div className="bg-gradient-to-br from-[#003F7D] to-[#4BBF95] rounded-xl p-8 flex flex-col items-center justify-center h-48">
        <Logo variant="dark" size={64} />
        <p className="text-sm mt-4 text-white">Fundo Gradiente</p>
      </div>
    </div>
  );
}

// ============================================
// EXEMPLO 12: Navegação Mobile
// ============================================
export function MobileNavExample() {
  return (
    <div className="max-w-sm mx-auto">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Logo variant="icon" size={28} />
          <span className="font-semibold">Opina+</span>
        </div>
        <button className="text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Conteúdo */}
      <div className="p-4 bg-gray-50 h-64">
        <p className="text-gray-600 text-center">Conteúdo principal</p>
      </div>

      {/* Bottom navigation */}
      <div className="bg-white border-t border-gray-200 flex items-center justify-around h-16">
        <button className="flex flex-col items-center text-[#003F7D]">
          <span className="text-xs">Home</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <span className="text-xs">Educação</span>
        </button>
        <button className="flex flex-col items-center text-gray-400">
          <span className="text-xs">Perfil</span>
        </button>
      </div>
    </div>
  );
}

// ============================================
// EXEMPLO 13: Card Promocional
// ============================================
export function PromoCardExample() {
  return (
    <div className="bg-gradient-to-br from-[#003F7D] to-[#4BBF95] rounded-2xl p-8 text-white max-w-md mx-auto shadow-2xl">
      <div className="flex items-center gap-4 mb-6">
        <Logo variant="dark" size={56} />
        <div>
          <h2 className="text-2xl font-bold">Opina+</h2>
          <p className="text-white/80 text-sm">Sua voz na democracia</p>
        </div>
      </div>
      <p className="mb-6 text-white/90">
        Participe das decisões públicas da sua cidade de forma simples e transparente.
      </p>
      <button className="w-full bg-white text-[#003F7D] font-semibold py-3 rounded-lg hover:bg-gray-100 transition-colors">
        Começar Agora
      </button>
    </div>
  );
}

// ============================================
// DEMONSTRAÇÃO COMPLETA
// ============================================
export default function LogoUsageExamples() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4 space-y-16">
        <div className="text-center mb-12">
          <Logo variant="icon" size={80} />
          <h1 className="text-4xl font-bold mt-6 mb-2">Exemplos de Uso - Logo Opina+</h1>
          <p className="text-gray-600 text-lg">
            Guia prático de implementação do componente Logo
          </p>
        </div>

        <section>
          <h2 className="text-2xl font-bold mb-6">Headers</h2>
          <div className="space-y-6">
            <HeaderExample />
            <div className="bg-white p-6 rounded-xl">
              <SectionHeaderExample />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Variações</h2>
          <VariationsGridExample />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Tamanhos</h2>
          <SizesExample />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Fundos</h2>
          <BackgroundsExample />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Variações Alternativas</h2>
          <AlternativeVariationsExample />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Cards Especiais</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <WelcomeCardExample />
            <PromoCardExample />
          </div>
        </section>
      </div>
    </div>
  );
}
