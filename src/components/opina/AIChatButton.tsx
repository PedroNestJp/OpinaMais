import { useState, useRef, useEffect } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Bot, Send, X, Minimize2, Maximize2, ExternalLink, Sparkles } from '../icons';
import { api } from '../../lib/api';

interface Message {
  id: number;
  role: 'user' | 'assistant';
  content: string;
  sources?: { title: string; url: string; date: string }[];
  timestamp: Date;
}

interface AIChatButtonProps {
  authToken?: string | null;
}

const mockResponses: Record<string, { content: string; sources: { title: string; url: string; date: string }[] }> = {
  default: {
    content:
      'Olá! Eu sou o OpinAI, seu assistente cívico.\nTe ajudo com informações oficiais sobre Projetos de Lei, orçamento público, obras e processos.\nSobre o que você quer saber hoje?',
    sources: [],
  },
  projetos: {
    content:
      'Atualmente, 3 projetos de lei estão em votação esta semana:\n\n**PL 045/2024** - Corredores exclusivos para ônibus\n• Votação prevista: 26/11/2024\n\n**PL 052/2024** - Ampliação de horários de postos de saúde\n• Votação prevista: 27/11/2024\n\n**PL 058/2024** - Incentivo ao comércio local\n• Votação prevista: 28/11/2024',
    sources: [
      { title: 'Pauta da Câmara - Semana 22 a 28/11', url: '#', date: '22/11/2024' },
      { title: 'Portal de Projetos de Lei', url: '#', date: '22/11/2024' },
    ],
  },
  orçamento: {
    content:
      'O orçamento de saúde em 2024:\n\n💰 **Orçamento total:** R$ 38 milhões\n✅ **Executado até outubro:** R$ 28,5 milhões (75%)\n📊 **Saldo disponível:** R$ 9,5 milhões\n\nPrincipais investimentos:\n• Hospitais e UPAs: R$ 15,2 milhões\n• Unidades Básicas: R$ 8,3 milhões\n• Programas de prevenção: R$ 3,8 milhões',
    sources: [
      { title: 'Portal de Transparência', url: '#', date: '20/11/2024' },
      { title: 'Relatório da Secretaria de Saúde', url: '#', date: '15/11/2024' },
    ],
  },
};

const suggestedQuestions = [
  '📋 Quais projetos estão em votação?',
  '💰 Como está o orçamento da saúde?',
  '🏗️ Quais obras estão em andamento?',
  '🗳️ Como posso participar das consultas públicas?',
];

export function AIChatButton({ authToken }: AIChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatUuid, setChatUuid] = useState<string | null>(null);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: 'assistant',
      content: 'Olá! Eu sou o OpinAI, seu assistente cívico.\nTe ajudo com informações oficiais sobre Projetos de Lei, orçamento público, obras e processos.\nSobre o que você quer saber hoje?',
      sources: [],
      timestamp: new Date(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  const ensureChat = async () => {
    if (chatUuid) return chatUuid;
    setChatLoading(true);
    setChatError(null);
    try {
      const chat = await api.startChat();
      setChatUuid(chat.uuid);
      return chat.uuid;
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : 'Não foi possível iniciar o chat. Faça login e tente novamente.';
      setChatError(message);
      throw err;
    } finally {
      setChatLoading(false);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    if (!authToken) {
      setChatError('Faça login para conversar com o OpinAI.');
      setIsOpen(true);
      return;
    }

    const userMessage: Message = {
      id: messages.length + 1,
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    (async () => {
      try {
        const uuid = await ensureChat();
        const response = await api.sendChatMessage({
          chat_uuid: uuid,
          message: userMessage.content,
        });

        const assistantMessage: Message = {
          id: Date.now(),
          role: 'assistant',
          content: response.content || 'Sem resposta no momento.',
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Falha ao enviar mensagem. Tente novamente.';
        setChatError(message);
      } finally {
        setIsTyping(false);
      }
    })();
  };

  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => handleSend(), 100);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center bg-gradient-to-br from-primary to-secondary hover:scale-110 transition-transform z-[100] shadow-2xl rounded-full"
        aria-label="Abrir OpinAI"
      >
        <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
      </button>
    );
  }

  return (
    <div
      className={`fixed z-[100] transition-all ${
        isMinimized
          ? 'bottom-20 right-4 sm:bottom-6 sm:right-6 w-80'
          : 'bottom-4 right-4 sm:bottom-20 sm:right-6 w-[90vw] sm:w-[400px] max-w-[95vw] h-[80vh] sm:h-[600px] max-h-[calc(100vh-100px)]'
      }`}
    >
      <Card className="h-full flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary text-white p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">OpinAI</h3>
              <p className="text-[10px] text-white/80">Dados oficiais</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label={isMinimized ? 'Maximizar' : 'Minimizar'}
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-muted/20">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-2 ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className="flex-shrink-0">
                    {message.role === 'user' ? (
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-lg">👤</span>
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </div>

                  <div className={`flex-1 ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <Card
                      className={`p-3 max-w-[85%] text-sm ${
                        message.role === 'user'
                          ? 'ml-auto bg-primary text-white border-primary'
                          : 'bg-white'
                      }`}
                    >
                      <p
                        className={`whitespace-pre-line leading-relaxed ${
                          message.role === 'user' ? 'text-white' : 'text-foreground'
                        }`}
                      >
                        {message.content}
                      </p>

                      {message.sources && message.sources.length > 0 && (
                        <div className="pt-3 mt-3 border-t space-y-2">
                          <p className="text-xs text-muted-foreground flex items-center gap-1 font-medium">
                            <Sparkles className="w-3 h-3" />
                            Fontes oficiais:
                          </p>
                          {message.sources.map((source, index) => (
                            <a
                              key={index}
                              href={source.url}
                              className="flex items-start gap-2 text-xs text-primary hover:text-secondary transition-colors group"
                            >
                              <ExternalLink className="w-3 h-3 mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="group-hover:underline">{source.title}</p>
                                <p className="text-[10px] text-muted-foreground">{source.date}</p>
                              </div>
                            </a>
                          ))}
                        </div>
                      )}
                    </Card>
                    <p className="text-[10px] text-muted-foreground mt-1 px-2">
                      {message.timestamp.toLocaleTimeString('pt-BR', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <Card className="p-3">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </Card>
                </div>
              )}

              {/* Perguntas sugeridas - mostrar apenas se for a primeira mensagem */}
              {messages.length === 1 && !isTyping && (
                <div className="space-y-2 pt-2">
                  <p className="text-xs text-muted-foreground px-1">Dúvidas frequentes:</p>
                  <div className="flex flex-col gap-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="text-left text-xs p-2.5 bg-white hover:bg-primary/5 border border-border rounded-lg transition-colors"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Alertas */}
            {chatError && (
              <div className="px-3 pb-2">
                <div className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-md p-2">
                  {chatError}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 bg-white border-t">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={
                    !authToken
                      ? 'Faça login para usar o OpinAI'
                      : isTyping
                      ? 'OpinAI está respondendo...'
                      : 'Faça uma pergunta...'
                  }
                  className="flex-1 h-10 text-sm"
                  disabled={isTyping || chatLoading || !authToken}
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping || chatLoading || !authToken}
                  size="icon"
                  className="h-10 w-10 bg-primary hover:bg-primary/90"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex items-center justify-center gap-1 mt-2">
                <Sparkles className="w-3 h-3 text-muted-foreground" />
                <span className="text-[10px] text-muted-foreground">Dados oficiais verificados</span>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}
