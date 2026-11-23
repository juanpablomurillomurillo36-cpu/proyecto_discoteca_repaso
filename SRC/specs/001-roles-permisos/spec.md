# Feature Specification: Roles y permisos

**Feature Branch**: `001-roles-permisos`  
**Created**: 2026-11-21  
**Status**: Draft  
**Proyecto**: Sistema de Gestión Integral para Discoteca (Discoteca (Envigado)) · **SRS**: `SRS-Discoteca-v2.0.md` §4.1 · **Historias**: HU-01 – HU-09  
**Input**: "Administra los roles (Administrador, Empleado, Cliente y los que se creen, p. ej. Mesero, Personal de ingreso) y sus permisos, con auditoría de cambios. Actores: Administrador."

> Spec generada a partir del SRS v2.0 y de las historias de usuario del proyecto. Respeta la estructura de `spec-template.md` de spec-kit; los encabezados van en español con su equivalente en inglés. Antes de `/speckit.plan`, ejecute `/speckit.clarify` si hay marcas `[NEEDS CLARIFICATION]`.

## Escenarios de usuario y pruebas (User Scenarios & Testing) *(obligatorio)*

### Historia 1 — Registrar un rol (Prioridad: P1) · HU-01

**Como** Administrador, **quiero** registrar un rol con nombre único y sus permisos, **para** controlar el acceso a las funcionalidades.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite controlar el acceso a las funcionalidades.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/roles` y en la pantalla «Configuración › Roles › Nuevo rol», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el nombre «Mesero», una descripción y los permisos pedidos.crear y pedidos.ver, **cuando** guardo, **entonces** el rol queda activo con fecha y hora de creación y veo «Rol registrado correctamente».
2. **Dado** un nombre ya existente (sin importar mayúsculas), **cuando** guardo, **entonces** el sistema responde «Ya existe un rol con ese nombre» (409).
3. **Dado** que no selecciono ningún permiso, **cuando** guardo, **entonces** el sistema lo impide indicando que el rol necesita al menos un permiso.

### Historia 2 — Consultar un rol (Prioridad: P2) · HU-02

**Como** Administrador, **quiero** buscar un rol por su nombre y ver su información, **para** revisar los roles configurados.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite revisar los roles configurados.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/roles?q`, `GET /api/v1/roles/:id` y en la pantalla «Configuración › Roles › Detalle», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el buscador, **cuando** escribo «mese» o «MESE», **entonces** veo el rol Mesero con su descripción, estado, fechas y permisos.
2. **Dado** un nombre inexistente, **cuando** busco, **entonces** veo «No se encontró el rol».

### Historia 3 — Actualizar un rol (Prioridad: P1) · HU-03

**Como** Administrador, **quiero** modificar el nombre y los permisos de un rol, **para** ajustar el acceso de quienes lo tienen.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite ajustar el acceso de quienes lo tienen.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PUT /api/v1/roles/:id` y en la pantalla «Configuración › Roles › Editar», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el rol Mesero, **cuando** agrego el permiso ventas.crear y guardo, **entonces** sus usuarios obtienen ese acceso en su siguiente petición y veo «Rol actualizado correctamente».
2. **Dado** que cambio el nombre por uno que ya existe, **cuando** guardo, **entonces** el sistema responde 409.

### Historia 4 — Cambiar el estado de un rol (Prioridad: P1) · HU-04

**Como** Administrador, **quiero** activar o inactivar un rol, **para** habilitar o deshabilitar el acceso de quienes lo tienen.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite habilitar o deshabilitar el acceso de quienes lo tienen.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PATCH /api/v1/roles/:id/estado` y en la pantalla «Configuración › Roles (interruptor de estado)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un rol activo sin usuarios activos, **cuando** lo inactivo y confirmo, **entonces** su etiqueta cambia a Inactivo y veo el mensaje de confirmación.
2. **Dado** un rol base o con usuarios activos, **cuando** intento inactivarlo, **entonces** el sistema lo impide indicando la causa (409).

### Historia 5 — Listar roles (Prioridad: P2) · HU-05

**Como** Administrador, **quiero** ver todos los roles con su estado, **para** tener una visión general de la configuración.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite tener una visión general de la configuración.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/roles?page&limit&sort` y en la pantalla «Configuración › Roles (listado)», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** roles registrados, **cuando** abro Roles, **entonces** veo nombre, número de permisos, número de usuarios y estado, paginados de 10 en 10 y ordenables por nombre y estado.

### Historia 6 — Registrar un permiso (Prioridad: P2) · HU-06

**Como** Administrador, **quiero** registrar un permiso con nombre único y descripción, **para** controlar con detalle las funcionalidades.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite controlar con detalle las funcionalidades.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/permisos`, `GET /api/v1/permisos?modulo&q` y en la pantalla «Configuración › Permisos», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el nombre «puntos.canjear» y su descripción, **cuando** guardo, **entonces** el permiso queda activo con fecha y hora de creación y veo el mensaje de confirmación.
2. **Dado** un nombre ya registrado, **cuando** guardo, **entonces** el sistema responde 409.

### Historia 7 — Consultar los permisos de cada rol (Prioridad: P2) · HU-07

**Como** Administrador, **quiero** ver los permisos de cada rol organizados por módulo, **para** controlar la seguridad del aplicativo.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite controlar la seguridad del aplicativo.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/roles/:id/permisos` y en la pantalla «Configuración › Roles › Permisos (matriz)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un rol, **cuando** abro su matriz de permisos, **entonces** veo todos los permisos agrupados por módulo con una casilla marcada en los que tiene.
2. **Dado** la matriz, **cuando** marco o desmarco permisos y guardo, **entonces** la asignación se actualiza (ver HU-09).

### Historia 8 — Cambiar el estado de un permiso (Prioridad: P3) · HU-08

**Como** Administrador, **quiero** activar o inactivar un permiso, **para** retirar funcionalidades que ya no se usan.

**Por qué esta prioridad (Why this priority)**: Prioridad Baja en el backlog del proyecto. Aporta valor porque permite retirar funcionalidades que ya no se usan.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PATCH /api/v1/permisos/:id/estado` y en la pantalla «Configuración › Permisos (Cambiar estado)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un permiso sin roles asociados, **cuando** lo inactivo, **entonces** deja de ofrecerse en la matriz y se notifica por correo a los demás administradores.
2. **Dado** un permiso asociado a un rol, **cuando** intento inactivarlo, **entonces** el sistema lo impide (409).

### Historia 9 — Asociar permisos a un rol (Prioridad: P1) · HU-09

**Como** Administrador, **quiero** seleccionar los permisos específicos de cada rol, **para** que cada usuario acceda solo a lo que necesita.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite que cada usuario acceda solo a lo que necesita.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PUT /api/v1/roles/:id/permisos` y en la pantalla «Configuración › Roles › Permisos (Guardar)», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el rol Personal de ingreso, **cuando** le asocio ingresos.registrar e ingresos.ver y guardo, **entonces** la asignación persiste y queda auditada con quién, cuándo y qué cambió.
2. **Dado** que intento dejar el rol sin permisos, **cuando** guardo, **entonces** veo un mensaje de error.
3. **Dado** un permiso ya asociado, **cuando** intento asociarlo de nuevo, **entonces** el sistema no lo duplica.

### Casos límite (Edge Cases)

- Se inactiva un rol mientras sus usuarios tienen sesión: la siguiente petición de esos usuarios responde 403.
- Dos administradores editan el mismo rol a la vez: gana el último que guarda y ambos cambios quedan en la bitácora.

## Requerimientos (Requirements) *(obligatorio)*

### Requerimientos funcionales (Functional Requirements)

- **FR-001**: El sistema DEBE registrar roles con nombre único (sin distinguir mayúsculas), descripción y al menos un permiso, en estado activo, con fecha y hora de creación. *(RF-ROL-01 · HU-01)*
- **FR-002**: El sistema DEBE buscar roles por nombre sin distinguir mayúsculas y mostrar su descripción, estado, fechas de creación y modificación y permisos. *(RF-ROL-02 · HU-02)*
- **FR-003**: El sistema DEBE actualizar el nombre y los permisos de un rol, validando que el nombre no esté duplicado y que conserve al menos un permiso. *(RF-ROL-03 · HU-03)*
- **FR-004**: El sistema DEBE aplicar los cambios de permisos a los usuarios del rol desde su siguiente petición. *(RF-ROL-04 · HU-03)*
- **FR-005**: El sistema DEBE cambiar el estado de un rol entre activo e inactivo con confirmación, mostrando su estado actual. *(RF-ROL-05 · HU-04)*
- **FR-006**: El sistema DEBE negar el acceso a todas las funcionalidades a los usuarios cuyo rol esté inactivo. *(RF-ROL-06 · HU-04)*
- **FR-007**: El sistema DEBE listar los roles con nombre, número de permisos, número de usuarios y estado, paginados y ordenables por nombre y estado. *(RF-ROL-07 · HU-05)*
- **FR-008**: El sistema DEBE registrar permisos con nombre único con formato modulo.accion, descripción y módulo, registrando fecha y hora de creación. *(RF-ROL-08 · HU-06)*
- **FR-009**: El sistema DEBE agrupar los permisos por módulo y permitir filtrarlos para manejar un número grande de ellos. *(RF-ROL-09 · HU-06)*
- **FR-010**: El sistema DEBE mostrar, para cada rol, los permisos agrupados por módulo con su estado de asignación, permitiendo marcar y desmarcar permisos individualmente. *(RF-ROL-10 · HU-07)*
- **FR-011**: El sistema DEBE permitir solo al Administrador cambiar el estado de permisos que no estén asociados a ningún rol. *(RF-ROL-11 · HU-08)*
- **FR-012**: El sistema DEBE notificar por correo a los demás administradores la inactivación de un permiso. *(RF-ROL-12 · HU-08)*
- **FR-013**: El sistema DEBE asociar permisos activos a un rol, impidiendo asignaciones repetidas y roles sin permisos. *(RF-ROL-13 · HU-09)*
- **FR-014**: El sistema DEBE auditar cada cambio de asignación con usuario, fecha y hora, permisos agregados y retirados. *(RF-ROL-14 · HU-09)*

### Requerimientos no funcionales aplicables

Aplican todos los principios de `constitution.md` y los RNF transversales del SRS §5. En particular:

- **RNF-SEG-04**: Cada operación debe verificar en el servidor el permiso del rol y responder 403 con «Acceso denegado» cuando no lo tenga.
- **RNF-SEG-07**: El sistema debe registrar en una bitácora (usuario, fecha y hora, acción, valores anterior y nuevo) los inicios de sesión, los cambios de roles y permisos, los cambios de estado, los ajustes de existencias, los movimientos de puntos y las anulaciones y eliminaciones.

### Entidades clave (Key Entities)

- **Rol**: Perfil de acceso. Atributos: id_rol, nombre, descripcion, estado, created_at, updated_at.
- **Permiso**: Permiso del catálogo. Atributos: id_permiso, nombre, descripcion, modulo, estado, created_at.
- **RolPermiso**: Permisos del rol. Atributos: id_rol, id_permiso, PK compuesta.

## Criterios de éxito (Success Criteria) *(obligatorio)*

### Resultados medibles (Measurable Outcomes)

- **SC-001**: El Administrador crea un rol con sus permisos en menos de 2 minutos.
- **SC-002**: El 100 % de los cambios de permisos queda auditado (quién, cuándo y qué).

## Supuestos (Assumptions)

- La autenticación JWT y la autorización por permisos están disponibles (spec de acceso); mientras no lo estén, los endpoints se prueban con un usuario semilla.

## Insumos para `/speckit.plan` (no normativo)

Detalle orientativo para el plan técnico. No reemplaza las decisiones del plan, pero cualquier desviación debe quedar justificada en `plan.md`.

**API REST sugerida** (base `/api/v1`, sobre `{ ok, data, meta, error }`):

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/roles` | Registrar un rol | HU-01 |
| GET | `/api/v1/roles?q` | Consultar un rol | HU-02 |
| GET | `/api/v1/roles/:id` | Consultar detalle (roles) | HU-02 |
| PUT | `/api/v1/roles/:id` | Actualizar un rol | HU-03 |
| PATCH | `/api/v1/roles/:id/estado` | Cambiar el estado de un rol | HU-04 |
| GET | `/api/v1/roles?page&limit&sort` | Listar roles | HU-05 |
| POST | `/api/v1/permisos` | Registrar un permiso | HU-06 |
| GET | `/api/v1/permisos?modulo&q` | Listar o consultar permisos | HU-06 |
| GET | `/api/v1/roles/:id/permisos` | Consultar los permisos de cada rol | HU-07 |
| PATCH | `/api/v1/permisos/:id/estado` | Cambiar el estado de un permiso | HU-08 |
| PUT | `/api/v1/roles/:id/permisos` | Asociar permisos a un rol | HU-09 |

**Pantallas (frontend vanilla):**

- Configuración › Roles › Nuevo rol — HU-01
- Configuración › Roles › Detalle — HU-02
- Configuración › Roles › Editar — HU-03
- Configuración › Roles (interruptor de estado) — HU-04
- Configuración › Roles (listado) — HU-05
- Configuración › Permisos — HU-06
- Configuración › Roles › Permisos (matriz) — HU-07
- Configuración › Permisos (Cambiar estado) — HU-08
- Configuración › Roles › Permisos (Guardar) — HU-09

**Modelo de datos (lógico):**

*Rol*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_rol | INT | PK |
| nombre | VARCHAR(40) | obligatorio, único |
| descripcion | VARCHAR(150) |  |
| estado | ENUM('activo','inactivo') | por defecto 'activo' |
| created_at | DATETIME |  |
| updated_at | DATETIME |  |

*Permiso*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_permiso | INT | PK |
| nombre | VARCHAR(60) | único (p. ej. ventas.crear) |
| descripcion | VARCHAR(150) |  |
| modulo | VARCHAR(40) |  |
| estado | ENUM('activo','inactivo') |  |
| created_at | DATETIME |  |

*RolPermiso*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_rol | INT | FK |
| id_permiso | INT | FK |
| PK compuesta |  |  |

**Reglas de negocio:**

- **RN-01**: El sistema arranca con los roles base Administrador, Empleado y Cliente; un usuario tiene un solo rol y un rol inactivo no da acceso a ninguna funcionalidad.
- **RN-03**: Un rol debe tener al menos un permiso y no puede tener el mismo permiso dos veces; un permiso asociado a algún rol no se inactiva.
- **RN-04**: Los roles base no se inactivan; un rol con usuarios activos no se inactiva.

**Validaciones de campos por historia:**

- HU-01: nombre (3–40, único); descripcion (≤150); permisos (≥1, sin repetidos)

## Trazabilidad

| Historia spec | HU | RF | Excel |
|---|---|---|---|
| 1 | HU-01 | RF-ROL-01 | HU_01 |
| 2 | HU-02 | RF-ROL-02 | HU_02 |
| 3 | HU-03 | RF-ROL-03, RF-ROL-04 | HU_03 |
| 4 | HU-04 | RF-ROL-05, RF-ROL-06 | HU_04 |
| 5 | HU-05 | RF-ROL-07 | HU_05 |
| 6 | HU-06 | RF-ROL-08, RF-ROL-09 | HU_06 |
| 7 | HU-07 | RF-ROL-10 | HU_07 |
| 8 | HU-08 | RF-ROL-11, RF-ROL-12 | HU_08 |
| 9 | HU-09 | RF-ROL-13, RF-ROL-14 | HU_09 |

