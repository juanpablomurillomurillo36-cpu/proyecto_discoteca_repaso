# Feature Specification: Clientes VIP

**Feature Branch**: `008-clientes-vip`  
**Created**: 2026-11-21  
**Status**: Draft  
**Proyecto**: Sistema de Gestión Integral para Discoteca (Discoteca (Envigado)) · **SRS**: `SRS-Discoteca-v2.0.md` §4.8 · **Historias**: HU-49 – HU-54  
**Input**: "Gestiona la condición VIP de los clientes (nivel, beneficios exclusivos y acceso prioritario) y su ciclo de vida. Actores: Administrador, Empleado."

> Spec generada a partir del SRS v2.0 y de las historias de usuario del proyecto. Respeta la estructura de `spec-template.md` de spec-kit; los encabezados van en español con su equivalente en inglés. Antes de `/speckit.plan`, ejecute `/speckit.clarify` si hay marcas `[NEEDS CLARIFICATION]`.

## Escenarios de usuario y pruebas (User Scenarios & Testing) *(obligatorio)*

### Historia 1 — Registrar un cliente VIP (Prioridad: P1) · HU-49

**Como** Administrador o Empleado, **quiero** otorgar la condición VIP a un cliente con su nivel y beneficios, **para** ofrecerle un servicio personalizado y acceso prioritario.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite ofrecerle un servicio personalizado y acceso prioritario.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/clientes-vip`, `POST /api/v1/clientes-vip/:id/adjuntos` y en la pantalla «Clientes VIP › Nuevo VIP», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un cliente activo, **cuando** le asigno el nivel Oro con fecha de inicio y adjunto un documento, **entonces** queda como VIP activo con id único y veo el mensaje de confirmación.
2. **Dado** una persona que aún no es cliente, **cuando** la registro como VIP, **entonces** primero se diligencian sus datos de cliente con las mismas validaciones (mayor de edad, documento único).
3. **Dado** un cliente que ya es VIP, **cuando** intento registrarlo de nuevo, **entonces** el sistema lo impide.

### Historia 2 — Consultar clientes VIP (Prioridad: P2) · HU-50

**Como** Administrador o Empleado, **quiero** buscar clientes VIP y ver su información, **para** atenderlos de forma personalizada.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite atenderlos de forma personalizada.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/clientes-vip?q&nivel&estado&page&limit`, `GET /api/v1/clientes-vip/:id` y en la pantalla «Clientes VIP (listado y detalle)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el buscador, **cuando** busco por id, nombre, documento o correo, **entonces** veo los VIP coincidentes con nivel, estado y beneficios.
2. **Dado** un VIP, **cuando** abro su detalle, **entonces** veo estado, nivel, beneficios e historial de interacciones (ingresos, reservas, compras) y puedo exportarlo a PDF o CSV.

### Historia 3 — Actualizar un cliente VIP (Prioridad: P2) · HU-51

**Como** Administrador o Empleado, **quiero** actualizar los datos y el nivel VIP de un cliente, **para** mantener su información al día.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite mantener su información al día.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PUT /api/v1/clientes-vip/:id` y en la pantalla «Clientes VIP › Editar», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un VIP, **cuando** cambio su nivel a Platino y su teléfono, **entonces** se guardan, queda la fecha y hora de la última actualización y veo el mensaje de confirmación.
2. **Dado** un dato inválido, **cuando** guardo, **entonces** veo el motivo del fallo.

### Historia 4 — Cambiar el estado de un cliente VIP (Prioridad: P2) · HU-52

**Como** Administrador o Empleado, **quiero** activar o inactivar la condición VIP con una razón, **para** gestionar su acceso a beneficios.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite gestionar su acceso a beneficios.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PATCH /api/v1/clientes-vip/:id/estado` y en la pantalla «Clientes VIP (Cambiar estado)», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un VIP activo, **cuando** lo inactivo con la razón «Solicitud del cliente», **entonces** pierde los beneficios, se registran fecha y razón y queda un registro de auditoría.

### Historia 5 — Generar el reporte de clientes VIP (Prioridad: P3) · HU-53

**Como** Administrador o Empleado, **quiero** generar reportes de clientes VIP con filtros, **para** analizar el programa VIP.

**Por qué esta prioridad (Why this priority)**: Prioridad Baja en el backlog del proyecto. Aporta valor porque permite analizar el programa VIP.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/reportes/clientes-vip?desde&hasta&nivel&estado&formato` y en la pantalla «Clientes VIP › Reporte», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un periodo, nivel y estado, **cuando** genero el reporte, **entonces** veo el total de VIP, activos, inactivos y por nivel, exportable a PDF, CSV o Excel.

### Historia 6 — Configurar los niveles y beneficios VIP (Prioridad: P2) · HU-54

**Como** Administrador, **quiero** definir los niveles VIP con sus descuentos, multiplicador de puntos y acceso prioritario, **para** que los beneficios se apliquen solos en reservas, ventas e ingreso.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite que los beneficios se apliquen solos en reservas, ventas e ingreso.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/niveles-vip`, `POST /api/v1/niveles-vip`, `PUT /api/v1/niveles-vip/:id` y en la pantalla «Configuración › Niveles VIP», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el nivel Oro con 10 % de descuento en reservas, 5 % en consumo, puntos ×1,5 y acceso prioritario, **cuando** lo guardo, **entonces** esos beneficios se aplican a los VIP de ese nivel.
2. **Dado** un nivel con VIP activos, **cuando** intento inactivarlo, **entonces** el sistema lo impide.

### Casos límite (Edge Cases)

- Condición VIP con fecha de fin vencida: pasa a inactiva automáticamente con razón «Vencimiento».

## Requerimientos (Requirements) *(obligatorio)*

### Requerimientos funcionales (Functional Requirements)

- **FR-001**: El sistema DEBE registrar la condición VIP de un cliente activo con nivel, fecha de inicio, fecha de fin opcional, observaciones y adjuntos, en estado activo. *(RF-VIP-01 · HU-49)*
- **FR-002**: El sistema DEBE permitir crear el cliente durante el registro VIP aplicando las validaciones de cliente. *(RF-VIP-02 · HU-49)*
- **FR-003**: El sistema DEBE buscar clientes VIP por id, nombre, documento o correo y mostrar su nivel, beneficios, estado e historial de interacciones, exportable a PDF o CSV. *(RF-VIP-03 · HU-50)*
- **FR-004**: El sistema DEBE actualizar los datos del cliente VIP y su nivel y beneficios, excepto el identificador, registrando fecha y hora de la actualización. *(RF-VIP-04 · HU-51)*
- **FR-005**: El sistema DEBE cambiar el estado VIP entre activo e inactivo con razón obligatoria al inactivar, registrando fecha y auditoría de cada cambio. *(RF-VIP-05 · HU-52)*
- **FR-006**: El sistema DEBE generar el reporte de clientes VIP filtrable por periodo, nivel y estado con totales, exportable a PDF, CSV y Excel. *(RF-VIP-06 · HU-53)*
- **FR-007**: El sistema DEBE gestionar niveles VIP con nombre único, descuentos en reservas y consumo (0–100 %), multiplicador de puntos, acceso prioritario y descripción de beneficios. *(RF-VIP-07 · HU-54)*
- **FR-008**: El sistema DEBE aplicar automáticamente los beneficios del nivel en reservas, ventas, acumulación de puntos e ingreso. *(RF-VIP-08 · HU-54)*
- **FR-009**: [NEEDS CLARIFICATION: Niveles VIP, beneficios de cada nivel y criterios para otorgar la condición (gasto, frecuencia, invitación) — TBD-05.]

### Requerimientos no funcionales aplicables

Aplican todos los principios de `constitution.md` y los RNF transversales del SRS §5. En particular:

- **RNF-SEG-07**: El sistema debe registrar en una bitácora (usuario, fecha y hora, acción, valores anterior y nuevo) los inicios de sesión, los cambios de roles y permisos, los cambios de estado, los ajustes de existencias, los movimientos de puntos y las anulaciones y eliminaciones.

### Entidades clave (Key Entities)

- **NivelVip**: Nivel de beneficios. Atributos: id_nivel, nombre, descuento_reservas, descuento_consumo, multiplicador_puntos, acceso_prioritario, beneficios, estado.
- **ClienteVip**: Condición VIP. Atributos: id_cliente_vip, id_cliente, id_nivel, fecha_inicio, fecha_fin, estado, motivo_estado, observaciones.
- **AdjuntoVip**: Documentos. Atributos: id_adjunto, id_cliente_vip, url.

## Criterios de éxito (Success Criteria) *(obligatorio)*

### Resultados medibles (Measurable Outcomes)

- **SC-001**: El 100 % de los cambios de estado VIP queda en la bitácora de auditoría.

## Supuestos (Assumptions)

- Se implementa después de (o junto con) las specs: 007-clientes.
- La autenticación JWT y la autorización por permisos están disponibles (spec de acceso); mientras no lo estén, los endpoints se prueban con un usuario semilla.

## Insumos para `/speckit.plan` (no normativo)

Detalle orientativo para el plan técnico. No reemplaza las decisiones del plan, pero cualquier desviación debe quedar justificada en `plan.md`.

**API REST sugerida** (base `/api/v1`, sobre `{ ok, data, meta, error }`):

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/clientes-vip` | Registrar un cliente VIP | HU-49 |
| POST | `/api/v1/clientes-vip/:id/adjuntos` | Registrar (adjuntos) | HU-49 |
| GET | `/api/v1/clientes-vip?q&nivel&estado&page&limit` | Consultar clientes VIP | HU-50 |
| GET | `/api/v1/clientes-vip/:id` | Consultar detalle (clientes-vip) | HU-50 |
| PUT | `/api/v1/clientes-vip/:id` | Actualizar un cliente VIP | HU-51 |
| PATCH | `/api/v1/clientes-vip/:id/estado` | Cambiar el estado de un cliente VIP | HU-52 |
| GET | `/api/v1/reportes/clientes-vip?desde&hasta&nivel&estado&formato` | Generar el reporte de clientes VIP | HU-53 |
| GET | `/api/v1/niveles-vip` | Configurar los niveles y beneficios VIP | HU-54 |
| POST | `/api/v1/niveles-vip` | Registrar (niveles vip) | HU-54 |
| PUT | `/api/v1/niveles-vip/:id` | Actualizar (niveles vip) | HU-54 |

**Pantallas (frontend vanilla):**

- Clientes VIP › Nuevo VIP — HU-49
- Clientes VIP (listado y detalle) — HU-50
- Clientes VIP › Editar — HU-51
- Clientes VIP (Cambiar estado) — HU-52
- Clientes VIP › Reporte — HU-53
- Configuración › Niveles VIP — HU-54

**Modelo de datos (lógico):**

*NivelVip*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_nivel | INT | PK |
| nombre | VARCHAR(30) | único |
| descuento_reservas | DECIMAL(5,2) | 0–100 |
| descuento_consumo | DECIMAL(5,2) | 0–100 |
| multiplicador_puntos | DECIMAL(4,2) | ≥ 1 |
| acceso_prioritario | BOOLEAN |  |
| beneficios | VARCHAR(500) |  |
| estado | ENUM('activo','inactivo') |  |

*ClienteVip*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_cliente_vip | INT | PK |
| id_cliente | INT | FK, único |
| id_nivel | INT | FK |
| fecha_inicio | DATE |  |
| fecha_fin | DATE | opcional |
| estado | ENUM('activo','inactivo') |  |
| motivo_estado | VARCHAR(200) |  |
| observaciones | VARCHAR(300) |  |

*AdjuntoVip*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_adjunto | INT | PK |
| id_cliente_vip | INT | FK |
| url | VARCHAR(255) |  |

**Reglas de negocio:**

- **RN-14**: Solo un cliente activo puede ser VIP; cada cliente tiene una sola condición VIP; al inactivarla se registra fecha y razón y se pierden los beneficios.

## Trazabilidad

| Historia spec | HU | RF | Excel |
|---|---|---|---|
| 1 | HU-49 | RF-VIP-01, RF-VIP-02 | HU_65, HU_70 |
| 2 | HU-50 | RF-VIP-03 | HU_66, HU_71 |
| 3 | HU-51 | RF-VIP-04 | HU_67, HU_72 |
| 4 | HU-52 | RF-VIP-05 | HU_68, HU_73 |
| 5 | HU-53 | RF-VIP-06 | HU_69, HU_74 |
| 6 | HU-54 | RF-VIP-07, RF-VIP-08 | Inferida (ficha) |

