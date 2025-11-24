import { Card } from '../ui/card';
import { BookOpen, TrendingUp, Eye } from 'lucide-react';

export interface ArticleData {
  id: string;
  title: string;
  views: number;
  category: string;
  readTime?: string;
  trend?: string;
}

interface EducationArticlesCardProps {
  data: ArticleData[];
  onArticleClick?: (articleId: string) => void;
}

export function EducationArticlesCard({ data, onArticleClick }: EducationArticlesCardProps) {
  return (
    <Card className="p-5 bg-white border border-[#E4E4E4]">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 pb-3 border-b border-[#E4E4E4]">
        <div className="w-10 h-10 bg-[#003F7D]/10 rounded-lg flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-[#003F7D]" />
        </div>
        <div className="flex-1">
          <h3 
            className="text-[#2A2A2A]"
            style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '16px' }}
          >
            Artigos mais acessados
          </h3>
          <p 
            className="text-[#666666]"
            style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '12px' }}
          >
            Top 5 da aba Educação Política
          </p>
        </div>
      </div>

      {/* List */}
      {data.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-[#E4E4E4] rounded-full flex items-center justify-center mx-auto mb-3">
            <BookOpen className="w-6 h-6 text-[#999999]" />
          </div>
          <p 
            className="text-[#666666]"
            style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '13px' }}
          >
            Nenhum artigo acessado no período
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((article, index) => (
            <div 
              key={article.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#FAFAFA] transition-colors cursor-pointer"
              onClick={() => onArticleClick?.(article.id)}
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
                <h4 
                  className="text-[#2A2A2A] line-clamp-2 mb-2"
                  style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '14px', lineHeight: '1.4' }}
                >
                  {article.title}
                </h4>

                <div className="flex items-center gap-2 flex-wrap">
                  {/* Education Badge */}
                  <span 
                    className="px-2 py-0.5 bg-[#003F7D]/10 text-[#003F7D] rounded"
                    style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '11px' }}
                  >
                    Educação Política
                  </span>

                  {/* Category */}
                  <span 
                    className="px-2 py-0.5 bg-[#008344]/10 text-[#008344] rounded"
                    style={{ fontFamily: 'Inter', fontWeight: 500, fontSize: '11px' }}
                  >
                    {article.category}
                  </span>

                  {/* Read Time */}
                  {article.readTime && (
                    <span 
                      className="text-[#999999]"
                      style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '11px' }}
                    >
                      {article.readTime}
                    </span>
                  )}

                  {/* Trend */}
                  {article.trend && (
                    <div className="flex items-center gap-1 text-[#008344]">
                      <TrendingUp className="w-3 h-3" />
                      <span style={{ fontFamily: 'Inter', fontWeight: 600, fontSize: '11px' }}>
                        {article.trend}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Views */}
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-1.5 text-[#003F7D]">
                  <Eye className="w-4 h-4" />
                  <span style={{ fontFamily: 'Inter', fontWeight: 700, fontSize: '16px' }}>
                    {article.views.toLocaleString('pt-BR')}
                  </span>
                </div>
                <p 
                  className="text-[#999999]"
                  style={{ fontFamily: 'Inter', fontWeight: 400, fontSize: '11px' }}
                >
                  acessos
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
