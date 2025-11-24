import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { DollarSign, TrendingUp, Users, Building2, FileText, ExternalLink } from 'lucide-react';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const budgetData = [
  { category: 'Educação', value: 45000000, percentage: 28, color: '#3b82f6' },
  { category: 'Saúde', value: 38000000, percentage: 24, color: '#10b981' },
  { category: 'Infraestrutura', value: 32000000, percentage: 20, color: '#f59e0b' },
  { category: 'Segurança', value: 18000000, percentage: 11, color: '#ef4444' },
  { category: 'Assistência Social', value: 15000000, percentage: 9, color: '#8b5cf6' },
  { category: 'Cultura e Esporte', value: 12000000, percentage: 8, color: '#ec4899' },
];

const monthlyExpenses = [
  { month: 'Jan', value: 12500000 },
  { month: 'Fev', value: 13200000 },
  { month: 'Mar', value: 14100000 },
  { month: 'Abr', value: 13800000 },
  { month: 'Mai', value: 14500000 },
  { month: 'Jun', value: 15200000 },
];

const contracts = [
  {
    id: 1,
    title: 'Construção de Centro de Saúde - Bairro Norte',
    company: 'Construtora ABC Ltda',
    value: 2800000,
    date: '15/11/2024',
    status: 'Em andamento',
    type: 'Licitação',
  },
  {
    id: 2,
    title: 'Aquisição de equipamentos hospitalares',
    company: 'MedEquip S.A.',
    value: 850000,
    date: '08/11/2024',
    status: 'Concluído',
    type: 'Pregão eletrônico',
  },
  {
    id: 3,
    title: 'Manutenção de vias urbanas - Zona Sul',
    company: 'Pavimentadora XYZ',
    value: 1200000,
    date: '20/10/2024',
    status: 'Em andamento',
    type: 'Licitação',
  },
];

const publicWorks = [
  {
    id: 1,
    title: 'Revitalização da Praça Central',
    budget: 450000,
    spent: 157500,
    progress: 35,
    status: 'Em andamento',
    startDate: '01/09/2024',
    expectedEnd: '01/12/2024',
  },
  {
    id: 2,
    title: 'Construção de Centro de Saúde - Bairro Norte',
    budget: 2800000,
    spent: 840000,
    progress: 30,
    status: 'Em andamento',
    startDate: '15/08/2024',
    expectedEnd: '15/05/2025',
  },
  {
    id: 3,
    title: 'Ampliação da Escola Municipal Santos Dumont',
    budget: 1500000,
    spent: 1500000,
    progress: 100,
    status: 'Concluído',
    startDate: '10/03/2024',
    expectedEnd: '10/10/2024',
  },
];

const indicators = [
  { label: 'População', value: '185.432', unit: 'habitantes', icon: Users, change: '+1.2%' },
  { label: 'PIB Municipal', value: '2.8', unit: 'bilhões', icon: TrendingUp, change: '+3.5%' },
  { label: 'Orçamento 2024', value: '160', unit: 'milhões', icon: DollarSign, change: '+8.2%' },
  { label: 'Servidores', value: '3.247', unit: 'ativos', icon: Building2, change: '+0.8%' },
];

export function Transparency() {
  const totalBudget = budgetData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="max-w-6xl mx-auto p-4 pb-8">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Portal de Transparência</h1>
        <p className="text-gray-600">
          Acompanhe como o dinheiro público está sendo usado na sua cidade
        </p>
      </div>

      {/* Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {indicators.map((indicator) => (
          <Card key={indicator.label} className="p-4">
            <div className="flex items-start justify-between mb-2">
              <indicator.icon className="w-5 h-5 text-gray-400" />
              <Badge variant="secondary" className="text-xs">
                {indicator.change}
              </Badge>
            </div>
            <p className="text-2xl text-gray-900 mb-1">
              {indicator.value}
            </p>
            <p className="text-xs text-gray-600">{indicator.unit}</p>
            <p className="text-xs text-gray-500 mt-1">{indicator.label}</p>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="budget" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="budget">Orçamento</TabsTrigger>
          <TabsTrigger value="works">Obras</TabsTrigger>
          <TabsTrigger value="contracts">Contratos</TabsTrigger>
          <TabsTrigger value="salaries">Folha</TabsTrigger>
        </TabsList>

        <TabsContent value="budget" className="space-y-4">
          <Card className="p-6">
            <div className="mb-6">
              <h2 className="text-gray-900 mb-1">Orçamento Municipal 2024</h2>
              <p className="text-gray-600">
                Total: R$ {(totalBudget / 1000000).toFixed(1)} milhões
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-gray-900 mb-4">Distribuição por área</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={budgetData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {budgetData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number) => `R$ ${(value / 1000000).toFixed(1)}M`}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                {budgetData.map((item) => (
                  <div key={item.category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-700">{item.category}</span>
                      <span className="text-gray-900">
                        R$ {(item.value / 1000000).toFixed(1)}M
                      </span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-gray-900 mb-4">Execução mensal (2024)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={monthlyExpenses}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `${(value / 1000000).toFixed(0)}M`} />
                  <Tooltip
                    formatter={(value: number) => `R$ ${(value / 1000000).toFixed(2)}M`}
                  />
                  <Legend />
                  <Bar dataKey="value" fill="#3b82f6" name="Gastos" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-gray-900 mb-1">Documentos oficiais</h3>
                <p className="text-gray-600 mb-3">
                  Acesse o LDO, LOA e relatórios detalhados de execução orçamentária
                </p>
                <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  Ver documentos <ExternalLink className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="works" className="space-y-4">
          {publicWorks.map((work) => (
            <Card key={work.id} className="p-5">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-2">{work.title}</h3>
                    <div className="flex items-center gap-3 flex-wrap">
                      <Badge
                        className={
                          work.status === 'Concluído'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-blue-100 text-blue-700'
                        }
                      >
                        {work.status}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        Início: {work.startDate}
                      </span>
                      <span className="text-xs text-gray-500">
                        Previsão: {work.expectedEnd}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-gray-600">Progresso da obra</span>
                    <span className="text-gray-900">{work.progress}%</span>
                  </div>
                  <Progress value={work.progress} className="h-2 mb-1" />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Orçamento total</p>
                    <p className="text-gray-900">
                      R$ {work.budget.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Valor executado</p>
                    <p className="text-gray-900">
                      R$ {work.spent.toLocaleString('pt-BR')}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="contracts" className="space-y-4">
          {contracts.map((contract) => (
            <Card key={contract.id} className="p-5">
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{contract.type}</Badge>
                    <Badge
                      className={
                        contract.status === 'Concluído'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                      }
                    >
                      {contract.status}
                    </Badge>
                  </div>
                  <h3 className="text-gray-900 mb-1">{contract.title}</h3>
                  <p className="text-gray-600">{contract.company}</p>
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Valor do contrato</p>
                    <p className="text-gray-900">
                      R$ {contract.value.toLocaleString('pt-BR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 mb-1">Data</p>
                    <p className="text-gray-900">{contract.date}</p>
                  </div>
                </div>

                <button className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm">
                  Ver detalhes do contrato <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="salaries" className="space-y-4">
          <Card className="p-6">
            <h2 className="text-gray-900 mb-4">Folha de Pagamento Municipal</h2>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 mb-1">Total de servidores</p>
                <p className="text-2xl text-gray-900">3.247</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 mb-1">Folha mensal média</p>
                <p className="text-2xl text-gray-900">R$ 18,5M</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 mb-1">Salário médio</p>
                <p className="text-2xl text-gray-900">R$ 5.698</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700">Educação</span>
                <span className="text-gray-900">1.245 servidores - R$ 7,2M/mês</span>
              </div>
              <Progress value={39} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-gray-700">Saúde</span>
                <span className="text-gray-900">987 servidores - R$ 6,1M/mês</span>
              </div>
              <Progress value={33} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-gray-700">Administração</span>
                <span className="text-gray-900">456 servidores - R$ 2,8M/mês</span>
              </div>
              <Progress value={15} className="h-2" />

              <div className="flex items-center justify-between">
                <span className="text-gray-700">Outros</span>
                <span className="text-gray-900">559 servidores - R$ 2,4M/mês</span>
              </div>
              <Progress value={13} className="h-2" />
            </div>
          </Card>

          <Card className="p-5 bg-green-50 border-green-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-green-600">✓</span>
              </div>
              <div>
                <h3 className="text-gray-900 mb-1">Dados atualizados</h3>
                <p className="text-gray-600 mb-2">
                  Última atualização: 20/11/2024
                </p>
                <button className="text-green-700 hover:text-green-800 flex items-center gap-1 text-sm">
                  Consultar folha completa <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="p-5 mt-6 bg-gray-50">
        <div className="flex items-start gap-3">
          <FileText className="w-5 h-5 text-gray-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-gray-900 mb-1">Fonte dos dados</h3>
            <p className="text-gray-600">
              Todas as informações são extraídas dos portais oficiais da Prefeitura e Câmara Municipal, 
              atualizados conforme Lei de Acesso à Informação (LAI) e Lei de Responsabilidade Fiscal (LRF).
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
