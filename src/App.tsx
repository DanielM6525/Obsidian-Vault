import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  StorageFile, 
  StorageCategory, 
  ActiveNavTab, 
  EncryptedVault, 
  SharedFileItem, 
  AccessAuditLog,
  FileType
} from './types';
import { 
  INITIAL_FILES, 
  INITIAL_VAULTS, 
  INITIAL_SHARED, 
  INITIAL_AUDIT_LOGS 
} from './data/mockData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { UploadZone } from './components/UploadZone';
import { CategoryFilters } from './components/CategoryFilters';
import { FilesTable } from './components/FilesTable';
import { FileDetailsModal } from './components/FileDetailsModal';
import { ShareModal } from './components/ShareModal';
import { ToastContainer, ToastMessage } from './components/ToastContainer';
import { SharedFilesView } from './views/SharedFilesView';
import { VaultsView } from './views/VaultsView';
import { AccessControlView } from './views/AccessControlView';
import { SettingsView } from './views/SettingsView';
import { MobileBottomDock } from './components/MobileBottomDock';

export default function App() {
  // Main State
  const [files, setFiles] = useState<StorageFile[]>(() => {
    const saved = localStorage.getItem('obsidian_files_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_FILES;
  });

  const [vaults, setVaults] = useState<EncryptedVault[]>(INITIAL_VAULTS);
  const [sharedFiles, setSharedFiles] = useState<SharedFileItem[]>(INITIAL_SHARED);
  const [auditLogs, setAuditLogs] = useState<AccessAuditLog[]>(INITIAL_AUDIT_LOGS);

  const [activeTab, setActiveTab] = useState<ActiveNavTab>('storage');
  const [activeCategory, setActiveCategory] = useState<StorageCategory>('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals & Drawers
  const [inspectFile, setInspectFile] = useState<StorageFile | null>(null);
  const [shareFile, setShareFile] = useState<StorageFile | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Async Upload & Sync Simulation
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSyncing, setIsSyncing] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Telemetry calculation
  const totalGB = 1000.0; // 1 TB
  const usedGB = useMemo(() => {
    const baseUsed = 345.2; // Baseline from prototype
    const addedBytes = files.reduce((acc, f) => {
      // only count files beyond initial 4 if wanted, or compute dynamically
      return acc + f.sizeBytes;
    }, 0);
    const addedGB = (addedBytes / (1024 * 1024 * 1024));
    // Provide visually faithful number
    return Math.min(totalGB, Number((340.0 + (addedGB * 0.8)).toFixed(1)));
  }, [files]);

  // Persist files in localStorage
  useEffect(() => {
    localStorage.setItem('obsidian_files_v1', JSON.stringify(files));
  }, [files]);

  // Toast Helper
  const showToast = (title: string, description?: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = Date.now().toString() + Math.random().toString();
    const newToast: ToastMessage = { id, title, description, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // File Categorization & Type detection
  const detectFileType = (fileName: string): { type: FileType; category: 'Documentos' | 'Bases de Datos' | 'Multimedia' | 'Respaldos' } => {
    const ext = fileName.split('.').pop()?.toLowerCase() || '';
    if (['db', 'sql', 'sqlite', 'mdb', 'dump'].includes(ext)) {
      return { type: 'database', category: 'Bases de Datos' };
    }
    if (['mp4', 'mov', 'avi', 'mkv', 'png', 'jpg', 'jpeg', 'webp', 'mp3', 'wav'].includes(ext)) {
      return { type: 'media', category: 'Multimedia' };
    }
    if (['tar', 'gz', 'zip', '7z', 'rar', 'bak', 'iso', 'tgz'].includes(ext)) {
      return { type: 'archive', category: 'Respaldos' };
    }
    return { type: 'document', category: 'Documentos' };
  };

  const formatFileSize = (bytes: number) => {
    if (bytes >= 1024 * 1024 * 1024) {
      return (bytes / (1024 * 1024 * 1024)).toFixed(1) + ' GB';
    }
    if (bytes >= 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(0) + ' MB';
    }
    return (bytes / 1024).toFixed(0) + ' KB';
  };

  // Ingest files with simulated hardware encryption
  const handleFilesSelected = (selectedFiles: FileList | File[]) => {
    const fileList = Array.from(selectedFiles);
    if (fileList.length === 0) return;

    setIsUploading(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 20;
      });
    }, 150);

    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);

      const newEntries: StorageFile[] = fileList.map((f, idx) => {
        const { type, category } = detectFileType(f.name);
        const sizeBytes = Math.max(1024 * 250, f.size || (1024 * 1024 * 15));
        const pseudoHash = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');

        return {
          id: `file-${Date.now()}-${idx}`,
          name: f.name || `Archivo_Seguro_${Date.now()}.bin`,
          category,
          storageLocation: 'Almacenamiento Principal',
          sizeFormatted: formatFileSize(sizeBytes),
          sizeBytes,
          sizeGB: sizeBytes / (1024 * 1024 * 1024),
          updated: 'Hace un momento',
          type,
          checksum: `sha256:${pseudoHash}`,
          encryptionCipher: 'AES-256-GCM (Hardware HSM)',
          description: `Archivo cargado e indexado de forma segura en la bóveda privada.`
        };
      });

      setFiles((prev) => [...newEntries, ...prev]);
      setIsUploading(false);
      setUploadProgress(0);

      // Add to audit log
      const newLog: AccessAuditLog = {
        id: `log-${Date.now()}`,
        timestamp: 'Hace un momento',
        user: 'Javier Silva (Tú)',
        role: 'Arquitecto Cloud',
        action: `Carga y cifrado de ${fileList.length} archivo(s)`,
        ip: '192.168.1.104 (LAN Privada)',
        location: 'Nodo Central Bogotá',
        status: 'Permitido',
        resource: 'Almacenamiento Principal'
      };
      setAuditLogs((prev) => [newLog, ...prev]);

      showToast(
        'Carga y Cifrado Exitoso',
        `Se ${fileList.length > 1 ? 'incorporaron' : 'incorporó'} ${fileList.length} archivo(s) con AES-256 al nodo soberano.`,
        'success'
      );
    }, 1100);
  };

  // Direct File Download
  const handleDownloadFile = (file: StorageFile) => {
    // Generate simulated downloadable file
    const element = document.createElement('a');
    const dummyContent = `--- OBSIDIAN VAULT ENCRYPTED ASSET ---\nFile: ${file.name}\nSize: ${file.sizeFormatted}\nCipher: ${file.encryptionCipher}\nChecksum SHA-256: ${file.checksum}\nIntegrity: VERIFIED BY PRIVATE CLOUD NODE\nDataSovereign Cloud 2026`;
    const blob = new Blob([dummyContent], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(blob);
    element.download = file.name;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    // Audit log
    const downloadLog: AccessAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: 'Hace un momento',
      user: 'Javier Silva (Tú)',
      role: 'Arquitecto Cloud',
      action: `Descarga de ${file.name}`,
      ip: '192.168.1.104 (LAN Privada)',
      location: 'Nodo Central Bogotá',
      status: 'Permitido',
      resource: file.storageLocation
    };
    setAuditLogs((prev) => [downloadLog, ...prev]);

    showToast(
      'Descarga Iniciada',
      `Transfiriendo "${file.name}" a través de canal TLS 1.3 seguro.`,
      'success'
    );
  };

  // Delete file
  const handleDeleteFile = (id: string) => {
    const target = files.find((f) => f.id === id);
    if (!target) return;

    setFiles((prev) => prev.filter((f) => f.id !== id));

    const deleteLog: AccessAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: 'Hace un momento',
      user: 'Javier Silva (Tú)',
      role: 'Arquitecto Cloud',
      action: `Eliminación segura de ${target.name}`,
      ip: '192.168.1.104 (LAN Privada)',
      location: 'Nodo Central Bogotá',
      status: 'Permitido',
      resource: target.storageLocation
    };
    setAuditLogs((prev) => [deleteLog, ...prev]);

    showToast('Archivo eliminado', `"${target.name}" fue purgado de la bóveda.`, 'info');
  };

  // Manual Sync Telemetry
  const handleSyncTelemetry = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      const syncLog: AccessAuditLog = {
        id: `log-${Date.now()}`,
        timestamp: 'Hace un momento',
        user: 'Sistema Automático HSM',
        role: 'Proceso Kernel',
        action: 'Sincronización manual de bloques y verificación de hashes',
        ip: '127.0.0.1 (Loopback Seguro)',
        location: 'Enclave Local',
        status: 'Verificado',
        resource: 'Todo el Almacenamiento'
      };
      setAuditLogs((prev) => [syncLog, ...prev]);
      showToast('Sincronización Completada', 'Todos los bloques de almacenamiento concuerdan al 100%.', 'success');
    }, 1000);
  };

  // Toggle Vault Lock
  const handleToggleVaultLock = (id: string) => {
    setVaults((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          const newStatus = v.status === 'locked' ? 'unlocked' : 'locked';
          return { ...v, status: newStatus };
        }
        return v;
      })
    );
  };

  // Add Shared Link
  const handleCreateShare = (newShare: {
    fileName: string;
    category: string;
    recipient: string;
    recipientEmail: string;
    permission: 'Lectura' | 'Edición' | 'Cifrado Completo';
    expiresIn: string;
  }) => {
    const item: SharedFileItem = {
      id: `s-${Date.now()}`,
      fileName: newShare.fileName,
      category: newShare.category,
      recipient: newShare.recipient,
      recipientEmail: newShare.recipientEmail,
      permission: newShare.permission,
      expiresIn: newShare.expiresIn,
      downloadsCount: 0,
      maxDownloads: 10,
      shareUrl: `https://obsidian.datasovereign.cloud/share/v-${Date.now()}`
    };
    setSharedFiles((prev) => [item, ...prev]);
  };

  // Revoke Shared Link
  const handleRevokeShare = (id: string) => {
    setSharedFiles((prev) => prev.filter((s) => s.id !== id));
  };

  // Filtered files for table
  const filteredFiles = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return files.filter((item) => {
      const matchesCat = activeCategory === 'Todos' || item.category === activeCategory;
      const matchesSearch = !q || item.name.toLowerCase().includes(q) || item.storageLocation.toLowerCase().includes(q);
      return matchesCat && matchesSearch;
    });
  }, [files, activeCategory, searchQuery]);

  return (
    <div className="h-full flex flex-col bg-[#030712] text-slate-200 overflow-hidden select-none font-sans">
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={(tab) => {
            setActiveTab(tab);
            setIsMobileMenuOpen(false);
          }}
          filesCount={files.length}
          usedGB={usedGB}
          totalGB={totalGB}
          onSync={handleSyncTelemetry}
          isSyncing={isSyncing}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content Pane */}
        <div className="flex-1 flex flex-col min-w-0 bg-[#030712] overflow-hidden">
          {/* Header Bar */}
          <Header
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
            onShowToast={showToast}
          />

          {/* Main Body with Scrollbar */}
          <main className="flex-1 overflow-y-auto custom-scroll p-4 sm:p-6 lg:p-8 space-y-6 pb-24 lg:pb-8">
            {/* View Switcher */}
            {activeTab === 'storage' && (
              <div className="space-y-6 animate-in fade-in">
                {/* Drag & Drop Upload Zone */}
                <UploadZone
                  onFilesSelected={handleFilesSelected}
                  isUploading={isUploading}
                  uploadProgress={uploadProgress}
                />

                {/* Category Pills Filters */}
                <CategoryFilters
                  activeCategory={activeCategory}
                  onSelectCategory={setActiveCategory}
                  files={files}
                  filteredCount={filteredFiles.length}
                />

                {/* Main Table */}
                <FilesTable
                  files={filteredFiles}
                  onDownload={handleDownloadFile}
                  onDelete={handleDeleteFile}
                  onViewDetails={setInspectFile}
                  onShare={setShareFile}
                  onResetFilters={() => {
                    setActiveCategory('Todos');
                    setSearchQuery('');
                  }}
                />
              </div>
            )}

            {activeTab === 'shared' && (
              <SharedFilesView
                sharedFiles={sharedFiles}
                onRevokeShare={handleRevokeShare}
                onOpenNewShare={() => {
                  if (files.length > 0) {
                    setShareFile(files[0]);
                  } else {
                    showToast('No hay archivos para compartir', 'Carga uno primero', 'warning');
                  }
                }}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'vaults' && (
              <VaultsView
                vaults={vaults}
                onToggleLock={handleToggleVaultLock}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'access' && (
              <AccessControlView
                auditLogs={auditLogs}
                onShowToast={showToast}
              />
            )}

            {activeTab === 'settings' && (
              <SettingsView
                onResetData={() => {
                  setFiles(INITIAL_FILES);
                  setVaults(INITIAL_VAULTS);
                  setSharedFiles(INITIAL_SHARED);
                  setAuditLogs(INITIAL_AUDIT_LOGS);
                  showToast('Datos de demostración restablecidos', '', 'info');
                }}
                onShowToast={showToast}
              />
            )}
          </main>
        </div>
      </div>

      {/* Mobile Bottom Dock (from Image 4) */}
      <MobileBottomDock
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          setIsMobileMenuOpen(false);
        }}
        onOpenUpload={() => {
          setActiveTab('storage');
          const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
          fileInput?.click();
        }}
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
      />

      {/* Cryptographic Inspection Modal */}
      {inspectFile && (
        <FileDetailsModal
          file={inspectFile}
          onClose={() => setInspectFile(null)}
          onDownload={handleDownloadFile}
          onShowToast={showToast}
        />
      )}

      {/* Share Encrypted File Modal */}
      {shareFile && (
        <ShareModal
          file={shareFile}
          onClose={() => setShareFile(null)}
          onShareCreated={handleCreateShare}
          onShowToast={showToast}
        />
      )}
    </div>
  );
}
