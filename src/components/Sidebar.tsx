import React from 'react';
import { 
  FolderLock, 
  HardDrive, 
  Share2, 
  ShieldCheck, 
  Settings, 
  RefreshCw,
  X
} from 'lucide-react';
import { ActiveNavTab } from '../types';
import { ObsidianLogo } from './ObsidianLogo';

interface SidebarProps {
  activeTab: ActiveNavTab;
  onSelectTab: (tab: ActiveNavTab) => void;
  filesCount: number;
  usedGB: number;
  totalGB: number;
  onSync: () => void;
  isSyncing: boolean;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  filesCount,
  usedGB,
  totalGB,
  onSync,
  isSyncing,
  isOpenMobile = false,
  onCloseMobile
}) => {
  const percentage = Math.min(100, (usedGB / totalGB) * 100).toFixed(1);

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      <aside 
        className={`fixed lg:static top-0 bottom-0 left-0 z-40 w-72 bg-[#080d17] border-r border-slate-800/80 flex flex-col justify-between shrink-0 transition-transform duration-300 lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Top Brand Header */}
          <div className="px-6 py-6 border-b border-slate-800/80 flex flex-col items-center bg-gradient-to-b from-[#0c1424] to-transparent relative">
            {/* Mobile close button */}
            {onCloseMobile && (
              <button
                onClick={onCloseMobile}
                className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
                aria-label="Cerrar barra lateral"
              >
                <X className="w-5 h-5" />
              </button>
            )}

            <div className="flex flex-col items-center cursor-pointer group" onClick={() => onSelectTab('storage')}>
              <ObsidianLogo size="lg" />
              <div className="mt-3 text-center">
                <h1 className="text-base font-bold tracking-tight text-white flex items-center justify-center gap-1.5">
                  <span>Obsidian Vault</span>
                  <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-400 border border-blue-500/30">
                    Pro
                  </span>
                </h1>
                <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase mt-0.5">
                  DataSovereign Cloud
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 px-3 py-6 overflow-y-auto custom-scroll space-y-1">
            <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Espacio de Trabajo
            </div>

            {/* Mi Almacenamiento */}
            <button
              onClick={() => {
                onSelectTab('storage');
                onCloseMobile?.();
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all group ${
                activeTab === 'storage'
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold shadow-sm shadow-blue-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <HardDrive className={`w-5 h-5 transition-transform group-hover:scale-105 ${
                activeTab === 'storage' ? 'text-blue-400' : 'text-slate-400'
              }`} />
              <span className="flex-1 text-left">Mi Almacenamiento</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold">
                {filesCount}
              </span>
            </button>

            {/* Archivos Compartidos */}
            <button
              onClick={() => {
                onSelectTab('shared');
                onCloseMobile?.();
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all group ${
                activeTab === 'shared'
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold shadow-sm shadow-blue-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <Share2 className={`w-5 h-5 transition-colors ${
                activeTab === 'shared' ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'
              }`} />
              <span className="flex-1 text-left">Archivos Compartidos</span>
            </button>

            {/* Bóvedas Cifradas */}
            <button
              onClick={() => {
                onSelectTab('vaults');
                onCloseMobile?.();
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all group ${
                activeTab === 'vaults'
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold shadow-sm shadow-blue-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <FolderLock className={`w-5 h-5 transition-colors ${
                activeTab === 'vaults' ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'
              }`} />
              <span className="flex-1 text-left">Bóvedas Cifradas</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-medium">
                AES-256
              </span>
            </button>

            {/* Control de Accesos */}
            <button
              onClick={() => {
                onSelectTab('access');
                onCloseMobile?.();
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all group ${
                activeTab === 'access'
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold shadow-sm shadow-blue-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <ShieldCheck className={`w-5 h-5 transition-colors ${
                activeTab === 'access' ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'
              }`} />
              <span className="flex-1 text-left">Control de Accesos</span>
            </button>

            <div className="pt-5 px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              Sistema
            </div>

            {/* Configuración */}
            <button
              onClick={() => {
                onSelectTab('settings');
                onCloseMobile?.();
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all group ${
                activeTab === 'settings'
                  ? 'bg-blue-600/15 text-blue-400 border border-blue-500/30 font-semibold shadow-sm shadow-blue-500/10'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <Settings className={`w-5 h-5 transition-colors ${
                activeTab === 'settings' ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'
              }`} />
              <span className="flex-1 text-left">Configuración</span>
            </button>
          </div>
        </div>

        {/* Storage Telemetry Widget (Bottom Sidebar) */}
        <div className="p-4 border-t border-slate-800/80 bg-[#060a12]">
          <div className="rounded-xl p-3.5 border border-slate-700/50 bg-[#0c1424]/90 relative overflow-hidden shadow-inner">
            {/* Ambient corner light */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-blue-500/10 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-500 animate-pulse" />
                <span className="text-[11px] font-semibold text-emerald-400 tracking-wide">
                  Nodo Privado Conectado
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 font-bold">{percentage}%</span>
            </div>

            <div className="mb-2">
              <div className="flex justify-between text-xs text-slate-300 font-medium mb-1.5">
                <span>Almacenamiento Usado</span>
              </div>
              {/* Progress bar */}
              <div className="w-full bg-slate-800/90 rounded-full h-2 overflow-hidden border border-slate-700/60 p-[1px]">
                <div 
                  className="bg-gradient-to-r from-blue-600 via-blue-400 to-cyan-400 h-full rounded-full transition-all duration-700 shadow-sm shadow-blue-500" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
              <span className="font-medium text-slate-300">
                {usedGB.toFixed(1)} GB de {(totalGB >= 1000 ? `${(totalGB/1000).toFixed(0)} TB` : `${totalGB} GB`)} Usado
              </span>
              <button
                onClick={onSync}
                disabled={isSyncing}
                className="text-[10px] text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin text-cyan-400' : ''}`} />
                <span>{isSyncing ? 'Sincronizando' : 'Sincronizado'}</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
