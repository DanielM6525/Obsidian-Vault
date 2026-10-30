import React, { useState } from 'react';
import { FolderLock, Lock, Unlock, Key, ShieldCheck, Cpu, Plus, CheckCircle2 } from 'lucide-react';
import { EncryptedVault } from '../types';

interface VaultsViewProps {
  vaults: EncryptedVault[];
  onToggleLock: (id: string) => void;
  onShowToast: (title: string, desc?: string, type?: 'success' | 'info' | 'warning') => void;
}

export const VaultsView: React.FC<VaultsViewProps> = ({
  vaults,
  onToggleLock,
  onShowToast,
}) => {
  const [unlockingId, setUnlockingId] = useState<string | null>(null);
  const [passkey, setPasskey] = useState('');

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!unlockingId) return;

    if (passkey.length < 4) {
      onShowToast('Ingresa una contraseña de al menos 4 caracteres', '', 'warning');
      return;
    }

    onToggleLock(unlockingId);
    onShowToast('Bóveda descifrada en memoria segura', 'Acceso temporal concedido', 'success');
    setUnlockingId(null);
    setPasskey('');
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-800/90 bg-gradient-to-r from-[#0d172c] to-[#080d19] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <FolderLock className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold text-white tracking-wide">Bóvedas Cifradas (AES-256 & Post-Quantum)</h2>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            Volúmenes criptográficos con aislamiento total de memoria y protección mediante enclaves de hardware TPM / HSM.
          </p>
        </div>

        <button
          onClick={() => onShowToast('Módulo de aprovisionamiento de nueva bóveda listo', 'Selecciona el algoritmo de cifrado', 'info')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-lg shadow-emerald-600/30 transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Nueva Bóveda Blindada</span>
        </button>
      </div>

      {/* Vault Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {vaults.map((vault) => {
          const isLocked = vault.status === 'locked';

          return (
            <div
              key={vault.id}
              className="rounded-2xl border border-slate-800/90 bg-[#0a0f1e] p-5 flex flex-col justify-between space-y-4 relative overflow-hidden shadow-xl hover:border-slate-700 transition-all group"
            >
              {/* Header */}
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className={`p-2.5 rounded-xl border ${
                    isLocked 
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400' 
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  }`}>
                    {isLocked ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                  </div>

                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold font-mono border ${
                    isLocked
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                  }`}>
                    {isLocked ? 'BLOQUEADA' : 'DESCIFRADA'}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                  {vault.name}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  {vault.description}
                </p>
              </div>

              {/* Specs */}
              <div className="space-y-2 pt-2 border-t border-slate-800/80 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Algoritmo:</span>
                  <span className="font-semibold text-slate-200 font-mono">{vault.cipher}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Contenido:</span>
                  <span className="font-semibold text-slate-200 font-mono">
                    {vault.filesCount} archivos ({vault.sizeFormatted})
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Enclave:</span>
                  <span className="font-semibold text-cyan-400 flex items-center gap-1">
                    <Cpu className="w-3 h-3" />
                    {vault.securityLevel}
                  </span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Última rotación:</span>
                  <span className="text-slate-300">{vault.lastKeyRotation}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  if (isLocked) {
                    setUnlockingId(vault.id);
                  } else {
                    onToggleLock(vault.id);
                    onShowToast('Bóveda asegurada y bloqueada en disco', vault.name, 'info');
                  }
                }}
                className={`w-full py-2.5 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  isLocked
                    ? 'bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/30'
                    : 'bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-500/30'
                }`}
              >
                {isLocked ? (
                  <>
                    <Key className="w-3.5 h-3.5" />
                    <span>Desbloquear con Llave Maestra</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" />
                    <span>Bloquear y Purga de RAM</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Unlock Passkey Modal */}
      {unlockingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-sm rounded-2xl bg-[#0d162a] border border-slate-700/80 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                <Key className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Desbloqueo de Bóveda</h3>
                <p className="text-[11px] text-slate-400">Ingresa la clave maestra o PIN de hardware</p>
              </div>
            </div>

            <form onSubmit={handleUnlockSubmit} className="space-y-4 pt-2">
              <div>
                <input
                  type="password"
                  autoFocus
                  required
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                  placeholder="Introduce PIN o Passphrase..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                />
                <p className="text-[10px] text-slate-400 mt-1">
                  (Demo: introduce cualquier clave para desbloquear)
                </p>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setUnlockingId(null);
                    setPasskey('');
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30"
                >
                  Desbloquear
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
