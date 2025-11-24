import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  User,
  Settings,
  Award,
  TrendingUp,
  MessageSquare,
  Vote,
  Camera,
  BookOpen,
  Share2,
  Bell,
} from 'lucide-react';

const badges = [
  {
    id: 'first-vote',
    title: 'Primeiro Voto',
    description: 'Votou pela primeira vez em um projeto de lei',
    icon: '🗳️',
    earned: true,
    date: '15/11/2024',
  },
  {
    id: 'active-citizen',
    title: 'Cidadão Ativo',
    description: 'Participou de 5 consultas públicas',
    icon: '⭐',
    earned: true,
    date: '18/11/2024',
  },
  {
    id: 'reporter',
    title: 'Repórter Cidadão',
    description: 'Fez seu primeiro relato de problema urbano',
    icon: '📸',
    earned: true,
    date: '20/11/2024',
  },
  {
    id: 'learner',
    title: 'Estudante Cívico',
    description: 'Completou 3 módulos educativos',
    icon: '📚',
    earned: true,
    date: '12/11/2024',
  },
  {
    id: 'influencer',
    title: 'Influenciador Cívico',
    description: 'Compartilhou 10 informações verificadas',
    icon: '🌟',
    earned: false,
    progress: 6,
    total: 10,
  },
  {
    id: 'debate-master',
    title: 'Mestre do Debate',
    description: 'Comentou em 20 projetos de lei',
    icon: '💬',
    earned: false,
    progress: 12,
    total: 20,
  },
  {
    id: 'community-hero',
    title: 'Herói da Comunidade',
    description: 'Teve 3 relatos resolvidos pela prefeitura',
    icon: '🦸',
    earned: false,
    progress: 1,
    total: 3,
  },
  {
    id: 'transparency-guardian',
    title: 'Guardião da Transparência',
    description: 'Consultou dados de transparência 15 vezes',
    icon: '🔍',
    earned: false,
    progress: 8,
    total: 15,
  },
];

const activities = [
  {
    id: 1,
    type: 'vote',
    title: 'Votou a favor do PL 045/2024',
    description: 'Corredores de ônibus na Av. Principal',
    date: '21/11/2024',
    icon: Vote,
    points: 10,
  },
  {
    id: 2,
    type: 'report',
    title: 'Criou relato sobre iluminação',
    description: 'Poste queimado na Av. Principal',
    date: '20/11/2024',
    icon: Camera,
    points: 15,
  },
  {
    id: 3,
    type: 'education',
    title: 'Completou módulo educativo',
    description: 'O que é um Projeto de Lei?',
    date: '19/11/2024',
    icon: BookOpen,
    points: 20,
  },
  {
    id: 4,
    type: 'share',
    title: 'Compartilhou informação verificada',
    description: 'PL 052/2024 - Ampliação de postos de saúde',
    date: '18/11/2024',
    icon: Share2,
    points: 5,
  },
  {
    id: 5,
    type: 'comment',
    title: 'Comentou em projeto de lei',
    description: 'PL 045/2024 - Sugestão sobre rotas',
    date: '17/11/2024',
    icon: MessageSquare,
    points: 10,
  },
];

const stats = [
  { label: 'Votos em PLs', value: 8, icon: Vote },
  { label: 'Consultas participadas', value: 5, icon: MessageSquare },
  { label: 'Relatos criados', value: 2, icon: Camera },
  { label: 'Conteúdos educativos', value: 4, icon: BookOpen },
];

const interests = [
  'Mobilidade Urbana',
  'Educação',
  'Saúde',
  'Segurança',
  'Meio Ambiente',
];

export function Profile() {
  const totalPoints = activities.reduce((sum, activity) => sum + activity.points, 0);
  const earnedBadges = badges.filter((b) => b.earned).length;
  const level = Math.floor(totalPoints / 50) + 1;
  const pointsToNextLevel = (level * 50) - totalPoints;

  return (
    <div className="max-w-4xl mx-auto p-4 pb-8">
      {/* Profile Header */}
      <Card className="p-6 mb-6">
        <div className="flex items-start gap-4 mb-6">
          <Avatar className="w-20 h-20">
            <AvatarFallback className="bg-blue-600 text-white text-2xl">
              <User className="w-10 h-10" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h1 className="text-gray-900 mb-1">Cidadão Participante</h1>
            <p className="text-gray-600 mb-3">Membro desde novembro de 2024</p>
            <div className="flex items-center gap-3">
              <Badge className="bg-gradient-to-r from-blue-600 to-purple-600">
                <Award className="w-3 h-3 mr-1" />
                Nível {level}
              </Badge>
              <Badge variant="secondary">
                {earnedBadges} badges conquistadas
              </Badge>
            </div>
          </div>
          <Button variant="outline" size="sm">
            <Settings className="w-4 h-4 mr-2" />
            Configurações
          </Button>
        </div>

        {/* Progress to Next Level */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-700">Progresso para o Nível {level + 1}</span>
            <span className="text-gray-900">
              {totalPoints} / {level * 50} pontos
            </span>
          </div>
          <Progress value={(totalPoints / (level * 50)) * 100} className="h-2 mb-2" />
          <p className="text-xs text-gray-600">
            Faltam {pointsToNextLevel} pontos para o próximo nível
          </p>
        </div>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-4 text-center">
            <stat.icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl text-gray-900 mb-1">{stat.value}</p>
            <p className="text-xs text-gray-600">{stat.label}</p>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="badges" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="activity">Atividade</TabsTrigger>
          <TabsTrigger value="interests">Interesses</TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {badges.map((badge) => (
              <Card
                key={badge.id}
                className={`p-4 ${
                  badge.earned
                    ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'
                    : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${
                      badge.earned ? 'bg-white' : 'bg-gray-200 grayscale'
                    }`}
                  >
                    {badge.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1">{badge.title}</h3>
                    <p className="text-xs text-gray-600 mb-2">{badge.description}</p>
                    {badge.earned ? (
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-100 text-green-700 text-xs">
                          Conquistada
                        </Badge>
                        <span className="text-xs text-gray-500">{badge.date}</span>
                      </div>
                    ) : (
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600">Progresso</span>
                          <span className="text-xs text-gray-900">
                            {badge.progress}/{badge.total}
                          </span>
                        </div>
                        <Progress
                          value={(badge.progress! / badge.total!) * 100}
                          className="h-1.5"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-5 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h3 className="text-gray-900 mb-1">Continue participando!</h3>
                <p className="text-gray-700">
                  Conquiste mais badges participando ativamente da plataforma. Cada ação conta pontos 
                  e aproxima você do próximo nível!
                </p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-3">
          {activities.map((activity) => (
            <Card key={activity.id} className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <activity.icon className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-gray-900">{activity.title}</h3>
                    <Badge variant="secondary" className="text-xs">
                      +{activity.points} pts
                    </Badge>
                  </div>
                  <p className="text-gray-600 mb-1">{activity.description}</p>
                  <span className="text-xs text-gray-500">{activity.date}</span>
                </div>
              </div>
            </Card>
          ))}

          <Card className="p-5 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-gray-900 mb-1">Como ganhar mais pontos?</h3>
                <ul className="text-gray-700 space-y-1">
                  <li className="text-sm">• Vote em projetos de lei: 10 pontos</li>
                  <li className="text-sm">• Participe de consultas: 15 pontos</li>
                  <li className="text-sm">• Crie relatos de problemas: 15 pontos</li>
                  <li className="text-sm">• Complete módulos educativos: 20 pontos</li>
                  <li className="text-sm">• Comente em PLs: 10 pontos</li>
                  <li className="text-sm">• Compartilhe informações: 5 pontos</li>
                </ul>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="interests" className="space-y-4">
          <Card className="p-5">
            <h3 className="text-gray-900 mb-3">Seus interesses</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {interests.map((interest) => (
                <Badge key={interest} variant="secondary" className="px-3 py-1">
                  {interest}
                </Badge>
              ))}
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Editar interesses
            </Button>
          </Card>

          <Card className="p-5">
            <h3 className="text-gray-900 mb-3">Notificações</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">Novos projetos de lei</span>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">Consultas públicas</span>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">Atualização de relatos</span>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-700">Novos conteúdos educativos</span>
                </div>
                <input type="checkbox" className="w-4 h-4" />
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-purple-50 border-purple-200">
            <div className="flex items-start gap-3">
              <Share2 className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-gray-900 mb-1">Convide amigos</h3>
                <p className="text-gray-700 mb-3">
                  Quanto mais pessoas participando, mais forte é a democracia local. Compartilhe a 
                  plataforma com amigos e familiares!
                </p>
                <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar plataforma
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
