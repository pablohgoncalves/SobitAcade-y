import { FileText, Zap, BarChart3, Settings, Users, Shield } from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Notas Fiscais",
    description: "Aprenda a emitir, cancelar e gerenciar notas fiscais de forma simples e rápida.",
  },
  {
    icon: Zap,
    title: "Automação",
    description: "Configure rotinas automáticas para tarefas repetitivas e ganhe produtividade.",
  },
  {
    icon: BarChart3,
    title: "Relatórios",
    description: "Domine a geração de relatórios financeiros e contábeis detalhados.",
  },
  {
    icon: Settings,
    title: "Configurações",
    description: "Personalize o sistema de acordo com as necessidades do seu negócio.",
  },
  {
    icon: Users,
    title: "Gestão de Usuários",
    description: "Gerencie permissões e acessos de forma segura e organizada.",
  },
  {
    icon: Shield,
    title: "Segurança",
    description: "Boas práticas de segurança e backup para proteger seus dados.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            O que você vai aprender
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Conteúdo completo e atualizado para você dominar todas as funcionalidades do sistema SOBIT.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 bg-card rounded-xl border border-border card-elevated animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
