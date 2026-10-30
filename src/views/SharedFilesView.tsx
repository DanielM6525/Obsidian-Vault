import React from 'react';
import { Share2, Lock, Link, Trash2, Shield, Plus, ExternalLink } from 'lucide-react';
import { SharedFileItem } from '../types';

interface SharedFilesViewProps {
  sharedFiles: SharedFileItem[];
  onRevokeShare: (id: string) => void;
  onOpenNewShare: () => void;
  onShowToast: (title: string, desc?: string, type?: 'success' | 'info' | 'warning') => void;
}

export const SharedFilesView: React.FC<SharedFilesViewProps> = ({
  sharedFiles,
  onRevokeShare,
  onOpenNewShare,
  onShowToast,
}) => {
  const handleCopyLink = (url: string) => {
    navigator.clipboard?.writeText(url);
    onShowToast('Enlace de descarga copiado al portapapeles', '', 'success');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-800/90 bg-gradient-to-r from-[#0b1626] to-[#080d19] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Share2 className="w-5 h-5 text-blue-400" />
            <h2 className="text-base font-bold text-white tracking-wide">Archivos Compartidos</h2>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            Enlaces cifrados punto a punto distribuidos a contrapartes auditadas. Puedes revocar el acceso en cualquier momento.
          </p>
        </div>

        <button
          onClick={onOpenNewShare}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Compartir Nuevo Archivo</span>
        </button>
      </div>

      {/* Shared Items Table */}
      <div className="rounded-2xl border border-slate-800/90 overflow-hidden bg-[#0a0f1d] shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-800/80 bg-[#0c1322] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <h3 className="text-sm font-bold text-white">Enlaces Activos y Permisos</h3>
          </div>
          <span className="text-xs text-slate-400">{sharedFiles.length} compartidos</span>
        </div>

        <div className="overflow-x-auto custom-scroll">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/40 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 pl-6 pr-4">Archivo</th>
                <th className="py-3.5 px-4">Destinatario</th>
                <th className="py-3.5 px-4">Permiso</th>
                <th className="py-3.5 px-4">Expiración</th>
                <th className="py-3.5 px-4">Descargas</th>
                <th className="py-3.5 pl-4 pr-6 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {sharedFiles.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 pl-6 pr-4">
                    <div className="font-semibold text-white truncate max-w-xs">{item.fileName}</div>
                    <span className="text-[10px] text-slate-400">{item.category}</span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-slate-200 font-medium">{item.recipient}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{item.recipientEmail}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium bg-blue-500/10 text-blue-300 border border-blue-500/20">
                      <Lock className="w-3 h-3" />
                      {item.permission}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-slate-300">{item.expiresIn}</td>
                  <td className="py-4 px-4 font-mono text-slate-300">
                    {item.downloadsCount} / {item.maxDownloads}
                  </td>
                  <td className="py-4 pl-4 pr-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleCopyLink(item.shareUrl)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                        title="Copiar enlace"
                      >
                        <Link className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          onRevokeShare(item.id);
                          onShowToast('Acceso revocado exitosamente', item.fileName, 'info');
                        }}
                        className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 transition-colors cursor-pointer"
                        title="Revocar enlace"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
