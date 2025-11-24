import { useState } from 'react';
import { ArrowLeft, Crown, Download, TrendingUp, Eye, Share2, Heart, BarChart3 } from 'lucide-react';
import { Button } from '../ui/button';
import { MetricCard } from './MetricCard';
import { FilterBar } from './FilterBar';
import { PostRankingCard, PostRankingData } from './PostRankingCard';
import { PollMetricsCard, PollData } from './PollMetricsCard';
import { EducationArticlesCard, ArticleData } from './EducationArticlesCard';
import { ReportGeneratorModal, ReportOptions } from './ReportGeneratorModal';

interface SubscriberDashboardProps {
  onBack: () => void;
}

// Mock Data
const mockTopLikes: PostRankingData[] = [
  {
    id: '1',
    title: 'PL 123/2025 - Ampliação do atendimento médico nas UPAs',
    type: 'PL',
    metric: 15482,
    metricLabel: 'curtidas',
    badge: 'Alto alcance',
    category: 'Saúde',
    categoryColor: '#4BBF95'
  },
  {
    id: '2',
    title: 'Enquete: Qual prioridade para mobilidade urbana?',
    type: 'Enquete',
    metric: 12304,
    metricLabel: 'curtidas',
    category: 'Transporte',
    categoryColor: '#007AFF'
  },
  {
    id: '3',
    title: 'PL 087/2025 - Reforma das escolas municipais',
    type: 'PL',
    metric: 9876,
    metricLabel: 'curtidas',
    category: 'Educação',
    categoryColor: '#FFB84D'
  },
  {
    id: '4',
    title: 'Discussão: Segurança nos bairros periféricos',
    type: 'Discussão',
    metric: 8543,
    metricLabel: 'curtidas',
    category: 'Segurança',
    categoryColor: '#E5484D'
  },
  {
    id: '5',
    title: 'PL 095/2025 - Proteção de áreas verdes',
    type: 'PL',
    metric: 7234,
    metricLabel: 'curtidas',
    category: 'Meio Ambiente',
    categoryColor: '#35C759'
  },
];

const mockTopViews: PostRankingData[] = [
  {
    id: '1',
    title: 'PL 123/2025 - Ampliação do atendimento médico nas UPAs',
    type: 'PL',
    metric: 45231,
    metricLabel: 'visualizações',
    badge: 'Alto alcance',
    category: 'Saúde',
    categoryColor: '#4BBF95'
  },
  {
    id: '2',
    title: 'Enquete: Investimentos prioritários em infraestrutura',
    type: 'Enquete',
    metric: 38765,
    metricLabel: 'visualizações',
    category: 'Infraestrutura',
    categoryColor: '#f59e0b'
  },
  {
    id: '3',
    title: 'PL 142/2025 - Merenda escolar orgânica',
    type: 'PL',
    metric: 32104,
    metricLabel: 'visualizações',
    category: 'Educação',
    categoryColor: '#FFB84D'
  },
  {
    id: '4',
    title: 'Discussão: Como melhorar o transporte público?',
    type: 'Discussão',
    metric: 28543,
    metricLabel: 'visualizações',
    category: 'Transporte',
    categoryColor: '#007AFF'
  },
  {
    id: '5',
    title: 'Enquete: Horários de funcionamento dos parques',
    type: 'Enquete',
    metric: 24876,
    metricLabel: 'visualizações',
    category: 'Lazer',
    categoryColor: '#8b5cf6'
  },
];

const mockTopShares: PostRankingData[] = [
  {
    id: '1',
    title: 'PL 087/2025 - Reforma das escolas municipais',
    type: 'PL',
    metric: 3421,
    metricLabel: 'compartilhamentos',
    category: 'Educação',
    categoryColor: '#FFB84D'
  },
  {
    id: '2',
    title: 'PL 123/2025 - Ampliação do atendimento médico nas UPAs',
    type: 'PL',
    metric: 2987,
    metricLabel: 'compartilhamentos',
    badge: 'Trending',
    category: 'Saúde',
    categoryColor: '#4BBF95'
  },
  {
    id: '3',
    title: 'Enquete: Prioridades do orçamento municipal 2025',
    type: 'Enquete',
    metric: 2654,
    metricLabel: 'compartilhamentos',
    category: 'Economia',
    categoryColor: '#8b5cf6'
  },
  {
    id: '4',
    title: 'PL 095/2025 - Proteção de áreas verdes',
    type: 'PL',
    metric: 2341,
    metricLabel: 'compartilhamentos',
    category: 'Meio Ambiente',
    categoryColor: '#35C759'
  },
  {
    id: '5',
    title: 'Discussão: Iluminação pública em áreas residenciais',
    type: 'Discussão',
    metric: 1987,
    metricLabel: 'compartilhamentos',
    category: 'Infraestrutura',
    categoryColor: '#f59e0b'
  },
];

const mockActivePolls: PollData[] = [
  {
    id: '1',
    title: 'Qual prioridade para o investimento em saúde pública?',
    type: 'Enquete',
    status: 'active',
    totalParticipants: 8234,
    category: 'Saúde',
    categoryColor: '#4BBF95',
    options: [
      { label: 'Mais médicos nas UPAs', percentage: 45, votes: 3705, color: '#4BBF95' },
      { label: 'Equipamentos hospitalares', percentage: 32, votes: 2635, color: '#007AFF' },
      { label: 'Postos de saúde 24h', percentage: 23, votes: 1894, color: '#FFB84D' },
    ]
  },
  {
    id: '2',
    title: 'PL 142/2025 - Implementação de merenda orgânica nas escolas',
    type: 'PL',
    plNumber: 'PL 142/2025',
    status: 'active',
    totalParticipants: 6543,
    category: 'Educação',
    categoryColor: '#FFB84D',
    options: [
      { label: 'Aprovar', percentage: 68, votes: 4449, color: '#4BBF95' },
      { label: 'Aprovar com emendas', percentage: 22, votes: 1439, color: '#FFC947' },
      { label: 'Rejeitar', percentage: 10, votes: 655, color: '#E5484D' },
    ]
  },
];

const mockClosedPolls: PollData[] = [
  {
    id: '3',
    title: 'PL 123/2025 - Ampliação do atendimento médico nas UPAs',
    type: 'PL',
    plNumber: 'PL 123/2025',
    status: 'closed',
    totalParticipants: 15482,
    category: 'Saúde',
    categoryColor: '#4BBF95',
    closedDate: '20/11/2025',
    options: [
      { label: 'Aprovar', percentage: 62, votes: 9599, color: '#4BBF95' },
      { label: 'Aprovar com emendas', percentage: 28, votes: 4335, color: '#FFC947' },
      { label: 'Rejeitar', percentage: 10, votes: 1548, color: '#E5484D' },
    ]
  },
  {
    id: '4',
    title: 'Enquete: Melhor horário de funcionamento dos parques',
    type: 'Enquete',
    status: 'closed',
    totalParticipants: 5678,
    category: 'Lazer',
    categoryColor: '#8b5cf6',
    closedDate: '18/11/2025',
    options: [
      { label: '6h às 22h', percentage: 51, votes: 2896, color: '#4BBF95' },
      { label: '24 horas', percentage: 34, votes: 1930, color: '#007AFF' },
      { label: '8h às 20h', percentage: 15, votes: 852, color: '#FFB84D' },
    ]
  },
  {
    id: '5',
    title: 'PL 087/2025 - Reforma estrutural das escolas municipais',
    type: 'PL',
    plNumber: 'PL 087/2025',
    status: 'closed',
    totalParticipants: 12103,
    category: 'Educação',
    categoryColor: '#FFB84D',
    closedDate: '15/11/2025',
    options: [
      { label: 'Aprovar', percentage: 58, votes: 7020, color: '#4BBF95' },
      { label: 'Aprovar com emendas', percentage: 35, votes: 4236, color: '#FFC947' },
      { label: 'Rejeitar', percentage: 7, votes: 847, color: '#E5484D' },
    ]
  },
];

const mockArticles: ArticleData[] = [
  {
    id: '1',
    title: 'Como funciona o processo legislativo brasileiro?',
    views: 18543,
    category: 'Processo Legislativo',
    readTime: '8 min',
    trend: '+125%'
  },
  {
    id: '2',
    title: 'Orçamento público: de onde vem e para onde vai o dinheiro?',
    views: 15234,
    category: 'Orçamento Público',
    readTime: '12 min',
    trend: '+98%'
  },
  {
    id: '3',
    title: 'Direitos e deveres do cidadão na democracia',
    views: 12876,
    category: 'Cidadania',
    readTime: '6 min',
  },
  {
    id: '4',
    title: 'Transparência governamental: como fiscalizar gastos públicos',
    views: 10543,
    category: 'Transparência',
    readTime: '10 min',
  },
  {
    id: '5',
    title: 'Participação popular: mecanismos de consulta pública',
    views: 9234,
    category: 'Participação Popular',
    readTime: '7 min',
  },
];

export function SubscriberDashboard({ onBack }: SubscriberDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedType, setSelectedType] = useState('all');
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleGenerateReport = (options: ReportOptions) => {
    console.log('Generating report with options:', options);
    alert(`📊 Gerando relatório em ${options.format.toUpperCase()}...\n\nSeções: ${options.sections.length}\nFormato: ${options.format}\n\n✅ Em produção, o download iniciaria aqui.`);
    setIsReportModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header Premium */}
      <div className="bg-gradient-to-br from-[#003F7D] to-[#002a56] text-white sticky top-0 z-30 shadow-md">
        <div className="container mx-auto px-4 py-4 max-w-6xl">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-3"
          >
            <ArrowLeft className="w-5 h-5" />
            <span style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '14px' }}>
              Voltar
            </span>
          </button>

          <div className="flex flex-col gap-3">
            {/* Title and Badge */}
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 bg-[#FFC947] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Crown className="w-7 h-7 text-[#003F7D]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h1 
                    className="text-white"
                    style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '24px' }}
                  >
                    Dashboard do Assinante
                  </h1>
                  <span 
                    className="px-2.5 py-1 bg-[#FFC947] text-[#003F7D] rounded-full flex-shrink-0"
                    style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '11px' }}
                  >
                    PREMIUM
                  </span>
                </div>
                <p 
                  className="text-white/90"
                  style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '14px', lineHeight: '1.5' }}
                >
                  Visão geral de desempenho e participação
                </p>
              </div>
            </div>

            {/* Report Button - Full width on mobile */}
            <Button
              onClick={() => setIsReportModalOpen(true)}
              className="w-full md:w-auto bg-[#FFC947] hover:bg-[#FFD97D] text-[#003F7D] shadow-lg h-11"
              style={{ fontFamily: 'Inter', fontWeight: 600 }}
            >
              <Download className="w-4 h-4 mr-2" />
              Gerar relatório
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6 max-w-6xl space-y-6">
        {/* Filtros */}
        <FilterBar
          onPeriodChange={setSelectedPeriod}
          onContentTypeChange={setSelectedType}
        />

        {/* Métricas Resumidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total de participantes"
            value="47.8K"
            subtitle="Último mês"
            icon={TrendingUp}
            iconColor="#008344"
            trend={{ value: '+12.5%', isPositive: true }}
          />
          <MetricCard
            title="Visualizações totais"
            value="142K"
            subtitle="Todas as postagens"
            icon={Eye}
            iconColor="#007AFF"
            trend={{ value: '+8.3%', isPositive: true }}
          />
          <MetricCard
            title="Engajamento médio"
            value="65%"
            subtitle="Curtidas e compartilhamentos"
            icon={Heart}
            iconColor="#E5484D"
            trend={{ value: '+5.2%', isPositive: true }}
          />
          <MetricCard
            title="Votações ativas"
            value={mockActivePolls.length.toString()}
            subtitle="Em andamento"
            icon={BarChart3}
            iconColor="#FFC947"
          />
        </div>

        {/* Posts Rankings */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <PostRankingCard
            title="Posts mais curtidos"
            data={mockTopLikes}
            metricType="likes"
          />
          <PostRankingCard
            title="Posts mais visualizados"
            data={mockTopViews}
            metricType="views"
          />
          <PostRankingCard
            title="Posts mais compartilhados"
            data={mockTopShares}
            metricType="shares"
          />
        </div>

        {/* Enquetes e Votações */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PollMetricsCard
            title="Votações em andamento"
            data={mockActivePolls}
            status="active"
            onViewDetails={(id) => console.log('View active poll:', id)}
          />
          <PollMetricsCard
            title="Votações encerradas"
            data={mockClosedPolls}
            status="closed"
            onViewDetails={(id) => console.log('View closed poll:', id)}
          />
        </div>

        {/* Artigos de Educação */}
        <EducationArticlesCard
          data={mockArticles}
          onArticleClick={(id) => console.log('View article:', id)}
        />

        {/* Info Card - Origem dos Dados */}
        <div className="bg-white border border-[#E4E4E4] rounded-lg p-5">
          <h3 
            className="text-[#2A2A2A] mb-3"
            style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '15px' }}
          >
            📊 Origem dos dados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-3 bg-[#FAFAFA] rounded-lg">
              <h4 
                className="text-[#003F7D] mb-1"
                style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '13px' }}
              >
                Feed (Início)
              </h4>
              <p 
                className="text-[#666666]"
                style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '1.5' }}
              >
                Posts mais curtidos, visualizados e compartilhados
              </p>
            </div>
            <div className="p-3 bg-[#FAFAFA] rounded-lg">
              <h4 
                className="text-[#008344] mb-1"
                style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '13px' }}
              >
                Educação Política
              </h4>
              <p 
                className="text-[#666666]"
                style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '1.5' }}
              >
                Artigos mais acessados e tempo de leitura
              </p>
            </div>
            <div className="p-3 bg-[#FAFAFA] rounded-lg">
              <h4 
                className="text-[#FFC947] mb-1"
                style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '13px' }}
              >
                Votação Coletiva
              </h4>
              <p 
                className="text-[#666666]"
                style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px', lineHeight: '1.5' }}
              >
                Percentuais, participantes e status das enquetes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Report Modal */}
      <ReportGeneratorModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        onGenerate={handleGenerateReport}
      />
    </div>
  );
}