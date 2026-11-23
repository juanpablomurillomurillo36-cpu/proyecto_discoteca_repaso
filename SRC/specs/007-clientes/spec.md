# Feature Specification: Clientes y categorías de clientes

**Feature Branch**: `007-clientes`  
**Created**: 2026-11-21  
**Status**: Draft  
**Proyecto**: Sistema de Gestión Integral para Discoteca (Discoteca (Envigado)) · **SRS**: `SRS-Discoteca-v2.0.md` §4.7 · **Historias**: HU-38 – HU-48  
**Input**: "Gestiona las categorías comerciales y la información de los clientes (mayores de 18 años), su autorización de datos y su código QR, y permite que el cliente se registre y mantenga su perfil. Actores: Administrador, Empleado, Cliente."

> Spec generada a partir del SRS v2.0 y de las historias de usuario del proyecto. Respeta la estructura de `spec-template.md` de spec-kit; los encabezados van en español con su equivalente en inglés. Antes de `/speckit.plan`, ejecute `/speckit.clarify` si hay marcas `[NEEDS CLARIFICATION]`.

## Escenarios de usuario y pruebas (User Scenarios & Testing) *(obligatorio)*

### Historia 1 — Registrar una categoría de clientes (Prioridad: P2) · HU-38

**Como** Administrador o Empleado, **quiero** registrar una categoría de clientes con nombre único y descripción, **para** clasificar a los clientes.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite clasificar a los clientes.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/categorias-clientes` y en la pantalla «Clientes › Categorías › Nueva categoría», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el nombre «Corporativo» y una descripción, **cuando** guardo, **entonces** la categoría queda activa con fecha y hora de creación y veo el mensaje de confirmación.
2. **Dado** un nombre repetido, **cuando** guardo, **entonces** veo un mensaje de error (409).

### Historia 2 — Consultar las categorías de clientes (Prioridad: P2) · HU-39

**Como** Administrador o Empleado, **quiero** ver y buscar las categorías de clientes, **para** revisar sus detalles.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite revisar sus detalles.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/categorias-clientes?q&sort&page&limit`, `GET /api/v1/categorias-clientes/:id` y en la pantalla «Clientes › Categorías», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** categorías, **cuando** abro la lista, **entonces** veo nombre, descripción, número de clientes, estado y fecha de creación, ordenables por nombre o fecha.
2. **Dado** el buscador, **cuando** escribo parte del nombre, **entonces** veo las coincidentes o un mensaje si no hay.

### Historia 3 — Actualizar una categoría de clientes (Prioridad: P2) · HU-40

**Como** Administrador o Empleado, **quiero** modificar el nombre y la descripción de una categoría, **para** mantener la información actualizada.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite mantener la información actualizada.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PUT /api/v1/categorias-clientes/:id` y en la pantalla «Clientes › Categorías › Editar», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** una categoría, **cuando** cambio su descripción y guardo, **entonces** veo el mensaje de confirmación y queda la fecha y hora de la última actualización.
2. **Dado** un nombre que ya usa otra categoría, **cuando** guardo, **entonces** veo un mensaje de error.

### Historia 4 — Cambiar el estado de una categoría de clientes (Prioridad: P2) · HU-41

**Como** Administrador o Empleado, **quiero** activar o inactivar una categoría de clientes, **para** saber qué categorías están disponibles.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite saber qué categorías están disponibles.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PATCH /api/v1/categorias-clientes/:id/estado`, `DELETE /api/v1/categorias-clientes/:id` y en la pantalla «Clientes › Categorías (Cambiar estado)», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** una categoría activa, **cuando** la inactivo y confirmo, **entonces** ya no se ofrece al registrar clientes y el cambio queda con fecha y hora.
2. **Dado** una categoría inactiva, **cuando** la reactivo, **entonces** vuelve a estar disponible.

### Historia 5 — Registrar un cliente (Prioridad: P1) · HU-42

**Como** Administrador o Empleado, **quiero** registrar un cliente con sus datos, categoría y autorizaciones, **para** gestionar su información y seguir su actividad.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite gestionar su información y seguir su actividad.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/clientes` y en la pantalla «Clientes › Nuevo cliente», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** nombre, apellido, documento, fecha de nacimiento de un mayor de edad, teléfono, correo, categoría y la autorización de datos, **cuando** guardo, **entonces** el cliente queda activo, se genera su código QR y veo el mensaje de confirmación.
2. **Dado** una fecha de nacimiento de una persona menor de 18 años, **cuando** guardo, **entonces** el sistema rechaza el registro.
3. **Dado** un documento ya registrado o un correo inválido, **cuando** guardo, **entonces** veo el error específico del campo.

### Historia 6 — Consultar clientes (Prioridad: P1) · HU-43

**Como** Administrador o Empleado, **quiero** buscar clientes y ver su información, **para** acceder a sus datos.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite acceder a sus datos.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/clientes?q&categoria&vip&estado&page&limit`, `GET /api/v1/clientes/:id` y en la pantalla «Clientes (listado y detalle)», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el buscador, **cuando** busco por nombre, documento, id o correo, **entonces** veo los coincidentes con categoría, condición VIP y estado.
2. **Dado** un cliente, **cuando** abro su detalle, **entonces** veo sus datos, su QR, sus últimos ingresos, su saldo de puntos y su historial de actualizaciones y cambios de estado.
3. **Dado** una búsqueda sin coincidencias, **cuando** la ejecuto, **entonces** veo un mensaje.

### Historia 7 — Actualizar un cliente (Prioridad: P2) · HU-44

**Como** Administrador o Empleado, **quiero** modificar los datos de un cliente, **para** mantenerlos al día.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite mantenerlos al día.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PUT /api/v1/clientes/:id` y en la pantalla «Clientes › Editar», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un cliente, **cuando** cambio su teléfono y correo válidos y guardo, **entonces** veo el mensaje de confirmación y el cambio queda en su historial con fecha y hora.
2. **Dado** un teléfono con formato incorrecto, **cuando** guardo, **entonces** veo el error del campo.

### Historia 8 — Cambiar el estado de un cliente (Prioridad: P2) · HU-45

**Como** Administrador o Empleado, **quiero** activar o inactivar un cliente, **para** hacer seguimiento y controlar su acceso.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite hacer seguimiento y controlar su acceso.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `PATCH /api/v1/clientes/:id/estado`, `DELETE /api/v1/clientes/:id` y en la pantalla «Clientes (Cambiar estado)», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un cliente activo, **cuando** lo inactivo desde la lista desplegable y confirmo, **entonces** su QR deja de permitir el ingreso y el cambio queda con fecha y hora.

### Historia 9 — Generar el reporte de clientes (Prioridad: P3) · HU-46

**Como** Administrador o Empleado, **quiero** generar reportes de clientes con filtros, **para** obtener información estadística.

**Por qué esta prioridad (Why this priority)**: Prioridad Baja en el backlog del proyecto. Aporta valor porque permite obtener información estadística.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/reportes/clientes?estado&categoria&vip&desde&hasta&formato` y en la pantalla «Clientes › Reporte», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** filtros de estado, categoría y fecha de registro, **cuando** genero el reporte, **entonces** descargo un PDF, CSV o Excel con los clientes y los totales por categoría.

### Historia 10 — Registrarme como cliente (Prioridad: P1) · HU-47

**Como** Visitante, **quiero** crear mi cuenta de cliente, **para** tener mi código QR, reservar y acumular puntos.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite tener mi código QR, reservar y acumular puntos.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/auth/registro` y en la pantalla «Registro de cliente», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** nombre, apellido, documento, fecha de nacimiento (mayor de edad), correo, teléfono, contraseña válida y la autorización de datos, **cuando** me registro, **entonces** se crea mi cuenta de Cliente, recibo un correo de bienvenida y veo mi código QR.
2. **Dado** que marco la casilla de promociones, **cuando** me registro, **entonces** quedo suscrito; si no la marco, no recibo campañas.
3. **Dado** un documento ya registrado en la puerta sin cuenta, **cuando** me registro, **entonces** mi cuenta se vincula a esa ficha.

### Historia 11 — Actualizar mi perfil (Prioridad: P2) · HU-48

**Como** Cliente, **quiero** editar mis datos personales y ver mi código QR, **para** que estén al día.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite que estén al día.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/clientes/me`, `PUT /api/v1/clientes/me`, `GET /api/v1/clientes/me/qr` y en la pantalla «Portal del cliente › Mi perfil», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** Mi perfil, **cuando** cambio dirección, teléfono o correo válidos, **entonces** veo «Perfil actualizado».
2. **Dado** Mi perfil, **cuando** abro «Mi QR», **entonces** veo y descargo mi código para presentarlo en la puerta.
3. **Dado** que intento cambiar mi documento o fecha de nacimiento, **cuando** guardo, **entonces** el sistema no lo permite.

### Casos límite (Edge Cases)

- Cliente registrado en la puerta sin correo que luego se registra en línea con el mismo documento: se vincula la cuenta a la ficha existente.
- Cliente que cumple 18 años hoy: se admite.

## Requerimientos (Requirements) *(obligatorio)*

### Requerimientos funcionales (Functional Requirements)

- **FR-001**: El sistema DEBE registrar categorías de clientes con nombre único y descripción opcional, en estado activa, con fecha y hora de creación. *(RF-CLI-01 · HU-38)*
- **FR-002**: El sistema DEBE listar las categorías de clientes con nombre, descripción, número de clientes, estado y fecha de creación, ordenables y con búsqueda por parte del nombre. *(RF-CLI-02 · HU-39)*
- **FR-003**: El sistema DEBE actualizar nombre y descripción de la categoría validando que el nombre no esté duplicado y registrando la fecha de la última actualización. *(RF-CLI-03 · HU-40)*
- **FR-004**: El sistema DEBE cambiar el estado de la categoría entre activa e inactiva (reversible), registrando fecha y hora, e impedir asignar clientes a categorías inactivas. *(RF-CLI-04 · HU-41)*
- **FR-005**: El sistema DEBE registrar clientes con nombre, apellido, tipo y número de documento único, fecha de nacimiento, teléfono, correo, dirección, ciudad, categoría activa y autorizaciones de datos y de promociones, registrando fecha y hora. *(RF-CLI-05 · HU-42)*
- **FR-006**: El sistema DEBE rechazar el registro de personas menores de 18 años. *(RF-CLI-06 · HU-42)*
- **FR-007**: El sistema DEBE generar el código QR del cliente al registrarlo. *(RF-CLI-07 · HU-42)*
- **FR-008**: El sistema DEBE buscar clientes por nombre, documento, id o correo y mostrar su detalle con QR, últimos ingresos, saldo de puntos e historial de cambios. *(RF-CLI-08 · HU-43)*
- **FR-009**: El sistema DEBE actualizar los datos del cliente validando correo y teléfono y registrar cada cambio en su historial. *(RF-CLI-09 · HU-44)*
- **FR-010**: El sistema DEBE cambiar el estado del cliente entre activo e inactivo desde una lista, registrando fecha y hora, e impedir ingresos, reservas, pedidos y acumulación de puntos a los inactivos. *(RF-CLI-10 · HU-45)*
- **FR-011**: El sistema DEBE generar el reporte de clientes filtrable por estado, categoría, condición VIP, fecha de registro y nombre, exportable a PDF, CSV y Excel. *(RF-CLI-11 · HU-46)*
- **FR-012**: El sistema DEBE permitir el registro de clientes mayores de 18 años con sus datos, contraseña, autorización de datos y autorización opcional de promociones, enviando un correo de bienvenida. *(RF-CLI-12 · HU-47)*
- **FR-013**: El sistema DEBE vincular la cuenta nueva a la ficha de cliente existente con el mismo documento cuando no tenga usuario. *(RF-CLI-13 · HU-47)*
- **FR-014**: El sistema DEBE permitir al cliente editar dirección, teléfono, correo y preferencias, impidiendo cambiar documento y fecha de nacimiento. *(RF-CLI-14 · HU-48)*
- **FR-015**: El sistema DEBE mostrar al cliente su código QR vigente para descargarlo. *(RF-CLI-15 · HU-48)*

### Requerimientos no funcionales aplicables

Aplican todos los principios de `constitution.md` y los RNF transversales del SRS §5. En particular:

- **RNF-PRI-01**: Los formularios de registro de clientes y empleados deben mostrar el aviso de privacidad y exigir la autorización de tratamiento de datos (Ley 1581 de 2012); la autorización para recibir promociones debe ser una casilla aparte, desmarcada por defecto.
- **RNF-PRI-02**: Un Cliente solo accede a su propia información; los reportes y listados con datos de otros clientes, ventas o empleados solo están disponibles para roles internos con permiso.
- **RNF-SAF-01**: El sistema debe impedir registrar como cliente, dejar ingresar y vender a personas menores de 18 años según su fecha de nacimiento, porque la venta de alcohol a menores está prohibida (Ley 124 de 1994).

### Entidades clave (Key Entities)

- **CategoriaCliente**: Clasificación comercial. Atributos: id_categoria, nombre, descripcion, estado, created_at, updated_at.
- **Cliente**: Cliente de la discoteca. Atributos: id_cliente, id_usuario, nombre, apellido, tipo_documento, numero_documento, fecha_nacimiento, correo, telefono, direccion, ciudad, genero, id_categoria, es_vip, acepta_datos, acepta_promociones, estado, created_at.
- **HistorialCliente**: Cambios. Atributos: id_historial, id_cliente, accion, detalle, id_usuario, fecha.

## Criterios de éxito (Success Criteria) *(obligatorio)*

### Resultados medibles (Measurable Outcomes)

- **SC-001**: El 0 % de los clientes registrados es menor de 18 años.
- **SC-002**: Un empleado registra un cliente en menos de 60 segundos.

## Supuestos (Assumptions)

- Se implementa después de (o junto con) las specs: 002-gestion-usuarios.
- La autenticación JWT y la autorización por permisos están disponibles (spec de acceso); mientras no lo estén, los endpoints se prueban con un usuario semilla.

## Insumos para `/speckit.plan` (no normativo)

Detalle orientativo para el plan técnico. No reemplaza las decisiones del plan, pero cualquier desviación debe quedar justificada en `plan.md`.

**API REST sugerida** (base `/api/v1`, sobre `{ ok, data, meta, error }`):

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/categorias-clientes` | Registrar una categoría de clientes | HU-38 |
| GET | `/api/v1/categorias-clientes?q&sort&page&limit` | Consultar las categorías de clientes | HU-39 |
| GET | `/api/v1/categorias-clientes/:id` | Consultar detalle (categorias-clientes) | HU-39 |
| PUT | `/api/v1/categorias-clientes/:id` | Actualizar una categoría de clientes | HU-40 |
| PATCH | `/api/v1/categorias-clientes/:id/estado` | Cambiar el estado de una categoría de clientes | HU-41 |
| DELETE | `/api/v1/categorias-clientes/:id` | (inactivación lógica) | HU-41 |
| POST | `/api/v1/clientes` | Registrar un cliente | HU-42 |
| GET | `/api/v1/clientes?q&categoria&vip&estado&page&limit` | Consultar clientes | HU-43 |
| GET | `/api/v1/clientes/:id` | Consultar detalle (clientes) | HU-43 |
| PUT | `/api/v1/clientes/:id` | Actualizar un cliente | HU-44 |
| PATCH | `/api/v1/clientes/:id/estado` | Cambiar el estado de un cliente | HU-45 |
| DELETE | `/api/v1/clientes/:id` | (inactivación lógica) | HU-45 |
| GET | `/api/v1/reportes/clientes?estado&categoria&vip&desde&hasta&formato` | Generar el reporte de clientes | HU-46 |
| POST | `/api/v1/auth/registro` | Registrarme como cliente | HU-47 |
| GET | `/api/v1/clientes/me` | Actualizar mi perfil | HU-48 |
| PUT | `/api/v1/clientes/me` | Actualizar (me) | HU-48 |
| GET | `/api/v1/clientes/me/qr` | Listar o consultar qr | HU-48 |

**Pantallas (frontend vanilla):**

- Clientes › Categorías › Nueva categoría — HU-38
- Clientes › Categorías — HU-39
- Clientes › Categorías › Editar — HU-40
- Clientes › Categorías (Cambiar estado) — HU-41
- Clientes › Nuevo cliente — HU-42
- Clientes (listado y detalle) — HU-43
- Clientes › Editar — HU-44
- Clientes (Cambiar estado) — HU-45
- Clientes › Reporte — HU-46
- Registro de cliente — HU-47
- Portal del cliente › Mi perfil — HU-48

**Modelo de datos (lógico):**

*CategoriaCliente*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_categoria | INT | PK |
| nombre | VARCHAR(50) | único |
| descripcion | VARCHAR(200) |  |
| estado | ENUM('activa','inactiva') |  |
| created_at | DATETIME |  |
| updated_at | DATETIME |  |

*Cliente*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_cliente | INT | PK |
| id_usuario | INT | FK, opcional |
| nombre | VARCHAR(60) |  |
| apellido | VARCHAR(60) |  |
| tipo_documento | ENUM('CC','CE','PAS','PPT') |  |
| numero_documento | VARCHAR(15) | único |
| fecha_nacimiento | DATE | edad ≥ 18 |
| correo | VARCHAR(100) | único si existe |
| telefono | VARCHAR(10) |  |
| direccion | VARCHAR(120) |  |
| ciudad | VARCHAR(60) |  |
| genero | VARCHAR(20) | opcional |
| id_categoria | INT | FK, activa |
| es_vip | BOOLEAN |  |
| acepta_datos | BOOLEAN | obligatorio |
| acepta_promociones | BOOLEAN | por defecto falso |
| estado | ENUM('activo','inactivo') |  |
| created_at | DATETIME |  |

*HistorialCliente*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_historial | INT | PK |
| id_cliente | INT | FK |
| accion | VARCHAR(40) |  |
| detalle | VARCHAR(300) |  |
| id_usuario | INT | FK |
| fecha | DATETIME |  |

**Reglas de negocio:**

- **RN-02**: Toda persona registrada como cliente debe ser mayor de 18 años en la fecha de registro.
- **RN-12**: Solo se registran clientes mayores de 18 años con autorización de tratamiento de datos; a una categoría inactiva no se asignan clientes.
- **RN-13**: Un cliente inactivo no puede ingresar, reservar, hacer pedidos ni acumular puntos.

**Validaciones de campos por historia:**

- HU-42: nombre y apellido (2–60); numero_documento (5–15, único); fecha_nacimiento (edad ≥ 18); telefono (10 dígitos); correo (válido); id_categoria (activa); acepta_datos (obligatorio)

## Trazabilidad

| Historia spec | HU | RF | Excel |
|---|---|---|---|
| 1 | HU-38 | RF-CLI-01 | HU_163, HU_167 |
| 2 | HU-39 | RF-CLI-02 | HU_164, HU_168 |
| 3 | HU-40 | RF-CLI-03 | HU_165, HU_169 |
| 4 | HU-41 | RF-CLI-04 | HU_166, HU_170 |
| 5 | HU-42 | RF-CLI-05, RF-CLI-06, RF-CLI-07 | HU_171, HU_176 |
| 6 | HU-43 | RF-CLI-08 | HU_172, HU_177 |
| 7 | HU-44 | RF-CLI-09 | HU_173, HU_178 |
| 8 | HU-45 | RF-CLI-10 | HU_174, HU_179 |
| 9 | HU-46 | RF-CLI-11 | HU_175, HU_180 |
| 10 | HU-47 | RF-CLI-12, RF-CLI-13 | HU_181 |
| 11 | HU-48 | RF-CLI-14, RF-CLI-15 | HU_182 |

