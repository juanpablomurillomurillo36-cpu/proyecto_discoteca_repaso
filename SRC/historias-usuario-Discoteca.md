# Historias de Usuario — Sistema de Gestión Integral para Discoteca (Discoteca (Envigado))

> **Versión 2.0 — 2026-11-21.** Reemplaza la v1.0 (archivada en `v1.0/`). Cubre el total del proyecto: todas las historias de la matriz Excel (`Matriz Historias de Usuario/MHU_Proyecto_Discoteca.xlsx`), depuradas y redactadas con criterios Given-When-Then, más las historias inferidas de la ficha del proyecto para los procesos que la matriz no cubría. Cada historia referencia los requerimientos funcionales (`RF-`) de `SRS-Discoteca-v2.0.md` y la spec de GitHub spec-kit (`specs/NNN-modulo/spec.md`) donde se implementa.

## Resumen

**145 historias** (135 de la matriz Excel, 10 inferidas de la ficha) · **345 puntos** de estimación relativa · **20 módulos** (una spec por módulo).

| # | Épica / módulo | Spec | HU | Alta | Media | Baja | Puntos |
|---|---|---|---|---|---|---|---|
| 1 | Roles y permisos | `001-roles-permisos` | HU-01 – HU-09 (9) | 4 | 4 | 1 | 19 |
| 2 | Gestión de usuarios | `002-gestion-usuarios` | HU-10 – HU-14 (5) | 3 | 1 | 1 | 12 |
| 3 | Gestión de acceso | `003-gestion-acceso` | HU-15 – HU-19 (5) | 4 | 0 | 1 | 10 |
| 4 | Proveedores | `004-proveedores` | HU-20 – HU-24 (5) | 2 | 2 | 1 | 11 |
| 5 | Productos y existencias | `005-productos-existencias` | HU-25 – HU-32 (8) | 6 | 2 | 0 | 19 |
| 6 | Compras | `006-compras` | HU-33 – HU-37 (5) | 3 | 2 | 0 | 15 |
| 7 | Clientes y categorías de clientes | `007-clientes` | HU-38 – HU-48 (11) | 3 | 7 | 1 | 21 |
| 8 | Clientes VIP | `008-clientes-vip` | HU-49 – HU-54 (6) | 1 | 4 | 1 | 13 |
| 9 | Control de entradas | `009-control-entradas` | HU-55 – HU-61 (7) | 5 | 2 | 0 | 21 |
| 10 | Servicios | `010-servicios` | HU-62 – HU-66 (5) | 2 | 3 | 0 | 8 |
| 11 | Empleados y categorías de empleados | `011-empleados` | HU-67 – HU-75 (9) | 2 | 3 | 4 | 15 |
| 12 | Agenda de empleados | `012-agenda-empleados` | HU-76 – HU-80 (5) | 2 | 3 | 0 | 13 |
| 13 | Reservas | `013-reservas` | HU-81 – HU-88 (8) | 5 | 2 | 1 | 21 |
| 14 | Eventos y fichas técnicas | `014-eventos` | HU-89 – HU-98 (10) | 7 | 3 | 0 | 26 |
| 15 | Agenda de eventos | `015-agenda-eventos` | HU-99 – HU-110 (12) | 2 | 9 | 1 | 26 |
| 16 | Pedidos | `016-pedidos` | HU-111 – HU-119 (9) | 4 | 4 | 1 | 22 |
| 17 | Ventas | `017-ventas` | HU-120 – HU-125 (6) | 5 | 1 | 0 | 19 |
| 18 | Notificaciones | `018-notificaciones` | HU-126 – HU-132 (7) | 0 | 6 | 1 | 20 |
| 19 | Programa de puntos | `019-programa-puntos` | HU-133 – HU-139 (7) | 2 | 4 | 1 | 18 |
| 20 | Medición y desempeño | `020-desempeno` | HU-140 – HU-145 (6) | 1 | 5 | 0 | 16 |

## Convenciones

- **HU-NN**: identificador estable de la historia en la v2.0. La columna *Excel* indica el código original de la matriz (`HU_xx`, `HU-UM-001`, etc.) y cuántos criterios (CA) traía; *Inferida* significa que la historia no estaba en la matriz y se dedujo de la ficha del proyecto.
- **Origen**: *Matriz Excel* (redactada de nuevo a partir de sus criterios), *Excel + completada* (se agregaron criterios o caminos de error que faltaban) o *Inferida* (nueva).
- **Prioridad** Alta / Media / Baja = P1 / P2 / P3 en las specs. **Estimación** en puntos de historia (Fibonacci 1-2-3-5-8), relativa dentro del proyecto.
- **Criterios de aceptación** en formato Dado / cuando / entonces; cada criterio es una prueba. Toda historia incluye al menos un camino de error.
- **API** y **Interfaz** son la ruta REST y la pantalla sugeridas para implementar la historia (insumo para `/speckit.plan`); el contrato definitivo lo fija el plan de cada spec.

### Definición de Terminado (común a todas las historias)

- Los escenarios de aceptación de la HU pasan como pruebas (colección Postman/Newman o pruebas automatizadas de API) y en la pantalla correspondiente.
- El endpoint valida la entrada en el servidor y responde con el sobre JSON `{ ok, data, meta, error }` y el código HTTP correcto (200/201/204/400/401/403/404/409/422).
- La pantalla valida en línea, muestra mensajes de error junto al campo, funciona de 360 a 1920 px y es operable con teclado.
- Las reglas de negocio (RN) asociadas se aplican en la capa de servicios del backend, no solo en el frontend.
- El commit/PR referencia la HU y los FR/RF que implementa (p. ej. `feat(roles): crear rol [HU-01][RF-ROL-01]`).
- Ningún secreto queda en el repositorio; los datos personales se tratan según Ley 1581 de 2012.

## Épica 1: Roles y permisos

> Proceso: Configuración · Spec: `specs/001-roles-permisos/spec.md` · SRS §4.1 · Actores: Administrador

Administra los roles (Administrador, Empleado, Cliente y los que se creen, p. ej. Mesero, Personal de ingreso) y sus permisos, con auditoría de cambios.

### HU-01 — Registrar un rol

**Como** Administrador  
**quiero** registrar un rol con nombre único y sus permisos  
**para** controlar el acceso a las funcionalidades

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel | HU_01 (6 CA) | RF-ROL-01 |

**Criterios de aceptación**

1. **Dado** el nombre «Mesero», una descripción y los permisos pedidos.crear y pedidos.ver, **cuando** guardo, **entonces** el rol queda activo con fecha y hora de creación y veo «Rol registrado correctamente».
2. **Dado** un nombre ya existente (sin importar mayúsculas), **cuando** guardo, **entonces** el sistema responde «Ya existe un rol con ese nombre» (409).
3. **Dado** que no selecciono ningún permiso, **cuando** guardo, **entonces** el sistema lo impide indicando que el rol necesita al menos un permiso.

- **Datos:** nombre (3–40, único); descripcion (≤150); permisos (≥1, sin repetidos)
- **Interfaz:** Configuración › Roles › Nuevo rol
- **API:** `POST /api/v1/roles`

### HU-02 — Consultar un rol

**Como** Administrador  
**quiero** buscar un rol por su nombre y ver su información  
**para** revisar los roles configurados

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 1 pts | Matriz Excel | HU_02 (5 CA) | RF-ROL-02 |

**Criterios de aceptación**

1. **Dado** el buscador, **cuando** escribo «mese» o «MESE», **entonces** veo el rol Mesero con su descripción, estado, fechas y permisos.
2. **Dado** un nombre inexistente, **cuando** busco, **entonces** veo «No se encontró el rol».

- **Interfaz:** Configuración › Roles › Detalle
- **API:** `GET /api/v1/roles?q`; `GET /api/v1/roles/:id`

### HU-03 — Actualizar un rol

**Como** Administrador  
**quiero** modificar el nombre y los permisos de un rol  
**para** ajustar el acceso de quienes lo tienen

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel | HU_03 (6 CA) | RF-ROL-03, RF-ROL-04 |

**Criterios de aceptación**

1. **Dado** el rol Mesero, **cuando** agrego el permiso ventas.crear y guardo, **entonces** sus usuarios obtienen ese acceso en su siguiente petición y veo «Rol actualizado correctamente».
2. **Dado** que cambio el nombre por uno que ya existe, **cuando** guardo, **entonces** el sistema responde 409.

- **Interfaz:** Configuración › Roles › Editar
- **API:** `PUT /api/v1/roles/:id`

### HU-04 — Cambiar el estado de un rol

**Como** Administrador  
**quiero** activar o inactivar un rol  
**para** habilitar o deshabilitar el acceso de quienes lo tienen

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 2 pts | Matriz Excel | HU_04 (5 CA) | RF-ROL-05, RF-ROL-06 |

**Criterios de aceptación**

1. **Dado** un rol activo sin usuarios activos, **cuando** lo inactivo y confirmo, **entonces** su etiqueta cambia a Inactivo y veo el mensaje de confirmación.
2. **Dado** un rol base o con usuarios activos, **cuando** intento inactivarlo, **entonces** el sistema lo impide indicando la causa (409).

- **Interfaz:** Configuración › Roles (interruptor de estado)
- **API:** `PATCH /api/v1/roles/:id/estado`

### HU-05 — Listar roles

**Como** Administrador  
**quiero** ver todos los roles con su estado  
**para** tener una visión general de la configuración

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 1 pts | Matriz Excel | HU_05 (5 CA) | RF-ROL-07 |

**Criterios de aceptación**

1. **Dado** roles registrados, **cuando** abro Roles, **entonces** veo nombre, número de permisos, número de usuarios y estado, paginados de 10 en 10 y ordenables por nombre y estado.

- **Interfaz:** Configuración › Roles (listado)
- **API:** `GET /api/v1/roles?page&limit&sort`

### HU-06 — Registrar un permiso

**Como** Administrador  
**quiero** registrar un permiso con nombre único y descripción  
**para** controlar con detalle las funcionalidades

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel | HU_06 (6 CA) | RF-ROL-08, RF-ROL-09 |

**Criterios de aceptación**

1. **Dado** el nombre «puntos.canjear» y su descripción, **cuando** guardo, **entonces** el permiso queda activo con fecha y hora de creación y veo el mensaje de confirmación.
2. **Dado** un nombre ya registrado, **cuando** guardo, **entonces** el sistema responde 409.

- **Interfaz:** Configuración › Permisos
- **API:** `POST /api/v1/permisos`; `GET /api/v1/permisos?modulo&q`

### HU-07 — Consultar los permisos de cada rol

**Como** Administrador  
**quiero** ver los permisos de cada rol organizados por módulo  
**para** controlar la seguridad del aplicativo

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel | HU_07 (4 CA) | RF-ROL-10 |

**Criterios de aceptación**

1. **Dado** un rol, **cuando** abro su matriz de permisos, **entonces** veo todos los permisos agrupados por módulo con una casilla marcada en los que tiene.
2. **Dado** la matriz, **cuando** marco o desmarco permisos y guardo, **entonces** la asignación se actualiza (ver HU-09).

- **Interfaz:** Configuración › Roles › Permisos (matriz)
- **API:** `GET /api/v1/roles/:id/permisos`

### HU-08 — Cambiar el estado de un permiso

**Como** Administrador  
**quiero** activar o inactivar un permiso  
**para** retirar funcionalidades que ya no se usan

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Baja | 2 pts | Matriz Excel | HU_08 (4 CA) | RF-ROL-11, RF-ROL-12 |

**Criterios de aceptación**

1. **Dado** un permiso sin roles asociados, **cuando** lo inactivo, **entonces** deja de ofrecerse en la matriz y se notifica por correo a los demás administradores.
2. **Dado** un permiso asociado a un rol, **cuando** intento inactivarlo, **entonces** el sistema lo impide (409).

- **Interfaz:** Configuración › Permisos (Cambiar estado)
- **API:** `PATCH /api/v1/permisos/:id/estado`

### HU-09 — Asociar permisos a un rol

**Como** Administrador  
**quiero** seleccionar los permisos específicos de cada rol  
**para** que cada usuario acceda solo a lo que necesita

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel | HU_09 (8 CA) | RF-ROL-13, RF-ROL-14 |

**Criterios de aceptación**

1. **Dado** el rol Personal de ingreso, **cuando** le asocio ingresos.registrar e ingresos.ver y guardo, **entonces** la asignación persiste y queda auditada con quién, cuándo y qué cambió.
2. **Dado** que intento dejar el rol sin permisos, **cuando** guardo, **entonces** veo un mensaje de error.
3. **Dado** un permiso ya asociado, **cuando** intento asociarlo de nuevo, **entonces** el sistema no lo duplica.

- **Interfaz:** Configuración › Roles › Permisos (Guardar)
- **API:** `PUT /api/v1/roles/:id/permisos`

## Épica 2: Gestión de usuarios

> Proceso: Usuarios · Spec: `specs/002-gestion-usuarios/spec.md` · SRS §4.2 · Actores: Administrador

Administra las cuentas de acceso del personal y de los clientes registrados.

### HU-10 — Registrar un usuario

**Como** Administrador  
**quiero** registrar un usuario con nombre de usuario, correo, contraseña, rol y estado  
**para** controlar su acceso al sistema

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel (primera fila HU_10) | HU_10 (10 CA) | RF-USR-01 |

**Criterios de aceptación**

1. **Dado** datos válidos y una contraseña que cumple la política, **cuando** guardo, **entonces** el usuario queda registrado y veo el mensaje de confirmación.
2. **Dado** un nombre de usuario o correo ya registrado, **cuando** guardo, **entonces** el sistema responde 409 indicando el campo.
3. **Dado** una contraseña sin carácter especial, **cuando** guardo, **entonces** el sistema indica la política incumplida (422).

- **Datos:** nombre_usuario (4–30, letras, números, punto y guion bajo, único); correo (válido, único); contraseña (≥8, mayúscula, minúscula, número y carácter especial); id_rol (activo); estado
- **Interfaz:** Configuración › Usuarios › Nuevo usuario
- **API:** `POST /api/v1/usuarios`

### HU-11 — Consultar usuarios

**Como** Administrador  
**quiero** buscar usuarios y ver su información  
**para** verificar sus datos

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 2 pts | Matriz Excel (segunda fila con código HU_10) | HU_10 (10 CA) | RF-USR-02 |

**Criterios de aceptación**

1. **Dado** el buscador, **cuando** busco por nombre de usuario, correo o id, **entonces** veo los coincidentes paginados.
2. **Dado** un usuario, **cuando** abro su detalle, **entonces** veo nombre de usuario, nombre, correo, rol, estado, fecha de registro y última actualización, sin la contraseña.

- **Interfaz:** Configuración › Usuarios (listado y detalle)
- **API:** `GET /api/v1/usuarios?q&page&limit&rol&estado`; `GET /api/v1/usuarios/:id`

### HU-12 — Actualizar un usuario

**Como** Administrador  
**quiero** modificar la información de un usuario  
**para** mantenerla precisa

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel | HU_11 (4 CA) | RF-USR-03 |

**Criterios de aceptación**

1. **Dado** un usuario, **cuando** cambio su correo y rol y guardo, **entonces** veo «Usuario actualizado correctamente» y queda la fecha y hora de la actualización.
2. **Dado** el campo nombre de usuario, **cuando** edito, **entonces** no es modificable.

- **Interfaz:** Configuración › Usuarios › Editar
- **API:** `PUT /api/v1/usuarios/:id`

### HU-13 — Cambiar el estado de usuarios

**Como** Administrador  
**quiero** activar o inactivar uno o varios usuarios a la vez  
**para** controlar quién accede

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel | HU_12 (5 CA) | RF-USR-04, RF-USR-05 |

**Criterios de aceptación**

1. **Dado** un usuario activo, **cuando** lo inactivo, **entonces** no puede iniciar sesión y el cambio queda en su historial.
2. **Dado** que selecciono cinco usuarios, **cuando** aplico «Inactivar» y confirmo, **entonces** los cinco cambian de estado y veo el resultado por usuario.

- **Interfaz:** Configuración › Usuarios (Cambiar estado, selección múltiple)
- **API:** `PATCH /api/v1/usuarios/:id/estado`; `PATCH /api/v1/usuarios/estado (masivo)`

### HU-14 — Generar el reporte de usuarios

**Como** Administrador  
**quiero** generar un reporte de usuarios por fecha, rol y estado  
**para** conocer cuántos usuarios hay y sus roles

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Baja | 2 pts | Matriz Excel | HU_13 (5 CA) | RF-USR-06 |

**Criterios de aceptación**

1. **Dado** filtros de rol y estado, **cuando** genero el reporte, **entonces** descargo un PDF o CSV con nombre de usuario, correo, rol, fecha de creación y estado, y los totales por rol.

- **Interfaz:** Configuración › Usuarios › Reporte
- **API:** `GET /api/v1/reportes/usuarios?desde&hasta&rol&estado&formato`

## Épica 3: Gestión de acceso

> Proceso: Usuarios · Spec: `specs/003-gestion-acceso/spec.md` · SRS §4.3 · Actores: Administrador, Empleado, Cliente

Controla el ingreso al sistema de administradores, empleados y clientes y la recuperación de contraseña.

### HU-15 — Iniciar sesión

**Como** Administrador, Empleado o Cliente  
**quiero** iniciar sesión con mi usuario o correo y contraseña  
**para** acceder a las funciones de mi rol

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel (HU_14 administrador, HU_17 empleado y HU_20 cliente) | HU_14 (6 CA), HU_17 (7 CA), HU_20 (6 CA) | RF-ACC-01, RF-ACC-02, RF-ACC-03, RF-ACC-04 |

**Criterios de aceptación**

1. **Dado** credenciales correctas de un usuario activo, **cuando** ingreso, **entonces** el sistema me lleva a la pantalla de mi rol (tablero, ingreso o portal del cliente).
2. **Dado** credenciales incorrectas, **cuando** ingreso, **entonces** veo «Usuario o contraseña incorrectos» sin indicar cuál falló.
3. **Dado** tres intentos fallidos consecutivos, **cuando** intento de nuevo, **entonces** veo que la cuenta está bloqueada por 15 minutos.
4. **Dado** que marco «Recordar mi usuario», **cuando** vuelvo a la página, **entonces** el usuario aparece diligenciado (nunca la contraseña) y puedo desmarcarlo.

- **Interfaz:** Inicio de sesión
- **API:** `POST /api/v1/auth/login`

### HU-16 — Recuperar la contraseña

**Como** Usuario registrado  
**quiero** solicitar un enlace para recuperar mi contraseña con mi correo o usuario  
**para** retomar el acceso si la olvido

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 2 pts | Matriz Excel (HU_15, HU_18 y HU_21) | HU_15 (7 CA), HU_18 (6 CA), HU_21 (8 CA) | RF-ACC-05 |

**Criterios de aceptación**

1. **Dado** un correo registrado, **cuando** lo envío en «Olvidé mi contraseña», **entonces** recibo un enlace de un solo uso que vence en 30 minutos.
2. **Dado** un correo con formato inválido, **cuando** lo envío, **entonces** el sistema lo señala.
3. **Dado** un correo no registrado, **cuando** lo envío, **entonces** veo el mismo mensaje genérico que para uno registrado.

- **Interfaz:** Recuperar contraseña
- **API:** `POST /api/v1/auth/recuperar`

### HU-17 — Restablecer la contraseña

**Como** Usuario registrado  
**quiero** crear una nueva contraseña desde el enlace recibido  
**para** volver a ingresar

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 2 pts | Inferida (criterios de nueva contraseña de HU_18 y HU_21) | Inferida de la ficha del proyecto | RF-ACC-06, RF-ACC-07 |

**Criterios de aceptación**

1. **Dado** un enlace vigente, **cuando** ingreso una contraseña que cumple la política y su confirmación, **entonces** veo «Contraseña actualizada» y se me notifica por correo el cambio.
2. **Dado** un enlace vencido o usado, **cuando** lo abro, **entonces** veo «El enlace expiró o ya fue usado».

- **Interfaz:** Restablecer contraseña
- **API:** `POST /api/v1/auth/restablecer`

### HU-18 — Cerrar sesión

**Como** Usuario autenticado  
**quiero** cerrar mi sesión de forma segura  
**para** proteger mi cuenta

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 1 pts | Matriz Excel (HU_16, HU_19 y HU_22) | HU_16 (4 CA), HU_19 (4 CA), HU_22 (5 CA) | RF-ACC-08 |

**Criterios de aceptación**

1. **Dado** una sesión activa, **cuando** pulso «Cerrar sesión», **entonces** el token se invalida en el servidor y vuelvo a la página de inicio de sesión.
2. **Dado** que cerré sesión, **cuando** intento abrir una pantalla interna, **entonces** el sistema me redirige al inicio de sesión.

- **Interfaz:** Menú de usuario › Cerrar sesión
- **API:** `POST /api/v1/auth/logout`

### HU-19 — Consultar la bitácora de accesos

**Como** Administrador  
**quiero** consultar los intentos de inicio de sesión  
**para** detectar accesos sospechosos

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Baja | 2 pts | Inferida (HU_14 — se registrará el intento de inicio de sesión) | Inferida de la ficha del proyecto | RF-ACC-09 |

**Criterios de aceptación**

1. **Dado** un rango de fechas, **cuando** abro la bitácora de accesos, **entonces** veo fecha, hora, usuario, resultado y dispositivo, filtrables por usuario y resultado.

- **Interfaz:** Configuración › Bitácora de accesos
- **API:** `GET /api/v1/auth/accesos?desde&hasta&usuario&exitoso`

## Épica 4: Proveedores

> Proceso: Compras · Spec: `specs/004-proveedores/spec.md` · SRS §4.4 · Actores: Administrador, Empleado

Centraliza la información de los proveedores de bebidas, insumos y servicios, con sus documentos e historial de cambios.

### HU-20 — Registrar un proveedor

**Como** Administrador o Empleado  
**quiero** registrar un proveedor con su documento, contacto y documentos de soporte  
**para** tener su información en un solo lugar

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel (HU_33 y HU_38; la «copia de RFC» se reemplaza por el RUT colombiano) | HU_33 (6 CA), HU_38 (6 CA) | RF-PRV-01, RF-PRV-02 |

**Criterios de aceptación**

1. **Dado** NIT, razón social, dirección, contacto, teléfono y correo válidos, **cuando** guardo, **entonces** el proveedor queda activo con un id único y veo el mensaje de confirmación.
2. **Dado** que adjunto el RUT en PDF, **cuando** guardo, **entonces** el documento queda asociado al proveedor.
3. **Dado** un documento ya registrado o un correo con formato inválido, **cuando** guardo, **entonces** el sistema lo señala (409/422).

- **Datos:** numero_documento (5–15, único); razon_social (3–100); telefono (10 dígitos); correo (válido); documentos (≤5 MB c/u)
- **Interfaz:** Compras › Proveedores › Nuevo proveedor
- **API:** `POST /api/v1/proveedores`; `POST /api/v1/proveedores/:id/documentos`

### HU-21 — Consultar proveedores

**Como** Administrador o Empleado  
**quiero** buscar proveedores y ver su información completa  
**para** acceder rápido a sus datos

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 2 pts | Matriz Excel (HU_34 y HU_39) | HU_34 (4 CA), HU_39 (5 CA) | RF-PRV-03 |

**Criterios de aceptación**

1. **Dado** el buscador, **cuando** escribo parte del nombre o el id, **entonces** veo los coincidentes, filtrables por estado y tipo de producto.
2. **Dado** un proveedor, **cuando** abro su detalle, **entonces** veo sus datos, sus documentos adjuntos y su historial de actualizaciones.

- **Interfaz:** Compras › Proveedores (listado y detalle)
- **API:** `GET /api/v1/proveedores?q&estado&tipo&page&limit`; `GET /api/v1/proveedores/:id`

### HU-22 — Actualizar un proveedor

**Como** Administrador o Empleado  
**quiero** modificar la información de un proveedor  
**para** mantenerla precisa

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_35 y HU_40) | HU_35 (5 CA), HU_40 (5 CA) | RF-PRV-04 |

**Criterios de aceptación**

1. **Dado** un proveedor, **cuando** cambio su teléfono y guardo, **entonces** se actualiza, queda en el historial con fecha, hora y usuario y veo el mensaje de confirmación.

- **Interfaz:** Compras › Proveedores › Editar
- **API:** `PUT /api/v1/proveedores/:id`

### HU-23 — Cambiar el estado de un proveedor

**Como** Administrador o Empleado  
**quiero** cambiar el estado de un proveedor con una nota que lo justifique  
**para** gestionar su ciclo de vida

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_36 y HU_41) | HU_36 (5 CA), HU_41 (5 CA) | RF-PRV-05, RF-PRV-06 |

**Criterios de aceptación**

1. **Dado** un proveedor activo, **cuando** lo paso a suspendido con la nota «Entregas incompletas», **entonces** el cambio queda registrado con fecha, hora y usuario y el estado se muestra en todas las vistas.
2. **Dado** un proveedor suspendido o inactivo, **cuando** registro una compra, **entonces** no aparece en la lista de proveedores.

- **Interfaz:** Compras › Proveedores (Cambiar estado)
- **API:** `PATCH /api/v1/proveedores/:id/estado`

### HU-24 — Generar el reporte de proveedores

**Como** Administrador o Empleado  
**quiero** generar reportes de proveedores con filtros  
**para** analizar la información

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Baja | 2 pts | Matriz Excel (HU_37 y HU_42) | HU_37 (5 CA), HU_42 (5 CA) | RF-PRV-07 |

**Criterios de aceptación**

1. **Dado** filtros de estado y fecha de registro, **cuando** genero el reporte, **entonces** descargo un PDF o CSV con nombre, documento, contacto, fecha de registro y estado.

- **Interfaz:** Compras › Proveedores › Reporte
- **API:** `GET /api/v1/reportes/proveedores?estado&desde&hasta&formato`

## Épica 5: Productos y existencias

> Proceso: Compras · Spec: `specs/005-productos-existencias/spec.md` · SRS §4.5 · Actores: Administrador, Empleado

Controla los productos del bar y sus existencias con límites mínimo y máximo, movimientos auditados y alertas por correo cuando un producto llega al mínimo.

### HU-25 — Registrar un producto

**Como** Administrador  
**quiero** registrar un producto del bar con código, tipo, precio y límites de stock  
**para** poder controlar sus existencias y venderlo

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Inferida (ficha §Alcance control de existencias; HU_43 supone que el producto ya existe) | Inferida de la ficha del proyecto | RF-PRD-01 |

**Criterios de aceptación**

1. **Dado** código, nombre «Aguardiente 750 ml», tipo licor, precio $ 120.000, stock mínimo 6 y máximo 48, **cuando** guardo, **entonces** el producto queda activo con existencia 0.
2. **Dado** un código repetido o un mínimo mayor o igual al máximo, **cuando** guardo, **entonces** el sistema lo señala (409/422).

- **Datos:** codigo (≤20, único); nombre (3–100); tipo; precio_venta (> 0); stock_minimo (≥ 0) < stock_maximo
- **Interfaz:** Existencias › Productos › Nuevo producto
- **API:** `POST /api/v1/productos`; `PUT /api/v1/productos/:id`

### HU-26 — Registrar las existencias iniciales

**Como** Administrador o Empleado  
**quiero** registrar la cantidad inicial en stock de cada producto  
**para** tener un inventario base preciso

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 2 pts | Matriz Excel (HU_43 y HU_49) | HU_43 (6 CA), HU_49 (5 CA) | RF-PRD-02 |

**Criterios de aceptación**

1. **Dado** un producto existente, **cuando** registro una cantidad inicial de 24 y la fecha, **entonces** la existencia queda en 24 con un movimiento «inicial» y veo el mensaje de confirmación.
2. **Dado** un id de producto que no existe o una cantidad negativa o decimal, **cuando** guardo, **entonces** el sistema lo señala.
3. **Dado** un producto que ya tiene existencias iniciales, **cuando** intento registrarlas de nuevo, **entonces** el sistema me remite a Ajustar existencias.

- **Interfaz:** Existencias › Productos › Existencia inicial
- **API:** `POST /api/v1/productos/:id/existencia-inicial`

### HU-27 — Consultar existencias

**Como** Administrador o Empleado  
**quiero** consultar la cantidad disponible de los productos en tiempo real  
**para** atender la demanda y verificar disponibilidad

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 2 pts | Matriz Excel (HU_44 y HU_50) | HU_44 (6 CA), HU_50 (6 CA) | RF-PRD-03 |

**Criterios de aceptación**

1. **Dado** el buscador, **cuando** busco por id o nombre, **entonces** veo existencia actual, mínimo, máximo y estado, con un indicador de color (rojo en o bajo el mínimo, amarillo cerca del mínimo, verde normal).
2. **Dado** la lista, **cuando** filtro por tipo y ordeno por existencia, **entonces** el resultado se ajusta.

- **Interfaz:** Existencias (listado)
- **API:** `GET /api/v1/productos?q&tipo&estado&nivel&sort&page&limit`; `GET /api/v1/productos/:id`

### HU-28 — Ajustar existencias

**Como** Administrador o Empleado  
**quiero** aumentar o disminuir la existencia de un producto por una entrada o salida con su motivo  
**para** mantener el inventario preciso

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel (HU_45 y HU_51) | HU_45 (6 CA), HU_51 (6 CA) | RF-PRD-04, RF-PRD-05 |

**Criterios de aceptación**

1. **Dado** un producto con 10 unidades, **cuando** registro una salida de 2 por «Rotura», **entonces** la existencia queda en 8 y se registra el movimiento con fecha, hora y usuario.
2. **Dado** un ajuste que dejaría la existencia negativa o por encima del máximo, **cuando** guardo, **entonces** el sistema lo impide.
3. **Dado** un producto, **cuando** abro su kardex, **entonces** veo todos sus movimientos auditados.

- **Interfaz:** Existencias › Ajustar; Existencias › Kardex
- **API:** `POST /api/v1/productos/:id/ajustes`; `GET /api/v1/productos/:id/movimientos`

### HU-29 — Definir stock mínimo y máximo

**Como** Administrador o Empleado  
**quiero** definir el stock mínimo y máximo de cada producto  
**para** evitar faltantes y excesos

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 2 pts | Matriz Excel (HU_46 y HU_53) | HU_46 (4 CA), HU_53 (5 CA) | RF-PRD-06 |

**Criterios de aceptación**

1. **Dado** un producto, **cuando** defino mínimo 6 y máximo 48, **entonces** se guardan y se muestran en su ficha.
2. **Dado** un mínimo mayor o igual al máximo, **cuando** guardo, **entonces** veo un mensaje de error.

- **Interfaz:** Existencias › Productos › Límites de stock
- **API:** `PATCH /api/v1/productos/:id/limites`

### HU-30 — Cambiar el estado de un producto

**Como** Empleado o Administrador  
**quiero** cambiar el estado de un producto  
**para** controlar los productos del almacén

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel | HU_52 (5 CA) | RF-PRD-07, RF-PRD-08 |

**Criterios de aceptación**

1. **Dado** un producto activo, **cuando** lo paso a inactivo y confirmo, **entonces** deja de ofrecerse en pedidos y ventas y el cambio queda registrado con fecha, hora y usuario.
2. **Dado** un producto cuya existencia llega a 0, **cuando** se registra la venta, **entonces** su estado pasa a agotado automáticamente.

- **Interfaz:** Existencias (Cambiar estado)
- **API:** `PATCH /api/v1/productos/:id/estado`

### HU-31 — Generar el reporte de inventario

**Como** Administrador o Empleado  
**quiero** generar reportes del estado y movimiento del inventario  
**para** analizar el stock

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_47 y HU_54) | HU_47 (5 CA), HU_54 (5 CA) | RF-PRD-09 |

**Criterios de aceptación**

1. **Dado** un rango de fechas y un tipo de producto, **cuando** genero el reporte, **entonces** descargo un PDF o CSV con existencia, mínimo, máximo, estado, entradas y salidas del periodo y la fecha y hora de generación.

- **Interfaz:** Existencias › Reporte
- **API:** `GET /api/v1/reportes/inventario?desde&hasta&producto&tipo&formato`

### HU-32 — Recibir alertas de stock mínimo por correo

**Como** Administrador o Empleado  
**quiero** recibir un correo cuando un producto llegue a su stock mínimo  
**para** reponerlo a tiempo

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel (HU_48 y HU_55) | HU_48 (5 CA), HU_55 (5 CA) | RF-PRD-10, RF-PRD-11, RF-PRD-12 |

**Criterios de aceptación**

1. **Dado** un producto con mínimo 6, **cuando** una venta deja su existencia en 6, **entonces** se envía un correo a los destinatarios configurados con el producto, la existencia actual y el mínimo.
2. **Dado** la frecuencia «diaria», **cuando** varios productos llegan al mínimo, **entonces** se envía un solo correo al día con todos.
3. **Dado** la configuración de alertas, **cuando** cambio los correos o la frecuencia, **entonces** se valida el formato de cada correo.

- **Interfaz:** Configuración › Alertas de stock; Inicio (alerta)
- **API:** `GET /api/v1/configuracion/alertas-stock`; `PUT /api/v1/configuracion/alertas-stock`; `GET /api/v1/productos/alertas`

## Épica 6: Compras

> Proceso: Compras · Spec: `specs/006-compras/spec.md` · SRS §4.6 · Actores: Administrador, Empleado

Registra las compras a proveedores con sus productos, adjuntos y flujo de estados (pendiente, aprobada, pagada, recibida, anulada); al recibir la compra se suman las existencias.

### HU-33 — Registrar una compra

**Como** Administrador o Empleado  
**quiero** registrar una compra con fecha, proveedor, descripción, productos y factura adjunta  
**para** controlar los gastos y lo que se compra

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 5 pts | Matriz Excel (HU_23 administrador con importe total y HU_28 empleado con artículos; se unifican y el total se calcula del detalle) | HU_23 (9 CA), HU_28 (8 CA) | RF-COM-01, RF-COM-02 |

**Criterios de aceptación**

1. **Dado** fecha, proveedor activo (buscable), descripción y dos productos con cantidad y costo unitario, **cuando** guardo, **entonces** la compra queda pendiente con número consecutivo, el total calculado y veo el mensaje de confirmación.
2. **Dado** que adjunto la factura en PDF, **cuando** guardo, **entonces** queda asociada a la compra.
3. **Dado** campos obligatorios vacíos, sin productos o con cantidades no enteras, **cuando** guardo, **entonces** el sistema los señala (422).

- **Datos:** fecha_compra (≤ hoy); id_proveedor (activo); descripcion (≤300); productos (≥1): cantidad (entero > 0), costo_unitario (> 0); adjuntos (≤5 MB)
- **Interfaz:** Compras › Nueva compra
- **API:** `POST /api/v1/compras`; `POST /api/v1/compras/:id/adjuntos`

### HU-34 — Consultar compras

**Como** Administrador o Empleado  
**quiero** buscar compras y ver sus detalles  
**para** revisar las transacciones realizadas

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 2 pts | Matriz Excel (HU_24 y HU_29) | HU_24 (5 CA), HU_29 (5 CA) | RF-COM-03 |

**Criterios de aceptación**

1. **Dado** el buscador, **cuando** busco por fecha, proveedor, número o descripción, **entonces** veo una lista paginada con número, fecha, proveedor, total y estado.
2. **Dado** una compra, **cuando** abro su detalle, **entonces** veo sus productos, adjuntos, estado e historial de estados.
3. **Dado** una búsqueda sin coincidencias, **cuando** la ejecuto, **entonces** veo un mensaje informativo.

- **Interfaz:** Compras (listado y detalle)
- **API:** `GET /api/v1/compras?q&proveedor&estado&desde&hasta&page&limit`; `GET /api/v1/compras/:id`

### HU-35 — Actualizar una compra

**Como** Administrador o Empleado  
**quiero** corregir o completar la información de una compra  
**para** que refleje lo realmente comprado

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 3 pts | Matriz Excel (HU_25 y HU_30; conflicto sobre la fecha resuelto por rol) | HU_25 (7 CA), HU_30 (5 CA) | RF-COM-04, RF-COM-05 |

**Criterios de aceptación**

1. **Dado** una compra pendiente o aprobada, **cuando** cambio un producto y su cantidad y guardo, **entonces** el total se recalcula, se conserva el registro del cambio y veo el mensaje de confirmación.
2. **Dado** que soy Empleado, **cuando** edito, **entonces** no puedo cambiar la fecha original de la compra; si soy Administrador puedo corregirla solo mientras esté pendiente.
3. **Dado** una compra pagada, recibida o anulada, **cuando** intento editarla, **entonces** el sistema lo impide.

- **Interfaz:** Compras › Editar
- **API:** `PUT /api/v1/compras/:id`

### HU-36 — Cambiar el estado de una compra

**Como** Administrador o Empleado  
**quiero** avanzar la compra por su flujo de estados con un comentario  
**para** controlar el flujo de trabajo de las compras

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel (HU_26 y HU_31) | HU_26 (6 CA), HU_31 (5 CA) | RF-COM-06, RF-COM-07 |

**Criterios de aceptación**

1. **Dado** una compra pagada, **cuando** la paso a recibida, **entonces** las existencias de sus productos aumentan, se registran los movimientos y el cambio queda en el historial con fecha, usuario y comentario.
2. **Dado** una compra pendiente, **cuando** intento pasarla directamente a recibida, **entonces** el sistema solo ofrece los estados válidos siguientes.
3. **Dado** una compra pendiente, **cuando** la anulo con comentario, **entonces** queda anulada sin afectar existencias.

- **Interfaz:** Compras › Detalle (Cambiar estado)
- **API:** `PATCH /api/v1/compras/:id/estado`

### HU-37 — Generar el reporte de compras

**Como** Administrador o Empleado  
**quiero** generar reportes de compras por periodo, proveedor y estado  
**para** analizar los gastos

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_27 y HU_32) | HU_27 (6 CA), HU_32 (5 CA) | RF-COM-08 |

**Criterios de aceptación**

1. **Dado** el periodo mensual y un proveedor, **cuando** genero el reporte, **entonces** veo el total comprado, el número de compras y el detalle, exportable a PDF, CSV o Excel.

- **Interfaz:** Compras › Reporte
- **API:** `GET /api/v1/reportes/compras?periodo&desde&hasta&proveedor&estado&formato`

## Épica 7: Clientes y categorías de clientes

> Proceso: Ventas · Spec: `specs/007-clientes/spec.md` · SRS §4.7 · Actores: Administrador, Empleado, Cliente

Gestiona las categorías comerciales y la información de los clientes (mayores de 18 años), su autorización de datos y su código QR, y permite que el cliente se registre y mantenga su perfil.

### HU-38 — Registrar una categoría de clientes

**Como** Administrador o Empleado  
**quiero** registrar una categoría de clientes con nombre único y descripción  
**para** clasificar a los clientes

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_163 y HU_167) | HU_163 (6 CA), HU_167 (6 CA) | RF-CLI-01 |

**Criterios de aceptación**

1. **Dado** el nombre «Corporativo» y una descripción, **cuando** guardo, **entonces** la categoría queda activa con fecha y hora de creación y veo el mensaje de confirmación.
2. **Dado** un nombre repetido, **cuando** guardo, **entonces** veo un mensaje de error (409).

- **Interfaz:** Clientes › Categorías › Nueva categoría
- **API:** `POST /api/v1/categorias-clientes`

### HU-39 — Consultar las categorías de clientes

**Como** Administrador o Empleado  
**quiero** ver y buscar las categorías de clientes  
**para** revisar sus detalles

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 1 pts | Matriz Excel (HU_164 y HU_168) | HU_164 (5 CA), HU_168 (4 CA) | RF-CLI-02 |

**Criterios de aceptación**

1. **Dado** categorías, **cuando** abro la lista, **entonces** veo nombre, descripción, número de clientes, estado y fecha de creación, ordenables por nombre o fecha.
2. **Dado** el buscador, **cuando** escribo parte del nombre, **entonces** veo las coincidentes o un mensaje si no hay.

- **Interfaz:** Clientes › Categorías
- **API:** `GET /api/v1/categorias-clientes?q&sort&page&limit`; `GET /api/v1/categorias-clientes/:id`

### HU-40 — Actualizar una categoría de clientes

**Como** Administrador o Empleado  
**quiero** modificar el nombre y la descripción de una categoría  
**para** mantener la información actualizada

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 1 pts | Matriz Excel (HU_165 y HU_169) | HU_165 (6 CA), HU_169 (5 CA) | RF-CLI-03 |

**Criterios de aceptación**

1. **Dado** una categoría, **cuando** cambio su descripción y guardo, **entonces** veo el mensaje de confirmación y queda la fecha y hora de la última actualización.
2. **Dado** un nombre que ya usa otra categoría, **cuando** guardo, **entonces** veo un mensaje de error.

- **Interfaz:** Clientes › Categorías › Editar
- **API:** `PUT /api/v1/categorias-clientes/:id`

### HU-41 — Cambiar el estado de una categoría de clientes

**Como** Administrador o Empleado  
**quiero** activar o inactivar una categoría de clientes  
**para** saber qué categorías están disponibles

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 1 pts | Matriz Excel (HU_166 y HU_170) | HU_166 (6 CA), HU_170 (6 CA) | RF-CLI-04 |

**Criterios de aceptación**

1. **Dado** una categoría activa, **cuando** la inactivo y confirmo, **entonces** ya no se ofrece al registrar clientes y el cambio queda con fecha y hora.
2. **Dado** una categoría inactiva, **cuando** la reactivo, **entonces** vuelve a estar disponible.

- **Interfaz:** Clientes › Categorías (Cambiar estado)
- **API:** `PATCH /api/v1/categorias-clientes/:id/estado`; `DELETE /api/v1/categorias-clientes/:id (inactivación lógica)`

### HU-42 — Registrar un cliente

**Como** Administrador o Empleado  
**quiero** registrar un cliente con sus datos, categoría y autorizaciones  
**para** gestionar su información y seguir su actividad

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel (HU_171 y HU_176) | HU_171 (6 CA), HU_176 (5 CA) | RF-CLI-05, RF-CLI-06, RF-CLI-07 |

**Criterios de aceptación**

1. **Dado** nombre, apellido, documento, fecha de nacimiento de un mayor de edad, teléfono, correo, categoría y la autorización de datos, **cuando** guardo, **entonces** el cliente queda activo, se genera su código QR y veo el mensaje de confirmación.
2. **Dado** una fecha de nacimiento de una persona menor de 18 años, **cuando** guardo, **entonces** el sistema rechaza el registro.
3. **Dado** un documento ya registrado o un correo inválido, **cuando** guardo, **entonces** veo el error específico del campo.

- **Datos:** nombre y apellido (2–60); numero_documento (5–15, único); fecha_nacimiento (edad ≥ 18); telefono (10 dígitos); correo (válido); id_categoria (activa); acepta_datos (obligatorio)
- **Interfaz:** Clientes › Nuevo cliente
- **API:** `POST /api/v1/clientes`

### HU-43 — Consultar clientes

**Como** Administrador o Empleado  
**quiero** buscar clientes y ver su información  
**para** acceder a sus datos

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 2 pts | Matriz Excel (HU_172 y HU_177) | HU_172 (5 CA), HU_177 (4 CA) | RF-CLI-08 |

**Criterios de aceptación**

1. **Dado** el buscador, **cuando** busco por nombre, documento, id o correo, **entonces** veo los coincidentes con categoría, condición VIP y estado.
2. **Dado** un cliente, **cuando** abro su detalle, **entonces** veo sus datos, su QR, sus últimos ingresos, su saldo de puntos y su historial de actualizaciones y cambios de estado.
3. **Dado** una búsqueda sin coincidencias, **cuando** la ejecuto, **entonces** veo un mensaje.

- **Interfaz:** Clientes (listado y detalle)
- **API:** `GET /api/v1/clientes?q&categoria&vip&estado&page&limit`; `GET /api/v1/clientes/:id`

### HU-44 — Actualizar un cliente

**Como** Administrador o Empleado  
**quiero** modificar los datos de un cliente  
**para** mantenerlos al día

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_173 y HU_178) | HU_173 (5 CA), HU_178 (5 CA) | RF-CLI-09 |

**Criterios de aceptación**

1. **Dado** un cliente, **cuando** cambio su teléfono y correo válidos y guardo, **entonces** veo el mensaje de confirmación y el cambio queda en su historial con fecha y hora.
2. **Dado** un teléfono con formato incorrecto, **cuando** guardo, **entonces** veo el error del campo.

- **Interfaz:** Clientes › Editar
- **API:** `PUT /api/v1/clientes/:id`

### HU-45 — Cambiar el estado de un cliente

**Como** Administrador o Empleado  
**quiero** activar o inactivar un cliente  
**para** hacer seguimiento y controlar su acceso

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_174 y HU_179) | HU_174 (6 CA), HU_179 (5 CA) | RF-CLI-10 |

**Criterios de aceptación**

1. **Dado** un cliente activo, **cuando** lo inactivo desde la lista desplegable y confirmo, **entonces** su QR deja de permitir el ingreso y el cambio queda con fecha y hora.

- **Interfaz:** Clientes (Cambiar estado)
- **API:** `PATCH /api/v1/clientes/:id/estado`; `DELETE /api/v1/clientes/:id (inactivación lógica)`

### HU-46 — Generar el reporte de clientes

**Como** Administrador o Empleado  
**quiero** generar reportes de clientes con filtros  
**para** obtener información estadística

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Baja | 2 pts | Matriz Excel (HU_175 y HU_180) | HU_175 (3 CA), HU_180 (3 CA) | RF-CLI-11 |

**Criterios de aceptación**

1. **Dado** filtros de estado, categoría y fecha de registro, **cuando** genero el reporte, **entonces** descargo un PDF, CSV o Excel con los clientes y los totales por categoría.

- **Interfaz:** Clientes › Reporte
- **API:** `GET /api/v1/reportes/clientes?estado&categoria&vip&desde&hasta&formato`

### HU-47 — Registrarme como cliente

**Como** Visitante  
**quiero** crear mi cuenta de cliente  
**para** tener mi código QR, reservar y acumular puntos

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel | HU_181 (6 CA) | RF-CLI-12, RF-CLI-13 |

**Criterios de aceptación**

1. **Dado** nombre, apellido, documento, fecha de nacimiento (mayor de edad), correo, teléfono, contraseña válida y la autorización de datos, **cuando** me registro, **entonces** se crea mi cuenta de Cliente, recibo un correo de bienvenida y veo mi código QR.
2. **Dado** que marco la casilla de promociones, **cuando** me registro, **entonces** quedo suscrito; si no la marco, no recibo campañas.
3. **Dado** un documento ya registrado en la puerta sin cuenta, **cuando** me registro, **entonces** mi cuenta se vincula a esa ficha.

- **Interfaz:** Registro de cliente
- **API:** `POST /api/v1/auth/registro`

### HU-48 — Actualizar mi perfil

**Como** Cliente  
**quiero** editar mis datos personales y ver mi código QR  
**para** que estén al día

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel | HU_182 (5 CA) | RF-CLI-14, RF-CLI-15 |

**Criterios de aceptación**

1. **Dado** Mi perfil, **cuando** cambio dirección, teléfono o correo válidos, **entonces** veo «Perfil actualizado».
2. **Dado** Mi perfil, **cuando** abro «Mi QR», **entonces** veo y descargo mi código para presentarlo en la puerta.
3. **Dado** que intento cambiar mi documento o fecha de nacimiento, **cuando** guardo, **entonces** el sistema no lo permite.

- **Interfaz:** Portal del cliente › Mi perfil
- **API:** `GET /api/v1/clientes/me`; `PUT /api/v1/clientes/me`; `GET /api/v1/clientes/me/qr`

## Épica 8: Clientes VIP

> Proceso: Ingreso · Spec: `specs/008-clientes-vip/spec.md` · SRS §4.8 · Actores: Administrador, Empleado

Gestiona la condición VIP de los clientes (nivel, beneficios exclusivos y acceso prioritario) y su ciclo de vida.

### HU-49 — Registrar un cliente VIP

**Como** Administrador o Empleado  
**quiero** otorgar la condición VIP a un cliente con su nivel y beneficios  
**para** ofrecerle un servicio personalizado y acceso prioritario

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel (HU_65 y HU_70) | HU_65 (6 CA), HU_70 (7 CA) | RF-VIP-01, RF-VIP-02 |

**Criterios de aceptación**

1. **Dado** un cliente activo, **cuando** le asigno el nivel Oro con fecha de inicio y adjunto un documento, **entonces** queda como VIP activo con id único y veo el mensaje de confirmación.
2. **Dado** una persona que aún no es cliente, **cuando** la registro como VIP, **entonces** primero se diligencian sus datos de cliente con las mismas validaciones (mayor de edad, documento único).
3. **Dado** un cliente que ya es VIP, **cuando** intento registrarlo de nuevo, **entonces** el sistema lo impide.

- **Interfaz:** Clientes VIP › Nuevo VIP
- **API:** `POST /api/v1/clientes-vip`; `POST /api/v1/clientes-vip/:id/adjuntos`

### HU-50 — Consultar clientes VIP

**Como** Administrador o Empleado  
**quiero** buscar clientes VIP y ver su información  
**para** atenderlos de forma personalizada

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_66 y HU_71) | HU_66 (4 CA), HU_71 (4 CA) | RF-VIP-03 |

**Criterios de aceptación**

1. **Dado** el buscador, **cuando** busco por id, nombre, documento o correo, **entonces** veo los VIP coincidentes con nivel, estado y beneficios.
2. **Dado** un VIP, **cuando** abro su detalle, **entonces** veo estado, nivel, beneficios e historial de interacciones (ingresos, reservas, compras) y puedo exportarlo a PDF o CSV.

- **Interfaz:** Clientes VIP (listado y detalle)
- **API:** `GET /api/v1/clientes-vip?q&nivel&estado&page&limit`; `GET /api/v1/clientes-vip/:id`

### HU-51 — Actualizar un cliente VIP

**Como** Administrador o Empleado  
**quiero** actualizar los datos y el nivel VIP de un cliente  
**para** mantener su información al día

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_67 y HU_72) | HU_67 (5 CA), HU_72 (5 CA) | RF-VIP-04 |

**Criterios de aceptación**

1. **Dado** un VIP, **cuando** cambio su nivel a Platino y su teléfono, **entonces** se guardan, queda la fecha y hora de la última actualización y veo el mensaje de confirmación.
2. **Dado** un dato inválido, **cuando** guardo, **entonces** veo el motivo del fallo.

- **Interfaz:** Clientes VIP › Editar
- **API:** `PUT /api/v1/clientes-vip/:id`

### HU-52 — Cambiar el estado de un cliente VIP

**Como** Administrador o Empleado  
**quiero** activar o inactivar la condición VIP con una razón  
**para** gestionar su acceso a beneficios

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_68 y HU_73) | HU_68 (4 CA), HU_73 (5 CA) | RF-VIP-05 |

**Criterios de aceptación**

1. **Dado** un VIP activo, **cuando** lo inactivo con la razón «Solicitud del cliente», **entonces** pierde los beneficios, se registran fecha y razón y queda un registro de auditoría.

- **Interfaz:** Clientes VIP (Cambiar estado)
- **API:** `PATCH /api/v1/clientes-vip/:id/estado`

### HU-53 — Generar el reporte de clientes VIP

**Como** Administrador o Empleado  
**quiero** generar reportes de clientes VIP con filtros  
**para** analizar el programa VIP

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Baja | 2 pts | Matriz Excel (HU_69 y HU_74) | HU_69 (4 CA), HU_74 (4 CA) | RF-VIP-06 |

**Criterios de aceptación**

1. **Dado** un periodo, nivel y estado, **cuando** genero el reporte, **entonces** veo el total de VIP, activos, inactivos y por nivel, exportable a PDF, CSV o Excel.

- **Interfaz:** Clientes VIP › Reporte
- **API:** `GET /api/v1/reportes/clientes-vip?desde&hasta&nivel&estado&formato`

### HU-54 — Configurar los niveles y beneficios VIP

**Como** Administrador  
**quiero** definir los niveles VIP con sus descuentos, multiplicador de puntos y acceso prioritario  
**para** que los beneficios se apliquen solos en reservas, ventas e ingreso

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Inferida (ficha §Alcance — clientes VIP con acceso prioritario y beneficios exclusivos) | Inferida de la ficha del proyecto | RF-VIP-07, RF-VIP-08 |

**Criterios de aceptación**

1. **Dado** el nivel Oro con 10 % de descuento en reservas, 5 % en consumo, puntos ×1,5 y acceso prioritario, **cuando** lo guardo, **entonces** esos beneficios se aplican a los VIP de ese nivel.
2. **Dado** un nivel con VIP activos, **cuando** intento inactivarlo, **entonces** el sistema lo impide.

- **Interfaz:** Configuración › Niveles VIP
- **API:** `GET /api/v1/niveles-vip`; `POST /api/v1/niveles-vip`; `PUT /api/v1/niveles-vip/:id`

## Épica 9: Control de entradas

> Proceso: Ingreso · Spec: `specs/009-control-entradas/spec.md` · SRS §4.9 · Actores: Administrador, Empleado

Controla el ingreso de los clientes con su código QR: valida identidad, edad, estado y aforo, da prioridad a los VIP, registra salidas para conocer la ocupación y entrega reportes de afluencia.

### HU-55 — Registrar un cliente en la entrada

**Como** Administrador o Empleado de ingreso  
**quiero** registrar rápidamente en la puerta a un cliente nuevo con su documento  
**para** que obtenga su código QR e ingrese sin demoras

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel (se reemplaza «introducir manualmente un QR» por la generación automática del QR) | HU_56 (6 CA) | RF-ING-01, RF-ING-02 |

**Criterios de aceptación**

1. **Dado** nombre, documento y fecha de nacimiento de un mayor de edad y la autorización de datos, **cuando** registro, **entonces** se crea el cliente con su QR y veo la confirmación con la opción de registrar su ingreso de inmediato.
2. **Dado** un documento ya registrado, **cuando** registro, **entonces** el sistema muestra el cliente existente en lugar de duplicarlo.
3. **Dado** datos incompletos o un menor de edad, **cuando** registro, **entonces** el sistema indica el error.

- **Interfaz:** Ingreso › Registro rápido
- **API:** `POST /api/v1/ingresos/registro-rapido`

### HU-56 — Generar y gestionar códigos QR

**Como** Administrador o Empleado  
**quiero** generar, asociar, desactivar y listar los códigos QR de los clientes  
**para** controlar el acceso y la información de los clientes

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel (HU_57 y HU_64; el QR codifica un identificador opaco en lugar del nombre y documento por la Ley 1581) | HU_57 (7 CA), HU_64 (5 CA) | RF-ING-03, RF-ING-04 |

**Criterios de aceptación**

1. **Dado** un cliente nuevo, **cuando** se registra, **entonces** se genera automáticamente un QR único legible por cualquier lector, visible en su perfil y descargable o imprimible.
2. **Dado** un cliente que perdió su QR, **cuando** genero uno nuevo, **entonces** el anterior queda inactivo y deja de permitir el ingreso.
3. **Dado** la lista de QR, **cuando** la abro, **entonces** veo cliente, fecha de generación y estado (activo o inactivo).

- **Interfaz:** Clientes › Detalle › Código QR; Ingreso › Códigos QR
- **API:** `POST /api/v1/clientes/:id/qr`; `PATCH /api/v1/qr/:id/estado`; `GET /api/v1/qr?estado&q`; `GET /api/v1/clientes/:id/qr.png`

### HU-57 — Consultar un cliente por su código QR

**Como** Administrador o Empleado de ingreso  
**quiero** escanear o digitar un QR y ver la información del cliente  
**para** verificar su identidad antes del ingreso

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 2 pts | Matriz Excel | HU_58 (4 CA) | RF-ING-05 |

**Criterios de aceptación**

1. **Dado** un QR válido, **cuando** lo escaneo en «Verificar», **entonces** veo nombre, documento parcialmente oculto, edad, foto si existe, condición VIP, estado y fecha de registro, sin registrar ingreso.
2. **Dado** un QR inexistente, **cuando** lo escaneo, **entonces** veo «Código QR no válido».

- **Interfaz:** Ingreso › Verificar QR
- **API:** `GET /api/v1/qr/:token/cliente`

### HU-58 — Registrar el ingreso con código QR

**Como** Empleado de ingreso o Administrador  
**quiero** escanear el QR de cada cliente y registrar su entrada  
**para** agilizar el ingreso y controlar el aforo

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 5 pts | Matriz Excel (HU_59 y HU_61) | HU_59 (6 CA), HU_61 (7 CA) | RF-ING-06, RF-ING-07, RF-ING-08, RF-ING-09 |

**Criterios de aceptación**

1. **Dado** un QR activo de un cliente activo, mayor de edad, que no está adentro, con ocupación 350 y aforo 400, **cuando** lo escaneo, **entonces** veo «Permitido» en verde, se registra la entrada con fecha, hora y empleado y la ocupación pasa a 351.
2. **Dado** un cliente VIP de un nivel con acceso prioritario, **cuando** lo escaneo, **entonces** el resultado muestra la insignia VIP y el ingreso queda marcado como prioritario.
3. **Dado** ocupación igual al aforo, un QR inválido o inactivo, un cliente inactivo o menor de edad, o un cliente que ya está adentro, **cuando** escaneo, **entonces** veo «Denegado» en rojo con el motivo y el intento fallido queda registrado.
4. **Dado** un QR ilegible, **cuando** busco al cliente por nombre o documento, **entonces** puedo registrar su ingreso manual con las mismas validaciones.

- **Interfaz:** Ingreso › Control de entrada (modo puerta)
- **API:** `POST /api/v1/ingresos`; `GET /api/v1/ingresos/ocupacion`

### HU-59 — Consultar el registro de ingresos

**Como** Empleado o Administrador  
**quiero** consultar los ingresos por fechas o cliente  
**para** verificar la asistencia

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel | HU_62 (6 CA) | RF-ING-10 |

**Criterios de aceptación**

1. **Dado** un rango de fechas, **cuando** consulto, **entonces** veo la lista de ingresos con cliente, fecha, hora, puerta y prioridad, y el total de ingresos del periodo.
2. **Dado** el buscador, **cuando** busco por nombre o documento, **entonces** veo los ingresos de ese cliente.

- **Interfaz:** Ingreso › Registro de ingresos
- **API:** `GET /api/v1/ingresos?desde&hasta&q&page&limit`

### HU-60 — Generar el reporte de afluencia

**Como** Administrador o Empleado  
**quiero** generar reportes de ingresos con gráficos  
**para** analizar la afluencia de público

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 3 pts | Matriz Excel (HU_60 y HU_63) | HU_60 (5 CA), HU_63 (7 CA) | RF-ING-11 |

**Criterios de aceptación**

1. **Dado** un rango de fechas, **cuando** genero el reporte, **entonces** veo total de ingresos, clientes únicos, ingresos por noche y por hora en gráficos, intentos fallidos por motivo y la lista de ingresos, descargable en PDF o CSV.

- **Interfaz:** Ingreso › Reporte de afluencia
- **API:** `GET /api/v1/reportes/ingresos?desde&hasta&formato`

### HU-61 — Configurar el aforo y registrar salidas

**Como** Administrador o Empleado de ingreso  
**quiero** configurar el aforo máximo y registrar la salida de los clientes  
**para** conocer la ocupación real en todo momento

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Inferida (HU_59 — gestionar el aforo; ficha §Alcance control de entradas) | Inferida de la ficha del proyecto | RF-ING-12, RF-ING-13 |

**Criterios de aceptación**

1. **Dado** el aforo configurado en 400 con alerta al 90 %, **cuando** la ocupación llega a 360, **entonces** la pantalla de ingreso y el tablero muestran la alerta.
2. **Dado** un cliente adentro, **cuando** escaneo su QR en modo «Salida», **entonces** se registra la salida y la ocupación baja en uno.

- **Interfaz:** Configuración › Aforo; Ingreso › Control de salida
- **API:** `GET /api/v1/configuracion/aforo`; `PUT /api/v1/configuracion/aforo`; `POST /api/v1/ingresos/salidas`

## Épica 10: Servicios

> Proceso: Servicios · Spec: `specs/010-servicios/spec.md` · SRS §4.10 · Actores: Administrador, Empleado

Gestiona el catálogo de servicios (alquiler de espacios y servicios adicionales como DJ, decoración, sonido, iluminación y catering) que se usan en reservas, eventos, agenda y ventas.

### HU-62 — Registrar un servicio

**Como** Administrador o Empleado  
**quiero** registrar un servicio con nombre, descripción, precio, categoría e imágenes  
**para** ofrecer una gama completa de servicios

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 2 pts | Matriz Excel (HU_75 y HU_80) | HU_75 (8 CA), HU_80 (7 CA) | RF-SER-01 |

**Criterios de aceptación**

1. **Dado** nombre «DJ invitado», descripción, precio $ 800.000, categoría servicio adicional e imagen, **cuando** guardo, **entonces** el servicio queda activo y veo el mensaje de confirmación.
2. **Dado** un precio con formato inválido o campos obligatorios vacíos, **cuando** guardo, **entonces** el sistema los señala.

- **Interfaz:** Servicios › Nuevo servicio
- **API:** `POST /api/v1/servicios`

### HU-63 — Consultar servicios

**Como** Administrador o Empleado  
**quiero** buscar servicios y ver su información  
**para** dar información precisa a los clientes

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 1 pts | Matriz Excel (HU_76 y HU_81) | HU_76 (5 CA), HU_81 (5 CA) | RF-SER-02 |

**Criterios de aceptación**

1. **Dado** la lista de servicios con su estado, **cuando** busco por nombre, parte del nombre o categoría y filtro por estado, **entonces** veo los coincidentes o un mensaje si no hay.
2. **Dado** un servicio, **cuando** lo selecciono, **entonces** veo nombre, descripción, precio, categoría, imágenes y estado.

- **Interfaz:** Servicios (listado y detalle)
- **API:** `GET /api/v1/servicios?q&categoria&estado&page&limit`; `GET /api/v1/servicios/:id`

### HU-64 — Actualizar un servicio

**Como** Administrador o Empleado  
**quiero** modificar nombre, descripción, precio e imágenes de un servicio  
**para** mantener su información al día

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_77 y HU_82) | HU_77 (5 CA), HU_82 (6 CA) | RF-SER-03 |

**Criterios de aceptación**

1. **Dado** un servicio, **cuando** cambio solo su precio y guardo, **entonces** se actualiza (edición parcial) y veo el mensaje de confirmación.

- **Interfaz:** Servicios › Editar
- **API:** `PUT /api/v1/servicios/:id`; `PATCH /api/v1/servicios/:id`

### HU-65 — Cambiar el estado de un servicio

**Como** Administrador o Empleado  
**quiero** activar o inactivar un servicio  
**para** controlar su disponibilidad

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 1 pts | Matriz Excel (HU_78 y HU_83) | HU_78 (4 CA), HU_83 (5 CA) | RF-SER-04 |

**Criterios de aceptación**

1. **Dado** un servicio activo, **cuando** lo inactivo y confirmo, **entonces** deja de ofrecerse y el cambio queda con fecha y hora.

- **Interfaz:** Servicios (Cambiar estado)
- **API:** `PATCH /api/v1/servicios/:id/estado`

### HU-66 — Generar el reporte de servicios

**Como** Administrador o Empleado  
**quiero** generar reportes de los servicios con sus solicitudes e ingresos  
**para** analizar su rendimiento

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_79 y HU_84) | HU_79 (5 CA), HU_84 (3 CA) | RF-SER-05 |

**Criterios de aceptación**

1. **Dado** un rango de fechas y una categoría, **cuando** genero el reporte, **entonces** veo cada servicio con las veces solicitado (reservas, eventos y ventas) y los ingresos generados, descargable en PDF o CSV.

- **Interfaz:** Servicios › Reporte
- **API:** `GET /api/v1/reportes/servicios?desde&hasta&categoria&estado&formato`

## Épica 11: Empleados y categorías de empleados

> Proceso: Servicios · Spec: `specs/011-empleados/spec.md` · SRS §4.11 · Actores: Administrador

Gestiona las categorías del personal y la información de los empleados, que se programan en la agenda y se asignan a servicios y eventos.

### HU-67 — Registrar una categoría de empleado

**Como** Administrador  
**quiero** registrar categorías de empleado como DJ, Mesero, Ingreso y Administrativo  
**para** clasificar al personal según sus funciones

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel | HU_85 (7 CA) | RF-EMP-01 |

**Criterios de aceptación**

1. **Dado** el nombre «Bartender», una descripción y estado activo, **cuando** guardo, **entonces** veo el mensaje de confirmación.
2. **Dado** un nombre ya usado, **cuando** guardo, **entonces** veo un error claro (409).

- **Interfaz:** Empleados › Categorías › Nueva categoría
- **API:** `POST /api/v1/categorias-empleados`

### HU-68 — Consultar las categorías de empleado

**Como** Administrador  
**quiero** buscar una categoría por nombre o id y ver su información  
**para** verificar sus detalles

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Baja | 1 pts | Matriz Excel | HU_86 (4 CA) | RF-EMP-02 |

**Criterios de aceptación**

1. **Dado** el buscador, **cuando** busco «dj», **entonces** veo nombre, descripción, estado y número de empleados; si no existe, veo un mensaje.

- **Interfaz:** Empleados › Categorías
- **API:** `GET /api/v1/categorias-empleados?q`; `GET /api/v1/categorias-empleados/:id`

### HU-69 — Actualizar una categoría de empleado

**Como** Administrador  
**quiero** modificar nombre, descripción y estado de una categoría  
**para** mantenerla actualizada

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Baja | 1 pts | Matriz Excel | HU_87 (6 CA) | RF-EMP-03 |

**Criterios de aceptación**

1. **Dado** una categoría, **cuando** cambio su descripción y guardo, **entonces** veo el mensaje de confirmación.
2. **Dado** cambios sin guardar, **cuando** pulso «Cancelar», **entonces** se descartan (anulación de cambios).
3. **Dado** un nombre repetido, **cuando** guardo, **entonces** veo un error.

- **Interfaz:** Empleados › Categorías › Editar
- **API:** `PUT /api/v1/categorias-empleados/:id`

### HU-70 — Cambiar el estado de una categoría de empleado

**Como** Administrador  
**quiero** activar o inactivar una categoría de empleado  
**para** controlar su visibilidad

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Baja | 1 pts | Matriz Excel | HU_88 (5 CA) | RF-EMP-04 |

**Criterios de aceptación**

1. **Dado** una categoría activa, **cuando** la inactivo, **entonces** se registra fecha y hora y no se ofrece al registrar empleados.

- **Interfaz:** Empleados › Categorías (Cambiar estado)
- **API:** `PATCH /api/v1/categorias-empleados/:id/estado`

### HU-71 — Registrar un empleado

**Como** Administrador  
**quiero** registrar a un empleado con sus datos y su categoría  
**para** gestionar su información y programarlo

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Excel + completada (departamento y puesto se representan con la categoría de empleado) | HU_89 (7 CA) | RF-EMP-05, RF-EMP-06 |

**Criterios de aceptación**

1. **Dado** nombre, apellido, documento, fecha de nacimiento válida (mayor de edad), contacto, categoría DJ y fecha de ingreso, **cuando** guardo, **entonces** el empleado queda activo con id único, fecha y hora de registro y veo el mensaje de confirmación.
2. **Dado** un documento ya registrado o una fecha de nacimiento inválida, **cuando** guardo, **entonces** el sistema lo señala.
3. **Dado** que el empleado necesita usar el sistema, **cuando** marco «Crear usuario» con un rol, **entonces** se crea su usuario vinculado.

- **Interfaz:** Empleados › Nuevo empleado
- **API:** `POST /api/v1/empleados`

### HU-72 — Consultar empleados

**Como** Administrador  
**quiero** buscar y listar empleados con filtros  
**para** acceder a sus datos

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 2 pts | Matriz Excel | HU_90 (6 CA) | RF-EMP-07 |

**Criterios de aceptación**

1. **Dado** el buscador, **cuando** busco por nombre, apellido, documento o id, **entonces** veo los coincidentes con categoría y estado, ordenables y filtrables por categoría y estado.
2. **Dado** una búsqueda sin coincidencias, **cuando** la ejecuto, **entonces** veo un mensaje.

- **Interfaz:** Empleados (listado y detalle)
- **API:** `GET /api/v1/empleados?q&categoria&estado&sort&page&limit`; `GET /api/v1/empleados/:id`

### HU-73 — Actualizar un empleado

**Como** Administrador  
**quiero** modificar la información personal y laboral de un empleado  
**para** mantenerla actualizada

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Excel + completada (el salario se excluye: nómina fuera del alcance) | HU_91 (7 CA) | RF-EMP-08 |

**Criterios de aceptación**

1. **Dado** un empleado, **cuando** cambio su teléfono y su categoría y guardo, **entonces** veo el mensaje de confirmación y el cambio queda en su historial con fecha y hora.

- **Interfaz:** Empleados › Editar
- **API:** `PUT /api/v1/empleados/:id`

### HU-74 — Cambiar el estado de un empleado

**Como** Administrador  
**quiero** activar o inactivar a un empleado  
**para** reflejar su situación laboral

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel | HU_92 (5 CA) | RF-EMP-09 |

**Criterios de aceptación**

1. **Dado** un empleado activo, **cuando** confirmo su inactivación, **entonces** su estado se muestra en el perfil, se registra fecha y hora y su usuario (si tiene) queda inactivo.
2. **Dado** turnos futuros del empleado, **cuando** lo inactivo, **entonces** veo la lista de turnos afectados.

- **Interfaz:** Empleados (Cambiar estado)
- **API:** `PATCH /api/v1/empleados/:id/estado`

### HU-75 — Generar el reporte de empleados

**Como** Administrador  
**quiero** generar reportes de empleados por categoría y estado  
**para** obtener información estadística

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Baja | 1 pts | Matriz Excel | HU_93 (3 CA) | RF-EMP-10 |

**Criterios de aceptación**

1. **Dado** filtros de categoría y estado, **cuando** genero el reporte, **entonces** descargo un PDF o CSV con los empleados y los totales por categoría.

- **Interfaz:** Empleados › Reporte
- **API:** `GET /api/v1/reportes/empleados?categoria&estado&formato`

## Épica 12: Agenda de empleados

> Proceso: Servicios · Spec: `specs/012-agenda-empleados/spec.md` · SRS §4.12 · Actores: Administrador, Empleado

Programa los turnos y actividades de cada empleado asociados a un servicio (y opcionalmente a un evento), evitando cruces de horario.

### HU-76 — Programar una actividad en la agenda de un empleado

**Como** Administrador o Empleado  
**quiero** registrar un turno o actividad con empleado, servicio, fechas y descripción  
**para** planificar la jornada y saber qué servicio atiende cada empleado

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 5 pts | Matriz Excel (HU_94 y HU_98 administrador, HU_100 empleado) | HU_94 (7 CA), HU_98 (3 CA), HU_100 (8 CA) | RF-AGE-01, RF-AGE-02, RF-AGE-03 |

**Criterios de aceptación**

1. **Dado** el empleado DJ Andrés, el servicio «DJ residente», el viernes de 10:00 p. m. a 3:00 a. m. y una descripción, **cuando** guardo, **entonces** la actividad queda pendiente y veo el mensaje de confirmación.
2. **Dado** que el empleado ya tiene una actividad que se cruza, **cuando** guardo, **entonces** el sistema lo impide indicando el cruce.
3. **Dado** que soy Empleado, **cuando** registro una actividad, **entonces** solo puedo hacerlo en mi propia agenda.

- **Datos:** id_empleado (activo); id_servicio (activo, opcional); titulo (3–80); inicio < fin
- **Interfaz:** Agenda › Nueva actividad
- **API:** `POST /api/v1/agenda-empleados`

### HU-77 — Consultar la agenda de empleados

**Como** Administrador o Empleado  
**quiero** ver la agenda en calendario con filtros  
**para** visualizar las actividades programadas

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel (HU_95 y HU_101) | HU_95 (4 CA), HU_101 (6 CA) | RF-AGE-04 |

**Criterios de aceptación**

1. **Dado** la vista de calendario semanal, **cuando** filtro por empleado, servicio o estado, **entonces** veo las actividades con fecha, hora, servicio y descripción.
2. **Dado** que soy Empleado, **cuando** abro la agenda, **entonces** veo mis actividades; si no hay, veo un mensaje.

- **Interfaz:** Agenda (calendario)
- **API:** `GET /api/v1/agenda-empleados?empleado&servicio&estado&desde&hasta`; `GET /api/v1/agenda-empleados/:id`

### HU-78 — Actualizar una actividad de la agenda

**Como** Administrador o Empleado  
**quiero** modificar fecha, hora, servicio y descripción de una actividad  
**para** reprogramar cuando sea necesario

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_96 y HU_102) | HU_96 (5 CA), HU_102 (6 CA) | RF-AGE-05 |

**Criterios de aceptación**

1. **Dado** una actividad pendiente, **cuando** cambio su hora sin generar cruces, **entonces** se guarda y veo el mensaje de confirmación.
2. **Dado** un cambio que genera cruce o fechas incoherentes, **cuando** guardo, **entonces** el sistema lo impide.

- **Interfaz:** Agenda › Editar actividad
- **API:** `PUT /api/v1/agenda-empleados/:id`

### HU-79 — Cambiar el estado de una actividad de la agenda

**Como** Administrador o Empleado  
**quiero** marcar una actividad como completada o cancelada  
**para** llevar el control de las actividades

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 1 pts | Matriz Excel (HU_97 y HU_103) | HU_97 (5 CA), HU_103 (5 CA) | RF-AGE-06 |

**Criterios de aceptación**

1. **Dado** una actividad pendiente, **cuando** la marco como completada, **entonces** se registra fecha y hora del cambio y veo el mensaje de confirmación.

- **Interfaz:** Agenda (Cambiar estado)
- **API:** `PATCH /api/v1/agenda-empleados/:id/estado`

### HU-80 — Generar el reporte de agenda de empleados

**Como** Administrador o Empleado  
**quiero** generar reportes de la agenda por fecha, empleado, servicio y estado  
**para** medir la productividad y gestionar el tiempo

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_99 y HU_104) | HU_99 (4 CA), HU_104 (4 CA) | RF-AGE-07 |

**Criterios de aceptación**

1. **Dado** un rango de fechas y un servicio, **cuando** genero el reporte, **entonces** descargo un PDF o CSV con fecha, hora, descripción, empleado, servicio, estado y horas programadas por empleado.

- **Interfaz:** Agenda › Reporte
- **API:** `GET /api/v1/reportes/agenda-empleados?desde&hasta&empleado&servicio&estado&formato`

## Épica 13: Reservas

> Proceso: Servicios · Spec: `specs/013-reservas/spec.md` · SRS §4.13 · Actores: Administrador, Empleado, Cliente

Gestiona las reservas de mesas y salas VIP con validación de disponibilidad y capacidad, servicios adicionales con descuentos VIP y el ciclo de estados de cada reserva.

### HU-81 — Gestionar los espacios reservables

**Como** Administrador  
**quiero** registrar las mesas y salas VIP con su capacidad, zona y consumo mínimo  
**para** que las reservas validen la disponibilidad real

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 2 pts | Inferida (HU_105 a HU_115 validan disponibilidad de sala VIP o mesa) | Inferida de la ficha del proyecto | RF-RES-01 |

**Criterios de aceptación**

1. **Dado** el espacio «Sala VIP 1» tipo sala VIP, zona Segundo piso, capacidad 12 y consumo mínimo $ 1.200.000, **cuando** guardo, **entonces** queda activo y disponible para reservas.
2. **Dado** un espacio con reservas futuras, **cuando** lo inactivo, **entonces** el sistema lista esas reservas y pide confirmar.

- **Interfaz:** Configuración › Espacios
- **API:** `GET /api/v1/espacios`; `POST /api/v1/espacios`; `PUT /api/v1/espacios/:id`; `PATCH /api/v1/espacios/:id/estado`

### HU-82 — Registrar una reserva

**Como** Administrador o Empleado  
**quiero** registrar la reserva de una mesa o sala VIP para un cliente  
**para** gestionar la disponibilidad del local

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 5 pts | Matriz Excel (HU_105 y HU_111) | HU_105 (8 CA), HU_111 (8 CA) | RF-RES-02, RF-RES-03, RF-RES-04 |

**Criterios de aceptación**

1. **Dado** fecha, hora, tipo sala VIP, un espacio disponible, 10 personas y un cliente existente, **cuando** guardo, **entonces** la reserva queda pendiente con código único y veo el mensaje de confirmación.
2. **Dado** un cliente nuevo, **cuando** registro la reserva, **entonces** puedo crear el cliente en el mismo flujo con sus validaciones.
3. **Dado** un espacio ocupado en ese horario o más personas que su capacidad, **cuando** guardo, **entonces** el sistema lo impide y sugiere espacios disponibles.
4. **Dado** un cliente VIP, **cuando** agrego el servicio «Botella de bienvenida», **entonces** se aplica el descuento de su nivel al subtotal.

- **Datos:** fecha (≥ hoy) y hora futura; id_espacio (activo, disponible); numero_personas (1–capacidad); id_cliente (activo); servicios (opcionales, activos)
- **Interfaz:** Reservas › Nueva reserva
- **API:** `POST /api/v1/reservas`; `GET /api/v1/espacios/disponibles?fecha&hora_inicio&hora_fin&personas&tipo`

### HU-83 — Consultar reservas

**Como** Administrador o Empleado  
**quiero** buscar las reservas y ver sus detalles  
**para** preparar cada noche

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 2 pts | Matriz Excel (HU_106 y HU_112) | HU_106 (5 CA), HU_112 (4 CA) | RF-RES-05 |

**Criterios de aceptación**

1. **Dado** el buscador, **cuando** busco por fecha, tipo, nombre o id de cliente o código, **entonces** veo fecha, hora, tipo, espacio, cliente, personas y estado, ordenables por fecha, hora o cliente.
2. **Dado** una búsqueda sin coincidencias, **cuando** la ejecuto, **entonces** veo un mensaje.

- **Interfaz:** Reservas (listado, vista por noche y detalle)
- **API:** `GET /api/v1/reservas?fecha&tipo&q&estado&sort&page&limit`; `GET /api/v1/reservas/:id`

### HU-84 — Actualizar una reserva

**Como** Administrador o Empleado  
**quiero** modificar fecha, hora, personas o cliente de una reserva  
**para** atender las peticiones de los clientes

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 3 pts | Matriz Excel (HU_107 y HU_113) | HU_107 (6 CA), HU_113 (5 CA) | RF-RES-06 |

**Criterios de aceptación**

1. **Dado** una reserva pendiente, **cuando** cambio la hora y el número de personas y el espacio está disponible, **entonces** se guarda, queda en el historial y veo el mensaje de confirmación.
2. **Dado** que el nuevo horario no está disponible, **cuando** guardo, **entonces** el sistema informa que la modificación no fue posible.

- **Interfaz:** Reservas › Editar
- **API:** `PUT /api/v1/reservas/:id`

### HU-85 — Cambiar el estado de una reserva

**Como** Administrador o Empleado  
**quiero** confirmar, cancelar o marcar cumplida una reserva  
**para** reflejar su situación real

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 2 pts | Matriz Excel | HU_108 (5 CA) | RF-RES-07, RF-RES-08 |

**Criterios de aceptación**

1. **Dado** una reserva pendiente, **cuando** la confirmo, **entonces** queda confirmada con fecha y hora del cambio y el cliente recibe un correo de confirmación.
2. **Dado** una reserva confirmada, **cuando** el cliente registra su ingreso esa noche, **entonces** pasa a cumplida automáticamente.

- **Interfaz:** Reservas › Detalle (Cambiar estado)
- **API:** `PATCH /api/v1/reservas/:id/estado`

### HU-86 — Eliminar una reserva

**Como** Administrador o Empleado  
**quiero** eliminar reservas canceladas o erróneas  
**para** depurar el registro

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Baja | 2 pts | Matriz Excel (HU_109 y HU_114) | HU_109 (5 CA), HU_114 (4 CA) | RF-RES-09 |

**Criterios de aceptación**

1. **Dado** una reserva cancelada, **cuando** la elimino y confirmo, **entonces** desaparece de la lista y la eliminación queda en el historial con usuario y fecha.
2. **Dado** una reserva confirmada o cumplida, **cuando** intento eliminarla, **entonces** el sistema lo impide.

- **Interfaz:** Reservas (Eliminar)
- **API:** `DELETE /api/v1/reservas/:id`

### HU-87 — Generar el reporte de reservas

**Como** Administrador o Empleado  
**quiero** generar reportes de reservas por periodo, tipo y cliente  
**para** analizar el rendimiento del negocio

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_110 y HU_115) | HU_110 (5 CA), HU_115 (4 CA) | RF-RES-10 |

**Criterios de aceptación**

1. **Dado** el periodo mensual y el tipo sala VIP, **cuando** genero el reporte, **entonces** veo número de reservas por estado, ocupación por espacio, ingresos por servicios adicionales y el detalle, en PDF o CSV.

- **Interfaz:** Reservas › Reporte
- **API:** `GET /api/v1/reportes/reservas?periodo&desde&hasta&tipo&cliente&formato`

### HU-88 — Reservar como cliente

**Como** Cliente  
**quiero** reservar una mesa o sala VIP desde mi celular  
**para** asegurar mi lugar sin llamar

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Inferida (ficha — opciones para reservar mesas y mejorar la experiencia del cliente) | Inferida de la ficha del proyecto | RF-RES-11, RF-RES-12 |

**Criterios de aceptación**

1. **Dado** que inicié sesión, **cuando** elijo fecha, hora, tipo y número de personas, **entonces** veo los espacios disponibles con su consumo mínimo y al elegir uno la reserva queda pendiente.
2. **Dado** mi reserva pendiente, **cuando** la discoteca la confirma, **entonces** recibo un correo y la veo confirmada en Mis reservas.
3. **Dado** mi reserva pendiente o confirmada, **cuando** la cancelo con al menos 2 horas de anticipación, **entonces** queda cancelada.

- **Interfaz:** Portal del cliente › Mis reservas
- **API:** `GET /api/v1/clientes/me/reservas`; `POST /api/v1/clientes/me/reservas`; `PATCH /api/v1/clientes/me/reservas/:id/cancelacion`

## Épica 14: Eventos y fichas técnicas

> Proceso: Eventos · Spec: `specs/014-eventos/spec.md` · SRS §4.14 · Actores: Administrador, Empleado

Gestiona los eventos (temáticos de la discoteca y fiestas privadas de clientes) y su ficha técnica, que planifica temática, franja horaria, invitados y servicios. Es el par padre-hijo `/eventos` → `/fichas-tecnicas`.

### HU-89 — Registrar un evento

**Como** Administrador o Empleado  
**quiero** registrar un evento con nombre, tipo, fechas, ubicación, capacidad, imagen y adjuntos  
**para** gestionar la agenda de eventos de la discoteca

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel (HU_116 y HU_120) | HU_116 (6 CA), HU_120 (6 CA) | RF-EVE-01, RF-EVE-02, RF-EVE-03 |

**Criterios de aceptación**

1. **Dado** el nombre «Noche de los 80», tipo temático, descripción, inicio sábado 9:00 p. m., fin domingo 3:00 a. m., capacidad 300 e imagen JPG, **cuando** guardo, **entonces** el evento queda programado con código único y aparece en la lista.
2. **Dado** una fiesta privada, **cuando** la registro, **entonces** debo asociar el cliente que la solicita.
3. **Dado** un campo obligatorio vacío, una fecha de fin anterior al inicio o una capacidad mayor al aforo, **cuando** guardo, **entonces** el sistema lo señala (422).

- **Datos:** nombre (3–100); tipo; fecha_inicio < fecha_fin; capacidad_maxima (1–aforo); imagen (JPG/PNG/WEBP ≤ 2 MB); id_cliente (si fiesta_privada)
- **Interfaz:** Eventos › Nuevo evento
- **API:** `POST /api/v1/eventos`; `POST /api/v1/eventos/:id/adjuntos`

### HU-90 — Consultar eventos

**Como** Administrador o Empleado  
**quiero** buscar eventos y ver su información detallada  
**para** tener acceso a la agenda y sus detalles

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 2 pts | Matriz Excel (HU_117 y HU_121) | HU_117 (5 CA), HU_121 (4 CA) | RF-EVE-04 |

**Criterios de aceptación**

1. **Dado** la lista paginada de eventos, **cuando** busco por nombre, código, fecha, ubicación o tipo y filtro por estado, **entonces** veo los coincidentes.
2. **Dado** un evento, **cuando** lo selecciono, **entonces** veo nombre, fechas, ubicación, descripción, capacidad, estado, imagen, adjuntos, ficha técnica y asistentes registrados.

- **Interfaz:** Eventos (listado y detalle)
- **API:** `GET /api/v1/eventos?q&tipo&estado&desde&hasta&page&limit`; `GET /api/v1/eventos/:id`

### HU-91 — Actualizar un evento

**Como** Administrador o Empleado  
**quiero** modificar la información de un evento registrado  
**para** mantenerla correcta

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 2 pts | Matriz Excel (HU_118 y HU_122) | HU_118 (5 CA), HU_122 (4 CA) | RF-EVE-05, RF-EVE-06 |

**Criterios de aceptación**

1. **Dado** un evento programado, **cuando** cambio su descripción y hora de fin y guardo, **entonces** se reflejan en la lista y veo el mensaje de confirmación.
2. **Dado** un evento en curso, **cuando** amplío su hora de fin, **entonces** se permite; si intento adelantar el inicio, entonces el sistema lo impide.
3. **Dado** el campo código, **cuando** edito, **entonces** no es modificable.

- **Interfaz:** Eventos › Editar
- **API:** `PUT /api/v1/eventos/:id`

### HU-92 — Cambiar el estado de un evento

**Como** Empleado o Administrador  
**quiero** cambiar el estado de un evento  
**para** reflejar su progreso

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel | HU_123 (5 CA) | RF-EVE-07, RF-EVE-08 |

**Criterios de aceptación**

1. **Dado** un evento programado, **cuando** lo paso a en curso, **entonces** el cambio se registra con fecha y hora y se muestra el estado actual.
2. **Dado** un evento programado, **cuando** lo cancelo con motivo, **entonces** su ficha técnica y sus actividades pendientes se cancelan y se notifica por correo a los empleados y clientes asociados.

- **Interfaz:** Eventos › Detalle (Cambiar estado)
- **API:** `PATCH /api/v1/eventos/:id/estado`; `DELETE /api/v1/eventos/:id (cancelación lógica)`

### HU-93 — Generar el reporte de eventos

**Como** Administrador o Empleado  
**quiero** generar reportes de eventos por periodo, tipo y estado  
**para** analizarlos y hacerles seguimiento

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_119 y HU_124) | HU_119 (5 CA), HU_124 (5 CA) | RF-EVE-09 |

**Criterios de aceptación**

1. **Dado** un periodo, **cuando** genero el reporte, **entonces** veo cantidad de eventos por tipo, temática y estado y el listado de asistentes de un evento, con fecha y hora de generación, en PDF o CSV.

- **Interfaz:** Eventos › Reporte
- **API:** `GET /api/v1/reportes/eventos?desde&hasta&tipo&estado&formato`; `GET /api/v1/eventos/:id/asistentes?formato`

### HU-94 — Registrar la ficha técnica de un evento

**Como** Administrador o Empleado  
**quiero** registrar la ficha técnica de un evento con temática, franja horaria, invitados y servicios  
**para** planificar los recursos del evento

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 5 pts | Matriz Excel (HU_125 y HU_130) | HU_125 (7 CA), HU_130 (7 CA) | RF-EVE-10, RF-EVE-11 |

**Criterios de aceptación**

1. **Dado** el evento «Noche de los 80» sin ficha, **cuando** registro la temática «Retro», franja de 9:00 p. m. a 3:00 a. m., 250 invitados y los servicios Sonido ×1, Iluminación ×1 y Decoración ×1, **entonces** la ficha queda pendiente y veo el mensaje de confirmación.
2. **Dado** que la temática no existe en la lista, **cuando** la escribo, **entonces** puedo crearla en el mismo formulario.
3. **Dado** invitados negativos o mayores que la capacidad del evento, una franja fuera de las fechas del evento o un evento que ya tiene ficha, **cuando** guardo, **entonces** el sistema lo impide.

- **Datos:** id_evento (sin ficha); id_tematica o nombre nuevo; franja_inicio < franja_fin (dentro del evento); cantidad_invitados (0–capacidad); servicios (≥1): cantidad (> 0)
- **Interfaz:** Eventos › Detalle › Ficha técnica
- **API:** `POST /api/v1/fichas-tecnicas`; `GET /api/v1/tematicas`; `POST /api/v1/tematicas`

### HU-95 — Consultar fichas técnicas

**Como** Administrador o Empleado  
**quiero** buscar fichas técnicas y ver su información  
**para** revisar los detalles de cada evento

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 2 pts | Matriz Excel (HU_126 y HU_131) | HU_126 (3 CA), HU_131 (3 CA) | RF-EVE-12 |

**Criterios de aceptación**

1. **Dado** el buscador, **cuando** busco por id, evento, temática, franja horaria o rango de fechas, **entonces** veo las fichas coincidentes paginadas.
2. **Dado** una ficha, **cuando** la abro, **entonces** veo evento, temática, franja, invitados, servicios con cantidades, estado e historial.

- **Interfaz:** Eventos › Fichas técnicas (listado y detalle)
- **API:** `GET /api/v1/fichas-tecnicas?q&evento&tematica&desde&hasta&estado&page&limit`; `GET /api/v1/fichas-tecnicas/:id`

### HU-96 — Actualizar una ficha técnica

**Como** Administrador o Empleado  
**quiero** modificar temática, franja, invitados y servicios de una ficha  
**para** ajustar la planificación del evento

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel (HU_127 y HU_132) | HU_127 (4 CA), HU_132 (5 CA) | RF-EVE-13 |

**Criterios de aceptación**

1. **Dado** una ficha pendiente o en proceso, **cuando** cambio los invitados a 280 y agrego Catering ×1, **entonces** se guarda, queda en el historial y veo el mensaje de confirmación.
2. **Dado** una ficha completada o cancelada, **cuando** intento modificarla, **entonces** el sistema lo impide.

- **Interfaz:** Eventos › Ficha técnica › Editar
- **API:** `PUT /api/v1/fichas-tecnicas/:id`

### HU-97 — Cambiar el estado de una ficha técnica

**Como** Administrador o Empleado  
**quiero** cambiar el estado de la ficha con una nota  
**para** reflejar el progreso de la planificación

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_128 y HU_133) | HU_128 (5 CA), HU_133 (5 CA) | RF-EVE-14, RF-EVE-15 |

**Criterios de aceptación**

1. **Dado** una ficha en proceso con todos sus servicios registrados, **cuando** la paso a completado con una nota, **entonces** el cambio queda con fecha y hora.
2. **Dado** una ficha con servicios sin registrar, **cuando** intento completarla, **entonces** el sistema lo impide indicando los servicios pendientes.

- **Interfaz:** Eventos › Ficha técnica (Cambiar estado)
- **API:** `PATCH /api/v1/fichas-tecnicas/:id/estado`; `PATCH /api/v1/fichas-tecnicas/:id/servicios/:idServicio`; `DELETE /api/v1/fichas-tecnicas/:id (cancelación lógica)`

### HU-98 — Generar el reporte de fichas técnicas por temática

**Como** Administrador o Empleado  
**quiero** generar reportes de fichas técnicas agrupadas por temática  
**para** analizar la demanda de eventos

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_129 y HU_134) | HU_129 (6 CA), HU_134 (5 CA) | RF-EVE-16 |

**Criterios de aceptación**

1. **Dado** un rango de fechas, **cuando** genero el reporte, **entonces** veo la cantidad de eventos por temática y un resumen de cada evento (fecha, hora, invitados, servicios), con fecha y hora de generación, en PDF o CSV.

- **Interfaz:** Eventos › Fichas técnicas › Reporte
- **API:** `GET /api/v1/reportes/fichas-tecnicas?desde&hasta&formato`

## Épica 15: Agenda de eventos

> Proceso: Eventos · Spec: `specs/015-agenda-eventos/spec.md` · SRS §4.15 · Actores: Administrador, Empleado, Cliente

Organiza las actividades de cada evento con sus responsables y servicios, envía recordatorios por correo a empleados y clientes y permite a los clientes solicitar y seguir sus fiestas privadas.

### HU-99 — Programar una actividad en la agenda de eventos

**Como** Administrador o Empleado  
**quiero** registrar una actividad de un evento con fechas, título, descripción, ubicación y adjuntos  
**para** planificar y gestionar todo lo que el evento requiere

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 3 pts | Matriz Excel (HU_135 y HU_142) | HU_135 (5 CA), HU_142 (6 CA) | RF-AGV-01 |

**Criterios de aceptación**

1. **Dado** el evento «Noche de los 80», **cuando** registro la actividad «Montaje de luces» tipo montaje el sábado de 4:00 p. m. a 7:00 p. m., **entonces** queda pendiente con fecha y hora de creación y veo el mensaje de confirmación.
2. **Dado** campos obligatorios vacíos o un fin anterior al inicio, **cuando** guardo, **entonces** el sistema lo señala.

- **Interfaz:** Eventos › Agenda › Nueva actividad
- **API:** `POST /api/v1/agenda-eventos`

### HU-100 — Consultar la agenda de eventos

**Como** Administrador o Empleado  
**quiero** ver la agenda de eventos con filtros  
**para** conocer lo programado

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_136 y HU_143) | HU_136 (5 CA), HU_143 (5 CA) | RF-AGV-02 |

**Criterios de aceptación**

1. **Dado** la agenda, **cuando** filtro por fecha, evento, empleado, servicio o estado o busco una palabra en título o descripción, **entonces** veo las actividades con fecha, hora, título, descripción y estado, paginadas.

- **Interfaz:** Eventos › Agenda (calendario)
- **API:** `GET /api/v1/agenda-eventos?evento&empleado&servicio&estado&desde&hasta&q&page&limit`; `GET /api/v1/agenda-eventos/:id`

### HU-101 — Actualizar una actividad de evento

**Como** Administrador o Empleado  
**quiero** modificar los datos y responsables de una actividad  
**para** mantener la agenda actualizada

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_137 y HU_144) | HU_137 (5 CA), HU_144 (4 CA) | RF-AGV-03 |

**Criterios de aceptación**

1. **Dado** una actividad, **cuando** cambio su hora y los empleados asignados, **entonces** se guarda con fecha, hora y usuario de la modificación y las agendas de los empleados se actualizan.
2. **Dado** un fin anterior al inicio, **cuando** guardo, **entonces** el sistema lo impide.

- **Interfaz:** Eventos › Agenda › Editar actividad
- **API:** `PUT /api/v1/agenda-eventos/:id`

### HU-102 — Cambiar el estado de una actividad de evento

**Como** Administrador o Empleado  
**quiero** cambiar el estado de una actividad  
**para** reflejar su progreso

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 1 pts | Matriz Excel (HU_138 y HU_145) | HU_138 (4 CA), HU_145 (3 CA) | RF-AGV-04 |

**Criterios de aceptación**

1. **Dado** una actividad pendiente, **cuando** la paso a en progreso, **entonces** el cambio se registra con fecha y hora.
2. **Dado** una actividad completada, **cuando** intento devolverla a pendiente, **entonces** el flujo no lo permite.

- **Interfaz:** Eventos › Agenda (Cambiar estado)
- **API:** `PATCH /api/v1/agenda-eventos/:id/estado`

### HU-103 — Asignar empleados y servicios a una actividad

**Como** Administrador  
**quiero** asociar empleados y servicios a cada actividad del evento  
**para** asignar responsabilidades

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel | HU_139 (4 CA) | RF-AGV-05, RF-AGV-06 |

**Criterios de aceptación**

1. **Dado** una actividad, **cuando** selecciono dos meseros y el servicio Catering, **entonces** la asociación se guarda, se muestra en la actividad y se crea la actividad en la agenda de cada empleado.
2. **Dado** un empleado con otra actividad a la misma hora, **cuando** lo asigno, **entonces** el sistema lo impide indicando el cruce.

- **Interfaz:** Eventos › Agenda › Asignar
- **API:** `PUT /api/v1/agenda-eventos/:id/asignaciones`

### HU-104 — Generar el reporte de agenda de eventos

**Como** Administrador o Empleado  
**quiero** generar reportes de la agenda de eventos por empleado, servicio, fecha y estado  
**para** resumir las actividades programadas

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Baja | 2 pts | Matriz Excel (HU_140 y HU_146) | HU_140 (4 CA), HU_146 (4 CA) | RF-AGV-07 |

**Criterios de aceptación**

1. **Dado** el criterio «por empleado» y un mes, **cuando** genero el reporte, **entonces** descargo un PDF o CSV con las actividades de cada empleado.

- **Interfaz:** Eventos › Agenda › Reporte
- **API:** `GET /api/v1/reportes/agenda-eventos?agrupar&desde&hasta&empleado&servicio&estado&formato`

### HU-105 — Enviar notificaciones de eventos por correo

**Como** Administrador o Empleado  
**quiero** que empleados y clientes asociados reciban correos sobre fechas clave, reuniones y plazos del evento  
**para** que estén al tanto de lo programado

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 3 pts | Matriz Excel (HU_141 y HU_147) | HU_141 (5 CA), HU_147 (4 CA) | RF-AGV-08, RF-AGV-09 |

**Criterios de aceptación**

1. **Dado** una actividad con empleados asignados, **cuando** faltan 24 horas para su inicio, **entonces** cada empleado recibe un correo con título, fecha, hora, ubicación y descripción.
2. **Dado** el tipo de actividad «reunión», **cuando** configuro la antelación en 48 horas, **entonces** los recordatorios de ese tipo se envían con esa antelación.
3. **Dado** una dirección inválida, **cuando** se envía, **entonces** el envío queda fallido con el motivo y los demás continúan.

- **Interfaz:** Configuración › Recordatorios de eventos
- **API:** `GET /api/v1/configuracion/recordatorios-eventos`; `PUT /api/v1/configuracion/recordatorios-eventos`; `GET /api/v1/agenda-eventos/:id/notificaciones`; `(tarea programada cada 15 minutos)`

### HU-106 — Solicitar una fiesta privada

**Como** Cliente  
**quiero** solicitar una fiesta privada con fecha, horario, descripción, invitados y servicios  
**para** programar mi celebración en la discoteca

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Excel + completada (HU_148 pide registrar eventos con empleados y servicios; el cliente solicita y la discoteca asigna empleados) | HU_148 (5 CA) | RF-AGV-10, RF-AGV-11 |

**Criterios de aceptación**

1. **Dado** que inicié sesión, **cuando** solicito una fiesta privada para el 20 de diciembre de 9:00 p. m. a 2:00 a. m. con 40 invitados y los servicios Decoración y DJ, **entonces** se crea un evento tipo fiesta privada en estado solicitado y veo el mensaje de confirmación.
2. **Dado** una fecha de fin anterior a la de inicio o una fecha pasada, **cuando** envío la solicitud, **entonces** el sistema la rechaza.
3. **Dado** mi solicitud, **cuando** la discoteca la aprueba, **entonces** pasa a programado y recibo un correo.

- **Interfaz:** Portal del cliente › Mis eventos › Solicitar fiesta privada
- **API:** `POST /api/v1/clientes/me/eventos`

### HU-107 — Consultar mis eventos y la cartelera

**Como** Cliente  
**quiero** ver los eventos temáticos programados y mis fiestas privadas  
**para** conocer la programación y el detalle de mis eventos

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel | HU_149 (4 CA) | RF-AGV-12 |

**Criterios de aceptación**

1. **Dado** la cartelera, **cuando** la abro, **entonces** veo los eventos temáticos programados con nombre, fecha, hora, imagen y descripción, filtrables por fecha.
2. **Dado** Mis eventos, **cuando** abro una fiesta privada, **entonces** veo descripción, ubicación, servicios, estado y empleados asignados.

- **Interfaz:** Cartelera (pública); Portal del cliente › Mis eventos
- **API:** `GET /api/v1/cartelera?desde&hasta`; `GET /api/v1/clientes/me/eventos`

### HU-108 — Modificar mi solicitud de fiesta privada

**Como** Cliente  
**quiero** modificar los datos de mi fiesta privada antes de que sea aprobada  
**para** ajustar los detalles

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel | HU_150 (5 CA) | RF-AGV-13 |

**Criterios de aceptación**

1. **Dado** mi solicitud en estado solicitado, **cuando** cambio la hora y los invitados, **entonces** veo los datos actuales antes de editar y al guardar veo el mensaje de confirmación.
2. **Dado** una fiesta ya programada, **cuando** intento modificarla, **entonces** el sistema me indica que debo contactar a la discoteca.

- **Interfaz:** Portal del cliente › Mis eventos › Editar
- **API:** `PUT /api/v1/clientes/me/eventos/:id`

### HU-109 — Seguir y cancelar mi solicitud

**Como** Cliente  
**quiero** ver el estado de mi fiesta privada y cancelarla si lo necesito  
**para** conocer su progreso

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 1 pts | Excel + completada (el cliente ve el estado y solo puede cancelar; los demás cambios los hace la discoteca) | HU_151 (4 CA) | RF-AGV-14 |

**Criterios de aceptación**

1. **Dado** mi fiesta, **cuando** la abro, **entonces** veo su estado actual y el historial de cambios con fecha y hora.
2. **Dado** mi solicitud en estado solicitado, **cuando** la cancelo, **entonces** queda cancelada.

- **Interfaz:** Portal del cliente › Mis eventos › Detalle
- **API:** `GET /api/v1/clientes/me/eventos/:id`; `PATCH /api/v1/clientes/me/eventos/:id/cancelacion`

### HU-110 — Elegir los servicios de mi evento

**Como** Cliente  
**quiero** seleccionar y cambiar los servicios de mi fiesta privada  
**para** definir lo que necesito

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Excel + completada (el cliente elige servicios; los empleados los asigna la discoteca) | HU_152 (4 CA) | RF-AGV-15 |

**Criterios de aceptación**

1. **Dado** mi solicitud, **cuando** selecciono servicios de la lista con su cantidad, **entonces** veo los servicios asociados y el valor estimado.
2. **Dado** que la solicitud ya está programada, **cuando** intento cambiar servicios, **entonces** el sistema no lo permite.

- **Interfaz:** Portal del cliente › Mis eventos › Servicios
- **API:** `PUT /api/v1/clientes/me/eventos/:id/servicios`

## Épica 16: Pedidos

> Proceso: Ventas · Spec: `specs/016-pedidos/spec.md` · SRS §4.16 · Actores: Administrador, Empleado, Cliente

Gestiona los pedidos de consumo en mesas, salas VIP y barra: productos y servicios, mesero, cliente, estados con historial y descuento de existencias al entregar. Los clientes pueden hacer pre-pedidos asociados a su reserva.

### HU-111 — Registrar un pedido

**Como** Administrador o Empleado  
**quiero** registrar un pedido con ubicación, mesero, cliente, productos, cantidades y método de pago  
**para** iniciar su atención y cobro

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 5 pts | Matriz Excel (HU_183 y HU_189; la dirección de envío se reemplaza por la ubicación en el local, TBD-09) | HU_183 (5 CA), HU_189 (8 CA) | RF-PED-01, RF-PED-02 |

**Criterios de aceptación**

1. **Dado** la mesa 12, el mesero, dos productos con cantidad y el método de pago previsto, **cuando** registro, **entonces** el pedido queda en «pendiente de confirmación» con número único, fecha y hora automáticas y veo su resumen.
2. **Dado** un producto sin existencia suficiente o inactivo, **cuando** lo agrego, **entonces** el sistema lo impide mostrando la existencia disponible.
3. **Dado** campos obligatorios vacíos, **cuando** registro, **entonces** veo los errores.

- **Interfaz:** Pedidos › Nuevo pedido (vista móvil para meseros)
- **API:** `POST /api/v1/pedidos`

### HU-112 — Consultar pedidos y su estado

**Como** Administrador o Empleado  
**quiero** buscar pedidos y ver su estado e historial  
**para** rastrear su progreso

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 2 pts | Matriz Excel (HU_184 y HU_190) | HU_184 (6 CA), HU_190 (3 CA) | RF-PED-03 |

**Criterios de aceptación**

1. **Dado** el buscador, **cuando** busco por número, fecha, estado, cliente o ubicación, **entonces** veo los pedidos con su estado actual.
2. **Dado** un pedido, **cuando** abro su detalle, **entonces** veo productos, cliente, ubicación, mesero, total y la fecha y hora de cada cambio de estado.

- **Interfaz:** Pedidos (tablero por estado y detalle)
- **API:** `GET /api/v1/pedidos?q&estado&cliente&ubicacion&desde&hasta&page&limit`; `GET /api/v1/pedidos/:id`

### HU-113 — Actualizar un pedido

**Como** Administrador o Empleado  
**quiero** agregar o quitar productos, cambiar cantidades y método de pago de un pedido  
**para** ajustarlo a lo que pide el cliente

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel (HU_185 y HU_191) | HU_185 (6 CA), HU_191 (7 CA) | RF-PED-04 |

**Criterios de aceptación**

1. **Dado** un pedido en preparación, **cuando** agrego un producto y cambio una cantidad, **entonces** el total se recalcula y se registran fecha, hora y empleado de la modificación.
2. **Dado** un pedido entregado, pagado o cancelado, **cuando** intento modificarlo, **entonces** el sistema lo impide.

- **Interfaz:** Pedidos › Editar
- **API:** `PUT /api/v1/pedidos/:id`

### HU-114 — Cambiar el estado de un pedido

**Como** Administrador o Empleado  
**quiero** avanzar el pedido por sus estados con una nota  
**para** gestionar el flujo de atención

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel (HU_186 y HU_192) | HU_186 (6 CA), HU_192 (5 CA) | RF-PED-05, RF-PED-06 |

**Criterios de aceptación**

1. **Dado** un pedido en preparación, **cuando** lo marco entregado, **entonces** se descuentan las existencias, el cambio queda con fecha, hora, empleado y nota y veo la confirmación.
2. **Dado** que soy Empleado, **cuando** intento cancelar un pedido en preparación, **entonces** el sistema lo impide (solo Administrador).

- **Interfaz:** Pedidos (Cambiar estado)
- **API:** `PATCH /api/v1/pedidos/:id/estado`

### HU-115 — Asociar un cliente a un pedido

**Como** Administrador o Empleado  
**quiero** vincular un cliente registrado a un pedido  
**para** tener su información y acumularle puntos

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 1 pts | Matriz Excel (HU_187 y HU_193) | HU_187 (5 CA), HU_193 (4 CA) | RF-PED-07 |

**Criterios de aceptación**

1. **Dado** un pedido, **cuando** busco al cliente por nombre, documento o escaneando su QR y lo selecciono, **entonces** queda asociado con fecha y hora y veo la confirmación.
2. **Dado** un cliente inactivo o inexistente, **cuando** intento asociarlo, **entonces** el sistema lo impide.

- **Interfaz:** Pedidos › Detalle (Asociar cliente)
- **API:** `PATCH /api/v1/pedidos/:id/cliente`

### HU-116 — Generar el reporte de pedidos

**Como** Administrador o Empleado  
**quiero** generar reportes de pedidos por fecha, estado, cliente y producto  
**para** analizar el proceso de pedidos

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_188 y HU_194) | HU_188 (5 CA), HU_194 (4 CA) | RF-PED-08 |

**Criterios de aceptación**

1. **Dado** un rango de fechas, **cuando** genero el reporte, **entonces** veo cantidad de pedidos por estado, total vendido, productos más pedidos y tiempo promedio de entrega, en PDF o CSV.

- **Interfaz:** Pedidos › Reporte
- **API:** `GET /api/v1/reportes/pedidos?desde&hasta&estado&cliente&producto&formato`

### HU-117 — Hacer un pre-pedido como cliente

**Como** Cliente  
**quiero** pedir con anticipación productos o servicios para mi reserva  
**para** tener todo listo al llegar

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 3 pts | Excel + completada (el pedido del cliente se asocia a su reserva confirmada, sin dirección de envío) | HU_195 (6 CA) | RF-PED-09 |

**Criterios de aceptación**

1. **Dado** mi reserva confirmada, **cuando** agrego dos botellas y elijo el método de pago previsto, **entonces** se genera un número de pedido en estado pendiente de confirmación y recibo un correo de confirmación.
2. **Dado** que no tengo reservas confirmadas, **cuando** intento hacer un pre-pedido, **entonces** el sistema me lo indica.

- **Interfaz:** Portal del cliente › Mis reservas › Pre-pedido
- **API:** `POST /api/v1/clientes/me/pedidos`

### HU-118 — Consultar mis pedidos

**Como** Cliente  
**quiero** ver mis pedidos y su estado  
**para** hacer seguimiento

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 1 pts | Matriz Excel | HU_196 (4 CA) | RF-PED-10 |

**Criterios de aceptación**

1. **Dado** Mis pedidos, **cuando** busco por número o rango de fechas, **entonces** veo cada pedido con productos, cantidades, fecha, ubicación y estado.

- **Interfaz:** Portal del cliente › Mis pedidos
- **API:** `GET /api/v1/clientes/me/pedidos?q&desde&hasta`

### HU-119 — Modificar mi pedido

**Como** Cliente  
**quiero** cambiar mi pre-pedido antes de que se prepare  
**para** ajustarlo

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Baja | 2 pts | Matriz Excel | HU_197 (5 CA) | RF-PED-11 |

**Criterios de aceptación**

1. **Dado** mi pedido pendiente de confirmación, **cuando** cambio cantidades o el método de pago, **entonces** se valida, se guarda y recibo un correo de confirmación.
2. **Dado** un pedido en preparación, **cuando** intento modificarlo, **entonces** veo que ya no es posible.

- **Interfaz:** Portal del cliente › Mis pedidos › Editar
- **API:** `PUT /api/v1/clientes/me/pedidos/:id`

## Épica 17: Ventas

> Proceso: Ventas · Spec: `specs/017-ventas/spec.md` · SRS §4.17 · Actores: Administrador, Empleado

Registra las ventas (venta directa en barra o cobro de un pedido entregado) con descuentos VIP, canjes e impuestos, descuenta existencias, acumula puntos y emite el comprobante de pago numerado.

### HU-120 — Registrar una venta

**Como** Administrador o Empleado  
**quiero** registrar una venta con productos, cantidades, precios, descuentos, impuestos y método de pago  
**para** llevar el control de las transacciones y cobrar sin errores

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 5 pts | Matriz Excel (HU_153 y HU_158) | HU_153 (7 CA), HU_158 (6 CA) | RF-VEN-01, RF-VEN-02, RF-VEN-03 |

**Criterios de aceptación**

1. **Dado** dos productos buscados por nombre o código con cantidades mayores que cero y pago en efectivo, **cuando** registro la venta sin cliente, **entonces** queda pagada como consumidor final con número de comprobante, fecha y hora automáticas, las existencias se descuentan y veo el mensaje de confirmación.
2. **Dado** un cliente VIP identificado con su QR, **cuando** registro su venta, **entonces** se aplica el descuento de su nivel y se le acumulan los puntos.
3. **Dado** una cantidad 0 o un producto sin existencia, **cuando** registro, **entonces** veo el mensaje de error.

- **Datos:** productos (≥1): cantidad (> 0), precio (> 0); metodo_pago; id_cliente (opcional, activo, mayor de edad si hay alcohol)
- **Interfaz:** Ventas › Nueva venta (caja / barra)
- **API:** `POST /api/v1/ventas`

### HU-121 — Cobrar un pedido

**Como** Empleado o Administrador  
**quiero** convertir un pedido entregado en venta y cobrarlo  
**para** cerrar la cuenta de una mesa sin volver a digitar productos

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Inferida (ficha — cobros manuales lentos y con errores; los pedidos se cobran como ventas) | Inferida de la ficha del proyecto | RF-VEN-04, RF-VEN-05 |

**Criterios de aceptación**

1. **Dado** el pedido entregado de la mesa 12, **cuando** pulso «Cobrar» y registro el pago con tarjeta, **entonces** se crea la venta pagada con sus ítems, el pedido pasa a pagado y se emite el comprobante.
2. **Dado** una mesa con consumo mínimo de reserva no alcanzado, **cuando** cobro, **entonces** el sistema muestra la diferencia para que se agregue o se cobre.

- **Interfaz:** Pedidos › Detalle (Cobrar)
- **API:** `POST /api/v1/pedidos/:id/cobro`

### HU-122 — Consultar ventas

**Como** Administrador o Empleado  
**quiero** buscar ventas y ver su detalle  
**para** revisar las transacciones

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 2 pts | Matriz Excel (HU_154 y HU_159) | HU_154 (4 CA), HU_159 (5 CA) | RF-VEN-06 |

**Criterios de aceptación**

1. **Dado** el historial de ventas, **cuando** filtro por rango de fechas, cliente y producto, **entonces** veo número, fecha, cliente, total, método de pago y estado, ordenables.
2. **Dado** una venta, **cuando** abro su detalle, **entonces** veo productos, cantidades, precios, descuentos, impuestos, método de pago, estado y puedo exportar la lista a CSV o PDF.

- **Interfaz:** Ventas (historial y detalle)
- **API:** `GET /api/v1/ventas?q&desde&hasta&cliente&producto&estado&sort&page&limit&formato`; `GET /api/v1/ventas/:id`

### HU-123 — Cambiar el estado de una venta

**Como** Administrador o Empleado  
**quiero** cambiar el estado de una venta a un estado válido  
**para** reflejar su progreso o anularla

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel (HU_155 y HU_160) | HU_155 (6 CA), HU_160 (6 CA) | RF-VEN-07, RF-VEN-08 |

**Criterios de aceptación**

1. **Dado** una venta pendiente de pago, **cuando** la marco pagada, **entonces** se registra fecha y hora, se descuentan existencias y se otorgan puntos.
2. **Dado** una venta pagada, **cuando** el Administrador la anula con motivo, **entonces** se devuelven las existencias, se revierten los puntos y el cambio queda en el historial.
3. **Dado** que soy Empleado, **cuando** intento anular una venta pagada, **entonces** el sistema lo impide.

- **Interfaz:** Ventas › Detalle (Cambiar estado)
- **API:** `PATCH /api/v1/ventas/:id/estado`

### HU-124 — Generar el comprobante de pago

**Como** Administrador o Empleado  
**quiero** generar el comprobante de pago de cada venta  
**para** entregar al cliente un registro válido de la transacción

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel (HU_156 y HU_161) | HU_156 (5 CA), HU_161 (5 CA) | RF-VEN-09, RF-VEN-10 |

**Criterios de aceptación**

1. **Dado** una venta pagada, **cuando** genero el comprobante, **entonces** obtengo en 3 segundos o menos un PDF imprimible con número único, datos de la empresa, fecha, cliente, productos, cantidades, precios, descuentos, impuestos, total y puntos acumulados.
2. **Dado** varias ventas seleccionadas, **cuando** genero sus comprobantes, **entonces** obtengo un solo PDF con todos.
3. **Dado** un cliente con correo, **cuando** pulso «Enviar», **entonces** recibe el comprobante por correo.

- **Interfaz:** Ventas › Detalle (Comprobante)
- **API:** `GET /api/v1/ventas/:id/comprobante.pdf`; `POST /api/v1/ventas/comprobantes (lote)`; `POST /api/v1/ventas/:id/comprobante/envio`

### HU-125 — Generar el reporte de ventas

**Como** Administrador o Empleado  
**quiero** generar reportes de ventas por periodo con gráficos y filtros  
**para** analizar las ventas

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 3 pts | Matriz Excel (HU_157 y HU_162) | HU_157 (4 CA), HU_162 (6 CA) | RF-VEN-11 |

**Criterios de aceptación**

1. **Dado** el periodo semanal y el filtro de método de pago, **cuando** genero el reporte, **entonces** veo total vendido, cantidad de ventas, ticket promedio y productos más vendidos en tablas y gráficos, exportable a CSV, Excel o PDF.

- **Interfaz:** Ventas › Reporte
- **API:** `GET /api/v1/reportes/ventas?periodo&desde&hasta&cliente&producto&metodo&formato`

## Épica 18: Notificaciones

> Proceso: Ventas · Spec: `specs/018-notificaciones/spec.md` · SRS §4.18 · Actores: Administrador, Empleado, Cliente

Envía correos a los clientes sobre promociones, eventos especiales y cumpleaños, con plantillas reutilizables, listas segmentadas, envíos programados y recurrentes, monitoreo y baja de suscripción.

### HU-126 — Programar una campaña de promociones

**Como** Administrador o Empleado  
**quiero** programar el envío de promociones por correo a un grupo de clientes, único o recurrente  
**para** aumentar las ventas

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 5 pts | Matriz Excel (HU_198 y HU_203) | HU_198 (5 CA), HU_203 (8 CA) | RF-NOT-01, RF-NOT-02, RF-NOT-03 |

**Criterios de aceptación**

1. **Dado** asunto, cuerpo, adjunto, la lista «Frecuentes» y el envío el viernes a las 4:00 p. m. con recurrencia semanal, **cuando** programo la campaña, **entonces** queda programada y se envía cada viernes a la hora definida.
2. **Dado** el envío, **cuando** termina, **entonces** cada correo queda registrado con fecha, hora, destinatario y estado (enviado, fallido o rebotado con la razón).
3. **Dado** un cliente que se dio de baja, **cuando** se envía la campaña, **entonces** no lo recibe.

- **Interfaz:** Notificaciones › Nueva campaña
- **API:** `POST /api/v1/campanas`; `PUT /api/v1/campanas/:id`; `PATCH /api/v1/campanas/:id/estado`; `(tarea programada cada minuto)`

### HU-127 — Notificar eventos especiales

**Como** Administrador  
**quiero** enviar un correo sobre un evento especial con imágenes o video a los clientes objetivo  
**para** informarles las novedades

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 3 pts | Matriz Excel | HU_199 (5 CA) | RF-NOT-04 |

**Criterios de aceptación**

1. **Dado** el evento «Noche de los 80», **cuando** creo la notificación con su imagen y la lista «VIP», **entonces** el correo incluye nombre, fecha, hora e imagen del evento y cada envío queda registrado con su estado.

- **Interfaz:** Notificaciones › Evento especial
- **API:** `POST /api/v1/campanas (tipo evento)`

### HU-128 — Felicitar a los clientes en su cumpleaños

**Como** Administrador o Empleado  
**quiero** que cada cliente reciba un correo personalizado con un cupón el día de su cumpleaños  
**para** fortalecer la relación con el cliente

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 3 pts | Matriz Excel (HU_200 y HU_204) | HU_200 (6 CA), HU_204 (5 CA) | RF-NOT-05, RF-NOT-06 |

**Criterios de aceptación**

1. **Dado** un cliente con fecha de nacimiento hoy y correo, **cuando** corre el proceso diario de las 10:00 a. m., **entonces** recibe el correo con su nombre y un cupón de descuento y el envío queda registrado.
2. **Dado** un cliente sin fecha de nacimiento o sin correo, **cuando** corre el proceso, **entonces** se omite y queda en el registro como omitido.

- **Interfaz:** Configuración › Cumpleaños
- **API:** `GET /api/v1/configuracion/cumpleanos`; `PUT /api/v1/configuracion/cumpleanos`; `(tarea programada diaria)`

### HU-129 — Gestionar plantillas de correo

**Como** Administrador  
**quiero** crear, editar, duplicar y eliminar plantillas de correo con variables  
**para** agilizar los envíos

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 3 pts | Matriz Excel | HU_201 (4 CA) | RF-NOT-07, RF-NOT-08 |

**Criterios de aceptación**

1. **Dado** una plantilla de promoción con {{nombre}} en el asunto, **cuando** la guardo y envío una prueba, **entonces** el correo de prueba llega con el nombre reemplazado.
2. **Dado** una plantilla usada en campañas programadas, **cuando** intento eliminarla, **entonces** el sistema lo impide y sugiere inactivarla.

- **Interfaz:** Notificaciones › Plantillas
- **API:** `GET /api/v1/plantillas`; `POST /api/v1/plantillas`; `PUT /api/v1/plantillas/:id`; `POST /api/v1/plantillas/:id/duplicado`; `DELETE /api/v1/plantillas/:id`; `POST /api/v1/plantillas/:id/prueba`

### HU-130 — Monitorear los envíos de correo

**Como** Administrador  
**quiero** ver cuántos correos se enviaron, entregaron y fallaron  
**para** asegurar la entrega de las notificaciones

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Baja | 2 pts | Matriz Excel | HU_202 (4 CA) | RF-NOT-09 |

**Criterios de aceptación**

1. **Dado** un rango de fechas y el tipo promoción, **cuando** abro el monitor, **entonces** veo enviados, entregados (si el proveedor lo informa), fallidos y rebotados por campaña, y descargo el informe.

- **Interfaz:** Notificaciones › Monitor de envíos
- **API:** `GET /api/v1/campanas/metricas?tipo&desde&hasta&formato`

### HU-131 — Gestionar listas de destinatarios

**Como** Empleado o Administrador  
**quiero** crear listas de clientes por tipo de notificación y segmentarlas  
**para** enviar cada notificación a quien corresponde

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 3 pts | Matriz Excel | HU_205 (5 CA) | RF-NOT-10, RF-NOT-11 |

**Criterios de aceptación**

1. **Dado** los criterios categoría Frecuente y ciudad Envigado, **cuando** creo la lista «Frecuentes Envigado», **entonces** incluye a los clientes que cumplen los criterios y tienen autorización.
2. **Dado** una lista, **cuando** agrego o quito clientes manualmente, o la exporto o importo en CSV, **entonces** se actualiza.

- **Interfaz:** Notificaciones › Listas
- **API:** `GET /api/v1/listas`; `POST /api/v1/listas`; `PUT /api/v1/listas/:id`; `DELETE /api/v1/listas/:id`; `POST /api/v1/listas/:id/importacion`; `GET /api/v1/listas/:id/exportacion`

### HU-132 — Darme de baja de las notificaciones

**Como** Cliente  
**quiero** dejar de recibir promociones desde el correo o mi perfil  
**para** controlar lo que recibo

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 1 pts | Inferida (HU_198 y HU_203 — enlace para darse de baja; Ley 1581 de 2012) | Inferida de la ficha del proyecto | RF-NOT-12 |

**Criterios de aceptación**

1. **Dado** un correo promocional, **cuando** pulso «Darme de baja», **entonces** sin iniciar sesión veo la confirmación y no recibo más promociones.
2. **Dado** Mi perfil › Suscripciones, **cuando** desmarco promociones o eventos, **entonces** se guarda mi preferencia; los cumpleaños se controlan aparte.

- **Interfaz:** Baja de suscripción (pública); Portal del cliente › Mis suscripciones
- **API:** `POST /api/v1/suscripciones/baja?token`; `GET /api/v1/clientes/me/suscripciones`; `PUT /api/v1/clientes/me/suscripciones`

## Épica 19: Programa de puntos

> Proceso: Ventas · Spec: `specs/019-programa-puntos/spec.md` · SRS §4.19 · Actores: Administrador, Empleado, Cliente

Fideliza a los clientes con puntos por consumo y por ingreso, canjeables por recompensas (descuentos, productos o entradas gratis), con historial y comprobantes.

### HU-133 — Configurar las reglas de acumulación de puntos

**Como** Administrador  
**quiero** definir cuántos puntos otorga cada consumo, producto, servicio o ingreso  
**para** que los clientes acumulen puntos de forma automática

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 3 pts | Matriz Excel | HU_206 (5 CA) | RF-PUN-01 |

**Criterios de aceptación**

1. **Dado** la regla «1 punto por cada $ 1.000 de consumo» y «10 puntos por ingreso», **cuando** las guardo, **entonces** cada venta pagada y cada ingreso otorgan los puntos correspondientes.
2. **Dado** una regla por producto para «Botella de whisky» de 100 puntos, **cuando** se vende, **entonces** se otorgan esos puntos en lugar de la regla por valor.

- **Interfaz:** Puntos › Reglas
- **API:** `GET /api/v1/puntos/reglas`; `POST /api/v1/puntos/reglas`; `PUT /api/v1/puntos/reglas/:id`

### HU-134 — Configurar las recompensas

**Como** Administrador  
**quiero** definir las recompensas canjeables y sus puntos requeridos  
**para** ofrecer incentivos a los clientes

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 3 pts | Matriz Excel | HU_207 (7 CA) | RF-PUN-02, RF-PUN-03 |

**Criterios de aceptación**

1. **Dado** la recompensa «Entrada gratis» por 500 puntos, **cuando** la guardo, **entonces** aparece en la lista de recompensas del perfil del cliente.
2. **Dado** una recompensa con stock agotado, **cuando** un cliente intenta canjearla, **entonces** se indica que no está disponible.

- **Interfaz:** Puntos › Recompensas
- **API:** `GET /api/v1/puntos/recompensas`; `POST /api/v1/puntos/recompensas`; `PUT /api/v1/puntos/recompensas/:id`

### HU-135 — Consultar el saldo de puntos de un cliente

**Como** Administrador o Empleado  
**quiero** buscar un cliente y ver su saldo e historial de puntos  
**para** atender sus consultas y controlar el programa

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_208 y HU_212) | HU_208 (4 CA), HU_212 (5 CA) | RF-PUN-04 |

**Criterios de aceptación**

1. **Dado** la búsqueda por id, nombre, documento o escaneo del QR, **cuando** encuentro al cliente, **entonces** veo su saldo, la fecha de su última actualización y el historial de acumulaciones y canjes.
2. **Dado** un cliente inexistente, **cuando** busco, **entonces** veo «Cliente no encontrado».

- **Interfaz:** Puntos › Consultar saldo
- **API:** `GET /api/v1/puntos/clientes/:idCliente`; `GET /api/v1/puntos/clientes/:idCliente/movimientos`

### HU-136 — Acumular puntos por consumo e ingreso

**Como** Empleado  
**quiero** que el cliente identificado acumule puntos al pagar su consumo o al ingresar  
**para** premiar su fidelidad sin trámites adicionales

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel (el «registro de consumo» se hace al registrar la venta con el cliente identificado) | HU_210 (8 CA) | RF-PUN-05, RF-PUN-06 |

**Criterios de aceptación**

1. **Dado** una venta pagada de $ 200.000 a un cliente identificado por su QR, con 1 punto por cada $ 1.000, **cuando** se registra, **entonces** acumula 200 puntos (300 si es VIP con multiplicador 1,5), su saldo se actualiza en tiempo real y el comprobante muestra los puntos y el nuevo saldo.
2. **Dado** un ingreso registrado, **cuando** existe la regla por ingreso, **entonces** se acumulan esos puntos una sola vez por noche.

- **Interfaz:** Ventas › Nueva venta (cliente y puntos)
- **API:** `(parte de POST /api/v1/ventas y POST /api/v1/ingresos)`

### HU-137 — Canjear puntos

**Como** Empleado  
**quiero** canjear los puntos de un cliente por una recompensa  
**para** que disfrute los beneficios de su fidelidad

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel | HU_211 (9 CA) | RF-PUN-07, RF-PUN-08 |

**Criterios de aceptación**

1. **Dado** un cliente con 650 puntos identificado por QR, **cuando** selecciono «Entrada gratis» (500 puntos), **entonces** se descuentan los puntos, queda en el historial y se genera el comprobante con el nuevo saldo de 150.
2. **Dado** puntos insuficientes, una recompensa no disponible o un cliente no encontrado, **cuando** intento canjear, **entonces** veo el error específico.

- **Interfaz:** Puntos › Canjear
- **API:** `POST /api/v1/puntos/canjes`

### HU-138 — Generar el reporte del programa de puntos

**Como** Administrador  
**quiero** generar reportes de la actividad del programa de puntos  
**para** analizar su efectividad

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Baja | 2 pts | Matriz Excel | HU_209 (5 CA) | RF-PUN-09 |

**Criterios de aceptación**

1. **Dado** un rango de fechas, **cuando** genero el reporte, **entonces** veo puntos acumulados por todos los clientes, puntos canjeados por recompensa y la actividad diaria, exportable a CSV o PDF.

- **Interfaz:** Puntos › Reporte
- **API:** `GET /api/v1/reportes/puntos?desde&hasta&formato`

### HU-139 — Consultar mis puntos y recompensas

**Como** Cliente  
**quiero** ver mi saldo de puntos, su historial y las recompensas que puedo canjear  
**para** aprovechar los beneficios

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Inferida (HU_206 y HU_207 — resumen de puntos y recompensas en el perfil del cliente) | Inferida de la ficha del proyecto | RF-PUN-10 |

**Criterios de aceptación**

1. **Dado** que inicié sesión, **cuando** abro Mis puntos, **entonces** veo mi saldo, mis movimientos y las recompensas activas marcando cuáles alcanzo con mi saldo.

- **Interfaz:** Portal del cliente › Mis puntos
- **API:** `GET /api/v1/clientes/me/puntos`

## Épica 20: Medición y desempeño

> Proceso: Medición y desempeño de los procesos · Spec: `specs/020-desempeno/spec.md` · SRS §4.20 · Actores: Administrador, Empleado

Entrega los reportes de desempeño definidos en la ficha, con filtros por periodo, gráficos y exportación a PDF y CSV. Las historias con rol Cliente sobre estos reportes se interpretan como del dueño de la discoteca (TBD-11).

### HU-140 — Consultar el top 10 de clientes VIP y generales

**Como** Administrador o Empleado  
**quiero** ver los 10 clientes VIP y los 10 clientes generales con mayor gasto en un periodo  
**para** identificar a los clientes más importantes

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 3 pts | Matriz Excel (HU_213, HU_219 y HU_225; esta última se interpreta como del dueño, TBD-11) | HU_213 (6 CA), HU_219 (7 CA), HU_225 (6 CA) | RF-DES-01 |

**Criterios de aceptación**

1. **Dado** el periodo mensual, **cuando** genero el reporte, **entonces** veo dos listas separadas con nombre, id, gasto total y número de visitas, ordenables ascendente o descendente.
2. **Dado** el reporte, **cuando** lo descargo, **entonces** obtengo PDF y CSV.

- **Interfaz:** Reportes › Top clientes
- **API:** `GET /api/v1/indicadores/top-clientes?desde&hasta&orden&formato`

### HU-141 — Consultar los servicios más y menos solicitados

**Como** Administrador o Empleado  
**quiero** ver los servicios más y menos solicitados con su participación  
**para** optimizar la oferta de servicios

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 3 pts | Matriz Excel (HU_214, HU_220 y HU_226) | HU_214 (6 CA), HU_220 (6 CA), HU_226 (6 CA) | RF-DES-02 |

**Criterios de aceptación**

1. **Dado** un rango de fechas, **cuando** genero el reporte, **entonces** veo dos listas con el servicio, las veces solicitado (reservas, fichas técnicas y ventas) y su porcentaje sobre el total, ordenables, en PDF y CSV.

- **Interfaz:** Reportes › Servicios solicitados
- **API:** `GET /api/v1/indicadores/servicios-solicitados?desde&hasta&orden&formato`

### HU-142 — Consultar la programación de empleados por servicio

**Como** Administrador o Empleado  
**quiero** ver qué empleados están asignados a cada servicio con fechas y horas  
**para** gestionar la asignación de personal

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 3 pts | Matriz Excel (HU_215 y HU_221) | HU_215 (4 CA), HU_221 (5 CA) | RF-DES-03 |

**Criterios de aceptación**

1. **Dado** la semana actual y el servicio «Mesero VIP», **cuando** genero el reporte, **entonces** veo en lista o calendario los empleados asignados con fecha y horario, filtrable por empleado, servicio y fechas, en CSV y PDF.

- **Interfaz:** Reportes › Programación por servicio
- **API:** `GET /api/v1/indicadores/programacion-servicios?desde&hasta&empleado&servicio&formato`

### HU-143 — Consultar las ventas mes a mes

**Como** Administrador o Empleado  
**quiero** ver las ventas de cada mes con la venta mayor, la menor y los subtotales  
**para** analizar la rentabilidad del negocio

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Alta | 3 pts | Matriz Excel (HU_216, HU_222 y HU_227) | HU_216 (5 CA), HU_222 (6 CA), HU_227 (5 CA) | RF-DES-04 |

**Criterios de aceptación**

1. **Dado** el año 2026, **cuando** genero el reporte, **entonces** veo por mes el total vendido, la venta mayor, la venta menor y el subtotal, con gráfico de barras o líneas, en PDF y CSV.

- **Interfaz:** Reportes › Ventas mes a mes
- **API:** `GET /api/v1/indicadores/ventas-mensuales?anio&desde&hasta&formato`

### HU-144 — Consultar el top 10 de eventos temáticos

**Como** Administrador o Empleado  
**quiero** ver los 10 eventos temáticos más solicitados  
**para** saber qué tipos de eventos son más populares

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_217, HU_223 y HU_228) | HU_217 (5 CA), HU_223 (6 CA), HU_228 (6 CA) | RF-DES-05 |

**Criterios de aceptación**

1. **Dado** un rango de fechas, **cuando** genero el reporte, **entonces** veo las 10 temáticas con más eventos realizados y su asistencia, ordenables, en PDF y CSV.

- **Interfaz:** Reportes › Top eventos temáticos
- **API:** `GET /api/v1/indicadores/top-tematicas?desde&hasta&orden&formato`

### HU-145 — Comparar eventos temáticos y fiestas privadas

**Como** Administrador o Empleado  
**quiero** comparar la cantidad de eventos temáticos y fiestas privadas  
**para** analizar las preferencias de los clientes

| Prioridad | Estimación | Origen | Excel | Requerimientos |
|---|---|---|---|---|
| Media | 2 pts | Matriz Excel (HU_218, HU_224 y HU_229) | HU_218 (4 CA), HU_224 (5 CA), HU_229 (4 CA) | RF-DES-06 |

**Criterios de aceptación**

1. **Dado** un rango de fechas, **cuando** genero el comparativo, **entonces** veo un gráfico de barras o de pastel y una tabla con la cantidad, asistentes e ingresos de cada tipo, en PDF y CSV.

- **Interfaz:** Reportes › Comparativo de eventos
- **API:** `GET /api/v1/indicadores/tematicos-vs-privadas?desde&hasta&formato`

## Anexo A. Cobertura RF → HU

| RF | Historia | Prioridad |
|---|---|---|
| RF-ROL-01 | HU-01 | Alta |
| RF-ROL-02 | HU-02 | Media |
| RF-ROL-03 | HU-03 | Alta |
| RF-ROL-04 | HU-03 | Alta |
| RF-ROL-05 | HU-04 | Alta |
| RF-ROL-06 | HU-04 | Alta |
| RF-ROL-07 | HU-05 | Media |
| RF-ROL-08 | HU-06 | Media |
| RF-ROL-09 | HU-06 | Media |
| RF-ROL-10 | HU-07 | Media |
| RF-ROL-11 | HU-08 | Baja |
| RF-ROL-12 | HU-08 | Baja |
| RF-ROL-13 | HU-09 | Alta |
| RF-ROL-14 | HU-09 | Alta |
| RF-USR-01 | HU-10 | Alta |
| RF-USR-02 | HU-11 | Alta |
| RF-USR-03 | HU-12 | Media |
| RF-USR-04 | HU-13 | Alta |
| RF-USR-05 | HU-13 | Alta |
| RF-USR-06 | HU-14 | Baja |
| RF-ACC-01 | HU-15 | Alta |
| RF-ACC-02 | HU-15 | Alta |
| RF-ACC-03 | HU-15 | Alta |
| RF-ACC-04 | HU-15 | Alta |
| RF-ACC-05 | HU-16 | Alta |
| RF-ACC-06 | HU-17 | Alta |
| RF-ACC-07 | HU-17 | Alta |
| RF-ACC-08 | HU-18 | Alta |
| RF-ACC-09 | HU-19 | Baja |
| RF-PRV-01 | HU-20 | Alta |
| RF-PRV-02 | HU-20 | Alta |
| RF-PRV-03 | HU-21 | Alta |
| RF-PRV-04 | HU-22 | Media |
| RF-PRV-05 | HU-23 | Media |
| RF-PRV-06 | HU-23 | Media |
| RF-PRV-07 | HU-24 | Baja |
| RF-PRD-01 | HU-25 | Alta |
| RF-PRD-02 | HU-26 | Alta |
| RF-PRD-03 | HU-27 | Alta |
| RF-PRD-04 | HU-28 | Alta |
| RF-PRD-05 | HU-28 | Alta |
| RF-PRD-06 | HU-29 | Alta |
| RF-PRD-07 | HU-30 | Media |
| RF-PRD-08 | HU-30 | Media |
| RF-PRD-09 | HU-31 | Media |
| RF-PRD-10 | HU-32 | Alta |
| RF-PRD-11 | HU-32 | Alta |
| RF-PRD-12 | HU-32 | Alta |
| RF-COM-01 | HU-33 | Alta |
| RF-COM-02 | HU-33 | Alta |
| RF-COM-03 | HU-34 | Alta |
| RF-COM-04 | HU-35 | Media |
| RF-COM-05 | HU-35 | Media |
| RF-COM-06 | HU-36 | Alta |
| RF-COM-07 | HU-36 | Alta |
| RF-COM-08 | HU-37 | Media |
| RF-CLI-01 | HU-38 | Media |
| RF-CLI-02 | HU-39 | Media |
| RF-CLI-03 | HU-40 | Media |
| RF-CLI-04 | HU-41 | Media |
| RF-CLI-05 | HU-42 | Alta |
| RF-CLI-06 | HU-42 | Alta |
| RF-CLI-07 | HU-42 | Alta |
| RF-CLI-08 | HU-43 | Alta |
| RF-CLI-09 | HU-44 | Media |
| RF-CLI-10 | HU-45 | Media |
| RF-CLI-11 | HU-46 | Baja |
| RF-CLI-12 | HU-47 | Alta |
| RF-CLI-13 | HU-47 | Alta |
| RF-CLI-14 | HU-48 | Media |
| RF-CLI-15 | HU-48 | Media |
| RF-VIP-01 | HU-49 | Alta |
| RF-VIP-02 | HU-49 | Alta |
| RF-VIP-03 | HU-50 | Media |
| RF-VIP-04 | HU-51 | Media |
| RF-VIP-05 | HU-52 | Media |
| RF-VIP-06 | HU-53 | Baja |
| RF-VIP-07 | HU-54 | Media |
| RF-VIP-08 | HU-54 | Media |
| RF-ING-01 | HU-55 | Alta |
| RF-ING-02 | HU-55 | Alta |
| RF-ING-03 | HU-56 | Alta |
| RF-ING-04 | HU-56 | Alta |
| RF-ING-05 | HU-57 | Alta |
| RF-ING-06 | HU-58 | Alta |
| RF-ING-07 | HU-58 | Alta |
| RF-ING-08 | HU-58 | Alta |
| RF-ING-09 | HU-58 | Alta |
| RF-ING-10 | HU-59 | Media |
| RF-ING-11 | HU-60 | Media |
| RF-ING-12 | HU-61 | Alta |
| RF-ING-13 | HU-61 | Alta |
| RF-SER-01 | HU-62 | Alta |
| RF-SER-02 | HU-63 | Alta |
| RF-SER-03 | HU-64 | Media |
| RF-SER-04 | HU-65 | Media |
| RF-SER-05 | HU-66 | Media |
| RF-EMP-01 | HU-67 | Media |
| RF-EMP-02 | HU-68 | Baja |
| RF-EMP-03 | HU-69 | Baja |
| RF-EMP-04 | HU-70 | Baja |
| RF-EMP-05 | HU-71 | Alta |
| RF-EMP-06 | HU-71 | Alta |
| RF-EMP-07 | HU-72 | Alta |
| RF-EMP-08 | HU-73 | Media |
| RF-EMP-09 | HU-74 | Media |
| RF-EMP-10 | HU-75 | Baja |
| RF-AGE-01 | HU-76 | Alta |
| RF-AGE-02 | HU-76 | Alta |
| RF-AGE-03 | HU-76 | Alta |
| RF-AGE-04 | HU-77 | Alta |
| RF-AGE-05 | HU-78 | Media |
| RF-AGE-06 | HU-79 | Media |
| RF-AGE-07 | HU-80 | Media |
| RF-RES-01 | HU-81 | Alta |
| RF-RES-02 | HU-82 | Alta |
| RF-RES-03 | HU-82 | Alta |
| RF-RES-04 | HU-82 | Alta |
| RF-RES-05 | HU-83 | Alta |
| RF-RES-06 | HU-84 | Media |
| RF-RES-07 | HU-85 | Alta |
| RF-RES-08 | HU-85 | Alta |
| RF-RES-09 | HU-86 | Baja |
| RF-RES-10 | HU-87 | Media |
| RF-RES-11 | HU-88 | Alta |
| RF-RES-12 | HU-88 | Alta |
| RF-EVE-01 | HU-89 | Alta |
| RF-EVE-02 | HU-89 | Alta |
| RF-EVE-03 | HU-89 | Alta |
| RF-EVE-04 | HU-90 | Alta |
| RF-EVE-05 | HU-91 | Alta |
| RF-EVE-06 | HU-91 | Alta |
| RF-EVE-07 | HU-92 | Alta |
| RF-EVE-08 | HU-92 | Alta |
| RF-EVE-09 | HU-93 | Media |
| RF-EVE-10 | HU-94 | Alta |
| RF-EVE-11 | HU-94 | Alta |
| RF-EVE-12 | HU-95 | Alta |
| RF-EVE-13 | HU-96 | Alta |
| RF-EVE-14 | HU-97 | Media |
| RF-EVE-15 | HU-97 | Media |
| RF-EVE-16 | HU-98 | Media |
| RF-AGV-01 | HU-99 | Media |
| RF-AGV-02 | HU-100 | Media |
| RF-AGV-03 | HU-101 | Media |
| RF-AGV-04 | HU-102 | Media |
| RF-AGV-05 | HU-103 | Alta |
| RF-AGV-06 | HU-103 | Alta |
| RF-AGV-07 | HU-104 | Baja |
| RF-AGV-08 | HU-105 | Media |
| RF-AGV-09 | HU-105 | Media |
| RF-AGV-10 | HU-106 | Alta |
| RF-AGV-11 | HU-106 | Alta |
| RF-AGV-12 | HU-107 | Media |
| RF-AGV-13 | HU-108 | Media |
| RF-AGV-14 | HU-109 | Media |
| RF-AGV-15 | HU-110 | Media |
| RF-PED-01 | HU-111 | Alta |
| RF-PED-02 | HU-111 | Alta |
| RF-PED-03 | HU-112 | Alta |
| RF-PED-04 | HU-113 | Alta |
| RF-PED-05 | HU-114 | Alta |
| RF-PED-06 | HU-114 | Alta |
| RF-PED-07 | HU-115 | Media |
| RF-PED-08 | HU-116 | Media |
| RF-PED-09 | HU-117 | Media |
| RF-PED-10 | HU-118 | Media |
| RF-PED-11 | HU-119 | Baja |
| RF-VEN-01 | HU-120 | Alta |
| RF-VEN-02 | HU-120 | Alta |
| RF-VEN-03 | HU-120 | Alta |
| RF-VEN-04 | HU-121 | Alta |
| RF-VEN-05 | HU-121 | Alta |
| RF-VEN-06 | HU-122 | Alta |
| RF-VEN-07 | HU-123 | Alta |
| RF-VEN-08 | HU-123 | Alta |
| RF-VEN-09 | HU-124 | Alta |
| RF-VEN-10 | HU-124 | Alta |
| RF-VEN-11 | HU-125 | Media |
| RF-NOT-01 | HU-126 | Media |
| RF-NOT-02 | HU-126 | Media |
| RF-NOT-03 | HU-126 | Media |
| RF-NOT-04 | HU-127 | Media |
| RF-NOT-05 | HU-128 | Media |
| RF-NOT-06 | HU-128 | Media |
| RF-NOT-07 | HU-129 | Media |
| RF-NOT-08 | HU-129 | Media |
| RF-NOT-09 | HU-130 | Baja |
| RF-NOT-10 | HU-131 | Media |
| RF-NOT-11 | HU-131 | Media |
| RF-NOT-12 | HU-132 | Media |
| RF-PUN-01 | HU-133 | Media |
| RF-PUN-02 | HU-134 | Media |
| RF-PUN-03 | HU-134 | Media |
| RF-PUN-04 | HU-135 | Media |
| RF-PUN-05 | HU-136 | Alta |
| RF-PUN-06 | HU-136 | Alta |
| RF-PUN-07 | HU-137 | Alta |
| RF-PUN-08 | HU-137 | Alta |
| RF-PUN-09 | HU-138 | Baja |
| RF-PUN-10 | HU-139 | Media |
| RF-DES-01 | HU-140 | Media |
| RF-DES-02 | HU-141 | Media |
| RF-DES-03 | HU-142 | Media |
| RF-DES-04 | HU-143 | Alta |
| RF-DES-05 | HU-144 | Media |
| RF-DES-06 | HU-145 | Media |

## Anexo B. Trazabilidad con la matriz Excel

| Código en la matriz Excel | Historia v2.0 |
|---|---|
| HU_01 | HU-01 |
| HU_02 | HU-02 |
| HU_03 | HU-03 |
| HU_04 | HU-04 |
| HU_05 | HU-05 |
| HU_06 | HU-06 |
| HU_07 | HU-07 |
| HU_08 | HU-08 |
| HU_09 | HU-09 |
| HU_10 | HU-10, HU-11 |
| HU_11 | HU-12 |
| HU_12 | HU-13 |
| HU_13 | HU-14 |
| HU_14 | HU-15 |
| HU_15 | HU-16 |
| HU_16 | HU-18 |
| HU_17 | HU-15 |
| HU_18 | HU-16 |
| HU_19 | HU-18 |
| HU_20 | HU-15 |
| HU_21 | HU-16 |
| HU_22 | HU-18 |
| HU_23 | HU-33 |
| HU_24 | HU-34 |
| HU_25 | HU-35 |
| HU_26 | HU-36 |
| HU_27 | HU-37 |
| HU_28 | HU-33 |
| HU_29 | HU-34 |
| HU_30 | HU-35 |
| HU_31 | HU-36 |
| HU_32 | HU-37 |
| HU_33 | HU-20 |
| HU_34 | HU-21 |
| HU_35 | HU-22 |
| HU_36 | HU-23 |
| HU_37 | HU-24 |
| HU_38 | HU-20 |
| HU_39 | HU-21 |
| HU_40 | HU-22 |
| HU_41 | HU-23 |
| HU_42 | HU-24 |
| HU_43 | HU-26 |
| HU_44 | HU-27 |
| HU_45 | HU-28 |
| HU_46 | HU-29 |
| HU_47 | HU-31 |
| HU_48 | HU-32 |
| HU_49 | HU-26 |
| HU_50 | HU-27 |
| HU_51 | HU-28 |
| HU_52 | HU-30 |
| HU_53 | HU-29 |
| HU_54 | HU-31 |
| HU_55 | HU-32 |
| HU_56 | HU-55 |
| HU_57 | HU-56 |
| HU_58 | HU-57 |
| HU_59 | HU-58 |
| HU_60 | HU-60 |
| HU_61 | HU-58 |
| HU_62 | HU-59 |
| HU_63 | HU-60 |
| HU_64 | HU-56 |
| HU_65 | HU-49 |
| HU_66 | HU-50 |
| HU_67 | HU-51 |
| HU_68 | HU-52 |
| HU_69 | HU-53 |
| HU_70 | HU-49 |
| HU_71 | HU-50 |
| HU_72 | HU-51 |
| HU_73 | HU-52 |
| HU_74 | HU-53 |
| HU_75 | HU-62 |
| HU_76 | HU-63 |
| HU_77 | HU-64 |
| HU_78 | HU-65 |
| HU_79 | HU-66 |
| HU_80 | HU-62 |
| HU_81 | HU-63 |
| HU_82 | HU-64 |
| HU_83 | HU-65 |
| HU_84 | HU-66 |
| HU_85 | HU-67 |
| HU_86 | HU-68 |
| HU_87 | HU-69 |
| HU_88 | HU-70 |
| HU_89 | HU-71 |
| HU_90 | HU-72 |
| HU_91 | HU-73 |
| HU_92 | HU-74 |
| HU_93 | HU-75 |
| HU_94 | HU-76 |
| HU_95 | HU-77 |
| HU_96 | HU-78 |
| HU_97 | HU-79 |
| HU_98 | HU-76 |
| HU_99 | HU-80 |
| HU_100 | HU-76 |
| HU_101 | HU-77 |
| HU_102 | HU-78 |
| HU_103 | HU-79 |
| HU_104 | HU-80 |
| HU_105 | HU-82 |
| HU_106 | HU-83 |
| HU_107 | HU-84 |
| HU_108 | HU-85 |
| HU_109 | HU-86 |
| HU_110 | HU-87 |
| HU_111 | HU-82 |
| HU_112 | HU-83 |
| HU_113 | HU-84 |
| HU_114 | HU-86 |
| HU_115 | HU-87 |
| HU_116 | HU-89 |
| HU_117 | HU-90 |
| HU_118 | HU-91 |
| HU_119 | HU-93 |
| HU_120 | HU-89 |
| HU_121 | HU-90 |
| HU_122 | HU-91 |
| HU_123 | HU-92 |
| HU_124 | HU-93 |
| HU_125 | HU-94 |
| HU_126 | HU-95 |
| HU_127 | HU-96 |
| HU_128 | HU-97 |
| HU_129 | HU-98 |
| HU_130 | HU-94 |
| HU_131 | HU-95 |
| HU_132 | HU-96 |
| HU_133 | HU-97 |
| HU_134 | HU-98 |
| HU_135 | HU-99 |
| HU_136 | HU-100 |
| HU_137 | HU-101 |
| HU_138 | HU-102 |
| HU_139 | HU-103 |
| HU_140 | HU-104 |
| HU_141 | HU-105 |
| HU_142 | HU-99 |
| HU_143 | HU-100 |
| HU_144 | HU-101 |
| HU_145 | HU-102 |
| HU_146 | HU-104 |
| HU_147 | HU-105 |
| HU_148 | HU-106 |
| HU_149 | HU-107 |
| HU_150 | HU-108 |
| HU_151 | HU-109 |
| HU_152 | HU-110 |
| HU_153 | HU-120 |
| HU_154 | HU-122 |
| HU_155 | HU-123 |
| HU_156 | HU-124 |
| HU_157 | HU-125 |
| HU_158 | HU-120 |
| HU_159 | HU-122 |
| HU_160 | HU-123 |
| HU_161 | HU-124 |
| HU_162 | HU-125 |
| HU_163 | HU-38 |
| HU_164 | HU-39 |
| HU_165 | HU-40 |
| HU_166 | HU-41 |
| HU_167 | HU-38 |
| HU_168 | HU-39 |
| HU_169 | HU-40 |
| HU_170 | HU-41 |
| HU_171 | HU-42 |
| HU_172 | HU-43 |
| HU_173 | HU-44 |
| HU_174 | HU-45 |
| HU_175 | HU-46 |
| HU_176 | HU-42 |
| HU_177 | HU-43 |
| HU_178 | HU-44 |
| HU_179 | HU-45 |
| HU_180 | HU-46 |
| HU_181 | HU-47 |
| HU_182 | HU-48 |
| HU_183 | HU-111 |
| HU_184 | HU-112 |
| HU_185 | HU-113 |
| HU_186 | HU-114 |
| HU_187 | HU-115 |
| HU_188 | HU-116 |
| HU_189 | HU-111 |
| HU_190 | HU-112 |
| HU_191 | HU-113 |
| HU_192 | HU-114 |
| HU_193 | HU-115 |
| HU_194 | HU-116 |
| HU_195 | HU-117 |
| HU_196 | HU-118 |
| HU_197 | HU-119 |
| HU_198 | HU-126 |
| HU_199 | HU-127 |
| HU_200 | HU-128 |
| HU_201 | HU-129 |
| HU_202 | HU-130 |
| HU_203 | HU-126 |
| HU_204 | HU-128 |
| HU_205 | HU-131 |
| HU_206 | HU-133 |
| HU_207 | HU-134 |
| HU_208 | HU-135 |
| HU_209 | HU-138 |
| HU_210 | HU-136 |
| HU_211 | HU-137 |
| HU_212 | HU-135 |
| HU_213 | HU-140 |
| HU_214 | HU-141 |
| HU_215 | HU-142 |
| HU_216 | HU-143 |
| HU_217 | HU-144 |
| HU_218 | HU-145 |
| HU_219 | HU-140 |
| HU_220 | HU-141 |
| HU_221 | HU-142 |
| HU_222 | HU-143 |
| HU_223 | HU-144 |
| HU_224 | HU-145 |
| HU_225 | HU-140 |
| HU_226 | HU-141 |
| HU_227 | HU-143 |
| HU_228 | HU-144 |
| HU_229 | HU-145 |

**Historias inferidas de la ficha (no estaban en la matriz):** HU-17 Restablecer la contraseña, HU-19 Consultar la bitácora de accesos, HU-25 Registrar un producto, HU-54 Configurar los niveles y beneficios VIP, HU-61 Configurar el aforo y registrar salidas, HU-81 Gestionar los espacios reservables, HU-88 Reservar como cliente, HU-121 Cobrar un pedido, HU-132 Darme de baja de las notificaciones, HU-139 Consultar mis puntos y recompensas.

## Anexo C. Equivalencias v1.0 → v2.0

Las rúbricas de las evidencias 2 y 3 citan los IDs de la v1.0; esta tabla los ubica en la v2.0.

| HU v1.0 | Título v1.0 | HU v2.0 |
|---|---|---|
| HU-01 | Controlar el acceso por rol | HU-01, HU-09 |
| HU-02 | Acceder de forma segura en horario nocturno | HU-15, HU-16, HU-18 |
| HU-03 | Reponer inventario antes de abrir | HU-32, HU-33, HU-36 |
| HU-04 | Validar el ingreso sin filas | HU-58 |
| HU-05 | Dar prioridad a clientes VIP | HU-49, HU-58 |
| HU-06 | Asignar personal a cada turno | HU-76 |
| HU-07 | Reservar mesa o zona VIP sin choques | HU-82 |
| HU-08 | Planificar un evento temático | HU-89, HU-94 |
| HU-09 | Cobrar el consumo de un cliente | HU-120, HU-124 |
| HU-10 | Fidelizar clientes frecuentes | HU-136, HU-137 |
| HU-11 | Ver el ranking de clientes y servicios | HU-140, HU-141 |

