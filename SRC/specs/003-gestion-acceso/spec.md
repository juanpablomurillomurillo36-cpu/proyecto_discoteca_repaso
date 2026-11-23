# Feature Specification: Gestión de acceso

**Feature Branch**: `003-gestion-acceso`  
**Created**: 2026-11-21  
**Status**: Draft  
**Proyecto**: Sistema de Gestión Integral para Discoteca (Discoteca (Envigado)) · **SRS**: `SRS-Discoteca-v2.0.md` §4.3 · **Historias**: HU-15 – HU-19  
**Input**: "Controla el ingreso al sistema de administradores, empleados y clientes y la recuperación de contraseña. Actores: Administrador, Empleado, Cliente."

> Spec generada a partir del SRS v2.0 y de las historias de usuario del proyecto. Respeta la estructura de `spec-template.md` de spec-kit; los encabezados van en español con su equivalente en inglés. Antes de `/speckit.plan`, ejecute `/speckit.clarify` si hay marcas `[NEEDS CLARIFICATION]`.

## Escenarios de usuario y pruebas (User Scenarios & Testing) *(obligatorio)*

### Historia 1 — Iniciar sesión (Prioridad: P1) · HU-15

**Como** Administrador, Empleado o Cliente, **quiero** iniciar sesión con mi usuario o correo y contraseña, **para** acceder a las funciones de mi rol.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite acceder a las funciones de mi rol.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/auth/login` y en la pantalla «Inicio de sesión», con los datos semilla, verificando los escenarios 1 a 4.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** credenciales correctas de un usuario activo, **cuando** ingreso, **entonces** el sistema me lleva a la pantalla de mi rol (tablero, ingreso o portal del cliente).
2. **Dado** credenciales incorrectas, **cuando** ingreso, **entonces** veo «Usuario o contraseña incorrectos» sin indicar cuál falló.
3. **Dado** tres intentos fallidos consecutivos, **cuando** intento de nuevo, **entonces** veo que la cuenta está bloqueada por 15 minutos.
4. **Dado** que marco «Recordar mi usuario», **cuando** vuelvo a la página, **entonces** el usuario aparece diligenciado (nunca la contraseña) y puedo desmarcarlo.

### Historia 2 — Recuperar la contraseña (Prioridad: P1) · HU-16

**Como** Usuario registrado, **quiero** solicitar un enlace para recuperar mi contraseña con mi correo o usuario, **para** retomar el acceso si la olvido.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite retomar el acceso si la olvido.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/auth/recuperar` y en la pantalla «Recuperar contraseña», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un correo registrado, **cuando** lo envío en «Olvidé mi contraseña», **entonces** recibo un enlace de un solo uso que vence en 30 minutos.
2. **Dado** un correo con formato inválido, **cuando** lo envío, **entonces** el sistema lo señala.
3. **Dado** un correo no registrado, **cuando** lo envío, **entonces** veo el mismo mensaje genérico que para uno registrado.

### Historia 3 — Restablecer la contraseña (Prioridad: P1) · HU-17

**Como** Usuario registrado, **quiero** crear una nueva contraseña desde el enlace recibido, **para** volver a ingresar.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite volver a ingresar.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/auth/restablecer` y en la pantalla «Restablecer contraseña», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un enlace vigente, **cuando** ingreso una contraseña que cumple la política y su confirmación, **entonces** veo «Contraseña actualizada» y se me notifica por correo el cambio.
2. **Dado** un enlace vencido o usado, **cuando** lo abro, **entonces** veo «El enlace expiró o ya fue usado».

### Historia 4 — Cerrar sesión (Prioridad: P1) · HU-18

**Como** Usuario autenticado, **quiero** cerrar mi sesión de forma segura, **para** proteger mi cuenta.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite proteger mi cuenta.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/auth/logout` y en la pantalla «Menú de usuario › Cerrar sesión», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** una sesión activa, **cuando** pulso «Cerrar sesión», **entonces** el token se invalida en el servidor y vuelvo a la página de inicio de sesión.
2. **Dado** que cerré sesión, **cuando** intento abrir una pantalla interna, **entonces** el sistema me redirige al inicio de sesión.

### Historia 5 — Consultar la bitácora de accesos (Prioridad: P3) · HU-19

**Como** Administrador, **quiero** consultar los intentos de inicio de sesión, **para** detectar accesos sospechosos.

**Por qué esta prioridad (Why this priority)**: Prioridad Baja en el backlog del proyecto. Aporta valor porque permite detectar accesos sospechosos.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/auth/accesos?desde&hasta&usuario&exitoso` y en la pantalla «Configuración › Bitácora de accesos», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un rango de fechas, **cuando** abro la bitácora de accesos, **entonces** veo fecha, hora, usuario, resultado y dispositivo, filtrables por usuario y resultado.

### Casos límite (Edge Cases)

- El usuario abre un enlace de restablecimiento ya usado: se muestra «El enlace expiró o ya fue usado» y se ofrece solicitar otro.

## Requerimientos (Requirements) *(obligatorio)*

### Requerimientos funcionales (Functional Requirements)

- **FR-001**: El sistema DEBE autenticar con usuario o correo y contraseña, validando que la cuenta y su rol estén activos, y redirigir a la pantalla inicial del rol. *(RF-ACC-01 · HU-15)*
- **FR-002**: El sistema DEBE bloquear la cuenta 15 minutos tras 3 intentos fallidos consecutivos. *(RF-ACC-02 · HU-15)*
- **FR-003**: El sistema DEBE registrar cada intento de inicio de sesión con fecha, hora, usuario, resultado y tipo de dispositivo. *(RF-ACC-03 · HU-15)*
- **FR-004**: El sistema DEBE ofrecer la opción de recordar el nombre de usuario en el dispositivo, sin almacenar la contraseña. *(RF-ACC-04 · HU-15)*
- **FR-005**: El sistema DEBE enviar, a partir del correo o nombre de usuario, un enlace de restablecimiento de un solo uso con vigencia de 30 minutos, mostrando el mismo mensaje exista o no la cuenta. *(RF-ACC-05 · HU-16)*
- **FR-006**: El sistema DEBE restablecer la contraseña con un enlace vigente, exigiendo la política de complejidad y la confirmación, e invalidar el enlace al usarlo. *(RF-ACC-06 · HU-17)*
- **FR-007**: El sistema DEBE notificar por correo al usuario que su contraseña fue cambiada. *(RF-ACC-07 · HU-17)*
- **FR-008**: El sistema DEBE cerrar la sesión invalidando el token en el servidor y redirigir al inicio de sesión. *(RF-ACC-08 · HU-18)*
- **FR-009**: El sistema DEBE mostrar la bitácora de intentos de inicio de sesión filtrable por fechas, usuario y resultado. *(RF-ACC-09 · HU-19)*

### Requerimientos no funcionales aplicables

Aplican todos los principios de `constitution.md` y los RNF transversales del SRS §5. En particular:

- **RNF-SEG-02**: Las contraseñas deben almacenarse con bcrypt (costo 10 o mayor), cumplir mínimo 8 caracteres con mayúscula, minúscula, número y carácter especial y nunca devolverse en respuestas.
- **RNF-SEG-03**: Todo endpoint, salvo inicio de sesión, registro de clientes, recuperación de contraseña, cartelera pública y baja de suscripción, debe exigir un token JWT válido; el token expira a las 8 horas y se invalida al cerrar sesión.
- **RNF-SEG-05**: Tras 3 intentos fallidos consecutivos de inicio de sesión de un mismo usuario, el sistema debe bloquear nuevos intentos durante 15 minutos (requisito de la matriz).

### Entidades clave (Key Entities)

- **TokenRecuperacion**: Enlace de restablecimiento. Atributos: id_token, id_usuario, token_hash, expira_en, usado.
- **RegistroAcceso**: Intento de inicio de sesión. Atributos: id_acceso, id_usuario, usuario_ingresado, fecha_hora, exitoso, ip, tipo_dispositivo.

## Criterios de éxito (Success Criteria) *(obligatorio)*

### Resultados medibles (Measurable Outcomes)

- **SC-001**: El 95 % de los inicios de sesión responde en menos de 2 segundos.

## Supuestos (Assumptions)

- Se implementa después de (o junto con) las specs: 002-gestion-usuarios.
- La autenticación JWT y la autorización por permisos están disponibles (spec de acceso); mientras no lo estén, los endpoints se prueban con un usuario semilla.

## Insumos para `/speckit.plan` (no normativo)

Detalle orientativo para el plan técnico. No reemplaza las decisiones del plan, pero cualquier desviación debe quedar justificada en `plan.md`.

**API REST sugerida** (base `/api/v1`, sobre `{ ok, data, meta, error }`):

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/auth/login` | Iniciar sesión | HU-15 |
| POST | `/api/v1/auth/recuperar` | Recuperar la contraseña | HU-16 |
| POST | `/api/v1/auth/restablecer` | Restablecer la contraseña | HU-17 |
| POST | `/api/v1/auth/logout` | Cerrar sesión | HU-18 |
| GET | `/api/v1/auth/accesos?desde&hasta&usuario&exitoso` | Consultar la bitácora de accesos | HU-19 |

**Pantallas (frontend vanilla):**

- Inicio de sesión — HU-15
- Recuperar contraseña — HU-16
- Restablecer contraseña — HU-17
- Menú de usuario › Cerrar sesión — HU-18
- Configuración › Bitácora de accesos — HU-19

**Modelo de datos (lógico):**

*TokenRecuperacion*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_token | INT | PK |
| id_usuario | INT | FK |
| token_hash | VARCHAR(255) |  |
| expira_en | DATETIME | +30 min |
| usado | BOOLEAN |  |

*RegistroAcceso*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_acceso | INT | PK |
| id_usuario | INT | FK, nulo si no existe |
| usuario_ingresado | VARCHAR(100) |  |
| fecha_hora | DATETIME |  |
| exitoso | BOOLEAN |  |
| ip | VARCHAR(45) |  |
| tipo_dispositivo | VARCHAR(30) |  |

**Reglas de negocio:**

- **RN-06**: Tras 3 intentos fallidos consecutivos la cuenta se bloquea 15 minutos; el enlace de recuperación es de un solo uso y vence en 30 minutos.

## Trazabilidad

| Historia spec | HU | RF | Excel |
|---|---|---|---|
| 1 | HU-15 | RF-ACC-01, RF-ACC-02, RF-ACC-03, RF-ACC-04 | HU_14, HU_17, HU_20 |
| 2 | HU-16 | RF-ACC-05 | HU_15, HU_18, HU_21 |
| 3 | HU-17 | RF-ACC-06, RF-ACC-07 | Inferida (ficha) |
| 4 | HU-18 | RF-ACC-08 | HU_16, HU_19, HU_22 |
| 5 | HU-19 | RF-ACC-09 | Inferida (ficha) |

