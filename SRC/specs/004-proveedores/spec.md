# Feature Specification: Proveedores

**Feature Branch**: `004-proveedores`  
**Created**: 2026-11-21  
**Status**: Draft  
**Proyecto**: Sistema de Gestión Integral para Discoteca (Discoteca (Envigado)) · **SRS**: `SRS-Discoteca-v2.0.md` §4.4 · **Historias**: HU-20 – HU-24  
**Input**: "Centraliza la información de los proveedores de bebidas, insumos y servicios, con sus documentos e historial de cambios. Actores: Administrador, Empleado."

> Spec generada a partir del SRS v2.0 y de las historias de usuario del proyecto. Respeta la estructura de `spec-template.md` de spec-kit; los encabezados van en español con su equivalente en inglés. Antes de `/speckit.plan`, ejecute `/speckit.clarify` si hay marcas `[NEEDS CLARIFICATION]`.

## Escenarios de usuario y pruebas (User Scenarios & Testing) *(obligatorio)*

### Historia 1 — Registrar un proveedor (Prioridad: P1) · HU-20

**Como** Administrador o Empleado, **quiero** registrar un proveedor con su documento, contacto y documentos de soporte, **para** tener su información en un solo lugar.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite tener su información en un solo lugar.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/proveedores`, `POST /api/v1/proveedores/:id/documentos` y en la pantalla «Compras › Proveedores › Nuevo proveedor», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** NIT, razón social, dirección, contacto, teléfono y correo válidos, **cuando** guardo, **entonces** el proveedor queda activo con un id único y veo el mensaje de confirmación.
2. **Dado** que adjunto el RUT en PDF, **cuando** guardo, **entonces** el documento queda asociado al proveedor.
3. **Dado** un documento ya registrado o un correo con formato inválido, **cuando** guardo, **entonces** el sistema lo señala (409/422).

### Historia 2 — Consultar proveedores (Prioridad: P1) · HU-21

**Como** Administrador o Empleado, **quiero** buscar proveedores y ver su información completa, **para** acceder rápido a sus datos.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite acceder rápido a sus datos.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/proveedores?q&estado&tipo&page&limit`, `GET /api/v1/proveedores/:id` y en la pantalla «Compras › Proveedores (listado y detalle)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el buscador, **cuando** escribo parte del nombre o el id, **entonces** veo los coincidentes, filtrables por estado y tipo de producto.
2. **Dado** un proveedor, **cuando** abro su detalle, **entonces** veo sus datos, sus documentos adjuntos y su historial de actualizaciones.

### Historia 3 — Actualizar un proveedor (Prioridad: P2) · HU-22

**Como** Administrador o Empleado, **quiero** modificar la información de un proveedor, **para** mantenerla precisa.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite mantenerla precisa.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PUT /api/v1/proveedores/:id` y en la pantalla «Compras › Proveedores › Editar», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un proveedor, **cuando** cambio su teléfono y guardo, **entonces** se actualiza, queda en el historial con fecha, hora y usuario y veo el mensaje de confirmación.

### Historia 4 — Cambiar el estado de un proveedor (Prioridad: P2) · HU-23

**Como** Administrador o Empleado, **quiero** cambiar el estado de un proveedor con una nota que lo justifique, **para** gestionar su ciclo de vida.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite gestionar su ciclo de vida.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PATCH /api/v1/proveedores/:id/estado` y en la pantalla «Compras › Proveedores (Cambiar estado)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un proveedor activo, **cuando** lo paso a suspendido con la nota «Entregas incompletas», **entonces** el cambio queda registrado con fecha, hora y usuario y el estado se muestra en todas las vistas.
2. **Dado** un proveedor suspendido o inactivo, **cuando** registro una compra, **entonces** no aparece en la lista de proveedores.

### Historia 5 — Generar el reporte de proveedores (Prioridad: P3) · HU-24

**Como** Administrador o Empleado, **quiero** generar reportes de proveedores con filtros, **para** analizar la información.

**Por qué esta prioridad (Why this priority)**: Prioridad Baja en el backlog del proyecto. Aporta valor porque permite analizar la información.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/reportes/proveedores?estado&desde&hasta&formato` y en la pantalla «Compras › Proveedores › Reporte», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** filtros de estado y fecha de registro, **cuando** genero el reporte, **entonces** descargo un PDF o CSV con nombre, documento, contacto, fecha de registro y estado.

### Casos límite (Edge Cases)

- Documento mayor a 5 MB o con formato distinto de PDF, JPG o PNG: se rechaza.

## Requerimientos (Requirements) *(obligatorio)*

### Requerimientos funcionales (Functional Requirements)

- **FR-001**: El sistema DEBE registrar proveedores con tipo y número de documento único, razón social, dirección, contacto, teléfono, correo válido y tipo de producto, en estado activo. *(RF-PRV-01 · HU-20)*
- **FR-002**: El sistema DEBE permitir adjuntar documentos del proveedor (RUT, cámara de comercio, contrato, certificaciones) en PDF, JPG o PNG de máximo 5 MB. *(RF-PRV-02 · HU-20)*
- **FR-003**: El sistema DEBE buscar proveedores por id, nombre o parte del nombre, filtrables por estado y tipo de producto, y mostrar su detalle con documentos e historial de cambios. *(RF-PRV-03 · HU-21)*
- **FR-004**: El sistema DEBE actualizar cualquier campo del proveedor validando los obligatorios y registrar cada cambio en su historial con usuario, fecha y hora. *(RF-PRV-04 · HU-22)*
- **FR-005**: El sistema DEBE cambiar el estado del proveedor (activo, inactivo, suspendido) con nota obligatoria, registrando fecha, hora y usuario. *(RF-PRV-05 · HU-23)*
- **FR-006**: El sistema DEBE impedir compras nuevas a proveedores inactivos o suspendidos. *(RF-PRV-06 · HU-23)*
- **FR-007**: El sistema DEBE generar el reporte de proveedores filtrable por estado, nombre y fecha de registro, descargable en PDF o CSV. *(RF-PRV-07 · HU-24)*

### Requerimientos no funcionales aplicables

Aplican todos los principios de `constitution.md` y los RNF transversales del SRS §5.

### Entidades clave (Key Entities)

- **Proveedor**: Proveedor de la discoteca. Atributos: id_proveedor, tipo_documento, numero_documento, razon_social, direccion, nombre_contacto, telefono, correo, tipo_producto, estado, created_at.
- **DocumentoProveedor**: Soportes. Atributos: id_documento, id_proveedor, tipo, url, fecha_carga.
- **HistorialProveedor**: Cambios. Atributos: id_historial, id_proveedor, campo, valor_anterior, valor_nuevo, nota, id_usuario, fecha.

## Criterios de éxito (Success Criteria) *(obligatorio)*

### Resultados medibles (Measurable Outcomes)

- **SC-001**: El 0 % de las compras nuevas se registra a proveedores inactivos o suspendidos.

## Supuestos (Assumptions)

- Se implementa después de (o junto con) las specs: 001-roles-permisos.
- La autenticación JWT y la autorización por permisos están disponibles (spec de acceso); mientras no lo estén, los endpoints se prueban con un usuario semilla.

## Insumos para `/speckit.plan` (no normativo)

Detalle orientativo para el plan técnico. No reemplaza las decisiones del plan, pero cualquier desviación debe quedar justificada en `plan.md`.

**API REST sugerida** (base `/api/v1`, sobre `{ ok, data, meta, error }`):

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/proveedores` | Registrar un proveedor | HU-20 |
| POST | `/api/v1/proveedores/:id/documentos` | Registrar (documentos) | HU-20 |
| GET | `/api/v1/proveedores?q&estado&tipo&page&limit` | Consultar proveedores | HU-21 |
| GET | `/api/v1/proveedores/:id` | Consultar detalle (proveedores) | HU-21 |
| PUT | `/api/v1/proveedores/:id` | Actualizar un proveedor | HU-22 |
| PATCH | `/api/v1/proveedores/:id/estado` | Cambiar el estado de un proveedor | HU-23 |
| GET | `/api/v1/reportes/proveedores?estado&desde&hasta&formato` | Generar el reporte de proveedores | HU-24 |

**Pantallas (frontend vanilla):**

- Compras › Proveedores › Nuevo proveedor — HU-20
- Compras › Proveedores (listado y detalle) — HU-21
- Compras › Proveedores › Editar — HU-22
- Compras › Proveedores (Cambiar estado) — HU-23
- Compras › Proveedores › Reporte — HU-24

**Modelo de datos (lógico):**

*Proveedor*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_proveedor | INT | PK |
| tipo_documento | ENUM('NIT','CC','CE') |  |
| numero_documento | VARCHAR(15) | único |
| razon_social | VARCHAR(100) | obligatorio |
| direccion | VARCHAR(120) |  |
| nombre_contacto | VARCHAR(80) |  |
| telefono | VARCHAR(10) |  |
| correo | VARCHAR(100) | válido |
| tipo_producto | VARCHAR(60) |  |
| estado | ENUM('activo','inactivo','suspendido') |  |
| created_at | DATETIME |  |

*DocumentoProveedor*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_documento | INT | PK |
| id_proveedor | INT | FK |
| tipo | ENUM('RUT','camara_comercio','contrato','certificacion','otro') |  |
| url | VARCHAR(255) |  |
| fecha_carga | DATETIME |  |

*HistorialProveedor*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_historial | INT | PK |
| id_proveedor | INT | FK |
| campo | VARCHAR(40) |  |
| valor_anterior | VARCHAR(200) |  |
| valor_nuevo | VARCHAR(200) |  |
| nota | VARCHAR(200) |  |
| id_usuario | INT | FK |
| fecha | DATETIME |  |

**Reglas de negocio:**

- **RN-07**: Un proveedor inactivo o suspendido no puede recibir compras nuevas; todo cambio de estado lleva una nota que lo justifica.

**Validaciones de campos por historia:**

- HU-20: numero_documento (5–15, único); razon_social (3–100); telefono (10 dígitos); correo (válido); documentos (≤5 MB c/u)

## Trazabilidad

| Historia spec | HU | RF | Excel |
|---|---|---|---|
| 1 | HU-20 | RF-PRV-01, RF-PRV-02 | HU_33, HU_38 |
| 2 | HU-21 | RF-PRV-03 | HU_34, HU_39 |
| 3 | HU-22 | RF-PRV-04 | HU_35, HU_40 |
| 4 | HU-23 | RF-PRV-05, RF-PRV-06 | HU_36, HU_41 |
| 5 | HU-24 | RF-PRV-07 | HU_37, HU_42 |

