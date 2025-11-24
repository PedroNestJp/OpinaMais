import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { ThumbsUp, BookOpen, BarChart3, MessageCircle, Shield, Users, ArrowLeft } from '../icons';
import opinaPlusLogo from 'figma:asset/39a9e75927b809ece9dd0193bc4b5f71704027b2.png';
import opinAIIcon from 'figma:asset/dba9adbbc2d7d351b47cd150827f39d4e6c84a9e.png';

interface OpinaHomeProps {
  onContinue: () => void;
  onBack?: () => void;
  onAnonymousEntry?: () => void;
}

export function OpinaHome({ onContinue, onBack, onAnonymousEntry }: OpinaHomeProps) {
  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(0, 151, 57, 0.15) 0%, rgba(254, 221, 0, 0.15) 35%, rgba(0, 39, 118, 0.15) 70%, rgba(0, 151, 57, 0.15) 100%)',
        backgroundColor: '#FFFFFF'
      }}
    >
      {/* Elementos decorativos com blur para criar profundidade - versão clara */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #FEDD00 0%, transparent 70%)',
            filter: 'blur(100px)',
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #009739 0%, transparent 70%)',
            filter: 'blur(100px)',
            transform: 'translate(50%, 50%)'
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, #002776 0%, transparent 70%)',
            filter: 'blur(120px)',
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>

      {/* Overlay sutil para integração */}
      <div className="absolute inset-0 bg-white/40 pointer-events-none"></div>

      {/* Conteúdo */}
      <div className="relative z-10">
        {/* Header com Logo */}
        <div className="container mx-auto px-4 pt-8 pb-6 max-w-md">
          {/* Botão Voltar */}
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-[#666666] hover:text-[#2A2A2A] transition-colors mb-6"
              style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '14px' }}
            >
              <ArrowLeft className="w-5 h-5" />
              Voltar
            </button>
          )}
          
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-4">
              <img 
                src={opinaPlusLogo} 
                alt="Opina+" 
                className="w-full max-w-[140px] h-auto"
                style={{ 
                  marginLeft: '20px',
                  imageRendering: '-webkit-optimize-contrast',
                  WebkitFontSmoothing: 'antialiased',
                  backfaceVisibility: 'hidden',
                  transform: 'translateZ(0)',
                  willChange: 'transform'
                }}
              />
              <div className="w-px h-12 bg-[#E0E0E0]"></div>
              <h1 className="text-[#2A2A2A] text-left" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '22px', lineHeight: '1.2' }}>
                Como<br />Funciona?
              </h1>
            </div>
            <p className="text-[#666666]" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '1.5', maxWidth: '360px', margin: '0 auto' }}>
              Conheça as principais funcionalidades da plataforma
            </p>
          </div>
        </div>

        {/* Features Section - Compacto em Grid */}
        <div className="container mx-auto px-4 pb-6 max-w-md">
          <div className="grid grid-cols-2 gap-3">
            {/* Feature 1 */}
            <Card className="p-4 bg-gradient-to-br from-[#FFC947]/20 via-[#FFD97D]/10 to-white border-2 border-[#FFC947]/30 rounded-lg" style={{ boxShadow: '0px 2px 8px rgba(255, 201, 71, 0.15)' }}>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FFC947] to-[#FFB627] rounded-lg flex items-center justify-center flex-shrink-0" style={{ boxShadow: '0px 2px 6px rgba(255, 201, 71, 0.3)' }}>
                  <span className="text-2xl">🗳️</span>
                </div>
                <div>
                  <h3 className="text-[#2A2A2A]" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '14px' }}>
                    Opine sobre projetos
                  </h3>
                  <p className="text-[#666666]" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '1.4' }}>
                    Vote em projetos de lei e pautas
                  </p>
                </div>
              </div>
            </Card>

            {/* Feature 2 */}
            <Card className="p-4 bg-gradient-to-br from-[#FFC947]/20 via-[#FFD97D]/10 to-white border-2 border-[#FFC947]/30 rounded-lg" style={{ boxShadow: '0px 2px 8px rgba(255, 201, 71, 0.15)' }}>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FFC947] to-[#FFB627] rounded-lg flex items-center justify-center flex-shrink-0" style={{ boxShadow: '0px 2px 6px rgba(255, 201, 71, 0.3)' }}>
                  <span className="text-2xl">📚</span>
                </div>
                <div>
                  <h3 className="text-[#2A2A2A]" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '14px' }}>
                    Educação política
                  </h3>
                  <p className="text-[#666666]" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '1.4' }}>
                    Aprenda sobre processos legislativos
                  </p>
                </div>
              </div>
            </Card>

            {/* Feature 3 */}
            <Card className="p-4 bg-gradient-to-br from-[#FFC947]/20 via-[#FFD97D]/10 to-white border-2 border-[#FFC947]/30 rounded-lg" style={{ boxShadow: '0px 2px 8px rgba(255, 201, 71, 0.15)' }}>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FFC947] to-[#FFB627] rounded-lg flex items-center justify-center flex-shrink-0" style={{ boxShadow: '0px 2px 6px rgba(255, 201, 71, 0.3)' }}>
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="text-[#2A2A2A]" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '14px' }}>
                    Transparência
                  </h3>
                  <p className="text-[#666666]" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '1.4' }}>
                    Gastos públicos e dados em tempo real
                  </p>
                </div>
              </div>
            </Card>

            {/* Feature 4 */}
            <Card className="p-4 bg-gradient-to-br from-[#FFC947]/20 via-[#FFD97D]/10 to-white border-2 border-[#FFC947]/30 rounded-lg" style={{ boxShadow: '0px 2px 8px rgba(255, 201, 71, 0.15)' }}>
              <div className="flex flex-col items-center text-center gap-2">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FFC947] to-[#FFB627] rounded-lg flex items-center justify-center flex-shrink-0" style={{ boxShadow: '0px 2px 6px rgba(255, 201, 71, 0.3)' }}>
                  <img 
                    src={opinAIIcon} 
                    alt="OpinAI" 
                    className="h-auto"
                    style={{ 
                      width: '40px',
                      height: '40px',
                      objectFit: 'contain',
                      imageRendering: '-webkit-optimize-contrast',
                      WebkitFontSmoothing: 'antialiased',
                      backfaceVisibility: 'hidden',
                      transform: 'translateZ(0)',
                      willChange: 'transform'
                    }}
                  />
                </div>
                <div>
                  <h3 className="text-[#2A2A2A]" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '14px' }}>
                    OpinAI
                  </h3>
                  <p className="text-[#666666]" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '1.4' }}>
                    Tire dúvidas com inteligência artificial
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Footer CTA - Compacto */}
        <div className="container mx-auto px-4 pb-8 pt-1 max-w-md">
          <Card className="p-4 text-center space-y-2 bg-white border border-[#E4E4E4] rounded-lg" style={{ boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)' }}>
            <h2 className="text-[#2A2A2A]" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '28px', lineHeight: '1.2' }}>
              Agora é com você! 🫵
            </h2>
            <p className="text-[#666666]" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '1.4' }}>
              Participe ativamente da democracia e ajude a construir decisões mais justas para todos.
            </p>
            <div className="space-y-2.5 pt-1">
              <Button
                onClick={onContinue}
                className="w-full h-11 bg-[#003F7D] hover:bg-[#002a56] text-white shadow-none transition-all duration-200 hover:scale-105"
                style={{ borderRadius: '8px', fontFamily: 'Inter', fontWeight: 500 }}
              >
                Continuar
              </Button>
              {onAnonymousEntry && (
                <>
                  <div className="relative py-1">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-[#E0E0E0]"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-4 bg-white text-[#999999]">ou</span>
                    </div>
                  </div>
                  <button
                    onClick={onAnonymousEntry}
                    className="w-full text-[#666666] hover:text-[#2A2A2A] transition-colors flex items-center justify-center gap-2"
                    style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '14px' }}
                  >
                    <span className="underline">Entrar sem cadastro</span>
                  </button>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}