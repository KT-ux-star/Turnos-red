# TurnosRed - Backend API

## Descripción

TurnosRed es un backend especializado en la gestión centralizada de turnos médicos para centros de atención ambulatoria. La aplicación procesa datos heterogéneos de múltiples sedes (clínica médica, pediatría, odontología y nutrición) y proporciona una API REST con comunicación en tiempo real mediante WebSockets.

**Características principales:**
- ✅ API REST con 5 endpoints CRUD para turnos
- ✅ Normalización y validación automática de datos
- ✅ Bus de eventos internos con EventEmitter
- ✅ Comunicación en tiempo real con Socket.IO
- ✅ Arquitectura de capas (routes, controllers, services, models)
- ✅ TypeScript con tipado estricto

---

## Requisitos previos

- **Node.js** (versión LTS) — [Descargar](https://nodejs.org/)
- **NVM** (recomendado para gestionar versiones) — [Instalar](https://github.com/nvm-sh/nvm)
- **npm** (incluido con Node.js)
- **Git** — [Descargar](https://git-scm.com/)

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone <URL-DEL-REPOSITORIO>
cd turnos-red

### 2. Instalar dependencias

```bash
npm install
3. Configurar variables de entorno
Copia .env.example a .env:

cp .env.example .env
Variables de entorno
Variable	Descripción	Valor por defecto
PORT	Puerto en el que corre el servidor	3000
DATA_FILE_PATH	Ruta del archivo JSON con datos de turnos	./data/turnos.json
Scripts npm
# Compilar TypeScript
npm run build

# Ejecutar en modo desarrollo (compila y ejecuta)
npm run dev

# Ejecutar código compilado
npm start

# Linter (verifica código)
npm run lint

# Formatear código
npm run format
Estructura de carpetas
turnos-red/
├── src/
│   ├── controllers/         # Controladores (manejo de solicitudes HTTP)
│   │   └── turnos.controller.ts
│   ├── models/              # Modelos de datos e interfaces
│   │   └── turnos.models.ts
│   ├── routes/              # Definición de rutas
│   │   └── turnos.routes.ts
│   ├── services/            # Lógica de negocio
│   │   └── turnos.services.ts
│   ├── events/              # Bus de eventos y Socket.IO
│   │   ├── turno.emitter.ts
│   │   └── socket.ts
│   └── index.ts             # Punto de entrada
├── data/
│   └── turnos.json          # Archivo con datos crudos de turnos
├── dist/                    # Código compilado (generado por TypeScript)
├── .env.example             # Variables de entorno (ejemplo)
├── .gitignore               # Archivos ignorados por Git
├── package.json             # Dependencias del proyecto
├── package-lock.json        # Lock file de npm
├── tsconfig.json            # Configuración de TypeScript
├── .nvmrc                   # Versión de Node.js
└── README.md                # Este archivo
Cómo ejecutar
Modo desarrollo
npm run dev
El servidor se levantará en http://localhost:3000 (o el puerto especificado en .env).

Verás en consola:

🚀 Servidor corriendo en puerto 3000
✅ Turnos aceptados: X | ❌ Turnos rechazados: Y
Modo producción
npm run build
npm start
Endpoints REST
GET /turnos
Obtiene todos los turnos.

Respuesta (200 OK):

[
  {
    "id": 102,
    "paciente": "Carlos Ruiz",
    "documento": "31654210",
    "especialidad": "Pediatría",
    "fecha": "14/08/2026",
    "hora": "10.00",
    "confirmado": true
  }
]
GET /turnos/:id
Obtiene un turno por ID.

Respuesta (200 OK):

{
  "id": 102,
  "paciente": "Carlos Ruiz",
  "documento": "31654210",
  "especialidad": "Pediatría",
  "fecha": "14/08/2026",
  "hora": "10.00",
  "confirmado": true
}
POST /turnos
Crea un nuevo turno.

Body (JSON):

{
  "id": "104",
  "paciente": "Juan Pérez",
  "documento": 25987654,
  "especialidad": "CLÍNICA MÉDICA",
  "fecha": "20/08/2026",
  "hora": "09:15",
  "confirmado": "si"
}
Respuesta (201 Created):

{
  "id": 104,
  "paciente": "Juan Pérez",
  "documento": "25987654",
  "especialidad": "Clínica Médica",
  "fecha": "20/08/2026",
  "hora": "09:15",
  "confirmado": true
}
PUT /turnos/:id
Actualiza un turno existente.

Respuesta (200 OK): Turno actualizado

DELETE /turnos/:id
Elimina un turno.

Respuesta (204 No Content)

Eventos en tiempo real (Socket.IO)
Cuando ocurren operaciones CRUD, se emiten eventos en tiempo real a los clientes conectados:

turno:creado — Se emite cuando se crea un turno
turno:actualizado — Se emite cuando se actualiza un turno
turno:eliminado — Se emite cuando se elimina un turno
Ejemplo de conexión (cliente):

const socket = io('http://localhost:3000');

socket.on('turno:creado', (turno) => {
  console.log('Nuevo turno:', turno);
});

socket.on('turno:actualizado', (turno) => {
  console.log('Turno actualizado:', turno);
});

socket.on('turno:eliminado', (id) => {
  console.log('Turno eliminado:', id);
});
Normalización de datos
Los datos crudos del archivo turnos.json se normalizan automáticamente:

Campo	Transformación
id	String → Number (entero positivo)
documento	Number → String
especialidad	Mayúsculas → Title Case
confirmado	"si"/"no" → true/false
paciente	Se eliminan espacios extras
Tecnologías utilizadas
Node.js — Runtime de JavaScript
Express — Framework web
TypeScript — Tipado estricto
Socket.IO — Comunicación en tiempo real
EventEmitter — Patrón de eventos
Autor
TurnosRed - Proyecto académico de Teclab Integraciones Web

Licencia
ISC


---

**Ahora copia TODO esto y agrégalo a tu `README.md`** (después de la sección de Instalación que ya copiaste).

¿Lo hiciste? 🔹