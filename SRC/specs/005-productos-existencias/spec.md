# Feature Specification: Productos y existencias

**Feature Branch**: `005-productos-existencias`  
**Created**: 2026-11-21  
**Status**: Draft  
**Proyecto**: Sistema de Gestión Integral para Discoteca (Discoteca (Envigado)) · **SRS**: `SRS-Discoteca-v2.0.md` §4.5 · **Historias**: HU-25 – HU-32  
**Input**: "Controla los productos del bar y sus existencias con límites mínimo y máximo, movimientos auditados y alertas por correo cuando un producto llega al mínimo. Actores: Administrador, Empleado."

> Spec generada a partir del SRS v2.0 y de las historias de usuario del proyecto. Respeta la estructura de `spec-template.md` de spec-kit; los encabezados van en español con su equivalente en inglés. Antes de `/speckit.plan`, ejecute `/speckit.clarify` si hay marcas `[NEEDS CLARIFICATION]`.

## Escenarios de usuario y pruebas (User Scenarios & Testing) *(obligatorio)*

### Historia 1 — Registrar un producto (Prioridad: P1) · HU-25

**Como** Administrador, **quiero** registrar un producto del bar con código, tipo, precio y límites de stock, **para** poder controlar sus existencias y venderlo.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite poder controlar sus existencias y venderlo.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/productos`, `PUT /api/v1/productos/:id` y en la pantalla «Existencias › Productos › Nuevo producto», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** código, nombre «Aguardiente 750 ml», tipo licor, precio $ 120.000, stock mínimo 6 y máximo 48, **cuando** guardo, **entonces** el producto queda activo con existencia 0.
2. **Dado** un código repetido o un mínimo mayor o igual al máximo, **cuando** guardo, **entonces** el sistema lo señala (409/422).

### Historia 2 — Registrar las existencias iniciales (Prioridad: P1) · HU-26

**Como** Administrador o Empleado, **quiero** registrar la cantidad inicial en stock de cada producto, **para** tener un inventario base preciso.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite tener un inventario base preciso.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/productos/:id/existencia-inicial` y en la pantalla «Existencias › Productos › Existencia inicial», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un producto existente, **cuando** registro una cantidad inicial de 24 y la fecha, **entonces** la existencia queda en 24 con un movimiento «inicial» y veo el mensaje de confirmación.
2. **Dado** un id de producto que no existe o una cantidad negativa o decimal, **cuando** guardo, **entonces** el sistema lo señala.
3. **Dado** un producto que ya tiene existencias iniciales, **cuando** intento registrarlas de nuevo, **entonces** el sistema me remite a Ajustar existencias.

### Historia 3 — Consultar existencias (Prioridad: P1) · HU-27

**Como** Administrador o Empleado, **quiero** consultar la cantidad disponible de los productos en tiempo real, **para** atender la demanda y verificar disponibilidad.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite atender la demanda y verificar disponibilidad.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/productos?q&tipo&estado&nivel&sort&page&limit`, `GET /api/v1/productos/:id` y en la pantalla «Existencias (listado)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el buscador, **cuando** busco por id o nombre, **entonces** veo existencia actual, mínimo, máximo y estado, con un indicador de color (rojo en o bajo el mínimo, amarillo cerca del mínimo, verde normal).
2. **Dado** la lista, **cuando** filtro por tipo y ordeno por existencia, **entonces** el resultado se ajusta.

### Historia 4 — Ajustar existencias (Prioridad: P1) · HU-28

**Como** Administrador o Empleado, **quiero** aumentar o disminuir la existencia de un producto por una entrada o salida con su motivo, **para** mantener el inventario preciso.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite mantener el inventario preciso.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/productos/:id/ajustes`, `GET /api/v1/productos/:id/movimientos` y en la pantalla «Existencias › Ajustar; Existencias › Kardex», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un producto con 10 unidades, **cuando** registro una salida de 2 por «Rotura», **entonces** la existencia queda en 8 y se registra el movimiento con fecha, hora y usuario.
2. **Dado** un ajuste que dejaría la existencia negativa o por encima del máximo, **cuando** guardo, **entonces** el sistema lo impide.
3. **Dado** un producto, **cuando** abro su kardex, **entonces** veo todos sus movimientos auditados.

### Historia 5 — Definir stock mínimo y máximo (Prioridad: P1) · HU-29

**Como** Administrador o Empleado, **quiero** definir el stock mínimo y máximo de cada producto, **para** evitar faltantes y excesos.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite evitar faltantes y excesos.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PATCH /api/v1/productos/:id/limites` y en la pantalla «Existencias › Productos › Límites de stock», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un producto, **cuando** defino mínimo 6 y máximo 48, **entonces** se guardan y se muestran en su ficha.
2. **Dado** un mínimo mayor o igual al máximo, **cuando** guardo, **entonces** veo un mensaje de error.

### Historia 6 — Cambiar el estado de un producto (Prioridad: P2) · HU-30

**Como** Empleado o Administrador, **quiero** cambiar el estado de un producto, **para** controlar los productos del almacén.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite controlar los productos del almacén.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PATCH /api/v1/productos/:id/estado` y en la pantalla «Existencias (Cambiar estado)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un producto activo, **cuando** lo paso a inactivo y confirmo, **entonces** deja de ofrecerse en pedidos y ventas y el cambio queda registrado con fecha, hora y usuario.
2. **Dado** un producto cuya existencia llega a 0, **cuando** se registra la venta, **entonces** su estado pasa a agotado automáticamente.

### Historia 7 — Generar el reporte de inventario (Prioridad: P2) · HU-31

**Como** Administrador o Empleado, **quiero** generar reportes del estado y movimiento del inventario, **para** analizar el stock.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite analizar el stock.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/reportes/inventario?desde&hasta&producto&tipo&formato` y en la pantalla «Existencias › Reporte», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un rango de fechas y un tipo de producto, **cuando** genero el reporte, **entonces** descargo un PDF o CSV con existencia, mínimo, máximo, estado, entradas y salidas del periodo y la fecha y hora de generación.

### Historia 8 — Recibir alertas de stock mínimo por correo (Prioridad: P1) · HU-32

**Como** Administrador o Empleado, **quiero** recibir un correo cuando un producto llegue a su stock mínimo, **para** reponerlo a tiempo.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite reponerlo a tiempo.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/configuracion/alertas-stock`, `PUT /api/v1/configuracion/alertas-stock`, `GET /api/v1/productos/alertas` y en la pantalla «Configuración › Alertas de stock; Inicio (alerta)», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un producto con mínimo 6, **cuando** una venta deja su existencia en 6, **entonces** se envía un correo a los destinatarios configurados con el producto, la existencia actual y el mínimo.
2. **Dado** la frecuencia «diaria», **cuando** varios productos llegan al mínimo, **entonces** se envía un solo correo al día con todos.
3. **Dado** la configuración de alertas, **cuando** cambio los correos o la frecuencia, **entonces** se valida el formato de cada correo.

### Casos límite (Edge Cases)

- Una compra recibida deja la existencia por encima del máximo: se acepta (es mercancía física) y se advierte en el reporte.
- Dos ventas simultáneas de la última unidad: la segunda recibe 409 con la existencia disponible.

## Requerimientos (Requirements) *(obligatorio)*

### Requerimientos funcionales (Functional Requirements)

- **FR-001**: El sistema DEBE registrar productos con código único, nombre, tipo, unidad, precio de venta, indicador de alcohol, stock mínimo y máximo, en estado activo con existencia 0. *(RF-PRD-01 · HU-25)*
- **FR-002**: El sistema DEBE registrar la existencia inicial de un producto existente con cantidad entera no negativa y fecha, una sola vez, como movimiento de inventario. *(RF-PRD-02 · HU-26)*
- **FR-003**: El sistema DEBE consultar productos por id o nombre mostrando existencia actual, stock mínimo y máximo, estado e indicador de nivel, con filtros y orden. *(RF-PRD-03 · HU-27)*
- **FR-004**: El sistema DEBE registrar ajustes de entrada o salida con cantidad entera y motivo obligatorio, impidiendo existencias negativas o mayores al máximo. *(RF-PRD-04 · HU-28)*
- **FR-005**: El sistema DEBE registrar cada ajuste como movimiento auditado y mostrar el kardex del producto. *(RF-PRD-05 · HU-28)*
- **FR-006**: El sistema DEBE definir valores enteros de stock mínimo y máximo por producto, validando que el mínimo sea menor que el máximo. *(RF-PRD-06 · HU-29)*
- **FR-007**: El sistema DEBE cambiar el estado de un producto entre activo e inactivo con registro de fecha, hora y usuario, mostrando la lista de estados posibles. *(RF-PRD-07 · HU-30)*
- **FR-008**: El sistema DEBE marcar automáticamente como agotado un producto sin existencia y reactivarlo al recibir mercancía. *(RF-PRD-08 · HU-30)*
- **FR-009**: El sistema DEBE generar el reporte de inventario con existencia, límites, estado y movimientos del periodo, filtrable por producto, tipo y fechas, en PDF o CSV. *(RF-PRD-09 · HU-31)*
- **FR-010**: El sistema DEBE enviar por correo alertas de productos con existencia igual o menor al mínimo, con producto, existencia y mínimo, según la frecuencia configurada (inmediata, diaria o semanal). *(RF-PRD-10 · HU-32)*
- **FR-011**: El sistema DEBE permitir configurar los correos destinatarios y la frecuencia de las alertas. *(RF-PRD-11 · HU-32)*
- **FR-012**: El sistema DEBE mostrar en el tablero los productos en alerta. *(RF-PRD-12 · HU-32)*
- **FR-013**: [NEEDS CLARIFICATION: Cómo se manejan los cócteles y las copas servidas de una botella: como productos con existencia propia o descontando insumos por receta — TBD-10.]

### Requerimientos no funcionales aplicables

Aplican todos los principios de `constitution.md` y los RNF transversales del SRS §5. En particular:

- **RNF-SAF-03**: Ninguna venta, pedido entregado o anulación debe dejar existencias negativas ni saldos de puntos inconsistentes: el ajuste ocurre en la misma transacción que la operación.
- **RNF-SEG-07**: El sistema debe registrar en una bitácora (usuario, fecha y hora, acción, valores anterior y nuevo) los inicios de sesión, los cambios de roles y permisos, los cambios de estado, los ajustes de existencias, los movimientos de puntos y las anulaciones y eliminaciones.

### Entidades clave (Key Entities)

- **Producto**: Producto del bar. Atributos: id_producto, codigo, nombre, tipo, unidad, precio_venta, costo_promedio, stock, stock_minimo, stock_maximo, contiene_alcohol, estado, created_at.
- **MovimientoInventario**: Kardex. Atributos: id_movimiento, id_producto, tipo, cantidad, stock_resultante, motivo, documento_ref, id_usuario, fecha.
- **ConfigAlertaStock**: Destinatarios de alertas. Atributos: id_config, correos, frecuencia, activa.

## Criterios de éxito (Success Criteria) *(obligatorio)*

### Resultados medibles (Measurable Outcomes)

- **SC-001**: Las existencias del sistema coinciden con el conteo físico en el 100 % de las pruebas de inventario.
- **SC-002**: El 100 % de los productos que llegan al mínimo genera la alerta según la frecuencia configurada.

## Supuestos (Assumptions)

- Se implementa después de (o junto con) las specs: 001-roles-permisos.
- La autenticación JWT y la autorización por permisos están disponibles (spec de acceso); mientras no lo estén, los endpoints se prueban con un usuario semilla.

## Insumos para `/speckit.plan` (no normativo)

Detalle orientativo para el plan técnico. No reemplaza las decisiones del plan, pero cualquier desviación debe quedar justificada en `plan.md`.

**API REST sugerida** (base `/api/v1`, sobre `{ ok, data, meta, error }`):

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/productos` | Registrar un producto | HU-25 |
| PUT | `/api/v1/productos/:id` | Actualizar (productos) | HU-25 |
| POST | `/api/v1/productos/:id/existencia-inicial` | Registrar las existencias iniciales | HU-26 |
| GET | `/api/v1/productos?q&tipo&estado&nivel&sort&page&limit` | Consultar existencias | HU-27 |
| GET | `/api/v1/productos/:id` | Consultar detalle (productos) | HU-27 |
| POST | `/api/v1/productos/:id/ajustes` | Ajustar existencias | HU-28 |
| GET | `/api/v1/productos/:id/movimientos` | Listar o consultar movimientos | HU-28 |
| PATCH | `/api/v1/productos/:id/limites` | Definir stock mínimo y máximo | HU-29 |
| PATCH | `/api/v1/productos/:id/estado` | Cambiar el estado de un producto | HU-30 |
| GET | `/api/v1/reportes/inventario?desde&hasta&producto&tipo&formato` | Generar el reporte de inventario | HU-31 |
| GET | `/api/v1/configuracion/alertas-stock` | Recibir alertas de stock mínimo por correo | HU-32 |
| PUT | `/api/v1/configuracion/alertas-stock` | Actualizar (alertas stock) | HU-32 |
| GET | `/api/v1/productos/alertas` | Listar o consultar alertas | HU-32 |

**Pantallas (frontend vanilla):**

- Existencias › Productos › Nuevo producto — HU-25
- Existencias › Productos › Existencia inicial — HU-26
- Existencias (listado) — HU-27
- Existencias › Ajustar; Existencias › Kardex — HU-28
- Existencias › Productos › Límites de stock — HU-29
- Existencias (Cambiar estado) — HU-30
- Existencias › Reporte — HU-31
- Configuración › Alertas de stock; Inicio (alerta) — HU-32

**Modelo de datos (lógico):**

*Producto*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_producto | INT | PK |
| codigo | VARCHAR(20) | único |
| nombre | VARCHAR(100) | obligatorio |
| tipo | ENUM('licor','cerveza','coctel','bebida_sin_alcohol','snack','insumo') |  |
| unidad | VARCHAR(20) |  |
| precio_venta | DECIMAL(12,2) | > 0 |
| costo_promedio | DECIMAL(12,2) | ≥ 0 |
| stock | INT | ≥ 0 |
| stock_minimo | INT | ≥ 0 |
| stock_maximo | INT | > stock_minimo |
| contiene_alcohol | BOOLEAN |  |
| estado | ENUM('activo','inactivo','agotado') |  |
| created_at | DATETIME |  |

*MovimientoInventario*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_movimiento | INT | PK |
| id_producto | INT | FK |
| tipo | ENUM('inicial','compra','venta','ajuste_entrada','ajuste_salida','anulacion') |  |
| cantidad | INT |  |
| stock_resultante | INT |  |
| motivo | VARCHAR(200) |  |
| documento_ref | VARCHAR(30) |  |
| id_usuario | INT | FK |
| fecha | DATETIME |  |

*ConfigAlertaStock*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_config | INT | PK |
| correos | VARCHAR(500) | lista de correos válidos |
| frecuencia | ENUM('inmediata','diaria','semanal') |  |
| activa | BOOLEAN |  |

**Reglas de negocio:**

- **RN-08**: stock_minimo debe ser menor que stock_maximo; un ajuste manual no deja la existencia por debajo de cero ni por encima del máximo; todo cambio de existencia genera un movimiento.
- **RN-09**: Un producto con existencia 0 pasa a «agotado» automáticamente y vuelve a «activo» al recibir una compra; un producto inactivo no se vende.

**Validaciones de campos por historia:**

- HU-25: codigo (≤20, único); nombre (3–100); tipo; precio_venta (> 0); stock_minimo (≥ 0) < stock_maximo

## Trazabilidad

| Historia spec | HU | RF | Excel |
|---|---|---|---|
| 1 | HU-25 | RF-PRD-01 | Inferida (ficha) |
| 2 | HU-26 | RF-PRD-02 | HU_43, HU_49 |
| 3 | HU-27 | RF-PRD-03 | HU_44, HU_50 |
| 4 | HU-28 | RF-PRD-04, RF-PRD-05 | HU_45, HU_51 |
| 5 | HU-29 | RF-PRD-06 | HU_46, HU_53 |
| 6 | HU-30 | RF-PRD-07, RF-PRD-08 | HU_52 |
| 7 | HU-31 | RF-PRD-09 | HU_47, HU_54 |
| 8 | HU-32 | RF-PRD-10, RF-PRD-11, RF-PRD-12 | HU_48, HU_55 |

