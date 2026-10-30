import React, { useState } from 'react';
import { 
  Database, 
  FileText, 
  Archive, 
  Video, 
  FileCode, 
  ArrowUpDown, 
  Download, 
  MoreVertical, 
  ShieldCheck, 
  Trash2, 
  Share2, 
  Info,
  FolderOpen
} from 'lucide-react';
import { StorageFile, FileType } from '../types';

interface FilesTableProps {
  files: StorageFile[];
  onDownload: (file: StorageFile) => void;
  onDelete: (id: string) => void;
  onViewDetails: (file: StorageFile) => void;
  onShare: (file: StorageFile) => void;
  onResetFilters?: () => void;
}

export const FilesTable: React.FC<FilesTableProps> = ({
  files,
  onDownload,
  onDelete,
  onViewDetails,
  onShare,
  onResetFilters,
}) => {
  const [sortField, setSortField] = useState<'name' | 'size'>('name');
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const [openActionId, setOpenActionId] = useState<string | null>(null);

  // Sorting
  const sortedFiles = [...files].sort((a, b) => {
    if (sortField === 'name') {
      return sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else {
      return sortAsc ? a.sizeBytes - b.sizeBytes : b.sizeBytes - a.sizeBytes;
    }
  });

  const toggleSort = () => {
    if (sortField === 'name') {
      if (sortAsc) {
        setSortAsc(false);
      } else {
        setSortField('size');
        setSortAsc(false); // largest first
      }
    } else {
      setSortField('name');
      setSortAsc(true);
    }
  };

  const getFileVisuals = (type: FileType) => {
    switch (type) {
      case 'database':
        return {
          icon: <Database className="w-4 h-4 text-emerald-400" />,
          bg: 'bg-emerald-500/10 border-emerald-500/25 text-emerald-400',
        };
      case 'document':
        return {
          icon: <FileText className="w-4 h-4 text-rose-400" />,
          bg: 'bg-rose-500/10 border-rose-500/25 text-rose-400',
        };
      case 'archive':
        return {
          icon: <Archive className="w-4 h-4 text-amber-400" />,
          bg: 'bg-amber-500/10 border-amber-500/25 text-amber-400',
        };
      case 'media':
        return {
          icon: <Video className="w-4 h-4 text-purple-400" />,
          bg: 'bg-purple-500/10 border-purple-500/25 text-purple-400',
        };
      default:
        return {
          icon: <FileCode className="w-4 h-4 text-blue-400" />,
          bg: 'bg-blue-500/10 border-blue-500/25 text-blue-400',
        };
    }
  };

  return (
    <section className="rounded-2xl border border-slate-800/90 overflow-hidden bg-[#0a0f1d] shadow-2xl shadow-black/50">
      {/* Table Top Header Info Bar */}
      <div className="px-5 sm:px-6 py-4 border-b border-slate-800/80 flex items-center justify-between bg-[#0c1322]">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-sm shadow-blue-500" />
          <h3 className="text-sm font-bold text-white tracking-wide">
            Archivos Guardados en el Servidor
          </h3>
        </div>

        {/* Sort Button */}
        <button
          onClick={toggleSort}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/60 transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95"
          title="Alternar ordenamiento"
        >
          <span>
            {sortField === 'name'
              ? `Ordenar por nombre (${sortAsc ? 'A-Z' : 'Z-A'})`
              : `Ordenar por tamaño (${sortAsc ? 'Menor' : 'Mayor'})`}
          </span>
          <ArrowUpDown className="w-3.5 h-3.5 text-blue-400" />
        </button>
      </div>

      {/* Files List / Table */}
      {sortedFiles.length > 0 ? (
        <div className="overflow-x-auto custom-scroll">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/40 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th scope="col" className="py-3.5 pl-6 pr-4">
                  Nombre del Archivo
                </th>
                <th scope="col" className="py-3.5 px-4 hidden sm:table-cell">
                  Almacenamiento
                </th>
                <th scope="col" className="py-3.5 px-4">
                  Tamaño
                </th>
                <th scope="col" className="py-3.5 px-4 hidden md:table-cell">
                  Última Modificación
                </th>
                <th scope="col" className="py-3.5 pl-4 pr-6 text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-sm">
              {sortedFiles.map((file) => {
                const visuals = getFileVisuals(file.type);
                const isMenuOpen = openActionId === file.id;

                return (
                  <tr
                    key={file.id}
                    className="hover:bg-slate-800/40 transition-colors group relative"
                  >
                    {/* File Name + Category */}
                    <td className="py-4 pl-6 pr-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${visuals.bg}`}
                        >
                          {visuals.icon}
                        </div>
                        <div className="min-w-0">
                          <div 
                            onClick={() => onViewDetails(file)}
                            className="font-semibold text-white truncate group-hover:text-blue-400 transition-colors cursor-pointer max-w-[200px] sm:max-w-xs md:max-w-md"
                            title={file.name}
                          >
                            {file.name}
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] text-slate-400">{file.category}</span>
                            <span className="text-slate-600 text-[10px] sm:hidden">•</span>
                            <span className="text-[11px] text-slate-400 sm:hidden">
                              {file.storageLocation}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Storage Location Badge */}
                    <td className="py-4 px-4 text-slate-300 hidden sm:table-cell">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/80 border border-slate-700/60 text-slate-300">
                        {file.storageLocation}
                      </span>
                    </td>

                    {/* Size */}
                    <td className="py-4 px-4 font-mono text-xs text-slate-300 font-medium whitespace-nowrap">
                      {file.sizeFormatted}
                    </td>

                    {/* Updated */}
                    <td className="py-4 px-4 text-xs text-slate-400 whitespace-nowrap hidden md:table-cell">
                      {file.updated}
                    </td>

                    {/* Actions */}
                    <td className="py-4 pl-4 pr-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2 relative">
                        {/* Descargar button */}
                        <button
                          onClick={() => onDownload(file)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white text-xs font-semibold border border-blue-500/30 hover:border-blue-500 active:scale-95 transition-all shadow-sm cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Descargar</span>
                        </button>

                        {/* Dropdown menu toggle */}
                        <div className="relative">
                          <button
                            onClick={() => setOpenActionId(isMenuOpen ? null : file.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition-colors cursor-pointer"
                            aria-label="Más acciones"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {isMenuOpen && (
                            <>
                              <div
                                className="fixed inset-0 z-20"
                                onClick={() => setOpenActionId(null)}
                              />
                              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#0c1424] border border-slate-700/80 shadow-2xl py-1.5 z-30 text-left text-xs animate-in fade-in slide-in-from-top-1">
                                <button
                                  onClick={() => {
                                    setOpenActionId(null);
                                    onViewDetails(file);
                                  }}
                                  className="w-full px-3.5 py-2 text-slate-300 hover:text-white hover:bg-slate-800/80 flex items-center gap-2.5 transition-colors"
                                >
                                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                                  <span>Detalles Criptográficos</span>
                                </button>
                                <button
                                  onClick={() => {
                                    setOpenActionId(null);
                                    onShare(file);
                                  }}
                                  className="w-full px-3.5 py-2 text-slate-300 hover:text-white hover:bg-slate-800/80 flex items-center gap-2.5 transition-colors"
                                >
                                  <Share2 className="w-4 h-4 text-emerald-400" />
                                  <span>Compartir Enlace</span>
                                </button>
                                <div className="my-1 border-t border-slate-800" />
                                <button
                                  onClick={() => {
                                    setOpenActionId(null);
                                    onDelete(file.id);
                                  }}
                                  className="w-full px-3.5 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 flex items-center gap-2.5 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                  <span>Eliminar de la Bóveda</span>
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 px-6 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-800/70 border border-slate-700/60 flex items-center justify-center mx-auto mb-3 text-slate-400">
            <FolderOpen className="w-7 h-7" />
          </div>
          <h4 className="text-base font-semibold text-white">No se encontraron archivos</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            No hay documentos que coincidan con la búsqueda o filtro activo en este momento.
          </p>
          {onResetFilters && (
            <button
              onClick={onResetFilters}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30 transition-all cursor-pointer"
            >
              <span>Restablecer Filtros</span>
            </button>
          )}
        </div>
      )}
    </section>
  );
};
