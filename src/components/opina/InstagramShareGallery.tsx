import React, { useState } from 'react';
import { InstagramShareTemplate } from './InstagramShareTemplate';
import { ArrowLeft, Download, Share2, Eye } from '../icons';
import { Button } from '../ui/button';

interface InstagramShareGalleryProps {
  onBack?: () => void;
}

export function InstagramShareGallery({ onBack }: InstagramShareGalleryProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);

  // Exemplos de templates
  const templates = [
    {
      id: 1,
      category: 'Saúde',
      categoryColor: '#4BBF95',
      plNumber: 'PL 087/2025',
      voteType: 'favor' as const,
      title: 'Ampliação do horário dos postos de saúde',
      description:
        'Sessão extraordinária debaterá funcionamento das unidades até 22h. Audiência pública será nesta sexta às 19h no plenário.',
      communityApproval: 89,
      entity: 'Câmara Municipal',
      date: '22/11/2025',
    },
    {
      id: 2,
      category: 'Educação',
      categoryColor: '#FFB84D',
      plNumber: 'PL 142/2025',
      voteType: 'contra' as const,
      title: 'Redução da carga horária escolar',
      description:
        'Proposta prevê diminuir em 20% a carga horária das escolas de ensino fundamental para implementação de atividades extracurriculares.',
      communityApproval: 23,
      entity: 'Assembleia Legislativa',
      date: '20/11/2025',
    },
    {
      id: 3,
      category: 'Meio Ambiente',
      categoryColor: '#35C759',
      plNumber: 'PL 095/2025',
      voteType: 'favor' as const,
      title: 'Política de reciclagem urbana',
      description:
        'Implementação obrigatória de coleta seletiva em todos os municípios acima de 50 mil habitantes até 2026. Multas previstas para descumprimento.',
      communityApproval: 76,
      entity: 'Senado Federal',
      date: '23/11/2025',
    },
    {
      id: 4,
      category: 'Transporte',
      categoryColor: '#007AFF',
      plNumber: 'PL 203/2025',
      voteType: 'indeciso' as const,
      title: 'Expansão do sistema de metrô',
      description:
        'Projeto prevê investimento de R$ 2,5 bilhões para expandir a rede de metrô em 45km nos próximos 5 anos.',
      communityApproval: 68,
      entity: 'Câmara dos Deputados',
      date: '21/11/2025',
    },
  ];

  const handleDownload = (templateId: number) => {
    alert(`Download do template ${templateId} iniciado! (Feature em desenvolvimento)\n\nEm produção, isso geraria uma imagem PNG de 1080x1920px pronta para compartilhar no Instagram Stories.`);
  };

  const handleShare = (templateId: number) => {
    alert(`Compartilhar template ${templateId}! (Feature em desenvolvimento)\n\nEm produção, isso abriria o menu nativo de compartilhamento do dispositivo.`);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="mb-3 -ml-2"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar
            </Button>
          )}
          <h1 className="text-foreground mb-2">Templates para Instagram Stories</h1>
          <p className="text-muted-foreground">
            Compartilhe sua participação no Instagram com templates profissionais
          </p>
        </div>
      </header>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              {/* Template Preview (scaled down) */}
              <div className="relative bg-gray-50 flex items-center justify-center p-4 overflow-hidden aspect-[9/16]">
                <div
                  className="transform origin-top-left cursor-pointer hover:opacity-90 transition-opacity"
                  onClick={() => setSelectedTemplate(template.id)}
                  style={{
                    transform: 'scale(0.15)',
                    width: '1080px',
                    height: '1920px',
                    marginLeft: '-405px',
                    marginTop: '-720px',
                  }}
                >
                  <InstagramShareTemplate {...template} />
                </div>

                {/* Overlay de ações */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/40 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                  <Button
                    onClick={() => setSelectedTemplate(template.id)}
                    className="bg-white text-primary hover:bg-white/90"
                  >
                    <Eye className="w-5 h-5 mr-2" />
                    Ver em tamanho real
                  </Button>
                </div>
              </div>

              {/* Card Info */}
              <div className="p-4">
                <div className="mb-3">
                  <div
                    className="inline-block px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-2"
                    style={{
                      backgroundColor: template.categoryColor + '20',
                      color: template.categoryColor,
                    }}
                  >
                    {template.category}
                  </div>
                  <h3 className="text-foreground mb-1 text-sm">
                    {template.plNumber} - {template.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Voto: {template.voteType === 'favor' ? 'A Favor' : template.voteType === 'contra' ? 'Contra' : 'Em Análise'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleDownload(template.id)}
                    className="flex-1 bg-primary hover:bg-primary/90 text-sm h-9"
                  >
                    <Download className="w-3.5 h-3.5 mr-1.5" />
                    Baixar
                  </Button>
                  <Button
                    onClick={() => handleShare(template.id)}
                    variant="outline"
                    className="flex-1 text-sm h-9"
                  >
                    <Share2 className="w-3.5 h-3.5 mr-1.5" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Informações adicionais */}
        <div className="mt-12 bg-white rounded-xl shadow-md p-8">
          <h2 className="text-foreground mb-4">Sobre os Templates Instagram Stories</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Os templates do Opina+ são otimizados para Instagram Stories (1080x1920px) e seguem
              o padrão visual institucional moderno, garantindo credibilidade e profissionalismo.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <h3 className="text-foreground mb-2">✨ Características</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Design institucional clean e moderno</li>
                  <li>• Formato 1080x1920px (Instagram Stories)</li>
                  <li>• Cores acessíveis e contrastantes</li>
                  <li>• QR Code para acesso rápido</li>
                  <li>• Logo oficial do Opina+ 3D</li>
                  <li>• Informações completas do PL</li>
                </ul>
              </div>
              <div>
                <h3 className="text-foreground mb-2">📱 Como usar</h3>
                <ul className="space-y-2 text-sm">
                  <li>1. Escolha o template do PL que você votou</li>
                  <li>2. Clique em "Baixar" para salvar a imagem</li>
                  <li>3. Ou use "Compartilhar" para enviar direto</li>
                  <li>4. Publique no seu Instagram Stories</li>
                  <li>5. Incentive amigos a participarem também!</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de visualização em tamanho real */}
      {selectedTemplate && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 cursor-pointer overflow-auto"
          onClick={() => setSelectedTemplate(null)}
        >
          <div className="max-w-[540px] max-h-[960px] overflow-auto">
            <div className="transform scale-50 origin-top-left">
              <InstagramShareTemplate
                {...templates.find((t) => t.id === selectedTemplate)!}
              />
            </div>
          </div>
          <button
            className="absolute top-4 right-4 text-white text-2xl w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            onClick={() => setSelectedTemplate(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}
