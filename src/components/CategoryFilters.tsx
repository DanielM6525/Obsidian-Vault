import React from 'react';
import { StorageCategory, StorageFile } from '../types';

interface CategoryFiltersProps {
  activeCategory: StorageCategory;
  onSelectCategory: (category: StorageCategory) => void;
  files: StorageFile[];
  filteredCount: number;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  activeCategory,
  onSelectCategory,
  files,
  filteredCount,
}) => {
  const counts = {
    Todos: files.length,
    Documentos: files.filter((f) => f.category === 'Documentos').length,
    'Bases de Datos': files.filter((f) => f.category === 'Bases de Datos').length,
    Multimedia: files.filter((f) => f.category === 'Multimedia').length,
    Respaldos: files.filter((f) => f.category === 'Respaldos').length,
  };

  const categories: { key: StorageCategory; label: string }[] = [
    { key: 'Todos', label: 'Todos los archivos' },
    { key: 'Documentos', label: 'Documentos' },
    { key: 'Bases de Datos', label: 'Bases de Datos' },
    { key: 'Multimedia', label: 'Multimedia' },
    { key: 'Respaldos', label: 'Respaldos' },
  ];

  return (
    <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map(({ key, label }) => {
          const isActive = activeCategory === key;
          const count = counts[key];

          return (
            <button
              key={key}
              onClick={() => onSelectCategory(key)}
              className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-blue-600 text-white border border-blue-400/40 shadow-sm shadow-blue-500/25 scale-[1.02]'
                  : 'bg-slate-900/90 text-slate-400 hover:text-slate-200 border border-slate-800 hover:border-slate-700'
              }`}
            >
              <span>{label}</span>
              <span className={`ml-1.5 ${isActive ? 'text-blue-100 opacity-90' : 'text-slate-400'}`}>
                ({count})
              </span>
            </button>
          );
        })}
      </div>

      {/* Showing count indicator */}
      <div className="text-xs text-slate-400 font-medium self-end sm:self-center">
        Mostrando <span className="text-slate-200 font-bold">{filteredCount}</span> de{' '}
        <span className="text-slate-200 font-bold">{files.length}</span> elementos
      </div>
    </section>
  );
};
