import React, { useState } from 'react';
import { X, ShieldCheck, Copy, Check, Download, HardDrive, Key, FileText } from 'lucide-react';
import { StorageFile } from '../types';

interface FileDetailsModalProps {
  file: StorageFile | null;
  onClose: () => void;
  onDownload: (file: StorageFile) => void;
  onShowToast: (title: string, desc?: string, type?: 'success' | 'info' | 'warning') => void;
}

export const FileDetailsModal: React.FC<FileDetailsModalProps> = ({
  file,
  onClose,
  onDownload,
  onShowToast,
}) => {
  const [copiedHash, setCopiedHash] = useState(false);

  if (!file) return null;

  const handleCopyChecksum = () => {
    navigator.clipboard?.writeText(file.checksum);
    setCopiedHash(true);
    onShowToast('Checksum SHA-256 copiado', 'Listo para verificación de integridad', 'success');
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="w-full max-w-lg rounded-2xl bg-[#0b1222] border border-slate-700/80 shadow-2xl overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between bg-[#0e172a]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                Inspección Criptográfica
              </h3>
              <p className="text-[11px] text-slate-400">Verificación de Integridad y Enclave</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* File Title */}
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Nombre de Archivo
            </span>
            <p className="text-sm font-bold text-white mt-0.5 break-all">{file.name}</p>
          </div>

          {/* Description */}
          {file.description && (
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 leading-relaxed">
              {file.description}
            </div>
          )}

          {/* Grid of properties */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                <HardDrive className="w-3 h-3 text-blue-400" />
                Ubicación
              </span>
              <p className="font-semibold text-white mt-1">{file.storageLocation}</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                <FileText className="w-3 h-3 text-emerald-400" />
                Tamaño del Archivo
              </span>
              <p className="font-semibold font-mono text-emerald-300 mt-1">
                {file.sizeFormatted} ({file.sizeBytes.toLocaleString()} bytes)
              </p>
            </div>

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 col-span-2">
              <span className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1">
                <Key className="w-3 h-3 text-purple-400" />
                Cifrado Militar Aplicado
              </span>
              <p className="font-semibold text-purple-300 mt-1">{file.encryptionCipher}</p>
            </div>
          </div>

          {/* Checksum SHA-256 */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Firma Criptográfica SHA-256
              </span>
              <button
                onClick={handleCopyChecksum}
                className="text-[11px] text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
              >
                {copiedHash ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copiar Hash</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300 break-all select-all">
              {file.checksum}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800/80 bg-[#0c1322] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cerrar
          </button>
          <button
            onClick={() => {
              onDownload(file);
              onClose();
            }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Descargar Archivo</span>
          </button>
        </div>
      </div>
    </div>
  );
};
