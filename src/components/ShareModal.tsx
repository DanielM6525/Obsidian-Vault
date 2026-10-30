import React, { useState } from 'react';
import { X, Share2, Copy, Check, Lock, Globe, Calendar } from 'lucide-react';
import { StorageFile } from '../types';

interface ShareModalProps {
  file: StorageFile | null;
  onClose: () => void;
  onShareCreated: (newShare: {
    fileName: string;
    category: string;
    recipient: string;
    recipientEmail: string;
    permission: 'Lectura' | 'Edición' | 'Cifrado Completo';
    expiresIn: string;
  }) => void;
  onShowToast: (title: string, desc?: string, type?: 'success' | 'info' | 'warning') => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  file,
  onClose,
  onShareCreated,
  onShowToast,
}) => {
  const [recipient, setRecipient] = useState('');
  const [permission, setPermission] = useState<'Lectura' | 'Edición' | 'Cifrado Completo'>('Lectura');
  const [expiry, setExpiry] = useState('En 48 horas');
  const [copiedLink, setCopiedLink] = useState(false);

  if (!file) return null;

  const mockShareUrl = `https://obsidian.datasovereign.cloud/share/${file.id}-${file.name.slice(0, 8).toLowerCase()}`;

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(mockShareUrl);
    setCopiedLink(true);
    onShowToast('Enlace seguro cifrado copiado al portapapeles', '', 'success');
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient.trim()) {
      onShowToast('Ingresa el correo o nombre del destinatario', '', 'warning');
      return;
    }

    onShareCreated({
      fileName: file.name,
      category: file.category,
      recipient: recipient.includes('@') ? recipient.split('@')[0] : recipient,
      recipientEmail: recipient.includes('@') ? recipient : `${recipient.toLowerCase().replace(/\s+/g, '')}@entorno-privado.local`,
      permission,
      expiresIn: expiry,
    });

    onShowToast(`Enlace generado para ${recipient}`, 'Permiso: ' + permission, 'success');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="w-full max-w-md rounded-2xl bg-[#0b1222] border border-slate-700/80 shadow-2xl overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800/80 flex items-center justify-between bg-[#0e172a]">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                Compartir Archivo Cifrado
              </h3>
              <p className="text-[11px] text-slate-400">Canal punto a punto con zero-knowledge</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Archivo Seleccionado
            </span>
            <p className="text-sm font-semibold text-white mt-1 truncate">{file.name}</p>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Destinatario (Correo o Equipo)
            </label>
            <input
              type="text"
              required
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              placeholder="ejemplo@empresa.com o Auditoría Legal"
              className="w-full px-3.5 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Lock className="w-3 h-3 text-blue-400" />
                Permiso
              </label>
              <select
                value={permission}
                onChange={(e) => setPermission(e.target.value as any)}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="Lectura">Solo Lectura</option>
                <option value="Edición">Lectura y Edición</option>
                <option value="Cifrado Completo">Cifrado Completo (Descarga restringida)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-amber-400" />
                Expiración
              </label>
              <select
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="En 24 horas">En 24 horas</option>
                <option value="En 48 horas">En 48 horas</option>
                <option value="En 7 días">En 7 días</option>
                <option value="Sin expiración">Sin expiración</option>
              </select>
            </div>
          </div>

          {/* Direct Link Preview */}
          <div className="pt-2">
            <span className="text-[11px] font-semibold text-slate-400 block mb-1">
              Enlace Seguro Generado
            </span>
            <div className="flex items-center gap-2 p-2 bg-slate-950 border border-slate-800 rounded-xl">
              <Globe className="w-4 h-4 text-slate-500 shrink-0" />
              <input
                type="text"
                readOnly
                value={mockShareUrl}
                className="w-full bg-transparent text-[11px] text-slate-300 font-mono focus:outline-none"
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="p-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-600 text-blue-400 hover:text-white transition-colors cursor-pointer"
                title="Copiar enlace"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-all cursor-pointer"
            >
              Confirmar y Compartir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
