# Feature Specification: Gestión de usuarios

**Feature Branch**: `002-gestion-usuarios`  
**Created**: 2026-11-21  
**Status**: Draft  
**Proyecto**: Sistema de Gestión Integral para Discoteca (Discoteca (Envigado)) · **SRS**: `SRS-Discoteca-v2.0.md` §4.2 · **Historias**: HU-10 – HU-14  
**Input**: "Administra las cuentas de acceso del personal y de los clientes registrados. Actores: Administrador."

> Spec generada a partir del SRS v2.0 y de las historias de usuario del proyecto. Respeta la estructura de `spec-template.md` de spec-kit; los encabezados van en español con su equivalente en inglés. Antes de `/speckit.plan`, ejecute `/speckit.clarify` si hay marcas `[NEEDS CLARIFICATION]`.

## Escenarios de usuario y pruebas (User Scenarios & Testing) *(obligatorio)*

### Historia 1 — Registrar un usuario (Prioridad: P1) · HU-10

**Como** Administrador, **quiero** registrar un usuario con nombre de usuario, correo, contraseña, rol y estado, **para** controlar su acceso al sistema.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite controlar su acceso al sistema.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/usuarios` y en la pantalla «Configuración › Usuarios › Nuevo usuario», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** datos válidos y una contraseña que cumple la política, **cuando** guardo, **entonces** el usuario queda registrado y veo el mensaje de confirmación.
2. **Dado** un nombre de usuario o correo ya registrado, **cuando** guardo, **entonces** el sistema responde 409 indicando el campo.
3. **Dado** una contraseña sin carácter especial, **cuando** guardo, **entonces** el sistema indica la política incumplida (422).

### Historia 2 — Consultar usuarios (Prioridad: P1) · HU-11

**Como** Administrador, **quiero** buscar usuarios y ver su información, **para** verificar sus datos.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite verificar sus datos.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/usuarios?q&page&limit&rol&estado`, `GET /api/v1/usuarios/:id` y en la pantalla «Configuración › Usuarios (listado y detalle)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el buscador, **cuando** busco por nombre de usuario, correo o id, **entonces** veo los coincidentes paginados.
2. **Dado** un usuario, **cuando** abro su detalle, **entonces** veo nombre de usuario, nombre, correo, rol, estado, fecha de registro y última actualización, sin la contraseña.

### Historia 3 — Actualizar un usuario (Prioridad: P2) · HU-12

**Como** Administrador, **quiero** modificar la información de un usuario, **para** mantenerla precisa.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite mantenerla precisa.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PUT /api/v1/usuarios/:id` y en la pantalla «Configuración › Usuarios › Editar», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un usuario, **cuando** cambio su correo y rol y guardo, **entonces** veo «Usuario actualizado correctamente» y queda la fecha y hora de la actualización.
2. **Dado** el campo nombre de usuario, **cuando** edito, **entonces** no es modificable.

### Historia 4 — Cambiar el estado de usuarios (Prioridad: P1) · HU-13

**Como** Administrador, **quiero** activar o inactivar uno o varios usuarios a la vez, **para** controlar quién accede.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite controlar quién accede.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PATCH /api/v1/usuarios/:id/estado`, `PATCH /api/v1/usuarios/estado` y en la pantalla «Configuración › Usuarios (Cambiar estado, selección múltiple)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un usuario activo, **cuando** lo inactivo, **entonces** no puede iniciar sesión y el cambio queda en su historial.
2. **Dado** que selecciono cinco usuarios, **cuando** aplico «Inactivar» y confirmo, **entonces** los cinco cambian de estado y veo el resultado por usuario.

### Historia 5 — Generar el reporte de usuarios (Prioridad: P3) · HU-14

**Como** Administrador, **quiero** generar un reporte de usuarios por fecha, rol y estado, **para** conocer cuántos usuarios hay y sus roles.

**Por qué esta prioridad (Why this priority)**: Prioridad Baja en el backlog del proyecto. Aporta valor porque permite conocer cuántos usuarios hay y sus roles.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/reportes/usuarios?desde&hasta&rol&estado&formato` y en la pantalla «Configuración › Usuarios › Reporte», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** filtros de rol y estado, **cuando** genero el reporte, **entonces** descargo un PDF o CSV con nombre de usuario, correo, rol, fecha de creación y estado, y los totales por rol.

### Casos límite (Edge Cases)

- Cambio masivo que incluye al propio Administrador: el sistema lo excluye y lo informa.

## Requerimientos (Requirements) *(obligatorio)*

### Requerimientos funcionales (Functional Requirements)

- **FR-001**: El sistema DEBE registrar usuarios con nombre de usuario único, nombre completo, correo único y válido, contraseña según la política, rol activo y estado. *(RF-USR-01 · HU-10)*
- **FR-002**: El sistema DEBE buscar usuarios por nombre de usuario, correo o id con resultados paginados y mostrar su detalle sin la contraseña. *(RF-USR-02 · HU-11)*
- **FR-003**: El sistema DEBE actualizar los datos del usuario excepto el nombre de usuario, validándolos y registrando fecha y hora de la última actualización. *(RF-USR-03 · HU-12)*
- **FR-004**: El sistema DEBE cambiar el estado de un usuario o de varios seleccionados en una sola operación, registrando cada cambio en el historial del usuario. *(RF-USR-04 · HU-13)*
- **FR-005**: El sistema DEBE impedir el acceso a los usuarios inactivos y la inactivación del único Administrador activo. *(RF-USR-05 · HU-13)*
- **FR-006**: El sistema DEBE generar el reporte de usuarios filtrable por fecha de creación, rol y estado, con totales por rol, descargable en PDF o CSV. *(RF-USR-06 · HU-14)*

### Requerimientos no funcionales aplicables

Aplican todos los principios de `constitution.md` y los RNF transversales del SRS §5. En particular:

- **RNF-SEG-02**: Las contraseñas deben almacenarse con bcrypt (costo 10 o mayor), cumplir mínimo 8 caracteres con mayúscula, minúscula, número y carácter especial y nunca devolverse en respuestas.

### Entidades clave (Key Entities)

- **Usuario**: Cuenta de acceso. Atributos: id_usuario, nombre_usuario, nombre_completo, correo, contrasena_hash, id_rol, estado, created_at, updated_at.
- **HistorialUsuario**: Cambios de la cuenta. Atributos: id_historial, id_usuario, accion, detalle, id_usuario_autor, fecha.

## Criterios de éxito (Success Criteria) *(obligatorio)*

### Resultados medibles (Measurable Outcomes)

- **SC-001**: El 100 % de los usuarios inactivos es rechazado al iniciar sesión.

## Supuestos (Assumptions)

- Se implementa después de (o junto con) las specs: 001-roles-permisos.
- La autenticación JWT y la autorización por permisos están disponibles (spec de acceso); mientras no lo estén, los endpoints se prueban con un usuario semilla.

## Insumos para `/speckit.plan` (no normativo)

Detalle orientativo para el plan técnico. No reemplaza las decisiones del plan, pero cualquier desviación debe quedar justificada en `plan.md`.

**API REST sugerida** (base `/api/v1`, sobre `{ ok, data, meta, error }`):

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/usuarios` | Registrar un usuario | HU-10 |
| GET | `/api/v1/usuarios?q&page&limit&rol&estado` | Consultar usuarios | HU-11 |
| GET | `/api/v1/usuarios/:id` | Consultar detalle (usuarios) | HU-11 |
| PUT | `/api/v1/usuarios/:id` | Actualizar un usuario | HU-12 |
| PATCH | `/api/v1/usuarios/:id/estado` | Cambiar el estado de usuarios | HU-13 |
| PATCH | `/api/v1/usuarios/estado` | (masivo) | HU-13 |
| GET | `/api/v1/reportes/usuarios?desde&hasta&rol&estado&formato` | Generar el reporte de usuarios | HU-14 |

**Pantallas (frontend vanilla):**

- Configuración › Usuarios › Nuevo usuario — HU-10
- Configuración › Usuarios (listado y detalle) — HU-11
- Configuración › Usuarios › Editar — HU-12
- Configuración › Usuarios (Cambiar estado, selección múltiple) — HU-13
- Configuración › Usuarios › Reporte — HU-14

**Modelo de datos (lógico):**

*Usuario*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_usuario | INT | PK |
| nombre_usuario | VARCHAR(30) | único, no modificable |
| nombre_completo | VARCHAR(100) |  |
| correo | VARCHAR(100) | único, válido |
| contrasena_hash | VARCHAR(255) |  |
| id_rol | INT | FK |
| estado | ENUM('activo','inactivo') |  |
| created_at | DATETIME |  |
| updated_at | DATETIME |  |

*HistorialUsuario*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_historial | INT | PK |
| id_usuario | INT | FK |
| accion | VARCHAR(40) |  |
| detalle | VARCHAR(300) |  |
| id_usuario_autor | INT | FK |
| fecha | DATETIME |  |

**Reglas de negocio:**

- **RN-01**: El sistema arranca con los roles base Administrador, Empleado y Cliente; un usuario tiene un solo rol y un rol inactivo no da acceso a ninguna funcionalidad.
- **RN-05**: El nombre de usuario y el correo son únicos; el nombre de usuario no se modifica; no se inactiva al único Administrador activo.

**Validaciones de campos por historia:**

- HU-10: nombre_usuario (4–30, letras, números, punto y guion bajo, único); correo (válido, único); contraseña (≥8, mayúscula, minúscula, número y carácter especial); id_rol (activo); estado

## Trazabilidad

| Historia spec | HU | RF | Excel |
|---|---|---|---|
| 1 | HU-10 | RF-USR-01 | HU_10 |
| 2 | HU-11 | RF-USR-02 | HU_10 |
| 3 | HU-12 | RF-USR-03 | HU_11 |
| 4 | HU-13 | RF-USR-04, RF-USR-05 | HU_12 |
| 5 | HU-14 | RF-USR-06 | HU_13 |

