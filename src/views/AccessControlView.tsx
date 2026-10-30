import React from 'react';
import { ShieldCheck, UserCheck, AlertOctagon, Terminal, Server, Wifi } from 'lucide-react';
import { AccessAuditLog } from '../types';

interface AccessControlViewProps {
  auditLogs: AccessAuditLog[];
  onShowToast: (title: string, desc?: string, type?: 'success' | 'info' | 'warning') => void;
}

export const AccessControlView: React.FC<AccessControlViewProps> = ({
  auditLogs,
  onShowToast,
}) => {
  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Top Banner */}
      <div className="rounded-2xl border border-slate-800/90 bg-gradient-to-r from-[#0b1424] to-[#080d19] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="w-5 h-5 text-blue-400" />
            <h2 className="text-base font-bold text-white tracking-wide">Control de Accesos y Auditoría</h2>
          </div>
          <p className="text-xs text-slate-400 max-w-xl">
            Registro inmutable de transacciones, validación de certificados mutuos (mTLS) y sesiones activas en la nube privada.
          </p>
        </div>

        <button
          onClick={() => onShowToast('Exportando reporte de auditoría SOC2 en formato JSON-LD...', '', 'success')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all cursor-pointer shrink-0"
        >
          <Terminal className="w-4 h-4 text-blue-400" />
          <span>Exportar Logs Criptográficos</span>
        </button>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800/80">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-semibold mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Política Zero-Trust</span>
          </div>
          <p className="text-base font-bold text-white">Cumplimiento 100%</p>
          <span className="text-[11px] text-slate-400">Verificación estricta por paquete</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800/80">
          <div className="flex items-center gap-2 text-blue-400 text-xs font-semibold mb-1">
            <Server className="w-4 h-4" />
            <span>Conexiones Activas</span>
          </div>
          <p className="text-base font-bold text-white">2 Nodos Autorizados</p>
          <span className="text-[11px] text-slate-400">LAN Privada & Enclave Local</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0a0f1d] border border-slate-800/80">
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold mb-1">
            <Wifi className="w-4 h-4" />
            <span>Firewall de Tráfico</span>
          </div>
          <p className="text-base font-bold text-white">Filtro mTLS Activo</p>
          <span className="text-[11px] text-slate-400">0 intrusiones permitidas hoy</span>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="rounded-2xl border border-slate-800/90 overflow-hidden bg-[#0a0f1d] shadow-2xl">
        <div className="px-6 py-4 border-b border-slate-800/80 bg-[#0c1322] flex items-center justify-between">
          <h3 className="text-sm font-bold text-white">Eventos de Seguridad Recientes</h3>
          <span className="text-xs text-slate-400 font-mono">Actualizado en tiempo real</span>
        </div>

        <div className="overflow-x-auto custom-scroll">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800/80 bg-slate-900/40 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-3.5 pl-6 pr-4">Fecha y Hora</th>
                <th className="py-3.5 px-4">Usuario / Proceso</th>
                <th className="py-3.5 px-4">Acción</th>
                <th className="py-3.5 px-4">IP y Nodo</th>
                <th className="py-3.5 px-4">Recurso</th>
                <th className="py-3.5 pl-4 pr-6 text-right">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {auditLogs.map((log) => {
                const isBlocked = log.status === 'Bloqueado';
                const isVerified = log.status === 'Verificado';

                return (
                  <tr key={log.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-4 pl-6 pr-4 text-slate-300 font-medium whitespace-nowrap">
                      {log.timestamp}
                    </td>
                    <td className="py-4 px-4">
                      <div className="font-semibold text-white">{log.user}</div>
                      <div className="text-[10px] text-slate-400">{log.role}</div>
                    </td>
                    <td className="py-4 px-4 text-slate-300">{log.action}</td>
                    <td className="py-4 px-4 font-mono text-[11px] text-slate-400">
                      {log.ip}
                    </td>
                    <td className="py-4 px-4 text-slate-300">{log.resource}</td>
                    <td className="py-4 pl-4 pr-6 text-right whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-semibold border ${
                          isBlocked
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                            : isVerified
                            ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
