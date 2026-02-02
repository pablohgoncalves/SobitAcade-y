import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AnimatePresence, motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signUp, isAuthenticated, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  

  // Redirect if already authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (isSignUp) {
      const result = await signUp(email, password);
      if (result) {
        setError(result.message);
      } else {
        navigate("/dashboard");
      }
    } else {
      const result = await signIn(email, password);
      if (result) {
        setError(result.message);
      } else {
        navigate("/dashboard");
      }
    }
    
    setIsLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8">
            <img alt="SOBIT Logo" className="w-10 h-10 object-cover" src="/lovable-uploads/d89fd506-b37f-4c4a-b53e-f1a3846cd604.webp" />
            <div className="flex flex-col">
              <span className="text-xl font-bold text-foreground leading-none">SOBIT</span>
              <span className="text-sm text-accent font-medium">Academy</span>
            </div>
          </Link>

          <AnimatePresence mode="wait">
            <motion.div
              key={isSignUp ? "signup" : "login"}
              initial={{ opacity: 0, x: isSignUp ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isSignUp ? -20 : 20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Title */}
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {isSignUp ? "Criar conta" : "Bem-vindo de volta"}
              </h1>
              <p className="text-muted-foreground mb-8">
                {isSignUp 
                  ? "Preencha os dados para criar sua conta." 
                  : "Entre com suas credenciais para acessar os tutoriais."}
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 text-sm text-destructive bg-destructive/10 rounded-lg"
                  >
                    {error}
                  </motion.div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  size="lg"
                  disabled={isLoading}
                >
                  {isLoading 
                    ? (isSignUp ? "Criando conta..." : "Entrando...") 
                    : (isSignUp ? "Criar Conta" : "Entrar")}
                </Button>
              </form>
            </motion.div>
          </AnimatePresence>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            {isSignUp ? "Já tem uma conta?" : "Não tem uma conta?"}{" "}
            <button
              type="button"
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
              className="text-accent hover:underline font-medium"
            >
              {isSignUp ? "Entrar" : "Criar conta"}
            </button>
          </p>

          <p className="mt-4 text-center text-sm text-muted-foreground">
            Problemas para acessar?{" "}
            <a
              href="https://api.whatsapp.com/send?l=pt&phone=5511975575122"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              Contate o suporte SOBIT
            </a>
          </p>
        </div>
      </div>

      {/* Right Panel - Visual */}
      <div className="hidden lg:flex flex-1 hero-gradient items-center justify-center p-12 relative overflow-hidden">
        {/* Animated Background Paths */}
        <BackgroundPaths />
        <div className="max-w-lg text-center text-primary-foreground">
          <div className="w-28 h-28 mx-auto mb-8 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center p-3">
            <img alt="SOBIT Logo" className="w-20 h-20 object-cover" src="/lovable-uploads/3fe62930-99ae-4f2c-b64e-05e574a726a9.webp" />
          </div>
          <h2 className="text-3xl font-bold mb-4">SOBIT Academy</h2>
          <p className="text-lg text-primary-foreground/80">
            Aprenda a usar o sistema SOBIT com vídeos tutoriais práticos. 
            Melhore seus processos contábeis e automatize tarefas rotineiras.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 text-sm text-primary-foreground/70">
            <span>50+ vídeos</span>
            <span className="w-1 h-1 rounded-full bg-primary-foreground/50" />
            <span>8 módulos</span>
            <span className="w-1 h-1 rounded-full bg-primary-foreground/50" />
            <span>10h+ conteúdo</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;