# Feature Specification: Compras

**Feature Branch**: `006-compras`  
**Created**: 2026-11-21  
**Status**: Draft  
**Proyecto**: Sistema de Gestión Integral para Discoteca (Discoteca (Envigado)) · **SRS**: `SRS-Discoteca-v2.0.md` §4.6 · **Historias**: HU-33 – HU-37  
**Input**: "Registra las compras a proveedores con sus productos, adjuntos y flujo de estados (pendiente, aprobada, pagada, recibida, anulada); al recibir la compra se suman las existencias. Actores: Administrador, Empleado."

> Spec generada a partir del SRS v2.0 y de las historias de usuario del proyecto. Respeta la estructura de `spec-template.md` de spec-kit; los encabezados van en español con su equivalente en inglés. Antes de `/speckit.plan`, ejecute `/speckit.clarify` si hay marcas `[NEEDS CLARIFICATION]`.

## Escenarios de usuario y pruebas (User Scenarios & Testing) *(obligatorio)*

### Historia 1 — Registrar una compra (Prioridad: P1) · HU-33

**Como** Administrador o Empleado, **quiero** registrar una compra con fecha, proveedor, descripción, productos y factura adjunta, **para** controlar los gastos y lo que se compra.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite controlar los gastos y lo que se compra.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/compras`, `POST /api/v1/compras/:id/adjuntos` y en la pantalla «Compras › Nueva compra», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** fecha, proveedor activo (buscable), descripción y dos productos con cantidad y costo unitario, **cuando** guardo, **entonces** la compra queda pendiente con número consecutivo, el total calculado y veo el mensaje de confirmación.
2. **Dado** que adjunto la factura en PDF, **cuando** guardo, **entonces** queda asociada a la compra.
3. **Dado** campos obligatorios vacíos, sin productos o con cantidades no enteras, **cuando** guardo, **entonces** el sistema los señala (422).

### Historia 2 — Consultar compras (Prioridad: P1) · HU-34

**Como** Administrador o Empleado, **quiero** buscar compras y ver sus detalles, **para** revisar las transacciones realizadas.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite revisar las transacciones realizadas.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/compras?q&proveedor&estado&desde&hasta&page&limit`, `GET /api/v1/compras/:id` y en la pantalla «Compras (listado y detalle)», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el buscador, **cuando** busco por fecha, proveedor, número o descripción, **entonces** veo una lista paginada con número, fecha, proveedor, total y estado.
2. **Dado** una compra, **cuando** abro su detalle, **entonces** veo sus productos, adjuntos, estado e historial de estados.
3. **Dado** una búsqueda sin coincidencias, **cuando** la ejecuto, **entonces** veo un mensaje informativo.

### Historia 3 — Actualizar una compra (Prioridad: P2) · HU-35

**Como** Administrador o Empleado, **quiero** corregir o completar la información de una compra, **para** que refleje lo realmente comprado.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite que refleje lo realmente comprado.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PUT /api/v1/compras/:id` y en la pantalla «Compras › Editar», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** una compra pendiente o aprobada, **cuando** cambio un producto y su cantidad y guardo, **entonces** el total se recalcula, se conserva el registro del cambio y veo el mensaje de confirmación.
2. **Dado** que soy Empleado, **cuando** edito, **entonces** no puedo cambiar la fecha original de la compra; si soy Administrador puedo corregirla solo mientras esté pendiente.
3. **Dado** una compra pagada, recibida o anulada, **cuando** intento editarla, **entonces** el sistema lo impide.

### Historia 4 — Cambiar el estado de una compra (Prioridad: P1) · HU-36

**Como** Administrador o Empleado, **quiero** avanzar la compra por su flujo de estados con un comentario, **para** controlar el flujo de trabajo de las compras.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite controlar el flujo de trabajo de las compras.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PATCH /api/v1/compras/:id/estado` y en la pantalla «Compras › Detalle (Cambiar estado)», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** una compra pagada, **cuando** la paso a recibida, **entonces** las existencias de sus productos aumentan, se registran los movimientos y el cambio queda en el historial con fecha, usuario y comentario.
2. **Dado** una compra pendiente, **cuando** intento pasarla directamente a recibida, **entonces** el sistema solo ofrece los estados válidos siguientes.
3. **Dado** una compra pendiente, **cuando** la anulo con comentario, **entonces** queda anulada sin afectar existencias.

### Historia 5 — Generar el reporte de compras (Prioridad: P2) · HU-37

**Como** Administrador o Empleado, **quiero** generar reportes de compras por periodo, proveedor y estado, **para** analizar los gastos.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite analizar los gastos.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/reportes/compras?periodo&desde&hasta&proveedor&estado&formato` y en la pantalla «Compras › Reporte», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el periodo mensual y un proveedor, **cuando** genero el reporte, **entonces** veo el total comprado, el número de compras y el detalle, exportable a PDF, CSV o Excel.

### Casos límite (Edge Cases)

- Se intenta anular una compra recibida: se rechaza; la corrección se hace con un ajuste de existencias.

## Requerimientos (Requirements) *(obligatorio)*

### Requerimientos funcionales (Functional Requirements)

- **FR-001**: El sistema DEBE registrar compras con fecha no futura, proveedor activo, descripción y uno o más productos con cantidad entera y costo unitario, calculando el total, en estado pendiente. *(RF-COM-01 · HU-33)*
- **FR-002**: El sistema DEBE permitir adjuntar facturas y soportes (PDF, JPG o PNG, máximo 5 MB) a la compra. *(RF-COM-02 · HU-33)*
- **FR-003**: El sistema DEBE buscar compras por fecha, proveedor, número o descripción, filtrables por estado, con resultados paginados y detalle de productos, adjuntos e historial de estados. *(RF-COM-03 · HU-34)*
- **FR-004**: El sistema DEBE actualizar proveedor, descripción, productos y adjuntos de compras pendientes o aprobadas, recalculando el total y registrando los cambios. *(RF-COM-04 · HU-35)*
- **FR-005**: El sistema DEBE permitir cambiar la fecha de compra solo al Administrador y solo en compras pendientes. *(RF-COM-05 · HU-35)*
- **FR-006**: El sistema DEBE cambiar el estado de la compra solo a los estados válidos del flujo, registrando fecha, usuario y comentario, y mostrar su historial de estados. *(RF-COM-06 · HU-36)*
- **FR-007**: El sistema DEBE sumar las existencias y recalcular el costo promedio de los productos al pasar la compra a recibida, en la misma transacción. *(RF-COM-07 · HU-36)*
- **FR-008**: El sistema DEBE generar reportes de compras por periodo (diario, semanal, mensual, anual), proveedor y estado con el importe total, exportables a PDF, CSV y Excel. *(RF-COM-08 · HU-37)*

### Requerimientos no funcionales aplicables

Aplican todos los principios de `constitution.md` y los RNF transversales del SRS §5. En particular:

- **RNF-SAF-03**: Ninguna venta, pedido entregado o anulación debe dejar existencias negativas ni saldos de puntos inconsistentes: el ajuste ocurre en la misma transacción que la operación.

### Entidades clave (Key Entities)

- **Compra**: Compra a un proveedor. Atributos: id_compra, numero, fecha_compra, id_proveedor, descripcion, total, estado, id_usuario, created_at, updated_at.
- **CompraDetalle**: Producto comprado. Atributos: id_detalle, id_compra, id_producto, cantidad, costo_unitario, subtotal.
- **AdjuntoCompra**: Factura u otro soporte. Atributos: id_adjunto, id_compra, url, nombre.
- **HistorialEstadoCompra**: Flujo. Atributos: id_historial, id_compra, estado_anterior, estado_nuevo, comentario, id_usuario, fecha.

## Criterios de éxito (Success Criteria) *(obligatorio)*

### Resultados medibles (Measurable Outcomes)

- **SC-001**: Las existencias suben exactamente en las cantidades de las compras recibidas en el 100 % de las pruebas.

## Supuestos (Assumptions)

- Se implementa después de (o junto con) las specs: 004-proveedores, 005-productos-existencias.
- La autenticación JWT y la autorización por permisos están disponibles (spec de acceso); mientras no lo estén, los endpoints se prueban con un usuario semilla.

## Insumos para `/speckit.plan` (no normativo)

Detalle orientativo para el plan técnico. No reemplaza las decisiones del plan, pero cualquier desviación debe quedar justificada en `plan.md`.

**API REST sugerida** (base `/api/v1`, sobre `{ ok, data, meta, error }`):

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/compras` | Registrar una compra | HU-33 |
| POST | `/api/v1/compras/:id/adjuntos` | Registrar (adjuntos) | HU-33 |
| GET | `/api/v1/compras?q&proveedor&estado&desde&hasta&page&limit` | Consultar compras | HU-34 |
| GET | `/api/v1/compras/:id` | Consultar detalle (compras) | HU-34 |
| PUT | `/api/v1/compras/:id` | Actualizar una compra | HU-35 |
| PATCH | `/api/v1/compras/:id/estado` | Cambiar el estado de una compra | HU-36 |
| GET | `/api/v1/reportes/compras?periodo&desde&hasta&proveedor&estado&formato` | Generar el reporte de compras | HU-37 |

**Pantallas (frontend vanilla):**

- Compras › Nueva compra — HU-33
- Compras (listado y detalle) — HU-34
- Compras › Editar — HU-35
- Compras › Detalle (Cambiar estado) — HU-36
- Compras › Reporte — HU-37

**Modelo de datos (lógico):**

*Compra*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_compra | INT | PK |
| numero | VARCHAR(20) | único, consecutivo |
| fecha_compra | DATE | ≤ hoy |
| id_proveedor | INT | FK, activo |
| descripcion | VARCHAR(300) |  |
| total | DECIMAL(14,2) | calculado |
| estado | ENUM('pendiente','aprobada','pagada','recibida','anulada') |  |
| id_usuario | INT | FK |
| created_at | DATETIME |  |
| updated_at | DATETIME |  |

*CompraDetalle*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_detalle | INT | PK |
| id_compra | INT | FK |
| id_producto | INT | FK |
| cantidad | INT | > 0 |
| costo_unitario | DECIMAL(12,2) | > 0 |
| subtotal | DECIMAL(14,2) |  |

*AdjuntoCompra*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_adjunto | INT | PK |
| id_compra | INT | FK |
| url | VARCHAR(255) |  |
| nombre | VARCHAR(120) |  |

*HistorialEstadoCompra*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_historial | INT | PK |
| id_compra | INT | FK |
| estado_anterior | VARCHAR(20) |  |
| estado_nuevo | VARCHAR(20) |  |
| comentario | VARCHAR(200) |  |
| id_usuario | INT | FK |
| fecha | DATETIME |  |

**Reglas de negocio:**

- **RN-10**: Flujo de estados: pendiente → aprobada → pagada → recibida; cualquier estado anterior a recibida → anulada. Al pasar a recibida se suman las existencias y se recalcula el costo promedio en la misma transacción.
- **RN-11**: Una compra solo se edita en estado pendiente o aprobada; la fecha de compra solo la corrige el Administrador mientras está pendiente.

**Validaciones de campos por historia:**

- HU-33: fecha_compra (≤ hoy); id_proveedor (activo); descripcion (≤300); productos (≥1): cantidad (entero > 0), costo_unitario (> 0); adjuntos (≤5 MB)

## Trazabilidad

| Historia spec | HU | RF | Excel |
|---|---|---|---|
| 1 | HU-33 | RF-COM-01, RF-COM-02 | HU_23, HU_28 |
| 2 | HU-34 | RF-COM-03 | HU_24, HU_29 |
| 3 | HU-35 | RF-COM-04, RF-COM-05 | HU_25, HU_30 |
| 4 | HU-36 | RF-COM-06, RF-COM-07 | HU_26, HU_31 |
| 5 | HU-37 | RF-COM-08 | HU_27, HU_32 |

