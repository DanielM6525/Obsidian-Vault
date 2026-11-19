import React, { useRef, useEffect, useState } from 'react';
import { Search, Bell, ChevronDown, Menu, CheckCircle2, Shield, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenMobileMenu: () => void;
  onShowToast: (title: string, desc?: string, type?: 'success' | 'info' | 'warning') => void;
  isLightMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onOpenMobileMenu,
  onShowToast,
  isLightMode,
  onToggleTheme,
}) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

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
    <header className="h-16 border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between bg-[#080d18]/90 backdrop-blur-md z-20 shrink-0 transition-colors">
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
            className="w-full pl-10 pr-12 py-2 text-sm bg-slate-900/90 border border-slate-700/60 rounded-xl text-slate-200 placeholder-slate-400 focus:outline-none focus:border-slate-500 transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-800 border border-slate-700 rounded">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2.5 sm:gap-3.5 ml-3 sm:ml-6">
        {/* Speed Network Badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/60 border border-slate-700/60 text-slate-300 text-xs font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Red de Alta Velocidad</span>
          <span className="text-[10px] text-slate-400 border-l border-slate-700 pl-2 font-mono">
            1.2 Gbps
          </span>
        </div>

        {/* Botón Cambiar Fondo: Oscuro / Claro */}
        <button
          onClick={onToggleTheme}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 transition-all cursor-pointer"
          title={isLightMode ? 'Cambiar a fondo oscuro' : 'Cambiar a fondo claro'}
        >
          {isLightMode ? (
            <>
              <Moon className="w-4 h-4" />
              <span className="hidden sm:inline">Oscuro</span>
            </>
          ) : (
            <>
              <Sun className="w-4 h-4" />
              <span className="hidden sm:inline">Claro</span>
            </>
          )}
        </button>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition-all cursor-pointer"
            aria-label="Ver notificaciones"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-slate-400 ring-2 ring-[#080d18]" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-[#0d1527] border border-slate-700/80 shadow-2xl p-4 z-50">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Notificaciones del Sistema</h4>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-semibold">
                  2 nuevas
                </span>
              </div>
              <div className="space-y-3 pt-3 text-xs">
                <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-800/40 border border-slate-700/40">
                  <CheckCircle2 className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-white">Nodo Privado Sincronizado</p>
                    <p className="text-[11px] text-slate-400">Canal TLS 1.3 verificado con hardware TPM.</p>
                    <span className="text-[10px] text-slate-400 mt-1 block">Hace 4 minutos</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-800/40 border border-slate-700/40">
                  <Shield className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" />
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
                className="w-full mt-3 py-1.5 text-center text-xs font-semibold text-slate-200 hover:text-white bg-slate-800 rounded-lg border border-slate-700 transition-colors cursor-pointer"
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
            <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-slate-200">
              JS
            </div>
            <div className="hidden lg:flex flex-col text-left">
              <span className="text-xs font-semibold text-white">
                Javier Silva
              </span>
              <span className="text-[10px] text-slate-400 font-medium leading-none">
                Arquitecto Cloud
              </span>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-[#0d1527] border border-slate-700/80 shadow-2xl p-2.5 z-50 text-xs">
              <div className="px-3 py-2 border-b border-slate-800">
                <p className="font-semibold text-white">Javier Silva</p>
                <p className="text-[11px] text-slate-400 truncate">1019133380@teinco.edu.co</p>
                <span className="inline-block mt-1 text-[10px] font-semibold text-slate-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                  Acceso Superadministrador
                </span>
              </div>
              <div className="py-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onShowToast('Credenciales verificadas con token FIDO2', '', 'success');
                  }}
                  className="w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>Llave de Seguridad FIDO2</span>
                  <span className="text-[10px] text-slate-400 font-mono">Activa</span>
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    onShowToast('Exportando perfil para Visual Studio Code...', 'Workspace cargado', 'info');
                  }}
                  className="w-full text-left px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
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