import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAdmin } from "@/hooks/useAdmin";
import { useAuth } from "@/hooks/useAuth";
import { useCourses, useAdminCourses, type Lesson } from "@/hooks/useCourses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Pencil, Trash2, ShieldAlert, Save, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Admin = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading } = useAdmin();
  const { isAuthenticated, isLoading: authLoading, signOut } = useAuth();
  const { categories, isLoading: coursesLoading, refetch } = useCourses();
  const { saveLesson, deleteLesson, generateThumbnail } = useAdminCourses();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    duration: "",
    videoUrl: "",
    learningPoints: ["", "", "", ""],
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, authLoading, navigate]);

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      duration: "",
      videoUrl: "",
      learningPoints: ["", "", "", ""],
    });
    setEditingLesson(null);
  };

  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  };

  const openEditDialog = (lesson: Lesson, categoryId: string) => {
    setEditingLesson(lesson);
    setSelectedCategory(categoryId);
    setFormData({
      title: lesson.title,
      description: lesson.description,
      duration: lesson.duration,
      videoUrl: lesson.videoUrl || "",
      learningPoints: lesson.learningPoints || ["", "", "", ""],
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await saveLesson(
        {
          id: editingLesson?.id,
          title: formData.title,
          description: formData.description,
          duration: formData.duration,
          videoUrl: formData.videoUrl,
          learningPoints: formData.learningPoints,
        },
        selectedCategory,
        !!editingLesson
      );

      toast({
        title: editingLesson ? "Aula atualizada!" : "Aula adicionada!",
        description: "As alterações foram salvas automaticamente.",
      });

      setIsDialogOpen(false);
      resetForm();
      refetch();
    } catch (error) {
      console.error("Error saving lesson:", error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar a aula. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (lessonId: string) => {
    try {
      await deleteLesson(lessonId);
      toast({
        title: "Aula removida!",
        description: "A aula foi excluída com sucesso.",
      });
      refetch();
    } catch (error) {
      console.error("Error deleting lesson:", error);
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir a aula. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  if (isLoading || coursesLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header isLoggedIn onLogout={handleLogout} />
        <main className="flex-1 flex items-center justify-center pt-24">
          <div className="text-center">
            <ShieldAlert className="w-16 h-16 mx-auto text-destructive mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-2">Acesso Negado</h1>
            <p className="text-muted-foreground mb-6">
              Você não tem permissão para acessar esta página.
            </p>
            <Button onClick={() => navigate("/dashboard")}>
              Voltar ao Dashboard
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header isLoggedIn onLogout={handleLogout} />
      
      <main className="flex-1 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Painel Admin</h1>
              <p className="text-muted-foreground">Gerencie os vídeos da plataforma</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={openAddDialog}>
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Aula
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingLesson ? "Editar Aula" : "Adicionar Nova Aula"}
                  </DialogTitle>
                  <DialogDescription>
                    Preencha os dados da aula. A thumbnail será gerada automaticamente.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="title">Título</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={e => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      placeholder="Ex: Emissão de NF-e"
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Breve descrição da aula..."
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="duration">Duração</Label>
                      <Input
                        id="duration"
                        value={formData.duration}
                        onChange={e => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                        placeholder="Ex: 5:30"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="videoUrl">URL do YouTube (embed)</Label>
                      <Input
                        id="videoUrl"
                        value={formData.videoUrl}
                        onChange={e => setFormData(prev => ({ ...prev, videoUrl: e.target.value }))}
                        placeholder="https://youtube.com/embed/..."
                      />
                    </div>
                  </div>

                  {formData.videoUrl && (
                    <div className="grid gap-2">
                      <Label>Prévia da Thumbnail</Label>
                      <img 
                        src={generateThumbnail(formData.videoUrl)} 
                        alt="Thumbnail preview"
                        className="w-40 h-auto rounded-lg border"
                      />
                    </div>
                  )}

                  <div className="grid gap-2">
                    <Label>Pontos de Aprendizado (até 4)</Label>
                    {formData.learningPoints.map((point, index) => (
                      <Input
                        key={index}
                        value={point}
                        onChange={e => {
                          const newPoints = [...formData.learningPoints];
                          newPoints[index] = e.target.value;
                          setFormData(prev => ({ ...prev, learningPoints: newPoints }));
                        }}
                        placeholder={`Ponto ${index + 1}`}
                      />
                    ))}
                  </div>
                </div>

                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave} disabled={isSaving}>
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        {editingLesson ? "Salvar Alterações" : "Adicionar Aula"}
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Lessons Table */}
          {categories.map(category => (
            <div key={category.id} className="mb-8">
              <h2 className="text-xl font-semibold text-foreground mb-4">{category.title}</h2>
              <div className="bg-card rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-16">Thumb</TableHead>
                      <TableHead>Título</TableHead>
                      <TableHead>Duração</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {category.lessons.map(lesson => (
                      <TableRow key={lesson.id}>
                        <TableCell>
                          <img 
                            src={lesson.thumbnail} 
                            alt={lesson.title}
                            className="w-16 h-9 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{lesson.title}</TableCell>
                        <TableCell>{lesson.duration}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openEditDialog(lesson, category.id)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(lesson.id)}
                          >
                            <Trash2 className="w-4 h-4 text-destructive" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {category.lessons.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                          Nenhuma aula cadastrada nesta categoria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}

          {/* Success message */}
          <div className="mt-8 p-6 bg-accent/10 rounded-lg border border-accent/20">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Save className="w-5 h-5 text-accent" />
              Salvamento Automático
            </h3>
            <p className="text-muted-foreground">
              As alterações são salvas automaticamente no banco de dados. Não é necessário copiar código ou fazer deploy manual.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;
