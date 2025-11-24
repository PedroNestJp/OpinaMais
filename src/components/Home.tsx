import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ThumbsUp, MessageSquare, Share2, TrendingUp, Clock, MapPin } from 'lucide-react';

interface HomeProps {
  userInterests: string[];
}

const feedItems = [
  {
    id: 1,
    type: 'pl',
    category: 'mobility',
    icon: '🚌',
    title: 'PL 045/2024 - Corredores de ônibus na Av. Principal',
    summary: 'Proposta cria novos corredores exclusivos para transporte público, reduzindo tempo de viagem em até 30%.',
    status: 'Em votação',
    statusColor: 'bg-orange-100 text-orange-700',
    votes: 1247,
    comments: 89,
    date: '2 dias atrás',
    urgent: true,
  },
  {
    id: 2,
    type: 'work',
    category: 'infrastructure',
    icon: '🏗️',
    title: 'Obra: Revitalização da Praça Central',
    summary: 'Início das obras de modernização com nova iluminação, paisagismo e área de lazer. Conclusão prevista: 90 dias.',
    status: 'Em andamento',
    statusColor: 'bg-blue-100 text-blue-700',
    progress: 35,
    budget: 'R$ 450 mil',
    date: '1 dia atrás',
  },
  {
    id: 3,
    type: 'hearing',
    category: 'education',
    icon: '📚',
    title: 'Audiência Pública: Novas Creches Municipais',
    summary: 'Discussão sobre a construção de 3 novas creches. Participe e envie sugestões sobre localização e demandas.',
    status: 'Hoje às 19h',
    statusColor: 'bg-green-100 text-green-700',
    location: 'Câmara Municipal',
    date: 'Hoje',
    urgent: true,
  },
  {
    id: 4,
    type: 'decision',
    category: 'health',
    icon: '🏥',
    title: 'Aprovado: Ampliação do Hospital Regional',
    summary: 'Câmara aprova investimento de R$ 2 milhões para novos leitos de UTI e equipamentos modernos.',
    status: 'Aprovado',
    statusColor: 'bg-green-100 text-green-700',
    votes: 18,
    votesAgainst: 2,
    date: '3 dias atrás',
  },
  {
    id: 5,
    type: 'consultation',
    category: 'environment',
    icon: '🌳',
    title: 'Consulta Pública: Parque Linear do Rio Verde',
    summary: 'Ajude a decidir o projeto do novo parque. Vote nas opções de design, trilhas e equipamentos.',
    status: 'Votação aberta',
    statusColor: 'bg-purple-100 text-purple-700',
    participants: 3421,
    date: '5 dias atrás',
  },
  {
    id: 6,
    type: 'alert',
    category: 'security',
    icon: '🚓',
    title: 'Nova Base da Guarda Municipal no Bairro Sul',
    summary: 'Inauguração de posto para reforçar segurança. Atendimento 24h a partir da próxima semana.',
    status: 'Novidade',
    statusColor: 'bg-blue-100 text-blue-700',
    date: '1 semana atrás',
  },
];

const categoryLabels: Record<string, string> = {
  mobility: 'Mobilidade',
  infrastructure: 'Infraestrutura',
  education: 'Educação',
  health: 'Saúde',
  environment: 'Meio Ambiente',
  security: 'Segurança',
};

export function Home({ userInterests }: HomeProps) {
  const [likedItems, setLikedItems] = useState<number[]>([]);

  const filteredItems = userInterests.length > 0
    ? feedItems.filter(item => userInterests.includes(item.category))
    : feedItems;

  const toggleLike = (id: number) => {
    setLikedItems(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4 pb-8">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 border-0">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-white mb-2">Olá, Cidadão! 👋</h2>
            <p className="text-blue-100">
              {filteredItems.length} atualizações sobre os temas que você acompanha
            </p>
          </div>
          <div className="bg-white/20 rounded-lg px-3 py-2">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>
      </Card>

      {/* Feed Items */}
      {filteredItems.map((item) => (
        <Card key={item.id} className="p-5 hover:shadow-lg transition-shadow">
          <div className="space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">{item.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <Badge variant="secondary" className="text-xs">
                      {categoryLabels[item.category]}
                    </Badge>
                    {item.urgent && (
                      <Badge variant="destructive" className="text-xs">
                        Urgente
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-gray-600">{item.summary}</p>
                </div>
              </div>
            </div>

            {/* Status and Metadata */}
            <div className="flex items-center gap-4 flex-wrap">
              <span className={`text-xs px-2 py-1 rounded-full ${item.statusColor}`}>
                {item.status}
              </span>
              <span className="text-xs text-gray-500 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {item.date}
              </span>
              {item.location && (
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {item.location}
                </span>
              )}
            </div>

            {/* Additional Info */}
            {item.progress !== undefined && (
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-600">Progresso da obra</span>
                  <span className="text-xs text-gray-900">{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              </div>
            )}

            {item.budget && (
              <p className="text-xs text-gray-600">
                Orçamento: <span className="text-gray-900">{item.budget}</span>
              </p>
            )}

            {item.votesAgainst !== undefined && (
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-600">
                  ✓ {item.votes} votos favoráveis
                </span>
                <span className="text-xs text-gray-600">
                  ✗ {item.votesAgainst} votos contrários
                </span>
              </div>
            )}

            {item.participants && (
              <p className="text-xs text-gray-600">
                {item.participants.toLocaleString('pt-BR')} cidadãos participaram
              </p>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleLike(item.id)}
                className={likedItems.includes(item.id) ? 'text-blue-600' : ''}
              >
                <ThumbsUp className={`w-4 h-4 mr-1 ${likedItems.includes(item.id) ? 'fill-current' : ''}`} />
                {item.votes ? item.votes + (likedItems.includes(item.id) ? 1 : 0) : 'Apoiar'}
              </Button>
              {item.comments !== undefined && (
                <Button variant="ghost" size="sm">
                  <MessageSquare className="w-4 h-4 mr-1" />
                  {item.comments}
                </Button>
              )}
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-1" />
                Compartilhar
              </Button>
            </div>

            {/* Verified Badge */}
            <div className="flex items-center gap-2 pt-2 border-t">
              <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 text-xs">✓</span>
              </div>
              <span className="text-xs text-gray-500">
                Informação verificada · Fonte: Portal Oficial da Câmara Municipal
              </span>
            </div>
          </div>
        </Card>
      ))}

      {filteredItems.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">
            Nenhuma atualização para os temas selecionados. Configure seus interesses no perfil.
          </p>
        </Card>
      )}
    </div>
  );
}
