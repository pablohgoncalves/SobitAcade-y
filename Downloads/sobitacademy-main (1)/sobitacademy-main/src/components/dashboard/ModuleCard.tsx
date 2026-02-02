import { Link } from "react-router-dom";
import { Play, Clock } from "lucide-react";

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  lessonCount: number;
}

const ModuleCard = ({ id, title, description, duration, thumbnail, lessonCount }: ModuleCardProps) => {
  return (
    <Link to={`/lesson/${id}`} className="block group">
      <div className="bg-card rounded-lg border border-border overflow-hidden card-elevated cursor-pointer">
        {/* Thumbnail */}
        <div className="relative aspect-video bg-muted overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
              <Play className="w-5 h-5 text-primary-foreground fill-current" />
            </div>
          </div>
          {/* Duration Badge */}
          <div className="absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 bg-foreground/80 backdrop-blur-sm rounded text-xs text-primary-foreground">
            <Clock className="w-3 h-3" />
            {duration}
          </div>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3 className="text-sm font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              {lessonCount} {lessonCount === 1 ? "aula" : "aulas"}
            </span>
            <span className="inline-flex items-center gap-1 h-7 text-xs px-2 bg-primary text-primary-foreground rounded-md font-medium">
              <Play className="w-3 h-3" />
              Assistir
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ModuleCard;
