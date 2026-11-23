# Feature Specification: Pedidos

**Feature Branch**: `016-pedidos`  
**Created**: 2026-11-21  
**Status**: Draft  
**Proyecto**: Sistema de Gestión Integral para Discoteca (Discoteca (Envigado)) · **SRS**: `SRS-Discoteca-v2.0.md` §4.16 · **Historias**: HU-111 – HU-119  
**Input**: "Gestiona los pedidos de consumo en mesas, salas VIP y barra: productos y servicios, mesero, cliente, estados con historial y descuento de existencias al entregar. Los clientes pueden hacer pre-pedidos asociados a su reserva. Actores: Administrador, Empleado, Cliente."

> Spec generada a partir del SRS v2.0 y de las historias de usuario del proyecto. Respeta la estructura de `spec-template.md` de spec-kit; los encabezados van en español con su equivalente en inglés. Antes de `/speckit.plan`, ejecute `/speckit.clarify` si hay marcas `[NEEDS CLARIFICATION]`.

## Escenarios de usuario y pruebas (User Scenarios & Testing) *(obligatorio)*

### Historia 1 — Registrar un pedido (Prioridad: P1) · HU-111

**Como** Administrador o Empleado, **quiero** registrar un pedido con ubicación, mesero, cliente, productos, cantidades y método de pago, **para** iniciar su atención y cobro.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite iniciar su atención y cobro.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/pedidos` y en la pantalla «Pedidos › Nuevo pedido (vista móvil para meseros)», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** la mesa 12, el mesero, dos productos con cantidad y el método de pago previsto, **cuando** registro, **entonces** el pedido queda en «pendiente de confirmación» con número único, fecha y hora automáticas y veo su resumen.
2. **Dado** un producto sin existencia suficiente o inactivo, **cuando** lo agrego, **entonces** el sistema lo impide mostrando la existencia disponible.
3. **Dado** campos obligatorios vacíos, **cuando** registro, **entonces** veo los errores.

### Historia 2 — Consultar pedidos y su estado (Prioridad: P1) · HU-112

**Como** Administrador o Empleado, **quiero** buscar pedidos y ver su estado e historial, **para** rastrear su progreso.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite rastrear su progreso.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/pedidos?q&estado&cliente&ubicacion&desde&hasta&page&limit`, `GET /api/v1/pedidos/:id` y en la pantalla «Pedidos (tablero por estado y detalle)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el buscador, **cuando** busco por número, fecha, estado, cliente o ubicación, **entonces** veo los pedidos con su estado actual.
2. **Dado** un pedido, **cuando** abro su detalle, **entonces** veo productos, cliente, ubicación, mesero, total y la fecha y hora de cada cambio de estado.

### Historia 3 — Actualizar un pedido (Prioridad: P1) · HU-113

**Como** Administrador o Empleado, **quiero** agregar o quitar productos, cambiar cantidades y método de pago de un pedido, **para** ajustarlo a lo que pide el cliente.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite ajustarlo a lo que pide el cliente.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PUT /api/v1/pedidos/:id` y en la pantalla «Pedidos › Editar», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un pedido en preparación, **cuando** agrego un producto y cambio una cantidad, **entonces** el total se recalcula y se registran fecha, hora y empleado de la modificación.
2. **Dado** un pedido entregado, pagado o cancelado, **cuando** intento modificarlo, **entonces** el sistema lo impide.

### Historia 4 — Cambiar el estado de un pedido (Prioridad: P1) · HU-114

**Como** Administrador o Empleado, **quiero** avanzar el pedido por sus estados con una nota, **para** gestionar el flujo de atención.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite gestionar el flujo de atención.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PATCH /api/v1/pedidos/:id/estado` y en la pantalla «Pedidos (Cambiar estado)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un pedido en preparación, **cuando** lo marco entregado, **entonces** se descuentan las existencias, el cambio queda con fecha, hora, empleado y nota y veo la confirmación.
2. **Dado** que soy Empleado, **cuando** intento cancelar un pedido en preparación, **entonces** el sistema lo impide (solo Administrador).

### Historia 5 — Asociar un cliente a un pedido (Prioridad: P2) · HU-115

**Como** Administrador o Empleado, **quiero** vincular un cliente registrado a un pedido, **para** tener su información y acumularle puntos.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite tener su información y acumularle puntos.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PATCH /api/v1/pedidos/:id/cliente` y en la pantalla «Pedidos › Detalle (Asociar cliente)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un pedido, **cuando** busco al cliente por nombre, documento o escaneando su QR y lo selecciono, **entonces** queda asociado con fecha y hora y veo la confirmación.
2. **Dado** un cliente inactivo o inexistente, **cuando** intento asociarlo, **entonces** el sistema lo impide.

### Historia 6 — Generar el reporte de pedidos (Prioridad: P2) · HU-116

**Como** Administrador o Empleado, **quiero** generar reportes de pedidos por fecha, estado, cliente y producto, **para** analizar el proceso de pedidos.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite analizar el proceso de pedidos.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/reportes/pedidos?desde&hasta&estado&cliente&producto&formato` y en la pantalla «Pedidos › Reporte», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un rango de fechas, **cuando** genero el reporte, **entonces** veo cantidad de pedidos por estado, total vendido, productos más pedidos y tiempo promedio de entrega, en PDF o CSV.

### Historia 7 — Hacer un pre-pedido como cliente (Prioridad: P2) · HU-117

**Como** Cliente, **quiero** pedir con anticipación productos o servicios para mi reserva, **para** tener todo listo al llegar.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite tener todo listo al llegar.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/clientes/me/pedidos` y en la pantalla «Portal del cliente › Mis reservas › Pre-pedido», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** mi reserva confirmada, **cuando** agrego dos botellas y elijo el método de pago previsto, **entonces** se genera un número de pedido en estado pendiente de confirmación y recibo un correo de confirmación.
2. **Dado** que no tengo reservas confirmadas, **cuando** intento hacer un pre-pedido, **entonces** el sistema me lo indica.

### Historia 8 — Consultar mis pedidos (Prioridad: P2) · HU-118

**Como** Cliente, **quiero** ver mis pedidos y su estado, **para** hacer seguimiento.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite hacer seguimiento.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/clientes/me/pedidos?q&desde&hasta` y en la pantalla «Portal del cliente › Mis pedidos», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** Mis pedidos, **cuando** busco por número o rango de fechas, **entonces** veo cada pedido con productos, cantidades, fecha, ubicación y estado.

### Historia 9 — Modificar mi pedido (Prioridad: P3) · HU-119

**Como** Cliente, **quiero** cambiar mi pre-pedido antes de que se prepare, **para** ajustarlo.

**Por qué esta prioridad (Why this priority)**: Prioridad Baja en el backlog del proyecto. Aporta valor porque permite ajustarlo.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PUT /api/v1/clientes/me/pedidos/:id` y en la pantalla «Portal del cliente › Mis pedidos › Editar», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** mi pedido pendiente de confirmación, **cuando** cambio cantidades o el método de pago, **entonces** se valida, se guarda y recibo un correo de confirmación.
2. **Dado** un pedido en preparación, **cuando** intento modificarlo, **entonces** veo que ya no es posible.

### Casos límite (Edge Cases)

- Producto agotado mientras se arma el pedido: al confirmar, 409 con la existencia disponible.
- Pre-pedido del cliente para una reserva cancelada: el pre-pedido se cancela automáticamente.

## Requerimientos (Requirements) *(obligatorio)*

### Requerimientos funcionales (Functional Requirements)

- **FR-001**: El sistema DEBE registrar pedidos con ubicación (barra, mesa o sala), mesero, cliente opcional, productos y servicios activos con cantidad y precio, y método de pago previsto, con número único, fecha y hora automáticas, en estado pendiente de confirmación. *(RF-PED-01 · HU-111)*
- **FR-002**: El sistema DEBE validar la existencia disponible de cada producto al agregarlo. *(RF-PED-02 · HU-111)*
- **FR-003**: El sistema DEBE buscar pedidos por número, fecha, estado, cliente y ubicación y mostrar su detalle con el historial de estados. *(RF-PED-03 · HU-112)*
- **FR-004**: El sistema DEBE permitir agregar y quitar productos, cambiar cantidades, ubicación y método de pago en pedidos no entregados, recalculando el total y registrando fecha, hora y empleado. *(RF-PED-04 · HU-113)*
- **FR-005**: El sistema DEBE cambiar el estado del pedido solo a estados válidos del flujo, con nota opcional, registrando fecha, hora y usuario, y restringiendo por rol la cancelación de pedidos en preparación. *(RF-PED-05 · HU-114)*
- **FR-006**: El sistema DEBE descontar las existencias al marcar el pedido como entregado, en la misma transacción. *(RF-PED-06 · HU-114)*
- **FR-007**: El sistema DEBE asociar un cliente activo a un pedido buscándolo por nombre, documento o QR, registrando fecha y hora de la asociación. *(RF-PED-07 · HU-115)*
- **FR-008**: El sistema DEBE generar reportes de pedidos filtrables por fecha, estado, cliente y producto con cantidad, total, productos más pedidos y tiempo promedio de entrega, en PDF o CSV. *(RF-PED-08 · HU-116)*
- **FR-009**: El sistema DEBE permitir al cliente registrar pre-pedidos asociados a una reserva propia confirmada, con productos, cantidades y método de pago previsto, confirmándolos por correo. *(RF-PED-09 · HU-117)*
- **FR-010**: El sistema DEBE mostrar al cliente sus pedidos con búsqueda por número o rango de fechas y detalle de productos y estado. *(RF-PED-10 · HU-118)*
- **FR-011**: El sistema DEBE permitir al cliente modificar productos, cantidades y método de pago de sus pedidos en estado pendiente de confirmación, notificándole el cambio por correo. *(RF-PED-11 · HU-119)*
- **FR-012**: [NEEDS CLARIFICATION: La matriz incluye dirección de envío y estado «enviado»: confirmar que no hay domicilios y que los pedidos se consumen en el local — TBD-09.]

### Requerimientos no funcionales aplicables

Aplican todos los principios de `constitution.md` y los RNF transversales del SRS §5. En particular:

- **RNF-SAF-01**: El sistema debe impedir registrar como cliente, dejar ingresar y vender a personas menores de 18 años según su fecha de nacimiento, porque la venta de alcohol a menores está prohibida (Ley 124 de 1994).
- **RNF-SAF-03**: Ninguna venta, pedido entregado o anulación debe dejar existencias negativas ni saldos de puntos inconsistentes: el ajuste ocurre en la misma transacción que la operación.
- **RNF-PRI-02**: Un Cliente solo accede a su propia información; los reportes y listados con datos de otros clientes, ventas o empleados solo están disponibles para roles internos con permiso.

### Entidades clave (Key Entities)

- **Pedido**: Pedido de consumo. Atributos: id_pedido, numero, fecha_hora, id_cliente, id_espacio, id_reserva, ubicacion, id_empleado, metodo_pago_previsto, total, estado, origen, updated_at.
- **PedidoDetalle**: Ítem. Atributos: id_detalle, id_pedido, id_producto, id_servicio, cantidad, precio_unitario, subtotal.
- **HistorialPedido**: Estados y cambios. Atributos: id_historial, id_pedido, estado_anterior, estado_nuevo, nota, id_usuario, fecha.

## Criterios de éxito (Success Criteria) *(obligatorio)*

### Resultados medibles (Measurable Outcomes)

- **SC-001**: Un mesero registra un pedido de 5 productos en menos de 1 minuto desde el celular.
- **SC-002**: El 100 % de los pedidos entregados descuenta existencias.

## Supuestos (Assumptions)

- Se implementa después de (o junto con) las specs: 005-productos-existencias, 007-clientes, 013-reservas.
- La autenticación JWT y la autorización por permisos están disponibles (spec de acceso); mientras no lo estén, los endpoints se prueban con un usuario semilla.

## Insumos para `/speckit.plan` (no normativo)

Detalle orientativo para el plan técnico. No reemplaza las decisiones del plan, pero cualquier desviación debe quedar justificada en `plan.md`.

**API REST sugerida** (base `/api/v1`, sobre `{ ok, data, meta, error }`):

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/pedidos` | Registrar un pedido | HU-111 |
| GET | `/api/v1/pedidos?q&estado&cliente&ubicacion&desde&hasta&page&limit` | Consultar pedidos y su estado | HU-112 |
| GET | `/api/v1/pedidos/:id` | Consultar detalle (pedidos) | HU-112 |
| PUT | `/api/v1/pedidos/:id` | Actualizar un pedido | HU-113 |
| PATCH | `/api/v1/pedidos/:id/estado` | Cambiar el estado de un pedido | HU-114 |
| PATCH | `/api/v1/pedidos/:id/cliente` | Asociar un cliente a un pedido | HU-115 |
| GET | `/api/v1/reportes/pedidos?desde&hasta&estado&cliente&producto&formato` | Generar el reporte de pedidos | HU-116 |
| POST | `/api/v1/clientes/me/pedidos` | Hacer un pre-pedido como cliente | HU-117 |
| GET | `/api/v1/clientes/me/pedidos?q&desde&hasta` | Consultar mis pedidos | HU-118 |
| PUT | `/api/v1/clientes/me/pedidos/:id` | Modificar mi pedido | HU-119 |

**Pantallas (frontend vanilla):**

- Pedidos › Nuevo pedido (vista móvil para meseros) — HU-111
- Pedidos (tablero por estado y detalle) — HU-112
- Pedidos › Editar — HU-113
- Pedidos (Cambiar estado) — HU-114
- Pedidos › Detalle (Asociar cliente) — HU-115
- Pedidos › Reporte — HU-116
- Portal del cliente › Mis reservas › Pre-pedido — HU-117
- Portal del cliente › Mis pedidos — HU-118
- Portal del cliente › Mis pedidos › Editar — HU-119

**Modelo de datos (lógico):**

*Pedido*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_pedido | INT | PK |
| numero | VARCHAR(12) | único |
| fecha_hora | DATETIME | del servidor |
| id_cliente | INT | FK, opcional |
| id_espacio | INT | FK, opcional |
| id_reserva | INT | FK, opcional |
| ubicacion | VARCHAR(40) | barra, mesa o sala |
| id_empleado | INT | FK, mesero |
| metodo_pago_previsto | ENUM('efectivo','tarjeta','transferencia') |  |
| total | DECIMAL(14,2) | calculado |
| estado | ENUM('pendiente_confirmacion','en_preparacion','entregado','cancelado','pagado') |  |
| origen | ENUM('interno','cliente') |  |
| updated_at | DATETIME |  |

*PedidoDetalle*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_detalle | INT | PK |
| id_pedido | INT | FK |
| id_producto | INT | FK, opcional |
| id_servicio | INT | FK, opcional |
| cantidad | INT | > 0 |
| precio_unitario | DECIMAL(12,2) |  |
| subtotal | DECIMAL(14,2) |  |

*HistorialPedido*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_historial | INT | PK |
| id_pedido | INT | FK |
| estado_anterior | VARCHAR(30) |  |
| estado_nuevo | VARCHAR(30) |  |
| nota | VARCHAR(200) |  |
| id_usuario | INT | FK |
| fecha | DATETIME |  |

**Reglas de negocio:**

- **RN-31**: Flujo: pendiente de confirmación → en preparación → entregado → pagado (al cobrarlo como venta); cancelado desde pendiente o en preparación. Solo el Administrador cancela pedidos en preparación.
- **RN-32**: Un pedido solo se modifica antes de entregarse; al pasar a entregado se descuentan las existencias en la misma transacción; productos con alcohol solo para clientes mayores de 18 años.

## Trazabilidad

| Historia spec | HU | RF | Excel |
|---|---|---|---|
| 1 | HU-111 | RF-PED-01, RF-PED-02 | HU_183, HU_189 |
| 2 | HU-112 | RF-PED-03 | HU_184, HU_190 |
| 3 | HU-113 | RF-PED-04 | HU_185, HU_191 |
| 4 | HU-114 | RF-PED-05, RF-PED-06 | HU_186, HU_192 |
| 5 | HU-115 | RF-PED-07 | HU_187, HU_193 |
| 6 | HU-116 | RF-PED-08 | HU_188, HU_194 |
| 7 | HU-117 | RF-PED-09 | HU_195 |
| 8 | HU-118 | RF-PED-10 | HU_196 |
| 9 | HU-119 | RF-PED-11 | HU_197 |

