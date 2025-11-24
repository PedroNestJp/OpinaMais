import { useState } from 'react';
import { ChevronDown, Calendar, Filter } from 'lucide-react';

interface FilterBarProps {
  onPeriodChange: (period: string) => void;
  onContentTypeChange: (type: string) => void;
}

const periods = [
  { value: 'week', label: 'Última semana' },
  { value: 'month', label: 'Último mês' },
  { value: 'custom', label: 'Período personalizado' },
];

const contentTypes = [
  { value: 'all', label: 'Geral' },
  { value: 'pl', label: 'PLs' },
  { value: 'poll', label: 'Enquetes' },
  { value: 'education', label: 'Educação Política' },
];

export function FilterBar({ onPeriodChange, onContentTypeChange }: FilterBarProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedType, setSelectedType] = useState('all');

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value);
    onPeriodChange(value);
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    onContentTypeChange(value);
  };

  return (
    <div className="bg-white border border-[#E4E4E4] rounded-lg p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Filter className="w-4 h-4 text-[#666666]" />
        <h3 
          className="text-[#2A2A2A]"
          style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px' }}
        >
          Filtros
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Período */}
        <div>
          <label 
            className="block text-[#666666] mb-2"
            style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }}
          >
            Período
          </label>
          <div className="flex gap-2 flex-wrap">
            {periods.map((period) => (
              <button
                key={period.value}
                onClick={() => handlePeriodChange(period.value)}
                className={`px-3 py-2 rounded-lg border transition-all ${
                  selectedPeriod === period.value
                    ? 'bg-[#003F7D] text-white border-[#003F7D]'
                    : 'bg-white text-[#666666] border-[#E4E4E4] hover:border-[#003F7D]'
                }`}
                style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '13px' }}
              >
                {period.value === 'custom' && <Calendar className="w-3.5 h-3.5 inline mr-1.5" />}
                {period.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tipo de Conteúdo */}
        <div>
          <label 
            className="block text-[#666666] mb-2"
            style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '12px' }}
          >
            Tipo de conteúdo
          </label>
          <div className="flex gap-2 flex-wrap">
            {contentTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => handleTypeChange(type.value)}
                className={`px-3 py-2 rounded-lg border transition-all ${
                  selectedType === type.value
                    ? 'bg-[#008344] text-white border-[#008344]'
                    : 'bg-white text-[#666666] border-[#E4E4E4] hover:border-[#008344]'
                }`}
                style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '13px' }}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
