import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { BarChart3 } from '../icons';
import { useState } from 'react';

interface PrioritiesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filter: string;
  onFilterChange: (filter: string) => void;
}

export function PrioritiesModal({ open, onOpenChange, filter, onFilterChange }: PrioritiesModalProps) {
  const [votedPolls, setVotedPolls] = useState<Map<string, 'favor' | 'contra'>>(new Map());
  const [showThankYou, setShowThankYou] = useState<string | null>(null);

  const handleVote = (pollId: string, voteType: 'favor' | 'contra') => {
    setVotedPolls(prev => new Map(prev).set(pollId, voteType));
    setShowThankYou(pollId);
    
    // Remover mensagem após 5 segundos
    setTimeout(() => {
      setShowThankYou(null);
    }, 5000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-primary" />
            Prioridades da sua região em 2025
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          {/* Filtros de Categoria */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => onFilterChange('pavimentacao')}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                filter === 'pavimentacao'
                  ? 'bg-primary text-white font-semibold'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Pavimentação de ruas
            </button>
            <button
              onClick={() => onFilterChange('iluminacao')}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                filter === 'iluminacao'
                  ? 'bg-primary text-white font-semibold'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Iluminação pública
            </button>
            <button
              onClick={() => onFilterChange('seguranca')}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                filter === 'seguranca'
                  ? 'bg-primary text-white font-semibold'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Segurança
            </button>
            <button
              onClick={() => onFilterChange('lazer')}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                filter === 'lazer'
                  ? 'bg-primary text-white font-semibold'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              Áreas de lazer
            </button>
          </div>

          {/* Enquetes do Modal filtradas por categoria */}
          <div className="space-y-6">
            {filter === 'pavimentacao' && (
              <>
                {/* Enquete Em Andamento - Pavimentação */}
                <Card className="p-4 border-primary border-2">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-100 text-green-700 border-green-200">Em Andamento</Badge>
                      <span className="text-xs text-muted-foreground">Câmara Municipal</span>
                    </div>
                    <h4 className="font-semibold text-foreground">PL 234/2024 - Pavimentação da Zona Rural</h4>
                    <p className="text-sm text-muted-foreground">
                      Projeto prevê investimento de R$ 12 milhões para pavimentar 18km de estradas vicinais na zona rural do município.
                    </p>
                    
                    <div className="flex gap-2 pt-2">
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleVote('PL234', 'favor')}
                        disabled={votedPolls.has('PL234')}
                      >
                        👍 A favor
                      </Button>
                      <Button
                        className={`flex-1 ${
                          votedPolls.get('PL234') === 'contra'
                            ? 'bg-red-600 hover:bg-red-700 text-white border-red-600'
                            : 'border-red-300 text-red-600 hover:bg-red-50'
                        }`}
                        variant={votedPolls.get('PL234') === 'contra' ? 'default' : 'outline'}
                        onClick={() => handleVote('PL234', 'contra')}
                        disabled={votedPolls.has('PL234')}
                      >
                        👎 Contra
                      </Button>
                    </div>
                    
                    <div className="text-xs text-muted-foreground pt-2 border-t">
                      📊 Aprovação atual: 75% (967 a favor, 322 contra)
                    </div>
                    {showThankYou === 'PL234' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
                        <p className="text-sm text-green-800 font-semibold">✓ Sua opinião é muito importante!</p>
                        <p className="text-xs text-green-700 mt-1">
                          Acompanhe o andamento desta proposta na seção "Votação Coletiva" do feed.
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              </>
            )}

            {filter === 'iluminacao' && (
              <>
                {/* Enquete Em Andamento - Iluminação */}
                <Card className="p-4 border-primary border-2">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-100 text-green-700 border-green-200">Em Andamento</Badge>
                      <span className="text-xs text-muted-foreground">Câmara Municipal</span>
                    </div>
                    <h4 className="font-semibold text-foreground">PL 289/2024 - Iluminação Solar em Vias Públicas</h4>
                    <p className="text-sm text-muted-foreground">
                      Proposta para instalação de 500 postes de iluminação solar em bairros periféricos. Economia estimada de 40% na conta de energia pública.
                    </p>
                    
                    <div className="flex gap-2 pt-2">
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleVote('PL289', 'favor')}
                        disabled={votedPolls.has('PL289')}
                      >
                        👍 A favor
                      </Button>
                      <Button
                        className={`flex-1 ${
                          votedPolls.get('PL289') === 'contra'
                            ? 'bg-red-600 hover:bg-red-700 text-white border-red-600'
                            : 'border-red-300 text-red-600 hover:bg-red-50'
                        }`}
                        variant={votedPolls.get('PL289') === 'contra' ? 'default' : 'outline'}
                        onClick={() => handleVote('PL289', 'contra')}
                        disabled={votedPolls.has('PL289')}
                      >
                        👎 Contra
                      </Button>
                    </div>
                    
                    <div className="text-xs text-muted-foreground pt-2 border-t">
                      📊 Aprovação atual: 80% (856 a favor, 211 contra)
                    </div>
                    {showThankYou === 'PL289' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
                        <p className="text-sm text-green-800 font-semibold">✓ Sua opinião é muito importante!</p>
                        <p className="text-xs text-green-700 mt-1">
                          Acompanhe o andamento desta proposta na seção "Votação Coletiva" do feed.
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              </>
            )}

            {filter === 'seguranca' && (
              <>
                {/* Enquete Em Andamento - Segurança */}
                <Card className="p-4 border-primary border-2">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-100 text-green-700 border-green-200">Em Andamento</Badge>
                      <span className="text-xs text-muted-foreground">Câmara Municipal</span>
                    </div>
                    <h4 className="font-semibold text-foreground">PL 312/2024 - Criação da Guarda Municipal Noturna</h4>
                    <p className="text-sm text-muted-foreground">
                      Projeto propõe contratação de 120 guardas municipais para rondas noturnas em bairros com maior índice de ocorrências. Custo anual: R$ 7,2 milhões.
                    </p>
                    
                    <div className="flex gap-2 pt-2">
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleVote('PL312', 'favor')}
                        disabled={votedPolls.has('PL312')}
                      >
                        👍 A favor
                      </Button>
                      <Button
                        className={`flex-1 ${
                          votedPolls.get('PL312') === 'contra'
                            ? 'bg-red-600 hover:bg-red-700 text-white border-red-600'
                            : 'border-red-300 text-red-600 hover:bg-red-50'
                        }`}
                        variant={votedPolls.get('PL312') === 'contra' ? 'default' : 'outline'}
                        onClick={() => handleVote('PL312', 'contra')}
                        disabled={votedPolls.has('PL312')}
                      >
                        👎 Contra
                      </Button>
                    </div>
                    
                    <div className="text-xs text-muted-foreground pt-2 border-t">
                      📊 Aprovação atual: 82% (1.745 a favor, 389 contra)
                    </div>
                    {showThankYou === 'PL312' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
                        <p className="text-sm text-green-800 font-semibold">✓ Sua opinião é muito importante!</p>
                        <p className="text-xs text-green-700 mt-1">
                          Acompanhe o andamento desta proposta na seção "Votação Coletiva" do feed.
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              </>
            )}

            {filter === 'lazer' && (
              <>
                {/* Enquete Em Andamento - Áreas de lazer */}
                <Card className="p-4 border-primary border-2">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-green-100 text-green-700 border-green-200">Em Andamento</Badge>
                      <span className="text-xs text-muted-foreground">Câmara Municipal</span>
                    </div>
                    <h4 className="font-semibold text-foreground">PL 345/2024 - Construção de Parque Ecológico</h4>
                    <p className="text-sm text-muted-foreground">
                      Proposta para construir parque ecológico de 15 hectares com trilhas, quadras esportivas, lago e área para eventos. Investimento: R$ 18 milhões.
                    </p>
                    
                    <div className="flex gap-2 pt-2">
                      <Button
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                        onClick={() => handleVote('PL345', 'favor')}
                        disabled={votedPolls.has('PL345')}
                      >
                        👍 A favor
                      </Button>
                      <Button
                        className={`flex-1 ${
                          votedPolls.get('PL345') === 'contra'
                            ? 'bg-red-600 hover:bg-red-700 text-white border-red-600'
                            : 'border-red-300 text-red-600 hover:bg-red-50'
                        }`}
                        variant={votedPolls.get('PL345') === 'contra' ? 'default' : 'outline'}
                        onClick={() => handleVote('PL345', 'contra')}
                        disabled={votedPolls.has('PL345')}
                      >
                        👎 Contra
                      </Button>
                    </div>
                    
                    <div className="text-xs text-muted-foreground pt-2 border-t">
                      📊 Aprovação atual: 85% (1.423 a favor, 255 contra)
                    </div>
                    {showThankYou === 'PL345' && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 mt-2">
                        <p className="text-sm text-green-800 font-semibold">✓ Sua opinião é muito importante!</p>
                        <p className="text-xs text-green-700 mt-1">
                          Acompanhe o andamento desta proposta na seção "Votação Coletiva" do feed.
                        </p>
                      </div>
                    )}
                  </div>
                </Card>
              </>
            )}
          </div>

          {/* Botão Fechar */}
          <Button 
            onClick={() => onOpenChange(false)}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Fechar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}