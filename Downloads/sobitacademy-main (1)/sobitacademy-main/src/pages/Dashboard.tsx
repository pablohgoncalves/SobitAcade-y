import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CategorySection from "@/components/dashboard/CategorySection";
import { useCourses } from "@/hooks/useCourses";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { MotionContainer } from "@/components/ui/MotionContainer";


const Dashboard = () => {
  const navigate = useNavigate();
  const { isLoading: coursesLoading, categories } = useCourses();
  const { signOut } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .trim();
  };

  const smoothScrollTo = (elementId: string) => {
    const element = document.getElementById(elementId);
    if (!element) return;

    const headerOffset = 80;
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;
    const startPosition = window.scrollY;
    const distance = offsetPosition - startPosition;
    const duration = 1200; // 1.2 seconds
    let start: number | null = null;

    const animation = (currentTime: number) => {
      if (start === null) start = currentTime;
      const timeElapsed = currentTime - start;
      const progress = Math.min(timeElapsed / duration, 1);

      // Easing function (easeInOutCubic)
      const ease = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      lessons: cat.lessons.filter(
        (lesson) =>
          lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lesson.description.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.lessons.length > 0);

  useEffect(() => {
    console.log("Effect triggered:", { coursesLoading, categoryParam, categoriesCount: filteredCategories.length });

    if (!coursesLoading && categoryParam && filteredCategories.length > 0) {
      console.log("Attempting scroll to:", categoryParam);

      // Log available IDs
      filteredCategories.forEach(cat => {
        console.log(`Available Category: "${cat.title}" -> ID: "${slugify(cat.title)}"`);
      });

      // Small delay to ensure DOM is ready
      setTimeout(() => {
        const target = document.getElementById(categoryParam);
        console.log("Target found?", !!target);
        smoothScrollTo(categoryParam);
      }, 500); // Increased delay for debugging
    }
  }, [categoryParam, coursesLoading, filteredCategories.length]); // Added length to dependency

  if (coursesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }



  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isLoggedIn={true} onLogout={handleLogout} />

      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <MotionContainer className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Olá, bem-vindo à SOBIT Academy!
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore os módulos abaixo e comece a aprender.
            </p>
          </MotionContainer>

          {/* Search */}
          <MotionContainer delay={0.1} className="relative max-w-md mb-10">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar tutoriais..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </MotionContainer>

          {/* Categories */}
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <CategorySection
                key={category.id}
                id={slugify(category.title)}
                title={category.title}
                description={category.description}
                lessons={category.lessons}
              />
            ))
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">
                Nenhum tutorial encontrado para "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
