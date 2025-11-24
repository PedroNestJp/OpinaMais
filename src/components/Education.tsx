import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { BookOpen, Volume2, FileText, Users, DollarSign, Building, Bot } from 'lucide-react';

const educationalTopics = [
  {
    id: 'pl',
    icon: FileText,
    title: 'O que é um Projeto de Lei?',
    summary: 'Entenda como nascem as leis que afetam sua cidade',
    content: `Um Projeto de Lei (PL) é uma proposta formal para criar, modificar ou revogar uma lei. Qualquer vereador pode apresentar um projeto, que passará por diversas etapas:

1. **Apresentação**: O vereador redige e protocola o projeto na Câmara
2. **Comissões**: O projeto é analisado por comissões temáticas que emitem pareceres
3. **Discussão**: Os vereadores debatem o projeto em sessões públicas
4. **Votação**: O plenário vota se aprova ou rejeita o projeto
5. **Sanção**: Se aprovado, vai ao prefeito, que pode sancionar ou vetar
6. **Publicação**: Após sanção, vira lei e é publicada no Diário Oficial

Você pode acompanhar todo esse processo pela plataforma e até participar enviando sugestões!`,
    duration: '5 min',
    level: 'Básico',
  },
  {
    id: 'vereador',
    icon: Users,
    title: 'O papel dos Vereadores',
    summary: 'Conheça as funções e responsabilidades dos seus representantes',
    content: `Os vereadores são representantes eleitos pelo povo para atuar na Câmara Municipal. Suas principais funções são:

**Legislar**: Criar, modificar e aprovar leis municipais que regulam a vida na cidade

**Fiscalizar**: Acompanhar e fiscalizar as ações do Poder Executivo (Prefeito e Secretarias)

**Representar**: Ser a voz dos cidadãos, levando demandas da população para o debate público

**Orçamento**: Analisar e votar o orçamento municipal, decidindo como os recursos serão aplicados

Sua cidade tem [número] vereadores, eleitos para mandato de 4 anos. Você pode acompanhar a atuação de cada um pela plataforma.`,
    duration: '4 min',
    level: 'Básico',
  },
  {
    id: 'audiencia',
    icon: Building,
    title: 'Como funciona uma Audiência Pública?',
    summary: 'Participe e faça sua voz ser ouvida',
    content: `A Audiência Pública é um encontro aberto onde cidadãos podem se manifestar sobre temas importantes antes das decisões oficiais.

**Como funciona:**
- A Câmara convoca audiência sobre temas relevantes (obras, projetos, orçamento)
- Qualquer cidadão pode participar, presencialmente ou online
- Você pode se inscrever para falar e apresentar sua opinião
- As manifestações são registradas em ata oficial
- Os vereadores devem considerar as contribuições na votação

**Quando é obrigatória:**
- Projetos de grande impacto ambiental
- Alterações no Plano Diretor
- Grandes obras públicas
- Lei de Diretrizes Orçamentárias (LDO)

Fique atento aos avisos de audiências pela plataforma e participe!`,
    duration: '6 min',
    level: 'Intermediário',
  },
  {
    id: 'orcamento',
    icon: DollarSign,
    title: 'Orçamento Público Simplificado',
    summary: 'Entenda para onde vai o dinheiro da cidade',
    content: `O orçamento público é o planejamento de todas as receitas (dinheiro que entra) e despesas (gastos) do município durante um ano.

**Como é organizado:**

**Receitas vêm de:**
- Impostos municipais (IPTU, ISS, ITBI)
- Repasses do Estado e da União (FPM, ICMS, SUS)
- Taxas e multas

**Despesas são divididas em:**
- Educação (mínimo 25% do orçamento)
- Saúde (mínimo 15% do orçamento)
- Infraestrutura (obras, manutenção)
- Segurança, cultura, assistência social, etc.

**Documentos importantes:**
- **PPA** (Plano Plurianual): planejamento de 4 anos
- **LDO** (Lei de Diretrizes Orçamentárias): metas e prioridades do ano
- **LOA** (Lei Orçamentária Anual): detalhamento de receitas e despesas

Você pode acompanhar a execução do orçamento na aba de Transparência!`,
    duration: '7 min',
    level: 'Intermediário',
  },
];

const faqs = [
  {
    question: 'Como posso propor um projeto de lei?',
    answer: 'Cidadãos não podem propor projetos diretamente, mas podem apresentar sugestões aos vereadores através de petições, audiências públicas ou pelo canal de participação popular da Câmara. Você também pode usar nossa plataforma para enviar sugestões!',
  },
  {
    question: 'Qual a diferença entre lei municipal, estadual e federal?',
    answer: 'Leis municipais regulam assuntos locais (trânsito urbano, uso do solo, IPTU). Leis estaduais tratam de questões do estado (polícia militar, ICMS). Leis federais valem para todo o país (Constituição, Código Penal). Cada esfera tem suas competências definidas pela Constituição.',
  },
  {
    question: 'Como sei se meu vereador está trabalhando bem?',
    answer: 'Você pode acompanhar: presença nas sessões, projetos apresentados, votações, uso da verba de gabinete e emendas ao orçamento. Todas essas informações devem estar disponíveis no Portal da Transparência da Câmara.',
  },
  {
    question: 'O que é uma CPI e quando pode ser criada?',
    answer: 'CPI (Comissão Parlamentar de Inquérito) investiga fatos específicos por prazo determinado. Precisa de aprovação de 1/3 dos vereadores. Tem poderes de investigação como quebra de sigilo bancário e convocação de autoridades.',
  },
];

export function Education() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const topic = educationalTopics.find((t) => t.id === selectedTopic);

  return (
    <div className="max-w-4xl mx-auto p-4 pb-8">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Educação Política</h1>
        <p className="text-gray-600">
          Aprenda sobre democracia, governo e seus direitos como cidadão
        </p>
      </div>

      {topic ? (
        <div className="space-y-4">
          <Button variant="ghost" onClick={() => setSelectedTopic(null)} className="mb-2">
            ← Voltar para tópicos
          </Button>

          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <topic.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-gray-900 mb-2">{topic.title}</h2>
                  <div className="flex items-center gap-3">
                    <Badge variant="secondary">{topic.level}</Badge>
                    <span className="text-xs text-gray-500">📖 {topic.duration} de leitura</span>
                  </div>
                </div>
              </div>

              <div className="prose prose-sm max-w-none">
                {topic.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="text-gray-700 mb-3 whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button variant="outline" className="flex-1">
                  <Volume2 className="w-4 h-4 mr-2" />
                  Ouvir em áudio
                </Button>
                <Button variant="outline" className="flex-1">
                  <FileText className="w-4 h-4 mr-2" />
                  Baixar PDF
                </Button>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-xs text-green-700">
                  ✓ Conteúdo revisado e validado pela equipe pedagógica da Câmara Municipal
                </p>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <Tabs defaultValue="topics" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="topics">Tópicos</TabsTrigger>
            <TabsTrigger value="faq">Perguntas Frequentes</TabsTrigger>
          </TabsList>

          <TabsContent value="topics" className="space-y-4">
            <div className="grid gap-4">
              {educationalTopics.map((topic) => (
                <Card
                  key={topic.id}
                  className="p-5 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedTopic(topic.id)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <topic.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-1">{topic.title}</h3>
                      <p className="text-gray-600 mb-3">{topic.summary}</p>
                      <div className="flex items-center gap-3">
                        <Badge variant="secondary">{topic.level}</Badge>
                        <span className="text-xs text-gray-500">📖 {topic.duration}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-900 mb-2">Quer aprender mais?</h3>
                  <p className="text-gray-700 mb-3">
                    Novos conteúdos educativos são adicionados mensalmente. Ative as notificações para não perder!
                  </p>
                  <Button size="sm">Ativar notificações</Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="faq" className="space-y-4">
            <Card className="p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Card>

            <Card className="p-5 bg-blue-50 border-blue-200">
              <h3 className="text-gray-900 mb-2">Não encontrou sua dúvida?</h3>
              <p className="text-gray-600 mb-3">
                Use o Assistente de IA para fazer perguntas específicas sobre governo e democracia
              </p>
              <Button variant="outline">
                <Bot className="w-4 h-4 mr-2" />
                Ir para o Assistente
              </Button>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}