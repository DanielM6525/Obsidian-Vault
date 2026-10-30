import React, { useRef, useEffect, useState } from 'react';
import { Search, Bell, ChevronDown, Menu, CheckCircle2, Shield, Wifi } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenMobileMenu: () => void;
  onShowToast: (title: string, desc?: string, type?: 'success' | 'info' | 'warning') => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenMobileMenu,
  onShowToast,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Keyboard shortcut ⌘K or Ctrl+K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <header className="h-16 border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between bg-[#080d18]/90 backdrop-blur-md z-20 shrink-0">
      {/* Mobile Menu Button + Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileMenu}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden shrink-0 border border-slate-700/60"
          aria-label="Abrir menú"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar archivos, carpetas o documentos..."
            className="w-full pl-10 pr-12 py-2 text-sm bg-slate-900/90 border border-slate-700/60 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/40 transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded shadow-xs">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 sm:gap-4 ml-3 sm:ml-6">
        {/* Speed Network Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-xs shadow-emerald-400" />
          <span>Red de Alta Velocidad</span>
          <span className="text-[10px] text-emerald-400/80 border-l border-emerald-500/30 pl-2 font-mono">
            1.2 Gbps
          </span>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition-all cursor-pointer"
            aria-label="Ver notificaciones"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500 ring-2 ring-[#080d18]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0d1527] border border-slate-700/80 shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Notificaciones del Sistema</h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-semibold">
                  2 nuevas
                </span>
              </div>
              <div className="space-y-3 pt-3 text-xs">
                <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-800/40 border border-slate-700/40">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Nodo Privado Sincronizado</p>
                    <p className="text-[11px] text-slate-400">Canal TLS 1.3 verificado con hardware TPM.</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">Hace 4 minutos</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-800/40 border border-slate-700/40">
                  <Shield className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Bóvedas con Cifrado Activo</p>
                    <p className="text-[11px] text-slate-400">Algoritmo AES-256-GCM operando al 100%.</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">Hace 1 hora</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowNotifications(false);
                  onShowToast('Notificaciones marcadas como leídas', '', 'info');
                }}
                className="w-full mt-3 py-1.5 text-center text-xs font-semibold text-blue-400 hover:text-blue-300 bg-blue-500/10 rounded-lg border border-blue-500/20 transition-colors"
              >
                Cerrar panel
              </button>
            </div>
          )}
        </div>

        <div className="h-5 w-px bg-slate-800 hidden sm:block" />

        {/* User Profile dropdown */}
        <div className="relative">
          <div
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group p-1 rounded-xl hover:bg-slate-800/50 transition-all"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 p-[1px] shadow-sm shadow-blue-500/20">
              <div className="w-full h-full bg-[#0d1527] rounded-[11px] flex items-center justify-center font-bold text-xs text-blue-300">
                JS
              </div>
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors">
                Javier Silva
              </span>
              <span className="text-[10px] text-slate-400 font-medium leading-none">
                Arquitecto Cloud
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-300 transition-colors" />
          </div>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0d1527] border border-slate-700/80 shadow-2xl p-2.5 z-50 text-xs animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 border-b border-slate-800">
                <p className="font-semibold text-white">Javier Silva</p>
                <p className="text-[11px] text-slate-400 truncate">1019133380@teinco.edu.co</p>
                <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  Acceso Superadministrador
                </span>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onShowToast('Credenciales verificadas con token FIDO2', '', 'success');
                  }}
                  className="w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>Llave de Seguridad FIDO2</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Activa</span>
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onShowToast('Exportando perfil para Visual Studio Code...', 'Workspace cargado', 'info');
                  }}
                  className="w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  Configuración VS Code
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
