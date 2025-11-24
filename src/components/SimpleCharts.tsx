// Simple CSS-based chart components to replace recharts

interface BarChartData {
  name: string;
  value: number;
  color?: string;
}

interface SimpleBarChartProps {
  data: BarChartData[];
  height?: number;
}

export function SimpleBarChart({ data, height = 300 }: SimpleBarChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="w-full" style={{ height }}>
      <div className="flex items-end justify-around h-full gap-2 p-4">
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 100;
          return (
            <div key={index} className="flex flex-col items-center flex-1 max-w-[120px]">
              <div className="text-sm font-medium text-foreground mb-2 text-center">
                R$ {(item.value / 1000000).toFixed(1)}M
              </div>
              <div 
                className="w-full rounded-t-lg transition-all duration-500 hover:opacity-80"
                style={{ 
                  height: `${barHeight}%`,
                  backgroundColor: item.color || '#008344',
                  minHeight: '20px'
                }}
              />
              <div className="text-xs text-muted-foreground mt-2 text-center break-words w-full">
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface PieChartData {
  name: string;
  value: number;
  color: string;
}

interface SimplePieChartProps {
  data: PieChartData[];
  size?: number;
}

export function SimplePieChart({ data, size = 200 }: SimplePieChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  let cumulativePercent = 0;
  const segments = data.map(item => {
    const percent = (item.value / total) * 100;
    const startPercent = cumulativePercent;
    cumulativePercent += percent;
    return { ...item, percent, startPercent };
  });

  return (
    <div className="flex flex-col md:flex-row items-center gap-8">
      <div style={{ width: size, height: size }} className="relative flex-shrink-0">
        <div 
          className="w-full h-full rounded-full overflow-hidden shadow-lg"
          style={{
            background: `conic-gradient(${segments.map((s, i) => 
              `${s.color} ${s.startPercent}% ${s.startPercent + s.percent}%`
            ).join(', ')})`
          }}
        />
      </div>
      <div className="space-y-3 flex-1">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">{item.name}</span>
            </div>
            <div className="text-sm font-medium text-foreground">
              {((item.value / total) * 100).toFixed(1)}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}