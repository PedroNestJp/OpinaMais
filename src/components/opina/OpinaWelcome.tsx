import { Button } from '../ui/button';
import opinaPlusLogo from 'figma:asset/b2d65caa40516ef90910feb7f464ae3b4989ab35.png';
import backgroundImage from 'figma:asset/1e0b4f912da8bd352d4a41f0ef65e46d87cfea98.png';

interface OpinaWelcomeProps {
  onCreateAccount: () => void;
  onHaveAccount: () => void;
  onViewDashboard?: () => void;
}

export function OpinaWelcome({ onCreateAccount, onHaveAccount, onViewDashboard }: OpinaWelcomeProps) {
  return (
    <div 
      className="min-h-screen bg-white flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'contain',
        backgroundPosition: 'bottom center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Listra verde superior */}
      <div 
        className="absolute top-0 left-0 right-0 h-3" 
        style={{ background: 'linear-gradient(90deg, #008344 0%, #00a855 100%)' }}
      />
      
      <div className="container mx-auto px-4 max-w-md relative z-10" style={{ marginTop: '-60px' }}>
        <div className="text-center space-y-3">
          {/* Texto principal - acima da logo */}
          <h1 className="text-[#1C1C1E] text-center" style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '20px', lineHeight: '1.3', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Participe das decisões<br />que impactam a sua vida
          </h1>

          {/* Logo */}
          <div className="flex flex-col items-center justify-center gap-3">
            <img 
              src={opinaPlusLogo} 
              alt="Opina+" 
              className="w-full max-w-[380px] h-auto mx-auto"
              style={{ 
                marginLeft: '20px',
                imageRendering: '-webkit-optimize-contrast',
                WebkitFontSmoothing: 'antialiased',
                backfaceVisibility: 'hidden',
                transform: 'translateZ(0)',
                willChange: 'transform'
              }}
            />
            
            {/* Texto secundário - abaixo da logo */}
            <p className="text-[#6A6A6A] text-center" style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '16px', lineHeight: '1.5', marginTop: '-8px' }}>
              Vote em projetos, compartilhe com amigos e<br />influenciem juntos o futuro do país.
            </p>
          </div>

          {/* Descrição */}
          <div className="pt-1"></div>

          {/* Botões de autenticação */}
          <div className="space-y-3 pt-0" style={{ maxWidth: '90%', margin: '0 auto' }}>
            <Button
              onClick={onCreateAccount}
              className="w-full h-14 bg-[#003F7D] hover:bg-[#002a56] text-white shadow-none transition-all duration-200 hover:scale-105"
              style={{ borderRadius: '8px', fontFamily: 'Inter', fontWeight: 500 }}
            >
              Sou Cidadão Ativo
            </Button>
            <Button
              onClick={onHaveAccount}
              variant="outline"
              className="w-full h-14 bg-white border border-[#CCCCCC] text-[#2A2A2A] hover:bg-[#E8E8E8] shadow-none transition-all duration-200 hover:scale-105"
              style={{ borderRadius: '8px', fontFamily: 'Inter', fontWeight: 500 }}
            >
              Quero Participar
            </Button>
            
            {/* Dashboard Demo Button */}
            {onViewDashboard && (
              <Button
                onClick={onViewDashboard}
                className="w-full h-12 bg-[#FFC947] hover:bg-[#FFB627] text-[#2A2A2A] shadow-sm transition-all duration-300 hover:scale-110"
                style={{ borderRadius: '8px', fontFamily: 'Inter', fontWeight: 600, fontSize: '13px' }}
              >
                👑 Ver Demo: Dashboard Premium
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}