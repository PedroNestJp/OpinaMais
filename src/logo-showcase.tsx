import React from 'react';
import { Logo, LogoAlt, LogoAlt2 } from './components/Logo';

export default function LogoShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero */}
        <div className="text-center space-y-6">
          <div className="flex justify-center mb-8">
            <Logo variant="icon" size={120} />
          </div>
          <h1 className="text-5xl font-bold text-gray-900">
            Opina+ • Identidade Visual
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sistema de logo com balões de diálogo cruzados simbolizando a conversa bidirecional entre governo e cidadãos.
            <br />O símbolo "+" centralizado na intersecção representa mais engajamento, mais participação e mais democracia.
          </p>
        </div>

        {/* Conceito */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-6 text-gray-900">💡 Conceito de Design</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#003F7D] rounded-lg flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Balão Azul - Governo</h3>
                  <p className="text-gray-600">
                    Representa as instituições públicas. Posicionado no canto superior direito, simboliza autoridade e informação oficial.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#4BBF95] rounded-lg flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Balão Verde - Cidadão</h3>
                  <p className="text-gray-600">
                    Representa a voz do povo. Posicionado no canto inferior esquerdo, simboliza participação ativa e crescimento cívico.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#FFC947] rounded-lg flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">Símbolo "+" - Engajamento</h3>
                  <p className="text-gray-600">
                    Posicionado na intersecção dos balões, simboliza o encontro entre governo e cidadão. Representa adição contínua de vozes ao debate público.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl flex items-center justify-center">
              <Logo variant="icon" size={200} />
            </div>
          </div>
        </div>

        {/* Variação Principal - Badge no Canto */}
        <section className="mb-20">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-[#FFC947] text-[#003F7D] rounded-full text-sm mb-3">
              Recomendada
            </span>
            <h2 className="mb-2">Variação 1: Badge no Canto Superior</h2>
            <p className="text-gray-600">
              O símbolo "+" como badge de notificação cria uma associação visual com engajamento
              e participação ativa, além de ser facilmente reconhecível em diferentes tamanhos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Apenas Ícone Colorido */}
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="flex justify-center items-center h-40 mb-6">
                <Logo variant="icon" size={120} />
              </div>
              <h3 className="text-center mb-2">Ícone Colorido</h3>
              <p className="text-sm text-gray-600 text-center">
                Versão principal para uso em aplicativos e interface digital
              </p>
            </div>

            {/* Ícone + Texto */}
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="flex justify-center items-center h-40 mb-6">
                <Logo variant="full" size={40} />
              </div>
              <h3 className="text-center mb-2">Logo Completo</h3>
              <p className="text-sm text-gray-600 text-center">
                Para materiais de divulgação, apresentações e documentos oficiais
              </p>
            </div>

            {/* Monocromático */}
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="flex justify-center items-center h-40 mb-6">
                <Logo variant="mono" size={120} />
              </div>
              <h3 className="text-center mb-2">Versão Monocromática</h3>
              <p className="text-sm text-gray-600 text-center">
                Para impressão em preto e branco ou materiais com restrição de cor
              </p>
            </div>
          </div>

          {/* Aplicação em Fundos */}
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {/* Fundo Claro */}
            <div className="bg-white rounded-xl p-8 border-2 border-gray-200">
              <div className="flex justify-center items-center h-32">
                <Logo variant="icon" size={80} />
              </div>
              <p className="text-sm text-gray-600 text-center mt-4">Fundo Claro</p>
            </div>

            {/* Fundo Escuro */}
            <div className="bg-[#1a1a1a] rounded-xl p-8 border-2 border-gray-700">
              <div className="flex justify-center items-center h-32">
                <Logo variant="dark" size={80} />
              </div>
              <p className="text-sm text-white text-center mt-4">Fundo Escuro</p>
            </div>

            {/* Fundo Colorido */}
            <div className="bg-gradient-to-br from-[#4BBF95] to-[#003F7D] rounded-xl p-8">
              <div className="flex justify-center items-center h-32">
                <Logo variant="dark" size={80} />
              </div>
              <p className="text-sm text-white text-center mt-4">Fundo Colorido</p>
            </div>
          </div>

          {/* Diferentes Tamanhos */}
          <div className="mt-8 bg-white rounded-xl p-8 shadow-md border border-gray-100">
            <h3 className="mb-6 text-center">Escalabilidade</h3>
            <div className="flex justify-around items-end gap-4 flex-wrap">
              <div className="text-center">
                <Logo variant="icon" size={24} />
                <p className="text-xs text-gray-500 mt-2">24px</p>
              </div>
              <div className="text-center">
                <Logo variant="icon" size={32} />
                <p className="text-xs text-gray-500 mt-2">32px</p>
              </div>
              <div className="text-center">
                <Logo variant="icon" size={48} />
                <p className="text-xs text-gray-500 mt-2">48px</p>
              </div>
              <div className="text-center">
                <Logo variant="icon" size={64} />
                <p className="text-xs text-gray-500 mt-2">64px</p>
              </div>
              <div className="text-center">
                <Logo variant="icon" size={96} />
                <p className="text-xs text-gray-500 mt-2">96px</p>
              </div>
              <div className="text-center">
                <Logo variant="icon" size={128} />
                <p className="text-xs text-gray-500 mt-2">128px</p>
              </div>
            </div>
          </div>
        </section>

        {/* Variações Alternativas */}
        <section className="mb-20">
          <h2 className="mb-8">Variações Alternativas</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Variação 2: + na sobreposição */}
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="flex justify-center items-center h-48 mb-6">
                <LogoAlt size={140} />
              </div>
              <h3 className="mb-2">Variação 2: Sobreposição</h3>
              <p className="text-sm text-gray-600">
                O "+" posicionado na área de sobreposição dos balões simboliza a conexão
                e o diálogo construtivo entre cidadãos e governo.
              </p>
            </div>

            {/* Variação 3: + dentro do balão */}
            <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100">
              <div className="flex justify-center items-center h-48 mb-6">
                <LogoAlt2 size={140} />
              </div>
              <h3 className="mb-2">Variação 3: Integrado</h3>
              <p className="text-sm text-gray-600">
                O "+" integrado ao conteúdo do balão menor representa a ação positiva
                de adicionar opiniões e contribuir com o debate público.
              </p>
            </div>
          </div>
        </section>

        {/* Paleta de Cores */}
        <section className="mb-20">
          <h2 className="mb-8">Paleta de Cores Institucional</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Azul Institucional */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-[#003F7D] h-32"></div>
              <div className="p-6">
                <h3 className="mb-2">Azul Institucional</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Cor principal que transmite confiança, seriedade e credibilidade governamental.
                </p>
                <div className="flex items-center justify-between">
                  <code className="text-sm bg-gray-100 px-3 py-1 rounded">#003F7D</code>
                  <span className="text-xs text-gray-500">Principal</span>
                </div>
              </div>
            </div>

            {/* Verde Cívico */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-[#4BBF95] h-32"></div>
              <div className="p-6">
                <h3 className="mb-2">Verde Cívico</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Representa crescimento, participação cidadã e o aspecto progressivo da democracia.
                </p>
                <div className="flex items-center justify-between">
                  <code className="text-sm bg-gray-100 px-3 py-1 rounded">#4BBF95</code>
                  <span className="text-xs text-gray-500">Secundária</span>
                </div>
              </div>
            </div>

            {/* Amarelo Destaque */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-[#FFC947] h-32"></div>
              <div className="p-6">
                <h3 className="mb-2">Amarelo Destaque</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Cor de ação e engajamento, usada para destacar elementos interativos importantes.
                </p>
                <div className="flex items-center justify-between">
                  <code className="text-sm bg-gray-100 px-3 py-1 rounded">#FFC947</code>
                  <span className="text-xs text-gray-500">Acento</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Aplicações Práticas */}
        <section>
          <h2 className="mb-8">Aplicações no App</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Header/Navbar */}
            <div className="bg-[#003F7D] rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Logo variant="dark" size={40} />
                  <span>Opina+</span>
                </div>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
                  <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
                </div>
              </div>
              <p className="text-sm text-white/70">Exemplo de aplicação no cabeçalho</p>
            </div>

            {/* Splash Screen */}
            <div className="bg-gradient-to-br from-[#003F7D] to-[#4BBF95] rounded-xl p-6 text-white shadow-lg flex flex-col items-center justify-center">
              <Logo variant="dark" size={80} />
              <h3 className="mt-4">Opina+</h3>
              <p className="text-sm text-white/70 mt-2">Tela de carregamento (PWA)</p>
            </div>

            {/* Botão Flutuante */}
            <div className="bg-gray-100 rounded-xl p-6 relative h-48">
              <div className="absolute bottom-6 right-6 bg-[#4BBF95] rounded-full p-4 shadow-xl">
                <Logo variant="icon" size={32} />
              </div>
              <p className="text-sm text-gray-600">Botão de ação flutuante (FAB)</p>
            </div>

            {/* Ícone do App */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-20 h-20 rounded-2xl shadow-lg overflow-hidden bg-gradient-to-br from-[#003F7D] to-[#4BBF95] flex items-center justify-center">
                  <Logo variant="dark" size={56} />
                </div>
                <div>
                  <h4>Opina+</h4>
                  <p className="text-sm text-gray-500">Engajamento Cidadão</p>
                </div>
              </div>
              <p className="text-sm text-gray-600">Ícone na home screen (iOS/Android)</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>Sistema de Identidade Visual • Opina+ 2025</p>
          <p className="mt-2">Desenvolvido para máxima acessibilidade e reconhecimento institucional</p>
        </div>
      </div>
    </div>
  );
}