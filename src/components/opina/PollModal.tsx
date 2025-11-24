import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Progress } from '../ui/progress';
import { Clock, Users, Shield } from '../icons';

interface PollOption {
  id: string;
  label: string;
  votes?: number;
  percentage?: number;
}

interface PollModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  type: 'single' | 'multiple' | 'scale';
  options: PollOption[];
  allowComment?: boolean;
  endDate?: string;
  maxSelections?: number;
}

export function PollModal({ 
  open, 
  onClose, 
  title, 
  type, 
  options,
  allowComment = false,
  endDate = '30/11/2024',
  maxSelections = 2
}: PollModalProps) {
  const [voted, setVoted] = useState(false);
  const [selectedSingle, setSelectedSingle] = useState<string>('');
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);
  const [scaleValue, setScaleValue] = useState<number>(0);
  const [comment, setComment] = useState('');

  const handleVote = () => {
    if (type === 'single' && selectedSingle) {
      setVoted(true);
    } else if (type === 'multiple' && selectedMultiple.length > 0) {
      setVoted(true);
    } else if (type === 'scale' && scaleValue > 0) {
      setVoted(true);
    }
  };

  const canSelectMore = type === 'multiple' && selectedMultiple.length < maxSelections;
  const totalVotes = options.reduce((acc, opt) => acc + (opt.votes || 0), 0);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Enquete</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          {/* Poll Info */}
          <div className="space-y-2">
            <h3 className="text-foreground text-lg">{title}</h3>
          </div>

          {/* Rules */}
          {!voted && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2 text-sm">
              <div className="flex items-center gap-2 text-blue-900">
                <Clock className="w-4 h-4" />
                <span>Votação aberta até {endDate}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-900">
                <Users className="w-4 h-4" />
                <span>1 voto por usuário</span>
              </div>
              <div className="flex items-center gap-2 text-blue-900">
                <Shield className="w-4 h-4" />
                <span>Voto anônimo</span>
              </div>
            </div>
          )}

          {!voted ? (
            <>
              {/* Single Choice */}
              {type === 'single' && (
                <RadioGroup value={selectedSingle} onValueChange={setSelectedSingle}>
                  {options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2 p-4 rounded-lg border-2 border-border hover:border-primary cursor-pointer">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {/* Multiple Choice */}
              {type === 'multiple' && (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground">
                    Selecione até {maxSelections} opções
                  </p>
                  {options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2 p-4 rounded-lg border-2 border-border hover:border-primary cursor-pointer">
                      <Checkbox
                        id={option.id}
                        checked={selectedMultiple.includes(option.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            if (selectedMultiple.length < maxSelections) {
                              setSelectedMultiple([...selectedMultiple, option.id]);
                            }
                          } else {
                            setSelectedMultiple(selectedMultiple.filter(id => id !== option.id));
                          }
                        }}
                        disabled={!selectedMultiple.includes(option.id) && !canSelectMore}
                      />
                      <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </div>
              )}

              {/* Scale */}
              {type === 'scale' && (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground text-center">
                    Avalie de 1 a 5
                  </p>
                  <div className="flex justify-center gap-3">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        onClick={() => setScaleValue(value)}
                        className={`w-14 h-14 rounded-full text-lg font-semibold transition-all ${
                          scaleValue === value
                            ? 'bg-primary text-white scale-110'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {value}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-muted-foreground px-2">
                    <span>Discordo totalmente</span>
                    <span>Concordo totalmente</span>
                  </div>
                </div>
              )}

              {/* Comment Field */}
              {allowComment && (
                <div className="space-y-2">
                  <Label htmlFor="comment">Comentário (opcional)</Label>
                  <Textarea
                    id="comment"
                    placeholder="Deixe seu comentário sobre este tema..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={3}
                  />
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Button 
                  onClick={handleVote}
                  disabled={
                    (type === 'single' && !selectedSingle) ||
                    (type === 'multiple' && selectedMultiple.length === 0) ||
                    (type === 'scale' && scaleValue === 0)
                  }
                  className="flex-1 bg-primary hover:bg-primary/90 h-12"
                >
                  Responder
                </Button>
                <Button 
                  variant="outline"
                  onClick={onClose}
                  className="h-12"
                >
                  Cancelar
                </Button>
              </div>
            </>
          ) : (
            <>
              {/* Results */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 text-center">
                  ✓ Sua resposta foi registrada com sucesso!
                </p>
              </div>

              <div className="space-y-4">
                <h4 className="text-foreground">Resultados da enquete</h4>

                {options.map((option) => (
                  <div key={option.id} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{option.label}</span>
                      <span className="text-foreground font-semibold">{option.percentage}%</span>
                    </div>
                    <Progress value={option.percentage} className="h-3" />
                    <p className="text-xs text-muted-foreground">{option.votes?.toLocaleString('pt-BR')} votos</p>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  <strong>Como estes dados serão usados:</strong><br />
                  Os resultados desta enquete serão analisados pela equipe de planejamento para auxiliar na tomada de decisões sobre políticas públicas. Seus dados são tratados de forma agregada e anônima.
                </p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{totalVotes.toLocaleString('pt-BR')}</span> pessoas participaram
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
