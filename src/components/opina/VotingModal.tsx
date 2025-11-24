import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { CheckCircle2, TrendingUp } from '../icons';

interface VotingModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'pl' | 'enquete';
  title: string;
  description: string;
}

export function VotingModal({ isOpen, onClose, type, title, description }: VotingModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);

  // Mock voting results
  const plOptions = [
    { id: 'muito', label: 'Muito importante', votes: 1245, percentage: 62 },
    { id: 'relevante', label: 'Relevante', votes: 543, percentage: 27 },
    { id: 'pouco', label: 'Pouco importante', votes: 215, percentage: 11 },
  ];

  const enqueteOptions = [
    { id: 'opcao1', label: 'Projeto com foco em sustentabilidade', votes: 2341, percentage: 58 },
    { id: 'opcao2', label: 'Projeto com mais áreas de lazer', votes: 1234, percentage: 31 },
    { id: 'opcao3', label: 'Projeto com arquitetura moderna', votes: 445, percentage: 11 },
  ];

  const options = type === 'pl' ? plOptions : enqueteOptions;
  const totalVotes = options.reduce((sum, opt) => sum + opt.votes, 0);

  const handleVote = () => {
    if (!selectedOption) return;
    setHasVoted(true);
  };

  const handleClose = () => {
    setSelectedOption(null);
    setHasVoted(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              {type === 'pl' ? 'Votação de PL' : 'Enquete Comunitária'}
            </Badge>
          </div>
          <DialogTitle className="text-left">{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">{description}</p>

          {/* Question */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <p className="font-medium text-foreground">
              {type === 'pl' ? 'Qual a relevância deste projeto para você?' : 'Qual sua opção preferida?'}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => !hasVoted && setSelectedOption(option.id)}
                disabled={hasVoted}
                className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                  selectedOption === option.id && !hasVoted
                    ? 'border-primary bg-primary/5'
                    : hasVoted
                    ? 'border-border cursor-default'
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3 flex-1">
                    {selectedOption === option.id && !hasVoted && (
                      <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <span className="font-medium text-foreground">{option.label}</span>
                  </div>
                  {hasVoted && (
                    <span className="font-semibold text-foreground">{option.percentage}%</span>
                  )}
                </div>
                {hasVoted && (
                  <Progress value={option.percentage} className="h-2" />
                )}
              </button>
            ))}
          </div>

          {/* Results after voting */}
          {hasVoted && (
            <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
              <div className="flex items-start gap-3">
                <TrendingUp className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-foreground mb-1">Voto registrado com sucesso!</p>
                  <p className="text-sm text-muted-foreground">
                    Total de votos: <span className="font-medium">{totalVotes.toLocaleString('pt-BR')}</span> cidadãos participaram
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            {!hasVoted ? (
              <>
                <Button variant="outline" onClick={handleClose} className="flex-1">
                  Cancelar
                </Button>
                <Button
                  onClick={handleVote}
                  disabled={!selectedOption}
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Confirmar voto
                </Button>
              </>
            ) : (
              <Button onClick={handleClose} className="w-full bg-primary hover:bg-primary/90">
                Fechar
              </Button>
            )}
          </div>

          {/* Footer */}
          <div className="text-center pt-2 border-t">
            <p className="text-xs text-muted-foreground">
              Sua participação é anônima e ajuda a orientar decisões públicas
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}