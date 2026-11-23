# Feature Specification: Control de entradas

**Feature Branch**: `009-control-entradas`  
**Created**: 2026-11-21  
**Status**: Draft  
**Proyecto**: Sistema de Gestión Integral para Discoteca (Discoteca (Envigado)) · **SRS**: `SRS-Discoteca-v2.0.md` §4.9 · **Historias**: HU-55 – HU-61  
**Input**: "Controla el ingreso de los clientes con su código QR: valida identidad, edad, estado y aforo, da prioridad a los VIP, registra salidas para conocer la ocupación y entrega reportes de afluencia. Actores: Administrador, Empleado."

> Spec generada a partir del SRS v2.0 y de las historias de usuario del proyecto. Respeta la estructura de `spec-template.md` de spec-kit; los encabezados van en español con su equivalente en inglés. Antes de `/speckit.plan`, ejecute `/speckit.clarify` si hay marcas `[NEEDS CLARIFICATION]`.

## Escenarios de usuario y pruebas (User Scenarios & Testing) *(obligatorio)*

### Historia 1 — Registrar un cliente en la entrada (Prioridad: P1) · HU-55

**Como** Administrador o Empleado de ingreso, **quiero** registrar rápidamente en la puerta a un cliente nuevo con su documento, **para** que obtenga su código QR e ingrese sin demoras.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite que obtenga su código QR e ingrese sin demoras.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/ingresos/registro-rapido` y en la pantalla «Ingreso › Registro rápido», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** nombre, documento y fecha de nacimiento de un mayor de edad y la autorización de datos, **cuando** registro, **entonces** se crea el cliente con su QR y veo la confirmación con la opción de registrar su ingreso de inmediato.
2. **Dado** un documento ya registrado, **cuando** registro, **entonces** el sistema muestra el cliente existente en lugar de duplicarlo.
3. **Dado** datos incompletos o un menor de edad, **cuando** registro, **entonces** el sistema indica el error.

### Historia 2 — Generar y gestionar códigos QR (Prioridad: P1) · HU-56

**Como** Administrador o Empleado, **quiero** generar, asociar, desactivar y listar los códigos QR de los clientes, **para** controlar el acceso y la información de los clientes.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite controlar el acceso y la información de los clientes.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/clientes/:id/qr`, `PATCH /api/v1/qr/:id/estado`, `GET /api/v1/qr?estado&q` y en la pantalla «Clientes › Detalle › Código QR; Ingreso › Códigos QR», con los datos semilla, verificando los escenarios 1 a 3.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un cliente nuevo, **cuando** se registra, **entonces** se genera automáticamente un QR único legible por cualquier lector, visible en su perfil y descargable o imprimible.
2. **Dado** un cliente que perdió su QR, **cuando** genero uno nuevo, **entonces** el anterior queda inactivo y deja de permitir el ingreso.
3. **Dado** la lista de QR, **cuando** la abro, **entonces** veo cliente, fecha de generación y estado (activo o inactivo).

### Historia 3 — Consultar un cliente por su código QR (Prioridad: P1) · HU-57

**Como** Administrador o Empleado de ingreso, **quiero** escanear o digitar un QR y ver la información del cliente, **para** verificar su identidad antes del ingreso.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite verificar su identidad antes del ingreso.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/qr/:token/cliente` y en la pantalla «Ingreso › Verificar QR», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un QR válido, **cuando** lo escaneo en «Verificar», **entonces** veo nombre, documento parcialmente oculto, edad, foto si existe, condición VIP, estado y fecha de registro, sin registrar ingreso.
2. **Dado** un QR inexistente, **cuando** lo escaneo, **entonces** veo «Código QR no válido».

### Historia 4 — Registrar el ingreso con código QR (Prioridad: P1) · HU-58

**Como** Empleado de ingreso o Administrador, **quiero** escanear el QR de cada cliente y registrar su entrada, **para** agilizar el ingreso y controlar el aforo.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite agilizar el ingreso y controlar el aforo.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `POST /api/v1/ingresos`, `GET /api/v1/ingresos/ocupacion` y en la pantalla «Ingreso › Control de entrada (modo puerta)», con los datos semilla, verificando los escenarios 1 a 4.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un QR activo de un cliente activo, mayor de edad, que no está adentro, con ocupación 350 y aforo 400, **cuando** lo escaneo, **entonces** veo «Permitido» en verde, se registra la entrada con fecha, hora y empleado y la ocupación pasa a 351.
2. **Dado** un cliente VIP de un nivel con acceso prioritario, **cuando** lo escaneo, **entonces** el resultado muestra la insignia VIP y el ingreso queda marcado como prioritario.
3. **Dado** ocupación igual al aforo, un QR inválido o inactivo, un cliente inactivo o menor de edad, o un cliente que ya está adentro, **cuando** escaneo, **entonces** veo «Denegado» en rojo con el motivo y el intento fallido queda registrado.
4. **Dado** un QR ilegible, **cuando** busco al cliente por nombre o documento, **entonces** puedo registrar su ingreso manual con las mismas validaciones.

### Historia 5 — Consultar el registro de ingresos (Prioridad: P2) · HU-59

**Como** Empleado o Administrador, **quiero** consultar los ingresos por fechas o cliente, **para** verificar la asistencia.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite verificar la asistencia.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/ingresos?desde&hasta&q&page&limit` y en la pantalla «Ingreso › Registro de ingresos», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un rango de fechas, **cuando** consulto, **entonces** veo la lista de ingresos con cliente, fecha, hora, puerta y prioridad, y el total de ingresos del periodo.
2. **Dado** el buscador, **cuando** busco por nombre o documento, **entonces** veo los ingresos de ese cliente.

### Historia 6 — Generar el reporte de afluencia (Prioridad: P2) · HU-60

**Como** Administrador o Empleado, **quiero** generar reportes de ingresos con gráficos, **para** analizar la afluencia de público.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite analizar la afluencia de público.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/reportes/ingresos?desde&hasta&formato` y en la pantalla «Ingreso › Reporte de afluencia», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un rango de fechas, **cuando** genero el reporte, **entonces** veo total de ingresos, clientes únicos, ingresos por noche y por hora en gráficos, intentos fallidos por motivo y la lista de ingresos, descargable en PDF o CSV.

### Historia 7 — Configurar el aforo y registrar salidas (Prioridad: P1) · HU-61

**Como** Administrador o Empleado de ingreso, **quiero** configurar el aforo máximo y registrar la salida de los clientes, **para** conocer la ocupación real en todo momento.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite conocer la ocupación real en todo momento.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/configuracion/aforo`, `PUT /api/v1/configuracion/aforo`, `POST /api/v1/ingresos/salidas` y en la pantalla «Configuración › Aforo; Ingreso › Control de salida», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el aforo configurado en 400 con alerta al 90 %, **cuando** la ocupación llega a 360, **entonces** la pantalla de ingreso y el tablero muestran la alerta.
2. **Dado** un cliente adentro, **cuando** escaneo su QR en modo «Salida», **entonces** se registra la salida y la ocupación baja en uno.

### Casos límite (Edge Cases)

- Escaneo duplicado del mismo QR dentro de 10 segundos (doble lectura): se ignora y se muestra el resultado anterior.
- Cliente sin salida registrada de una noche anterior: no bloquea el ingreso de la noche nueva.
- Sin conexión en la puerta: se muestra «Sin conexión, use registro manual cuando se restablezca» y no se permite el ingreso automático.

## Requerimientos (Requirements) *(obligatorio)*

### Requerimientos funcionales (Functional Requirements)

- **FR-001**: El sistema DEBE permitir un registro rápido de clientes en la puerta con nombre, documento, fecha de nacimiento, teléfono opcional y autorización de datos, generando su QR. *(RF-ING-01 · HU-55)*
- **FR-002**: El sistema DEBE detectar documentos ya registrados y mostrar el cliente existente. *(RF-ING-02 · HU-55)*
- **FR-003**: El sistema DEBE generar automáticamente un código QR único por cliente que codifique un token aleatorio, descargable en PNG o PDF e imprimible. *(RF-ING-03 · HU-56)*
- **FR-004**: El sistema DEBE permitir regenerar y desactivar códigos QR, inactivando el anterior al regenerar, y listar los QR con su estado. *(RF-ING-04 · HU-56)*
- **FR-005**: El sistema DEBE consultar la información del cliente asociada a un QR escaneado o digitado, sin registrar ingreso, e informar cuando el código no exista. *(RF-ING-05 · HU-57)*
- **FR-006**: El sistema DEBE registrar la entrada de un cliente al escanear su QR, validando QR activo, cliente activo, mayoría de edad, que no esté adentro en la noche y que la ocupación sea menor que el aforo. *(RF-ING-06 · HU-58)*
- **FR-007**: El sistema DEBE mostrar el resultado permitido o denegado con el motivo y registrar fecha, hora, puerta, empleado y dispositivo de cada ingreso y de cada intento fallido. *(RF-ING-07 · HU-58)*
- **FR-008**: El sistema DEBE marcar como prioritarios los ingresos de clientes VIP con acceso prioritario. *(RF-ING-08 · HU-58)*
- **FR-009**: El sistema DEBE permitir el registro manual buscando al cliente por nombre o documento cuando el QR falle. *(RF-ING-09 · HU-58)*
- **FR-010**: El sistema DEBE consultar los ingresos por rango de fechas y cliente, mostrando fecha, hora, puerta y prioridad, y el total del periodo. *(RF-ING-10 · HU-59)*
- **FR-011**: El sistema DEBE generar el reporte de afluencia por rango de fechas con total de ingresos, clientes únicos, distribución por noche y por hora en gráficos e intentos fallidos por motivo, descargable en PDF y CSV. *(RF-ING-11 · HU-60)*
- **FR-012**: El sistema DEBE permitir al Administrador configurar el aforo máximo y el umbral de alerta. *(RF-ING-12 · HU-61)*
- **FR-013**: El sistema DEBE registrar salidas por escaneo de QR y calcular la ocupación de la noche como entradas menos salidas, alertando al superar el umbral. *(RF-ING-13 · HU-61)*
- **FR-014**: [NEEDS CLARIFICATION: Aforo máximo autorizado del establecimiento y por zona; si se cobra entrada (cover) en la puerta — TBD-04, TBD-08.]

### Requerimientos no funcionales aplicables

Aplican todos los principios de `constitution.md` y los RNF transversales del SRS §5. En particular:

- **RNF-REN-01**: La validación de un código QR en la puerta (escaneo, consulta y resultado permitido/denegado) debe completarse en 2 s o menos en el percentil 95 (valor de referencia, TBD-06).
- **RNF-PRI-03**: El código QR debe codificar un identificador aleatorio de al menos 128 bits, sin nombre, documento ni otros datos personales en claro.
- **RNF-SAF-01**: El sistema debe impedir registrar como cliente, dejar ingresar y vender a personas menores de 18 años según su fecha de nacimiento, porque la venta de alcohol a menores está prohibida (Ley 124 de 1994).
- **RNF-SAF-02**: El sistema debe denegar ingresos cuando la ocupación de la noche alcance el aforo máximo configurado, porque superar el aforo autorizado pone en riesgo la seguridad de las personas (TBD-04).
- **RNF-USA-02**: La pantalla de control de ingreso debe operarse con una mano en un celular, en modo oscuro de alto contraste, con botones de al menos 48 × 48 px y el resultado permitido/denegado legible a un metro de distancia.

### Entidades clave (Key Entities)

- **CodigoQR**: Credencial del cliente. Atributos: id_qr, id_cliente, token, estado, generado_en, desactivado_en.
- **Ingreso**: Entrada o salida. Atributos: id_ingreso, id_cliente, tipo, fecha_hora, noche_operacion, puerta, metodo, prioritario, id_empleado, tipo_dispositivo.
- **IntentoFallido**: Ingreso denegado. Atributos: id_intento, token_leido, motivo, fecha_hora, id_empleado.
- **ConfigAforo**: Aforo. Atributos: id_config, aforo_maximo, umbral_alerta.

## Criterios de éxito (Success Criteria) *(obligatorio)*

### Resultados medibles (Measurable Outcomes)

- **SC-001**: El 95 % de las validaciones en la puerta responde en 2 segundos o menos.
- **SC-002**: La ocupación nunca supera el aforo configurado en las pruebas.

## Supuestos (Assumptions)

- Se implementa después de (o junto con) las specs: 007-clientes, 008-clientes-vip.
- La autenticación JWT y la autorización por permisos están disponibles (spec de acceso); mientras no lo estén, los endpoints se prueban con un usuario semilla.

## Insumos para `/speckit.plan` (no normativo)

Detalle orientativo para el plan técnico. No reemplaza las decisiones del plan, pero cualquier desviación debe quedar justificada en `plan.md`.

**API REST sugerida** (base `/api/v1`, sobre `{ ok, data, meta, error }`):

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/ingresos/registro-rapido` | Registrar un cliente en la entrada | HU-55 |
| POST | `/api/v1/clientes/:id/qr` | Generar y gestionar códigos QR | HU-56 |
| PATCH | `/api/v1/qr/:id/estado` | Actualizar estado | HU-56 |
| GET | `/api/v1/qr?estado&q` | Listar o consultar qr | HU-56 |
| GET | `/api/v1/clientes/:id/qr.png` | Listar o consultar qr.png | HU-56 |
| GET | `/api/v1/qr/:token/cliente` | Consultar un cliente por su código QR | HU-57 |
| POST | `/api/v1/ingresos` | Registrar el ingreso con código QR | HU-58 |
| GET | `/api/v1/ingresos/ocupacion` | Listar o consultar ocupacion | HU-58 |
| GET | `/api/v1/ingresos?desde&hasta&q&page&limit` | Consultar el registro de ingresos | HU-59 |
| GET | `/api/v1/reportes/ingresos?desde&hasta&formato` | Generar el reporte de afluencia | HU-60 |
| GET | `/api/v1/configuracion/aforo` | Configurar el aforo y registrar salidas | HU-61 |
| PUT | `/api/v1/configuracion/aforo` | Actualizar (aforo) | HU-61 |
| POST | `/api/v1/ingresos/salidas` | Registrar (salidas) | HU-61 |

**Pantallas (frontend vanilla):**

- Ingreso › Registro rápido — HU-55
- Clientes › Detalle › Código QR; Ingreso › Códigos QR — HU-56
- Ingreso › Verificar QR — HU-57
- Ingreso › Control de entrada (modo puerta) — HU-58
- Ingreso › Registro de ingresos — HU-59
- Ingreso › Reporte de afluencia — HU-60
- Configuración › Aforo; Ingreso › Control de salida — HU-61

**Modelo de datos (lógico):**

*CodigoQR*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_qr | INT | PK |
| id_cliente | INT | FK |
| token | CHAR(32) | único, aleatorio |
| estado | ENUM('activo','inactivo') |  |
| generado_en | DATETIME |  |
| desactivado_en | DATETIME |  |

*Ingreso*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_ingreso | INT | PK |
| id_cliente | INT | FK, nulo si el intento falló |
| tipo | ENUM('entrada','salida') |  |
| fecha_hora | DATETIME | del servidor |
| noche_operacion | DATE |  |
| puerta | VARCHAR(30) |  |
| metodo | ENUM('qr','manual') |  |
| prioritario | BOOLEAN |  |
| id_empleado | INT | FK |
| tipo_dispositivo | VARCHAR(30) |  |

*IntentoFallido*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_intento | INT | PK |
| token_leido | VARCHAR(64) |  |
| motivo | ENUM('qr_invalido','qr_inactivo','cliente_inactivo','menor_edad','aforo_completo','ya_adentro') |  |
| fecha_hora | DATETIME |  |
| id_empleado | INT | FK |

*ConfigAforo*

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_config | INT | PK |
| aforo_maximo | INT | > 0 |
| umbral_alerta | TINYINT | % (por defecto 90) |

**Reglas de negocio:**

- **RN-02**: Toda persona registrada como cliente debe ser mayor de 18 años en la fecha de registro.
- **RN-15**: Un ingreso se permite solo si el QR está activo, el cliente activo y mayor de 18 años, no tiene una entrada sin salida en la misma noche y la ocupación es menor que el aforo; los VIP con acceso prioritario se marcan como prioritarios.
- **RN-16**: Generar un QR nuevo inactiva el anterior del mismo cliente.

## Trazabilidad

| Historia spec | HU | RF | Excel |
|---|---|---|---|
| 1 | HU-55 | RF-ING-01, RF-ING-02 | HU_56 |
| 2 | HU-56 | RF-ING-03, RF-ING-04 | HU_57, HU_64 |
| 3 | HU-57 | RF-ING-05 | HU_58 |
| 4 | HU-58 | RF-ING-06, RF-ING-07, RF-ING-08, RF-ING-09 | HU_59, HU_61 |
| 5 | HU-59 | RF-ING-10 | HU_62 |
| 6 | HU-60 | RF-ING-11 | HU_60, HU_63 |
| 7 | HU-61 | RF-ING-12, RF-ING-13 | Inferida (ficha) |

