import { useEffect, useState } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { User, Edit2, CheckCircle2, LogOut, Trash2, BookOpen, Volume2 } from '../icons';
import { ApiUser } from '../../lib/api';
import opinaPlusLogo from 'figma:asset/39a9e75927b809ece9dd0193bc4b5f71704027b2.png';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

interface OpinaProfileProps {
  userInterests: string[];
  audioMode: boolean;
  onUpdateInterests: (interests: string[]) => void;
  onUpdateAudioMode: (mode: boolean) => void;
  onLogout?: () => void;
  user?: ApiUser | null;
}

const allInterests = [
  { id: 'education', label: 'Educação', icon: '📚' },
  { id: 'health', label: 'Saúde', icon: '🏥' },
  { id: 'mobility', label: 'Mobilidade', icon: '🚗' },
  { id: 'security', label: 'Segurança', icon: '🛡️' },
  { id: 'infrastructure', label: 'Obras', icon: '🏗️' },
  { id: 'environment', label: 'Meio Ambiente', icon: '🌳' },
  { id: 'culture', label: 'Cultura', icon: '🎭' },
  { id: 'social', label: 'Assistência Social', icon: '🤝' },
];

const activityStats = [
  { label: 'Votos dados', value: 23, icon: '👍' },
  { label: 'Enquetes participadas', value: 7, icon: '📊' },
];

export function OpinaProfile({
  userInterests,
  audioMode,
  onUpdateInterests,
  onUpdateAudioMode,
  onLogout,
  user,
}: OpinaProfileProps) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [userName, setUserName] = useState(user?.name || 'Cidadão Participante');
  const [tempName, setTempName] = useState(user?.name || 'Cidadão Participante');
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(userInterests);
  const [localAudioMode, setLocalAudioMode] = useState(audioMode);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setUserName(user.name);
      setTempName(user.name);
    }
  }, [user]);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleSaveName = () => {
    setUserName(tempName);
    setIsEditingName(false);
  };

  const handleSaveInterests = () => {
    onUpdateInterests(selectedInterests);
    setIsEditingInterests(false);
  };

  const handleAudioModeChange = (value: string) => {
    const newMode = value === 'ouvir';
    setLocalAudioMode(newMode);
    onUpdateAudioMode(newMode);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    } else if (confirm('Tem certeza que deseja sair?')) {
      window.location.reload();
    }
  };

  const handleDeleteAccount = () => {
    alert('Sua conta foi excluída. Em produção, isso removeria todos os dados do usuário do sistema.');
    window.location.reload();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 pt-6">
      {/* Header with Logo - Centralizado */}
      <div className="flex justify-center mb-6">
        <img src={opinaPlusLogo} alt="Opina+" className="w-32 h-auto" />
      </div>

      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <Avatar className="w-20 h-20 border-4 border-primary/20">
            <AvatarFallback className="bg-gradient-to-br from-primary to-secondary text-white text-2xl">
              <User className="w-10 h-10" />
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            {isEditingName ? (
              <div className="space-y-3">
                <Input
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="h-12 text-lg"
                />
                <div className="flex gap-2">
                  <Button onClick={handleSaveName} size="sm" className="bg-primary hover:bg-primary/90">
                    Salvar
                  </Button>
                  <Button
                    onClick={() => {
                      setTempName(userName);
                      setIsEditingName(false);
                    }}
                    variant="outline"
                    size="sm"
                  >
                    Cancelar
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3">
              <h2 className="text-foreground">{userName}</h2>
              <Button variant="ghost" size="sm" onClick={() => setIsEditingName(true)}>
                <Edit2 className="w-4 h-4" />
              </Button>
            </div>
            {user?.email && (
              <p className="text-sm text-muted-foreground">{user.email}</p>
            )}
            <p className="text-muted-foreground mb-3">Membro desde novembro de 2024</p>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              ✓ Perfil verificado
            </Badge>
          </>
        )}
          </div>
        </div>
      </Card>

      {/* Activity Stats */}
      <div className="grid grid-cols-2 gap-4">
        {activityStats.map((stat) => (
          <Card key={stat.label} className="p-5 text-center">
            <div className="text-4xl mb-3">{stat.icon}</div>
            <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Accessibility Preference */}
      <Card className="p-6">
        <h3 className="text-foreground mb-4 flex items-center gap-2">
          Acessibilidade
        </h3>
        <Label className="text-base text-muted-foreground mb-4 block">
          Como você prefere receber as informações?
        </Label>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-colors cursor-pointer">
            <input
              type="radio"
              name="audioMode"
              value="ler"
              checked={!localAudioMode}
              onChange={() => handleAudioModeChange('ler')}
              className="h-5 w-5 text-primary border-2 border-primary focus:ring-2 focus:ring-primary"
            />
            <div className="flex items-center gap-3 flex-1">
              <BookOpen className="w-6 h-6 text-primary" />
              <div>
                <p className="font-medium text-foreground">📝 Ler textos</p>
                <p className="text-sm text-muted-foreground">Vou ler os textos na tela</p>
              </div>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-4 rounded-lg border-2 border-border hover:border-primary/50 transition-colors cursor-pointer">
            <input
              type="radio"
              name="audioMode"
              value="ouvir"
              checked={localAudioMode}
              onChange={() => handleAudioModeChange('ouvir')}
              className="h-5 w-5 text-primary border-2 border-primary focus:ring-2 focus:ring-primary"
            />
            <div className="flex items-center gap-3 flex-1">
              <Volume2 className="w-6 h-6 text-primary" />
              <div>
                <p className="font-medium text-foreground">🔊 Ouvir informações</p>
                <p className="text-sm text-muted-foreground">Prefiro ouvir as informações</p>
              </div>
            </div>
          </label>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          {localAudioMode
            ? 'Modo áudio ativado - Use os botões "Ouvir" em cada card e conteúdo'
            : 'Modo leitura ativado - Os conteúdos serão exibidos em texto'}
        </p>
      </Card>

      {/* Interests */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-foreground">Meus temas de interesse</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEditingInterests(!isEditingInterests)}
          >
            <Edit2 className="w-4 h-4 mr-2" />
            {isEditingInterests ? 'Cancelar' : 'Editar'}
          </Button>
        </div>

        {isEditingInterests ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {allInterests.map((interest) => (
                <button
                  key={interest.id}
                  onClick={() => toggleInterest(interest.id)}
                  className={`p-5 rounded-xl border-2 transition-all relative ${
                    selectedInterests.includes(interest.id)
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  {selectedInterests.includes(interest.id) && (
                    <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  )}
                  <div className="text-3xl mb-2">{interest.icon}</div>
                  <p className="text-sm font-medium text-foreground">{interest.label}</p>
                </button>
              ))}
            </div>
            <Button
              onClick={handleSaveInterests}
              disabled={selectedInterests.length === 0}
              className="w-full bg-primary hover:bg-primary/90 h-12"
            >
              Salvar alterações
            </Button>
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap gap-3 mb-4">
              {selectedInterests.map((interestId) => {
                const interest = allInterests.find((i) => i.id === interestId);
                return interest ? (
                  <Badge key={interestId} variant="secondary" className="px-4 py-2 text-base">
                    {interest.icon} {interest.label}
                  </Badge>
                ) : null;
              })}
            </div>
            <p className="text-sm text-muted-foreground">
              Seu feed é personalizado com base nesses temas
            </p>
          </div>
        )}
      </Card>

      {/* Privacy Info */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary/20">
            <CheckCircle2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="text-foreground mb-2">Seus dados estão seguros</h4>
            <p className="text-muted-foreground">
              Opina+ respeita sua privacidade e segue rigorosamente a LGPD. Sua participação é
              anônima nos relatórios públicos e seus dados pessoais nunca são compartilhados.
            </p>
          </div>
        </div>
      </Card>

      {/* Actions */}
      <div className="space-y-3">
        <Button
          variant="outline"
          className="w-full h-12 text-muted-foreground hover:text-foreground"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5 mr-2" />
          Sair da conta
        </Button>

        <Button
          variant="outline"
          className="w-full h-12 text-destructive hover:bg-destructive/10 border-destructive/30"
          onClick={() => setDeleteDialogOpen(true)}
        >
          <Trash2 className="w-5 h-5 mr-2" />
          Excluir conta
        </Button>
      </div>

      {/* Delete Account Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir conta permanentemente?</DialogTitle>
            <DialogDescription className="text-base pt-4">
              Esta ação não pode ser desfeita. Todos os seus dados, incluindo votos, preferncias e
              histórico de participação serão permanentemente removidos.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              className="bg-destructive hover:bg-destructive/90"
            >
              Sim, excluir minha conta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
