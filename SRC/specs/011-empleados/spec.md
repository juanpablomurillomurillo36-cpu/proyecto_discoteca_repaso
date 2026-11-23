# Feature Specification: Empleados y categorías de empleados

**Feature Branch**: `011-empleados`  
**Created**: 2026-11-21  
**Status**: Draft  
**Proyecto**: Sistema de Gestión Integral para Discoteca (Discoteca (Envigado)) · **SRS**: `SRS-Discoteca-v2.0.md` §4.11 · **Historias**: HU-67 – HU-75  
**Input**: "Gestiona las categorías del personal y la información de los empleados, que se programan en la agenda y se asignan a servicios y eventos. Actores: Administrador."

> Spec generada a partir del SRS v2.0 y de las historias de usuario del proyecto. Respeta la estructura de `spec-template.md` de spec-kit; los encabezados van en español con su equivalente en inglés. Antes de `/speckit.plan`, ejecute `/speckit.clarify` si hay marcas `[NEEDS CLARIFICATION]`.

## Escenarios de usuario y pruebas (User Scenarios & Testing) *(obligatorio)*

### Historia 1 — Registrar una categoría de empleado (Prioridad: P2) · HU-67

**Como** Administrador, **quiero** registrar categorías de empleado como DJ, Mesero, Ingreso y Administrativo, **para** clasificar al personal según sus funciones.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite clasificar al personal según sus funciones.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/categorias-empleados` y en la pantalla «Empleados › Categorías › Nueva categoría», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el nombre «Bartender», una descripción y estado activo, **cuando** guardo, **entonces** veo el mensaje de confirmación.
2. **Dado** un nombre ya usado, **cuando** guardo, **entonces** veo un error claro (409).

### Historia 2 — Consultar las categorías de empleado (Prioridad: P3) · HU-68

**Como** Administrador, **quiero** buscar una categoría por nombre o id y ver su información, **para** verificar sus detalles.

**Por qué esta prioridad (Why this priority)**: Prioridad Baja en el backlog del proyecto. Aporta valor porque permite verificar sus detalles.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/categorias-empleados?q`, `GET /api/v1/categorias-empleados/:id` y en la pantalla «Empleados › Categorías», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el buscador, **cuando** busco «dj», **entonces** veo nombre, descripción, estado y número de empleados; si no existe, veo un mensaje.

### Historia 3 — Actualizar una categoría de empleado (Prioridad: P3) · HU-69

**Como** Administrador, **quiero** modificar nombre, descripción y estado de una categoría, **para** mantenerla actualizada.

**Por qué esta prioridad (Why this priority)**: Prioridad Baja en el backlog del proyecto. Aporta valor porque permite mantenerla actualizada.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PUT /api/v1/categorias-empleados/:id` y en la pantalla «Empleados › Categorías › Editar», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** una categoría, **cuando** cambio su descripción y guardo, **entonces** veo el mensaje de confirmación.
2. **Dado** cambios sin guardar, **cuando** pulso «Cancelar», **entonces** se descartan (anulación de cambios).
3. **Dado** un nombre repetido, **cuando** guardo, **entonces** veo un error.

### Historia 4 — Cambiar el estado de una categoría de empleado (Prioridad: P3) · HU-70

**Como** Administrador, **quiero** activar o inactivar una categoría de empleado, **para** controlar su visibilidad.

**Por qué esta prioridad (Why this priority)**: Prioridad Baja en el backlog del proyecto. Aporta valor porque permite controlar su visibilidad.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PATCH /api/v1/categorias-empleados/:id/estado` y en la pantalla «Empleados › Categorías (Cambiar estado)», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** una categoría activa, **cuando** la inactivo, **entonces** se registra fecha y hora y no se ofrece al registrar empleados.

### Historia 5 — Registrar un empleado (Prioridad: P1) · HU-71

**Como** Administrador, **quiero** registrar a un empleado con sus datos y su categoría, **para** gestionar su información y programarlo.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite gestionar su información y programarlo.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/empleados` y en la pantalla «Empleados › Nuevo empleado», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** nombre, apellido, documento, fecha de nacimiento válida (mayor de edad), contacto, categoría DJ y fecha de ingreso, **cuando** guardo, **entonces** el empleado queda activo con id único, fecha y hora de registro y veo el mensaje de confirmación.
2. **Dado** un documento ya registrado o una fecha de nacimiento inválida, **cuando** guardo, **entonces** el sistema lo señala.
3. **Dado** que el empleado necesita usar el sistema, **cuando** marco «Crear usuario» con un rol, **entonces** se crea su usuario vinculado.

### Historia 6 — Consultar empleados (Prioridad: P1) · HU-72

**Como** Administrador, **quiero** buscar y listar empleados con filtros, **para** acceder a sus datos.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite acceder a sus datos.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/empleados?q&categoria&estado&sort&page&limit`, `GET /api/v1/empleados/:id` y en la pantalla «Empleados (listado y detalle)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el buscador, **cuando** busco por nombre, apellido, documento o id, **entonces** veo los coincidentes con categoría y estado, ordenables y filtrables por categoría y estado.
2. **Dado** una búsqueda sin coincidencias, **cuando** la ejecuto, **entonces** veo un mensaje.

### Historia 7 — Actualizar un empleado (Prioridad: P2) · HU-73

**Como** Administrador, **quiero** modificar la información personal y laboral de un empleado, **para** mantenerla actualizada.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite mantenerla actualizada.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PUT /api/v1/empleados/:id` y en la pantalla «Empleados › Editar», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un empleado, **cuando** cambio su teléfono y su categoría y guardo, **entonces** veo el mensaje de confirmación y el cambio queda en su historial con fecha y hora.

### Historia 8 — Cambiar el estado de un empleado (Prioridad: P2) · HU-74

**Como** Administrador, **quiero** activar o inactivar a un empleado, **para** reflejar su situación laboral.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite reflejar su situación laboral.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PATCH /api/v1/empleados/:id/estado` y en la pantalla «Empleados (Cambiar estado)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un empleado activo, **cuando** confirmo su inactivación, **entonces** su estado se muestra en el perfil, se registra fecha y hora y su usuario (si tiene) queda inactivo.
2. **Dado** turnos futuros del empleado, **cuando** lo inactivo, **entonces** veo la lista de turnos afectados.

### Historia 9 — Generar el reporte de empleados (Prioridad: P3) · HU-75

**Como** Administrador, **quiero** generar reportes de empleados por categoría y estado, **para** obtener información estadística.

**Por qué esta prioridad (Why this priority)**: Prioridad Baja en el backlog del proyecto. Aporta valor porque permite obtener información estadística.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/reportes/empleados?categoria&estado&formato` y en la pantalla «Empleados › Reporte», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** filtros de categoría y estado, **cuando** genero el reporte, **entonces** descargo un PDF o CSV con los empleados y los totales por categoría.

### Casos límite (Edge Cases)

- Inactivar un empleado con turnos futuros: el sistema lista los turnos afectados y pide reasignarlos o cancelarlos.

## Requerimientos (Requirements) *(obligatorio)*

### Requerimientos funcionales (Functional Requirements)

- **FR-001**: El sistema DEBE registrar categorías de empleado con nombre único, descripción y estado inicial. *(RF-EMP-01 · HU-67)*
- **FR-002**: El sistema DEBE buscar categorías de empleado por nombre o id y mostrar nombre, descripción, estado y número de empleados. *(RF-EMP-02 · HU-68)*
- **FR-003**: El sistema DEBE actualizar nombre, descripción y estado de la categoría validando que el nombre no esté en uso y permitir descartar los cambios antes de guardar. *(RF-EMP-03 · HU-69)*
- **FR-004**: El sistema DEBE cambiar el estado de la categoría registrando fecha y hora e impedir asignar empleados a categorías inactivas. *(RF-EMP-04 · HU-70)*
- **FR-005**: El sistema DEBE registrar empleados con nombre, apellido, documento único, fecha de nacimiento (mayor de edad), contacto, categoría activa y fecha de ingreso, en estado activo. *(RF-EMP-05 · HU-71)*
- **FR-006**: El sistema DEBE permitir crear y vincular el usuario del sistema del empleado. *(RF-EMP-06 · HU-71)*
- **FR-007**: El sistema DEBE buscar empleados por nombre, apellido, documento o id, con lista ordenable y filtrable por categoría y estado. *(RF-EMP-07 · HU-72)*
- **FR-008**: El sistema DEBE actualizar la información personal y la categoría del empleado, validándola y registrando cada cambio en su historial. *(RF-EMP-08 · HU-73)*
- **FR-009**: El sistema DEBE cambiar el estado del empleado con confirmación, registrar fecha y hora, inactivar su usuario vinculado y listar sus turnos futuros afectados. *(RF-EMP-09 · HU-74)*
- **FR-010**: El sistema DEBE generar el reporte de empleados filtrable por categoría y estado con totales, en PDF y CSV. *(RF-EMP-10 · HU-75)*

### Requerimientos no funcionales aplicables

Aplican todos los principios de `constitution.md` y los RNF transversales del SRS §5. En particular:

- **RNF-PRI-01**: Los formularios de registro de clientes y empleados deben mostrar el aviso de privacidad y exigir la autorización de tratamiento de datos (Ley 1581 de 2012); la autorización para recibir promociones debe ser una casilla aparte, desmarcada por defecto.
- **RNF-PRI-02**: Un Cliente solo accede a su propia información; los reportes y listados con datos de otros clientes, ventas o empleados solo están disponibles para roles internos con permiso.

### Entidades clave (Key Entities)

- **CategoriaEmpleado**: Tipo de puesto. Atributos: id_categoria, nombre, descripcion, estado, updated_at.
- **Empleado**: Persona del equipo. Atributos: id_empleado, nombre, apellido, tipo_documento, numero_documento, fecha_nacimiento, telefono, correo, direccion, id_categoria, fecha_ingreso, id_usuario, estado, created_at, updated_at.
- **HistorialEmpleado**: Cambios. Atributos: id_historial, id_empleado, campo, valor_anterior, valor_nuevo, id_usuario, fecha.

## Criterios de éxito (Success Criteria) *(obligatorio)*

### Resultados medibles (Measurable Outcomes)

- **SC-001**: El 100 % de los cambios en la información de los empleados queda en su historial.

## Supuestos (Assumptions)

- Se implementa después de (o junto con) las specs: 002-gestion-usuarios.
- La autenticación JWT y la autorización por permisos están disponibles (spec de acceso); mientras no lo estén, los endpoints se prueban con un usuario semilla.

## Insumos para `/speckit.plan` (no normativo)

Detalle orientativo para el plan técnico. No reemplaza las decisiones del plan, pero cualquier desviación debe quedar justificada en `plan.md`.

**API REST sugerida** (base `/api/v1`, sobre `{ ok, data, meta, error }`):

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/categorias-empleados` | Registrar una categoría de empleado | HU-67 |
| GET | `/api/v1/categorias-empleados?q` | Consultar las categorías de empleado | HU-68 |
| GET | `/api/v1/categorias-empleados/:id` | Consultar detalle (categorias-empleados) | HU-68 |
| PUT | `/api/v1/categorias-empleados/:id` | Actualizar una categoría de empleado | HU-69 |
| PATCH | `/api/v1/categorias-empleados/:id/estado` | Cambiar el estado de una categoría de empleado | HU-70 |
| POST | `/api/v1/empleados` | Registrar un empleado | HU-71 |
| GET | `/api/v1/empleados?q&categoria&estado&sort&page&limit` | Consultar empleados | HU-72 |
| GET | `/api/v1/empleados/:id` | Consultar detalle (empleados) | HU-72 |
| PUT | `/api/v1/empleados/:id` | Actualizar un empleado | HU-73 |
| PATCH | `/api/v1/empleados/:id/estado` | Cambiar el estado de un empleado | HU-74 |
| GET | `/api/v1/reportes/empleados?categoria&estado&formato` | Generar el reporte de empleados | HU-75 |

**Pantallas (frontend vanilla):**

- Empleados › Categorías › Nueva categoría — HU-67
- Empleados › Categorías — HU-68
- Empleados › Categorías › Editar — HU-69
- Empleados › Categorías (Cambiar estado) — HU-70
- Empleados › Nuevo empleado — HU-71
- Empleados (listado y detalle) — HU-72
- Empleados › Editar — HU-73
- Empleados (Cambiar estado) — HU-74
- Empleados › Reporte — HU-75

**Modelo de datos (lógico):**

*CategoriaEmpleado*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_categoria | INT | PK |
| nombre | VARCHAR(50) | único |
| descripcion | VARCHAR(200) |  |
| estado | ENUM('activa','inactiva') |  |
| updated_at | DATETIME |  |

*Empleado*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_empleado | INT | PK |
| nombre | VARCHAR(60) |  |
| apellido | VARCHAR(60) |  |
| tipo_documento | ENUM('CC','CE','PPT') |  |
| numero_documento | VARCHAR(15) | único |
| fecha_nacimiento | DATE | edad ≥ 18 |
| telefono | VARCHAR(10) |  |
| correo | VARCHAR(100) |  |
| direccion | VARCHAR(120) |  |
| id_categoria | INT | FK, activa |
| fecha_ingreso | DATE |  |
| id_usuario | INT | FK, opcional |
| estado | ENUM('activo','inactivo') |  |
| created_at | DATETIME |  |
| updated_at | DATETIME |  |

*HistorialEmpleado*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_historial | INT | PK |
| id_empleado | INT | FK |
| campo | VARCHAR(40) |  |
| valor_anterior | VARCHAR(200) |  |
| valor_nuevo | VARCHAR(200) |  |
| id_usuario | INT | FK |
| fecha | DATETIME |  |

**Reglas de negocio:**

- **RN-18**: No se asignan empleados a categorías inactivas; un empleado inactivo no se programa en la agenda; la información salarial está fuera del alcance.

## Trazabilidad

| Historia spec | HU | RF | Excel |
|---|---|---|---|
| 1 | HU-67 | RF-EMP-01 | HU_85 |
| 2 | HU-68 | RF-EMP-02 | HU_86 |
| 3 | HU-69 | RF-EMP-03 | HU_87 |
| 4 | HU-70 | RF-EMP-04 | HU_88 |
| 5 | HU-71 | RF-EMP-05, RF-EMP-06 | HU_89 |
| 6 | HU-72 | RF-EMP-07 | HU_90 |
| 7 | HU-73 | RF-EMP-08 | HU_91 |
| 8 | HU-74 | RF-EMP-09 | HU_92 |
| 9 | HU-75 | RF-EMP-10 | HU_93 |

