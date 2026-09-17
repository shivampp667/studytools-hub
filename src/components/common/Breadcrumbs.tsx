import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center flex-wrap text-sm text-[#64748B] dark:text-[#94A3B8] gap-1.5">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </li>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </li>
            <li>
              {item.path ? (
                <Link
                  to={item.path}
                  className="hover:text-[#2563EB] dark:hover:text-[#60A5FA] transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-[#111827] dark:text-[#F8FAFC]" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ol>
    </nav>
  );
};
