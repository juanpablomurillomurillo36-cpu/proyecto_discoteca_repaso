# Feature Specification: Notificaciones

**Feature Branch**: `018-notificaciones`  
**Created**: 2026-11-21  
**Status**: Draft  
**Proyecto**: Sistema de Gestión Integral para Discoteca (Discoteca (Envigado)) · **SRS**: `SRS-Discoteca-v2.0.md` §4.18 · **Historias**: HU-126 – HU-132  
**Input**: "Envía correos a los clientes sobre promociones, eventos especiales y cumpleaños, con plantillas reutilizables, listas segmentadas, envíos programados y recurrentes, monitoreo y baja de suscripción. Actores: Administrador, Empleado, Cliente."

> Spec generada a partir del SRS v2.0 y de las historias de usuario del proyecto. Respeta la estructura de `spec-template.md` de spec-kit; los encabezados van en español con su equivalente en inglés. Antes de `/speckit.plan`, ejecute `/speckit.clarify` si hay marcas `[NEEDS CLARIFICATION]`.

## Escenarios de usuario y pruebas (User Scenarios & Testing) *(obligatorio)*

### Historia 1 — Programar una campaña de promociones (Prioridad: P2) · HU-126

**Como** Administrador o Empleado, **quiero** programar el envío de promociones por correo a un grupo de clientes, único o recurrente, **para** aumentar las ventas.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite aumentar las ventas.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/campanas`, `PUT /api/v1/campanas/:id`, `PATCH /api/v1/campanas/:id/estado` y en la pantalla «Notificaciones › Nueva campaña», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** asunto, cuerpo, adjunto, la lista «Frecuentes» y el envío el viernes a las 4:00 p. m. con recurrencia semanal, **cuando** programo la campaña, **entonces** queda programada y se envía cada viernes a la hora definida.
2. **Dado** el envío, **cuando** termina, **entonces** cada correo queda registrado con fecha, hora, destinatario y estado (enviado, fallido o rebotado con la razón).
3. **Dado** un cliente que se dio de baja, **cuando** se envía la campaña, **entonces** no lo recibe.

### Historia 2 — Notificar eventos especiales (Prioridad: P2) · HU-127

**Como** Administrador, **quiero** enviar un correo sobre un evento especial con imágenes o video a los clientes objetivo, **para** informarles las novedades.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite informarles las novedades.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/campanas` y en la pantalla «Notificaciones › Evento especial», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el evento «Noche de los 80», **cuando** creo la notificación con su imagen y la lista «VIP», **entonces** el correo incluye nombre, fecha, hora e imagen del evento y cada envío queda registrado con su estado.

### Historia 3 — Felicitar a los clientes en su cumpleaños (Prioridad: P2) · HU-128

**Como** Administrador o Empleado, **quiero** que cada cliente reciba un correo personalizado con un cupón el día de su cumpleaños, **para** fortalecer la relación con el cliente.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite fortalecer la relación con el cliente.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/configuracion/cumpleanos`, `PUT /api/v1/configuracion/cumpleanos`, `(tarea programada` y en la pantalla «Configuración › Cumpleaños», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un cliente con fecha de nacimiento hoy y correo, **cuando** corre el proceso diario de las 10:00 a. m., **entonces** recibe el correo con su nombre y un cupón de descuento y el envío queda registrado.
2. **Dado** un cliente sin fecha de nacimiento o sin correo, **cuando** corre el proceso, **entonces** se omite y queda en el registro como omitido.

### Historia 4 — Gestionar plantillas de correo (Prioridad: P2) · HU-129

**Como** Administrador, **quiero** crear, editar, duplicar y eliminar plantillas de correo con variables, **para** agilizar los envíos.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite agilizar los envíos.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/plantillas`, `POST /api/v1/plantillas`, `PUT /api/v1/plantillas/:id` y en la pantalla «Notificaciones › Plantillas», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** una plantilla de promoción con {{nombre}} en el asunto, **cuando** la guardo y envío una prueba, **entonces** el correo de prueba llega con el nombre reemplazado.
2. **Dado** una plantilla usada en campañas programadas, **cuando** intento eliminarla, **entonces** el sistema lo impide y sugiere inactivarla.

### Historia 5 — Monitorear los envíos de correo (Prioridad: P3) · HU-130

**Como** Administrador, **quiero** ver cuántos correos se enviaron, entregaron y fallaron, **para** asegurar la entrega de las notificaciones.

**Por qué esta prioridad (Why this priority)**: Prioridad Baja en el backlog del proyecto. Aporta valor porque permite asegurar la entrega de las notificaciones.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/campanas/metricas?tipo&desde&hasta&formato` y en la pantalla «Notificaciones › Monitor de envíos», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un rango de fechas y el tipo promoción, **cuando** abro el monitor, **entonces** veo enviados, entregados (si el proveedor lo informa), fallidos y rebotados por campaña, y descargo el informe.

### Historia 6 — Gestionar listas de destinatarios (Prioridad: P2) · HU-131

**Como** Empleado o Administrador, **quiero** crear listas de clientes por tipo de notificación y segmentarlas, **para** enviar cada notificación a quien corresponde.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite enviar cada notificación a quien corresponde.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/listas`, `POST /api/v1/listas`, `PUT /api/v1/listas/:id` y en la pantalla «Notificaciones › Listas», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** los criterios categoría Frecuente y ciudad Envigado, **cuando** creo la lista «Frecuentes Envigado», **entonces** incluye a los clientes que cumplen los criterios y tienen autorización.
2. **Dado** una lista, **cuando** agrego o quito clientes manualmente, o la exporto o importo en CSV, **entonces** se actualiza.

### Historia 7 — Darme de baja de las notificaciones (Prioridad: P2) · HU-132

**Como** Cliente, **quiero** dejar de recibir promociones desde el correo o mi perfil, **para** controlar lo que recibo.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite controlar lo que recibo.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/suscripciones/baja?token`, `GET /api/v1/clientes/me/suscripciones`, `PUT /api/v1/clientes/me/suscripciones` y en la pantalla «Baja de suscripción (pública); Portal del cliente › Mis suscripciones», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un correo promocional, **cuando** pulso «Darme de baja», **entonces** sin iniciar sesión veo la confirmación y no recibo más promociones.
2. **Dado** Mi perfil › Suscripciones, **cuando** desmarco promociones o eventos, **entonces** se guarda mi preferencia; los cumpleaños se controlan aparte.

### Casos límite (Edge Cases)

- Campaña programada cuya lista quedó vacía por bajas: se marca enviada con 0 destinatarios y se informa.
- Cliente nacido el 29 de febrero: en años no bisiestos se felicita el 28 de febrero.

## Requerimientos (Requirements) *(obligatorio)*

### Requerimientos funcionales (Functional Requirements)

- **FR-001**: El sistema DEBE programar campañas de promociones con asunto, cuerpo o plantilla, adjuntos, lista de destinatarios o todos los suscritos, fecha y hora de envío y recurrencia (ninguna, diaria, semanal, mensual). *(RF-NOT-01 · HU-126)*
- **FR-002**: El sistema DEBE registrar cada envío con fecha, hora, destinatario, estado y razón de falla, y gestionar los rebotes. *(RF-NOT-02 · HU-126)*
- **FR-003**: El sistema DEBE incluir en cada correo promocional un enlace de baja y excluir a los clientes sin autorización o dados de baja. *(RF-NOT-03 · HU-126)*
- **FR-004**: El sistema DEBE enviar notificaciones de eventos especiales vinculadas a un evento, con contenido multimedia (imágenes y enlaces a video), a los grupos de clientes elegidos, registrando cada envío y respetando las bajas. *(RF-NOT-04 · HU-127)*
- **FR-005**: El sistema DEBE enviar diariamente un correo de cumpleaños personalizado con el nombre del cliente y un cupón o beneficio configurable, usando la plantilla de cumpleaños. *(RF-NOT-05 · HU-128)*
- **FR-006**: El sistema DEBE omitir y registrar a los clientes sin fecha de nacimiento o sin correo y registrar el estado de cada envío. *(RF-NOT-06 · HU-128)*
- **FR-007**: El sistema DEBE gestionar plantillas de correo (crear, editar, duplicar, eliminar o inactivar) con variables de personalización y tipo de notificación asociado. *(RF-NOT-07 · HU-129)*
- **FR-008**: El sistema DEBE permitir enviar un correo de prueba de una plantilla. *(RF-NOT-08 · HU-129)*
- **FR-009**: El sistema DEBE mostrar el número de correos enviados, entregados, fallidos y rebotados por campaña, filtrable por tipo y fecha, y descargar el informe en CSV o PDF. *(RF-NOT-09 · HU-130)*
- **FR-010**: El sistema DEBE crear, editar y eliminar listas de destinatarios por tipo de notificación, segmentadas por categoría, nivel VIP, ciudad, género y preferencias, con miembros manuales. *(RF-NOT-10 · HU-131)*
- **FR-011**: El sistema DEBE importar y exportar listas en CSV, validando que los importados sean clientes registrados. *(RF-NOT-11 · HU-131)*
- **FR-012**: El sistema DEBE procesar la baja de suscripción desde el enlace del correo sin iniciar sesión y desde el perfil del cliente, por tipo de notificación. *(RF-NOT-12 · HU-132)*

### Requerimientos no funcionales aplicables

Aplican todos los principios de `constitution.md` y los RNF transversales del SRS §5. En particular:

- **RNF-PRI-01**: Los formularios de registro de clientes y empleados deben mostrar el aviso de privacidad y exigir la autorización de tratamiento de datos (Ley 1581 de 2012); la autorización para recibir promociones debe ser una casilla aparte, desmarcada por defecto.
- **RNF-PRI-04**: Cada correo promocional debe incluir un enlace de baja que funcione sin iniciar sesión; la baja se aplica a los envíos programados desde ese momento.

### Entidades clave (Key Entities)

- **Plantilla**: Plantilla de correo. Atributos: id_plantilla, nombre, tipo, asunto, cuerpo_html, estado.
- **ListaDestinatarios**: Segmento. Atributos: id_lista, nombre, criterios_json, tipo_notificacion, created_at.
- **ListaCliente**: Miembros manuales. Atributos: id_lista, id_cliente, PK compuesta.
- **Campana**: Envío programado. Atributos: id_campana, tipo, id_plantilla, asunto, cuerpo_html, id_lista, id_evento, programada_para, recurrencia, estado, id_usuario.
- **Envio**: Correo individual. Atributos: id_envio, id_campana, id_cliente, correo, estado, motivo, fecha.
- **AdjuntoCampana**: Multimedia. Atributos: id_adjunto, id_campana, url, tipo.

## Criterios de éxito (Success Criteria) *(obligatorio)*

### Resultados medibles (Measurable Outcomes)

- **SC-001**: El 100 % de los correos promocionales tiene enlace de baja funcional.
- **SC-002**: El 0 % de las campañas llega a clientes dados de baja.

## Supuestos (Assumptions)

- Se implementa después de (o junto con) las specs: 007-clientes, 014-eventos.
- La autenticación JWT y la autorización por permisos están disponibles (spec de acceso); mientras no lo estén, los endpoints se prueban con un usuario semilla.

## Insumos para `/speckit.plan` (no normativo)

Detalle orientativo para el plan técnico. No reemplaza las decisiones del plan, pero cualquier desviación debe quedar justificada en `plan.md`.

**API REST sugerida** (base `/api/v1`, sobre `{ ok, data, meta, error }`):

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/campanas` | Programar una campaña de promociones | HU-126, HU-127 |
| PUT | `/api/v1/campanas/:id` | Actualizar (campanas) | HU-126 |
| PATCH | `/api/v1/campanas/:id/estado` | Actualizar estado | HU-126 |
| (tarea | `programada` | cada minuto) | HU-126, HU-128 |
| GET | `/api/v1/configuracion/cumpleanos` | Felicitar a los clientes en su cumpleaños | HU-128 |
| PUT | `/api/v1/configuracion/cumpleanos` | Actualizar (cumpleanos) | HU-128 |
| GET | `/api/v1/plantillas` | Gestionar plantillas de correo | HU-129 |
| POST | `/api/v1/plantillas` | Registrar (plantillas) | HU-129 |
| PUT | `/api/v1/plantillas/:id` | Actualizar (plantillas) | HU-129 |
| POST | `/api/v1/plantillas/:id/duplicado` | Registrar (duplicado) | HU-129 |
| DELETE | `/api/v1/plantillas/:id` | Inactivar (eliminación lógica) | HU-129 |
| POST | `/api/v1/plantillas/:id/prueba` | Registrar (prueba) | HU-129 |
| GET | `/api/v1/campanas/metricas?tipo&desde&hasta&formato` | Monitorear los envíos de correo | HU-130 |
| GET | `/api/v1/listas` | Gestionar listas de destinatarios | HU-131 |
| POST | `/api/v1/listas` | Registrar (listas) | HU-131 |
| PUT | `/api/v1/listas/:id` | Actualizar (listas) | HU-131 |
| DELETE | `/api/v1/listas/:id` | Inactivar (eliminación lógica) | HU-131 |
| POST | `/api/v1/listas/:id/importacion` | Registrar (importacion) | HU-131 |
| GET | `/api/v1/listas/:id/exportacion` | Listar o consultar exportacion | HU-131 |
| POST | `/api/v1/suscripciones/baja?token` | Darme de baja de las notificaciones | HU-132 |
| GET | `/api/v1/clientes/me/suscripciones` | Listar o consultar suscripciones | HU-132 |
| PUT | `/api/v1/clientes/me/suscripciones` | Actualizar (suscripciones) | HU-132 |

**Pantallas (frontend vanilla):**

- Notificaciones › Nueva campaña — HU-126
- Notificaciones › Evento especial — HU-127
- Configuración › Cumpleaños — HU-128
- Notificaciones › Plantillas — HU-129
- Notificaciones › Monitor de envíos — HU-130
- Notificaciones › Listas — HU-131
- Baja de suscripción (pública); Portal del cliente › Mis suscripciones — HU-132

**Modelo de datos (lógico):**

*Plantilla*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_plantilla | INT | PK |
| nombre | VARCHAR(60) | único |
| tipo | ENUM('promocion','evento','cumpleanos') |  |
| asunto | VARCHAR(150) |  |
| cuerpo_html | TEXT | variables {{nombre}}, {{fecha}}, {{cupon}} |
| estado | ENUM('activa','inactiva') |  |

*ListaDestinatarios*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_lista | INT | PK |
| nombre | VARCHAR(60) |  |
| criterios_json | JSON | categoría, nivel VIP, ciudad, género, preferencias |
| tipo_notificacion | ENUM('promocion','evento','cumpleanos') |  |
| created_at | DATETIME |  |

*ListaCliente*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_lista | INT | FK |
| id_cliente | INT | FK |
| PK compuesta |  |  |

*Campana*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_campana | INT | PK |
| tipo | ENUM('promocion','evento','cumpleanos') |  |
| id_plantilla | INT | FK |
| asunto | VARCHAR(150) |  |
| cuerpo_html | TEXT |  |
| id_lista | INT | FK, opcional |
| id_evento | INT | FK, opcional |
| programada_para | DATETIME |  |
| recurrencia | ENUM('ninguna','diaria','semanal','mensual') |  |
| estado | ENUM('borrador','programada','enviando','enviada','cancelada') |  |
| id_usuario | INT | FK |

*Envio*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_envio | INT | PK |
| id_campana | INT | FK |
| id_cliente | INT | FK |
| correo | VARCHAR(100) |  |
| estado | ENUM('pendiente','enviado','entregado','fallido','rebotado') |  |
| motivo | VARCHAR(200) |  |
| fecha | DATETIME |  |

*AdjuntoCampana*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_adjunto | INT | PK |
| id_campana | INT | FK |
| url | VARCHAR(255) |  |
| tipo | VARCHAR(20) |  |

**Reglas de negocio:**

- **RN-36**: Las campañas de promociones y eventos solo se envían a clientes activos con autorización de promociones vigente y sin baja; la felicitación de cumpleaños solo a clientes con fecha de nacimiento y correo.
- **RN-37**: Todo correo promocional incluye el enlace de baja; un rebote permanente marca el correo como inválido para envíos futuros.

## Trazabilidad

| Historia spec | HU | RF | Excel |
|---|---|---|---|
| 1 | HU-126 | RF-NOT-01, RF-NOT-02, RF-NOT-03 | HU_198, HU_203 |
| 2 | HU-127 | RF-NOT-04 | HU_199 |
| 3 | HU-128 | RF-NOT-05, RF-NOT-06 | HU_200, HU_204 |
| 4 | HU-129 | RF-NOT-07, RF-NOT-08 | HU_201 |
| 5 | HU-130 | RF-NOT-09 | HU_202 |
| 6 | HU-131 | RF-NOT-10, RF-NOT-11 | HU_205 |
| 7 | HU-132 | RF-NOT-12 | Inferida (ficha) |

