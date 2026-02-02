import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 bg-muted relative overflow-hidden">
      {/* Animated Background Paths */}
      <BackgroundPaths />
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5 tracking-tight">
            Pronto para começar?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 font-light">
            Acesse agora e transforme a forma como você usa o sistema SOBIT.
          </p>
          <Link to="/dashboard">
            <Button size="lg" className="gap-2 px-8 py-6 text-base font-semibold bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/25 transition-all hover:shadow-xl hover:shadow-accent/30">
              Acessar Academy
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
