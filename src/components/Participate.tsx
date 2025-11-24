import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Textarea } from './ui/textarea';
import { ThumbsUp, ThumbsDown, FileText, Clock, Users, Send, TrendingUp } from 'lucide-react';

const projectsOfLaw = [
  {
    id: 'pl-045',
    number: 'PL 045/2024',
    title: 'Criação de corredores exclusivos para ônibus',
    author: 'Vereador João Silva',
    summary: 'Este projeto propõe a criação de corredores exclusivos para ônibus em 5 avenidas principais da cidade, com o objetivo de reduzir o tempo de deslocamento do transporte público em até 30%.',
    category: 'Mobilidade Urbana',
    stage: 'Em votação',
    votingDeadline: '15/12/2024',
    impact: 'Beneficia cerca de 80 mil usuários diários do transporte público',
    budget: 'R$ 12 milhões',
    supportVotes: 3542,
    oppositionVotes: 891,
    myVote: null as 'favor' | 'against' | null,
    commentsCount: 156,
  },
  {
    id: 'pl-038',
    number: 'PL 038/2024',
    title: 'Programa de plantio de árvores em áreas urbanas',
    author: 'Vereadora Maria Santos',
    summary: 'Institui programa municipal de arborização com meta de plantar 10 mil árvores nativas em praças, calçadas e parques até 2026.',
    category: 'Meio Ambiente',
    stage: 'Aguardando pareceres',
    impact: 'Melhoria da qualidade do ar e redução de ilhas de calor',
    budget: 'R$ 850 mil',
    supportVotes: 4821,
    oppositionVotes: 234,
    myVote: null as 'favor' | 'against' | null,
    commentsCount: 203,
  },
  {
    id: 'pl-052',
    number: 'PL 052/2024',
    title: 'Ampliação do horário de funcionamento de postos de saúde',
    author: 'Vereador Pedro Oliveira',
    summary: 'Estende o horário de atendimento de 10 unidades básicas de saúde até às 21h em dias úteis para melhorar o acesso da população.',
    category: 'Saúde',
    stage: 'Em discussão',
    impact: 'Atenderá cerca de 50 mil pessoas que trabalham em horário comercial',
    budget: 'R$ 3,2 milhões/ano',
    supportVotes: 5123,
    oppositionVotes: 678,
    myVote: null as 'favor' | 'against' | null,
    commentsCount: 298,
  },
];

const consultations = [
  {
    id: 'cons-01',
    title: 'Escolha o design do novo Parque Linear',
    description: 'Ajude a decidir o projeto arquitetônico do Parque Linear do Rio Verde. Três opções estão disponíveis.',
    deadline: '30/11/2024',
    participants: 3421,
    options: [
      { id: 'a', name: 'Projeto A - Foco em trilhas e caminhadas', votes: 1245 },
      { id: 'b', name: 'Projeto B - Equipamentos de ginástica e lazer', votes: 1532 },
      { id: 'c', name: 'Projeto C - Área verde com playground infantil', votes: 644 },
    ],
  },
  {
    id: 'cons-02',
    title: 'Prioridades para o orçamento de 2025',
    description: 'Vote nas áreas que devem receber mais investimentos no próximo ano.',
    deadline: '10/12/2024',
    participants: 2156,
    options: [
      { id: 'edu', name: 'Educação', votes: 892 },
      { id: 'sau', name: 'Saúde', votes: 734 },
      { id: 'seg', name: 'Segurança', votes: 530 },
    ],
  },
];

export function Participate() {
  const [projects, setProjects] = useState(projectsOfLaw);
  const [selectedPL, setSelectedPL] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState('');

  const handleVote = (plId: string, vote: 'favor' | 'against') => {
    setProjects((prev) =>
      prev.map((pl) =>
        pl.id === plId
          ? {
              ...pl,
              myVote: vote,
              supportVotes: vote === 'favor' ? pl.supportVotes + 1 : pl.supportVotes,
              oppositionVotes: vote === 'against' ? pl.oppositionVotes + 1 : pl.oppositionVotes,
            }
          : pl
      )
    );
  };

  const handleSubmitSuggestion = () => {
    if (suggestion.trim()) {
      alert('Sugestão enviada com sucesso! Agradecemos sua participação.');
      setSuggestion('');
    }
  };

  const selectedProject = projects.find((p) => p.id === selectedPL);

  return (
    <div className="max-w-4xl mx-auto p-4 pb-8">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Participe da Discussão</h1>
        <p className="text-gray-600">
          Acompanhe projetos de lei, vote em consultas públicas e envie sugestões
        </p>
      </div>

      <Tabs defaultValue="pls" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pls">Projetos de Lei</TabsTrigger>
          <TabsTrigger value="consultations">Consultas Públicas</TabsTrigger>
        </TabsList>

        <TabsContent value="pls" className="space-y-4">
          {selectedProject ? (
            <div className="space-y-4">
              <Button variant="ghost" onClick={() => setSelectedPL(null)} className="mb-2">
                ← Voltar para lista
              </Button>

              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <Badge className="mb-2">{selectedProject.number}</Badge>
                    <h2 className="text-gray-900 mb-3">{selectedProject.title}</h2>
                    <div className="flex items-center gap-4 text-gray-600 mb-4">
                      <span className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        {selectedProject.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {selectedProject.stage}
                      </span>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-gray-900 mb-2">Resumo</h3>
                    <p className="text-gray-700">{selectedProject.summary}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600 mb-1">Autor</p>
                      <p className="text-gray-900">{selectedProject.author}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-600 mb-1">Orçamento estimado</p>
                      <p className="text-gray-900">{selectedProject.budget}</p>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-gray-600 mb-1">Impacto esperado</p>
                    <p className="text-gray-900">{selectedProject.impact}</p>
                  </div>

                  {selectedProject.votingDeadline && (
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-gray-600 mb-1">Prazo para votação</p>
                      <p className="text-gray-900">{selectedProject.votingDeadline}</p>
                    </div>
                  )}

                  <div className="border-t pt-4">
                    <h3 className="text-gray-900 mb-3">O que você acha deste projeto?</h3>
                    {selectedProject.myVote ? (
                      <div className="bg-green-50 p-4 rounded-lg text-center">
                        <p className="text-green-700">
                          ✓ Você votou {selectedProject.myVote === 'favor' ? 'a favor' : 'contra'} este projeto
                        </p>
                      </div>
                    ) : (
                      <div className="flex gap-3">
                        <Button
                          onClick={() => handleVote(selectedProject.id, 'favor')}
                          className="flex-1 bg-green-600 hover:bg-green-700"
                          size="lg"
                        >
                          <ThumbsUp className="w-5 h-5 mr-2" />
                          Sou a favor
                        </Button>
                        <Button
                          onClick={() => handleVote(selectedProject.id, 'against')}
                          variant="outline"
                          className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                          size="lg"
                        >
                          <ThumbsDown className="w-5 h-5 mr-2" />
                          Sou contra
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-gray-900 mb-2">Opinião dos cidadãos</h3>
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 flex items-center gap-2">
                          <ThumbsUp className="w-4 h-4 text-green-600" />
                          A favor
                        </span>
                        <span className="text-gray-900">{selectedProject.supportVotes}</span>
                      </div>
                      <Progress
                        value={
                          (selectedProject.supportVotes /
                            (selectedProject.supportVotes + selectedProject.oppositionVotes)) *
                          100
                        }
                        className="h-2"
                      />
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 flex items-center gap-2">
                          <ThumbsDown className="w-4 h-4 text-red-600" />
                          Contra
                        </span>
                        <span className="text-gray-900">{selectedProject.oppositionVotes}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Total de {selectedProject.supportVotes + selectedProject.oppositionVotes} votos
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-gray-900 mb-3">Envie sua sugestão ou comentário</h3>
                    <Textarea
                      placeholder="Compartilhe sua opinião, sugestões ou dúvidas sobre este projeto..."
                      value={suggestion}
                      onChange={(e) => setSuggestion(e.target.value)}
                      className="mb-3"
                      rows={4}
                    />
                    <Button onClick={handleSubmitSuggestion} disabled={!suggestion.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      Enviar sugestão
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          ) : (
            <>
              {projects.map((pl) => (
                <Card
                  key={pl.id}
                  className="p-5 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedPL(pl.id)}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{pl.number}</Badge>
                          <Badge
                            className={
                              pl.stage === 'Em votação'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-blue-100 text-blue-700'
                            }
                          >
                            {pl.stage}
                          </Badge>
                        </div>
                        <h3 className="text-gray-900 mb-2">{pl.title}</h3>
                        <p className="text-gray-600 line-clamp-2">{pl.summary}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {pl.category}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {(pl.supportVotes + pl.oppositionVotes).toLocaleString()} votos
                      </span>
                    </div>

                    <div className="pt-2 border-t">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-600">Aprovação popular</span>
                        <span className="text-xs text-gray-900">
                          {Math.round(
                            (pl.supportVotes / (pl.supportVotes + pl.oppositionVotes)) * 100
                          )}
                          %
                        </span>
                      </div>
                      <Progress
                        value={(pl.supportVotes / (pl.supportVotes + pl.oppositionVotes)) * 100}
                        className="h-2"
                      />
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      Ver detalhes e participar
                    </Button>
                  </div>
                </Card>
              ))}
            </>
          )}
        </TabsContent>

        <TabsContent value="consultations" className="space-y-4">
          {consultations.map((consultation) => (
            <Card key={consultation.id} className="p-5">
              <div className="space-y-4">
                <div>
                  <h3 className="text-gray-900 mb-2">{consultation.title}</h3>
                  <p className="text-gray-600 mb-3">{consultation.description}</p>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {consultation.participants.toLocaleString()} participantes
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Encerra em {consultation.deadline}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  {consultation.options.map((option) => {
                    const totalVotes = consultation.options.reduce((sum, opt) => sum + opt.votes, 0);
                    const percentage = Math.round((option.votes / totalVotes) * 100);
                    return (
                      <button
                        key={option.id}
                        className="w-full text-left p-3 rounded-lg border-2 hover:border-blue-300 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-900">{option.name}</span>
                          <span className="text-gray-600">{percentage}%</span>
                        </div>
                        <Progress value={percentage} className="h-2" />
                        <p className="text-xs text-gray-500 mt-1">{option.votes} votos</p>
                      </button>
                    );
                  })}
                </div>

                <Button className="w-full">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Participar da votação
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
