import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Camera, MapPin, Send, AlertCircle, CheckCircle, Clock, TrendingUp } from 'lucide-react';

interface Report {
  id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  status: 'received' | 'analyzing' | 'in-progress' | 'resolved';
  date: string;
  image?: string;
  votes: number;
}

const categories = [
  { id: 'lighting', label: 'Iluminação', icon: '💡' },
  { id: 'street', label: 'Vias e Calçadas', icon: '🛣️' },
  { id: 'garbage', label: 'Lixo e Limpeza', icon: '🗑️' },
  { id: 'water', label: 'Água e Esgoto', icon: '💧' },
  { id: 'security', label: 'Segurança', icon: '🚨' },
  { id: 'nature', label: 'Meio Ambiente', icon: '🌳' },
  { id: 'transport', label: 'Transporte', icon: '🚌' },
  { id: 'other', label: 'Outro', icon: '📝' },
];

const mockReports: Report[] = [
  {
    id: 1,
    title: 'Buraco grande na Rua das Flores',
    category: 'Vias e Calçadas',
    description: 'Buraco profundo causando acidentes, precisa de reparo urgente',
    location: 'Rua das Flores, 234 - Centro',
    status: 'in-progress',
    date: '18/11/2024',
    votes: 47,
  },
  {
    id: 2,
    title: 'Poste queimado sem iluminação',
    category: 'Iluminação',
    description: 'Poste sem luz há 2 semanas, área muito escura à noite',
    location: 'Av. Principal, altura do nº 1500',
    status: 'received',
    date: '20/11/2024',
    votes: 32,
  },
  {
    id: 3,
    title: 'Lixo acumulado no terreno baldio',
    category: 'Lixo e Limpeza',
    description: 'Muito lixo acumulado, atraindo animais e causando mau cheiro',
    location: 'Rua São João, esquina com Rua 7',
    status: 'analyzing',
    date: '19/11/2024',
    votes: 28,
  },
  {
    id: 4,
    title: 'Vazamento de água na rede pública',
    category: 'Água e Esgoto',
    description: 'Vazamento grande desperdiçando água',
    location: 'Rua dos Lírios, 89',
    status: 'resolved',
    date: '15/11/2024',
    votes: 54,
  },
];

const statusInfo = {
  received: { label: 'Recebido', color: 'bg-blue-100 text-blue-700', icon: AlertCircle },
  analyzing: { label: 'Em análise', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  'in-progress': { label: 'Em andamento', color: 'bg-purple-100 text-purple-700', icon: TrendingUp },
  resolved: { label: 'Resolvido', color: 'bg-green-100 text-green-700', icon: CheckCircle },
};

export function CitizenReporter() {
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [isCreating, setIsCreating] = useState(false);
  const [newReport, setNewReport] = useState({
    category: '',
    title: '',
    description: '',
    location: '',
  });
  const [votedReports, setVotedReports] = useState<number[]>([]);

  const handleVote = (reportId: number) => {
    if (!votedReports.includes(reportId)) {
      setVotedReports((prev) => [...prev, reportId]);
      setReports((prev) =>
        prev.map((report) =>
          report.id === reportId ? { ...report, votes: report.votes + 1 } : report
        )
      );
    }
  };

  const handleSubmit = () => {
    if (newReport.category && newReport.title && newReport.description && newReport.location) {
      const report: Report = {
        id: reports.length + 1,
        title: newReport.title,
        category: categories.find((c) => c.id === newReport.category)?.label || '',
        description: newReport.description,
        location: newReport.location,
        status: 'received',
        date: new Date().toLocaleDateString('pt-BR'),
        votes: 0,
      };

      setReports((prev) => [report, ...prev]);
      setNewReport({ category: '', title: '', description: '', location: '' });
      setIsCreating(false);
      alert('Relato enviado com sucesso! Acompanhe o andamento na aba "Meus Relatos".');
    }
  };

  const myReports = reports.filter((r) => r.id === reports.length); // Simulação

  return (
    <div className="max-w-4xl mx-auto p-4 pb-8">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Cidadão Repórter</h1>
        <p className="text-gray-600">
          Relate problemas urbanos e acompanhe as soluções
        </p>
      </div>

      {isCreating ? (
        <Card className="p-6 mb-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-gray-900 mb-4">Novo Relato</h2>
              <p className="text-gray-600 mb-4">
                Ajude a melhorar sua cidade relatando problemas urbanos
              </p>
            </div>

            <div>
              <label className="text-gray-700 mb-2 block">Categoria do problema</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setNewReport({ ...newReport, category: cat.id })}
                    className={`p-3 rounded-lg border-2 transition-all text-center ${
                      newReport.category === cat.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <p className="text-xs text-gray-700">{cat.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="title" className="text-gray-700 mb-2 block">
                Título do problema
              </label>
              <Input
                id="title"
                placeholder="Ex: Buraco na rua causando acidentes"
                value={newReport.title}
                onChange={(e) => setNewReport({ ...newReport, title: e.target.value })}
              />
            </div>

            <div>
              <label htmlFor="description" className="text-gray-700 mb-2 block">
                Descrição detalhada
              </label>
              <Textarea
                id="description"
                placeholder="Descreva o problema com o máximo de detalhes possível..."
                value={newReport.description}
                onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                rows={4}
              />
            </div>

            <div>
              <label htmlFor="location" className="text-gray-700 mb-2 block">
                Localização
              </label>
              <Input
                id="location"
                placeholder="Ex: Rua das Flores, 234 - Centro"
                value={newReport.location}
                onChange={(e) => setNewReport({ ...newReport, location: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">
                Seja o mais específico possível (rua, número, ponto de referência)
              </p>
            </div>

            <div>
              <Button variant="outline" className="w-full">
                <Camera className="w-4 h-4 mr-2" />
                Adicionar foto (opcional)
              </Button>
              <p className="text-xs text-gray-500 mt-1 text-center">
                Fotos ajudam a equipe a entender melhor o problema
              </p>
            </div>

            <div className="flex gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setIsCreating(false)} className="flex-1">
                Cancelar
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={
                  !newReport.category || !newReport.title || !newReport.description || !newReport.location
                }
                className="flex-1"
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar relato
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <Card className="p-5 mb-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white mb-1">Viu algum problema na cidade?</h2>
              <p className="text-blue-100">
                Registre e ajude a prefeitura a resolver mais rápido
              </p>
            </div>
            <Button onClick={() => setIsCreating(true)} variant="secondary">
              <Camera className="w-4 h-4 mr-2" />
              Criar relato
            </Button>
          </div>
        </Card>
      )}

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">Todos os Relatos</TabsTrigger>
          <TabsTrigger value="mine">Meus Relatos ({myReports.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <p className="text-gray-600">{reports.length} relatos ativos</p>
            <select className="text-sm border rounded-lg px-3 py-2">
              <option>Mais recentes</option>
              <option>Mais votados</option>
              <option>Em andamento</option>
            </select>
          </div>

          {reports.map((report) => {
            const statusData = statusInfo[report.status];
            const StatusIcon = statusData.icon;

            return (
              <Card key={report.id} className="p-5 hover:shadow-lg transition-shadow">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge variant="secondary">{report.category}</Badge>
                        <Badge className={statusData.color}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {statusData.label}
                        </Badge>
                      </div>
                      <h3 className="text-gray-900 mb-2">{report.title}</h3>
                      <p className="text-gray-600 mb-2">{report.description}</p>
                      <div className="flex items-center gap-4 text-gray-500">
                        <span className="flex items-center gap-1 text-xs">
                          <MapPin className="w-3 h-3" />
                          {report.location}
                        </span>
                        <span className="text-xs">{report.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleVote(report.id)}
                        disabled={votedReports.includes(report.id)}
                        className={votedReports.includes(report.id) ? 'text-blue-600' : ''}
                      >
                        <TrendingUp
                          className={`w-4 h-4 mr-1 ${
                            votedReports.includes(report.id) ? 'fill-current' : ''
                          }`}
                        />
                        {votedReports.includes(report.id) ? 'Apoiado' : 'Apoiar'}
                      </Button>
                      <span className="text-gray-600">{report.votes} apoios</span>
                    </div>
                  </div>

                  {report.status === 'resolved' && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-green-700 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Problema resolvido pela Prefeitura
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </TabsContent>

        <TabsContent value="mine" className="space-y-4">
          {myReports.length > 0 ? (
            myReports.map((report) => {
              const statusData = statusInfo[report.status];
              const StatusIcon = statusData.icon;

              return (
                <Card key={report.id} className="p-5">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{report.category}</Badge>
                          <Badge className={statusData.color}>
                            <StatusIcon className="w-3 h-3 mr-1" />
                            {statusData.label}
                          </Badge>
                        </div>
                        <h3 className="text-gray-900 mb-2">{report.title}</h3>
                        <p className="text-gray-600 mb-2">{report.description}</p>
                        <div className="flex items-center gap-4 text-gray-500">
                          <span className="flex items-center gap-1 text-xs">
                            <MapPin className="w-3 h-3" />
                            {report.location}
                          </span>
                          <span className="text-xs">{report.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs text-blue-700">
                        📊 Seu relato recebeu {report.votes} apoios da comunidade
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })
          ) : (
            <Card className="p-8 text-center">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <h3 className="text-gray-900 mb-2">Você ainda não fez nenhum relato</h3>
              <p className="text-gray-600 mb-4">
                Ajude a melhorar sua cidade relatando problemas urbanos
              </p>
              <Button onClick={() => setIsCreating(true)}>
                <Camera className="w-4 h-4 mr-2" />
                Criar primeiro relato
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Card className="p-5 mt-6 bg-yellow-50 border-yellow-200">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-gray-900 mb-1">Importante</h3>
            <p className="text-gray-700 text-sm">
              Este canal é para relatos de problemas urbanos (infraestrutura, limpeza, iluminação). 
              Para emergências, ligue 190 (Polícia) ou 193 (Bombeiros). Para denúncias formais, 
              acesse a Ouvidoria Municipal.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
