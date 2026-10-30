export type StorageCategory = 'Todos' | 'Documentos' | 'Bases de Datos' | 'Multimedia' | 'Respaldos';

export type FileType = 'database' | 'document' | 'archive' | 'media' | 'other';

export interface StorageFile {
  id: string;
  name: string;
  category: 'Documentos' | 'Bases de Datos' | 'Multimedia' | 'Respaldos';
  storageLocation: string;
  sizeFormatted: string;
  sizeBytes: number;
  sizeGB: number;
  updated: string;
  type: FileType;
  checksum: string;
  encryptionCipher: string;
  downloadUrl?: string;
  description?: string;
}

export interface EncryptedVault {
  id: string;
  name: string;
  cipher: string;
  filesCount: number;
  sizeFormatted: string;
  status: 'locked' | 'unlocked';
  lastKeyRotation: string;
  securityLevel: 'Hardware HSM' | 'Enclave Seguro' | 'Bóveda Fría';
  description: string;
}

export interface SharedFileItem {
  id: string;
  fileName: string;
  category: string;
  recipient: string;
  recipientEmail: string;
  permission: 'Lectura' | 'Edición' | 'Cifrado Completo';
  expiresIn: string;
  downloadsCount: number;
  maxDownloads: number;
  shareUrl: string;
}

export interface AccessAuditLog {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  ip: string;
  location: string;
  status: 'Permitido' | 'Bloqueado' | 'Verificado';
  resource: string;
}

export type ActiveNavTab = 'storage' | 'shared' | 'vaults' | 'access' | 'settings';
