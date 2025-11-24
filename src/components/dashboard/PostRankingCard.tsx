import { Card } from '../ui/card';
import { TrendingUp, Eye, Share2, Heart } from 'lucide-react';

export interface PostRankingData {
  id: string;
  title: string;
  type: 'PL' | 'Enquete' | 'Educação Política' | 'Discussão';
  metric: number;
  metricLabel: string;
  badge?: string;
  category?: string;
  categoryColor?: string;
}

interface PostRankingCardProps {
  title: string;
  data: PostRankingData[];
  metricType: 'likes' | 'views' | 'shares';
  icon?: typeof Heart | typeof Eye | typeof Share2;
  emptyMessage?: string;
}

const iconMap = {
  likes: Heart,
  views: Eye,
  shares: Share2,
};

const colorMap = {
  likes: '#E5484D',
  views: '#007AFF',
  shares: '#008344',
};

export function PostRankingCard({ 
  title, 
  data, 
  metricType, 
  icon, 
  emptyMessage = 'Nenhum dado disponível para o período selecionado' 
}: PostRankingCardProps) {
  const Icon = icon || iconMap[metricType];
  const color = colorMap[metricType];

  return (
    <Card className="p-5 bg-white border border-[#E4E4E4]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#E4E4E4]">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <h3 
          className="text-[#2A2A2A] flex-1"
          style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '16px' }}
        >
          {title}
        </h3>
      </div>

      {/* List */}
      {data.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-[#E4E4E4] rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon className="w-6 h-6 text-[#999999]" />
          </div>
          <p 
            className="text-[#666666]"
            style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '13px' }}
          >
            {emptyMessage}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((post, index) => (
            <div 
              key={post.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#FAFAFA] transition-colors cursor-pointer"
            >
              {/* Ranking Number */}
              <div 
                className={`w-7 h-7 rounded flex items-center justify-center flex-shrink-0 ${
                  index === 0 
                    ? 'bg-[#FFC947] text-[#2A2A2A]' 
                    : index === 1
                    ? 'bg-[#E4E4E4] text-[#666666]'
                    : index === 2
                    ? 'bg-[#FFB84D]/30 text-[#666666]'
                    : 'bg-[#F5F5F5] text-[#999999]'
                }`}
                style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '13px' }}
              >
                {index + 1}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h4 
                    className="text-[#2A2A2A] line-clamp-2 flex-1"
                    style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px', lineHeight: '1.4' }}
                  >
                    {post.title}
                  </h4>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Type Badge */}
                  <span 
                    className="px-2 py-0.5 bg-[#003F7D]/10 text-[#003F7D] rounded"
                    style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '11px' }}
                  >
                    {post.type}
                  </span>

                  {/* Category Badge */}
                  {post.category && (
                    <span 
                      className="px-2 py-0.5 rounded"
                      style={{ 
                        fontFamily: 'Inter', 
                        fontWeight: 500, 
                        fontSize: '11px',
                        backgroundColor: `${post.categoryColor || '#008344'}20`,
                        color: post.categoryColor || '#008344'
                      }}
                    >
                      {post.category}
                    </span>
                  )}

                  {/* Additional Badge */}
                  {post.badge && (
                    <span 
                      className="px-2 py-0.5 bg-[#FFC947]/20 text-[#FFC947] rounded"
                      style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '11px' }}
                    >
                      {post.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Metric */}
              <div className="text-right flex-shrink-0">
                <div 
                  className="flex items-center gap-1.5"
                  style={{ color }}
                >
                  <Icon className="w-4 h-4" />
                  <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '16px' }}>
                    {post.metric.toLocaleString('pt-BR')}
                  </span>
                </div>
                <p 
                  className="text-[#999999]"
                  style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '11px' }}
                >
                  {post.metricLabel}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
