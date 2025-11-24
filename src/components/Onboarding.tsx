import { useState } from 'react';
import { Button } from './ui/button';
import { Check } from 'lucide-react';

interface OnboardingProps {
  onComplete: (interests: string[]) => void;
}

const interests = [
  { id: 'mobility', label: 'Mobilidade Urbana', icon: '🚌', description: 'Transporte e trânsito' },
  { id: 'education', label: 'Educação', icon: '📚', description: 'Escolas e ensino' },
  { id: 'health', label: 'Saúde', icon: '🏥', description: 'Hospitais e atendimento' },
  { id: 'security', label: 'Segurança', icon: '🚓', description: 'Policiamento e ordem' },
  { id: 'environment', label: 'Meio Ambiente', icon: '🌳', description: 'Preservação e sustentabilidade' },
  { id: 'infrastructure', label: 'Infraestrutura', icon: '🏗️', description: 'Obras e construções' },
  { id: 'culture', label: 'Cultura', icon: '🎭', description: 'Arte e eventos' },
  { id: 'social', label: 'Assistência Social', icon: '🤝', description: 'Programas sociais' },
];

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    if (step === 0) {
      setStep(1);
    } else {
      onComplete(selectedInterests);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8">
        {step === 0 ? (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <span className="text-4xl">🏛️</span>
            </div>
            <div>
              <h1 className="text-gray-900 mb-2">Bem-vindo à Plataforma Cívica Digital</h1>
              <p className="text-gray-600">
                Acesse informações públicas, participe de decisões e acompanhe a gestão da sua cidade de forma simples e transparente.
              </p>
            </div>
            <div className="space-y-4 text-left max-w-md mx-auto">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-700">Acompanhe projetos de lei e votações</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-700">Participe de consultas públicas</p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-700">Acesse dados de transparência</p>
                </div>
              </div>
            </div>
            <Button onClick={handleContinue} className="w-full" size="lg">
              Começar
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-gray-900 mb-2">Personalize sua experiência</h2>
              <p className="text-gray-600">
                Selecione os temas que mais interessam você para receber conteúdo personalizado
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {interests.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`p-4 rounded-xl border-2 transition-all text-left ${
                    selectedInterests.includes(interest.id)
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-2xl">{interest.icon}</span>
                    {selectedInterests.includes(interest.id) && (
                      <Check className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-gray-900 mb-1">{interest.label}</p>
                    <p className="text-xs text-gray-500">{interest.description}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(0)} className="flex-1">
                Voltar
              </Button>
              <Button
                onClick={handleContinue}
                disabled={selectedInterests.length === 0}
                className="flex-1"
              >
                {selectedInterests.length === 0
                  ? 'Selecione ao menos um tema'
                  : `Continuar (${selectedInterests.length})`}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
