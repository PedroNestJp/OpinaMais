import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Vote, MessageSquare, Calendar, Users } from '../icons';
import { PLVotingModal } from './PLVotingModal';
import { PollModal } from './PollModal';

type DecisionType = 'pl-vote' | 'poll';
type DecisionStatus = 'active' | 'closed';

interface Decision {
  id: number;
  type: DecisionType;
  title: string;
  description: string;
  status: DecisionStatus;
  endDate: string;
  participants: number;
  plNumber?: string;
}

const decisions: Decision[] = [
  {
    id: 1,
    type: 'pl-vote',
    title: 'PL 045/2024 - Corredores exclusivos para ônibus',
    description: 'Proposta para criar 15km de faixas exclusivas em 5 avenidas principais.',
    status: 'active',
    endDate: '30/11/2024',
    participants: 2261,
    plNumber: 'PL 045/2024',
  },
  {
    id: 2,
    type: 'poll',
    title: 'O que é mais urgente na sua região?',
    description: 'Ajude a definir as prioridades de investimento público no seu bairro.',
    status: 'active',
    endDate: '28/11/2024',
    participants: 3456,
  },
  {
    id: 3,
    type: 'poll',
    title: 'Qual seria o melhor local para um novo parque?',
    description: 'Sua opinião ajudará a decidir onde construir o próximo parque municipal.',
    status: 'closed',
    endDate: '15/11/2024',
    participants: 5234,
  },
  {
    id: 4,
    type: 'pl-vote',
    title: 'PL 087/2024 - Ampliação de horários dos postos de saúde',
    description: 'Funcionamento de 10 Unidades Básicas até 21h.',
    status: 'closed',
    endDate: '10/11/2024',
    participants: 4892,
    plNumber: 'PL 087/2024',
  },
];

export function DecisionsList() {
  const [filter, setFilter] = useState<'all' | 'active' | 'closed'>('all');
  const [votingModalOpen, setVotingModalOpen] = useState(false);
  const [pollModalOpen, setPollModalOpen] = useState(false);
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(null);

  const filteredDecisions = decisions.filter((decision) => {
    if (filter === 'all') return true;
    return decision.status === filter;
  });

  const activeDecisions = decisions.filter((d) => d.status === 'active');
  const closedDecisions = decisions.filter((d) => d.status === 'closed');

  const handleOpenDecision = (decision: Decision) => {
    setSelectedDecision(decision);
    if (decision.type === 'pl-vote') {
      setVotingModalOpen(true);
    } else {
      setPollModalOpen(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 pt-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-foreground mb-2">Decisão Coletiva</h1>
        <p className="text-muted-foreground text-lg">
          Participe das votações e enquetes sobre temas importantes
        </p>
      </div>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'bg-primary hover:bg-primary/90' : ''}
        >
          Todas ({decisions.length})
        </Button>
        <Button
          variant={filter === 'active' ? 'default' : 'outline'}
          onClick={() => setFilter('active')}
          className={filter === 'active' ? 'bg-primary hover:bg-primary/90' : ''}
        >
          Ativas ({activeDecisions.length})
        </Button>
        <Button
          variant={filter === 'closed' ? 'default' : 'outline'}
          onClick={() => setFilter('closed')}
          className={filter === 'closed' ? 'bg-primary hover:bg-primary/90' : ''}
        >
          Encerradas ({closedDecisions.length})
        </Button>
      </div>

      {/* Decision Cards */}
      <div className="space-y-4">
        {filteredDecisions.map((decision) => {
          const Icon = decision.type === 'pl-vote' ? Vote : MessageSquare;
          const typeLabel = decision.type === 'pl-vote' ? 'Votação de PL' : 'Enquete';
          const statusColor = decision.status === 'active' 
            ? 'bg-green-100 text-green-700 border-green-200' 
            : 'bg-gray-100 text-gray-700 border-gray-200';
          const statusLabel = decision.status === 'active' ? 'Ativa' : 'Encerrada';

          return (
            <Card key={decision.id} className="p-6 border-l-4 border-l-primary">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <Badge variant="outline" className="border bg-blue-100 text-blue-700 border-blue-200">
                        {typeLabel}
                      </Badge>
                      <Badge variant="outline" className={`border ${statusColor}`}>
                        {statusLabel}
                      </Badge>
                    </div>
                    {decision.plNumber && (
                      <div className="text-sm text-primary font-semibold mb-1">
                        {decision.plNumber}
                      </div>
                    )}
                    <h3 className="text-foreground text-lg mb-2">{decision.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {decision.description}
                    </p>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {decision.status === 'active' ? 'Até' : 'Encerrada em'} {decision.endDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{decision.participants.toLocaleString('pt-BR')} participantes</span>
                  </div>
                </div>

                {/* Action */}
                <Button
                  onClick={() => handleOpenDecision(decision)}
                  variant={decision.status === 'active' ? 'default' : 'outline'}
                  className={`w-full h-12 ${decision.status === 'active' ? 'bg-primary hover:bg-primary/90' : ''}`}
                >
                  {decision.status === 'active' ? 'Participar agora' : 'Ver resultados'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredDecisions.length === 0 && (
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-foreground mb-2">Nenhuma decisão encontrada</h3>
          <p className="text-muted-foreground">
            Não há votações ou enquetes {filter === 'active' ? 'ativas' : filter === 'closed' ? 'encerradas' : 'disponíveis'} no momento.
          </p>
        </Card>
      )}

      {/* Modals */}
      {selectedDecision && selectedDecision.type === 'pl-vote' && (
        <PLVotingModal
          open={votingModalOpen}
          onClose={() => {
            setVotingModalOpen(false);
            setSelectedDecision(null);
          }}
          plTitle={selectedDecision.title}
          plNumber={selectedDecision.plNumber || ''}
          plSummary={selectedDecision.description}
        />
      )}

      {selectedDecision && selectedDecision.type === 'poll' && (
        <PollModal
          open={pollModalOpen}
          onClose={() => {
            setPollModalOpen(false);
            setSelectedDecision(null);
          }}
          title={selectedDecision.title}
          type="single"
          options={[
            { id: '1', label: 'Pavimentação de ruas', votes: 1234, percentage: 45 },
            { id: '2', label: 'Iluminação pública', votes: 890, percentage: 32 },
            { id: '3', label: 'Segurança', votes: 456, percentage: 16 },
            { id: '4', label: 'Áreas de lazer', votes: 198, percentage: 7 },
          ]}
          allowComment={true}
          endDate={selectedDecision.endDate}
        />
      )}
    </div>
  );
}
