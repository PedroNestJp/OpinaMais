import { Card } from '../ui/card';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  iconColor?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  subtitle?: string;
}

export function MetricCard({ title, value, icon: Icon, iconColor = '#008344', trend, subtitle }: MetricCardProps) {
  return (
    <Card className="p-4 bg-white border border-[#E4E4E4] hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p 
            className="text-[#666666] mb-1"
            style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '13px' }}
          >
            {title}
          </p>
          <h3 
            className="text-[#2A2A2A] mb-1"
            style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '28px', lineHeight: '1.2' }}
          >
            {value}
          </h3>
          {subtitle && (
            <p 
              className="text-[#999999]"
              style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px' }}
            >
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span 
                className={trend.isPositive ? 'text-[#008344]' : 'text-[#E5484D]'}
                style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '12px' }}
              >
                {trend.isPositive ? '↑' : '↓'} {trend.value}
              </span>
              <span 
                className="text-[#999999]"
                style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '11px' }}
              >
                vs período anterior
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: `${iconColor}20` }}
          >
            <Icon className="w-6 h-6" style={{ color: iconColor }} />
          </div>
        )}
      </div>
    </Card>
  );
}
