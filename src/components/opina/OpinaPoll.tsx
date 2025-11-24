import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Checkbox } from '../ui/checkbox';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { CheckCircle2, Clock, Users, Info, Lock, BarChart3 } from '../icons';

interface PollOption {
  id: string;
  text: string;
  votes: number;
}

interface Poll {
  id: string;
  type: 'multiple-choice' | 'scale' | 'multiple-select' | 'approval';
  title: string;
  description: string;
  options?: PollOption[];
  maxSelections?: number; // Para múltipla escolha com limite
  minScale?: number;
  maxScale?: number;
  allowComment: boolean;
  startDate: string;
  endDate: string;
  totalVoters: number;
  category: string;
  source: string;
  resultsUsage: string;
}

interface OpinaPollProps {
  poll: Poll;
  userHasVoted: boolean;
  onVote: (pollId: string, response: any) => void;
  isAnonymous?: boolean;
}

export function OpinaPoll({ poll, userHasVoted, onVote, isAnonymous }: OpinaPollProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [scaleValue, setScaleValue] = useState<number | null>(null);
  const [comment, setComment] = useState('');
  const [showResults, setShowResults] = useState(false); // Agora inicia sempre como false
  const [hasVotedNow, setHasVotedNow] = useState(false);

  // Validar período de votação
  const now = new Date();
  const startDate = new Date(poll.startDate.split('/').reverse().join('-'));
  const endDate = new Date(poll.endDate.split('/').reverse().join('-'));
  const isActive = now >= startDate && now <= endDate;
  const hasEnded = now > endDate;
  const hasNotStarted = now < startDate;

  const categoryInfo: Record<string, { label: string; color: string }> = {
    mobility: { label: 'Mobilidade', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    environment: { label: 'Meio Ambiente', color: 'bg-green-100 text-green-700 border-green-200' },
    health: { label: 'Saúde', color: 'bg-red-100 text-red-700 border-red-200' },
    infrastructure: { label: 'Obras', color: 'bg-orange-100 text-orange-700 border-orange-200' },
    education: { label: 'Educação', color: 'bg-purple-100 text-purple-700 border-purple-200' },
  };

  const category = categoryInfo[poll.category] || { label: 'Geral', color: 'bg-gray-100 text-gray-700 border-gray-200' };

  const handleMultipleChoiceToggle = (optionId: string) => {
    if (poll.type === 'multiple-choice') {
      setSelectedOptions([optionId]);
    } else if (poll.type === 'multiple-select') {
      const isSelected = selectedOptions.includes(optionId);
      if (isSelected) {
        setSelectedOptions(selectedOptions.filter(id => id !== optionId));
      } else {
        if (poll.maxSelections && selectedOptions.length >= poll.maxSelections) {
          alert(`Você pode selecionar no máximo ${poll.maxSelections} opções`);
          return;
        }
        setSelectedOptions([...selectedOptions, optionId]);
      }
    }
  };

  const handleScaleSelect = (value: number) => {
    setScaleValue(value);
  };

  const handleSubmitVote = () => {
    if (poll.type === 'multiple-choice' || poll.type === 'multiple-select') {
      if (selectedOptions.length === 0) {
        alert('Por favor, selecione ao menos uma opção');
        return;
      }
    } else if (poll.type === 'scale') {
      if (scaleValue === null) {
        alert('Por favor, selecione uma pontuação');
        return;
      }
    }

    const response = {
      type: poll.type,
      selectedOptions: poll.type !== 'scale' ? selectedOptions : undefined,
      scaleValue: poll.type === 'scale' ? scaleValue : undefined,
      comment: comment.trim() || undefined,
    };

    onVote(poll.id, response);
    setShowResults(true);
    setHasVotedNow(true);
  };

  const calculatePercentage = (votes: number): number => {
    if (poll.totalVoters === 0) return 0;
    return Math.round((votes / poll.totalVoters) * 100);
  };

  const getScaleResults = () => {
    if (poll.type !== 'scale' || !poll.minScale || !poll.maxScale) return [];
    
    // Mock: distribuição de votos na escala
    const distribution = [
      { value: 1, votes: Math.floor(poll.totalVoters * 0.1) },
      { value: 2, votes: Math.floor(poll.totalVoters * 0.15) },
      { value: 3, votes: Math.floor(poll.totalVoters * 0.25) },
      { value: 4, votes: Math.floor(poll.totalVoters * 0.30) },
      { value: 5, votes: Math.floor(poll.totalVoters * 0.20) },
    ];
    
    return distribution;
  };

  const getAverageScale = () => {
    const distribution = getScaleResults();
    const total = distribution.reduce((sum, d) => sum + (d.value * d.votes), 0);
    const count = distribution.reduce((sum, d) => sum + d.votes, 0);
    return count > 0 ? (total / count).toFixed(1) : '0';
  };

  // Renderizar status da enquete
  const renderPollStatus = () => {
    if (hasEnded) {
      return (
        <Badge variant="outline" className="border-gray-300 bg-gray-100 text-gray-700">
          Encerrada • {poll.endDate}
        </Badge>
      );
    }
    if (hasNotStarted) {
      return (
        <Badge variant="outline" className="border-yellow-300 bg-yellow-100 text-yellow-700">
          <Clock className="w-3 h-3 mr-1" />
          Inicia em {poll.startDate}
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="border-green-300 bg-green-100 text-green-700">
        ✓ Ativa até {poll.endDate}
      </Badge>
    );
  };

  // Renderizar formulário de votação
  const renderVotingForm = () => {
    if (!isActive) return null;
    if (showResults) return null;

    return (
      <div className="space-y-4">
        {/* Múltipla escolha ou seleção múltipla */}
        {(poll.type === 'multiple-choice' || poll.type === 'multiple-select') && poll.options && (
          <div className="space-y-3">
            {poll.type === 'multiple-select' && poll.maxSelections && (
              <p className="text-sm text-muted-foreground">
                Selecione até {poll.maxSelections} opções
              </p>
            )}
            {poll.options.map((option) => {
              const isSelected = selectedOptions.includes(option.id);
              return (
                <button
                  key={option.id}
                  onClick={() => handleMultipleChoiceToggle(option.id)}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-muted hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {poll.type === 'multiple-select' ? (
                      <Checkbox checked={isSelected} className="mt-1" />
                    ) : (
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                        isSelected ? 'border-primary' : 'border-muted-foreground'
                      }`}>
                        {isSelected && (
                          <div className="w-3 h-3 rounded-full bg-primary"></div>
                        )}
                      </div>
                    )}
                    <span className="text-foreground flex-1">{option.text}</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Escala */}
        {poll.type === 'scale' && poll.minScale !== undefined && poll.maxScale !== undefined && (
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <span className="text-sm text-muted-foreground">Discordo totalmente</span>
              <span className="text-sm text-muted-foreground">Concordo totalmente</span>
            </div>
            <div className="flex justify-between gap-2">
              {Array.from({ length: poll.maxScale - poll.minScale + 1 }, (_, i) => i + poll.minScale).map((value) => (
                <button
                  key={value}
                  onClick={() => handleScaleSelect(value)}
                  className={`flex-1 h-16 rounded-lg border-2 transition-all font-semibold ${
                    scaleValue === value
                      ? 'border-primary bg-primary text-white'
                      : 'border-muted hover:border-primary/50 text-foreground'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Comentário opcional */}
        {poll.allowComment && (
          <div className="space-y-2">
            <label className="text-sm text-foreground">
              Comentário (opcional)
            </label>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Compartilhe sua opinião..."
              className="min-h-[100px]"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {comment.length}/500 caracteres
            </p>
          </div>
        )}

        {/* Aviso de voto anônimo */}
        <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Lock className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-blue-900">
            <strong>Voto anônimo:</strong> Sua identidade não será vinculada à resposta. Você poderá votar apenas uma vez.
          </div>
        </div>

        {/* Botão de envio */}
        <Button
          onClick={handleSubmitVote}
          className="w-full h-12 bg-primary hover:bg-primary/90"
          disabled={
            (poll.type !== 'scale' && selectedOptions.length === 0) ||
            (poll.type === 'scale' && scaleValue === null)
          }
        >
          Enviar voto
        </Button>
      </div>
    );
  };

  // Renderizar resultados
  const renderResults = () => {
    if (!showResults) return null;

    return (
      <div className="space-y-5">
        {/* Feedback pós-voto */}
        {hasVotedNow && (
          <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-900 mb-1">
                ✓ Voto registrado com sucesso!
              </p>
              <p className="text-sm text-green-800">
                Obrigado pela sua participação! Sua voz é fundamental para moldarmos juntos as prioridades da nossa cidade e construirmos um futuro mais democrático e participativo.
              </p>
            </div>
          </div>
        )}

        {/* Resultados de múltipla escolha */}
        {(poll.type === 'multiple-choice' || poll.type === 'multiple-select') && poll.options && (
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground">Distribuição de votos:</h4>
            {poll.options
              .sort((a, b) => b.votes - a.votes)
              .map((option) => {
                const percentage = calculatePercentage(option.votes);
                const isUserChoice = selectedOptions.includes(option.id);
                
                return (
                  <div key={option.id} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground flex items-center gap-2">
                        {option.text}
                        {isUserChoice && (
                          <Badge variant="outline" className="text-xs bg-primary/10 border-primary">
                            Seu voto
                          </Badge>
                        )}
                      </span>
                      <span className="font-semibold text-foreground">
                        {percentage}%
                      </span>
                    </div>
                    <Progress value={percentage} className="h-3" />
                    <p className="text-xs text-muted-foreground">
                      {option.votes.toLocaleString()} votos
                    </p>
                  </div>
                );
              })}
          </div>
        )}

        {/* Resultados de escala */}
        {poll.type === 'scale' && (
          <div className="space-y-4">
            <div className="text-center p-6 bg-primary/5 rounded-lg border-2 border-primary">
              <p className="text-sm text-muted-foreground mb-2">Média geral</p>
              <p className="text-5xl font-bold text-primary mb-1">
                {getAverageScale()}
              </p>
              <p className="text-sm text-muted-foreground">
                de {poll.maxScale}
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Distribuição:</h4>
              {getScaleResults().map((item) => {
                const percentage = calculatePercentage(item.votes);
                const isUserChoice = scaleValue === item.value;
                
                return (
                  <div key={item.value} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground flex items-center gap-2">
                        {item.value} {item.value === poll.minScale ? '⭐' : item.value === poll.maxScale ? '⭐⭐⭐⭐⭐' : ''}
                        {isUserChoice && (
                          <Badge variant="outline" className="text-xs bg-primary/10 border-primary">
                            Seu voto
                          </Badge>
                        )}
                      </span>
                      <span className="font-semibold text-foreground">
                        {percentage}%
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    <p className="text-xs text-muted-foreground">
                      {item.votes.toLocaleString()} votos
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Como os resultados serão usados */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
          <div className="text-sm">
            <p className="font-semibold text-blue-900 mb-1">
              Como seus resultados serão usados:
            </p>
            <p className="text-blue-800">
              {poll.resultsUsage}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Card className="overflow-hidden border-l-4 border-l-primary">
      <div className="p-6 space-y-4">
        {/* Header */}
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <Badge variant="outline" className={`border ${category.color}`}>
              {category.label}
            </Badge>
            {renderPollStatus()}
          </div>
          
          <div>
            <h3 className="text-foreground mb-2">📊 {poll.title}</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              {poll.description}
            </p>
          </div>

          {/* Meta info */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            <span>{poll.source}</span>
            <span>•</span>
            <Clock className="w-4 h-4" />
            <span>
              {hasEnded ? 'Encerrada' : hasNotStarted ? 'Aguardando início' : `Termina em ${poll.endDate}`}
            </span>
          </div>
        </div>

        {/* Aviso de enquete não iniciada */}
        {hasNotStarted && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-center">
            <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-sm text-yellow-900">
              Esta enquete ainda não foi iniciada. Volte em <strong>{poll.startDate}</strong>
            </p>
          </div>
        )}

        {/* Formulário de votação */}
        {renderVotingForm()}

        {/* Resultados - Seção com ID para scroll */}
        <div id={`poll-results-${poll.id}`}>
          {renderResults()}
        </div>

        {/* Botão "Ver Andamento" - Aparece quando não está mostrando resultados */}
        {!showResults && (
          <Button
            onClick={() => setShowResults(true)}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-primary text-primary hover:bg-primary hover:text-white"
          >
            <BarChart3 className="w-5 h-5" />
            Ver Andamento
          </Button>
        )}

        {/* Ocultar Andamento - Aparece quando está mostrando resultados e não votou agora */}
        {showResults && !hasVotedNow && (
          <Button
            onClick={() => setShowResults(false)}
            variant="outline"
            className="w-full"
          >
            Ocultar Andamento
          </Button>
        )}
      </div>
    </Card>
  );
}