import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Search, BookOpen, Volume2, Clock, ArrowLeft } from '../icons';
import { Logo } from '../Logo';

interface OpinaEducationProps {
  audioMode: boolean;
}

const educationTopics = [
  {
    id: 'pl',
    title: 'O que é um Projeto de Lei?',
    summary: 'Entenda como nascem as leis e as etapas de tramitação na câmara municipal',
    duration: '5 min',
    icon: '📜',
    content: `Um Projeto de Lei (PL) é uma proposta formal para criar, modificar ou revogar uma lei. Pode ser apresentado por vereadores, pelo prefeito ou pela população através de iniciativa popular.

**Etapas de tramitação:**

1. Apresentação: O projeto é protocolado na Câmara Municipal com justificativa e texto legal

2. Comissões: Passa por análise técnica de comissões especializadas (finanças, educação, etc.)

3. Discussão: É debatido em sessões públicas onde vereadores e cidadãos podem opinar

4. Votação: Os vereadores votam a favor ou contra em duas votações (turno único ou dois turnos)

5. Sanção: Se aprovado, vai para o prefeito sancionar ou vetar total ou parcialmente

6. Publicação: Após sanção, a lei é publicada no Diário Oficial e entra em vigor

A população pode acompanhar todo o processo através dos portais oficiais e participar de audiências públicas quando convocadas.`,
  },
  {
    id: 'audiencia',
    title: 'Como participar de Audiências Públicas',
    summary: 'Faça sua voz ser ouvida nos debates oficiais da sua cidade',
    duration: '6 min',
    icon: '🗣️',
    content: `Audiências Públicas são reuniões abertas onde a população pode opinar sobre projetos de lei, obras e políticas públicas.

**Passo a passo para participar:**

1. Fique atento aos avisos: As audiências são divulgadas nos portais oficiais com pelo menos 7 dias de antecedência

2. Inscreva-se: Geralmente há prazo para inscrição prévia (presencial ou online)

3. Prepare sua fala: Organize seus argumentos de forma clara e objetiva. Geralmente há limite de 3 a 5 minutos por pessoa

4. Compareça: Leve documentos de identificação e chegue com antecedência

5. Manifeste-se: Respeite o tempo de fala e apresente argumentos construtivos

Você também pode participar de forma remota quando a audiência oferece essa opção. Sua participação fica registrada em ata e influencia as decisões públicas.`,
  },
  {
    id: 'orcamento',
    title: 'Orçamento Público Simplificado',
    summary: 'Entenda para onde vai o dinheiro dos impostos que você paga',
    duration: '8 min',
    icon: '💰',
    content: `O orçamento público é o planejamento anual de como o município vai arrecadar e gastar o dinheiro dos impostos.

**Documentos principais:**

• PPA (Plano Plurianual): Planejamento de 4 anos com grandes objetivos
• LDO (Lei de Diretrizes Orçamentárias): Metas e prioridades anuais
• LOA (Lei Orçamentária Anual): Previsão detalhada de receitas e despesas

**Áreas obrigatórias:**
- Educação: mínimo 25% do orçamento
- Saúde: mínimo 15% do orçamento
- Outras áreas: infraestrutura, segurança, assistência social, cultura

**Como acompanhar:**
Você pode acompanhar a execução orçamentária nos portais de transparência e participar das audiências públicas do orçamento que acontecem antes da votação.`,
  },
  {
    id: 'vereador',
    title: 'O papel do vereador',
    summary: 'Entenda o que faz um vereador e como ele representa você',
    duration: '4 min',
    icon: '👔',
    content: `O vereador é o representante do povo na Câmara Municipal. Ele tem três funções principais:

**1. Legislativa:**
- Criar e votar projetos de lei municipais
- Propor emendas à Lei Orgânica do Município

**2. Fiscalizadora:**
- Acompanhar a execução do orçamento
- Fiscalizar os atos do prefeito e secretários
- Solicitar informações ao poder executivo

**3. Representativa:**
- Ouvir as demandas da população
- Representar os interesses da comunidade
- Participar de audiências públicas

**Como acompanhar seu vereador:**
Todos os vereadores têm obrigação de divulgar presença em sessões, projetos apresentados e votações. Use o portal da Câmara ou a aba Transparência do Opina+ para acompanhar.`,
  },
];

export function OpinaEducation({ audioMode }: OpinaEducationProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const handlePlayAudio = (topic: typeof educationTopics[0]) => {
    alert(`🔊 Ouvindo: ${topic.title}\n\nEm produção, usar Web Speech API para narrar o conteúdo completo do artigo.`);
  };

  const filteredTopics = educationTopics.filter((topic) =>
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (selectedTopic) {
    const topic = educationTopics.find((t) => t.id === selectedTopic);
    if (!topic) return null;

    return (
      <div className="max-w-4xl mx-auto p-4 space-y-6 pt-6">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedTopic(null)} 
          className="mb-2"
          size="lg"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </Button>

        <Card className="p-6 md:p-8">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="text-6xl mb-4">{topic.icon}</div>
              <h1 className="text-foreground mb-3">{topic.title}</h1>
              <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                <Clock className="w-4 h-4" />
                {topic.duration} de leitura
              </Badge>
            </div>

            {/* Audio Button - Always at top */}
            <div className="sticky top-4 z-10">
              <Button
                onClick={() => handlePlayAudio(topic)}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 h-14 text-lg shadow-lg"
              >
                <Volume2 className="w-6 h-6 mr-3" />
                🔊 Ouvir este conteúdo
              </Button>
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                {topic.content.split('\n\n').map((paragraph, index) => {
                  if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                    return (
                      <h4 key={index} className="text-foreground mt-6 mb-3">
                        {paragraph.replace(/\*\*/g, '')}
                      </h4>
                    );
                  }
                  return (
                    <p key={index} className="text-lg">
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-6 border-t">
              <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <span className="text-primary text-xl">✓</span>
                  Conteúdo verificado e aprovado pela equipe pedagógica do Opina+
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 pt-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Logo variant="icon" size={40} />
          <h1 className="text-foreground mb-0">Educação Política</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Aprenda sobre democracia, legislação e seus direitos de forma simples
        </p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" />
        <Input
          placeholder="Buscar por tema..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-14 h-14 text-lg"
        />
      </div>

      {/* Topics */}
      <div className="space-y-4">
        {filteredTopics.map((topic) => (
          <Card
            key={topic.id}
            className="p-6 hover:shadow-lg transition-all cursor-pointer group border-l-4 border-l-primary"
            onClick={() => setSelectedTopic(topic.id)}
          >
            <div className="flex items-start gap-5">
              <div className="text-5xl flex-shrink-0">{topic.icon}</div>
              <div className="flex-1">
                <h3 className="text-foreground mb-2 group-hover:text-primary transition-colors">
                  {topic.title}
                </h3>
                <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
                  {topic.summary}
                </p>
                <div className="flex items-center gap-4">
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {topic.duration}
                  </Badge>
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Volume2 className="w-3 h-3" />
                    Áudio disponível
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
        ))}

        {filteredTopics.length === 0 && (
          <Card className="p-12 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-foreground mb-2">Nenhum resultado encontrado</h3>
            <p className="text-muted-foreground">
              Tente buscar com outras palavras
            </p>
          </Card>
        )}
      </div>

      {/* Bottom Info */}
      <Card className="p-6 bg-accent/10 border-accent/30">
        <div className="flex items-start gap-4">
          <div className="text-4xl">💡</div>
          <div>
            <h4 className="text-foreground mb-2">Tem dúvidas sobre democracia?</h4>
            <p className="text-muted-foreground">
              Use o chat de IA no canto inferior direito para fazer perguntas específicas sobre processos legislativos e governamentais.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}