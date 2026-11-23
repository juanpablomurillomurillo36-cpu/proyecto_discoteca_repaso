# Feature Specification: Agenda de eventos

**Feature Branch**: `015-agenda-eventos`  
**Created**: 2026-11-21  
**Status**: Draft  
**Proyecto**: Sistema de Gestión Integral para Discoteca (Discoteca (Envigado)) · **SRS**: `SRS-Discoteca-v2.0.md` §4.15 · **Historias**: HU-99 – HU-110  
**Input**: "Organiza las actividades de cada evento con sus responsables y servicios, envía recordatorios por correo a empleados y clientes y permite a los clientes solicitar y seguir sus fiestas privadas. Actores: Administrador, Empleado, Cliente."

> Spec generada a partir del SRS v2.0 y de las historias de usuario del proyecto. Respeta la estructura de `spec-template.md` de spec-kit; los encabezados van en español con su equivalente en inglés. Antes de `/speckit.plan`, ejecute `/speckit.clarify` si hay marcas `[NEEDS CLARIFICATION]`.

## Escenarios de usuario y pruebas (User Scenarios & Testing) *(obligatorio)*

### Historia 1 — Programar una actividad en la agenda de eventos (Prioridad: P2) · HU-99

**Como** Administrador o Empleado, **quiero** registrar una actividad de un evento con fechas, título, descripción, ubicación y adjuntos, **para** planificar y gestionar todo lo que el evento requiere.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite planificar y gestionar todo lo que el evento requiere.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/agenda-eventos` y en la pantalla «Eventos › Agenda › Nueva actividad», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el evento «Noche de los 80», **cuando** registro la actividad «Montaje de luces» tipo montaje el sábado de 4:00 p. m. a 7:00 p. m., **entonces** queda pendiente con fecha y hora de creación y veo el mensaje de confirmación.
2. **Dado** campos obligatorios vacíos o un fin anterior al inicio, **cuando** guardo, **entonces** el sistema lo señala.

### Historia 2 — Consultar la agenda de eventos (Prioridad: P2) · HU-100

**Como** Administrador o Empleado, **quiero** ver la agenda de eventos con filtros, **para** conocer lo programado.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite conocer lo programado.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/agenda-eventos?evento&empleado&servicio&estado&desde&hasta&q&page&limit`, `GET /api/v1/agenda-eventos/:id` y en la pantalla «Eventos › Agenda (calendario)», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** la agenda, **cuando** filtro por fecha, evento, empleado, servicio o estado o busco una palabra en título o descripción, **entonces** veo las actividades con fecha, hora, título, descripción y estado, paginadas.

### Historia 3 — Actualizar una actividad de evento (Prioridad: P2) · HU-101

**Como** Administrador o Empleado, **quiero** modificar los datos y responsables de una actividad, **para** mantener la agenda actualizada.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite mantener la agenda actualizada.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PUT /api/v1/agenda-eventos/:id` y en la pantalla «Eventos › Agenda › Editar actividad», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** una actividad, **cuando** cambio su hora y los empleados asignados, **entonces** se guarda con fecha, hora y usuario de la modificación y las agendas de los empleados se actualizan.
2. **Dado** un fin anterior al inicio, **cuando** guardo, **entonces** el sistema lo impide.

### Historia 4 — Cambiar el estado de una actividad de evento (Prioridad: P2) · HU-102

**Como** Administrador o Empleado, **quiero** cambiar el estado de una actividad, **para** reflejar su progreso.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite reflejar su progreso.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PATCH /api/v1/agenda-eventos/:id/estado` y en la pantalla «Eventos › Agenda (Cambiar estado)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** una actividad pendiente, **cuando** la paso a en progreso, **entonces** el cambio se registra con fecha y hora.
2. **Dado** una actividad completada, **cuando** intento devolverla a pendiente, **entonces** el flujo no lo permite.

### Historia 5 — Asignar empleados y servicios a una actividad (Prioridad: P1) · HU-103

**Como** Administrador, **quiero** asociar empleados y servicios a cada actividad del evento, **para** asignar responsabilidades.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite asignar responsabilidades.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PUT /api/v1/agenda-eventos/:id/asignaciones` y en la pantalla «Eventos › Agenda › Asignar», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** una actividad, **cuando** selecciono dos meseros y el servicio Catering, **entonces** la asociación se guarda, se muestra en la actividad y se crea la actividad en la agenda de cada empleado.
2. **Dado** un empleado con otra actividad a la misma hora, **cuando** lo asigno, **entonces** el sistema lo impide indicando el cruce.

### Historia 6 — Generar el reporte de agenda de eventos (Prioridad: P3) · HU-104

**Como** Administrador o Empleado, **quiero** generar reportes de la agenda de eventos por empleado, servicio, fecha y estado, **para** resumir las actividades programadas.

**Por qué esta prioridad (Why this priority)**: Prioridad Baja en el backlog del proyecto. Aporta valor porque permite resumir las actividades programadas.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/reportes/agenda-eventos?agrupar&desde&hasta&empleado&servicio&estado&formato` y en la pantalla «Eventos › Agenda › Reporte», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el criterio «por empleado» y un mes, **cuando** genero el reporte, **entonces** descargo un PDF o CSV con las actividades de cada empleado.

### Historia 7 — Enviar notificaciones de eventos por correo (Prioridad: P2) · HU-105

**Como** Administrador o Empleado, **quiero** que empleados y clientes asociados reciban correos sobre fechas clave, reuniones y plazos del evento, **para** que estén al tanto de lo programado.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite que estén al tanto de lo programado.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/configuracion/recordatorios-eventos`, `PUT /api/v1/configuracion/recordatorios-eventos`, `GET /api/v1/agenda-eventos/:id/notificaciones` y en la pantalla «Configuración › Recordatorios de eventos», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** una actividad con empleados asignados, **cuando** faltan 24 horas para su inicio, **entonces** cada empleado recibe un correo con título, fecha, hora, ubicación y descripción.
2. **Dado** el tipo de actividad «reunión», **cuando** configuro la antelación en 48 horas, **entonces** los recordatorios de ese tipo se envían con esa antelación.
3. **Dado** una dirección inválida, **cuando** se envía, **entonces** el envío queda fallido con el motivo y los demás continúan.

### Historia 8 — Solicitar una fiesta privada (Prioridad: P1) · HU-106

**Como** Cliente, **quiero** solicitar una fiesta privada con fecha, horario, descripción, invitados y servicios, **para** programar mi celebración en la discoteca.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite programar mi celebración en la discoteca.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/clientes/me/eventos` y en la pantalla «Portal del cliente › Mis eventos › Solicitar fiesta privada», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** que inicié sesión, **cuando** solicito una fiesta privada para el 20 de diciembre de 9:00 p. m. a 2:00 a. m. con 40 invitados y los servicios Decoración y DJ, **entonces** se crea un evento tipo fiesta privada en estado solicitado y veo el mensaje de confirmación.
2. **Dado** una fecha de fin anterior a la de inicio o una fecha pasada, **cuando** envío la solicitud, **entonces** el sistema la rechaza.
3. **Dado** mi solicitud, **cuando** la discoteca la aprueba, **entonces** pasa a programado y recibo un correo.

### Historia 9 — Consultar mis eventos y la cartelera (Prioridad: P2) · HU-107

**Como** Cliente, **quiero** ver los eventos temáticos programados y mis fiestas privadas, **para** conocer la programación y el detalle de mis eventos.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite conocer la programación y el detalle de mis eventos.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/cartelera?desde&hasta`, `GET /api/v1/clientes/me/eventos` y en la pantalla «Cartelera (pública); Portal del cliente › Mis eventos», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** la cartelera, **cuando** la abro, **entonces** veo los eventos temáticos programados con nombre, fecha, hora, imagen y descripción, filtrables por fecha.
2. **Dado** Mis eventos, **cuando** abro una fiesta privada, **entonces** veo descripción, ubicación, servicios, estado y empleados asignados.

### Historia 10 — Modificar mi solicitud de fiesta privada (Prioridad: P2) · HU-108

**Como** Cliente, **quiero** modificar los datos de mi fiesta privada antes de que sea aprobada, **para** ajustar los detalles.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite ajustar los detalles.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PUT /api/v1/clientes/me/eventos/:id` y en la pantalla «Portal del cliente › Mis eventos › Editar», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** mi solicitud en estado solicitado, **cuando** cambio la hora y los invitados, **entonces** veo los datos actuales antes de editar y al guardar veo el mensaje de confirmación.
2. **Dado** una fiesta ya programada, **cuando** intento modificarla, **entonces** el sistema me indica que debo contactar a la discoteca.

### Historia 11 — Seguir y cancelar mi solicitud (Prioridad: P2) · HU-109

**Como** Cliente, **quiero** ver el estado de mi fiesta privada y cancelarla si lo necesito, **para** conocer su progreso.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite conocer su progreso.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/clientes/me/eventos/:id`, `PATCH /api/v1/clientes/me/eventos/:id/cancelacion` y en la pantalla «Portal del cliente › Mis eventos › Detalle», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** mi fiesta, **cuando** la abro, **entonces** veo su estado actual y el historial de cambios con fecha y hora.
2. **Dado** mi solicitud en estado solicitado, **cuando** la cancelo, **entonces** queda cancelada.

### Historia 12 — Elegir los servicios de mi evento (Prioridad: P2) · HU-110

**Como** Cliente, **quiero** seleccionar y cambiar los servicios de mi fiesta privada, **para** definir lo que necesito.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite definir lo que necesito.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PUT /api/v1/clientes/me/eventos/:id/servicios` y en la pantalla «Portal del cliente › Mis eventos › Servicios», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** mi solicitud, **cuando** selecciono servicios de la lista con su cantidad, **entonces** veo los servicios asociados y el valor estimado.
2. **Dado** que la solicitud ya está programada, **cuando** intento cambiar servicios, **entonces** el sistema no lo permite.

### Casos límite (Edge Cases)

- Recordatorio programado para una actividad que se canceló: no se envía.
- Correo de un destinatario inválido: el envío queda fallido con el motivo y no detiene los demás.

## Requerimientos (Requirements) *(obligatorio)*

### Requerimientos funcionales (Functional Requirements)

- **FR-001**: El sistema DEBE registrar actividades de evento con evento no cancelado, título, tipo, descripción, ubicación, inicio y fin coherentes y adjuntos opcionales, registrando fecha y hora de creación. *(RF-AGV-01 · HU-99)*
- **FR-002**: El sistema DEBE mostrar la agenda de eventos en calendario y lista paginada, filtrable por fecha, evento, empleado, servicio y estado y con búsqueda por palabra clave. *(RF-AGV-02 · HU-100)*
- **FR-003**: El sistema DEBE actualizar los datos y las asignaciones de empleados y servicios de una actividad, controlando la coherencia de fechas y registrando fecha, hora y usuario de la modificación. *(RF-AGV-03 · HU-101)*
- **FR-004**: El sistema DEBE cambiar el estado de las actividades según el flujo definido, registrando fecha y hora de cada cambio. *(RF-AGV-04 · HU-102)*
- **FR-005**: El sistema DEBE asociar empleados activos y servicios activos a una actividad de evento y mostrar la lista de asociados. *(RF-AGV-05 · HU-103)*
- **FR-006**: El sistema DEBE crear la actividad correspondiente en la agenda de cada empleado asignado, validando que no tenga cruces. *(RF-AGV-06 · HU-103)*
- **FR-007**: El sistema DEBE generar reportes de la agenda de eventos por empleado, servicio, fecha y estado, en PDF o CSV. *(RF-AGV-07 · HU-104)*
- **FR-008**: El sistema DEBE enviar recordatorios por correo a los empleados y clientes asociados a las actividades de un evento con antelación configurable por tipo de actividad (24 horas por defecto). *(RF-AGV-08 · HU-105)*
- **FR-009**: El sistema DEBE usar una plantilla de correo configurable y registrar el estado de cada envío con el motivo de falla. *(RF-AGV-09 · HU-105)*
- **FR-010**: El sistema DEBE permitir al cliente solicitar fiestas privadas con nombre, fecha y hora de inicio y fin futuras y coherentes, descripción, invitados estimados y servicios deseados, creando el evento en estado solicitado. *(RF-AGV-10 · HU-106)*
- **FR-011**: El sistema DEBE notificar al cliente por correo la aprobación o el rechazo de su solicitud. *(RF-AGV-11 · HU-106)*
- **FR-012**: El sistema DEBE mostrar al cliente la cartelera de eventos temáticos programados y el detalle de sus propias fiestas privadas. *(RF-AGV-12 · HU-107)*
- **FR-013**: El sistema DEBE permitir al cliente modificar nombre, fechas, descripción, invitados y servicios de sus solicitudes en estado solicitado, validando las fechas. *(RF-AGV-13 · HU-108)*
- **FR-014**: El sistema DEBE mostrar al cliente el estado y el historial de estados de sus fiestas privadas y permitirle cancelar las que estén en estado solicitado. *(RF-AGV-14 · HU-109)*
- **FR-015**: El sistema DEBE permitir al cliente seleccionar servicios activos con cantidad para su solicitud mientras esté en estado solicitado, mostrando los asociados y el valor estimado. *(RF-AGV-15 · HU-110)*

### Requerimientos no funcionales aplicables

Aplican todos los principios de `constitution.md` y los RNF transversales del SRS §5. En particular:

- **RNF-PRI-02**: Un Cliente solo accede a su propia información; los reportes y listados con datos de otros clientes, ventas o empleados solo están disponibles para roles internos con permiso.

### Entidades clave (Key Entities)

- **ActividadEvento**: Actividad de la agenda de un evento. Atributos: id_actividad, id_evento, titulo, tipo, descripcion, ubicacion, inicio, fin, estado, created_at, updated_at, id_usuario_actualiza.
- **ActividadEmpleado**: Responsables. Atributos: id_actividad, id_empleado, PK compuesta.
- **ActividadServicio**: Servicios. Atributos: id_actividad, id_servicio, PK compuesta.
- **NotificacionEvento**: Envíos. Atributos: id_notificacion, id_actividad, destinatario, programada_para, enviada_en, estado, error.

## Criterios de éxito (Success Criteria) *(obligatorio)*

### Resultados medibles (Measurable Outcomes)

- **SC-001**: El 100 % de los recordatorios se envía con la antelación configurada (24 horas por defecto).

## Supuestos (Assumptions)

- Se implementa después de (o junto con) las specs: 014-eventos, 011-empleados, 012-agenda-empleados.
- La autenticación JWT y la autorización por permisos están disponibles (spec de acceso); mientras no lo estén, los endpoints se prueban con un usuario semilla.

## Insumos para `/speckit.plan` (no normativo)

Detalle orientativo para el plan técnico. No reemplaza las decisiones del plan, pero cualquier desviación debe quedar justificada en `plan.md`.

**API REST sugerida** (base `/api/v1`, sobre `{ ok, data, meta, error }`):

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/agenda-eventos` | Programar una actividad en la agenda de eventos | HU-99 |
| GET | `/api/v1/agenda-eventos?evento&empleado&servicio&estado&desde&hasta&q&page&limit` | Consultar la agenda de eventos | HU-100 |
| GET | `/api/v1/agenda-eventos/:id` | Consultar detalle (agenda-eventos) | HU-100 |
| PUT | `/api/v1/agenda-eventos/:id` | Actualizar una actividad de evento | HU-101 |
| PATCH | `/api/v1/agenda-eventos/:id/estado` | Cambiar el estado de una actividad de evento | HU-102 |
| PUT | `/api/v1/agenda-eventos/:id/asignaciones` | Asignar empleados y servicios a una actividad | HU-103 |
| GET | `/api/v1/reportes/agenda-eventos?agrupar&desde&hasta&empleado&servicio&estado&formato` | Generar el reporte de agenda de eventos | HU-104 |
| GET | `/api/v1/configuracion/recordatorios-eventos` | Enviar notificaciones de eventos por correo | HU-105 |
| PUT | `/api/v1/configuracion/recordatorios-eventos` | Actualizar (recordatorios eventos) | HU-105 |
| GET | `/api/v1/agenda-eventos/:id/notificaciones` | Listar o consultar notificaciones | HU-105 |
| (tarea | `programada` | cada 15 minutos) | HU-105 |
| POST | `/api/v1/clientes/me/eventos` | Solicitar una fiesta privada | HU-106 |
| GET | `/api/v1/cartelera?desde&hasta` | Consultar mis eventos y la cartelera | HU-107 |
| GET | `/api/v1/clientes/me/eventos` | Listar o consultar eventos | HU-107 |
| PUT | `/api/v1/clientes/me/eventos/:id` | Modificar mi solicitud de fiesta privada | HU-108 |
| GET | `/api/v1/clientes/me/eventos/:id` | Seguir y cancelar mi solicitud | HU-109 |
| PATCH | `/api/v1/clientes/me/eventos/:id/cancelacion` | Actualizar cancelacion | HU-109 |
| PUT | `/api/v1/clientes/me/eventos/:id/servicios` | Elegir los servicios de mi evento | HU-110 |

**Pantallas (frontend vanilla):**

- Eventos › Agenda › Nueva actividad — HU-99
- Eventos › Agenda (calendario) — HU-100
- Eventos › Agenda › Editar actividad — HU-101
- Eventos › Agenda (Cambiar estado) — HU-102
- Eventos › Agenda › Asignar — HU-103
- Eventos › Agenda › Reporte — HU-104
- Configuración › Recordatorios de eventos — HU-105
- Portal del cliente › Mis eventos › Solicitar fiesta privada — HU-106
- Cartelera (pública); Portal del cliente › Mis eventos — HU-107
- Portal del cliente › Mis eventos › Editar — HU-108
- Portal del cliente › Mis eventos › Detalle — HU-109
- Portal del cliente › Mis eventos › Servicios — HU-110

**Modelo de datos (lógico):**

*ActividadEvento*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_actividad | INT | PK |
| id_evento | INT | FK |
| titulo | VARCHAR(80) |  |
| tipo | ENUM('reunion','montaje','plazo','presentacion','otro') |  |
| descripcion | VARCHAR(500) |  |
| ubicacion | VARCHAR(80) |  |
| inicio | DATETIME |  |
| fin | DATETIME | > inicio |
| estado | ENUM('pendiente','en_progreso','completado','cancelado') |  |
| created_at | DATETIME |  |
| updated_at | DATETIME |  |
| id_usuario_actualiza | INT | FK |

*ActividadEmpleado*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_actividad | INT | FK |
| id_empleado | INT | FK |
| PK compuesta |  |  |

*ActividadServicio*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_actividad | INT | FK |
| id_servicio | INT | FK |
| PK compuesta |  |  |

*NotificacionEvento*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_notificacion | INT | PK |
| id_actividad | INT | FK |
| destinatario | VARCHAR(100) |  |
| programada_para | DATETIME |  |
| enviada_en | DATETIME |  |
| estado | ENUM('pendiente','enviada','fallida') |  |
| error | VARCHAR(200) |  |

**Reglas de negocio:**

- **RN-28**: Las actividades están dentro de un evento no cancelado; asignar un empleado crea su actividad en la agenda de empleados y respeta la regla de no cruce.
- **RN-29**: Flujo de estados de una actividad: pendiente → en progreso → completado, o cancelado desde pendiente o en progreso.
- **RN-30**: Un cliente solo ve, modifica y cancela sus propias solicitudes de fiesta privada, y solo mientras estén en estado solicitado.

## Trazabilidad

| Historia spec | HU | RF | Excel |
|---|---|---|---|
| 1 | HU-99 | RF-AGV-01 | HU_135, HU_142 |
| 2 | HU-100 | RF-AGV-02 | HU_136, HU_143 |
| 3 | HU-101 | RF-AGV-03 | HU_137, HU_144 |
| 4 | HU-102 | RF-AGV-04 | HU_138, HU_145 |
| 5 | HU-103 | RF-AGV-05, RF-AGV-06 | HU_139 |
| 6 | HU-104 | RF-AGV-07 | HU_140, HU_146 |
| 7 | HU-105 | RF-AGV-08, RF-AGV-09 | HU_141, HU_147 |
| 8 | HU-106 | RF-AGV-10, RF-AGV-11 | HU_148 |
| 9 | HU-107 | RF-AGV-12 | HU_149 |
| 10 | HU-108 | RF-AGV-13 | HU_150 |
| 11 | HU-109 | RF-AGV-14 | HU_151 |
| 12 | HU-110 | RF-AGV-15 | HU_152 |

