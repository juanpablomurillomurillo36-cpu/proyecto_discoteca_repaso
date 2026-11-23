# Feature Specification: Programa de puntos

**Feature Branch**: `019-programa-puntos`  
**Created**: 2026-11-21  
**Status**: Draft  
**Proyecto**: Sistema de Gestión Integral para Discoteca (Discoteca (Envigado)) · **SRS**: `SRS-Discoteca-v2.0.md` §4.19 · **Historias**: HU-133 – HU-139  
**Input**: "Fideliza a los clientes con puntos por consumo y por ingreso, canjeables por recompensas (descuentos, productos o entradas gratis), con historial y comprobantes. Actores: Administrador, Empleado, Cliente."

> Spec generada a partir del SRS v2.0 y de las historias de usuario del proyecto. Respeta la estructura de `spec-template.md` de spec-kit; los encabezados van en español con su equivalente en inglés. Antes de `/speckit.plan`, ejecute `/speckit.clarify` si hay marcas `[NEEDS CLARIFICATION]`.

## Escenarios de usuario y pruebas (User Scenarios & Testing) *(obligatorio)*

### Historia 1 — Configurar las reglas de acumulación de puntos (Prioridad: P2) · HU-133

**Como** Administrador, **quiero** definir cuántos puntos otorga cada consumo, producto, servicio o ingreso, **para** que los clientes acumulen puntos de forma automática.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite que los clientes acumulen puntos de forma automática.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/puntos/reglas`, `POST /api/v1/puntos/reglas`, `PUT /api/v1/puntos/reglas/:id` y en la pantalla «Puntos › Reglas», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** la regla «1 punto por cada $ 1.000 de consumo» y «10 puntos por ingreso», **cuando** las guardo, **entonces** cada venta pagada y cada ingreso otorgan los puntos correspondientes.
2. **Dado** una regla por producto para «Botella de whisky» de 100 puntos, **cuando** se vende, **entonces** se otorgan esos puntos en lugar de la regla por valor.

### Historia 2 — Configurar las recompensas (Prioridad: P2) · HU-134

**Como** Administrador, **quiero** definir las recompensas canjeables y sus puntos requeridos, **para** ofrecer incentivos a los clientes.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite ofrecer incentivos a los clientes.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/puntos/recompensas`, `POST /api/v1/puntos/recompensas`, `PUT /api/v1/puntos/recompensas/:id` y en la pantalla «Puntos › Recompensas», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** la recompensa «Entrada gratis» por 500 puntos, **cuando** la guardo, **entonces** aparece en la lista de recompensas del perfil del cliente.
2. **Dado** una recompensa con stock agotado, **cuando** un cliente intenta canjearla, **entonces** se indica que no está disponible.

### Historia 3 — Consultar el saldo de puntos de un cliente (Prioridad: P2) · HU-135

**Como** Administrador o Empleado, **quiero** buscar un cliente y ver su saldo e historial de puntos, **para** atender sus consultas y controlar el programa.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite atender sus consultas y controlar el programa.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/puntos/clientes/:idCliente`, `GET /api/v1/puntos/clientes/:idCliente/movimientos` y en la pantalla «Puntos › Consultar saldo», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** la búsqueda por id, nombre, documento o escaneo del QR, **cuando** encuentro al cliente, **entonces** veo su saldo, la fecha de su última actualización y el historial de acumulaciones y canjes.
2. **Dado** un cliente inexistente, **cuando** busco, **entonces** veo «Cliente no encontrado».

### Historia 4 — Acumular puntos por consumo e ingreso (Prioridad: P1) · HU-136

**Como** Empleado, **quiero** que el cliente identificado acumule puntos al pagar su consumo o al ingresar, **para** premiar su fidelidad sin trámites adicionales.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite premiar su fidelidad sin trámites adicionales.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `(parte de` y en la pantalla «Ventas › Nueva venta (cliente y puntos)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** una venta pagada de $ 200.000 a un cliente identificado por su QR, con 1 punto por cada $ 1.000, **cuando** se registra, **entonces** acumula 200 puntos (300 si es VIP con multiplicador 1,5), su saldo se actualiza en tiempo real y el comprobante muestra los puntos y el nuevo saldo.
2. **Dado** un ingreso registrado, **cuando** existe la regla por ingreso, **entonces** se acumulan esos puntos una sola vez por noche.

### Historia 5 — Canjear puntos (Prioridad: P1) · HU-137

**Como** Empleado, **quiero** canjear los puntos de un cliente por una recompensa, **para** que disfrute los beneficios de su fidelidad.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite que disfrute los beneficios de su fidelidad.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/puntos/canjes` y en la pantalla «Puntos › Canjear», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un cliente con 650 puntos identificado por QR, **cuando** selecciono «Entrada gratis» (500 puntos), **entonces** se descuentan los puntos, queda en el historial y se genera el comprobante con el nuevo saldo de 150.
2. **Dado** puntos insuficientes, una recompensa no disponible o un cliente no encontrado, **cuando** intento canjear, **entonces** veo el error específico.

### Historia 6 — Generar el reporte del programa de puntos (Prioridad: P3) · HU-138

**Como** Administrador, **quiero** generar reportes de la actividad del programa de puntos, **para** analizar su efectividad.

**Por qué esta prioridad (Why this priority)**: Prioridad Baja en el backlog del proyecto. Aporta valor porque permite analizar su efectividad.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/reportes/puntos?desde&hasta&formato` y en la pantalla «Puntos › Reporte», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un rango de fechas, **cuando** genero el reporte, **entonces** veo puntos acumulados por todos los clientes, puntos canjeados por recompensa y la actividad diaria, exportable a CSV o PDF.

### Historia 7 — Consultar mis puntos y recompensas (Prioridad: P2) · HU-139

**Como** Cliente, **quiero** ver mi saldo de puntos, su historial y las recompensas que puedo canjear, **para** aprovechar los beneficios.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite aprovechar los beneficios.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/clientes/me/puntos` y en la pantalla «Portal del cliente › Mis puntos», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** que inicié sesión, **cuando** abro Mis puntos, **entonces** veo mi saldo, mis movimientos y las recompensas activas marcando cuáles alcanzo con mi saldo.

### Casos límite (Edge Cases)

- Dos canjes simultáneos del mismo cliente: el segundo recibe 409 si el saldo ya no alcanza.

## Requerimientos (Requirements) *(obligatorio)*

### Requerimientos funcionales (Functional Requirements)

- **FR-001**: El sistema DEBE gestionar reglas de acumulación por valor de consumo, por producto, por servicio y por ingreso, activables e inactivables, con prioridad de la regla específica sobre la general. *(RF-PUN-01 · HU-133)*
- **FR-002**: El sistema DEBE gestionar recompensas (descuento en próxima compra, producto gratis, entrada gratis) con puntos requeridos, stock opcional y estado. *(RF-PUN-02 · HU-134)*
- **FR-003**: El sistema DEBE mostrar al cliente en su perfil las recompensas activas disponibles. *(RF-PUN-03 · HU-134)*
- **FR-004**: El sistema DEBE mostrar el saldo de puntos de un cliente, buscado por id, nombre, documento o QR, con la fecha de última actualización y el historial de movimientos. *(RF-PUN-04 · HU-135)*
- **FR-005**: El sistema DEBE calcular y acumular puntos al pagar una venta con cliente identificado o al registrar su ingreso, aplicando las reglas activas y el multiplicador VIP, actualizando el saldo en tiempo real. *(RF-PUN-05 · HU-136)*
- **FR-006**: El sistema DEBE mostrar en el comprobante el consumo, los puntos acumulados y el saldo resultante. *(RF-PUN-06 · HU-136)*
- **FR-007**: El sistema DEBE canjear recompensas activas con disponibilidad verificando saldo suficiente, descontar los puntos y generar el comprobante del canje con el nuevo saldo. *(RF-PUN-07 · HU-137)*
- **FR-008**: El sistema DEBE registrar cada canje en el historial de movimientos y la bitácora. *(RF-PUN-08 · HU-137)*
- **FR-009**: El sistema DEBE generar reportes de puntos acumulados, puntos canjeados por recompensa y actividad del programa por rango de fechas, en CSV o PDF. *(RF-PUN-09 · HU-138)*
- **FR-010**: El sistema DEBE mostrar al cliente su saldo, su historial de movimientos y las recompensas activas indicando cuáles puede canjear. *(RF-PUN-10 · HU-139)*
- **FR-011**: [NEEDS CLARIFICATION: Equivalencia de puntos por consumo, puntos por ingreso y vencimiento de los puntos — TBD-07.]

### Requerimientos no funcionales aplicables

Aplican todos los principios de `constitution.md` y los RNF transversales del SRS §5. En particular:

- **RNF-SAF-03**: Ninguna venta, pedido entregado o anulación debe dejar existencias negativas ni saldos de puntos inconsistentes: el ajuste ocurre en la misma transacción que la operación.
- **RNF-SEG-07**: El sistema debe registrar en una bitácora (usuario, fecha y hora, acción, valores anterior y nuevo) los inicios de sesión, los cambios de roles y permisos, los cambios de estado, los ajustes de existencias, los movimientos de puntos y las anulaciones y eliminaciones.
- **RNF-PRI-02**: Un Cliente solo accede a su propia información; los reportes y listados con datos de otros clientes, ventas o empleados solo están disponibles para roles internos con permiso.

### Entidades clave (Key Entities)

- **ReglaPuntos**: Regla de acumulación. Atributos: id_regla, tipo, id_producto, id_servicio, valor_base, puntos, estado.
- **Recompensa**: Canjeable. Atributos: id_recompensa, nombre, tipo, puntos_requeridos, id_producto, valor_descuento, stock, estado.
- **MovimientoPuntos**: Kardex de puntos. Atributos: id_movimiento, id_cliente, tipo, puntos, saldo_resultante, id_venta, id_ingreso, id_recompensa, id_usuario, fecha.

## Criterios de éxito (Success Criteria) *(obligatorio)*

### Resultados medibles (Measurable Outcomes)

- **SC-001**: El saldo de puntos de cada cliente coincide con la suma de sus movimientos en el 100 % de las pruebas.
- **SC-002**: Un empleado completa un canje en menos de 45 segundos escaneando el QR.

## Supuestos (Assumptions)

- Se implementa después de (o junto con) las specs: 007-clientes, 017-ventas, 009-control-entradas.
- La autenticación JWT y la autorización por permisos están disponibles (spec de acceso); mientras no lo estén, los endpoints se prueban con un usuario semilla.

## Insumos para `/speckit.plan` (no normativo)

Detalle orientativo para el plan técnico. No reemplaza las decisiones del plan, pero cualquier desviación debe quedar justificada en `plan.md`.

**API REST sugerida** (base `/api/v1`, sobre `{ ok, data, meta, error }`):

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| GET | `/api/v1/puntos/reglas` | Configurar las reglas de acumulación de puntos | HU-133 |
| POST | `/api/v1/puntos/reglas` | Registrar (reglas) | HU-133 |
| PUT | `/api/v1/puntos/reglas/:id` | Actualizar (reglas) | HU-133 |
| GET | `/api/v1/puntos/recompensas` | Configurar las recompensas | HU-134 |
| POST | `/api/v1/puntos/recompensas` | Registrar (recompensas) | HU-134 |
| PUT | `/api/v1/puntos/recompensas/:id` | Actualizar (recompensas) | HU-134 |
| GET | `/api/v1/puntos/clientes/:idCliente` | Consultar el saldo de puntos de un cliente | HU-135 |
| GET | `/api/v1/puntos/clientes/:idCliente/movimientos` | Listar o consultar movimientos | HU-135 |
| (parte | `de` | POST /api/v1/ventas y POST /api/v1/ingresos) | HU-136 |
| POST | `/api/v1/puntos/canjes` | Canjear puntos | HU-137 |
| GET | `/api/v1/reportes/puntos?desde&hasta&formato` | Generar el reporte del programa de puntos | HU-138 |
| GET | `/api/v1/clientes/me/puntos` | Consultar mis puntos y recompensas | HU-139 |

**Pantallas (frontend vanilla):**

- Puntos › Reglas — HU-133
- Puntos › Recompensas — HU-134
- Puntos › Consultar saldo — HU-135
- Ventas › Nueva venta (cliente y puntos) — HU-136
- Puntos › Canjear — HU-137
- Puntos › Reporte — HU-138
- Portal del cliente › Mis puntos — HU-139

**Modelo de datos (lógico):**

*ReglaPuntos*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_regla | INT | PK |
| tipo | ENUM('por_valor','por_producto','por_servicio','por_ingreso') |  |
| id_producto | INT | FK, opcional |
| id_servicio | INT | FK, opcional |
| valor_base | DECIMAL(12,2) | p. ej. $ 1.000 |
| puntos | INT | > 0 |
| estado | ENUM('activa','inactiva') |  |

*Recompensa*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_recompensa | INT | PK |
| nombre | VARCHAR(80) |  |
| tipo | ENUM('descuento','producto_gratis','entrada_gratis') |  |
| puntos_requeridos | INT | > 0 |
| id_producto | INT | FK, opcional |
| valor_descuento | DECIMAL(12,2) |  |
| stock | INT | opcional |
| estado | ENUM('activa','inactiva') |  |

*MovimientoPuntos*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_movimiento | INT | PK |
| id_cliente | INT | FK |
| tipo | ENUM('acumulacion','canje','reversion','ajuste') |  |
| puntos | INT |  |
| saldo_resultante | INT | ≥ 0 |
| id_venta | INT | FK, opcional |
| id_ingreso | INT | FK, opcional |
| id_recompensa | INT | FK, opcional |
| id_usuario | INT | FK |
| fecha | DATETIME |  |

**Reglas de negocio:**

- **RN-38**: Los puntos se calculan con las reglas activas y el multiplicador del nivel VIP; se acumulan al pagar la venta o registrar el ingreso y se revierten al anular la venta.
- **RN-39**: Un canje requiere saldo suficiente y recompensa activa con disponibilidad; nunca deja saldo negativo.

## Trazabilidad

| Historia spec | HU | RF | Excel |
|---|---|---|---|
| 1 | HU-133 | RF-PUN-01 | HU_206 |
| 2 | HU-134 | RF-PUN-02, RF-PUN-03 | HU_207 |
| 3 | HU-135 | RF-PUN-04 | HU_208, HU_212 |
| 4 | HU-136 | RF-PUN-05, RF-PUN-06 | HU_210 |
| 5 | HU-137 | RF-PUN-07, RF-PUN-08 | HU_211 |
| 6 | HU-138 | RF-PUN-09 | HU_209 |
| 7 | HU-139 | RF-PUN-10 | Inferida (ficha) |

