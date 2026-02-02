import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, Settings } from "lucide-react";
import { useState } from "react";
import { useAdmin } from "@/hooks/useAdmin";

interface HeaderProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
}

const Header = ({
  isLoggedIn = false,
  onLogout
}: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdmin } = useAdmin();

  const navLinks = [{
    name: "Módulo Contábil",
    href: "/dashboard?category=modulo-contabil"
  }, {
    name: "Módulo Fiscal",
    href: "/dashboard?category=modulo-fiscal"
  }, {
    name: "Módulo DP",
    href: "/dashboard?category=modulo-dp"
  }, {
    name: "Variados",
    href: "/dashboard?category=variados"
  }, {
    name: "Novidades da Versão",
    href: "/dashboard?category=novidades-da-versao"
  }];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="flex items-center gap-2 group">
            <img alt="SOBIT Logo" className="w-8 h-8 group-hover:scale-105 transition-transform object-cover" src="/lovable-uploads/8b335e3e-416e-472b-b076-ec4c11afcfc5.webp" />
            <div className="flex flex-col">
              <span className="text-lg font-bold text-foreground leading-none">SOBIT</span>
              <span className="text-xs text-accent font-medium">Academy</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {isLoggedIn && navLinks.map(link => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              <>
                {isAdmin && (
                  <Link to="/admin">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Settings className="w-4 h-4" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" onClick={onLogout} className="gap-2">
                  <LogOut className="w-4 h-4" />
                  Sair
                </Button>
              </>
            ) : (
              <Link to="/dashboard">
                <Button size="sm" className="gap-2 bg-gradient-to-r from-accent to-emerald-400 hover:from-accent/90 hover:to-emerald-400/90 text-white border-0">
                  Entrar
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <nav className="flex flex-col gap-2">
              {isLoggedIn && navLinks.map(link => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary hover:bg-muted rounded-md transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 px-4 flex flex-col gap-2">
                {isLoggedIn ? (
                  <>
                    {isAdmin && (
                      <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" size="sm" className="w-full gap-2">
                          <Settings className="w-4 h-4" />
                          Admin
                        </Button>
                      </Link>
                    )}
                    <Button variant="ghost" size="sm" onClick={onLogout} className="w-full gap-2">
                      <LogOut className="w-4 h-4" />
                      Sair
                    </Button>
                  </>
                ) : (
                  <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                    <Button size="sm" className="w-full bg-gradient-to-r from-accent to-emerald-400 hover:from-accent/90 hover:to-emerald-400/90 text-white border-0">
                      Entrar
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;