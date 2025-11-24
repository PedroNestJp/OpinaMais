import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { MessageCircle, BookOpen, Volume2, Check } from '../icons';
import { Logo } from '../Logo';

interface OpinaOnboardingProps {
  onComplete: (interests: string[], audioPreference: boolean) => void;
}

const interests = [
  { id: 'education', label: 'Educação', icon: '📚' },
  { id: 'health', label: 'Saúde', icon: '🏥' },
  { id: 'mobility', label: 'Mobilidade', icon: '🚗' },
  { id: 'security', label: 'Segurança', icon: '🛡️' },
  { id: 'infrastructure', label: 'Obras', icon: '🏗️' },
  { id: 'environment', label: 'Meio Ambiente', icon: '🌳' },
  { id: 'culture', label: 'Cultura', icon: '🎭' },
  { id: 'social', label: 'Assistência Social', icon: '🤝' },
];

export function OpinaOnboarding({ onComplete }: OpinaOnboardingProps) {
  const [step, setStep] = useState(1); // Começa direto no step 1 (preferência de acesso)
  const [audioPreference, setAudioPreference] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleComplete = () => {
    if (selectedInterests.length > 0) {
      onComplete(selectedInterests, audioPreference);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Tela 1 - Preferência de Acesso */}
        {step === 1 && (
          <Card className="p-8 md:p-12 shadow-xl">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-foreground mb-3">Como você prefere receber as informações?</h2>
                <p className="text-muted-foreground">
                  Personalize sua experiência escolhendo o formato mais confortável para você
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                <button
                  onClick={() => setAudioPreference(false)}
                  className={`p-8 rounded-2xl border-3 transition-all ${
                    !audioPreference
                      ? 'border-primary bg-primary/10 shadow-lg scale-105'
                      : 'border-border hover:border-primary/50 hover:shadow-md'
                  }`}
                >
                  <BookOpen className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-foreground mb-2">📝 Ler</h3>
                  <p className="text-muted-foreground">
                    Vou ler os textos na tela
                  </p>
                  {!audioPreference && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-primary">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">Selecionado</span>
                    </div>
                  )}
                </button>
                
                <button
                  onClick={() => setAudioPreference(true)}
                  className={`p-8 rounded-2xl border-3 transition-all ${
                    audioPreference
                      ? 'border-primary bg-primary/10 shadow-lg scale-105'
                      : 'border-border hover:border-primary/50 hover:shadow-md'
                  }`}
                >
                  <Volume2 className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-foreground mb-2">🔊 Ouvir</h3>
                  <p className="text-muted-foreground">
                    Prefiro ouvir as informações
                  </p>
                  {audioPreference && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-primary">
                      <Check className="w-5 h-5" />
                      <span className="font-medium">Selecionado</span>
                    </div>
                  )}
                </button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Você pode alterar depois no perfil
              </p>

              <Button 
                onClick={() => setStep(2)} 
                className="w-full bg-primary hover:bg-primary/90 h-14"
              >
                Continuar
              </Button>
            </div>
          </Card>
        )}

        {/* Tela 2 - Escolha de Interesses */}
        {step === 2 && (
          <Card className="p-6 md:p-8 shadow-xl max-w-lg mx-auto">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-foreground mb-3">Escolha seus temas de interesse</h2>
                <p className="text-muted-foreground text-sm">
                  Selecione ao menos um tema para personalizar seu feed
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {interests.map((interest) => (
                  <button
                    key={interest.id}
                    onClick={() => toggleInterest(interest.id)}
                    className={`p-4 rounded-xl border-2 transition-all relative ${ 
                      selectedInterests.includes(interest.id)
                        ? 'border-primary bg-primary/10 shadow-md'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {selectedInterests.includes(interest.id) && (
                      <div className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className="text-3xl mb-2">{interest.icon}</div>
                    <p className="text-sm font-medium text-foreground">{interest.label}</p>
                  </button>
                ))}
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setStep(1)} 
                  className="flex-1 h-12"
                >
                  Voltar
                </Button>
                <Button
                  onClick={handleComplete}
                  disabled={selectedInterests.length === 0}
                  className="flex-1 bg-primary hover:bg-primary/90 h-12 disabled:opacity-50"
                >
                  {selectedInterests.length === 0
                    ? 'Selecione 1 tema'
                    : `Confirmar (${selectedInterests.length})`}
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}