# Feature Specification: Reservas

**Feature Branch**: `013-reservas`  
**Created**: 2026-11-21  
**Status**: Draft  
**Proyecto**: Sistema de Gestión Integral para Discoteca (Discoteca (Envigado)) · **SRS**: `SRS-Discoteca-v2.0.md` §4.13 · **Historias**: HU-81 – HU-88  
**Input**: "Gestiona las reservas de mesas y salas VIP con validación de disponibilidad y capacidad, servicios adicionales con descuentos VIP y el ciclo de estados de cada reserva. Actores: Administrador, Empleado, Cliente."

> Spec generada a partir del SRS v2.0 y de las historias de usuario del proyecto. Respeta la estructura de `spec-template.md` de spec-kit; los encabezados van en español con su equivalente en inglés. Antes de `/speckit.plan`, ejecute `/speckit.clarify` si hay marcas `[NEEDS CLARIFICATION]`.

## Escenarios de usuario y pruebas (User Scenarios & Testing) *(obligatorio)*

### Historia 1 — Gestionar los espacios reservables (Prioridad: P1) · HU-81

**Como** Administrador, **quiero** registrar las mesas y salas VIP con su capacidad, zona y consumo mínimo, **para** que las reservas validen la disponibilidad real.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite que las reservas validen la disponibilidad real.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/espacios`, `POST /api/v1/espacios`, `PUT /api/v1/espacios/:id` y en la pantalla «Configuración › Espacios», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el espacio «Sala VIP 1» tipo sala VIP, zona Segundo piso, capacidad 12 y consumo mínimo $ 1.200.000, **cuando** guardo, **entonces** queda activo y disponible para reservas.
2. **Dado** un espacio con reservas futuras, **cuando** lo inactivo, **entonces** el sistema lista esas reservas y pide confirmar.

### Historia 2 — Registrar una reserva (Prioridad: P1) · HU-82

**Como** Administrador o Empleado, **quiero** registrar la reserva de una mesa o sala VIP para un cliente, **para** gestionar la disponibilidad del local.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite gestionar la disponibilidad del local.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/reservas`, `GET /api/v1/espacios/disponibles?fecha&hora_inicio&hora_fin&personas&tipo` y en la pantalla «Reservas › Nueva reserva», con los datos semilla, verificando los escenarios 1 a 4.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** fecha, hora, tipo sala VIP, un espacio disponible, 10 personas y un cliente existente, **cuando** guardo, **entonces** la reserva queda pendiente con código único y veo el mensaje de confirmación.
2. **Dado** un cliente nuevo, **cuando** registro la reserva, **entonces** puedo crear el cliente en el mismo flujo con sus validaciones.
3. **Dado** un espacio ocupado en ese horario o más personas que su capacidad, **cuando** guardo, **entonces** el sistema lo impide y sugiere espacios disponibles.
4. **Dado** un cliente VIP, **cuando** agrego el servicio «Botella de bienvenida», **entonces** se aplica el descuento de su nivel al subtotal.

### Historia 3 — Consultar reservas (Prioridad: P1) · HU-83

**Como** Administrador o Empleado, **quiero** buscar las reservas y ver sus detalles, **para** preparar cada noche.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite preparar cada noche.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/reservas?fecha&tipo&q&estado&sort&page&limit`, `GET /api/v1/reservas/:id` y en la pantalla «Reservas (listado, vista por noche y detalle)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el buscador, **cuando** busco por fecha, tipo, nombre o id de cliente o código, **entonces** veo fecha, hora, tipo, espacio, cliente, personas y estado, ordenables por fecha, hora o cliente.
2. **Dado** una búsqueda sin coincidencias, **cuando** la ejecuto, **entonces** veo un mensaje.

### Historia 4 — Actualizar una reserva (Prioridad: P2) · HU-84

**Como** Administrador o Empleado, **quiero** modificar fecha, hora, personas o cliente de una reserva, **para** atender las peticiones de los clientes.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite atender las peticiones de los clientes.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PUT /api/v1/reservas/:id` y en la pantalla «Reservas › Editar», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** una reserva pendiente, **cuando** cambio la hora y el número de personas y el espacio está disponible, **entonces** se guarda, queda en el historial y veo el mensaje de confirmación.
2. **Dado** que el nuevo horario no está disponible, **cuando** guardo, **entonces** el sistema informa que la modificación no fue posible.

### Historia 5 — Cambiar el estado de una reserva (Prioridad: P1) · HU-85

**Como** Administrador o Empleado, **quiero** confirmar, cancelar o marcar cumplida una reserva, **para** reflejar su situación real.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite reflejar su situación real.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PATCH /api/v1/reservas/:id/estado` y en la pantalla «Reservas › Detalle (Cambiar estado)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** una reserva pendiente, **cuando** la confirmo, **entonces** queda confirmada con fecha y hora del cambio y el cliente recibe un correo de confirmación.
2. **Dado** una reserva confirmada, **cuando** el cliente registra su ingreso esa noche, **entonces** pasa a cumplida automáticamente.

### Historia 6 — Eliminar una reserva (Prioridad: P3) · HU-86

**Como** Administrador o Empleado, **quiero** eliminar reservas canceladas o erróneas, **para** depurar el registro.

**Por qué esta prioridad (Why this priority)**: Prioridad Baja en el backlog del proyecto. Aporta valor porque permite depurar el registro.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `DELETE /api/v1/reservas/:id` y en la pantalla «Reservas (Eliminar)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** una reserva cancelada, **cuando** la elimino y confirmo, **entonces** desaparece de la lista y la eliminación queda en el historial con usuario y fecha.
2. **Dado** una reserva confirmada o cumplida, **cuando** intento eliminarla, **entonces** el sistema lo impide.

### Historia 7 — Generar el reporte de reservas (Prioridad: P2) · HU-87

**Como** Administrador o Empleado, **quiero** generar reportes de reservas por periodo, tipo y cliente, **para** analizar el rendimiento del negocio.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite analizar el rendimiento del negocio.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/reportes/reservas?periodo&desde&hasta&tipo&cliente&formato` y en la pantalla «Reservas › Reporte», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el periodo mensual y el tipo sala VIP, **cuando** genero el reporte, **entonces** veo número de reservas por estado, ocupación por espacio, ingresos por servicios adicionales y el detalle, en PDF o CSV.

### Historia 8 — Reservar como cliente (Prioridad: P1) · HU-88

**Como** Cliente, **quiero** reservar una mesa o sala VIP desde mi celular, **para** asegurar mi lugar sin llamar.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite asegurar mi lugar sin llamar.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/clientes/me/reservas`, `POST /api/v1/clientes/me/reservas`, `PATCH /api/v1/clientes/me/reservas/:id/cancelacion` y en la pantalla «Portal del cliente › Mis reservas», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** que inicié sesión, **cuando** elijo fecha, hora, tipo y número de personas, **entonces** veo los espacios disponibles con su consumo mínimo y al elegir uno la reserva queda pendiente.
2. **Dado** mi reserva pendiente, **cuando** la discoteca la confirma, **entonces** recibo un correo y la veo confirmada en Mis reservas.
3. **Dado** mi reserva pendiente o confirmada, **cuando** la cancelo con al menos 2 horas de anticipación, **entonces** queda cancelada.

### Casos límite (Edge Cases)

- Reserva para el mismo día con hora ya pasada: se rechaza.
- Dos empleados reservan el mismo espacio al mismo tiempo: la segunda transacción recibe 409.

## Requerimientos (Requirements) *(obligatorio)*

### Requerimientos funcionales (Functional Requirements)

- **FR-001**: El sistema DEBE gestionar espacios reservables (mesas y salas VIP) con nombre único, tipo, zona, capacidad, consumo mínimo y estado. *(RF-RES-01 · HU-81)*
- **FR-002**: El sistema DEBE registrar reservas con fecha y hora futuras, tipo y espacio, número de personas, cliente existente o nuevo y servicios adicionales, en estado pendiente con código único. *(RF-RES-02 · HU-82)*
- **FR-003**: El sistema DEBE validar la disponibilidad del espacio y su capacidad, sugiriendo espacios disponibles cuando no lo esté. *(RF-RES-03 · HU-82)*
- **FR-004**: El sistema DEBE aplicar el descuento del nivel VIP del cliente a los servicios adicionales de la reserva. *(RF-RES-04 · HU-82)*
- **FR-005**: El sistema DEBE buscar reservas por fecha, hora, tipo, cliente o código, con lista ordenable y filtrable y detalle con servicios adicionales. *(RF-RES-05 · HU-83)*
- **FR-006**: El sistema DEBE actualizar fecha, hora, número de personas, cliente y servicios de reservas pendientes o confirmadas, validando disponibilidad y capacidad y registrando el historial de cambios. *(RF-RES-06 · HU-84)*
- **FR-007**: El sistema DEBE cambiar el estado de la reserva entre pendiente, confirmada y cancelada, registrando fecha y hora y notificando al cliente por correo. *(RF-RES-07 · HU-85)*
- **FR-008**: El sistema DEBE marcar como cumplida la reserva confirmada cuando el cliente ingresa esa noche. *(RF-RES-08 · HU-85)*
- **FR-009**: El sistema DEBE eliminar reservas pendientes o canceladas con confirmación, registrando la eliminación en el historial. *(RF-RES-09 · HU-86)*
- **FR-010**: El sistema DEBE generar el reporte de reservas por periodo (día, semana, mes, año), tipo y cliente, con totales por estado, ocupación por espacio e ingresos, en PDF o CSV. *(RF-RES-10 · HU-87)*
- **FR-011**: El sistema DEBE permitir al cliente consultar disponibilidad y crear reservas propias en estado pendiente. *(RF-RES-11 · HU-88)*
- **FR-012**: El sistema DEBE permitir al cliente ver sus reservas y cancelarlas hasta 2 horas antes de la hora reservada. *(RF-RES-12 · HU-88)*

### Requerimientos no funcionales aplicables

Aplican todos los principios de `constitution.md` y los RNF transversales del SRS §5. En particular:

- **RNF-PRI-02**: Un Cliente solo accede a su propia información; los reportes y listados con datos de otros clientes, ventas o empleados solo están disponibles para roles internos con permiso.

### Entidades clave (Key Entities)

- **Espacio**: Mesa o sala VIP. Atributos: id_espacio, nombre, tipo, zona, capacidad, consumo_minimo, estado.
- **Reserva**: Apartado de un espacio. Atributos: id_reserva, codigo, id_cliente, id_espacio, fecha, hora_inicio, hora_fin, numero_personas, estado, origen, observaciones, created_at, updated_at.
- **DetalleReserva**: Servicios adicionales. Atributos: id_detalle, id_reserva, id_servicio, cantidad, precio_unitario, descuento, subtotal.
- **HistorialReserva**: Cambios y eliminaciones. Atributos: id_historial, id_reserva, accion, detalle, id_usuario, fecha.

## Criterios de éxito (Success Criteria) *(obligatorio)*

### Resultados medibles (Measurable Outcomes)

- **SC-001**: El 0 % de los espacios queda con reservas cruzadas.
- **SC-002**: Un empleado registra una reserva en menos de 90 segundos.

## Supuestos (Assumptions)

- Se implementa después de (o junto con) las specs: 007-clientes, 010-servicios.
- La autenticación JWT y la autorización por permisos están disponibles (spec de acceso); mientras no lo estén, los endpoints se prueban con un usuario semilla.

## Insumos para `/speckit.plan` (no normativo)

Detalle orientativo para el plan técnico. No reemplaza las decisiones del plan, pero cualquier desviación debe quedar justificada en `plan.md`.

**API REST sugerida** (base `/api/v1`, sobre `{ ok, data, meta, error }`):

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| GET | `/api/v1/espacios` | Gestionar los espacios reservables | HU-81 |
| POST | `/api/v1/espacios` | Registrar (espacios) | HU-81 |
| PUT | `/api/v1/espacios/:id` | Actualizar (espacios) | HU-81 |
| PATCH | `/api/v1/espacios/:id/estado` | Actualizar estado | HU-81 |
| POST | `/api/v1/reservas` | Registrar una reserva | HU-82 |
| GET | `/api/v1/espacios/disponibles?fecha&hora_inicio&hora_fin&personas&tipo` | Listar o consultar disponibles | HU-82 |
| GET | `/api/v1/reservas?fecha&tipo&q&estado&sort&page&limit` | Consultar reservas | HU-83 |
| GET | `/api/v1/reservas/:id` | Consultar detalle (reservas) | HU-83 |
| PUT | `/api/v1/reservas/:id` | Actualizar una reserva | HU-84 |
| PATCH | `/api/v1/reservas/:id/estado` | Cambiar el estado de una reserva | HU-85 |
| DELETE | `/api/v1/reservas/:id` | Eliminar una reserva | HU-86 |
| GET | `/api/v1/reportes/reservas?periodo&desde&hasta&tipo&cliente&formato` | Generar el reporte de reservas | HU-87 |
| GET | `/api/v1/clientes/me/reservas` | Reservar como cliente | HU-88 |
| POST | `/api/v1/clientes/me/reservas` | Registrar (reservas) | HU-88 |
| PATCH | `/api/v1/clientes/me/reservas/:id/cancelacion` | Actualizar cancelacion | HU-88 |

**Pantallas (frontend vanilla):**

- Configuración › Espacios — HU-81
- Reservas › Nueva reserva — HU-82
- Reservas (listado, vista por noche y detalle) — HU-83
- Reservas › Editar — HU-84
- Reservas › Detalle (Cambiar estado) — HU-85
- Reservas (Eliminar) — HU-86
- Reservas › Reporte — HU-87
- Portal del cliente › Mis reservas — HU-88

**Modelo de datos (lógico):**

*Espacio*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_espacio | INT | PK |
| nombre | VARCHAR(40) | único |
| tipo | ENUM('mesa','sala_vip') |  |
| zona | VARCHAR(40) |  |
| capacidad | TINYINT | > 0 |
| consumo_minimo | DECIMAL(12,2) | ≥ 0 |
| estado | ENUM('activo','inactivo') |  |

*Reserva*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_reserva | INT | PK |
| codigo | VARCHAR(12) | único |
| id_cliente | INT | FK, activo |
| id_espacio | INT | FK |
| fecha | DATE | ≥ hoy |
| hora_inicio | TIME |  |
| hora_fin | TIME |  |
| numero_personas | TINYINT | 1 ≤ n ≤ capacidad |
| estado | ENUM('pendiente','confirmada','cancelada','cumplida') |  |
| origen | ENUM('interno','cliente') |  |
| observaciones | VARCHAR(300) |  |
| created_at | DATETIME |  |
| updated_at | DATETIME |  |

*DetalleReserva*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_detalle | INT | PK |
| id_reserva | INT | FK |
| id_servicio | INT | FK |
| cantidad | INT | > 0 |
| precio_unitario | DECIMAL(12,2) |  |
| descuento | DECIMAL(5,2) | % del nivel VIP |
| subtotal | DECIMAL(14,2) |  |

*HistorialReserva*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_historial | INT | PK |
| id_reserva | INT |  |
| accion | VARCHAR(30) |  |
| detalle | VARCHAR(400) |  |
| id_usuario | INT | FK |
| fecha | DATETIME |  |

**Reglas de negocio:**

- **RN-21**: Un espacio no puede tener dos reservas pendientes o confirmadas que se crucen en fecha y hora; el número de personas no supera la capacidad del espacio.
- **RN-22**: Solo se eliminan reservas pendientes o canceladas, dejando registro en el historial; las confirmadas se cancelan.
- **RN-23**: Una reserva confirmada pasa a cumplida cuando el cliente registra su ingreso esa noche.

**Validaciones de campos por historia:**

- HU-82: fecha (≥ hoy) y hora futura; id_espacio (activo, disponible); numero_personas (1–capacidad); id_cliente (activo); servicios (opcionales, activos)

## Trazabilidad

| Historia spec | HU | RF | Excel |
|---|---|---|---|
| 1 | HU-81 | RF-RES-01 | Inferida (ficha) |
| 2 | HU-82 | RF-RES-02, RF-RES-03, RF-RES-04 | HU_105, HU_111 |
| 3 | HU-83 | RF-RES-05 | HU_106, HU_112 |
| 4 | HU-84 | RF-RES-06 | HU_107, HU_113 |
| 5 | HU-85 | RF-RES-07, RF-RES-08 | HU_108 |
| 6 | HU-86 | RF-RES-09 | HU_109, HU_114 |
| 7 | HU-87 | RF-RES-10 | HU_110, HU_115 |
| 8 | HU-88 | RF-RES-11, RF-RES-12 | Inferida (ficha) |

