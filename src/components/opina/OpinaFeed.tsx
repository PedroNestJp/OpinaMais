import { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { ThumbsUp, ThumbsDown, Share2, Volume2, FileText, TrendingUp, MessageSquare, BarChart3, CheckCircle2, Eye, Users, ChevronRight } from '../icons';
import { InstagramShareTemplate } from './InstagramShareTemplate';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel';
import { OpinaPoll } from './OpinaPoll';
import { PrioritiesModal } from './PrioritiesModal';
import { api, CategoryResponse } from '../../lib/api.ts';
import opinaPlusLogo from 'figma:asset/39a9e75927b809ece9dd0193bc4b5f71704027b2.png';

interface OpinaFeedProps {
  userInterests: string[];
  audioMode: boolean;
  isAnonymous?: boolean;
  authToken?: string | null;
}

interface FeedPost {
  id: number;
  type: 'pl' | 'pauta' | 'consulta' | 'transparencia' | 'discussao' | 'poll';
  category: string;
  title: string;
  summary: string;
  date: string;
  likes: number;
  dislikes: number;
  userVote?: 'like' | 'dislike' | null;
  source: string;
  audioText?: string;
  views?: number;
  participants?: number;
  fromBackend?: boolean;
  backendId?: number;
  backendType?: 'post' | 'poll';
  categoryId?: number;
  categoryTitle?: string;
  // Dados da enquete
  pollData?: {
    pollType: 'multiple-choice' | 'scale' | 'multiple-select' | 'approval';
    pollCategory?: 'geral' | 'pavimentacao' | 'iluminacao' | 'seguranca' | 'lazer' | 'andamento';
    options?: Array<{ id: string; text: string; votes: number }>;
    maxSelections?: number;
    minScale?: number;
    maxScale?: number;
    allowComment: boolean;
    startDate: string;
    endDate: string;
    totalVoters: number;
    resultsUsage: string;
  };
}

const feedPosts: FeedPost[] = [
  {
    id: 1,
    type: 'pl',
    category: 'mobility',
    title: 'PL 045/2024 - Corredores exclusivos para ônibus',
    summary: 'Proposta para criar 15km de faixas exclusivas em 5 avenidas principais da cidade. Previsão de reduzir tempo de viagem em até 30% nas linhas afetadas.',
    date: '20/11/2024',
    likes: 847,
    dislikes: 123,
    views: 3450,
    participants: 970,
    source: 'Câmara Municipal',
    audioText: 'Projeto de Lei 045 de 2024. Corredores exclusivos para ônibus. Proposta para criar 15 quilômetros de faixas exclusivas em 5 avenidas principais da cidade...',
  },
  {
    id: 2,
    type: 'consulta',
    category: 'environment',
    title: 'Consulta Pública: Escolha o design do Parque Linear',
    summary: 'Participe da escolha do projeto arquitetônico para o novo Parque Linear do Rio Verde. Três opções disponíveis. Votação aberta até 30/11.',
    date: '19/11/2024',
    likes: 1234,
    dislikes: 45,
    views: 5234,
    participants: 1279,
    source: 'Secretaria do Meio Ambiente',
    audioText: 'Consulta Pública. Escolha o design do Parque Linear. Participe da escolha do projeto arquitetônico...',
  },
  // Enquete de Votação Coletiva - Prioridades 2025
  {
    id: 100,
    type: 'poll',
    category: 'infrastructure',
    title: 'Prioridades da sua região em 2025',
    summary: 'O que você considera mais urgente na sua região?',
    date: '23/11/2024',
    likes: 0,
    dislikes: 0,
    views: 2890,
    participants: 856,
    source: 'Prefeitura Municipal',
    audioText: 'Enquete de Votação Coletiva. Prioridades da sua região em 2025...',
    pollData: {
      pollType: 'multiple-choice',
      pollCategory: 'geral',
      options: [
        { id: 'opt1', text: 'Pavimentação de ruas', votes: 234 },
        { id: 'opt2', text: 'Iluminação pública', votes: 189 },
        { id: 'opt3', text: 'Segurança', votes: 312 },
        { id: 'opt4', text: 'Áreas de lazer', votes: 121 },
      ],
      allowComment: true,
      startDate: '23/11/2024',
      endDate: '30/12/2024',
      totalVoters: 856,
      resultsUsage: 'Os resultados desta enquete serão utilizados para definir as prioridades do planejamento municipal de 2025.',
    },
  },
  // Enquete: Pavimentação de ruas
  {
    id: 101,
    type: 'poll',
    category: 'infrastructure',
    title: 'Qual via deve ser pavimentada primeiro?',
    summary: 'Vote na rua prioritária para receber pavimentação asfáltica',
    date: '20/11/2024',
    likes: 0,
    dislikes: 0,
    views: 1890,
    participants: 542,
    source: 'Secretaria de Obras',
    audioText: 'Enquete sobre pavimentação de ruas...',
    pollData: {
      pollType: 'multiple-choice',
      pollCategory: 'pavimentacao',
      options: [
        { id: 'p1', text: 'Rua das Flores', votes: 198 },
        { id: 'p2', text: 'Avenida Central', votes: 234 },
        { id: 'p3', text: 'Rua São José', votes: 110 },
      ],
      allowComment: true,
      startDate: '20/11/2024',
      endDate: '15/12/2024',
      totalVoters: 542,
      resultsUsage: 'A via mais votada receberá pavimentação no primeiro trimestre de 2025.',
    },
  },
  // Enquete: Iluminação pública
  {
    id: 102,
    type: 'poll',
    category: 'infrastructure',
    title: 'Bairros prioritários para nova iluminação LED',
    summary: 'Escolha qual bairro deve receber iluminação pública moderna',
    date: '21/11/2024',
    likes: 0,
    dislikes: 0,
    views: 2340,
    participants: 687,
    source: 'Secretaria de Infraestrutura',
    audioText: 'Enquete sobre iluminação pública...',
    pollData: {
      pollType: 'multiple-choice',
      pollCategory: 'iluminacao',
      options: [
        { id: 'i1', text: 'Centro', votes: 245 },
        { id: 'i2', text: 'Jardim Primavera', votes: 312 },
        { id: 'i3', text: 'Vila Nova', votes: 130 },
      ],
      allowComment: true,
      startDate: '21/11/2024',
      endDate: '20/12/2024',
      totalVoters: 687,
      resultsUsage: 'O bairro escolhido receberá instalação de 200 luminárias LED até março de 2025.',
    },
  },
  // Enquete: Segurança
  {
    id: 103,
    type: 'poll',
    category: 'infrastructure',
    title: 'Prioridade em segurança pública',
    summary: 'Qual medida de segurança é mais urgente no seu bairro?',
    date: '22/11/2024',
    likes: 0,
    dislikes: 0,
    views: 3120,
    participants: 923,
    source: 'Secretaria de Segurança',
    audioText: 'Enquete sobre segurança pública...',
    pollData: {
      pollType: 'multiple-choice',
      pollCategory: 'seguranca',
      options: [
        { id: 's1', text: 'Mais câmeras de vigilância', votes: 412 },
        { id: 's2', text: 'Rondas da Guarda Municipal', votes: 334 },
        { id: 's3', text: 'Iluminação em pontos escuros', votes: 177 },
      ],
      allowComment: true,
      startDate: '22/11/2024',
      endDate: '25/12/2024',
      totalVoters: 923,
      resultsUsage: 'As medidas mais votadas serão implementadas nos 3 bairros com maior demanda.',
    },
  },
  // Enquete: Áreas de lazer
  {
    id: 104,
    type: 'poll',
    category: 'infrastructure',
    title: 'Novo equipamento para praça municipal',
    summary: 'Vote no equipamento que deve ser instalado na Praça da Liberdade',
    date: '18/11/2024',
    likes: 0,
    dislikes: 0,
    views: 1650,
    participants: 478,
    source: 'Secretaria de Esportes',
    audioText: 'Enquete sobre áreas de lazer...',
    pollData: {
      pollType: 'multiple-choice',
      pollCategory: 'lazer',
      options: [
        { id: 'l1', text: 'Academia ao ar livre', votes: 198 },
        { id: 'l2', text: 'Playground infantil', votes: 167 },
        { id: 'l3', text: 'Quadra poliesportiva', votes: 113 },
      ],
      allowComment: true,
      startDate: '18/11/2024',
      endDate: '10/12/2024',
      totalVoters: 478,
      resultsUsage: 'O equipamento vencedor será instalado até fevereiro de 2025.',
    },
  },
  // Enquete: Em Andamento - Ampliação da Ciclovia
  {
    id: 105,
    type: 'poll',
    category: 'mobility',
    title: 'PL 156/2024 - Ampliação da rede de ciclovias',
    summary: 'Projeto em tramitação para criar 25km de ciclovias conectando bairros ao centro. Investimento estimado: R$ 8 milhões.',
    date: '22/11/2024',
    likes: 0,
    dislikes: 0,
    views: 4230,
    participants: 1543,
    source: 'Câmara Municipal',
    audioText: 'Votação em andamento sobre ampliação da rede de ciclovias...',
    pollData: {
      pollType: 'approval',
      pollCategory: 'andamento',
      options: [
        { id: 'favor', text: 'A favor', votes: 1124 },
        { id: 'contra', text: 'Contra', votes: 419 },
      ],
      allowComment: true,
      startDate: '22/11/2024',
      endDate: '05/12/2024',
      totalVoters: 1543,
      resultsUsage: 'Esta votação será considerada pela Câmara Municipal na análise do projeto. A posição da população será apresentada aos vereadores.',
    },
  },
  {
    id: 3,
    type: 'pauta',
    category: 'health',
    title: 'Em discussão: Ampliação de horários nos postos de saúde',
    summary: 'Sessão extraordinária debaterá funcionamento de 10 Unidades Básicas de Saúde até 21h. Audiência pública quinta-feira às 19h no plenário.',
    date: '18/11/2024',
    likes: 2341,
    dislikes: 187,
    views: 6890,
    participants: 2528,
    source: 'Câmara Municipal',
    audioText: 'Em discussão. Ampliação de horários nos postos de saúde. Sessão extraordinária debaterá funcionamento...',
  },
  {
    id: 4,
    type: 'transparencia',
    category: 'infrastructure',
    title: 'Atualização: Obra da Praça Central está 35% concluída',
    summary: 'Revitalização da Praça Central com investimento de R$ 157 mil dos R$ 450 mil previstos. Previsão de conclusão: 01/12/2024.',
    date: '17/11/2024',
    likes: 456,
    dislikes: 89,
    views: 1890,
    participants: 545,
    source: 'Secretaria de Obras',
    audioText: 'Atualização de obra. Praça Central está 35% concluída. Revitalização com investimento...',
  },
  {
    id: 5,
    type: 'discussao',
    category: 'education',
    title: 'Participe: Onde construir as novas creches?',
    summary: 'Ajude a definir os bairros prioritários para construção de 3 novas creches municipais em 2025. Sua opinião é importante para a decisão final.',
    date: '16/11/2024',
    likes: 3124,
    dislikes: 234,
    views: 8234,
    participants: 3358,
    source: 'Secretaria de Educação',
    audioText: 'Participe da discussão. Onde construir as novas creches? Ajude a definir os bairros prioritários...',
  },
  // Novos Projetos de Lei
  {
    id: 11,
    type: 'pl',
    category: 'environment',
    title: 'PL 089/2024 - Proibição de canudos plásticos',
    summary: 'Projeto de lei que proíbe o uso de canudos e utensílios descartáveis de plástico em estabelecimentos comerciais. Prazo de adaptação: 180 dias.',
    date: '22/11/2024',
    likes: 1842,
    dislikes: 234,
    views: 4234,
    participants: 2076,
    source: 'Câmara Municipal',
    audioText: 'Projeto de Lei 089 de 2024. Proibição de canudos plásticos em estabelecimentos comerciais...',
  },
  {
    id: 12,
    type: 'pl',
    category: 'health',
    title: 'PL 102/2024 - Telemedicina na rede pública',
    summary: 'Proposta para implementar atendimento médico por videochamada nas UBS. Meta: 50% das consultas de retorno online até 2025.',
    date: '21/11/2024',
    likes: 2456,
    dislikes: 412,
    views: 6123,
    participants: 2868,
    source: 'Câmara Municipal',
    audioText: 'Projeto de Lei 102 de 2024. Telemedicina na rede pública municipal...',
  },
  {
    id: 13,
    type: 'pl',
    category: 'education',
    title: 'PL 067/2024 - Educação financeira nas escolas',
    summary: 'Inclusão obrigatória de aulas de educação financeira no currículo das escolas municipais a partir do 6º ano. Implementação prevista para 2025.',
    date: '19/11/2024',
    likes: 3234,
    dislikes: 156,
    views: 7890,
    participants: 3390,
    source: 'Câmara Municipal',
    audioText: 'Projeto de Lei 067 de 2024. Educação financeira obrigatória nas escolas municipais...',
  },
  {
    id: 14,
    type: 'pl',
    category: 'mobility',
    title: 'PL 078/2024 - Ciclofaixas nos finais de semana',
    summary: 'Criação de ciclofaixas temporárias aos domingos em 8 vias principais da cidade. Inspirado em modelos de outras capitais.',
    date: '15/11/2024',
    likes: 1567,
    dislikes: 678,
    views: 3456,
    participants: 2245,
    source: 'Câmara Municipal',
    audioText: 'Projeto de Lei 078 de 2024. Ciclofaixas temporárias nos finais de semana...',
  },
  {
    id: 15,
    type: 'pl',
    category: 'infrastructure',
    title: 'PL 091/2024 - Wi-Fi gratuito em praças e parques',
    summary: 'Instalação de internet pública gratuita em todas as 25 praças e 8 parques municipais. Investimento estimado: R$ 2,3 milhões.',
    date: '12/11/2024',
    likes: 2890,
    dislikes: 234,
    views: 5678,
    participants: 3124,
    source: 'Câmara Municipal',
    audioText: 'Projeto de Lei 091 de 2024. Wi-Fi gratuito em praças e parques municipais...',
  },
  // Novas Consultas Públicas
  {
    id: 16,
    type: 'consulta',
    category: 'mobility',
    title: 'Consulta Pública: Redesenho do sistema de transporte',
    summary: 'A prefeitura quer ouvir a população sobre mudanças nas linhas de ônibus. Participe da consulta até 5/12 e sugira melhorias.',
    date: '21/11/2024',
    likes: 1876,
    dislikes: 234,
    views: 4567,
    participants: 2110,
    source: 'Secretaria de Mobilidade',
    audioText: 'Consulta Pública sobre o redesenho do sistema de transporte municipal...',
  },
  {
    id: 17,
    type: 'consulta',
    category: 'health',
    title: 'Consulta Pública: Prioridades da Saúde Mental',
    summary: 'Ajude a definir as ações prioritárias para o Centro de Atenção Psicossocial (CAPS). Sua experiência importa.',
    date: '18/11/2024',
    likes: 1456,
    dislikes: 123,
    views: 3890,
    participants: 1579,
    source: 'Secretaria de Saúde',
    audioText: 'Consulta Pública sobre prioridades em saúde mental...',
  },
  {
    id: 18,
    type: 'consulta',
    category: 'education',
    title: 'Consulta Pública: Nome da nova escola municipal',
    summary: 'Vote no nome da nova escola do bairro Jardim das Flores. 5 opções homenageiam personalidades locais importantes.',
    date: '14/11/2024',
    likes: 2345,
    dislikes: 67,
    views: 6234,
    participants: 2412,
    source: 'Secretaria de Educação',
    audioText: 'Consulta Pública para escolher o nome da nova escola municipal...',
  },
  {
    id: 19,
    type: 'consulta',
    category: 'infrastructure',
    title: 'Consulta Pública: Revitalização do Centro Histórico',
    summary: 'Compartilhe ideias para o projeto de revitalização. Queremos um centro histórico vivo, acessível e sustentável.',
    date: '11/11/2024',
    likes: 1678,
    dislikes: 234,
    views: 4123,
    participants: 1912,
    source: 'Secretaria de Planejamento',
    audioText: 'Consulta Pública sobre a revitalização do Centro Histórico...',
  },
  // Novas Transparências
  {
    id: 20,
    type: 'transparencia',
    category: 'health',
    title: 'Transparência: Vacinação infantil atingiu 92% da meta',
    summary: 'Campanha de vacinação 2024 superou expectativas. 18.450 crianças imunizadas. Confira os dados por região.',
    date: '20/11/2024',
    likes: 3456,
    dislikes: 78,
    views: 8901,
    participants: 3534,
    source: 'Secretaria de Saúde',
    audioText: 'Transparência. Campanha de vacinação infantil atingiu 92% da meta estabelecida...',
  },
  {
    id: 21,
    type: 'transparencia',
    category: 'education',
    title: 'Transparência: Investimento em merenda escolar cresceu 23%',
    summary: 'Orçamento para alimentação escolar aumentou de R$ 3,2 milhões para R$ 3,9 milhões em 2024. Beneficia 12 mil alunos.',
    date: '16/11/2024',
    likes: 2890,
    dislikes: 234,
    views: 6789,
    participants: 3124,
    source: 'Secretaria de Educação',
    audioText: 'Transparência. Investimento em merenda escolar cresceu 23% em 2024...',
  },
  {
    id: 22,
    type: 'transparencia',
    category: 'environment',
    title: 'Transparência: Coleta seletiva reciclou 340 toneladas',
    summary: 'Programa de reciclagem bateu recorde em outubro. Aumento de 45% vs. ano anterior. Veja os materiais mais reciclados.',
    date: '13/11/2024',
    likes: 1567,
    dislikes: 89,
    views: 3456,
    participants: 1656,
    source: 'Secretaria do Meio Ambiente',
    audioText: 'Transparência. Coleta seletiva reciclou 340 toneladas em outubro...',
  },
  {
    id: 23,
    type: 'transparencia',
    category: 'mobility',
    title: 'Transparência: Obras de sinalização em 45 cruzamentos',
    summary: 'Conclusão da instalação de semáforos e faixas de pedestres. Investimento: R$ 1,2 milhão. Redução de 35% em acidentes.',
    date: '10/11/2024',
    likes: 1234,
    dislikes: 156,
    views: 4567,
    participants: 1390,
    source: 'Secretaria de Mobilidade',
    audioText: 'Transparência. Obras de sinalização concluídas em 45 cruzamentos da cidade...',
  },
  // Novas Pautas/Discussões
  {
    id: 24,
    type: 'pauta',
    category: 'environment',
    title: 'Em pauta: Criação do Parque Municipal da Serra',
    summary: 'Projeto de preservação ambiental será votado dia 28/11. Área de 850 hectares será transformada em unidade de conservação.',
    date: '19/11/2024',
    likes: 2678,
    dislikes: 345,
    views: 7123,
    participants: 3023,
    source: 'Câmara Municipal',
    audioText: 'Em pauta. Criação do Parque Municipal da Serra para preservação ambiental...',
  },
  {
    id: 25,
    type: 'pauta',
    category: 'infrastructure',
    title: 'Em pauta: Construção de terminal rodoviário',
    summary: 'Audiência pública dia 2/12 discutirá localização e projeto do novo terminal. Investimento previsto: R$ 45 milhões.',
    date: '17/11/2024',
    likes: 1890,
    dislikes: 567,
    views: 5234,
    participants: 2457,
    source: 'Câmara Municipal',
    audioText: 'Em pauta. Construção de novo terminal rodoviário municipal...',
  },
  {
    id: 26,
    type: 'discussao',
    category: 'health',
    title: 'Participe: Melhorias no atendimento de urgência',
    summary: 'Compartilhe sua experiência e sugestões para melhorar o atendimento nas UPAs. Sua voz será ouvida pelos gestores.',
    date: '15/11/2024',
    likes: 2345,
    dislikes: 234,
    views: 6123,
    participants: 2579,
    source: 'Secretaria de Saúde',
    audioText: 'Participe da discussão sobre melhorias no atendimento de urgência e emergência...',
  },
];

const categoryInfo: Record<string, { label: string; color: string }> = {
  mobility: { label: 'Mobilidade', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  environment: { label: 'Meio Ambiente', color: 'bg-green-100 text-green-700 border-green-200' },
  health: { label: 'Saúde', color: 'bg-red-100 text-red-700 border-red-200' },
  infrastructure: { label: 'Obras', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  education: { label: 'Educação', color: 'bg-purple-100 text-purple-700 border-purple-200' },
};

const getCategoryInfo = (key: string) =>
  categoryInfo[key] || {
    label: key || 'Geral',
    color: 'bg-gray-100 text-gray-700 border-gray-200',
  };

const mapCategoryFromTitle = (title: string) => {
  const normalized = title.toLowerCase();
  if (normalized.includes('saú') || normalized.includes('saud')) return 'health';
  if (normalized.includes('educ')) return 'education';
  if (normalized.includes('ambi') || normalized.includes('meio')) return 'environment';
  if (normalized.includes('mobil') || normalized.includes('transp')) return 'mobility';
  if (normalized.includes('obra') || normalized.includes('infra')) return 'infrastructure';
  return 'education';
};

const formatAsBrazilianDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const typeInfo: Record<string, { label: string; icon: any }> = {
  pl: { label: 'Projeto de Lei', icon: FileText },
  pauta: { label: 'Em Pauta', icon: TrendingUp },
  consulta: { label: 'Consulta Pública', icon: MessageSquare },
  transparencia: { label: 'Transparência', icon: BarChart3 },
  discussao: { label: 'Participe', icon: MessageSquare },
  poll: { label: 'Enquete', icon: MessageSquare },
};

export function OpinaFeed({ userInterests, audioMode, isAnonymous, authToken }: OpinaFeedProps) {
  const [posts, setPosts] = useState(feedPosts);
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [backendError, setBackendError] = useState<string | null>(null);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [loadingPolls, setLoadingPolls] = useState(false);
  const [followedCategoryIds, setFollowedCategoryIds] = useState<Set<number>>(new Set());
  const [followedPosts, setFollowedPosts] = useState<FeedPost[]>([]);
  const [loadingFollowed, setLoadingFollowed] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [instagramDialogOpen, setInstagramDialogOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<FeedPost | null>(null);
  const [currentFilter, setCurrentFilter] = useState<string>('todos');
  const [pollCategoryFilter, setPollCategoryFilter] = useState<string>('todas'); // Filtro de categorias de enquetes
  const [votedPolls, setVotedPolls] = useState<Set<string>>(new Set()); // Rastrear enquetes votadas
  const [prioritiesModalOpen, setPrioritiesModalOpen] = useState(false); // Modal de prioridades
  const [prioritiesFilter, setPrioritiesFilter] = useState<string>('pavimentacao'); // Filtro do modal
  const [showPollHistory, setShowPollHistory] = useState(false);

  useEffect(() => {
    const bootstrap = async () => {
      await Promise.all([loadCategories(), loadPolls()]);
    };
    bootstrap();
  }, []);

  useEffect(() => {
    if (selectedCategoryId) {
      loadPosts(selectedCategoryId);
    }
  }, [selectedCategoryId]);

  useEffect(() => {
    if (authToken && categories.length > 0) {
      loadFollowedPosts();
    }
  }, [authToken, categories.length]);

  const loadCategories = async () => {
    try {
      const response = await api.listCategories();
      setCategories(response);
      if (!selectedCategoryId && response.length > 0) {
        setSelectedCategoryId(response[0].id);
      }
    } catch (error) {
      setBackendError(
        error instanceof Error ? error.message : 'Erro ao carregar categorias.',
      );
    }
  };

  const loadPosts = async (categoryId: number) => {
    setLoadingPosts(true);
    setBackendError(null);
    try {
      const response = await api.listPostsByCategory(categoryId);
      const categoryTitle =
        categories.find((category) => category.id === categoryId)?.title ||
        'Geral';

      const mapped: FeedPost[] = response.map((post) => {
        const categoryKey = mapCategoryFromTitle(categoryTitle);
        return {
          id: Number(`9${post.id}`),
          backendId: post.id,
          backendType: 'post',
          fromBackend: true,
          categoryId: post.categoryId,
          categoryTitle,
          type: 'pauta',
          category: categoryKey,
          title: post.title,
          summary:
            post.content.length > 220
              ? `${post.content.slice(0, 220)}...`
              : post.content,
          date: formatAsBrazilianDate(new Date()),
          likes: 0,
          dislikes: 0,
          source: 'Conteúdo oficial',
          audioText: post.content,
        };
      });

      setPosts((prev) => {
        const withoutBackendPosts = prev.filter(
          (post) => !(post.fromBackend && post.backendType === 'post'),
        );
        return [...mapped, ...withoutBackendPosts];
      });
    } catch (error) {
      setBackendError(
        error instanceof Error ? error.message : 'Erro ao carregar posts.',
      );
    } finally {
      setLoadingPosts(false);
    }
  };

  const loadPolls = async () => {
    setLoadingPolls(true);
    setBackendError(null);
    try {
      const response = await api.listPolls();
      const mapped: FeedPost[] = response.map((poll) => {
        const totalVoters = poll.votesFor + poll.votesAgainst;
        const startDate = formatAsBrazilianDate(new Date());
        const endDate = formatAsBrazilianDate(
          new Date(Date.now() + 1000 * 60 * 60 * 24 * 15),
        );

        return {
          id: Number(`8${poll.id}`),
          backendId: poll.id,
          backendType: 'poll',
          fromBackend: true,
          category: 'infrastructure',
          title: poll.title,
          summary: poll.description || 'Enquete oficial',
          date: startDate,
          likes: 0,
          dislikes: 0,
          source: 'Enquete oficial',
          audioText: poll.description || poll.title,
          pollData: {
            pollType: 'multiple-choice',
            pollCategory: 'geral',
            options: [
              { id: 'favor', text: 'A favor', votes: poll.votesFor },
              { id: 'contra', text: 'Contra', votes: poll.votesAgainst },
            ],
            allowComment: false,
            startDate,
            endDate,
            totalVoters,
            resultsUsage: 'Dados retornados pela API oficial',
          },
        };
      });

      setPosts((prev) => {
        const withoutBackendPolls = prev.filter(
          (post) => !(post.fromBackend && post.backendType === 'poll'),
        );
        return [...mapped, ...withoutBackendPolls];
      });
    } catch (error) {
      setBackendError(
        error instanceof Error ? error.message : 'Erro ao carregar enquetes.',
      );
    } finally {
      setLoadingPolls(false);
    }
  };

  const loadFollowedPosts = async () => {
    if (!authToken) return;
    setLoadingFollowed(true);
    setBackendError(null);
    try {
      const response = await api.listFollowedPosts();
      const mapped: FeedPost[] = response.map((post) => {
        const categoryTitle =
          categories.find((cat) => cat.id === post.categoryId)?.title || 'Geral';
        const categoryKey = mapCategoryFromTitle(categoryTitle);
        return {
          id: Number(`7${post.id}`),
          backendId: post.id,
          backendType: 'post',
          fromBackend: true,
          categoryId: post.categoryId,
          categoryTitle,
          type: 'pauta',
          category: categoryKey,
          title: post.title,
          summary:
            post.content.length > 220
              ? `${post.content.slice(0, 220)}...`
              : post.content,
          date: formatAsBrazilianDate(new Date()),
          likes: 0,
          dislikes: 0,
          source: 'Categorias seguidas',
          audioText: post.content,
        };
      });
      setFollowedCategoryIds(new Set(response.map((post) => post.categoryId)));
      setFollowedPosts(mapped);
    } catch (error) {
      setBackendError(
        error instanceof Error ? error.message : 'Erro ao carregar posts das categorias seguidas.',
      );
    } finally {
      setLoadingFollowed(false);
    }
  };

  const handleToggleFollow = async (categoryId: number) => {
    if (!authToken) {
      alert('Faça login para seguir categorias e receber posts personalizados.');
      return;
    }

    setLoadingFollowed(true);
    setBackendError(null);
    const next = new Set(followedCategoryIds);
    if (next.has(categoryId)) {
      next.delete(categoryId);
    } else {
      next.add(categoryId);
    }

    try {
      const response = await api.followCategories(Array.from(next));
      const ids = new Set(response.map((cat) => cat.id));
      setFollowedCategoryIds(ids);
      await loadFollowedPosts();
    } catch (error) {
      setBackendError(
        error instanceof Error ? error.message : 'Erro ao seguir categorias.',
      );
    } finally {
      setLoadingFollowed(false);
    }
  };

  const handleVote = (postId: number, voteType: 'like' | 'dislike') => {
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;

        const currentVote = post.userVote;
        let newLikes = post.likes;
        let newDislikes = post.dislikes;
        let newVote: 'like' | 'dislike' | null = voteType;

        if (currentVote === 'like') newLikes--;
        if (currentVote === 'dislike') newDislikes--;

        if (currentVote === voteType) {
          newVote = null;
        } else {
          if (voteType === 'like') newLikes++;
          if (voteType === 'dislike') newDislikes++;
        }

        return {
          ...post,
          likes: newLikes,
          dislikes: newDislikes,
          userVote: newVote,
        };
      }).sort((a, b) => {
        const scoreA = a.likes - a.dislikes;
        const scoreB = b.likes - b.dislikes;
        return scoreB - scoreA;
      })
    );
  };

  const handlePollVote = async (pollId: string, response: any) => {
    const targetPoll = posts.find((post) => post.id.toString() === pollId);

    if (targetPoll?.fromBackend && targetPoll.backendType === 'poll') {
      if (!authToken) {
        alert('Para votar nas enquetes oficiais, faça login ou crie sua conta.');
        return;
      }

      try {
        const isInFavor =
          response?.selectedOptions?.[0] === 'favor' ||
          response?.scaleValue === undefined
            ? response?.selectedOptions?.[0] !== 'contra'
            : response?.scaleValue > 2;
        await api.votePoll(targetPoll.backendId as number, Boolean(isInFavor));
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Não foi possível registrar seu voto.';
        alert(message);
        return;
      }
    }

    setVotedPolls((prev) => new Set(prev).add(pollId));
  };

  const handleAudioPlay = (post: FeedPost) => {
    alert(`🔊 Ouvindo: ${post.title}\n\nEm produção, usar Web Speech API:\nwindow.speechSynthesis.speak(new SpeechSynthesisUtterance("${post.audioText}"))`);
  };

  const handleShare = (post: FeedPost) => {
    setSelectedPost(post);
    setShareDialogOpen(true);
  };

  const shareToWhatsApp = () => {
    if (!selectedPost) return;
    const text = `${selectedPost.title}\n\n${selectedPost.summary}\n\nVia Opina+ - Sua voz na democracia\nhttps://opinamais.app/post/${selectedPost.id}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const shareToInstagram = () => {
    if (!selectedPost) return;
    setShareDialogOpen(false);
    setInstagramDialogOpen(true);
  };

  const copyLink = () => {
    if (!selectedPost) return;
    const link = `https://opinamais.app/post/${selectedPost.id}`;
    
    // Fallback para ambientes sem suporte ao Clipboard API
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(link).then(() => {
          alert('✓ Link copiado!');
        }).catch(() => {
          fallbackCopyText(link);
        });
      } else {
        fallbackCopyText(link);
      }
    } catch (err) {
      fallbackCopyText(link);
    }
  };

  const fallbackCopyText = (text: string) => {
    // Método alternativo para copiar texto
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
      alert('✓ Link copiado!');
    } catch (err) {
      alert('❌ Não foi possível copiar o link. URL: ' + text);
    }
    document.body.removeChild(textArea);
  };

  const filteredPosts = userInterests.length > 0
    ? posts.filter((post) => userInterests.includes(post.category))
    : posts;

  // Aplicar filtro de tipo (todos, projetos, consultas, etc.)
  const typeFilteredPosts = currentFilter === 'todos'
    ? filteredPosts
    : currentFilter === 'projetos'
    ? filteredPosts.filter(post => post.type === 'pl')
    : currentFilter === 'consultas'
    ? filteredPosts.filter(post => post.type === 'consulta')
    : currentFilter === 'transparencia'
    ? filteredPosts.filter(post => post.type === 'transparencia')
    : currentFilter === 'votacao-coletiva'
    ? filteredPosts.filter(post => post.type === 'poll')
    : currentFilter === 'urgente'
    ? filteredPosts.filter(post => {
        // Marcar como urgente posts com alta participação ou recentes
        const dateObj = new Date(post.date.split('/').reverse().join('-'));
        const daysDiff = Math.floor((new Date().getTime() - dateObj.getTime()) / (1000 * 3600 * 24));
        return daysDiff <= 3 || (post.participants && post.participants > 2000);
      })
    : filteredPosts;

  // Seções especiais
  const mostViewedPosts = [...typeFilteredPosts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 3);
  const mostLikedPosts = [...typeFilteredPosts].sort((a, b) => b.likes - a.likes).slice(0, 3);
  const recentPosts = [...typeFilteredPosts].sort((a, b) => {
    const dateA = new Date(a.date.split('/').reverse().join('-'));
    const dateB = new Date(b.date.split('/').reverse().join('-'));
    return dateB.getTime() - dateA.getTime();
  }).slice(0, 3);

  // Enquetes ativas (sem filtro de interesses para máxima visibilidade)
  const activePolls = posts.filter(post => {
    if (post.type !== 'poll' || !post.pollData) return false;
    const now = new Date();
    const endDate = new Date(post.pollData.endDate.split('/').reverse().join('-'));
    return now <= endDate;
  });

  // Enquetes encerradas
  const closedPolls = posts.filter(post => {
    if (post.type !== 'poll' || !post.pollData) return false;
    const now = new Date();
    const endDate = new Date(post.pollData.endDate.split('/').reverse().join('-'));
    return now > endDate;
  });

  // Chips de tópicos
  const topicChips = [
    { id: 'todos', label: 'Todos' },
    { id: 'projetos', label: 'Projetos de Lei' },
    { id: 'consultas', label: 'Consultas' },
    { id: 'transparencia', label: 'Transparência' },
    { id: 'votacao-coletiva', label: 'Votação Coletiva' },
    { id: 'urgente', label: 'Urgente' },
  ];

  const backendCategoryPosts = posts.filter(
    (post) =>
      post.fromBackend &&
      post.backendType === 'post' &&
      (selectedCategoryId ? post.categoryId === selectedCategoryId : true),
  );

  const backendPolls = posts.filter(
    (post) => post.fromBackend && post.backendType === 'poll',
  );

  // Função para renderizar card compacto (carrossel)
  const renderCompactCard = (post: FeedPost) => {
    const category = getCategoryInfo(post.category);
    
    return (
      <Card key={post.id} className="h-full border-l-4 border-l-primary relative">
        <div className="p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <Badge variant="outline" className={`border ${category.color}`}>
              {category.label}
            </Badge>
            {/* Seta indicadora de carrossel */}
            <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
          </div>
          <h4 className="text-foreground line-clamp-2">{post.title}</h4>
          <p className="text-muted-foreground text-sm line-clamp-2">{post.summary}</p>
        </div>
      </Card>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 pt-6">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="flex justify-center mb-3">
          <img src={opinaPlusLogo} alt="Opina+" className="w-32 h-auto" />
        </div>
        <p className="text-muted-foreground text-sm">
          {filteredPosts.length} conteúdos sobre os temas que você acompanha
        </p>
      </div>

      {/* Dados vindos do backend */}
      <Card className="p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-foreground">Conteúdos oficiais (API)</p>
            <p className="text-xs text-muted-foreground">
              Categorias, posts e enquetes carregados do backend Laravel
            </p>
            {backendError && (
              <p className="text-xs text-red-600 mt-1">{backendError}</p>
            )}
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              if (selectedCategoryId) loadPosts(selectedCategoryId);
              loadPolls();
            }}
            disabled={loadingPosts || loadingPolls}
          >
            {loadingPosts || loadingPolls ? 'Atualizando...' : 'Recarregar'}
          </Button>
        </div>

        {categories.length > 0 ? (
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategoryId(category.id)}
                className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                  selectedCategoryId === category.id
                    ? 'bg-primary text-white border-primary'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            {loadingPosts ? 'Carregando categorias...' : 'Nenhuma categoria cadastrada ainda.'}
          </p>
        )}

        <div className="space-y-2">
          {backendCategoryPosts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              {loadingPosts ? 'Buscando posts dessa categoria...' : 'Ainda não há posts publicados nesta categoria.'}
            </p>
          ) : (
            backendCategoryPosts.slice(0, 3).map((post) => (
              <Card key={post.id} className="p-3 border-l-4 border-primary">
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1">
                    <p className="text-[11px] text-muted-foreground uppercase tracking-wide">
                      {post.categoryTitle || getCategoryInfo(post.category).label}
                    </p>
                    <h4 className="text-sm text-foreground">{post.title}</h4>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {post.summary}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-[10px]">API</Badge>
                </div>
              </Card>
            ))
          )}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Seguir categorias (API)</p>
            {authToken ? (
              <p className="text-xs text-muted-foreground">
                Clique para seguir e receber posts recomendados
              </p>
            ) : (
              <p className="text-xs text-red-600">
                Faça login para seguir categorias
              </p>
            )}
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => {
              const isFollowed = followedCategoryIds.has(category.id);
              return (
                <button
                  key={category.id}
                  onClick={() => handleToggleFollow(category.id)}
                  className={`px-3 py-1.5 rounded-full text-xs border transition-colors ${
                    isFollowed
                      ? 'bg-primary text-white border-primary'
                      : 'bg-white text-foreground hover:bg-muted'
                  }`}
                  disabled={loadingFollowed}
                >
                  {isFollowed ? '✓ ' : '+'}{category.title}
                </button>
              );
            })}
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h4 className="text-sm text-foreground">Posts das categorias que você segue</h4>
              {loadingFollowed && <span className="text-xs text-muted-foreground">Atualizando...</span>}
            </div>
            {followedPosts.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                {authToken
                  ? loadingFollowed
                    ? 'Carregando posts personalizados...'
                    : 'Siga categorias para ver posts aqui.'
                  : 'Entre para seguir categorias.'}
              </p>
            ) : (
              followedPosts.slice(0, 4).map((post) => {
                const category = getCategoryInfo(post.category);
                return (
                  <Card key={post.id} className="p-3 border-l-4 border-primary/60">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <Badge variant="outline" className={`border ${category.color} text-[10px]`}>
                          {post.categoryTitle || category.label}
                        </Badge>
                        <h4 className="text-sm text-foreground">{post.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {post.summary}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-[10px]">Seguidas</Badge>
                    </div>
                  </Card>
                );
              })
            )}
          </div>
        </div>

        {backendPolls.length > 0 && (
          <p className="text-xs text-muted-foreground">
            Enquetes oficiais carregadas: {backendPolls.length}
          </p>
        )}
      </Card>

      {/* Chips de Tópicos */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {topicChips.map((chip) => (
          <button
            key={chip.id}
            onClick={() => setCurrentFilter(chip.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              currentFilter === chip.id
                ? 'bg-primary text-white'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <span>{chip.label}</span>
          </button>
        ))}
      </div>

      {/* Seção: Enquetes Ativas - DESTAQUE */}
      {activePolls.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-gradient-to-r from-primary to-blue-600 text-white px-4 py-2 rounded-full flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <span className="font-semibold">Enquetes Ativas</span>
            </div>
            {closedPolls.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowPollHistory(!showPollHistory)}
                className="flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                {showPollHistory ? 'Ocultar Histórico' : `Ver Histórico (${closedPolls.length})`}
              </Button>
            )}
          </div>
          
          {/* Carrossel de Enquetes Ativas */}
          <Carousel className="w-full">
            <CarouselContent>
              {activePolls.map((poll) => (
                poll.pollData && (
                  <CarouselItem key={poll.id} className="md:basis-full">
                    <OpinaPoll
                      poll={{
                        id: poll.id.toString(),
                        type: poll.pollData.pollType,
                        title: poll.title,
                        description: poll.summary,
                        options: poll.pollData.options,
                        maxSelections: poll.pollData.maxSelections,
                        minScale: poll.pollData.minScale,
                        maxScale: poll.pollData.maxScale,
                        allowComment: poll.pollData.allowComment,
                        startDate: poll.pollData.startDate,
                        endDate: poll.pollData.endDate,
                        totalVoters: poll.pollData.totalVoters,
                        category: poll.category,
                        source: poll.source,
                        resultsUsage: poll.pollData.resultsUsage,
                      }}
                      userHasVoted={votedPolls.has(poll.id.toString())}
                      onVote={handlePollVote}
                      isAnonymous={isAnonymous}
                    />
                  </CarouselItem>
                )
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          
          {/* Histórico de Enquetes Encerradas */}
          {showPollHistory && closedPolls.length > 0 && (
            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-muted">
                <BarChart3 className="w-5 h-5 text-muted-foreground" />
                <h3 className="text-foreground">Histórico de Enquetes</h3>
              </div>
              
              {closedPolls.map((poll) => (
                poll.pollData && (
                  <OpinaPoll
                    key={poll.id}
                    poll={{
                      id: poll.id.toString(),
                      type: poll.pollData.pollType,
                      title: poll.title,
                      description: poll.summary,
                      options: poll.pollData.options,
                      maxSelections: poll.pollData.maxSelections,
                      minScale: poll.pollData.minScale,
                      maxScale: poll.pollData.maxScale,
                      allowComment: poll.pollData.allowComment,
                      startDate: poll.pollData.startDate,
                      endDate: poll.pollData.endDate,
                      totalVoters: poll.pollData.totalVoters,
                      category: poll.category,
                      source: poll.source,
                      resultsUsage: poll.pollData.resultsUsage,
                    }}
                    userHasVoted={true} // Sempre mostra resultados para enquetes encerradas
                    onVote={handlePollVote}
                    isAnonymous={isAnonymous}
                  />
                )
              ))}
            </div>
          )}
          
          {/* Divider após enquetes */}
          <div className="border-t border-muted my-6"></div>
        </div>
      )}

      {/* Seção: PLs Mais Curtidos */}
      {mostLikedPosts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-5 h-5 text-primary" />
            <h2 className="text-foreground">Mais Curtidos</h2>
          </div>
          <Carousel className="w-full">
            <CarouselContent>
              {mostLikedPosts.map((post) => (
                <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
                  {renderCompactCard(post)}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}

      {/* Seção: Mais Recentes */}
      {recentPosts.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-foreground">Mais Recentes</h2>
          </div>
          <Carousel className="w-full">
            <CarouselContent>
              {recentPosts.map((post) => (
                <CarouselItem key={post.id} className="md:basis-1/2 lg:basis-1/3">
                  {renderCompactCard(post)}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}

      {/* Divider */}
      <div className="border-t border-muted my-6"></div>

      {/* Feed Principal */}
      <div className="space-y-4">
        <h2 className="text-foreground">Feed Completo</h2>
      </div>

      {/* Feed Posts - Limitado: 2 PLs + Enquete */}
      {typeFilteredPosts.filter(post => post.type === 'pl').slice(0, 2).map((post) => {
        const category = getCategoryInfo(post.category);
        const typeData = typeInfo[post.type];
        const TypeIcon = typeData.icon;

        return (
          <Card key={post.id} className="overflow-hidden border-l-4 border-l-primary">
            <div className="p-4 space-y-3">
              {/* Header */}
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <Badge variant="outline" className={`border text-xs ${category.color}`}>
                    {category.label}
                  </Badge>
                  {/* Ícone Ouvir no canto superior direito - REDUZIDO */}
                  <button
                    onClick={() => handleAudioPlay(post)}
                    className="p-1 hover:bg-muted rounded-lg transition-colors flex-shrink-0"
                    title="Ouvir conteúdo"
                  >
                    <Volume2 className="w-4 h-4 text-primary" />
                  </button>
                </div>
                <h3 className="text-foreground">{post.title}</h3>
                <p className="text-muted-foreground text-sm leading-snug">{post.summary}</p>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span>{post.source}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-1">
                {/* Like/Dislike */}
                <div className="flex items-center gap-2">
                  <Button
                    variant={post.userVote === 'like' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleVote(post.id, 'like')}
                    className={`flex-1 h-9 text-sm ${post.userVote === 'like' ? 'bg-primary hover:bg-primary/90' : ''}`}
                  >
                    <ThumbsUp className={`w-4 h-4 mr-1.5 ${post.userVote === 'like' ? 'fill-current' : ''}`} />
                    Like
                  </Button>
                  <Button
                    variant={post.userVote === 'dislike' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => handleVote(post.id, 'dislike')}
                    className={`flex-1 h-9 text-sm ${post.userVote === 'dislike' ? 'bg-muted hover:bg-muted/80' : ''}`}
                  >
                    <ThumbsDown className={`w-4 h-4 mr-1.5 ${post.userVote === 'dislike' ? 'fill-current' : ''}`} />
                    Deslike
                  </Button>
                </div>

                {/* Ver detalhes + Share */}
                <div className="flex gap-2">
                  <Button 
                    variant="default" 
                    className="flex-1 bg-primary hover:bg-primary/90 h-9 text-sm"
                    onClick={() => window.open(`https://opinamais.app/post/${post.id}`, '_blank')}
                  >
                    Ver detalhes
                  </Button>
                  {!isAnonymous && (
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleShare(post)}
                      className="h-9 w-12 p-0"
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        );
      })}

      {/* Seção: Votação Coletiva no Feed Completo */}
      {typeFilteredPosts.filter(post => post.type === 'poll' && post.pollData).length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 pt-2">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h2 className="text-foreground">Votação Coletiva</h2>
          </div>
          
          {/* Subtítulo com fonte maior */}
          <p className="text-muted-foreground text-base">
            O que você considera mais urgente na sua região?
          </p>
          
          {/* Botão para abrir modal de prioridades */}
          <button
            onClick={() => setPrioritiesModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-all"
          >
            <BarChart3 className="w-5 h-5" />
            <span className="font-semibold">📊 Prioridades da sua região em 2025</span>
          </button>
        </div>
      )}

      {typeFilteredPosts.length === 0 && (
        <Card className="p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-foreground mb-2">Nenhuma atualização disponível</h3>
          <p className="text-muted-foreground">
            {currentFilter === 'todos' 
              ? 'Não há conteúdos novos para os temas selecionados no momento.'
              : `Nenhum resultado encontrado para o filtro "${topicChips.find(c => c.id === currentFilter)?.label}".`
            }
          </p>
        </Card>
      )}

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Compartilhar conteúdo</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 pt-4">
            <Button 
              variant="outline" 
              className="w-full justify-start h-14 text-lg"
              onClick={shareToWhatsApp}
            >
              <span className="text-3xl mr-3">💬</span>
              WhatsApp
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start h-14 text-lg"
              onClick={shareToInstagram}
            >
              <span className="text-3xl mr-3">📸</span>
              Instagram
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start h-14 text-lg"
              onClick={copyLink}
            >
              <span className="text-3xl mr-3">🔗</span>
              Copiar link
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Instagram Share Dialog */}
      <Dialog open={instagramDialogOpen} onOpenChange={setInstagramDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Compartilhar no Instagram Stories</DialogTitle>
          </DialogHeader>
          {selectedPost && (
            <div className="space-y-4 pt-4">
              {/* Preview do template */}
              <div className="bg-gray-50 rounded-lg p-4 flex justify-center overflow-auto">
                <div
                  className="transform origin-top-left"
                  style={{
                    transform: 'scale(0.3)',
                    width: '1080px',
                    height: '1920px',
                    marginLeft: '-378px',
                    marginTop: '-672px',
                    marginBottom: '-672px',
                    marginRight: '-378px',
                  }}
                >
                  <InstagramShareTemplate
                    category={getCategoryInfo(selectedPost.category).label}
                    categoryColor={
                      selectedPost.category === 'mobility' ? '#007AFF' :
                      selectedPost.category === 'environment' ? '#35C759' :
                      selectedPost.category === 'health' ? '#FF3B30' :
                      selectedPost.category === 'infrastructure' ? '#FF9500' :
                      '#AF52DE'
                    }
                    plNumber={selectedPost.title.split('-')[0].trim()}
                    voteType={
                      selectedPost.userVote === 'like' ? 'favor' :
                      selectedPost.userVote === 'dislike' ? 'contra' :
                      'indeciso'
                    }
                    title={selectedPost.title.split('-').slice(1).join('-').trim() || selectedPost.title}
                    description={selectedPost.summary}
                    communityApproval={Math.round((selectedPost.likes / (selectedPost.likes + selectedPost.dislikes)) * 100)}
                    entity={selectedPost.source}
                    date={selectedPost.date}
                  />
                </div>
              </div>

              {/* Instruções */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">
                  📱 <strong>Como compartilhar:</strong>
                </p>
                <ol className="text-sm text-blue-800 mt-2 space-y-1 ml-4">
                  <li>1. Tire um screenshot desta tela</li>
                  <li>2. Abra o Instagram e crie um novo Story</li>
                  <li>3. Selecione a imagem da galeria</li>
                  <li>4. Publique e marque @opinamais</li>
                </ol>
              </div>

              <Button 
                onClick={() => setInstagramDialogOpen(false)}
                className="w-full bg-primary hover:bg-primary/90"
              >
                Fechar
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Prioridades */}
      <PrioritiesModal
        open={prioritiesModalOpen}
        onOpenChange={setPrioritiesModalOpen}
        filter={prioritiesFilter}
        onFilterChange={setPrioritiesFilter}
      />
    </div>
  );
}
