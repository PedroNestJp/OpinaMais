import { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Send, Bot, User, Sparkles, ExternalLink, Clock, X, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  sources?: { title: string; url: string }[];
  timestamp: Date;
}

interface AIChatPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const suggestedQuestions = [
  'Quais projetos de lei estão em votação esta semana?',
  'Como está a execução do orçamento de saúde?',
  'Qual o valor do salário do prefeito?',
  'Quais obras estão em andamento no meu bairro?',
  'Como posso participar de uma audiência pública?',
  'Qual a diferença entre PL e PEC?',
];

const mockResponses: Record<string, { content: string; sources: { title: string; url: string }[] }> = {
  default: {
    content:
      'Olá! Sou o Assistente Cívico, um sistema de IA treinado para ajudar você a entender informações sobre o governo municipal. Posso responder sobre projetos de lei, orçamento, obras públicas, processos democráticos e muito mais.\n\nTodas as minhas respostas são baseadas em dados oficiais e verificados. Como posso ajudar você hoje?',
    sources: [],
  },
  projetos: {
    content:
      'Atualmente, 3 projetos de lei estão em votação esta semana na Câmara Municipal:\n\n1. **PL 045/2024** - Criação de corredores exclusivos para ônibus\n   - Votação prevista: 26/11/2024\n   - Status: Aguardando votação em plenário\n\n2. **PL 052/2024** - Ampliação do horário de funcionamento de postos de saúde\n   - Votação prevista: 27/11/2024\n   - Status: Em discussão\n\n3. **PL 058/2024** - Programa de incentivo ao comércio local\n   - Votação prevista: 28/11/2024\n   - Status: Aguardando pareceres\n\nVocê pode acompanhar a tramitação completa de cada projeto na aba "Participe".',
    sources: [
      { title: 'Pauta da Câmara - Semana 22 a 28/11', url: '#' },
      { title: 'Portal de Projetos de Lei', url: '#' },
    ],
  },
  orçamento: {
    content:
      'A execução do orçamento de saúde em 2024 está em:\n\n**Orçamento total aprovado:** R$ 38 milhões\n**Executado até outubro:** R$ 28,5 milhões (75%)\n**Saldo disponível:** R$ 9,5 milhões\n\n**Principais áreas de investimento:**\n- Hospitais e UPAs: R$ 15,2 milhões (40%)\n- Unidades Básicas de Saúde: R$ 8,3 milhões (22%)\n- Programas de prevenção: R$ 3,8 milhões (10%)\n- Medicamentos: R$ 6,2 milhões (16%)\n- Outros: R$ 4,5 milhões (12%)\n\nA execução está dentro da meta estabelecida pela LDO 2024.',
    sources: [
      { title: 'Portal de Transparência - Execução Orçamentária', url: '#' },
      { title: 'Relatório Mensal da Secretaria de Saúde', url: '#' },
    ],
  },
  salário: {
    content:
      'De acordo com a Lei Municipal nº 3.847/2023, os subsídios dos agentes políticos municipais são:\n\n**Prefeito:** R$ 25.800,00 (mensais)\n**Vice-prefeito:** R$ 12.900,00 (mensais)\n**Vereadores:** R$ 8.600,00 (mensais)\n**Secretários municipais:** R$ 15.400,00 (mensais)\n\nEstes valores são estabelecidos pela Câmara Municipal na legislatura anterior e valem para todo o mandato (2021-2024). Os valores para o próximo mandato serão definidos até o final de 2024.\n\nTodos os subsídios são públicos e podem ser consultados no Portal da Transparência.',
    sources: [
      { title: 'Lei Municipal nº 3.847/2023', url: '#' },
      { title: 'Portal da Transparência - Folha de Pagamento', url: '#' },
    ],
  },
};

export function AIChatPopup({ isOpen, onClose }: AIChatPopupProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: 'Olá! Sou o Assistente Cívico. Posso ajudar você a entender informações sobre projetos de lei, orçamento, obras públicas e processos democráticos. Todas as respostas são baseadas em dados oficiais verificados.',
      sources: [],
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let response = mockResponses.default;

      if (input.toLowerCase().includes('projeto') || input.toLowerCase().includes('votação')) {
        response = mockResponses.projetos;
      } else if (input.toLowerCase().includes('orçamento') || input.toLowerCase().includes('saúde')) {
        response = mockResponses.orçamento;
      } else if (input.toLowerCase().includes('salário') || input.toLowerCase().includes('prefeito')) {
        response = mockResponses.salário;
      }

      const assistantMessage: Message = {
        id: messages.length + 2,
        role: 'assistant',
        content: response.content,
        sources: response.sources,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/20 z-50 transition-opacity"
        onClick={onClose}
      />

      {/* Chat Popup */}
      <div
        className={`fixed z-50 transition-all ${
          isMinimized
            ? 'bottom-20 right-4 w-80'
            : 'bottom-4 right-4 w-[90vw] md:w-[400px] h-[80vh] md:h-[600px]'
        }`}
      >
        <Card className="h-full flex flex-col shadow-2xl">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-white">Assistente Cívico</h3>
                <p className="text-xs text-blue-100">Sempre online</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        message.role === 'user'
                          ? 'bg-blue-100'
                          : 'bg-gradient-to-br from-blue-500 to-purple-600'
                      }`}
                    >
                      {message.role === 'user' ? (
                        <User className="w-4 h-4 text-blue-600" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>

                    <div className={`flex-1 ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                      <Card
                        className={`p-3 max-w-[85%] ${
                          message.role === 'user'
                            ? 'ml-auto bg-blue-600 text-white border-blue-600'
                            : 'bg-white'
                        }`}
                      >
                        <div className="space-y-2">
                          <p
                            className={`text-sm whitespace-pre-line ${
                              message.role === 'user' ? 'text-white' : 'text-gray-700'
                            }`}
                          >
                            {message.content}
                          </p>

                          {message.sources && message.sources.length > 0 && (
                            <div className="pt-2 border-t space-y-1">
                              <p className="text-xs text-gray-500 flex items-center gap-1">
                                <Sparkles className="w-3 h-3" />
                                Fontes:
                              </p>
                              {message.sources.map((source, index) => (
                                <a
                                  key={index}
                                  href={source.url}
                                  className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1 hover:underline"
                                >
                                  {source.title} <ExternalLink className="w-3 h-3" />
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </Card>
                      <p className="text-xs text-gray-400 mt-1 px-2">
                        {message.timestamp.toLocaleTimeString('pt-BR', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <Card className="p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </Card>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="px-4 py-2 border-t bg-white">
                  <p className="text-xs text-gray-600 mb-2">Perguntas sugeridas:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.slice(0, 3).map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-700 transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 bg-white border-t">
                <div className="flex gap-2 mb-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Faça uma pergunta..."
                    className="flex-1"
                    disabled={isTyping}
                  />
                  <Button onClick={handleSend} disabled={!input.trim() || isTyping} size="icon">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <Sparkles className="w-3 h-3 mr-1" />
                    IA com dados oficiais
                  </Badge>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    22/11/2024
                  </span>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </>
  );
}