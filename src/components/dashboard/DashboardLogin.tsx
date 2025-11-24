import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { ArrowLeft, Crown, Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface DashboardLoginProps {
  onBack: () => void;
  onLoginSuccess: () => void;
}

// Credenciais de demo (em produção, isso viria de uma API)
const DEMO_CREDENTIALS = {
  email: 'assinante@opina.com.br',
  password: 'premium2025'
};

export function DashboardLogin({ onBack, onLoginSuccess }: DashboardLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simular chamada de API
    setTimeout(() => {
      if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
        onLoginSuccess();
      } else {
        setError('Email ou senha incorretos. Tente novamente.');
      }
      setIsLoading(false);
    }, 800);
  };

  const fillDemoCredentials = () => {
    setEmail(DEMO_CREDENTIALS.email);
    setPassword(DEMO_CREDENTIALS.password);
    setError('');
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#003F7D] to-[#002a56] text-white py-4 px-4">
        <div className="container mx-auto max-w-md">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '14px' }}>
              Voltar
            </span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Premium Badge */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-br from-[#FFC947] to-[#FFB84D] rounded-2xl flex items-center justify-center shadow-lg">
              <Crown className="w-10 h-10 text-[#003F7D]" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 
              className="text-[#2A2A2A] mb-2"
              style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '28px' }}
            >
              Dashboard Premium
            </h1>
            <p 
              className="text-[#666666]"
              style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '15px', lineHeight: '1.5' }}
            >
              Acesso exclusivo para assinantes
            </p>
          </div>

          {/* Login Form */}
          <div className="bg-white rounded-2xl border border-[#E4E4E4] p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Field */}
              <div>
                <Label 
                  htmlFor="email"
                  className="text-[#2A2A2A] mb-2 block"
                  style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '13px' }}
                >
                  Email
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seu@email.com"
                    className="pl-11 h-12 border-[#E4E4E4] focus:border-[#003F7D] focus:ring-[#003F7D]"
                    style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px' }}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <Label 
                  htmlFor="password"
                  className="text-[#2A2A2A] mb-2 block"
                  style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '13px' }}
                >
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="pl-11 pr-11 h-12 border-[#E4E4E4] focus:border-[#003F7D] focus:ring-[#003F7D]"
                    style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px' }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#666666] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-start gap-2 p-3 bg-[#E5484D]/10 border border-[#E5484D]/30 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-[#E5484D] flex-shrink-0 mt-0.5" />
                  <p 
                    className="text-[#E5484D]"
                    style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '13px', lineHeight: '1.5' }}
                  >
                    {error}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#003F7D] hover:bg-[#002a56] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '15px' }}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verificando...
                  </span>
                ) : (
                  'Acessar Dashboard'
                )}
              </Button>
            </form>

            {/* Forgot Password */}
            <div className="mt-4 text-center">
              <button
                type="button"
                className="text-[#003F7D] hover:text-[#002a56] transition-colors"
                style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '13px' }}
              >
                Esqueci minha senha
              </button>
            </div>
          </div>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-[#FFC947]/10 border-2 border-[#FFC947]/30 rounded-xl">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 bg-[#FFC947] rounded-lg flex items-center justify-center flex-shrink-0">
                <Crown className="w-4 h-4 text-[#003F7D]" />
              </div>
              <div className="flex-1">
                <h3 
                  className="text-[#2A2A2A] mb-1"
                  style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '13px' }}
                >
                  💡 Modo Demonstração
                </h3>
                <p 
                  className="text-[#666666] mb-2"
                  style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '1.5' }}
                >
                  Use as credenciais abaixo para acessar o Dashboard Premium:
                </p>
                <div 
                  className="bg-white/80 rounded-lg p-2.5 mb-2 font-mono"
                  style={{ fontSize: '11px' }}
                >
                  <p className="text-[#003F7D] mb-1">
                    <strong>Email:</strong> {DEMO_CREDENTIALS.email}
                  </p>
                  <p className="text-[#003F7D]">
                    <strong>Senha:</strong> {DEMO_CREDENTIALS.password}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="text-[#003F7D] hover:text-[#002a56] transition-colors underline"
                  style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '12px' }}
                >
                  Preencher automaticamente →
                </button>
              </div>
            </div>
          </div>

          {/* Not a Subscriber */}
          <div className="mt-6 text-center">
            <p 
              className="text-[#666666] mb-2"
              style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '13px' }}
            >
              Não é assinante ainda?
            </p>
            <Button
              variant="outline"
              className="border-[#FFC947] text-[#FFC947] hover:bg-[#FFC947]/5"
              style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
            >
              <Crown className="w-4 h-4 mr-2" />
              Assinar Opina+ Premium
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
