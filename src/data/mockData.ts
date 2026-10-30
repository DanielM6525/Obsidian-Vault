import { StorageFile, EncryptedVault, SharedFileItem, AccessAuditLog } from '../types';

export const INITIAL_FILES: StorageFile[] = [
  {
    id: 'f-1',
    name: 'Base_de_Datos_Clientes_2026.db',
    category: 'Bases de Datos',
    storageLocation: 'Almacenamiento Principal',
    sizeFormatted: '1.2 GB',
    sizeBytes: 1.2 * 1024 * 1024 * 1024,
    sizeGB: 1.2,
    updated: 'Hace un momento',
    type: 'database',
    checksum: 'sha256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069',
    encryptionCipher: 'AES-256-GCM Hardware HSM',
    description: 'Bases relacionales particionadas con índices optimizados para auditoría bancaria.'
  },
  {
    id: 'f-2',
    name: 'Contratos_Empresa_2026.pdf',
    category: 'Documentos',
    storageLocation: 'Almacenamiento Secundario',
    sizeFormatted: '45 MB',
    sizeBytes: 45 * 1024 * 1024,
    sizeGB: 0.045,
    updated: 'Ayer',
    type: 'document',
    checksum: 'sha256:e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    encryptionCipher: 'ChaCha20-Poly1305',
    description: 'Pólizas marco, acuerdos de confidencialidad y actas constitutivas firmadas.'
  },
  {
    id: 'f-3',
    name: 'Respaldo_Boveda_Diario.tar.gz',
    category: 'Respaldos',
    storageLocation: 'Bóveda Fría de Seguridad',
    sizeFormatted: '4.8 GB',
    sizeBytes: 4.8 * 1024 * 1024 * 1024,
    sizeGB: 4.8,
    updated: 'Hace 3 días',
    type: 'archive',
    checksum: 'sha256:ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
    encryptionCipher: 'AES-256-GCM (Offline Cold Storage)',
    description: 'Instantánea completa de microservicios con llaves asimétricas aisladas.'
  },
  {
    id: 'f-4',
    name: 'Grabacion_Keynote_Presentacion.mp4',
    category: 'Multimedia',
    storageLocation: 'Almacenamiento Multimedia',
    sizeFormatted: '820 MB',
    sizeBytes: 820 * 1024 * 1024,
    sizeGB: 0.82,
    updated: 'Hace 5 días',
    type: 'media',
    checksum: 'sha256:5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5',
    encryptionCipher: 'AES-128-CBC Stream Buffer',
    description: 'Transmisión 4K HDR de la convención técnica de ciberdefensa e infraestructura.'
  }
];

export const INITIAL_VAULTS: EncryptedVault[] = [
  {
    id: 'v-1',
    name: 'Bóveda Fría de Seguridad A1',
    cipher: 'AES-256-GCM',
    filesCount: 18,
    sizeFormatted: '124.5 GB',
    status: 'locked',
    lastKeyRotation: 'Hace 2 horas',
    securityLevel: 'Bóveda Fría',
    description: 'Almacenamiento en disco desconectado de internet directo con firma de hardware.'
  },
  {
    id: 'v-2',
    name: 'Enclave Financiero & Tesorería',
    cipher: 'ChaCha20-Poly1305',
    filesCount: 9,
    sizeFormatted: '38.2 GB',
    status: 'unlocked',
    lastKeyRotation: 'Ayer',
    securityLevel: 'Enclave Seguro',
    description: 'Credenciales criptográficas, firmas fiscales y contratos notariales.'
  },
  {
    id: 'v-3',
    name: 'Archivos Históricos Blindados',
    cipher: 'Post-Quantum Kyber-1024',
    filesCount: 42,
    sizeFormatted: '182.5 GB',
    status: 'locked',
    lastKeyRotation: 'Hace 7 días',
    securityLevel: 'Hardware HSM',
    description: 'Copias de seguridad de largo plazo con resistencia post-cuántica.'
  }
];

export const INITIAL_SHARED: SharedFileItem[] = [
  {
    id: 's-1',
    fileName: 'Contratos_Empresa_2026.pdf',
    category: 'Documentos',
    recipient: 'Consultoría Legal Baker & Partners',
    recipientEmail: 'legal@baker-partners.com',
    permission: 'Lectura',
    expiresIn: 'En 48 horas',
    downloadsCount: 3,
    maxDownloads: 10,
    shareUrl: 'https://obsidian.datasovereign.cloud/share/v-8942-pdf'
  },
  {
    id: 's-2',
    fileName: 'Base_de_Datos_Clientes_2026.db',
    category: 'Bases de Datos',
    recipient: 'Equipo de DevOps (Cluster México)',
    recipientEmail: 'devops-lead@teinco.edu.co',
    permission: 'Edición',
    expiresIn: 'En 6 días',
    downloadsCount: 1,
    maxDownloads: 5,
    shareUrl: 'https://obsidian.datasovereign.cloud/share/sql-vault-sync'
  }
];

export const INITIAL_AUDIT_LOGS: AccessAuditLog[] = [
  {
    id: 'log-1',
    timestamp: 'Hace 2 min',
    user: 'Javier Silva (Tú)',
    role: 'Arquitecto Cloud',
    action: 'Descarga de Base_de_Datos_Clientes_2026.db',
    ip: '192.168.1.104 (LAN Privada)',
    location: 'Nodo Central Bogotá',
    status: 'Permitido',
    resource: 'Almacenamiento Principal'
  },
  {
    id: 'log-2',
    timestamp: 'Hace 14 min',
    user: 'Sistema Automático HSM',
    role: 'Proceso Kernel',
    action: 'Rotación de llave criptográfica AES-256',
    ip: '127.0.0.1 (Loopback Seguro)',
    location: 'Enclave Local',
    status: 'Verificado',
    resource: 'Bóveda Fría A1'
  },
  {
    id: 'log-3',
    timestamp: 'Hace 1 hora',
    user: '185.220.101.5',
    role: 'Externo No Autenticado',
    action: 'Intento de acceso puerto 443 sin certificado mTLS',
    ip: '185.220.101.5 (Tor Exit Node)',
    location: 'Desconocido',
    status: 'Bloqueado',
    resource: 'Firewall Perimetral'
  },
  {
    id: 'log-4',
    timestamp: 'Ayer 22:15',
    user: 'Javier Silva (Tú)',
    role: 'Arquitecto Cloud',
    action: 'Carga de Respaldo_Boveda_Diario.tar.gz',
    ip: '192.168.1.104 (LAN Privada)',
    location: 'Nodo Central Bogotá',
    status: 'Permitido',
    resource: 'Bóveda Fría de Seguridad'
  }
];
