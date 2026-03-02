import { Book, Film, Music, Gamepad2, Newspaper, BookOpen } from "lucide-react";

export default function TypeIcon({ type, className = "size-4" }) {
  const icons = {
    Books: Book,
    Movies: Film,
    Music: Music,
    Games: Gamepad2,
    Magazines: Newspaper,
  };
  const Icon = icons[type] || BookOpen;
  return <Icon className={className} />;
}
