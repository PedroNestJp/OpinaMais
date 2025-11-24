import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Mail, Lock, Eye, EyeOff, User, ArrowLeft } from '../icons';
import logoImage from 'figma:asset/39a9e75927b809ece9dd0193bc4b5f71704027b2.png';

interface OpinaSignupProps {
  onSignup: () => void;
  onNavigateToLogin: () => void;
  onBack?: () => void;
}

export function OpinaSignup({ onSignup, onNavigateToLogin, onBack }: OpinaSignupProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validações básicas
    if (!termsAccepted) {
      alert('❌ Você precisa aceitar os Termos de Uso e Política de Privacidade');
      return;
    }
    
    if (password !== confirmPassword) {
      alert('❌ As senhas não coincidem');
      return;
    }
    
    if (password.length < 6) {
      alert('❌ A senha deve ter no mínimo 6 caracteres');
      return;
    }

    // Mock signup - em produção, criar conta no backend
    if (name && email && password) {
      onSignup();
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 space-y-6 bg-white border-[#E0E0E0] shadow-sm">
        {/* Botão Voltar */}
        <button
          onClick={onBack || onNavigateToLogin}
          className="flex items-center gap-2 text-[#666666] hover:text-[#2A2A2A] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm">Voltar</span>
        </button>

        {/* Logo e Título */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img src={logoImage} alt="Opina+" className="h-24 w-auto" />
          </div>
          <div>
            <h1 className="text-[#2A2A2A] mb-2" style={{ fontSize: '1.5rem' }}>
              Criar sua conta
            </h1>
            <p className="text-[#666666] text-base">
              Exerça o seu papel na democracia. Sua voz importa.
            </p>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome */}
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm text-[#2A2A2A]">
              Nome completo
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
              <Input
                id="name"
                type="text"
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10 h-12 bg-white border-[#E0E0E0]"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-[#2A2A2A]">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 bg-white border-[#E0E0E0]"
                required
              />
            </div>
          </div>

          {/* Senha */}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-[#2A2A2A]">
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-12 bg-white border-[#E0E0E0]"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#2A2A2A]"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Confirmar Senha */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm text-[#2A2A2A]">
              Confirmar senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#999999]" />
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Digite a senha novamente"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 pr-10 h-12 bg-white border-[#E0E0E0]"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#999999] hover:text-[#2A2A2A]"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Termos de Uso */}
          <div className="flex items-start gap-2 pt-2">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
            />
            <label 
              htmlFor="terms" 
              className="text-sm text-[#666666] leading-tight cursor-pointer"
            >
              Concordo com os{' '}
              <button type="button" className="text-[#008344] hover:text-[#006633] hover:underline">
                Termos de Uso
              </button>
              {' '}e{' '}
              <button type="button" className="text-[#008344] hover:text-[#006633] hover:underline">
                Política de Privacidade
              </button>
              {' '}da plataforma
            </label>
          </div>

          {/* Botão Criar Conta */}
          <Button
            type="submit"
            className="w-full h-12 bg-[#008344] hover:bg-[#006633] text-white shadow-sm"
          >
            Criar conta
          </Button>
        </form>

        {/* Link para login */}
        <p className="text-center text-[#666666] text-sm">
          Já tem uma conta?{' '}
          <button
            onClick={onNavigateToLogin}
            className="text-[#008344] hover:text-[#006633]"
          >
            Entrar
          </button>
        </p>

        {/* Info sobre privacidade */}
        <p className="text-xs text-center text-[#999999]">
          Ao criar sua conta, você concorda com nossos{' '}
          <button className="text-[#008344] hover:text-[#006633]">Termos de Uso</button>
          {' '}e{' '}
          <button className="text-[#008344] hover:text-[#006633]">Política de Privacidade</button>
        </p>
      </Card>
    </div>
  );
}