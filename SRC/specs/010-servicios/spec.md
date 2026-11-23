# Feature Specification: Servicios

**Feature Branch**: `010-servicios`  
**Created**: 2026-11-21  
**Status**: Draft  
**Proyecto**: Sistema de Gestión Integral para Discoteca (Discoteca (Envigado)) · **SRS**: `SRS-Discoteca-v2.0.md` §4.10 · **Historias**: HU-62 – HU-66  
**Input**: "Gestiona el catálogo de servicios (alquiler de espacios y servicios adicionales como DJ, decoración, sonido, iluminación y catering) que se usan en reservas, eventos, agenda y ventas. Actores: Administrador, Empleado."

> Spec generada a partir del SRS v2.0 y de las historias de usuario del proyecto. Respeta la estructura de `spec-template.md` de spec-kit; los encabezados van en español con su equivalente en inglés. Antes de `/speckit.plan`, ejecute `/speckit.clarify` si hay marcas `[NEEDS CLARIFICATION]`.

## Escenarios de usuario y pruebas (User Scenarios & Testing) *(obligatorio)*

### Historia 1 — Registrar un servicio (Prioridad: P1) · HU-62

**Como** Administrador o Empleado, **quiero** registrar un servicio con nombre, descripción, precio, categoría e imágenes, **para** ofrecer una gama completa de servicios.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite ofrecer una gama completa de servicios.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/servicios` y en la pantalla «Servicios › Nuevo servicio», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** nombre «DJ invitado», descripción, precio $ 800.000, categoría servicio adicional e imagen, **cuando** guardo, **entonces** el servicio queda activo y veo el mensaje de confirmación.
2. **Dado** un precio con formato inválido o campos obligatorios vacíos, **cuando** guardo, **entonces** el sistema los señala.

### Historia 2 — Consultar servicios (Prioridad: P1) · HU-63

**Como** Administrador o Empleado, **quiero** buscar servicios y ver su información, **para** dar información precisa a los clientes.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite dar información precisa a los clientes.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/servicios?q&categoria&estado&page&limit`, `GET /api/v1/servicios/:id` y en la pantalla «Servicios (listado y detalle)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** la lista de servicios con su estado, **cuando** busco por nombre, parte del nombre o categoría y filtro por estado, **entonces** veo los coincidentes o un mensaje si no hay.
2. **Dado** un servicio, **cuando** lo selecciono, **entonces** veo nombre, descripción, precio, categoría, imágenes y estado.

### Historia 3 — Actualizar un servicio (Prioridad: P2) · HU-64

**Como** Administrador o Empleado, **quiero** modificar nombre, descripción, precio e imágenes de un servicio, **para** mantener su información al día.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite mantener su información al día.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PUT /api/v1/servicios/:id`, `PATCH /api/v1/servicios/:id` y en la pantalla «Servicios › Editar», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un servicio, **cuando** cambio solo su precio y guardo, **entonces** se actualiza (edición parcial) y veo el mensaje de confirmación.

### Historia 4 — Cambiar el estado de un servicio (Prioridad: P2) · HU-65

**Como** Administrador o Empleado, **quiero** activar o inactivar un servicio, **para** controlar su disponibilidad.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite controlar su disponibilidad.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PATCH /api/v1/servicios/:id/estado` y en la pantalla «Servicios (Cambiar estado)», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un servicio activo, **cuando** lo inactivo y confirmo, **entonces** deja de ofrecerse y el cambio queda con fecha y hora.

### Historia 5 — Generar el reporte de servicios (Prioridad: P2) · HU-66

**Como** Administrador o Empleado, **quiero** generar reportes de los servicios con sus solicitudes e ingresos, **para** analizar su rendimiento.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite analizar su rendimiento.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/reportes/servicios?desde&hasta&categoria&estado&formato` y en la pantalla «Servicios › Reporte», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un rango de fechas y una categoría, **cuando** genero el reporte, **entonces** veo cada servicio con las veces solicitado (reservas, eventos y ventas) y los ingresos generados, descargable en PDF o CSV.

### Casos límite (Edge Cases)

- Cambio de precio de un servicio incluido en reservas ya confirmadas: las reservas conservan el precio pactado.

## Requerimientos (Requirements) *(obligatorio)*

### Requerimientos funcionales (Functional Requirements)

- **FR-001**: El sistema DEBE registrar servicios con nombre único, descripción, precio no negativo, categoría e imágenes opcionales (JPG, PNG o WEBP, máximo 2 MB), en estado activo. *(RF-SER-01 · HU-62)*
- **FR-002**: El sistema DEBE buscar servicios por nombre, parte del nombre o categoría, filtrables por estado, y mostrar su detalle. *(RF-SER-02 · HU-63)*
- **FR-003**: El sistema DEBE actualizar parcial o totalmente un servicio validando campos obligatorios y formato de precio. *(RF-SER-03 · HU-64)*
- **FR-004**: El sistema DEBE cambiar el estado del servicio entre activo e inactivo, mostrando el estado actual y registrando fecha y hora del cambio. *(RF-SER-04 · HU-65)*
- **FR-005**: El sistema DEBE generar el reporte de servicios por fecha, categoría, estado y servicio con número de solicitudes e ingresos generados, en PDF o CSV. *(RF-SER-05 · HU-66)*

### Requerimientos no funcionales aplicables

Aplican todos los principios de `constitution.md` y los RNF transversales del SRS §5.

### Entidades clave (Key Entities)

- **Servicio**: Servicio ofrecido. Atributos: id_servicio, nombre, descripcion, categoria, precio, imagen_url, estado, created_at, updated_at.

## Criterios de éxito (Success Criteria) *(obligatorio)*

### Resultados medibles (Measurable Outcomes)

- **SC-001**: El catálogo de servicios activos se consulta en menos de 1 segundo.

## Supuestos (Assumptions)

- Se implementa después de (o junto con) las specs: 001-roles-permisos.
- La autenticación JWT y la autorización por permisos están disponibles (spec de acceso); mientras no lo estén, los endpoints se prueban con un usuario semilla.

## Insumos para `/speckit.plan` (no normativo)

Detalle orientativo para el plan técnico. No reemplaza las decisiones del plan, pero cualquier desviación debe quedar justificada en `plan.md`.

**API REST sugerida** (base `/api/v1`, sobre `{ ok, data, meta, error }`):

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/servicios` | Registrar un servicio | HU-62 |
| GET | `/api/v1/servicios?q&categoria&estado&page&limit` | Consultar servicios | HU-63 |
| GET | `/api/v1/servicios/:id` | Consultar detalle (servicios) | HU-63 |
| PUT | `/api/v1/servicios/:id` | Actualizar un servicio | HU-64 |
| PATCH | `/api/v1/servicios/:id` | Actualizar parcialmente | HU-64 |
| PATCH | `/api/v1/servicios/:id/estado` | Cambiar el estado de un servicio | HU-65 |
| GET | `/api/v1/reportes/servicios?desde&hasta&categoria&estado&formato` | Generar el reporte de servicios | HU-66 |

**Pantallas (frontend vanilla):**

- Servicios › Nuevo servicio — HU-62
- Servicios (listado y detalle) — HU-63
- Servicios › Editar — HU-64
- Servicios (Cambiar estado) — HU-65
- Servicios › Reporte — HU-66

**Modelo de datos (lógico):**

*Servicio*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_servicio | INT | PK |
| nombre | VARCHAR(80) | único |
| descripcion | VARCHAR(500) |  |
| categoria | ENUM('alquiler_espacio','servicio_adicional') |  |
| precio | DECIMAL(12,2) | ≥ 0 |
| imagen_url | VARCHAR(255) | opcional |
| estado | ENUM('activo','inactivo') |  |
| created_at | DATETIME |  |
| updated_at | DATETIME |  |

**Reglas de negocio:**

- **RN-17**: Un servicio inactivo no se ofrece en reservas, fichas técnicas, agenda ni ventas nuevas; los registros existentes lo conservan.

## Trazabilidad

| Historia spec | HU | RF | Excel |
|---|---|---|---|
| 1 | HU-62 | RF-SER-01 | HU_75, HU_80 |
| 2 | HU-63 | RF-SER-02 | HU_76, HU_81 |
| 3 | HU-64 | RF-SER-03 | HU_77, HU_82 |
| 4 | HU-65 | RF-SER-04 | HU_78, HU_83 |
| 5 | HU-66 | RF-SER-05 | HU_79, HU_84 |

