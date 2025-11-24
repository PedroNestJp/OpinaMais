import { Crown, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';

interface DashboardAccessButtonProps {
  onClick: () => void;
  variant?: 'default' | 'compact';
}

export function DashboardAccessButton({ onClick, variant = 'default' }: DashboardAccessButtonProps) {
  if (variant === 'compact') {
    return (
      <button
        onClick={onClick}
        className="w-full flex items-center gap-3 p-4 bg-gradient-to-br from-[#FFC947]/20 to-[#FFC947]/5 hover:from-[#FFC947]/30 hover:to-[#FFC947]/10 border-2 border-[#FFC947]/40 hover:border-[#FFC947] rounded-lg transition-all group"
      >
        <div className="w-12 h-12 bg-[#FFC947] rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
          <Crown className="w-6 h-6 text-[#003F7D]" />
        </div>
        <div className="flex-1 text-left">
          <div className="flex items-center gap-2 mb-1">
            <span 
              className="text-[#2A2A2A]"
              style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '15px' }}
            >
              Dashboard do Assinante
            </span>
            <span 
              className="px-2 py-0.5 bg-[#FFC947] text-[#003F7D] rounded-full text-xs"
              style={{ fontFamily: 'Inter', fontWeight: 700 }}
            >
              PREMIUM
            </span>
          </div>
          <p 
            className="text-[#666666]"
            style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px' }}
          >
            Ver métricas e gerar relatórios
          </p>
        </div>
        <span className="text-[#FFC947] text-xl">→</span>
      </button>
    );
  }

  return (
    <div className="bg-gradient-to-br from-[#003F7D] to-[#002a56] rounded-2xl p-6 shadow-lg border-2 border-[#FFC947]/30">
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 bg-[#FFC947] rounded-xl flex items-center justify-center shadow-md">
          <Crown className="w-7 h-7 text-[#003F7D]" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 
              className="text-white"
              style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '18px' }}
            >
              Dashboard Premium
            </h3>
            <span 
              className="px-2.5 py-1 bg-[#FFC947] text-[#003F7D] rounded-full"
              style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '11px' }}
            >
              ASSINANTE
            </span>
          </div>
          <p 
            className="text-white/90"
            style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '1.5' }}
          >
            Acesse métricas detalhadas, gere relatórios e acompanhe o desempenho da plataforma
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1">
            <TrendingUp className="w-4 h-4 text-[#FFC947]" />
            <span 
              className="text-white"
              style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '16px' }}
            >
              47K
            </span>
          </div>
          <p 
            className="text-white/80"
            style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '11px' }}
          >
            Participantes
          </p>
        </div>
        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">📊</span>
            <span 
              className="text-white"
              style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '16px' }}
            >
              142K
            </span>
          </div>
          <p 
            className="text-white/80"
            style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '11px' }}
          >
            Visualizações
          </p>
        </div>
        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">📈</span>
            <span 
              className="text-white"
              style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '16px' }}
            >
              65%
            </span>
          </div>
          <p 
            className="text-white/80"
            style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '11px' }}
          >
            Engajamento
          </p>
        </div>
      </div>

      <Button
        onClick={onClick}
        className="w-full h-12 bg-[#FFC947] hover:bg-[#FFD97D] text-[#003F7D] shadow-md hover:shadow-lg transition-all"
        style={{ fontFamily: 'Inter', fontWeight: 700 }}
      >
        Acessar Dashboard Premium
      </Button>
    </div>
  );
}
