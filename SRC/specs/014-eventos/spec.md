# Feature Specification: Eventos y fichas técnicas

**Feature Branch**: `014-eventos`  
**Created**: 2026-11-21  
**Status**: Draft  
**Proyecto**: Sistema de Gestión Integral para Discoteca (Discoteca (Envigado)) · **SRS**: `SRS-Discoteca-v2.0.md` §4.14 · **Historias**: HU-89 – HU-98  
**Input**: "Gestiona los eventos (temáticos de la discoteca y fiestas privadas de clientes) y su ficha técnica, que planifica temática, franja horaria, invitados y servicios. Es el par padre-hijo `/eventos` → `/fichas-tecnicas`. Actores: Administrador, Empleado."

> Spec generada a partir del SRS v2.0 y de las historias de usuario del proyecto. Respeta la estructura de `spec-template.md` de spec-kit; los encabezados van en español con su equivalente en inglés. Antes de `/speckit.plan`, ejecute `/speckit.clarify` si hay marcas `[NEEDS CLARIFICATION]`.

## Escenarios de usuario y pruebas (User Scenarios & Testing) *(obligatorio)*

### Historia 1 — Registrar un evento (Prioridad: P1) · HU-89

**Como** Administrador o Empleado, **quiero** registrar un evento con nombre, tipo, fechas, ubicación, capacidad, imagen y adjuntos, **para** gestionar la agenda de eventos de la discoteca.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite gestionar la agenda de eventos de la discoteca.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/eventos`, `POST /api/v1/eventos/:id/adjuntos` y en la pantalla «Eventos › Nuevo evento», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el nombre «Noche de los 80», tipo temático, descripción, inicio sábado 9:00 p. m., fin domingo 3:00 a. m., capacidad 300 e imagen JPG, **cuando** guardo, **entonces** el evento queda programado con código único y aparece en la lista.
2. **Dado** una fiesta privada, **cuando** la registro, **entonces** debo asociar el cliente que la solicita.
3. **Dado** un campo obligatorio vacío, una fecha de fin anterior al inicio o una capacidad mayor al aforo, **cuando** guardo, **entonces** el sistema lo señala (422).

### Historia 2 — Consultar eventos (Prioridad: P1) · HU-90

**Como** Administrador o Empleado, **quiero** buscar eventos y ver su información detallada, **para** tener acceso a la agenda y sus detalles.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite tener acceso a la agenda y sus detalles.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/eventos?q&tipo&estado&desde&hasta&page&limit`, `GET /api/v1/eventos/:id` y en la pantalla «Eventos (listado y detalle)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** la lista paginada de eventos, **cuando** busco por nombre, código, fecha, ubicación o tipo y filtro por estado, **entonces** veo los coincidentes.
2. **Dado** un evento, **cuando** lo selecciono, **entonces** veo nombre, fechas, ubicación, descripción, capacidad, estado, imagen, adjuntos, ficha técnica y asistentes registrados.

### Historia 3 — Actualizar un evento (Prioridad: P1) · HU-91

**Como** Administrador o Empleado, **quiero** modificar la información de un evento registrado, **para** mantenerla correcta.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite mantenerla correcta.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PUT /api/v1/eventos/:id` y en la pantalla «Eventos › Editar», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un evento programado, **cuando** cambio su descripción y hora de fin y guardo, **entonces** se reflejan en la lista y veo el mensaje de confirmación.
2. **Dado** un evento en curso, **cuando** amplío su hora de fin, **entonces** se permite; si intento adelantar el inicio, entonces el sistema lo impide.
3. **Dado** el campo código, **cuando** edito, **entonces** no es modificable.

### Historia 4 — Cambiar el estado de un evento (Prioridad: P1) · HU-92

**Como** Empleado o Administrador, **quiero** cambiar el estado de un evento, **para** reflejar su progreso.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite reflejar su progreso.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PATCH /api/v1/eventos/:id/estado`, `DELETE /api/v1/eventos/:id` y en la pantalla «Eventos › Detalle (Cambiar estado)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un evento programado, **cuando** lo paso a en curso, **entonces** el cambio se registra con fecha y hora y se muestra el estado actual.
2. **Dado** un evento programado, **cuando** lo cancelo con motivo, **entonces** su ficha técnica y sus actividades pendientes se cancelan y se notifica por correo a los empleados y clientes asociados.

### Historia 5 — Generar el reporte de eventos (Prioridad: P2) · HU-93

**Como** Administrador o Empleado, **quiero** generar reportes de eventos por periodo, tipo y estado, **para** analizarlos y hacerles seguimiento.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite analizarlos y hacerles seguimiento.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/reportes/eventos?desde&hasta&tipo&estado&formato`, `GET /api/v1/eventos/:id/asistentes?formato` y en la pantalla «Eventos › Reporte», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un periodo, **cuando** genero el reporte, **entonces** veo cantidad de eventos por tipo, temática y estado y el listado de asistentes de un evento, con fecha y hora de generación, en PDF o CSV.

### Historia 6 — Registrar la ficha técnica de un evento (Prioridad: P1) · HU-94

**Como** Administrador o Empleado, **quiero** registrar la ficha técnica de un evento con temática, franja horaria, invitados y servicios, **para** planificar los recursos del evento.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite planificar los recursos del evento.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/fichas-tecnicas`, `GET /api/v1/tematicas`, `POST /api/v1/tematicas` y en la pantalla «Eventos › Detalle › Ficha técnica», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el evento «Noche de los 80» sin ficha, **cuando** registro la temática «Retro», franja de 9:00 p. m. a 3:00 a. m., 250 invitados y los servicios Sonido ×1, Iluminación ×1 y Decoración ×1, **entonces** la ficha queda pendiente y veo el mensaje de confirmación.
2. **Dado** que la temática no existe en la lista, **cuando** la escribo, **entonces** puedo crearla en el mismo formulario.
3. **Dado** invitados negativos o mayores que la capacidad del evento, una franja fuera de las fechas del evento o un evento que ya tiene ficha, **cuando** guardo, **entonces** el sistema lo impide.

### Historia 7 — Consultar fichas técnicas (Prioridad: P1) · HU-95

**Como** Administrador o Empleado, **quiero** buscar fichas técnicas y ver su información, **para** revisar los detalles de cada evento.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite revisar los detalles de cada evento.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/fichas-tecnicas?q&evento&tematica&desde&hasta&estado&page&limit`, `GET /api/v1/fichas-tecnicas/:id` y en la pantalla «Eventos › Fichas técnicas (listado y detalle)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el buscador, **cuando** busco por id, evento, temática, franja horaria o rango de fechas, **entonces** veo las fichas coincidentes paginadas.
2. **Dado** una ficha, **cuando** la abro, **entonces** veo evento, temática, franja, invitados, servicios con cantidades, estado e historial.

### Historia 8 — Actualizar una ficha técnica (Prioridad: P1) · HU-96

**Como** Administrador o Empleado, **quiero** modificar temática, franja, invitados y servicios de una ficha, **para** ajustar la planificación del evento.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite ajustar la planificación del evento.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PUT /api/v1/fichas-tecnicas/:id` y en la pantalla «Eventos › Ficha técnica › Editar», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** una ficha pendiente o en proceso, **cuando** cambio los invitados a 280 y agrego Catering ×1, **entonces** se guarda, queda en el historial y veo el mensaje de confirmación.
2. **Dado** una ficha completada o cancelada, **cuando** intento modificarla, **entonces** el sistema lo impide.

### Historia 9 — Cambiar el estado de una ficha técnica (Prioridad: P2) · HU-97

**Como** Administrador o Empleado, **quiero** cambiar el estado de la ficha con una nota, **para** reflejar el progreso de la planificación.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite reflejar el progreso de la planificación.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PATCH /api/v1/fichas-tecnicas/:id/estado`, `PATCH /api/v1/fichas-tecnicas/:id/servicios/:idServicio`, `DELETE /api/v1/fichas-tecnicas/:id` y en la pantalla «Eventos › Ficha técnica (Cambiar estado)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** una ficha en proceso con todos sus servicios registrados, **cuando** la paso a completado con una nota, **entonces** el cambio queda con fecha y hora.
2. **Dado** una ficha con servicios sin registrar, **cuando** intento completarla, **entonces** el sistema lo impide indicando los servicios pendientes.

### Historia 10 — Generar el reporte de fichas técnicas por temática (Prioridad: P2) · HU-98

**Como** Administrador o Empleado, **quiero** generar reportes de fichas técnicas agrupadas por temática, **para** analizar la demanda de eventos.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite analizar la demanda de eventos.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/reportes/fichas-tecnicas?desde&hasta&formato` y en la pantalla «Eventos › Fichas técnicas › Reporte», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un rango de fechas, **cuando** genero el reporte, **entonces** veo la cantidad de eventos por temática y un resumen de cada evento (fecha, hora, invitados, servicios), con fecha y hora de generación, en PDF o CSV.

### Casos límite (Edge Cases)

- Fiesta privada sin cliente asociado: se rechaza (422).
- Imagen del evento mayor a 2 MB o no JPG/PNG/WEBP: se rechaza.

## Requerimientos (Requirements) *(obligatorio)*

### Requerimientos funcionales (Functional Requirements)

- **FR-001**: El sistema DEBE registrar eventos con nombre, tipo (temático o fiesta privada), descripción, ubicación, fechas de inicio y fin coherentes, capacidad máxima no mayor al aforo e imagen, con código único, en estado programado. *(RF-EVE-01 · HU-89)*
- **FR-002**: El sistema DEBE exigir el cliente asociado en las fiestas privadas. *(RF-EVE-02 · HU-89)*
- **FR-003**: El sistema DEBE permitir adjuntar archivos al evento (PDF, PPTX, JPG o PNG, máximo 10 MB). *(RF-EVE-03 · HU-89)*
- **FR-004**: El sistema DEBE listar los eventos paginados con búsqueda por nombre, código, fecha, ubicación o tipo y filtro por estado, y mostrar el detalle con ficha técnica y adjuntos. *(RF-EVE-04 · HU-90)*
- **FR-005**: El sistema DEBE actualizar cualquier dato del evento excepto su código, validando los obligatorios y la coherencia de fechas. *(RF-EVE-05 · HU-91)*
- **FR-006**: El sistema DEBE permitir actualizar eventos en curso solo en capacidad, descripción, ubicación y ampliación de la hora de fin. *(RF-EVE-06 · HU-91)*
- **FR-007**: El sistema DEBE cambiar el estado del evento según el flujo solicitado → programado → en curso → finalizado, o a cancelado desde cualquier estado previo a finalizado, registrando fecha y hora. *(RF-EVE-07 · HU-92)*
- **FR-008**: El sistema DEBE, al cancelar un evento, cancelar su ficha técnica y actividades pendientes y notificar a los usuarios asociados. *(RF-EVE-08 · HU-92)*
- **FR-009**: El sistema DEBE generar reportes de eventos por periodo, tipo, temática y estado, y el listado de asistentes por evento, en PDF o CSV con fecha y hora de generación. *(RF-EVE-09 · HU-93)*
- **FR-010**: El sistema DEBE registrar una ficha técnica por evento con temática (de la lista o nueva), franja horaria dentro de las fechas del evento, cantidad de invitados entre 0 y la capacidad del evento y servicios activos con su cantidad, en estado pendiente. *(RF-EVE-10 · HU-94)*
- **FR-011**: El sistema DEBE permitir crear temáticas nuevas desde la ficha técnica. *(RF-EVE-11 · HU-94)*
- **FR-012**: El sistema DEBE buscar fichas técnicas por id, evento, temática, franja horaria o rango de fechas, paginadas, y mostrar su detalle con servicios e historial. *(RF-EVE-12 · HU-95)*
- **FR-013**: El sistema DEBE actualizar temática, franja horaria, invitados y servicios de fichas pendientes o en proceso, con las mismas validaciones del registro, registrando el historial de cambios. *(RF-EVE-13 · HU-96)*
- **FR-014**: El sistema DEBE cambiar el estado de la ficha entre pendiente, en proceso, completado y cancelado, con nota opcional, registrando fecha y hora. *(RF-EVE-14 · HU-97)*
- **FR-015**: El sistema DEBE permitir completar la ficha solo si todos sus servicios están registrados. *(RF-EVE-15 · HU-97)*
- **FR-016**: El sistema DEBE generar el reporte de fichas técnicas agrupadas por temática con cantidad de eventos y resumen por evento, filtrable por rango de fechas, en PDF o CSV. *(RF-EVE-16 · HU-98)*

### Requerimientos no funcionales aplicables

Aplican todos los principios de `constitution.md` y los RNF transversales del SRS §5.

### Entidades clave (Key Entities)

- **Evento**: Evento de la discoteca. Atributos: id_evento, codigo, nombre, tipo, descripcion, ubicacion, fecha_inicio, fecha_fin, capacidad_maxima, imagen_url, id_cliente, estado, created_at, updated_at.
- **AdjuntoEvento**: Presentaciones y archivos. Atributos: id_adjunto, id_evento, url, nombre.
- **Tematica**: Catálogo de temáticas. Atributos: id_tematica, nombre, estado.
- **FichaTecnica**: Planificación del evento (hijo de Evento). Atributos: id_ficha, id_evento, id_tematica, franja_inicio, franja_fin, cantidad_invitados, observaciones, estado, created_at, updated_at.
- **FichaServicio**: Servicios de la ficha. Atributos: id_ficha_servicio, id_ficha, id_servicio, cantidad, registrado.
- **HistorialFicha**: Cambios y estados. Atributos: id_historial, id_ficha, accion, detalle, nota, id_usuario, fecha.

## Criterios de éxito (Success Criteria) *(obligatorio)*

### Resultados medibles (Measurable Outcomes)

- **SC-001**: Un administrador registra un evento con su ficha técnica en menos de 5 minutos.
- **SC-002**: El 100 % de las fichas completadas tiene todos sus servicios registrados.

## Supuestos (Assumptions)

- Se implementa después de (o junto con) las specs: 010-servicios, 007-clientes.
- La autenticación JWT y la autorización por permisos están disponibles (spec de acceso); mientras no lo estén, los endpoints se prueban con un usuario semilla.

## Insumos para `/speckit.plan` (no normativo)

Detalle orientativo para el plan técnico. No reemplaza las decisiones del plan, pero cualquier desviación debe quedar justificada en `plan.md`.

**API REST sugerida** (base `/api/v1`, sobre `{ ok, data, meta, error }`):

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/eventos` | Registrar un evento | HU-89 |
| POST | `/api/v1/eventos/:id/adjuntos` | Registrar (adjuntos) | HU-89 |
| GET | `/api/v1/eventos?q&tipo&estado&desde&hasta&page&limit` | Consultar eventos | HU-90 |
| GET | `/api/v1/eventos/:id` | Consultar detalle (eventos) | HU-90 |
| PUT | `/api/v1/eventos/:id` | Actualizar un evento | HU-91 |
| PATCH | `/api/v1/eventos/:id/estado` | Cambiar el estado de un evento | HU-92 |
| DELETE | `/api/v1/eventos/:id` | (cancelación lógica) | HU-92 |
| GET | `/api/v1/reportes/eventos?desde&hasta&tipo&estado&formato` | Generar el reporte de eventos | HU-93 |
| GET | `/api/v1/eventos/:id/asistentes?formato` | Listar o consultar asistentes | HU-93 |
| POST | `/api/v1/fichas-tecnicas` | Registrar la ficha técnica de un evento | HU-94 |
| GET | `/api/v1/tematicas` | Listar o consultar tematicas | HU-94 |
| POST | `/api/v1/tematicas` | Registrar (tematicas) | HU-94 |
| GET | `/api/v1/fichas-tecnicas?q&evento&tematica&desde&hasta&estado&page&limit` | Consultar fichas técnicas | HU-95 |
| GET | `/api/v1/fichas-tecnicas/:id` | Consultar detalle (fichas-tecnicas) | HU-95 |
| PUT | `/api/v1/fichas-tecnicas/:id` | Actualizar una ficha técnica | HU-96 |
| PATCH | `/api/v1/fichas-tecnicas/:id/estado` | Cambiar el estado de una ficha técnica | HU-97 |
| PATCH | `/api/v1/fichas-tecnicas/:id/servicios/:idServicio` | Actualizar parcialmente | HU-97 |
| DELETE | `/api/v1/fichas-tecnicas/:id` | (cancelación lógica) | HU-97 |
| GET | `/api/v1/reportes/fichas-tecnicas?desde&hasta&formato` | Generar el reporte de fichas técnicas por temática | HU-98 |

**Pantallas (frontend vanilla):**

- Eventos › Nuevo evento — HU-89
- Eventos (listado y detalle) — HU-90
- Eventos › Editar — HU-91
- Eventos › Detalle (Cambiar estado) — HU-92
- Eventos › Reporte — HU-93
- Eventos › Detalle › Ficha técnica — HU-94
- Eventos › Fichas técnicas (listado y detalle) — HU-95
- Eventos › Ficha técnica › Editar — HU-96
- Eventos › Ficha técnica (Cambiar estado) — HU-97
- Eventos › Fichas técnicas › Reporte — HU-98

**Modelo de datos (lógico):**

*Evento*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_evento | INT | PK |
| codigo | VARCHAR(12) | único |
| nombre | VARCHAR(100) | obligatorio |
| tipo | ENUM('tematico','fiesta_privada') |  |
| descripcion | VARCHAR(1000) |  |
| ubicacion | VARCHAR(80) | zona o espacio |
| fecha_inicio | DATETIME |  |
| fecha_fin | DATETIME | > fecha_inicio |
| capacidad_maxima | INT | > 0, ≤ aforo |
| imagen_url | VARCHAR(255) |  |
| id_cliente | INT | FK, obligatorio si fiesta_privada |
| estado | ENUM('solicitado','programado','en_curso','finalizado','cancelado') |  |
| created_at | DATETIME |  |
| updated_at | DATETIME |  |

*AdjuntoEvento*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_adjunto | INT | PK |
| id_evento | INT | FK |
| url | VARCHAR(255) |  |
| nombre | VARCHAR(120) |  |

*Tematica*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_tematica | INT | PK |
| nombre | VARCHAR(60) | único |
| estado | ENUM('activa','inactiva') |  |

*FichaTecnica*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_ficha | INT | PK |
| id_evento | INT | FK, único |
| id_tematica | INT | FK |
| franja_inicio | DATETIME |  |
| franja_fin | DATETIME | > franja_inicio |
| cantidad_invitados | INT | ≥ 0, ≤ capacidad del evento |
| observaciones | VARCHAR(500) |  |
| estado | ENUM('pendiente','en_proceso','completado','cancelado') |  |
| created_at | DATETIME |  |
| updated_at | DATETIME |  |

*FichaServicio*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_ficha_servicio | INT | PK |
| id_ficha | INT | FK |
| id_servicio | INT | FK, activo |
| cantidad | INT | > 0 |
| registrado | BOOLEAN | servicio confirmado |

*HistorialFicha*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_historial | INT | PK |
| id_ficha | INT | FK |
| accion | VARCHAR(30) |  |
| detalle | VARCHAR(400) |  |
| nota | VARCHAR(200) |  |
| id_usuario | INT | FK |
| fecha | DATETIME |  |

**Reglas de negocio:**

- **RN-24**: Cada evento tiene como máximo una ficha técnica; la franja horaria está dentro de las fechas del evento y los invitados no superan la capacidad del evento.
- **RN-25**: La ficha solo se modifica en estado pendiente o en proceso y solo pasa a completado cuando todos sus servicios están registrados.
- **RN-26**: Los datos de un evento en curso se pueden actualizar (capacidad, descripción, ubicación); sus fechas solo se amplían, no se adelantan.
- **RN-27**: Cancelar un evento cancela su ficha técnica y sus actividades de agenda pendientes y notifica a los empleados y clientes asociados.

**Validaciones de campos por historia:**

- HU-89: nombre (3–100); tipo; fecha_inicio < fecha_fin; capacidad_maxima (1–aforo); imagen (JPG/PNG/WEBP ≤ 2 MB); id_cliente (si fiesta_privada)
- HU-94: id_evento (sin ficha); id_tematica o nombre nuevo; franja_inicio < franja_fin (dentro del evento); cantidad_invitados (0–capacidad); servicios (≥1): cantidad (> 0)

## Trazabilidad

| Historia spec | HU | RF | Excel |
|---|---|---|---|
| 1 | HU-89 | RF-EVE-01, RF-EVE-02, RF-EVE-03 | HU_116, HU_120 |
| 2 | HU-90 | RF-EVE-04 | HU_117, HU_121 |
| 3 | HU-91 | RF-EVE-05, RF-EVE-06 | HU_118, HU_122 |
| 4 | HU-92 | RF-EVE-07, RF-EVE-08 | HU_123 |
| 5 | HU-93 | RF-EVE-09 | HU_119, HU_124 |
| 6 | HU-94 | RF-EVE-10, RF-EVE-11 | HU_125, HU_130 |
| 7 | HU-95 | RF-EVE-12 | HU_126, HU_131 |
| 8 | HU-96 | RF-EVE-13 | HU_127, HU_132 |
| 9 | HU-97 | RF-EVE-14, RF-EVE-15 | HU_128, HU_133 |
| 10 | HU-98 | RF-EVE-16 | HU_129, HU_134 |

