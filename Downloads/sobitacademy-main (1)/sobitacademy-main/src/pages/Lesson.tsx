import { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useCourses } from "@/hooks/useCourses";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, Layers } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Lesson = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading, signOut } = useAuth();
  const {
    isLoading: coursesLoading,
    getLessonById,
    getCategoryById,
    getNextLesson,
    getPreviousLesson
  } = useCourses();

  // Removed auth barrier as requested
  // useEffect(() => {
  //   if (!authLoading && !isAuthenticated) {
  //     navigate("/login");
  //   }
  // }, [isAuthenticated, authLoading, navigate]);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const lesson = id ? getLessonById(id) : undefined;
  const nextLesson = id ? getNextLesson(id) : undefined;
  const previousLesson = id ? getPreviousLesson(id) : undefined;
  const category = lesson ? getCategoryById(lesson.category) : undefined;

  if (authLoading || coursesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  // if (!isAuthenticated) return null; // Removed auth barrier

  if (!lesson) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header isLoggedIn onLogout={handleLogout} />
        <main className="flex-1 pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Aula não encontrada</h1>
            <Link to="/dashboard">
              <Button>Voltar ao Dashboard</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isLoggedIn onLogout={handleLogout} />

      <main className="flex-1 pt-20">
        {/* Video Section */}
        <div className="bg-foreground">
          <div className="container mx-auto px-4">
            <div className="aspect-video max-w-5xl mx-auto bg-muted rounded-b-xl overflow-hidden shadow-2xl">
              <iframe
                src={lesson.videoUrl || "https://www.youtube.com/embed/dQw4w9WgXcQ"}
                title={lesson.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="container mx-auto px-4 py-10">
          <div className="max-w-5xl mx-auto">
            {/* Back Button */}
            <Link to="/dashboard">
              <Button variant="outline" className="gap-2 mb-6">
                <ArrowLeft className="w-4 h-4" />
                Voltar
              </Button>
            </Link>

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <Link to="/dashboard" className="hover:text-primary transition-colors">
                Dashboard
              </Link>
              <span>/</span>
              {category && (
                <>
                  <span>{category.title}</span>
                  <span>/</span>
                </>
              )}
              <span className="text-foreground">{lesson.title}</span>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {lesson.title}
                </h1>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Layers className="w-4 h-4" />
                    <span>{category?.title}</span>
                  </div>
                </div>

                <p className="text-lg text-muted-foreground mb-8">
                  {lesson.description}
                </p>

                {/* Learning Points */}
                {lesson.learningPoints && lesson.learningPoints.length > 0 && (
                  <div className="bg-card rounded-xl border border-border p-6 mb-8">
                    <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-accent" />
                      O que você vai aprender
                    </h3>
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {lesson.learningPoints.map((point, index) => (
                        <li key={index} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  {previousLesson ? (
                    <Link to={`/lesson/${previousLesson.id}`}>
                      <Button variant="outline" className="gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Anterior
                      </Button>
                    </Link>
                  ) : (
                    <div />
                  )}

                  {nextLesson ? (
                    <Link to={`/lesson/${nextLesson.id}`}>
                      <Button className="gap-2">
                        Próxima aula
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/dashboard">
                      <Button className="gap-2">
                        Voltar ao Dashboard
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-4">
                      Neste módulo
                    </h3>
                    {category && (
                      <ul className="space-y-2">
                        {category.lessons.map((l) => (
                          <li key={l.id}>
                            <Link
                              to={`/lesson/${l.id}`}
                              className={`block px-3 py-2 rounded-lg text-sm transition-colors ${l.id === lesson.id
                                ? "bg-primary text-primary-foreground font-medium"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                                }`}
                            >
                              {l.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Lesson;
