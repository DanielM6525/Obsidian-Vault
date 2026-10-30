import React from 'react';
import { HardDrive, FolderLock, CloudUpload, Share2, Menu } from 'lucide-react';
import { ActiveNavTab } from '../types';

interface MobileBottomDockProps {
  activeTab: ActiveNavTab;
  onSelectTab: (tab: ActiveNavTab) => void;
  onOpenUpload: () => void;
  onOpenMobileMenu: () => void;
}

export const MobileBottomDock: React.FC<MobileBottomDockProps> = ({
  activeTab,
  onSelectTab,
  onOpenUpload,
  onOpenMobileMenu,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-[#080d18]/95 backdrop-blur-xl border-t border-slate-800/80 px-4 py-2 z-30 flex items-center justify-around shadow-2xl">
      {/* Files */}
      <button
        onClick={() => onSelectTab('storage')}
        className={`flex flex-col items-center gap-1 transition-colors ${
          activeTab === 'storage' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <HardDrive className="w-5 h-5" />
        <span className="text-[10px] font-medium">Archivos</span>
      </button>

      {/* Vaults */}
      <button
        onClick={() => onSelectTab('vaults')}
        className={`flex flex-col items-center gap-1 transition-colors ${
          activeTab === 'vaults' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <FolderLock className="w-5 h-5" />
        <span className="text-[10px] font-medium">Bóvedas</span>
      </button>

      {/* Floating Center Upload Button */}
      <button
        onClick={onOpenUpload}
        className="w-12 h-12 -mt-6 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/40 border-2 border-[#080d18] active:scale-95 transition-all cursor-pointer"
        aria-label="Cargar archivo"
      >
        <CloudUpload className="w-6 h-6" />
      </button>

      {/* Shared */}
      <button
        onClick={() => onSelectTab('shared')}
        className={`flex flex-col items-center gap-1 transition-colors ${
          activeTab === 'shared' ? 'text-blue-400' : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Share2 className="w-5 h-5" />
        <span className="text-[10px] font-medium">Compartidos</span>
      </button>

      {/* Menu / Drawer */}
      <button
        onClick={onOpenMobileMenu}
        className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-200 transition-colors"
      >
        <Menu className="w-5 h-5" />
        <span className="text-[10px] font-medium">Menú</span>
      </button>
    </div>
  );
};
