# Feature Specification: Agenda de empleados

**Feature Branch**: `012-agenda-empleados`  
**Created**: 2026-11-21  
**Status**: Draft  
**Proyecto**: Sistema de Gestión Integral para Discoteca (Discoteca (Envigado)) · **SRS**: `SRS-Discoteca-v2.0.md` §4.12 · **Historias**: HU-76 – HU-80  
**Input**: "Programa los turnos y actividades de cada empleado asociados a un servicio (y opcionalmente a un evento), evitando cruces de horario. Actores: Administrador, Empleado."

> Spec generada a partir del SRS v2.0 y de las historias de usuario del proyecto. Respeta la estructura de `spec-template.md` de spec-kit; los encabezados van en español con su equivalente en inglés. Antes de `/speckit.plan`, ejecute `/speckit.clarify` si hay marcas `[NEEDS CLARIFICATION]`.

## Escenarios de usuario y pruebas (User Scenarios & Testing) *(obligatorio)*

### Historia 1 — Programar una actividad en la agenda de un empleado (Prioridad: P1) · HU-76

**Como** Administrador o Empleado, **quiero** registrar un turno o actividad con empleado, servicio, fechas y descripción, **para** planificar la jornada y saber qué servicio atiende cada empleado.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite planificar la jornada y saber qué servicio atiende cada empleado.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/agenda-empleados` y en la pantalla «Agenda › Nueva actividad», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el empleado DJ Andrés, el servicio «DJ residente», el viernes de 10:00 p. m. a 3:00 a. m. y una descripción, **cuando** guardo, **entonces** la actividad queda pendiente y veo el mensaje de confirmación.
2. **Dado** que el empleado ya tiene una actividad que se cruza, **cuando** guardo, **entonces** el sistema lo impide indicando el cruce.
3. **Dado** que soy Empleado, **cuando** registro una actividad, **entonces** solo puedo hacerlo en mi propia agenda.

### Historia 2 — Consultar la agenda de empleados (Prioridad: P1) · HU-77

**Como** Administrador o Empleado, **quiero** ver la agenda en calendario con filtros, **para** visualizar las actividades programadas.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite visualizar las actividades programadas.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/agenda-empleados?empleado&servicio&estado&desde&hasta`, `GET /api/v1/agenda-empleados/:id` y en la pantalla «Agenda (calendario)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** la vista de calendario semanal, **cuando** filtro por empleado, servicio o estado, **entonces** veo las actividades con fecha, hora, servicio y descripción.
2. **Dado** que soy Empleado, **cuando** abro la agenda, **entonces** veo mis actividades; si no hay, veo un mensaje.

### Historia 3 — Actualizar una actividad de la agenda (Prioridad: P2) · HU-78

**Como** Administrador o Empleado, **quiero** modificar fecha, hora, servicio y descripción de una actividad, **para** reprogramar cuando sea necesario.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite reprogramar cuando sea necesario.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PUT /api/v1/agenda-empleados/:id` y en la pantalla «Agenda › Editar actividad», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** una actividad pendiente, **cuando** cambio su hora sin generar cruces, **entonces** se guarda y veo el mensaje de confirmación.
2. **Dado** un cambio que genera cruce o fechas incoherentes, **cuando** guardo, **entonces** el sistema lo impide.

### Historia 4 — Cambiar el estado de una actividad de la agenda (Prioridad: P2) · HU-79

**Como** Administrador o Empleado, **quiero** marcar una actividad como completada o cancelada, **para** llevar el control de las actividades.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite llevar el control de las actividades.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PATCH /api/v1/agenda-empleados/:id/estado` y en la pantalla «Agenda (Cambiar estado)», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** una actividad pendiente, **cuando** la marco como completada, **entonces** se registra fecha y hora del cambio y veo el mensaje de confirmación.

### Historia 5 — Generar el reporte de agenda de empleados (Prioridad: P2) · HU-80

**Como** Administrador o Empleado, **quiero** generar reportes de la agenda por fecha, empleado, servicio y estado, **para** medir la productividad y gestionar el tiempo.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite medir la productividad y gestionar el tiempo.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/reportes/agenda-empleados?desde&hasta&empleado&servicio&estado&formato` y en la pantalla «Agenda › Reporte», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un rango de fechas y un servicio, **cuando** genero el reporte, **entonces** descargo un PDF o CSV con fecha, hora, descripción, empleado, servicio, estado y horas programadas por empleado.

### Casos límite (Edge Cases)

- Turno que cruza la medianoche (10:00 p. m. a 4:00 a. m.): se admite como un solo turno.

## Requerimientos (Requirements) *(obligatorio)*

### Requerimientos funcionales (Functional Requirements)

- **FR-001**: El sistema DEBE registrar actividades de agenda con empleado activo, servicio activo opcional, título, descripción e inicio y fin válidos, en estado pendiente. *(RF-AGE-01 · HU-76)*
- **FR-002**: El sistema DEBE impedir actividades que se crucen con otras no canceladas del mismo empleado. *(RF-AGE-02 · HU-76)*
- **FR-003**: El sistema DEBE mostrar la asociación empleado-servicio en la agenda y en los reportes. *(RF-AGE-03 · HU-76)*
- **FR-004**: El sistema DEBE mostrar la agenda en vista de calendario (día, semana, mes) y de lista, filtrable por empleado, fecha, servicio, título y estado, limitando al Empleado a su propia agenda. *(RF-AGE-04 · HU-77)*
- **FR-005**: El sistema DEBE actualizar título, descripción, fechas y servicio de actividades pendientes, validando fechas y ausencia de cruces. *(RF-AGE-05 · HU-78)*
- **FR-006**: El sistema DEBE cambiar el estado de las actividades entre pendiente, completado y cancelado, mostrando el estado actual y registrando fecha y hora del cambio. *(RF-AGE-06 · HU-79)*
- **FR-007**: El sistema DEBE generar el reporte de agenda filtrable por fecha, empleado, servicio y estado, con horas programadas por empleado, en PDF o CSV. *(RF-AGE-07 · HU-80)*

### Requerimientos no funcionales aplicables

Aplican todos los principios de `constitution.md` y los RNF transversales del SRS §5.

### Entidades clave (Key Entities)

- **AgendaEmpleado**: Turno o actividad. Atributos: id_agenda, id_empleado, id_servicio, id_actividad_evento, titulo, descripcion, inicio, fin, estado, created_at, updated_at.

## Criterios de éxito (Success Criteria) *(obligatorio)*

### Resultados medibles (Measurable Outcomes)

- **SC-001**: El 0 % de los turnos registrados se cruza para un mismo empleado.
- **SC-002**: Un administrador programa los turnos de una noche para 20 empleados en menos de 15 minutos.

## Supuestos (Assumptions)

- Se implementa después de (o junto con) las specs: 010-servicios, 011-empleados.
- La autenticación JWT y la autorización por permisos están disponibles (spec de acceso); mientras no lo estén, los endpoints se prueban con un usuario semilla.

## Insumos para `/speckit.plan` (no normativo)

Detalle orientativo para el plan técnico. No reemplaza las decisiones del plan, pero cualquier desviación debe quedar justificada en `plan.md`.

**API REST sugerida** (base `/api/v1`, sobre `{ ok, data, meta, error }`):

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/agenda-empleados` | Programar una actividad en la agenda de un empleado | HU-76 |
| GET | `/api/v1/agenda-empleados?empleado&servicio&estado&desde&hasta` | Consultar la agenda de empleados | HU-77 |
| GET | `/api/v1/agenda-empleados/:id` | Consultar detalle (agenda-empleados) | HU-77 |
| PUT | `/api/v1/agenda-empleados/:id` | Actualizar una actividad de la agenda | HU-78 |
| PATCH | `/api/v1/agenda-empleados/:id/estado` | Cambiar el estado de una actividad de la agenda | HU-79 |
| GET | `/api/v1/reportes/agenda-empleados?desde&hasta&empleado&servicio&estado&formato` | Generar el reporte de agenda de empleados | HU-80 |

**Pantallas (frontend vanilla):**

- Agenda › Nueva actividad — HU-76
- Agenda (calendario) — HU-77
- Agenda › Editar actividad — HU-78
- Agenda (Cambiar estado) — HU-79
- Agenda › Reporte — HU-80

**Modelo de datos (lógico):**

*AgendaEmpleado*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_agenda | INT | PK |
| id_empleado | INT | FK, activo |
| id_servicio | INT | FK, opcional |
| id_actividad_evento | INT | FK, opcional |
| titulo | VARCHAR(80) |  |
| descripcion | VARCHAR(300) |  |
| inicio | DATETIME |  |
| fin | DATETIME | > inicio |
| estado | ENUM('pendiente','completado','cancelado') |  |
| created_at | DATETIME |  |
| updated_at | DATETIME |  |

**Reglas de negocio:**

- **RN-19**: Un empleado no puede tener dos actividades no canceladas que se crucen en horario; fin debe ser posterior a inicio.
- **RN-20**: Un empleado solo registra y modifica actividades de su propia agenda; el Administrador gestiona las de todos.

**Validaciones de campos por historia:**

- HU-76: id_empleado (activo); id_servicio (activo, opcional); titulo (3–80); inicio < fin

## Trazabilidad

| Historia spec | HU | RF | Excel |
|---|---|---|---|
| 1 | HU-76 | RF-AGE-01, RF-AGE-02, RF-AGE-03 | HU_94, HU_98, HU_100 |
| 2 | HU-77 | RF-AGE-04 | HU_95, HU_101 |
| 3 | HU-78 | RF-AGE-05 | HU_96, HU_102 |
| 4 | HU-79 | RF-AGE-06 | HU_97, HU_103 |
| 5 | HU-80 | RF-AGE-07 | HU_99, HU_104 |

