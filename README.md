# Obsidian Vault — Private Local Cloud (DataSovereign)

Aplicación empresarial para almacenamiento soberano en la nube privada y gestión de bóvedas cifradas con aceleración de hardware.

## 🚀 Cómo ejecutar en Visual Studio / VS Code

1. **Abrir la carpeta del proyecto** en Visual Studio Code.
2. **Abrir la terminal integrada** (`Ctrl + \`` o `Terminal > Nueva terminal`).
3. **Instalar dependencias**:
   ```bash
   npm install
   ```
4. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
5. **Abrir en el navegador**:
   Visita `http://localhost:3000` para interactuar con la aplicación en vivo.

---

## 🛡️ Características Principales Implementadas

- **Diseño Idéntico**: Fiel réplica visual y funcional de la interfaz de escritorio y móvil ("Obsidian Vault PRO - DataSovereign Cloud").
- **Zona de Carga Drag & Drop**: Arrastra y suelta archivos o selecciónalos desde el explorador con simulación de cifrado AES-256 en tiempo real.
- **Filtros por Categoría**: Visualización rápida de Todos, Documentos, Bases de Datos, Multimedia y Respaldos con contadores dinámicos.
- **Explorador de Archivos**: Tabla con ordenamiento por nombre y tamaño, descarga directa de archivos, inspección criptográfica SHA-256 y eliminación.
- **Telemetría de Almacenamiento**: Barra de progreso con porcentaje dinámico y botón de sincronización de nodo.
- **Bóvedas Cifradas**: Gestión de volúmenes con bloqueo y desbloqueo mediante clave maestra / enclave HSM.
- **Control de Accesos & Auditoría**: Registro de eventos de seguridad, conexiones de red LAN y políticas Zero-Trust.
- **Modo Móvil & Responsivo**: Barra dock inferior y menú lateral deslizable adaptado para cualquier pantalla.
