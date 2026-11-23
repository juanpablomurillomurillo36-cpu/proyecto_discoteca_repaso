# Feature Specification: Ventas

**Feature Branch**: `017-ventas`  
**Created**: 2026-11-21  
**Status**: Draft  
**Proyecto**: Sistema de Gestión Integral para Discoteca (Discoteca (Envigado)) · **SRS**: `SRS-Discoteca-v2.0.md` §4.17 · **Historias**: HU-120 – HU-125  
**Input**: "Registra las ventas (venta directa en barra o cobro de un pedido entregado) con descuentos VIP, canjes e impuestos, descuenta existencias, acumula puntos y emite el comprobante de pago numerado. Actores: Administrador, Empleado."

> Spec generada a partir del SRS v2.0 y de las historias de usuario del proyecto. Respeta la estructura de `spec-template.md` de spec-kit; los encabezados van en español con su equivalente en inglés. Antes de `/speckit.plan`, ejecute `/speckit.clarify` si hay marcas `[NEEDS CLARIFICATION]`.

## Escenarios de usuario y pruebas (User Scenarios & Testing) *(obligatorio)*

### Historia 1 — Registrar una venta (Prioridad: P1) · HU-120

**Como** Administrador o Empleado, **quiero** registrar una venta con productos, cantidades, precios, descuentos, impuestos y método de pago, **para** llevar el control de las transacciones y cobrar sin errores.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite llevar el control de las transacciones y cobrar sin errores.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/ventas` y en la pantalla «Ventas › Nueva venta (caja / barra)», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** dos productos buscados por nombre o código con cantidades mayores que cero y pago en efectivo, **cuando** registro la venta sin cliente, **entonces** queda pagada como consumidor final con número de comprobante, fecha y hora automáticas, las existencias se descuentan y veo el mensaje de confirmación.
2. **Dado** un cliente VIP identificado con su QR, **cuando** registro su venta, **entonces** se aplica el descuento de su nivel y se le acumulan los puntos.
3. **Dado** una cantidad 0 o un producto sin existencia, **cuando** registro, **entonces** veo el mensaje de error.

### Historia 2 — Cobrar un pedido (Prioridad: P1) · HU-121

**Como** Empleado o Administrador, **quiero** convertir un pedido entregado en venta y cobrarlo, **para** cerrar la cuenta de una mesa sin volver a digitar productos.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite cerrar la cuenta de una mesa sin volver a digitar productos.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/pedidos/:id/cobro` y en la pantalla «Pedidos › Detalle (Cobrar)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el pedido entregado de la mesa 12, **cuando** pulso «Cobrar» y registro el pago con tarjeta, **entonces** se crea la venta pagada con sus ítems, el pedido pasa a pagado y se emite el comprobante.
2. **Dado** una mesa con consumo mínimo de reserva no alcanzado, **cuando** cobro, **entonces** el sistema muestra la diferencia para que se agregue o se cobre.

### Historia 3 — Consultar ventas (Prioridad: P1) · HU-122

**Como** Administrador o Empleado, **quiero** buscar ventas y ver su detalle, **para** revisar las transacciones.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite revisar las transacciones.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/ventas?q&desde&hasta&cliente&producto&estado&sort&page&limit&formato`, `GET /api/v1/ventas/:id` y en la pantalla «Ventas (historial y detalle)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el historial de ventas, **cuando** filtro por rango de fechas, cliente y producto, **entonces** veo número, fecha, cliente, total, método de pago y estado, ordenables.
2. **Dado** una venta, **cuando** abro su detalle, **entonces** veo productos, cantidades, precios, descuentos, impuestos, método de pago, estado y puedo exportar la lista a CSV o PDF.

### Historia 4 — Cambiar el estado de una venta (Prioridad: P1) · HU-123

**Como** Administrador o Empleado, **quiero** cambiar el estado de una venta a un estado válido, **para** reflejar su progreso o anularla.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite reflejar su progreso o anularla.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PATCH /api/v1/ventas/:id/estado` y en la pantalla «Ventas › Detalle (Cambiar estado)», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** una venta pendiente de pago, **cuando** la marco pagada, **entonces** se registra fecha y hora, se descuentan existencias y se otorgan puntos.
2. **Dado** una venta pagada, **cuando** el Administrador la anula con motivo, **entonces** se devuelven las existencias, se revierten los puntos y el cambio queda en el historial.
3. **Dado** que soy Empleado, **cuando** intento anular una venta pagada, **entonces** el sistema lo impide.

### Historia 5 — Generar el comprobante de pago (Prioridad: P1) · HU-124

**Como** Administrador o Empleado, **quiero** generar el comprobante de pago de cada venta, **para** entregar al cliente un registro válido de la transacción.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite entregar al cliente un registro válido de la transacción.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/ventas/:id/comprobante.pdf`, `POST /api/v1/ventas/comprobantes`, `POST /api/v1/ventas/:id/comprobante/envio` y en la pantalla «Ventas › Detalle (Comprobante)», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** una venta pagada, **cuando** genero el comprobante, **entonces** obtengo en 3 segundos o menos un PDF imprimible con número único, datos de la empresa, fecha, cliente, productos, cantidades, precios, descuentos, impuestos, total y puntos acumulados.
2. **Dado** varias ventas seleccionadas, **cuando** genero sus comprobantes, **entonces** obtengo un solo PDF con todos.
3. **Dado** un cliente con correo, **cuando** pulso «Enviar», **entonces** recibe el comprobante por correo.

### Historia 6 — Generar el reporte de ventas (Prioridad: P2) · HU-125

**Como** Administrador o Empleado, **quiero** generar reportes de ventas por periodo con gráficos y filtros, **para** analizar las ventas.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite analizar las ventas.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/reportes/ventas?periodo&desde&hasta&cliente&producto&metodo&formato` y en la pantalla «Ventas › Reporte», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el periodo semanal y el filtro de método de pago, **cuando** genero el reporte, **entonces** veo total vendido, cantidad de ventas, ticket promedio y productos más vendidos en tablas y gráficos, exportable a CSV, Excel o PDF.

### Casos límite (Edge Cases)

- Venta con productos con alcohol a cliente identificado como menor de edad: se rechaza.
- Cliente sin puntos suficientes para revertir (ya los canjeó): la anulación deja saldo negativo bloqueado hasta nuevas acumulaciones y queda en la bitácora.

## Requerimientos (Requirements) *(obligatorio)*

### Requerimientos funcionales (Functional Requirements)

- **FR-001**: El sistema DEBE registrar ventas con o sin cliente, uno o más productos o servicios con cantidad y precio mayores que cero, descuentos, impuestos y método de pago, asignando número de comprobante y fecha y hora automáticas. *(RF-VEN-01 · HU-120)*
- **FR-002**: El sistema DEBE aplicar automáticamente el descuento del nivel VIP del cliente y calcular el total en el servidor. *(RF-VEN-02 · HU-120)*
- **FR-003**: El sistema DEBE descontar existencias y otorgar los puntos al cliente cuando la venta queda pagada, en la misma transacción. *(RF-VEN-03 · HU-120)*
- **FR-004**: El sistema DEBE crear la venta pagada a partir de un pedido entregado, con sus ítems y precios, y pasar el pedido a pagado. *(RF-VEN-04 · HU-121)*
- **FR-005**: El sistema DEBE advertir al cobrar cuando no se alcanza el consumo mínimo de la reserva asociada. *(RF-VEN-05 · HU-121)*
- **FR-006**: El sistema DEBE buscar ventas por número, fecha, cliente y producto con orden y filtros, mostrar su detalle y exportar el listado a CSV y PDF. *(RF-VEN-06 · HU-122)*
- **FR-007**: El sistema DEBE cambiar el estado de la venta solo a estados válidos (pendiente de pago → pagada → anulada), mostrando la lista de estados posibles, con confirmación e historial de cambios. *(RF-VEN-07 · HU-123)*
- **FR-008**: El sistema DEBE permitir solo al Administrador anular ventas pagadas, con motivo, devolviendo existencias y revirtiendo puntos en la misma transacción. *(RF-VEN-08 · HU-123)*
- **FR-009**: El sistema DEBE generar el comprobante de pago en PDF imprimible, con número único y datos de la empresa y de la venta, para una o varias ventas a la vez. *(RF-VEN-09 · HU-124)*
- **FR-010**: El sistema DEBE permitir enviar el comprobante por correo al cliente. *(RF-VEN-10 · HU-124)*
- **FR-011**: El sistema DEBE generar reportes de ventas por periodo (diario, semanal, mensual, anual), filtrables por cliente, producto y método de pago, con totales, cantidad, productos más vendidos y gráficos, exportables a CSV, Excel y PDF. *(RF-VEN-11 · HU-125)*
- **FR-012**: [NEEDS CLARIFICATION: Impuesto aplicable (IVA o impuesto nacional al consumo) y si se requiere factura electrónica DIAN en lugar del comprobante interno — TBD-03.]

### Requerimientos no funcionales aplicables

Aplican todos los principios de `constitution.md` y los RNF transversales del SRS §5. En particular:

- **RNF-SAF-01**: El sistema debe impedir registrar como cliente, dejar ingresar y vender a personas menores de 18 años según su fecha de nacimiento, porque la venta de alcohol a menores está prohibida (Ley 124 de 1994).
- **RNF-SAF-03**: Ninguna venta, pedido entregado o anulación debe dejar existencias negativas ni saldos de puntos inconsistentes: el ajuste ocurre en la misma transacción que la operación.
- **RNF-REN-03**: Los comprobantes de venta deben generarse en 3 s o menos; los reportes en PDF, CSV o Excel en 10 s o menos para un año de datos.

### Entidades clave (Key Entities)

- **Venta**: Transacción. Atributos: id_venta, numero_comprobante, fecha_hora, id_cliente, id_pedido, id_empleado, metodo_pago, subtotal, descuento, impuesto, total, puntos_otorgados, estado, motivo_anulacion.
- **VentaDetalle**: Ítem vendido. Atributos: id_detalle, id_venta, id_producto, id_servicio, cantidad, precio_unitario, descuento, subtotal.
- **HistorialEstadoVenta**: Cambios. Atributos: id_historial, id_venta, estado_anterior, estado_nuevo, nota, id_usuario, fecha.

## Criterios de éxito (Success Criteria) *(obligatorio)*

### Resultados medibles (Measurable Outcomes)

- **SC-001**: Un cajero registra una venta de barra de 3 productos en menos de 30 segundos.
- **SC-002**: El total de los comprobantes coincide con la suma de sus ítems, descuentos e impuestos en el 100 % de las pruebas.

## Supuestos (Assumptions)

- Se implementa después de (o junto con) las specs: 016-pedidos, 005-productos-existencias.
- La autenticación JWT y la autorización por permisos están disponibles (spec de acceso); mientras no lo estén, los endpoints se prueban con un usuario semilla.

## Insumos para `/speckit.plan` (no normativo)

Detalle orientativo para el plan técnico. No reemplaza las decisiones del plan, pero cualquier desviación debe quedar justificada en `plan.md`.

**API REST sugerida** (base `/api/v1`, sobre `{ ok, data, meta, error }`):

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/ventas` | Registrar una venta | HU-120 |
| POST | `/api/v1/pedidos/:id/cobro` | Cobrar un pedido | HU-121 |
| GET | `/api/v1/ventas?q&desde&hasta&cliente&producto&estado&sort&page&limit&formato` | Consultar ventas | HU-122 |
| GET | `/api/v1/ventas/:id` | Consultar detalle (ventas) | HU-122 |
| PATCH | `/api/v1/ventas/:id/estado` | Cambiar el estado de una venta | HU-123 |
| GET | `/api/v1/ventas/:id/comprobante.pdf` | Generar el comprobante de pago | HU-124 |
| POST | `/api/v1/ventas/comprobantes` | (lote) | HU-124 |
| POST | `/api/v1/ventas/:id/comprobante/envio` | Registrar (envio) | HU-124 |
| GET | `/api/v1/reportes/ventas?periodo&desde&hasta&cliente&producto&metodo&formato` | Generar el reporte de ventas | HU-125 |

**Pantallas (frontend vanilla):**

- Ventas › Nueva venta (caja / barra) — HU-120
- Pedidos › Detalle (Cobrar) — HU-121
- Ventas (historial y detalle) — HU-122
- Ventas › Detalle (Cambiar estado) — HU-123
- Ventas › Detalle (Comprobante) — HU-124
- Ventas › Reporte — HU-125

**Modelo de datos (lógico):**

*Venta*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_venta | INT | PK |
| numero_comprobante | VARCHAR(20) | consecutivo único |
| fecha_hora | DATETIME | del servidor |
| id_cliente | INT | FK, opcional (consumidor final) |
| id_pedido | INT | FK, opcional |
| id_empleado | INT | FK |
| metodo_pago | ENUM('efectivo','tarjeta','transferencia','mixto') |  |
| subtotal | DECIMAL(14,2) |  |
| descuento | DECIMAL(14,2) |  |
| impuesto | DECIMAL(14,2) |  |
| total | DECIMAL(14,2) | > 0 |
| puntos_otorgados | INT |  |
| estado | ENUM('pendiente_pago','pagada','anulada') |  |
| motivo_anulacion | VARCHAR(200) |  |

*VentaDetalle*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_detalle | INT | PK |
| id_venta | INT | FK |
| id_producto | INT | FK, opcional |
| id_servicio | INT | FK, opcional |
| cantidad | INT | > 0 |
| precio_unitario | DECIMAL(12,2) | > 0 |
| descuento | DECIMAL(12,2) |  |
| subtotal | DECIMAL(14,2) |  |

*HistorialEstadoVenta*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_historial | INT | PK |
| id_venta | INT | FK |
| estado_anterior | VARCHAR(20) |  |
| estado_nuevo | VARCHAR(20) |  |
| nota | VARCHAR(200) |  |
| id_usuario | INT | FK |
| fecha | DATETIME |  |

**Reglas de negocio:**

- **RN-33**: El servidor calcula subtotal, descuentos (nivel VIP, canjes), impuesto y total; el número de comprobante es consecutivo y no se reutiliza.
- **RN-34**: Al quedar pagada, la venta descuenta existencias (si no vienen de un pedido ya entregado) y otorga puntos al cliente; al anularse, devuelve existencias y revierte los puntos en la misma transacción.
- **RN-35**: Solo el Administrador anula ventas pagadas, con motivo.

**Validaciones de campos por historia:**

- HU-120: productos (≥1): cantidad (> 0), precio (> 0); metodo_pago; id_cliente (opcional, activo, mayor de edad si hay alcohol)

## Trazabilidad

| Historia spec | HU | RF | Excel |
|---|---|---|---|
| 1 | HU-120 | RF-VEN-01, RF-VEN-02, RF-VEN-03 | HU_153, HU_158 |
| 2 | HU-121 | RF-VEN-04, RF-VEN-05 | Inferida (ficha) |
| 3 | HU-122 | RF-VEN-06 | HU_154, HU_159 |
| 4 | HU-123 | RF-VEN-07, RF-VEN-08 | HU_155, HU_160 |
| 5 | HU-124 | RF-VEN-09, RF-VEN-10 | HU_156, HU_161 |
| 6 | HU-125 | RF-VEN-11 | HU_157, HU_162 |

