import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center gap-1 text-sm text-slate-500">
      <Link to="/dashboard" className="flex items-center hover:text-slate-900">
        <Home className="h-4 w-4" />
      </Link>
      <ChevronRight className="h-4 w-4 text-slate-400" />

      <Link to="/metas/grandes" className="hover:text-slate-900">
        Metas Grand
      </Link>

      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-1">
          <ChevronRight className="h-4 w-4 text-slate-400" />
          {item.href ? (
            <Link to={item.href} className="hover:text-slate-900">
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-slate-900">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
