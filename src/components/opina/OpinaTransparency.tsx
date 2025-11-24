import { useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Progress } from '../ui/progress';
import { SimpleBarChart, SimplePieChart } from '../SimpleCharts';
import { TrendingUp, Building2, FileText, Calendar, DollarSign } from '../icons';
import { Logo } from '../Logo';

const budgetData = [
  { name: 'Educação', value: 38000000, percentage: 25, color: '#008344' },
  { name: 'Saúde', value: 22800000, percentage: 15, color: '#003F7D' },
  { name: 'Infraestrutura', value: 18240000, percentage: 12, color: '#FFC947' },
  { name: 'Segurança', value: 15200000, percentage: 10, color: '#7dd3c0' },
  { name: 'Assistência Social', value: 13680000, percentage: 9, color: '#3366a1' },
  { name: 'Outras', value: 43680000, percentage: 29, color: '#e8e8e8' },
];

const monthlyExecution = [
  { month: 'Jan', planejado: 12000000, executado: 11500000 },
  { month: 'Fev', planejado: 12000000, executado: 11800000 },
  { month: 'Mar', planejado: 12000000, executado: 12200000 },
  { month: 'Abr', planejado: 12000000, executado: 11900000 },
  { month: 'Mai', planejado: 12000000, executado: 12100000 },
  { month: 'Jun', planejado: 12000000, executado: 11700000 },
];

const projects = [
  {
    id: 1,
    title: 'Revitalização da Praça Central',
    location: 'Centro',
    budget: 450000,
    spent: 157500,
    progress: 35,
    deadline: '01/12/2024',
    status: 'Em andamento',
  },
  {
    id: 2,
    title: 'Construção do Parque Linear',
    location: 'Bairro Verde',
    budget: 2300000,
    spent: 690000,
    progress: 18,
    deadline: '15/03/2025',
    status: 'Em andamento',
  },
  {
    id: 3,
    title: 'Reforma de 5 escolas municipais',
    location: 'Diversos bairros',
    budget: 1800000,
    spent: 1620000,
    progress: 90,
    deadline: '30/11/2024',
    status: 'Finalização',
  },
];

const contracts = [
  {
    id: 1,
    title: 'Fornecimento de merenda escolar',
    company: 'Alimentos Silva Ltda',
    value: 1200000,
    date: '15/01/2024',
    type: 'Pregão Eletrônico',
  },
  {
    id: 2,
    title: 'Manutenção de vias públicas',
    company: 'Construtora ABC S.A.',
    value: 850000,
    date: '20/02/2024',
    type: 'Tomada de Preços',
  },
  {
    id: 3,
    title: 'Serviços de limpeza urbana',
    company: 'Limpeza Total Ltda',
    value: 2400000,
    date: '10/03/2024',
    type: 'Concorrência',
  },
];

export function OpinaTransparency() {
  const [selectedPeriod, setSelectedPeriod] = useState('2024');
  const [selectedTheme, setSelectedTheme] = useState('todos');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6 pt-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-4">
          <Logo variant="icon" size={40} />
          <h1 className="text-foreground mb-0">Transparência Pública</h1>
        </div>
        <p className="text-muted-foreground text-lg">
          Acompanhe como o dinheiro público está sendo usado na sua cidade
        </p>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm text-muted-foreground mb-2 block">Período</label>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="flex h-12 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="text-sm text-muted-foreground mb-2 block">Tema</label>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="flex h-12 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="todos">Todos os temas</option>
              <option value="educacao">Educação</option>
              <option value="saude">Saúde</option>
              <option value="infraestrutura">Infraestrutura</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="orcamento" className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-14">
          <TabsTrigger value="orcamento" className="text-base">Orçamento</TabsTrigger>
          <TabsTrigger value="obras" className="text-base">Obras</TabsTrigger>
          <TabsTrigger value="contratos" className="text-base">Contratos</TabsTrigger>
        </TabsList>

        {/* Orçamento Tab */}
        <TabsContent value="orcamento" className="space-y-6 mt-6">
          {/* KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Orçamento Total</p>
                  <p className="text-2xl font-bold text-foreground">R$ 152M</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Executado</p>
                  <p className="text-2xl font-bold text-foreground">R$ 113M</p>
                </div>
              </div>
              <Progress value={74} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">74% do planejado</p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Mês Atual</p>
                  <p className="text-2xl font-bold text-foreground">Novembro</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <Card className="p-6">
              <h3 className="text-foreground mb-4">Distribuição por Área</h3>
              <SimplePieChart data={budgetData} />
            </Card>

            {/* Bar Chart */}
            <Card className="p-6">
              <h3 className="text-foreground mb-4">Execução Mensal</h3>
              <SimpleBarChart data={monthlyExecution} />
            </Card>
          </div>

          {/* Budget Details */}
          <Card className="p-6">
            <h3 className="text-foreground mb-4">Detalhamento por Área</h3>
            <div className="space-y-4">
              {budgetData.map((item) => (
                <div key={item.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-foreground">{item.name}</span>
                    <span className="text-muted-foreground">{formatCurrency(item.value)}</span>
                  </div>
                  <Progress value={item.percentage} className="h-3" style={{ backgroundColor: item.color }} />
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Obras Tab */}
        <TabsContent value="obras" className="space-y-6 mt-6">
          <div className="grid gap-4">
            {projects.map((project) => (
              <Card key={project.id} className="p-6 border-l-4 border-l-primary">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-foreground mb-2">{project.title}</h3>
                      <div className="flex items-center gap-4 flex-wrap">
                        <Badge variant="secondary">{project.location}</Badge>
                        <Badge className={project.status === 'Em andamento' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-accent/10 text-accent border-accent/20'}>
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-8 h-8 text-primary" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Orçamento</p>
                      <p className="font-semibold text-foreground">{formatCurrency(project.budget)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Executado</p>
                      <p className="font-semibold text-foreground">{formatCurrency(project.spent)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Conclusão prevista</p>
                      <p className="font-semibold text-foreground">{project.deadline}</p>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Progresso</span>
                      <span className="font-semibold text-foreground">{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-3" />
                  </div>

                  <Button variant="outline" className="w-full">
                    Ver detalhes da obra
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Contratos Tab */}
        <TabsContent value="contratos" className="space-y-6 mt-6">
          <div className="grid gap-4">
            {contracts.map((contract) => (
              <Card key={contract.id} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-foreground mb-2">{contract.title}</h3>
                      <p className="text-muted-foreground mb-3">{contract.company}</p>
                      <Badge variant="secondary">{contract.type}</Badge>
                    </div>
                    <div className="w-16 h-16 bg-secondary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-8 h-8 text-secondary" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Valor do contrato</p>
                      <p className="text-xl font-semibold text-foreground">{formatCurrency(contract.value)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Data de assinatura</p>
                      <p className="font-semibold text-foreground">{contract.date}</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    Ver documento oficial
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Footer Info */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="text-4xl">📊</div>
          <div>
            <h4 className="text-foreground mb-2">Dados oficiais verificados</h4>
            <p className="text-muted-foreground">
              Todas as informações são extraídas dos portais oficiais de transparência e atualizadas mensalmente. 
              Em caso de dúvidas, consulte o Portal da Transparência do município.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}