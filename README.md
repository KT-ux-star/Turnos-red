# TurnosRed - Backend API

## Descripción

TurnosRed es un backend especializado en la gestión centralizada de turnos médicos para centros de atención ambulatoria.

La aplicación procesa datos de turnos y médicos y proporciona una API REST con comunicación en tiempo real mediante WebSockets.

## Características principales

- API REST con operaciones CRUD para turnos.
- CRUD completo del recurso médicos.
- Normalización y validación de datos.
- Validaciones de entrada mediante Zod.
- Manejo centralizado y estandarizado de errores.
- Bus de eventos internos con EventEmitter.
- Comunicación en tiempo real mediante Socket.IO.
- Arquitectura por capas:
  - routes
  - controllers
  - services
  - models
  - schemas
  - middlewares
  - errors
- Controllers separados por recurso.
- Controller general para Hello World y rutas inexistentes.
- TypeScript con tipado estricto.

---

## Requisitos previos

- **Node.js** versión LTS.
- **NPM**, incluido con Node.js.
- **Git**.
- **NVM** (opcional, recomendado para gestionar versiones de Node.js).
- **Postman** para realizar las pruebas de la API.

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone <URL-DEL-REPOSITORIO>
cd turnos-red
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Copiar `.env.example` como `.env`.

Variables utilizadas:

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `PORT` | Puerto en el que corre el servidor | `3000` |
| `DATA_FILE_PATH` | Ruta del archivo JSON con datos de turnos | `./data/turnos.json` |

## Scripts disponibles

### Compilar TypeScript

```bash
npm run build
```

### Ejecutar en desarrollo

```bash
npm run dev
```

Este comando compila TypeScript y ejecuta la aplicación.

### Ejecutar código compilado

```bash
npm start
```

### Ejecutar ESLint

```bash
npm run lint
```

### Formatear el proyecto

```bash
npm run format
```

## Estructura del proyecto

```text
turnos-red/
├── src/
│   ├── controllers/
│   │   ├── general.controller.ts
│   │   ├── medicos.controller.ts
│   │   └── turnos.controller.ts
│   │
│   ├── errors/
│   │   └── app.error.ts
│   │
│   ├── events/
│   │   ├── turno.emitter.ts
│   │   └── socket.ts
│   │
│   ├── middlewares/
│   │   ├── error.handler.ts
│   │   └── validate.ts
│   │
│   ├── models/
│   │   ├── medicos.models.ts
│   │   └── turnos.models.ts
│   │
│   ├── routes/
│   │   ├── general.routes.ts
│   │   ├── medicos.routes.ts
│   │   └── turnos.routes.ts
│   │
│   ├── schemas/
│   │   ├── medicos.schema.ts
│   │   └── turnos.schema.ts
│   │
│   ├── services/
│   │   ├── medicos.service.ts
│   │   └── turnos.services.ts
│   │
│   ├── ejemploCallbacks.ts
│   ├── index.ts
│   └── normalizador.ts
│
├── data/
│   └── turnos.json
│
├── dist/
├── .env.example
├── .gitignore
├── .nvmrc
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```


## Ejecución

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

El servidor se ejecuta por defecto en:

http://localhost:3000

En consola se informa el inicio del servidor y la cantidad de turnos aceptados y rechazados durante la inicialización.

Verás en consola:

```text
🚀 Servidor corriendo en puerto 3000
✅ Turnos aceptados: X | ❌ Turnos rechazados: Y
```

### Modo producción

```bash
npm run build
npm start
```

# Refactorización de Controllers - Trabajo 3

Como parte de la Actividad 2 se realizó una refactorización de la API para separar la lógica de manejo de las solicitudes HTTP mediante Controllers.

La estructura de Controllers quedó organizada de la siguiente manera:

```text
src/controllers/
├── general.controller.ts
├── medicos.controller.ts
└── turnos.controller.ts
```

## Controller General

El Controller General se encarga de:

- Gestionar el endpoint `GET /` para responder `Hello World`.
- Gestionar las rutas inexistentes mediante una respuesta `404`.

## Controllers de recursos

Se utilizaron Controllers independientes para los recursos:

- `medicos.controller.ts`
- `turnos.controller.ts`

Cada método exportado de los Controllers fue declarado como función `async`.

Además, se incorporaron las siguientes características:

- Variable `status` para definir el código HTTP de respuesta.
- Validaciones antes de realizar las operaciones.
- Manejo de errores mediante `try-catch`.
- Uso de `AppError` para estandarizar los errores.
- Retorno explícito de las respuestas HTTP.
- Separación entre rutas, controllers y services.

La lógica de negocio continúa siendo responsabilidad de los Services, mientras que los Controllers gestionan las solicitudes y respuestas HTTP.

## Manejo centralizado de errores

Los errores son enviados al middleware centralizado `errorHandler`, que devuelve respuestas con una estructura uniforme:

```json
{
  "status": 400,
  "message": "Error de validación en los datos ingresados",
  "code": "VALIDATION_ERROR",
  "details": []
}
```

Los principales códigos utilizados son:

- `200` — Operación exitosa.
- `201` — Recurso creado.
- `204` — Operación exitosa sin contenido.
- `400` — Error de validación.
- `404` — Recurso o ruta no encontrada.
- `500` — Error interno del servidor.

# Endpoints REST

## Controller General

### GET `/`

Endpoint de bienvenida de la API.

Respuesta:

```json
{
  "message": "Hello World"
}
```

### Ruta inexistente

Cualquier ruta que no esté contemplada por la aplicación es gestionada por el Controller General.

Ejemplo:

```http
GET /pepito
```

Respuesta:

```json
{
  "status": 404,
  "message": "Ruta no encontrada",
  "code": "ROUTE_NOT_FOUND",
  "details": []
}
```

## Recurso Turnos

### GET `/turnos`

Obtiene todos los turnos registrados.

Respuesta:

```json
[
  {
    "id": 102,
    "paciente": "Carlos Ruiz",
    "documento": "31654210",
    "especialidad": "Pediatría",
    "fecha": "14/08/2026",
    "hora": "10:00",
    "confirmado": true,
    "medicoId": 1
  },
  {
    "id": 103,
    "paciente": "María López",
    "documento": "40123456",
    "especialidad": "Odontología",
    "fecha": "15/08/2026",
    "hora": "14:30",
    "confirmado": false,
    "medicoId": 2
  }
]
```

### GET `/turnos/:id`

Obtiene un turno mediante su identificador.

Ejemplo:

```http
GET /turnos/102
```

Si el turno existe, responde:

```text
200 OK
```

Si el identificador no existe, responde:

```text
404 Not Found
```

### POST `/turnos`

Crea un nuevo turno.

Ejemplo:

```http
POST /turnos
```

Body:

```json
{
  "id": 104,
  "paciente": "Pedro González",
  "documento": "35123456",
  "especialidad": "Nutrición",
  "fecha": "16/08/2026",
  "hora": "16:00",
  "confirmado": false,
  "medicoId": 1
}
```

Si los datos son válidos, responde:

```text
201 Created
```

Si los datos enviados son incompletos o inválidos, responde:

```text
400 Bad Request
```

### PUT `/turnos/:id`

Actualiza un turno existente.

Ejemplo:

```http
PUT /turnos/104
```

Body:

```json
{
  "paciente": "Pedro González",
  "documento": "35123456",
  "especialidad": "Nutrición",
  "fecha": "16/08/2026",
  "hora": "17:00",
  "confirmado": true,
  "medicoId": 1
}
```

Si el turno existe y los datos son válidos, responde:

```text
200 OK
```

Si el identificador no existe, responde:

```text
404 Not Found
```

Si los datos enviados son inválidos, responde:

```text
400 Bad Request
```


### DELETE `/turnos/:id`

Elimina un turno existente.

Ejemplo:

```http
DELETE /turnos/104
```

Si el turno existe y se elimina correctamente, responde:

```text
204 No Content
```

Si el identificador no existe, responde:

```text
404 Not Found
```

## Recurso Médicos

### GET `/medicos`

Obtiene todos los médicos registrados.

Respuesta:

```json
[
  {
    "id": 1,
    "nombre": "Dra. Laura Gómez",
    "documento": "30111222",
    "especialidad": "Clínica Médica",
    "disponible": true
  },
  {
    "id": 2,
    "nombre": "Dr. Martín Pérez",
    "documento": "32444555",
    "especialidad": "Pediatría",
    "disponible": true
  }
]
```

  ### GET `/medicos/:id`

Obtiene un médico mediante su identificador.

Ejemplo:

```http
GET /medicos/1
```

Si el médico existe, responde:

```text
200 OK
```

Si el identificador no existe, responde:

```text
404 Not Found
```




### POST `/medicos`

Crea un nuevo médico.

Ejemplo:

```http
POST /medicos
```

Body:

```json
{
  "nombre": "Dr. Juan Rodríguez",
  "documento": "33777888",
  "especialidad": "Pediatría",
  "disponible": true
}
```

Si los datos son válidos, responde:

```text
201 Created
```

Si los datos enviados son incompletos o inválidos, responde:

```text
400 Bad Request
```

### PUT `/medicos/:id`

Actualiza un médico existente.

Ejemplo:

```http
PUT /medicos/3
```

Body:

```json
{
  "nombre": "Dr. Juan Rodríguez",
  "documento": "33777888",
  "especialidad": "Pediatría",
  "disponible": false
}
```

Si el médico existe y los datos son válidos, responde:

```text
200 OK
```

Si el identificador no existe, responde:

```text
404 Not Found
```

Si los datos enviados son inválidos, responde:

```text
400 Bad Request
```

### DELETE `/medicos/:id`

Elimina un médico existente.

Ejemplo:

```http
DELETE /medicos/3
```

Si el médico existe y se elimina correctamente, responde:

```text
204 No Content
```

Si el identificador no existe, responde:

```text
404 Not Found
```