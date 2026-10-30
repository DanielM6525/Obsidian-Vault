import React, { useState, useRef } from 'react';
import { UploadCloud, Plus, Lock, ShieldCheck } from 'lucide-react';

interface UploadZoneProps {
  onFilesSelected: (files: FileList | File[]) => void;
  isUploading: boolean;
  uploadProgress: number;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onFilesSelected,
  isUploading,
  uploadProgress,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFilesSelected(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFilesSelected(e.target.files);
      // Reset value so user can upload same file again if desired
      e.target.value = '';
    }
  };

  return (
    <section
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 p-8 sm:p-10 text-center group ${
        isDragOver
          ? 'border-blue-400 bg-blue-600/10 shadow-2xl shadow-blue-500/20 scale-[1.005]'
          : 'border-blue-500/35 bg-gradient-to-b from-[#0b1426]/60 to-[#080d19]/80 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10'
      }`}
    >
      {/* Background ambient radial glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-40 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-xl mx-auto">
        {/* Upload Animated Icon Container */}
        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 group-hover:bg-blue-500/20 group-hover:border-blue-400 transition-all duration-300 shadow-lg shadow-blue-500/20">
          <UploadCloud className="w-7 h-7" />
        </div>

        <h2 className="text-lg font-bold text-white tracking-tight mb-1.5">
          Cargar nuevos archivos
        </h2>
        <p className="text-sm text-slate-400 mb-6 max-w-md">
          Arrastra y suelta tus documentos aquí o haz clic para explorar en tu equipo local.
        </p>

        {/* Hidden input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />

        {/* Action Button */}
        {isUploading ? (
          <div className="w-full max-w-xs space-y-2 py-1">
            <div className="flex justify-between text-xs text-blue-300 font-semibold">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 animate-spin" />
                Cifrando con AES-256...
              </span>
              <span>{uploadProgress}%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 h-full rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white text-sm font-semibold shadow-lg shadow-blue-600/30 border border-blue-400/40 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Seleccionar Archivo</span>
          </button>
        )}

        {/* Bottom security text */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1 text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            Cifrado de extremo a extremo activo
          </span>
          <span className="hidden sm:inline text-slate-400">•</span>
          <span>Límite de subida: 25 GB por paquete</span>
        </div>
      </div>
    </section>
  );
};
