import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { X, Download, FileText, FileSpreadsheet, CheckCircle } from 'lucide-react';
import { Checkbox } from '../ui/checkbox';
import { useState } from 'react';

interface ReportGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (options: ReportOptions) => void;
}

export interface ReportOptions {
  sections: string[];
  format: 'pdf' | 'csv' | 'excel';
}

const reportSections = [
  { id: 'likes', label: 'Posts mais curtidos', icon: '❤️' },
  { id: 'views', label: 'Posts mais visualizados', icon: '👁️' },
  { id: 'shares', label: 'Posts mais compartilhados', icon: '📤' },
  { id: 'articles', label: 'Artigos mais acessados', icon: '📚' },
  { id: 'polls', label: 'Enquetes com maior participação', icon: '📊' },
];

const formats = [
  { value: 'pdf', label: 'PDF', icon: FileText, description: 'Documento formatado com gráficos' },
  { value: 'csv', label: 'CSV', icon: FileSpreadsheet, description: 'Planilha compatível com Excel' },
  { value: 'excel', label: 'Excel', icon: FileSpreadsheet, description: 'Arquivo .xlsx nativo' },
];

export function ReportGeneratorModal({ isOpen, onClose, onGenerate }: ReportGeneratorModalProps) {
  const [selectedSections, setSelectedSections] = useState<string[]>(['likes', 'views', 'shares']);
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'csv' | 'excel'>('pdf');

  const handleSectionToggle = (sectionId: string) => {
    setSelectedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleGenerate = () => {
    if (selectedSections.length === 0) {
      alert('Selecione pelo menos uma seção para o relatório');
      return;
    }

    onGenerate({
      sections: selectedSections,
      format: selectedFormat,
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] p-0 gap-0 bg-white">
        {/* Header */}
        <DialogHeader className="p-6 pb-4 border-b border-[#E4E4E4]">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 flex-1">
              <div className="w-12 h-12 bg-[#008344]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Download className="w-6 h-6 text-[#008344]" />
              </div>
              <div>
                <DialogTitle 
                  className="text-[#2A2A2A] mb-1"
                  style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '18px' }}
                >
                  Gerar Relatório
                </DialogTitle>
                <p 
                  className="text-[#666666]"
                  style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '13px' }}
                >
                  Selecione as seções e formato de exportação
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-[#666666] hover:text-[#2A2A2A] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Seções do Relatório */}
          <div>
            <h3 
              className="text-[#2A2A2A] mb-3"
              style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '14px' }}
            >
              Seções do relatório
            </h3>
            <div className="space-y-2">
              {reportSections.map((section) => (
                <label
                  key={section.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedSections.includes(section.id)
                      ? 'border-[#008344] bg-[#008344]/5'
                      : 'border-[#E4E4E4] hover:border-[#008344]/30'
                  }`}
                >
                  <Checkbox
                    checked={selectedSections.includes(section.id)}
                    onCheckedChange={() => handleSectionToggle(section.id)}
                  />
                  <span className="text-xl">{section.icon}</span>
                  <span 
                    className="text-[#2A2A2A] flex-1"
                    style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '13px' }}
                  >
                    {section.label}
                  </span>
                  {selectedSections.includes(section.id) && (
                    <CheckCircle className="w-4 h-4 text-[#008344]" />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Formato de Exportação */}
          <div>
            <h3 
              className="text-[#2A2A2A] mb-3"
              style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '14px' }}
            >
              Formato de exportação
            </h3>
            <div className="space-y-2">
              {formats.map((format) => (
                <label
                  key={format.value}
                  className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedFormat === format.value
                      ? 'border-[#003F7D] bg-[#003F7D]/5'
                      : 'border-[#E4E4E4] hover:border-[#003F7D]/30'
                  }`}
                >
                  <input
                    type="radio"
                    name="format"
                    value={format.value}
                    checked={selectedFormat === format.value}
                    onChange={(e) => setSelectedFormat(e.target.value as 'pdf' | 'csv' | 'excel')}
                    className="mt-1"
                  />
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-[#003F7D]/10 rounded-lg flex items-center justify-center">
                      <format.icon className="w-5 h-5 text-[#003F7D]" />
                    </div>
                    <div className="flex-1">
                      <h4 
                        className="text-[#2A2A2A] mb-0.5"
                        style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '13px' }}
                      >
                        {format.label}
                      </h4>
                      <p 
                        className="text-[#666666]"
                        style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px' }}
                      >
                        {format.description}
                      </p>
                    </div>
                  </div>
                  {selectedFormat === format.value && (
                    <CheckCircle className="w-5 h-5 text-[#003F7D] flex-shrink-0 mt-2" />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Info sobre filtros */}
          <div className="p-3 bg-[#003F7D]/5 rounded-lg border border-[#003F7D]/20">
            <p 
              className="text-[#003F7D]"
              style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px', lineHeight: '1.5' }}
            >
              💡 <strong>Dica:</strong> O relatório será gerado com os filtros atuais de período e tipo de conteúdo.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 pt-0 flex gap-3">
          <Button
            onClick={handleGenerate}
            className="flex-1 h-11 bg-[#008344] hover:bg-[#006633] text-white"
            style={{ fontFamily: 'Inter', fontWeight: 600 }}
            disabled={selectedSections.length === 0}
          >
            <Download className="w-4 h-4 mr-2" />
            Gerar e baixar relatório
          </Button>
          <Button
            onClick={onClose}
            variant="outline"
            className="h-11 border-[#E4E4E4] text-[#666666] hover:bg-[#FAFAFA]"
            style={{ fontFamily: 'Inter', fontWeight: 500 }}
          >
            Cancelar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
