import React, { useState } from 'react';
import { Settings, Server, Shield, HardDrive, Terminal, Copy, Check, RefreshCw } from 'lucide-react';

interface SettingsViewProps {
  onResetData: () => void;
  onShowToast: (title: string, desc?: string, type?: 'success' | 'info' | 'warning') => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  onResetData,
  onShowToast,
}) => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);
  const [cipher, setCipher] = useState('AES-256-GCM (Hardware HSM)');
  const [nodeName, setNodeName] = useState('Obsidian-Node-Bogota-01');
  const [syncInterval, setSyncInterval] = useState('30');

  const copyCommand = (cmd: string, id: string) => {
    navigator.clipboard?.writeText(cmd);
    setCopiedCmd(id);
    onShowToast('Comando copiado al portapapeles', cmd, 'success');
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in max-w-4xl">
      {/* Header */}
      <div className="rounded-2xl border border-slate-800/90 bg-gradient-to-r from-[#0b1424] to-[#080d19] p-6">
        <div className="flex items-center gap-2 mb-1">
          <Settings className="w-5 h-5 text-blue-400" />
          <h2 className="text-base font-bold text-white tracking-wide">Configuración del Sistema</h2>
        </div>
        <p className="text-xs text-slate-400">
          Ajustes de infraestructura soberana, enclaves criptográficos y guía de despliegue en Visual Studio.
        </p>
      </div>

      {/* Visual Studio Execution Guide (Directly addressing user prompt!) */}
      <div className="rounded-2xl border border-blue-500/30 bg-[#091122] p-6 space-y-4 shadow-xl">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Terminal className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">
              Guía para Ejecutar en Visual Studio / VS Code
            </h3>
            <p className="text-[11px] text-slate-400">
              Pasos directos para abrir y correr esta aplicación en tu entorno local
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-semibold">1. Instalar dependencias en la terminal:</span>
              <button
                onClick={() => copyCommand('npm install', 'cmd1')}
                className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-mono text-[11px]"
              >
                {copiedCmd === 'cmd1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCmd === 'cmd1' ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
            <code className="block text-emerald-400 font-mono text-[11px] bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              npm install
            </code>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-300 font-semibold">2. Iniciar el servidor local de desarrollo:</span>
              <button
                onClick={() => copyCommand('npm run dev', 'cmd2')}
                className="text-blue-400 hover:text-blue-300 flex items-center gap-1 font-mono text-[11px]"
              >
                {copiedCmd === 'cmd2' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCmd === 'cmd2' ? 'Copiado' : 'Copiar'}</span>
              </button>
            </div>
            <code className="block text-emerald-400 font-mono text-[11px] bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
              npm run dev
            </code>
            <p className="text-[11px] text-slate-400 mt-1">
              Abre tu navegador en <strong className="text-blue-300">http://localhost:3000</strong> para ver la aplicación completa en tiempo real.
            </p>
          </div>
        </div>
      </div>

      {/* Node Settings Form */}
      <div className="rounded-2xl border border-slate-800/90 bg-[#0a0f1d] p-6 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Server className="w-4 h-4 text-blue-400" />
          <span>Parámetros del Nodo Privado</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Identificador del Nodo Local
            </label>
            <input
              type="text"
              value={nodeName}
              onChange={(e) => setNodeName(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Algoritmo Criptográfico Predeterminado
            </label>
            <select
              value={cipher}
              onChange={(e) => setCipher(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-blue-500"
            >
              <option value="AES-256-GCM (Hardware HSM)">AES-256-GCM (Aceleración Hardware HSM)</option>
              <option value="ChaCha20-Poly1305">ChaCha20-Poly1305 (Alta velocidad en móviles)</option>
              <option value="Post-Quantum Kyber-1024">Post-Quantum Kyber-1024 (Blindaje Cuántico)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Frecuencia de Heartbeat de Sincronización (segundos)
            </label>
            <input
              type="number"
              value={syncInterval}
              onChange={(e) => setSyncInterval(e.target.value)}
              className="w-full px-3.5 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">
              Caché en Memoria RAM No Persistente
            </label>
            <div className="flex items-center gap-2 pt-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-semibold">Cero escritura sin cifrado en disco</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={onResetData}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 border border-amber-500/20 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Restablecer Archivos de Demostración</span>
          </button>

          <button
            onClick={() => onShowToast('Configuración guardada en el enclave seguro', '', 'success')}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-lg shadow-blue-600/30 transition-all cursor-pointer"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};
