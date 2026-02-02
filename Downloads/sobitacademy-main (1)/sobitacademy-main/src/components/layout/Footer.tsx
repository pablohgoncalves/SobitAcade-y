import { Link } from "react-router-dom";
import logoSobit from "@/assets/logo-sobit.webp";
const Footer = () => {
  return <footer className="py-12 bg-card border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img alt="SOBIT Logo" className="w-6 h-6 object-cover" src="/lovable-uploads/81f85adc-7dc6-478c-b603-a8331e3b7d69.webp" />
            <div className="flex flex-col">
              <span className="text-sm font-bold text-foreground leading-none">SOBIT</span>
              <span className="text-xs text-accent font-medium">Academy</span>
            </div>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="https://sobit.com.br" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              Site SOBIT
            </a>
            <a href="https://api.whatsapp.com/send?l=pt&phone=5511975575122" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              Suporte
            </a>
            <a href="https://sobit.com.br/contato" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
              Contato
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SOBIT. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>;
};
export default Footer;