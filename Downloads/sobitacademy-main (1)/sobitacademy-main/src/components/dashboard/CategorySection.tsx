import ModuleCard from "./ModuleCard";
import { MotionItem } from "@/components/ui/MotionContainer";

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  lessonCount: number;
}

interface CategorySectionProps {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

const CategorySection = ({ id, title, description, lessons }: CategorySectionProps) => {
  return (
    <MotionItem id={id} className="mb-12 scroll-mt-24">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {lessons.map((lesson) => (
          <ModuleCard key={lesson.id} {...lesson} />
        ))}
      </div>
    </MotionItem>
  );
};

export default CategorySection;
