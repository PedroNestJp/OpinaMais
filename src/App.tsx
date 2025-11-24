import { useEffect, useState } from "react";
import { OpinaWelcome } from "./components/opina/OpinaWelcome";
import { OpinaHome } from "./components/opina/OpinaHome";
import { OpinaLogin } from "./components/opina/OpinaLogin";
import { OpinaSignup } from "./components/opina/OpinaSignup";
import { OpinaOnboarding } from "./components/opina/OpinaOnboarding";
import { OpinaFeed } from "./components/opina/OpinaFeed";
import { OpinaEducation } from "./components/opina/OpinaEducation";
import { OpinaProfile } from "./components/opina/OpinaProfile";
import { AIChatButton } from "./components/opina/AIChatButton";
import {
  api,
  ApiUser,
  getStoredToken,
  getStoredUser,
  setStoredToken,
  setStoredUser,
} from "./lib/api";
import {
  SubscriberDashboard,
  DashboardLogin,
} from "./components/dashboard";
import { Logo } from "./components/Logo";
import {
  Home,
  BookOpen,
  BarChart3,
  User,
} from "./components/icons";

type ScreenType =
  | "welcome"
  | "how-it-works"
  | "login"
  | "signup"
  | "onboarding"
  | "app"
  | "dashboard"
  | "dashboard-login";
type TabType = "home" | "education" | "profile";

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<ScreenType>("welcome");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    Boolean(getStoredToken()),
  );
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isPremiumAuthenticated, setIsPremiumAuthenticated] =
    useState(false);
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [userInterests, setUserInterests] = useState<string[]>(
    [],
  );
  const [audioMode, setAudioMode] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [authToken, setAuthToken] = useState<string | null>(() =>
    getStoredToken(),
  );
  const [currentUser, setCurrentUser] = useState<ApiUser | null>(() =>
    getStoredUser(),
  );
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    setStoredToken(authToken);
  }, [authToken]);

  useEffect(() => {
    setStoredUser(currentUser);
  }, [currentUser]);

  const persistAuth = (token: string, user: ApiUser) => {
    setAuthToken(token);
    setCurrentUser(user);
    setIsAuthenticated(true);
    setIsAnonymous(false);
    setShowOnboarding(false);
  };

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    setAuthError(null);
    setAuthLoading(true);
    try {
      const response = await api.login(credentials);
      persistAuth(response.token, response.user);
      setCurrentScreen("app");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao entrar.";
      setAuthError(message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignup = async (payload: {
    name: string;
    email: string;
    password: string;
  }) => {
    setAuthError(null);
    setAuthLoading(true);
    try {
      await api.register(payload);
      const loginResponse = await api.login({
        email: payload.email,
        password: payload.password,
      });
      persistAuth(loginResponse.token, loginResponse.user);
      setCurrentScreen("onboarding");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao criar conta.";
      setAuthError(message);
      throw error;
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSkipAuth = () => {
    setIsAnonymous(true);
    setCurrentScreen("onboarding");
  };

  const handleAnonymousLogin = () => {
    setIsAnonymous(true);
    setShowOnboarding(false);
    setCurrentScreen("app");
  };

  const handleCompleteOnboarding = (
    interests: string[],
    audioPreference: boolean,
  ) => {
    setUserInterests(interests);
    setAudioMode(audioPreference);
    setShowOnboarding(false);
    setCurrentScreen("app");
  };

  const handleLogout = () => {
    if (!confirm("Tem certeza que deseja sair?")) return;

    setAuthLoading(true);
    api
      .logout()
      .catch((error) =>
        console.error("Erro ao deslogar no backend:", error),
      )
      .finally(() => {
        setAuthToken(null);
        setCurrentUser(null);
        setIsAuthenticated(false);
        setIsAnonymous(false);
        setShowOnboarding(true);
        setUserInterests([]);
        setAudioMode(false);
        setCurrentScreen("welcome");
        setActiveTab("home");
        setAuthLoading(false);
      });
  };

  // Welcome Screen
  if (currentScreen === "welcome") {
    return (
      <OpinaWelcome
        onCreateAccount={() => setCurrentScreen("login")}
        onHaveAccount={() => setCurrentScreen("how-it-works")}
        onViewDashboard={() =>
          setCurrentScreen("dashboard-login")
        }
      />
    );
  }

  // How It Works Screen
  if (currentScreen === "how-it-works") {
    return (
      <OpinaHome
        onContinue={() => setCurrentScreen("signup")}
        onBack={() => setCurrentScreen("welcome")}
        onAnonymousEntry={handleAnonymousLogin}
      />
    );
  }

  // Login Screen
  if (currentScreen === "login") {
    return (
      <OpinaLogin
        onLogin={handleLogin}
        onNavigateToSignup={() => setCurrentScreen("signup")}
        onSkip={handleSkipAuth}
        onBack={() => setCurrentScreen("welcome")}
        onAnonymousLogin={handleAnonymousLogin}
        isLoading={authLoading}
        errorMessage={authError}
      />
    );
  }

  // Signup Screen
  if (currentScreen === "signup") {
    return (
      <OpinaSignup
        onSignup={handleSignup}
        onNavigateToLogin={() => setCurrentScreen("login")}
        onBack={() => setCurrentScreen("how-it-works")}
        isLoading={authLoading}
        errorMessage={authError}
      />
    );
  }

  // Onboarding Screen
  if (currentScreen === "onboarding" && showOnboarding) {
    return (
      <OpinaOnboarding onComplete={handleCompleteOnboarding} />
    );
  }

  // Dashboard Login Screen
  if (currentScreen === "dashboard-login") {
    return (
      <DashboardLogin
        onBack={() => setCurrentScreen("welcome")}
        onLoginSuccess={() => {
          setIsPremiumAuthenticated(true);
          setCurrentScreen("dashboard");
        }}
      />
    );
  }

  // Dashboard Screen (only if authenticated)
  if (currentScreen === "dashboard" && isPremiumAuthenticated) {
    return (
      <SubscriberDashboard
        onBack={() => {
          setCurrentScreen("welcome");
          setIsPremiumAuthenticated(false);
        }}
      />
    );
  }

  // Redirect to login if trying to access dashboard without auth
  if (
    currentScreen === "dashboard" &&
    !isPremiumAuthenticated
  ) {
    setCurrentScreen("dashboard-login");
    return null;
  }

  // Main App
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Audio Mode Banner */}
      {audioMode && (
        <div className="bg-primary/10 border-b border-primary/20 px-4 py-2 sticky top-0 z-40">
          <p className="text-sm text-center text-foreground flex items-center justify-center gap-2">
            <span className="text-lg">🔊</span>
            <span>
              Modo áudio ativado – toque em "Ouvir" em qualquer
              card
            </span>
          </p>
        </div>
      )}

      {/* Anonymous Mode Banner */}
      {isAnonymous && (
        <div className="bg-[#FFC947]/20 border-b border-[#FFC947]/40 px-4 py-2 sticky top-0 z-40">
          <p className="text-sm text-center text-foreground flex items-center justify-center gap-2">
            <span className="text-lg">👀</span>
            <span>
              Modo anônimo – Você pode votar, mas não pode
              compartilhar ou acessar o perfil
            </span>
          </p>
        </div>
      )}

      {/* Main Content */}
      <div className="min-h-[calc(100vh-5rem)]">
        {activeTab === "home" && (
          <OpinaFeed
            userInterests={userInterests}
            audioMode={audioMode}
            isAnonymous={isAnonymous}
            authToken={authToken}
          />
        )}
        {activeTab === "education" && (
          <OpinaEducation audioMode={audioMode} />
        )}
        {activeTab === "profile" && (
          <OpinaProfile
            userInterests={userInterests}
            audioMode={audioMode}
            onUpdateInterests={setUserInterests}
            onUpdateAudioMode={setAudioMode}
            onLogout={handleLogout}
            user={currentUser}
          />
        )}
      </div>

      {/* AI Chat Button */}
      <AIChatButton authToken={authToken} />

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-border z-50">
        <div
          className={`flex items-center justify-around h-16 ${isAnonymous ? "grid grid-cols-2" : "grid grid-cols-3"}`}
        >
          <button
            onClick={() => setActiveTab("home")}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeTab === "home"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            <Home
              className={`w-6 h-6 mb-1 ${activeTab === "home" ? "fill-current" : ""}`}
            />
            <span className="text-xs">Início</span>
          </button>

          <button
            onClick={() => setActiveTab("education")}
            className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
              activeTab === "education"
                ? "text-primary"
                : "text-muted-foreground"
            }`}
          >
            <BookOpen
              className={`w-6 h-6 mb-1 ${activeTab === "education" ? "fill-current" : ""}`}
            />
            <span className="text-xs">Educação</span>
          </button>

          {!isAnonymous && (
            <button
              onClick={() => setActiveTab("profile")}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                activeTab === "profile"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <User
                className={`w-6 h-6 mb-1 ${activeTab === "profile" ? "fill-current" : ""}`}
              />
              <span className="text-xs">Perfil</span>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}
