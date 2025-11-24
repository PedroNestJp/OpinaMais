import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from '../icons';
import opinaPlusLogo from 'figma:asset/b2d65caa40516ef90910feb7f464ae3b4989ab35.png';

interface OpinaLoginProps {
  onLogin: () => void;
  onNavigateToSignup: () => void;
  onSkip: () => void;
  onBack?: () => void;
  onAnonymousLogin?: () => void;
}

export function OpinaLogin({ onLogin, onNavigateToSignup, onSkip, onBack, onAnonymousLogin }: OpinaLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - em produção, validar com backend
    if (email && password) {
      onLogin();
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #009739 0%, #FEDD00 35%, #002776 70%, #009739 100%)'
      }}
    >
      {/* Elementos decorativos com blur para criar profundidade */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, #FEDD00 0%, transparent 70%)',
            filter: 'blur(80px)',
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-40"
          style={{
            background: 'radial-gradient(circle, #009739 0%, transparent 70%)',
            filter: 'blur(80px)',
            transform: 'translate(50%, 50%)'
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, #002776 0%, transparent 70%)',
            filter: 'blur(100px)',
            transform: 'translate(-50%, -50%)'
          }}
        />
      </div>

      {/* Overlay para melhorar legibilidade */}
      <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
      
      <Card className="w-full max-w-[340px] p-5 space-y-3 bg-white/85 backdrop-blur-md border-[#E0E0E0] shadow-lg relative z-10">
        {/* Botão Voltar */}
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#666666] hover:text-[#2A2A2A] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs">Voltar</span>
          </button>
        )}

        {/* Logo e Título */}
        <div className="text-center space-y-1.5">
          <h1 className="text-[#2A2A2A]" style={{ fontSize: '1.5rem', fontWeight: 700 }}>
            👋 Olá, cidadão!
          </h1>
          <p className="text-[#666666] text-sm">
            Insira seu e-mail e senha. Faça sua voz valer.
          </p>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-2.5">
          {/* Email */}
          <div className="space-y-1">
            <label htmlFor="email" className="text-xs text-[#2A2A2A]">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-9 h-10 bg-white border-[#E0E0E0] text-sm"
                required
              />
            </div>
          </div>

          {/* Senha */}
          <div className="space-y-1">
            <label htmlFor="password" className="text-xs text-[#2A2A2A]">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#999999]" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-9 pr-9 h-10 bg-white border-[#E0E0E0] text-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#2A2A2A]"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Esqueceu a senha */}
          <div className="text-right">
            <button
              type="button"
              className="text-xs text-[#008344] hover:text-[#006633]"
              onClick={() => alert('Em produção: fluxo de recuperação de senha')}
            >
              Esqueceu a senha?
            </button>
          </div>

          {/* Botão Entrar */}
          <Button
            type="submit"
            className="w-full h-10 bg-[#008344] hover:bg-[#006633] text-white shadow-sm text-sm"
          >
            Entrar
          </Button>
        </form>

        {/* Continuar sem cadastro */}
        <div className="text-center">
          <button
            type="button"
            className="text-[#666666] underline text-xs hover:text-[#2A2A2A]"
            onClick={onSkip}
          >
            Continuar sem cadastro
          </button>
        </div>

        {/* Divider */}
        <div className="relative py-0.5">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E0E0E0]"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white text-[#999999]">ou</span>
          </div>
        </div>

        {/* Criar conta */}
        <div>
          <Button
            type="button"
            variant="outline"
            className="w-full h-10 bg-white border-[#E0E0E0] text-[#2A2A2A] hover:bg-[#FAFAFA] text-sm"
            onClick={onNavigateToSignup}
          >
            Criar nova conta
          </Button>
        </div>
      </Card>
    </div>
  );
}