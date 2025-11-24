import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Label } from '../ui/label';
import { Progress } from '../ui/progress';

interface PLVotingModalProps {
  open: boolean;
  onClose: () => void;
  plTitle: string;
  plNumber: string;
  plSummary: string;
}

export function PLVotingModal({ open, onClose, plTitle, plNumber, plSummary }: PLVotingModalProps) {
  const [voted, setVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleVote = () => {
    if (selectedOption) {
      setVoted(true);
    }
  };

  const results = {
    'muito-importante': { label: 'Muito importante', votes: 1542, percentage: 68 },
    'relevante': { label: 'Relevante', votes: 583, percentage: 26 },
    'pouco-importante': { label: 'Pouco importante', votes: 136, percentage: 6 },
  };

  const totalParticipants = Object.values(results).reduce((acc, r) => acc + r.votes, 0);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Votação de PL</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* PL Info */}
          <div className="space-y-2">
            <div className="text-sm text-primary font-semibold">{plNumber}</div>
            <h3 className="text-foreground text-lg">{plTitle}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{plSummary}</p>
          </div>

          {!voted ? (
            <>
              {/* Voting Question */}
              <div className="space-y-4">
                <p className="text-foreground">
                  Em que grau de importância você considera este PL?
                </p>

                <RadioGroup value={selectedOption} onValueChange={setSelectedOption}>
                  <div className="flex items-center space-x-2 p-4 rounded-lg border-2 border-border hover:border-primary cursor-pointer">
                    <RadioGroupItem value="muito-importante" id="muito-importante" />
                    <Label htmlFor="muito-importante" className="flex-1 cursor-pointer">
                      Muito importante
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-4 rounded-lg border-2 border-border hover:border-primary cursor-pointer">
                    <RadioGroupItem value="relevante" id="relevante" />
                    <Label htmlFor="relevante" className="flex-1 cursor-pointer">
                      Relevante
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-4 rounded-lg border-2 border-border hover:border-primary cursor-pointer">
                    <RadioGroupItem value="pouco-importante" id="pouco-importante" />
                    <Label htmlFor="pouco-importante" className="flex-1 cursor-pointer">
                      Pouco importante
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button 
                  onClick={handleVote}
                  disabled={!selectedOption}
                  className="flex-1 bg-primary hover:bg-primary/90 h-12"
                >
                  Enviar voto
                </Button>
                <Button 
                  variant="outline"
                  onClick={onClose}
                  className="h-12"
                >
                  Cancelar
                </Button>
              </div>

              <button
                onClick={onClose}
                className="w-full text-center text-sm text-primary hover:underline"
              >
                Ver detalhes do PL
              </button>
            </>
          ) : (
            <>
              {/* Results */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-center">
                  ✓ Seu voto foi registrado com sucesso!
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-foreground">Resultados da votação</h4>

                {Object.entries(results).map(([key, result]) => (
                  <div key={key} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className={`${selectedOption === key ? 'text-primary font-semibold' : 'text-muted-foreground'}`}>
                        {result.label}
                      </span>
                      <span className="text-foreground font-semibold">{result.percentage}%</span>
                    </div>
                    <Progress value={result.percentage} className="h-3" />
                    <p className="text-xs text-muted-foreground">{result.votes.toLocaleString('pt-BR')} votos</p>
                  </div>
                ))}
              </div>

              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{totalParticipants.toLocaleString('pt-BR')}</span> pessoas participaram desta votação
                </p>
              </div>

              <Button 
                onClick={onClose}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Fechar
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
