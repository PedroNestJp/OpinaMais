import { Card } from '../ui/card';
import { Users, Clock, CheckCircle, TrendingUp } from 'lucide-react';
import { Button } from '../ui/button';

export interface PollData {
  id: string;
  title: string;
  type: 'PL' | 'Enquete';
  plNumber?: string;
  status: 'active' | 'closed';
  totalParticipants: number;
  options: {
    label: string;
    percentage: number;
    votes: number;
    color: string;
  }[];
  closedDate?: string;
  category?: string;
  categoryColor?: string;
}

interface PollMetricsCardProps {
  title: string;
  data: PollData[];
  status: 'active' | 'closed';
  onViewDetails?: (pollId: string) => void;
}

export function PollMetricsCard({ title, data, status, onViewDetails }: PollMetricsCardProps) {
  const isActive = status === 'active';

  return (
    <Card className="p-5 bg-white border border-[#E4E4E4]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#E4E4E4]">
        <div 
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            isActive ? 'bg-[#FFC947]/20' : 'bg-[#008344]/20'
          }`}
        >
          {isActive ? (
            <Clock className="w-5 h-5 text-[#FFC947]" />
          ) : (
            <CheckCircle className="w-5 h-5 text-[#008344]" />
          )}
        </div>
        <div className="flex-1">
          <h3 
            className="text-[#2A2A2A]"
            style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '16px' }}
          >
            {title}
          </h3>
          <p 
            className="text-[#666666]"
            style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px' }}
          >
            {data.length} {isActive ? 'em andamento' : 'finalizadas'}
          </p>
        </div>
      </div>

      {/* List */}
      {data.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-[#E4E4E4] rounded-full flex items-center justify-center mx-auto mb-3">
            {isActive ? (
              <Clock className="w-6 h-6 text-[#999999]" />
            ) : (
              <CheckCircle className="w-6 h-6 text-[#999999]" />
            )}
          </div>
          <p 
            className="text-[#666666]"
            style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '13px' }}
          >
            Nenhuma {isActive ? 'votação em andamento' : 'votação encerrada'} no período
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((poll) => (
            <div 
              key={poll.id}
              className="p-4 rounded-lg border border-[#E4E4E4] hover:border-[#003F7D] transition-all cursor-pointer"
              onClick={() => onViewDetails?.(poll.id)}
            >
              {/* Title and Status */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1">
                  <h4 
                    className="text-[#2A2A2A] mb-2"
                    style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px', lineHeight: '1.4' }}
                  >
                    {poll.title}
                  </h4>
                  <div className="flex items-center gap-2 flex-wrap">
                    {poll.plNumber && (
                      <span 
                        className="px-2 py-0.5 bg-[#003F7D]/10 text-[#003F7D] rounded"
                        style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '11px' }}
                      >
                        {poll.plNumber}
                      </span>
                    )}
                    {poll.category && (
                      <span 
                        className="px-2 py-0.5 rounded"
                        style={{ 
                          fontFamily: 'Inter', 
                          fontWeight: 500, 
                          fontSize: '11px',
                          backgroundColor: `${poll.categoryColor || '#008344'}20`,
                          color: poll.categoryColor || '#008344'
                        }}
                      >
                        {poll.category}
                      </span>
                    )}
                    <span 
                      className={`px-2 py-0.5 rounded ${
                        isActive 
                          ? 'bg-[#FFC947]/20 text-[#FFC947]' 
                          : 'bg-[#008344]/20 text-[#008344]'
                      }`}
                      style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '11px' }}
                    >
                      {isActive ? 'Em andamento' : 'Encerrada'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Vote Bars */}
              <div className="space-y-2 mb-3">
                {poll.options.map((option, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-1">
                      <span 
                        className="text-[#2A2A2A]"
                        style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }}
                      >
                        {option.label}
                      </span>
                      <span 
                        className="text-[#2A2A2A]"
                        style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '13px' }}
                      >
                        {option.percentage}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#E4E4E4] rounded-full overflow-hidden">
                      <div 
                        className="h-full rounded-full transition-all duration-300"
                        style={{ 
                          width: `${option.percentage}%`,
                          backgroundColor: option.color
                        }}
                      />
                    </div>
                    <p 
                      className="text-[#999999] mt-0.5"
                      style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '11px' }}
                    >
                      {option.votes.toLocaleString('pt-BR')} votos
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-[#E4E4E4]">
                <div className="flex items-center gap-2 text-[#666666]">
                  <Users className="w-4 h-4" />
                  <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }}>
                    {poll.totalParticipants.toLocaleString('pt-BR')} participantes
                  </span>
                </div>
                {!isActive && poll.closedDate && (
                  <span 
                    className="text-[#999999]"
                    style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '11px' }}
                  >
                    Encerrada em {poll.closedDate}
                  </span>
                )}
                {!isActive && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#003F7D] hover:text-[#002a56] hover:bg-[#003F7D]/5 h-8"
                    onClick={(e) => {
                      e.stopPropagation();
                      onViewDetails?.(poll.id);
                    }}
                  >
                    Ver resultados →
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
