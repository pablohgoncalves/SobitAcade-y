import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FlipText } from "@/components/ui/flip-text";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Play, Award, Clock } from "lucide-react";
import logoSobit from "@/assets/logo-sobit.webp";
const HeroSection = () => {
  return <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
    {/* Background Gradient - SOBIT Blue #0B3C8C to #0E4FBF */}
    <div className="absolute inset-0 hero-gradient" />

    {/* Animated Background Paths */}
    <BackgroundPaths />

    <div className="container mx-auto px-4 relative z-10">
      <div className="max-w-3xl mx-auto text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full mb-10 animate-fade-in">
          <img alt="SOBIT" className="w-5 h-5 object-contain" src="/lovable-uploads/608df485-188b-4522-af40-52cf2885e7e2.webp" />
          <span className="text-sm font-medium text-white/90">
            Plataforma oficial de treinamento
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl text-white mb-6 tracking-tight">
          <FlipText word="SOBIT Academy" className="font-bold justify-center" duration={0.5} delayMultiple={0.08} />
        </h1>

        {/* Subtitle - Reduced text */}
        <p className="text-xl md:text-2xl text-white/85 mb-12 font-light max-w-xl mx-auto animate-slide-up" style={{
          animationDelay: "0.1s"
        }}>
          Domine o sistema SOBIT com tutoriais práticos e objetivos.
        </p>

        {/* CTA Buttons - More spacing */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 animate-slide-up" style={{
          animationDelay: "0.2s"
        }}>
          <Link to="/dashboard">
            <Button size="lg" className="gap-2 px-8 py-6 text-base font-semibold bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/25 transition-all hover:shadow-xl hover:shadow-accent/30">
              <Play className="w-5 h-5" />
              Comece a Aprender
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button size="lg" variant="outline" className="gap-2 px-8 py-6 text-base font-medium border-white/25 text-white hover:bg-white/10 hover:text-white bg-transparent">
              Ver Tutoriais
            </Button>
          </Link>
        </div>

        {/* Stats - Cleaner layout */}
        <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto animate-fade-in bg-primary/40 backdrop-blur-sm rounded-2xl p-6" style={{
          animationDelay: "0.3s"
        }}>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-accent/20">
              <Play className="w-5 h-5 text-accent" />
            </div>
            <div className="text-3xl font-bold text-white drop-shadow-md">50+</div>
            <div className="text-sm font-medium text-primary-foreground">Vídeos</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-accent/20">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <div className="text-3xl font-bold text-white drop-shadow-md">10h+</div>
            <div className="text-sm font-medium text-primary-foreground">Conteúdo</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-accent/20">
              <Award className="w-5 h-5 text-accent" />
            </div>
            <div className="text-3xl font-bold text-white drop-shadow-md">4</div>
            <div className="text-sm font-medium text-primary-foreground">Módulos</div>
          </div>
        </div>
      </div>
    </div>

    {/* Bottom Wave */}
    <div className="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
        <path d="M0 100L60 92C120 84 240 68 360 60C480 52 600 52 720 56C840 60 960 68 1080 72C1200 76 1320 76 1380 76L1440 76V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0Z" fill="hsl(var(--background))" />
      </svg>
    </div>
  </section>;
};
export default HeroSection;