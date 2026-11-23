# SRS — Sistema de Gestión Integral para Discoteca

## 1. Introducción

### 1.1 Propósito

Esta Especificación de Requerimientos de Software define el comportamiento funcional y las restricciones no funcionales del **Sistema de Gestión Integral** de una discoteca ubicada en Envigado (Calle 37 # 43A-24), con cerca de 10 años de operación, que ofrece música en vivo, DJs, eventos temáticos, bar, áreas VIP y reserva de mesas (nombre comercial por definir, TBD-01). Cubre el sistema completo: configuración, usuarios y acceso, compras, proveedores y existencias, ingreso de clientes con código QR y clientes VIP, servicios, empleados y su agenda, reservas, eventos con ficha técnica y agenda, clientes, pedidos, ventas, notificaciones, programa de puntos y medición del desempeño.

Esta es la **versión 2.0**. Sustituye a la v1.0 (2026-08-06), que solo recogía una parte de la matriz de historias de usuario. La v2.0 cubre el total del sistema: 20 características, 145 historias de usuario y 207 requerimientos funcionales, y sirve de insumo directo para el Desarrollo Guiado por Especificaciones (Spec-Driven Development) con GitHub spec-kit.

### 1.2 Convenciones del documento

- `RF-<CAR>-##` — requerimiento funcional; `<CAR>` es el código de la característica (tabla de la sección 4). La numeración es correlativa dentro de cada característica y no se reutiliza.
- `RNF-<CAT>-##` — requerimiento no funcional, con categorías fijas: `REN` rendimiento, `SEG` seguridad informática, `PRI` privacidad y datos personales, `SAF` seguridad física/safety, `USA` usabilidad, `CAL` otros atributos de calidad, `TEC` restricción tecnológica.
- `RN-##` — regla de negocio; `HU-##` — historia de usuario (`historias-usuario-Discoteca.md`); `TBD-##` — asunto pendiente (Apéndice C).
- `FR-###` — numeración de requerimientos dentro de cada spec de spec-kit; cada FR indica entre paréntesis el `RF-` del que proviene.
- Prioridad: **Alta** (sin esto el sistema no cumple su propósito), **Media** (el sistema es utilizable con trabajo manual adicional), **Baja** (mejora postergable). La prioridad del RF es la de su historia.
- «Debe» expresa una obligación vinculante. *Fuente* indica la historia v2.0 y el código de la matriz Excel del que proviene, o «inferida» si se dedujo de la ficha.
- La característica (sección 4) equivale a un **módulo**, a una **épica** del archivo de historias y a una **spec** (`specs/NNN-modulo/spec.md`).

### 1.3 Audiencia objetivo y sugerencias de lectura

- **Aprendices / equipo de desarrollo:** secciones 2.5, 3, 4 y 5 completas; luego la spec del módulo asignado y `constitution.md`.
- **QA / pruebas:** sección 4 (columna Verificación), sección 5 y los criterios Given-When-Then del archivo de historias.
- **Cliente (Discoteca (Envigado)):** secciones 1 y 2 para validar alcance y objetivos.
- **Instructores / Product Owner:** sección 4 (trazabilidad), Apéndice C (TBD) y Apéndice D (trazabilidad HU → RF → spec).

### 1.4 Alcance del producto

El sistema es una **aplicación web responsive** que reemplaza los registros manuales de ingreso, inventario y cobro. Agiliza la entrada con código QR y control de aforo, da acceso prioritario a los clientes VIP, controla las existencias del bar con alertas de stock mínimo, registra compras, pedidos y ventas con comprobante, programa al personal por servicio, gestiona reservas de mesas y salas VIP, planifica eventos temáticos y fiestas privadas, fideliza clientes con puntos y notificaciones y entrega los reportes de desempeño que pide la administración.

Objetivos de negocio (ficha): reducir filas y tiempos de espera en el ingreso, evitar faltantes y excesos de inventario, eliminar errores de cobro, contar con información para decidir promociones y recursos, y mejorar la experiencia y la lealtad del cliente.

**Fuera de alcance de esta versión:**

- Venta de boletería en línea y pasarela de pagos: los pagos se registran (efectivo, tarjeta en datáfono, transferencia); no se procesan en línea (TBD-08).
- Domicilios: los pedidos se consumen en el establecimiento (TBD-09).
- Facturación electrónica ante la DIAN, contabilidad y nómina (salarios) de los empleados (TBD-03).
- Recetas de cócteles con descuento automático de insumos (TBD-10).
- Control de dispositivos físicos (torniquetes, cámaras): el lector QR es la cámara del dispositivo o un lector que funciona como teclado.

### 1.5 Referencias

- Ficha del proyecto — `Ficha Proyecto/Proyecto Discoteca_v.02_TCO_Abr 05_2025.docx`.
- Matriz de historias de usuario — `Matriz Historias de Usuario/MHU_Proyecto_Discoteca.xlsx` (230 filas; historias repetidas por rol y el código HU_10 usado dos veces).
- SRS v1.0 e historias v1.0 — `Requisitos (SRS)/v1.0/`.
- IEEE Std 830-1998, *Recommended Practice for Software Requirements Specifications*.
- Ley 1581 de 2012 (protección de datos personales); Ley 1480 de 2011 (Estatuto del Consumidor); Ley 124 de 1994 (prohibición de expendio de bebidas embriagantes a menores de edad); Ley 1801 de 2016 (Código Nacional de Seguridad y Convivencia Ciudadana).
- GitHub spec-kit — https://github.com/github/spec-kit.

## 2. Descripción general

### 2.1 Perspectiva del producto

Producto nuevo que reemplaza los registros manuales. Monolito web: un servidor Node.js/Express expone la API REST y sirve el frontend, sobre MySQL. Servicios externos: correo transaccional y masivo para recuperación de contraseña, alertas de stock, notificaciones de eventos, promociones y cumpleaños (TBD-02). La lectura de códigos QR se hace con la cámara del navegador o con un lector que funciona como teclado.

### 2.2 Funciones del producto

- **Roles y permisos** — registro, consulta, actualización y estado de roles; registro, estado y asociación de permisos.
- **Gestión de usuarios** — registro, consulta, actualización, estado (individual y masivo) y reportes de usuarios.
- **Gestión de acceso** — inicio y cierre de sesión, recuperación y restablecimiento de contraseña, bitácora de accesos.
- **Proveedores** — registro, consulta, actualización, estado con justificación y reportes de proveedores.
- **Productos y existencias** — registro de productos, existencias iniciales, consulta, ajustes, stock mínimo y máximo, estado, reportes y alertas por correo.
- **Compras** — registro, consulta, actualización, flujo de estados y reportes de compras con ingreso de mercancía al inventario.
- **Clientes y categorías de clientes** — categorías de clientes; registro, consulta, actualización, estado y reportes de clientes; registro y perfil del propio cliente.
- **Clientes VIP** — niveles y beneficios VIP; registro, consulta, actualización, estado auditado y reportes de clientes VIP.
- **Control de entradas** — registro rápido de clientes en la puerta, códigos QR, validación de ingreso con aforo, salidas, consulta y reportes de afluencia.
- **Servicios** — registro, consulta, actualización, estado y reportes de los servicios que ofrece la discoteca.
- **Empleados y categorías de empleados** — categorías de empleados (DJ, meseros, ingreso, administrativos); registro, consulta, actualización, estado y reportes de empleados.
- **Agenda de empleados** — programación de turnos y actividades por empleado y servicio, consulta en calendario, actualización, estados y reportes.
- **Reservas** — espacios reservables; registro, consulta, actualización, estados, eliminación y reportes de reservas de mesas y salas VIP; reserva en línea del cliente.
- **Eventos y fichas técnicas** — registro, consulta, actualización, estado y reportes de eventos temáticos y fiestas privadas; ficha técnica por evento con temática, franja horaria, invitados y servicios.
- **Agenda de eventos** — actividades de cada evento (reuniones, montaje, plazos) con empleados y servicios, calendario, estados, reportes, notificaciones por correo y solicitudes de fiestas privadas de los clientes.
- **Pedidos** — registro, consulta, actualización, estados, asociación de clientes y reportes de pedidos de consumo; pre-pedidos del cliente.
- **Ventas** — registro de ventas directas y cobro de pedidos, consulta, estados con anulación, comprobantes de pago y reportes.
- **Notificaciones** — campañas de promociones y eventos especiales, felicitaciones de cumpleaños, plantillas, listas de destinatarios, monitoreo de envíos y baja de suscripciones.
- **Programa de puntos** — reglas de acumulación, recompensas, saldo e historial, acumulación por consumo e ingreso, canje con comprobante y reportes.
- **Medición y desempeño** — top 10 de clientes VIP y generales, servicios más y menos solicitados, programación de empleados por servicio, ventas mes a mes, top 10 de eventos temáticos y comparativo entre eventos temáticos y fiestas privadas.

### 2.3 Clases de usuario y características

| Clase | Descripción | Frecuencia de uso | Privilegios | Importancia |
|---|---|---|---|---|
| Administrador | Dueño o gerente de la discoteca; configura el sistema, compra, programa personal y eventos, analiza el negocio | Diaria | Acceso total | Alta |
| Empleado | Personal de ingreso, meseros, bartenders, DJs y administrativos; registran ingresos, pedidos, ventas, reservas y su agenda según los permisos de su rol | Cada noche de operación | Según rol: ingreso, pedidos, ventas, reservas, existencias, agenda y consultas | Alta |
| Cliente | Persona mayor de 18 años registrada (general o VIP) | Semanal u ocasional | Su perfil y QR, sus reservas, pre-pedidos, solicitudes de fiesta privada, puntos y suscripciones | Media |

### 2.4 Ambiente de operación

Navegadores Chrome, Edge, Firefox y Safari en sus dos últimas versiones mayores. Computador en la administración y la caja; celular o tableta en la puerta (control de ingreso), en el bar y en las mesas (pedidos); celular de los clientes (registro, QR, reservas, puntos). Servidor Node.js 20 LTS y MySQL 8. Operación principalmente nocturna (horario por confirmar, TBD-06).

### 2.5 Restricciones de diseño e implementación

El stack es una restricción del programa de formación (no una preferencia de diseño) y se detalla en `constitution.md`:

| ID | Requerimiento | Prioridad | Verificación |
|---|---|---|---|
| RNF-TEC-01 | El backend debe ser un monolito en Node.js 20 LTS con Express, organizado por capas (rutas, controladores, servicios, repositorios). | Alta | Inspección |
| RNF-TEC-02 | La base de datos debe ser MySQL 8, accedida con `mysql2/promise` mediante pool y consultas parametrizadas, sin ORM. | Alta | Inspección |
| RNF-TEC-03 | El frontend debe construirse con HTML5, CSS3 y JavaScript vanilla (ES2020, módulos ES), sin frameworks ni librerías. | Alta | Inspección |
| RNF-TEC-04 | La comunicación debe hacerse mediante una API REST JSON versionada en `/api/v1` con autenticación JWT. | Alta | Inspección |

### 2.6 Documentación de usuario

Manual de usuario por rol (Administrador, Empleado, Cliente) y manual técnico (instalación, variables de entorno, scripts SQL y colección de pruebas), en PDF.

### 2.7 Supuestos y dependencias

- **Supuesto:** Las historias con rol «Cliente» que piden reportes de ventas y de otros clientes (HU_225 a HU_229) se interpretan como del dueño de la discoteca (el cliente del proyecto); un cliente final no accede a esa información (RNF-PRI-02, TBD-11).
- **Supuesto:** Los productos del bar se venden por unidad de inventario (botella, lata, copa preparada como producto); no hay recetas (TBD-10).
- **Supuesto:** El código QR de cada cliente identifica a la persona y se usa en todas sus visitas; codifica un identificador opaco, no datos personales.
- **Supuesto:** Los empleados son una entidad distinta de los usuarios; un empleado puede tener o no usuario del sistema.
- **Dependencia:** Servicio de correo SMTP o API de correo transaccional con soporte de envíos masivos (TBD-02).

## 3. Requerimientos de interfaz externa

### 3.1 Interfaces de usuario

Interfaz web en español con menú según permisos: Inicio (tablero), Ingreso, Clientes, Clientes VIP, Reservas, Eventos, Agenda, Servicios, Empleados, Pedidos, Ventas, Compras, Proveedores, Existencias, Puntos, Notificaciones, Reportes y Configuración. Portal del cliente con Mi perfil y mi QR, Mis reservas, Mis pedidos, Mis eventos, Mis puntos y Mis suscripciones.

Estándares: tablas con buscador sin distinción de mayúsculas, filtros, orden por columnas y paginación de 10 registros; formularios con validación en línea y confirmación con `<dialog>` antes de guardar cambios de estado, eliminar o anular; mensajes de éxito o error junto al campo o en notificación no bloqueante; estados con etiqueta y color; formato `$ 85.000`, fecha dd/mm/aaaa y hora de 12 horas con a. m./p. m.

Pantalla de control de ingreso pensada para la puerta: modo oscuro de alto contraste, botón de escaneo grande, resultado «Permitido» (verde) o «Denegado» (rojo) con el motivo en texto grande, insignia VIP visible y ocupación actual frente al aforo.

### 3.2 Interfaces de hardware

El sistema usa la cámara del dispositivo (API del navegador) o un lector de códigos QR/barras que funciona como teclado; la impresión de comprobantes usa la impresora del sistema operativo (impresora térmica configurada como impresora estándar). No se controla otro hardware.

### 3.3 Interfaces de software

- **MySQL 8** — almacenamiento de todas las entidades (sección 6.1).
- **Servicio de correo** — recuperación de contraseña, alertas de stock, notificaciones de eventos, campañas y cumpleaños (TBD-02).
- **Generación de PDF, CSV y Excel (.xlsx)** y de imágenes de código QR en el servidor, sin complementos en el equipo del usuario.

### 3.4 Interfaces de comunicaciones

HTTPS (TLS 1.2 o superior) con JSON sobre la API REST `/api/v1` y token JWT en `Authorization: Bearer`. El acceso a la cámara del navegador requiere HTTPS.

## 4. Características del sistema

Códigos de característica: `ROL` Roles y permisos, `USR` Gestión de usuarios, `ACC` Gestión de acceso, `PRV` Proveedores, `PRD` Productos y existencias, `COM` Compras, `CLI` Clientes y categorías de clientes, `VIP` Clientes VIP, `ING` Control de entradas, `SER` Servicios, `EMP` Empleados y categorías de empleados, `AGE` Agenda de empleados, `RES` Reservas, `EVE` Eventos y fichas técnicas, `AGV` Agenda de eventos, `PED` Pedidos, `VEN` Ventas, `NOT` Notificaciones, `PUN` Programa de puntos, `DES` Medición y desempeño.

| § | Característica | Código | Prioridad | HU | RF | Spec |
|---|---|---|---|---|---|---|
| 4.1 | Roles y permisos | ROL | Alta | 9 | 14 | `001-roles-permisos` |
| 4.2 | Gestión de usuarios | USR | Alta | 5 | 6 | `002-gestion-usuarios` |
| 4.3 | Gestión de acceso | ACC | Alta | 5 | 9 | `003-gestion-acceso` |
| 4.4 | Proveedores | PRV | Alta | 5 | 7 | `004-proveedores` |
| 4.5 | Productos y existencias | PRD | Alta | 8 | 12 | `005-productos-existencias` |
| 4.6 | Compras | COM | Alta | 5 | 8 | `006-compras` |
| 4.7 | Clientes y categorías de clientes | CLI | Alta | 11 | 15 | `007-clientes` |
| 4.8 | Clientes VIP | VIP | Alta | 6 | 8 | `008-clientes-vip` |
| 4.9 | Control de entradas | ING | Alta | 7 | 13 | `009-control-entradas` |
| 4.10 | Servicios | SER | Alta | 5 | 5 | `010-servicios` |
| 4.11 | Empleados y categorías de empleados | EMP | Alta | 9 | 10 | `011-empleados` |
| 4.12 | Agenda de empleados | AGE | Alta | 5 | 7 | `012-agenda-empleados` |
| 4.13 | Reservas | RES | Alta | 8 | 12 | `013-reservas` |
| 4.14 | Eventos y fichas técnicas | EVE | Alta | 10 | 16 | `014-eventos` |
| 4.15 | Agenda de eventos | AGV | Media | 12 | 15 | `015-agenda-eventos` |
| 4.16 | Pedidos | PED | Alta | 9 | 11 | `016-pedidos` |
| 4.17 | Ventas | VEN | Alta | 6 | 11 | `017-ventas` |
| 4.18 | Notificaciones | NOT | Media | 7 | 12 | `018-notificaciones` |
| 4.19 | Programa de puntos | PUN | Media | 7 | 10 | `019-programa-puntos` |
| 4.20 | Medición y desempeño | DES | Media | 6 | 6 | `020-desempeno` |

### 4.1 Roles y permisos

**4.1.1 Descripción y prioridad**

Administra los roles (Administrador, Empleado, Cliente y los que se creen, p. ej. Mesero, Personal de ingreso) y sus permisos, con auditoría de cambios. **Prioridad: Alta.**

Actores: Administrador. Historias: HU-01, HU-02, HU-03, HU-04, HU-05, HU-06, HU-07, HU-08, HU-09. Spec: `specs/001-roles-permisos/spec.md`.

**4.1.2 Secuencias de estímulo/respuesta**

| HU | Estímulo del actor | Respuesta del sistema |
|---|---|---|
| HU-01 | Administrador solicita registrar un rol con nombre único y sus permisos | El rol queda activo con fecha y hora de creación y veo «Rol registrado correctamente». |
| HU-02 | Administrador solicita buscar un rol por su nombre y ver su información | Veo el rol Mesero con su descripción, estado, fechas y permisos. |
| HU-03 | Administrador solicita modificar el nombre y los permisos de un rol | Sus usuarios obtienen ese acceso en su siguiente petición y veo «Rol actualizado correctamente». |
| HU-04 | Administrador solicita activar o inactivar un rol | Su etiqueta cambia a Inactivo y veo el mensaje de confirmación. |
| HU-05 | Administrador solicita ver todos los roles con su estado | Veo nombre, número de permisos, número de usuarios y estado, paginados de 10 en 10 y ordenables por nombre y estado. |
| HU-06 | Administrador solicita registrar un permiso con nombre único y descripción | El permiso queda activo con fecha y hora de creación y veo el mensaje de confirmación. |
| HU-07 | Administrador solicita ver los permisos de cada rol organizados por módulo | Veo todos los permisos agrupados por módulo con una casilla marcada en los que tiene. |
| HU-08 | Administrador solicita activar o inactivar un permiso | Deja de ofrecerse en la matriz y se notifica por correo a los demás administradores. |
| HU-09 | Administrador solicita seleccionar los permisos específicos de cada rol | La asignación persiste y queda auditada con quién, cuándo y qué cambió. |

**4.1.3 Requerimientos funcionales**

| ID | Requerimiento | Prioridad | Fuente | Verificación |
|---|---|---|---|---|
| RF-ROL-01 | El sistema debe registrar roles con nombre único (sin distinguir mayúsculas), descripción y al menos un permiso, en estado activo, con fecha y hora de creación. | Alta | HU-01 · HU_01 | Prueba funcional (API) |
| RF-ROL-02 | El sistema debe buscar roles por nombre sin distinguir mayúsculas y mostrar su descripción, estado, fechas de creación y modificación y permisos. | Media | HU-02 · HU_02 | Prueba de interfaz + API |
| RF-ROL-03 | El sistema debe actualizar el nombre y los permisos de un rol, validando que el nombre no esté duplicado y que conserve al menos un permiso. | Alta | HU-03 · HU_03 | Prueba funcional (API) |
| RF-ROL-04 | El sistema debe aplicar los cambios de permisos a los usuarios del rol desde su siguiente petición. | Alta | HU-03 · HU_03 | Prueba funcional (API) |
| RF-ROL-05 | El sistema debe cambiar el estado de un rol entre activo e inactivo con confirmación, mostrando su estado actual. | Alta | HU-04 · HU_04 | Prueba funcional (API) |
| RF-ROL-06 | El sistema debe negar el acceso a todas las funcionalidades a los usuarios cuyo rol esté inactivo. | Alta | HU-04 · HU_04 | Prueba funcional (API) |
| RF-ROL-07 | El sistema debe listar los roles con nombre, número de permisos, número de usuarios y estado, paginados y ordenables por nombre y estado. | Media | HU-05 · HU_05 | Prueba funcional (API) |
| RF-ROL-08 | El sistema debe registrar permisos con nombre único con formato modulo.accion, descripción y módulo, registrando fecha y hora de creación. | Media | HU-06 · HU_06 | Prueba funcional (API) |
| RF-ROL-09 | El sistema debe agrupar los permisos por módulo y permitir filtrarlos para manejar un número grande de ellos. | Media | HU-06 · HU_06 | Prueba funcional (API) |
| RF-ROL-10 | El sistema debe mostrar, para cada rol, los permisos agrupados por módulo con su estado de asignación, permitiendo marcar y desmarcar permisos individualmente. | Media | HU-07 · HU_07 | Prueba de interfaz + API |
| RF-ROL-11 | El sistema debe permitir solo al Administrador cambiar el estado de permisos que no estén asociados a ningún rol. | Baja | HU-08 · HU_08 | Prueba funcional (API) |
| RF-ROL-12 | El sistema debe notificar por correo a los demás administradores la inactivación de un permiso. | Baja | HU-08 · HU_08 | Prueba funcional (entorno de pruebas de correo) |
| RF-ROL-13 | El sistema debe asociar permisos activos a un rol, impidiendo asignaciones repetidas y roles sin permisos. | Alta | HU-09 · HU_09 | Prueba funcional (API) |
| RF-ROL-14 | El sistema debe auditar cada cambio de asignación con usuario, fecha y hora, permisos agregados y retirados. | Alta | HU-09 · HU_09 | Prueba funcional (API) |

### 4.2 Gestión de usuarios

**4.2.1 Descripción y prioridad**

Administra las cuentas de acceso del personal y de los clientes registrados. **Prioridad: Alta.**

Actores: Administrador. Historias: HU-10, HU-11, HU-12, HU-13, HU-14. Depende de: 001-roles-permisos. Spec: `specs/002-gestion-usuarios/spec.md`.

**4.2.2 Secuencias de estímulo/respuesta**

| HU | Estímulo del actor | Respuesta del sistema |
|---|---|---|
| HU-10 | Administrador solicita registrar un usuario con nombre de usuario, correo, contraseña, rol y estado | El usuario queda registrado y veo el mensaje de confirmación. |
| HU-11 | Administrador solicita buscar usuarios y ver su información | Veo los coincidentes paginados. |
| HU-12 | Administrador solicita modificar la información de un usuario | Veo «Usuario actualizado correctamente» y queda la fecha y hora de la actualización. |
| HU-13 | Administrador solicita activar o inactivar uno o varios usuarios a la vez | No puede iniciar sesión y el cambio queda en su historial. |
| HU-14 | Administrador solicita generar un reporte de usuarios por fecha, rol y estado | Descargo un PDF o CSV con nombre de usuario, correo, rol, fecha de creación y estado, y los totales por rol. |

**4.2.3 Requerimientos funcionales**

| ID | Requerimiento | Prioridad | Fuente | Verificación |
|---|---|---|---|---|
| RF-USR-01 | El sistema debe registrar usuarios con nombre de usuario único, nombre completo, correo único y válido, contraseña según la política, rol activo y estado. | Alta | HU-10 · HU_10 | Prueba funcional (API) |
| RF-USR-02 | El sistema debe buscar usuarios por nombre de usuario, correo o id con resultados paginados y mostrar su detalle sin la contraseña. | Alta | HU-11 · HU_10 | Prueba de interfaz + API |
| RF-USR-03 | El sistema debe actualizar los datos del usuario excepto el nombre de usuario, validándolos y registrando fecha y hora de la última actualización. | Media | HU-12 · HU_11 | Prueba funcional (API) |
| RF-USR-04 | El sistema debe cambiar el estado de un usuario o de varios seleccionados en una sola operación, registrando cada cambio en el historial del usuario. | Alta | HU-13 · HU_12 | Prueba funcional (API) |
| RF-USR-05 | El sistema debe impedir el acceso a los usuarios inactivos y la inactivación del único Administrador activo. | Alta | HU-13 · HU_12 | Prueba funcional (API) |
| RF-USR-06 | El sistema debe generar el reporte de usuarios filtrable por fecha de creación, rol y estado, con totales por rol, descargable en PDF o CSV. | Baja | HU-14 · HU_13 | Prueba funcional (API) |

### 4.3 Gestión de acceso

**4.3.1 Descripción y prioridad**

Controla el ingreso al sistema de administradores, empleados y clientes y la recuperación de contraseña. **Prioridad: Alta.**

Actores: Administrador, Empleado, Cliente. Historias: HU-15, HU-16, HU-17, HU-18, HU-19. Depende de: 002-gestion-usuarios. Spec: `specs/003-gestion-acceso/spec.md`.

**4.3.2 Secuencias de estímulo/respuesta**

| HU | Estímulo del actor | Respuesta del sistema |
|---|---|---|
| HU-15 | Administrador, Empleado o Cliente solicita iniciar sesión con mi usuario o correo y contraseña | El sistema me lleva a la pantalla de mi rol (tablero, ingreso o portal del cliente). |
| HU-16 | Usuario registrado solicita solicitar un enlace para recuperar mi contraseña con mi correo o usuario | Recibo un enlace de un solo uso que vence en 30 minutos. |
| HU-17 | Usuario registrado solicita crear una nueva contraseña desde el enlace recibido | Veo «Contraseña actualizada» y se me notifica por correo el cambio. |
| HU-18 | Usuario autenticado solicita cerrar mi sesión de forma segura | El token se invalida en el servidor y vuelvo a la página de inicio de sesión. |
| HU-19 | Administrador solicita consultar los intentos de inicio de sesión | Veo fecha, hora, usuario, resultado y dispositivo, filtrables por usuario y resultado. |

**4.3.3 Requerimientos funcionales**

| ID | Requerimiento | Prioridad | Fuente | Verificación |
|---|---|---|---|---|
| RF-ACC-01 | El sistema debe autenticar con usuario o correo y contraseña, validando que la cuenta y su rol estén activos, y redirigir a la pantalla inicial del rol. | Alta | HU-15 · HU_14, HU_17, HU_20 | Prueba de interfaz + API |
| RF-ACC-02 | El sistema debe bloquear la cuenta 15 minutos tras 3 intentos fallidos consecutivos. | Alta | HU-15 · HU_14, HU_17, HU_20 | Prueba funcional (API) |
| RF-ACC-03 | El sistema debe registrar cada intento de inicio de sesión con fecha, hora, usuario, resultado y tipo de dispositivo. | Alta | HU-15 · HU_14, HU_17, HU_20 | Prueba funcional (API) |
| RF-ACC-04 | El sistema debe ofrecer la opción de recordar el nombre de usuario en el dispositivo, sin almacenar la contraseña. | Alta | HU-15 · HU_14, HU_17, HU_20 | Prueba funcional (API) |
| RF-ACC-05 | El sistema debe enviar, a partir del correo o nombre de usuario, un enlace de restablecimiento de un solo uso con vigencia de 30 minutos, mostrando el mismo mensaje exista o no la cuenta. | Alta | HU-16 · HU_15, HU_18, HU_21 | Prueba funcional (entorno de pruebas de correo) |
| RF-ACC-06 | El sistema debe restablecer la contraseña con un enlace vigente, exigiendo la política de complejidad y la confirmación, e invalidar el enlace al usarlo. | Alta | HU-17 · Inferida (ficha) | Prueba funcional (API) |
| RF-ACC-07 | El sistema debe notificar por correo al usuario que su contraseña fue cambiada. | Alta | HU-17 · Inferida (ficha) | Prueba funcional (entorno de pruebas de correo) |
| RF-ACC-08 | El sistema debe cerrar la sesión invalidando el token en el servidor y redirigir al inicio de sesión. | Alta | HU-18 · HU_16, HU_19, HU_22 | Prueba funcional (API) |
| RF-ACC-09 | El sistema debe mostrar la bitácora de intentos de inicio de sesión filtrable por fechas, usuario y resultado. | Baja | HU-19 · Inferida (ficha) | Inspección + prueba funcional |

### 4.4 Proveedores

**4.4.1 Descripción y prioridad**

Centraliza la información de los proveedores de bebidas, insumos y servicios, con sus documentos e historial de cambios. **Prioridad: Alta.**

Actores: Administrador, Empleado. Historias: HU-20, HU-21, HU-22, HU-23, HU-24. Depende de: 001-roles-permisos. Spec: `specs/004-proveedores/spec.md`.

**4.4.2 Secuencias de estímulo/respuesta**

| HU | Estímulo del actor | Respuesta del sistema |
|---|---|---|
| HU-20 | Administrador o Empleado solicita registrar un proveedor con su documento, contacto y documentos de soporte | El proveedor queda activo con un id único y veo el mensaje de confirmación. |
| HU-21 | Administrador o Empleado solicita buscar proveedores y ver su información completa | Veo los coincidentes, filtrables por estado y tipo de producto. |
| HU-22 | Administrador o Empleado solicita modificar la información de un proveedor | Se actualiza, queda en el historial con fecha, hora y usuario y veo el mensaje de confirmación. |
| HU-23 | Administrador o Empleado solicita cambiar el estado de un proveedor con una nota que lo justifique | El cambio queda registrado con fecha, hora y usuario y el estado se muestra en todas las vistas. |
| HU-24 | Administrador o Empleado solicita generar reportes de proveedores con filtros | Descargo un PDF o CSV con nombre, documento, contacto, fecha de registro y estado. |

**4.4.3 Requerimientos funcionales**

| ID | Requerimiento | Prioridad | Fuente | Verificación |
|---|---|---|---|---|
| RF-PRV-01 | El sistema debe registrar proveedores con tipo y número de documento único, razón social, dirección, contacto, teléfono, correo válido y tipo de producto, en estado activo. | Alta | HU-20 · HU_33, HU_38 | Prueba funcional (API) |
| RF-PRV-02 | El sistema debe permitir adjuntar documentos del proveedor (RUT, cámara de comercio, contrato, certificaciones) en PDF, JPG o PNG de máximo 5 MB. | Alta | HU-20 · HU_33, HU_38 | Prueba funcional (API) |
| RF-PRV-03 | El sistema debe buscar proveedores por id, nombre o parte del nombre, filtrables por estado y tipo de producto, y mostrar su detalle con documentos e historial de cambios. | Alta | HU-21 · HU_34, HU_39 | Prueba de interfaz + API |
| RF-PRV-04 | El sistema debe actualizar cualquier campo del proveedor validando los obligatorios y registrar cada cambio en su historial con usuario, fecha y hora. | Media | HU-22 · HU_35, HU_40 | Prueba funcional (API) |
| RF-PRV-05 | El sistema debe cambiar el estado del proveedor (activo, inactivo, suspendido) con nota obligatoria, registrando fecha, hora y usuario. | Media | HU-23 · HU_36, HU_41 | Prueba funcional (API) |
| RF-PRV-06 | El sistema debe impedir compras nuevas a proveedores inactivos o suspendidos. | Media | HU-23 · HU_36, HU_41 | Prueba funcional (API) |
| RF-PRV-07 | El sistema debe generar el reporte de proveedores filtrable por estado, nombre y fecha de registro, descargable en PDF o CSV. | Baja | HU-24 · HU_37, HU_42 | Prueba funcional (API) |

### 4.5 Productos y existencias

**4.5.1 Descripción y prioridad**

Controla los productos del bar y sus existencias con límites mínimo y máximo, movimientos auditados y alertas por correo cuando un producto llega al mínimo. **Prioridad: Alta.**

Actores: Administrador, Empleado. Historias: HU-25, HU-26, HU-27, HU-28, HU-29, HU-30, HU-31, HU-32. Depende de: 001-roles-permisos. Spec: `specs/005-productos-existencias/spec.md`.

**4.5.2 Secuencias de estímulo/respuesta**

| HU | Estímulo del actor | Respuesta del sistema |
|---|---|---|
| HU-25 | Administrador solicita registrar un producto del bar con código, tipo, precio y límites de stock | El producto queda activo con existencia 0. |
| HU-26 | Administrador o Empleado solicita registrar la cantidad inicial en stock de cada producto | La existencia queda en 24 con un movimiento «inicial» y veo el mensaje de confirmación. |
| HU-27 | Administrador o Empleado solicita consultar la cantidad disponible de los productos en tiempo real | Veo existencia actual, mínimo, máximo y estado, con un indicador de color (rojo en o bajo el mínimo, amarillo cerca del mínimo, verde normal). |
| HU-28 | Administrador o Empleado solicita aumentar o disminuir la existencia de un producto por una entrada o salida con su motivo | La existencia queda en 8 y se registra el movimiento con fecha, hora y usuario. |
| HU-29 | Administrador o Empleado solicita definir el stock mínimo y máximo de cada producto | Se guardan y se muestran en su ficha. |
| HU-30 | Empleado o Administrador solicita cambiar el estado de un producto | Deja de ofrecerse en pedidos y ventas y el cambio queda registrado con fecha, hora y usuario. |
| HU-31 | Administrador o Empleado solicita generar reportes del estado y movimiento del inventario | Descargo un PDF o CSV con existencia, mínimo, máximo, estado, entradas y salidas del periodo y la fecha y hora de generación. |
| HU-32 | Administrador o Empleado solicita recibir un correo cuando un producto llegue a su stock mínimo | Se envía un correo a los destinatarios configurados con el producto, la existencia actual y el mínimo. |

**4.5.3 Requerimientos funcionales**

| ID | Requerimiento | Prioridad | Fuente | Verificación |
|---|---|---|---|---|
| RF-PRD-01 | El sistema debe registrar productos con código único, nombre, tipo, unidad, precio de venta, indicador de alcohol, stock mínimo y máximo, en estado activo con existencia 0. | Alta | HU-25 · Inferida (ficha) | Prueba funcional (API) |
| RF-PRD-02 | El sistema debe registrar la existencia inicial de un producto existente con cantidad entera no negativa y fecha, una sola vez, como movimiento de inventario. | Alta | HU-26 · HU_43, HU_49 | Prueba funcional (API) |
| RF-PRD-03 | El sistema debe consultar productos por id o nombre mostrando existencia actual, stock mínimo y máximo, estado e indicador de nivel, con filtros y orden. | Alta | HU-27 · HU_44, HU_50 | Prueba funcional (API) |
| RF-PRD-04 | El sistema debe registrar ajustes de entrada o salida con cantidad entera y motivo obligatorio, impidiendo existencias negativas o mayores al máximo. | Alta | HU-28 · HU_45, HU_51 | Prueba funcional (API) |
| RF-PRD-05 | El sistema debe registrar cada ajuste como movimiento auditado y mostrar el kardex del producto. | Alta | HU-28 · HU_45, HU_51 | Prueba de interfaz + API |
| RF-PRD-06 | El sistema debe definir valores enteros de stock mínimo y máximo por producto, validando que el mínimo sea menor que el máximo. | Alta | HU-29 · HU_46, HU_53 | Prueba funcional (API) |
| RF-PRD-07 | El sistema debe cambiar el estado de un producto entre activo e inactivo con registro de fecha, hora y usuario, mostrando la lista de estados posibles. | Media | HU-30 · HU_52 | Prueba funcional (API) |
| RF-PRD-08 | El sistema debe marcar automáticamente como agotado un producto sin existencia y reactivarlo al recibir mercancía. | Media | HU-30 · HU_52 | Prueba funcional (API) |
| RF-PRD-09 | El sistema debe generar el reporte de inventario con existencia, límites, estado y movimientos del periodo, filtrable por producto, tipo y fechas, en PDF o CSV. | Media | HU-31 · HU_47, HU_54 | Prueba funcional (API) |
| RF-PRD-10 | El sistema debe enviar por correo alertas de productos con existencia igual o menor al mínimo, con producto, existencia y mínimo, según la frecuencia configurada (inmediata, diaria o semanal). | Alta | HU-32 · HU_48, HU_55 | Prueba funcional (entorno de pruebas de correo) |
| RF-PRD-11 | El sistema debe permitir configurar los correos destinatarios y la frecuencia de las alertas. | Alta | HU-32 · HU_48, HU_55 | Prueba funcional (API) |
| RF-PRD-12 | El sistema debe mostrar en el tablero los productos en alerta. | Alta | HU-32 · HU_48, HU_55 | Prueba de interfaz + API |

### 4.6 Compras

**4.6.1 Descripción y prioridad**

Registra las compras a proveedores con sus productos, adjuntos y flujo de estados (pendiente, aprobada, pagada, recibida, anulada); al recibir la compra se suman las existencias. **Prioridad: Alta.**

Actores: Administrador, Empleado. Historias: HU-33, HU-34, HU-35, HU-36, HU-37. Depende de: 004-proveedores, 005-productos-existencias. Spec: `specs/006-compras/spec.md`.

**4.6.2 Secuencias de estímulo/respuesta**

| HU | Estímulo del actor | Respuesta del sistema |
|---|---|---|
| HU-33 | Administrador o Empleado solicita registrar una compra con fecha, proveedor, descripción, productos y factura adjunta | La compra queda pendiente con número consecutivo, el total calculado y veo el mensaje de confirmación. |
| HU-34 | Administrador o Empleado solicita buscar compras y ver sus detalles | Veo una lista paginada con número, fecha, proveedor, total y estado. |
| HU-35 | Administrador o Empleado solicita corregir o completar la información de una compra | El total se recalcula, se conserva el registro del cambio y veo el mensaje de confirmación. |
| HU-36 | Administrador o Empleado solicita avanzar la compra por su flujo de estados con un comentario | Las existencias de sus productos aumentan, se registran los movimientos y el cambio queda en el historial con fecha, usuario y comentario. |
| HU-37 | Administrador o Empleado solicita generar reportes de compras por periodo, proveedor y estado | Veo el total comprado, el número de compras y el detalle, exportable a PDF, CSV o Excel. |

**4.6.3 Requerimientos funcionales**

| ID | Requerimiento | Prioridad | Fuente | Verificación |
|---|---|---|---|---|
| RF-COM-01 | El sistema debe registrar compras con fecha no futura, proveedor activo, descripción y uno o más productos con cantidad entera y costo unitario, calculando el total, en estado pendiente. | Alta | HU-33 · HU_23, HU_28 | Prueba funcional (API) |
| RF-COM-02 | El sistema debe permitir adjuntar facturas y soportes (PDF, JPG o PNG, máximo 5 MB) a la compra. | Alta | HU-33 · HU_23, HU_28 | Prueba funcional (API) |
| RF-COM-03 | El sistema debe buscar compras por fecha, proveedor, número o descripción, filtrables por estado, con resultados paginados y detalle de productos, adjuntos e historial de estados. | Alta | HU-34 · HU_24, HU_29 | Prueba funcional (API) |
| RF-COM-04 | El sistema debe actualizar proveedor, descripción, productos y adjuntos de compras pendientes o aprobadas, recalculando el total y registrando los cambios. | Media | HU-35 · HU_25, HU_30 | Prueba funcional (API) |
| RF-COM-05 | El sistema debe permitir cambiar la fecha de compra solo al Administrador y solo en compras pendientes. | Media | HU-35 · HU_25, HU_30 | Prueba funcional (API) |
| RF-COM-06 | El sistema debe cambiar el estado de la compra solo a los estados válidos del flujo, registrando fecha, usuario y comentario, y mostrar su historial de estados. | Alta | HU-36 · HU_26, HU_31 | Prueba de interfaz + API |
| RF-COM-07 | El sistema debe sumar las existencias y recalcular el costo promedio de los productos al pasar la compra a recibida, en la misma transacción. | Alta | HU-36 · HU_26, HU_31 | Prueba funcional (API) |
| RF-COM-08 | El sistema debe generar reportes de compras por periodo (diario, semanal, mensual, anual), proveedor y estado con el importe total, exportables a PDF, CSV y Excel. | Media | HU-37 · HU_27, HU_32 | Prueba funcional (API) |

### 4.7 Clientes y categorías de clientes

**4.7.1 Descripción y prioridad**

Gestiona las categorías comerciales y la información de los clientes (mayores de 18 años), su autorización de datos y su código QR, y permite que el cliente se registre y mantenga su perfil. **Prioridad: Alta.**

Actores: Administrador, Empleado, Cliente. Historias: HU-38, HU-39, HU-40, HU-41, HU-42, HU-43, HU-44, HU-45, HU-46, HU-47, HU-48. Depende de: 002-gestion-usuarios. Spec: `specs/007-clientes/spec.md`.

**4.7.2 Secuencias de estímulo/respuesta**

| HU | Estímulo del actor | Respuesta del sistema |
|---|---|---|
| HU-38 | Administrador o Empleado solicita registrar una categoría de clientes con nombre único y descripción | La categoría queda activa con fecha y hora de creación y veo el mensaje de confirmación. |
| HU-39 | Administrador o Empleado solicita ver y buscar las categorías de clientes | Veo nombre, descripción, número de clientes, estado y fecha de creación, ordenables por nombre o fecha. |
| HU-40 | Administrador o Empleado solicita modificar el nombre y la descripción de una categoría | Veo el mensaje de confirmación y queda la fecha y hora de la última actualización. |
| HU-41 | Administrador o Empleado solicita activar o inactivar una categoría de clientes | Ya no se ofrece al registrar clientes y el cambio queda con fecha y hora. |
| HU-42 | Administrador o Empleado solicita registrar un cliente con sus datos, categoría y autorizaciones | El cliente queda activo, se genera su código QR y veo el mensaje de confirmación. |
| HU-43 | Administrador o Empleado solicita buscar clientes y ver su información | Veo los coincidentes con categoría, condición VIP y estado. |
| HU-44 | Administrador o Empleado solicita modificar los datos de un cliente | Veo el mensaje de confirmación y el cambio queda en su historial con fecha y hora. |
| HU-45 | Administrador o Empleado solicita activar o inactivar un cliente | Su QR deja de permitir el ingreso y el cambio queda con fecha y hora. |
| HU-46 | Administrador o Empleado solicita generar reportes de clientes con filtros | Descargo un PDF, CSV o Excel con los clientes y los totales por categoría. |
| HU-47 | Visitante solicita crear mi cuenta de cliente | Se crea mi cuenta de Cliente, recibo un correo de bienvenida y veo mi código QR. |
| HU-48 | Cliente solicita editar mis datos personales y ver mi código QR | Veo «Perfil actualizado». |

**4.7.3 Requerimientos funcionales**

| ID | Requerimiento | Prioridad | Fuente | Verificación |
|---|---|---|---|---|
| RF-CLI-01 | El sistema debe registrar categorías de clientes con nombre único y descripción opcional, en estado activa, con fecha y hora de creación. | Media | HU-38 · HU_163, HU_167 | Prueba funcional (API) |
| RF-CLI-02 | El sistema debe listar las categorías de clientes con nombre, descripción, número de clientes, estado y fecha de creación, ordenables y con búsqueda por parte del nombre. | Media | HU-39 · HU_164, HU_168 | Prueba funcional (API) |
| RF-CLI-03 | El sistema debe actualizar nombre y descripción de la categoría validando que el nombre no esté duplicado y registrando la fecha de la última actualización. | Media | HU-40 · HU_165, HU_169 | Prueba funcional (API) |
| RF-CLI-04 | El sistema debe cambiar el estado de la categoría entre activa e inactiva (reversible), registrando fecha y hora, e impedir asignar clientes a categorías inactivas. | Media | HU-41 · HU_166, HU_170 | Prueba funcional (API) |
| RF-CLI-05 | El sistema debe registrar clientes con nombre, apellido, tipo y número de documento único, fecha de nacimiento, teléfono, correo, dirección, ciudad, categoría activa y autorizaciones de datos y de promociones, registrando fecha y hora. | Alta | HU-42 · HU_171, HU_176 | Prueba funcional (API) |
| RF-CLI-06 | El sistema debe rechazar el registro de personas menores de 18 años. | Alta | HU-42 · HU_171, HU_176 | Prueba funcional (API) |
| RF-CLI-07 | El sistema debe generar el código QR del cliente al registrarlo. | Alta | HU-42 · HU_171, HU_176 | Prueba funcional (API) |
| RF-CLI-08 | El sistema debe buscar clientes por nombre, documento, id o correo y mostrar su detalle con QR, últimos ingresos, saldo de puntos e historial de cambios. | Alta | HU-43 · HU_172, HU_177 | Prueba de interfaz + API |
| RF-CLI-09 | El sistema debe actualizar los datos del cliente validando correo y teléfono y registrar cada cambio en su historial. | Media | HU-44 · HU_173, HU_178 | Prueba funcional (API) |
| RF-CLI-10 | El sistema debe cambiar el estado del cliente entre activo e inactivo desde una lista, registrando fecha y hora, e impedir ingresos, reservas, pedidos y acumulación de puntos a los inactivos. | Media | HU-45 · HU_174, HU_179 | Prueba funcional (API) |
| RF-CLI-11 | El sistema debe generar el reporte de clientes filtrable por estado, categoría, condición VIP, fecha de registro y nombre, exportable a PDF, CSV y Excel. | Baja | HU-46 · HU_175, HU_180 | Prueba funcional (API) |
| RF-CLI-12 | El sistema debe permitir el registro de clientes mayores de 18 años con sus datos, contraseña, autorización de datos y autorización opcional de promociones, enviando un correo de bienvenida. | Alta | HU-47 · HU_181 | Prueba funcional (API) |
| RF-CLI-13 | El sistema debe vincular la cuenta nueva a la ficha de cliente existente con el mismo documento cuando no tenga usuario. | Alta | HU-47 · HU_181 | Prueba funcional (API) |
| RF-CLI-14 | El sistema debe permitir al cliente editar dirección, teléfono, correo y preferencias, impidiendo cambiar documento y fecha de nacimiento. | Media | HU-48 · HU_182 | Prueba funcional (API) |
| RF-CLI-15 | El sistema debe mostrar al cliente su código QR vigente para descargarlo. | Media | HU-48 · HU_182 | Prueba de interfaz + API |

### 4.8 Clientes VIP

**4.8.1 Descripción y prioridad**

Gestiona la condición VIP de los clientes (nivel, beneficios exclusivos y acceso prioritario) y su ciclo de vida. **Prioridad: Alta.**

Actores: Administrador, Empleado. Historias: HU-49, HU-50, HU-51, HU-52, HU-53, HU-54. Depende de: 007-clientes. Spec: `specs/008-clientes-vip/spec.md`.

**4.8.2 Secuencias de estímulo/respuesta**

| HU | Estímulo del actor | Respuesta del sistema |
|---|---|---|
| HU-49 | Administrador o Empleado solicita otorgar la condición VIP a un cliente con su nivel y beneficios | Queda como VIP activo con id único y veo el mensaje de confirmación. |
| HU-50 | Administrador o Empleado solicita buscar clientes VIP y ver su información | Veo los VIP coincidentes con nivel, estado y beneficios. |
| HU-51 | Administrador o Empleado solicita actualizar los datos y el nivel VIP de un cliente | Se guardan, queda la fecha y hora de la última actualización y veo el mensaje de confirmación. |
| HU-52 | Administrador o Empleado solicita activar o inactivar la condición VIP con una razón | Pierde los beneficios, se registran fecha y razón y queda un registro de auditoría. |
| HU-53 | Administrador o Empleado solicita generar reportes de clientes VIP con filtros | Veo el total de VIP, activos, inactivos y por nivel, exportable a PDF, CSV o Excel. |
| HU-54 | Administrador solicita definir los niveles VIP con sus descuentos, multiplicador de puntos y acceso prioritario | Esos beneficios se aplican a los VIP de ese nivel. |

**4.8.3 Requerimientos funcionales**

| ID | Requerimiento | Prioridad | Fuente | Verificación |
|---|---|---|---|---|
| RF-VIP-01 | El sistema debe registrar la condición VIP de un cliente activo con nivel, fecha de inicio, fecha de fin opcional, observaciones y adjuntos, en estado activo. | Alta | HU-49 · HU_65, HU_70 | Prueba funcional (API) |
| RF-VIP-02 | El sistema debe permitir crear el cliente durante el registro VIP aplicando las validaciones de cliente. | Alta | HU-49 · HU_65, HU_70 | Prueba funcional (API) |
| RF-VIP-03 | El sistema debe buscar clientes VIP por id, nombre, documento o correo y mostrar su nivel, beneficios, estado e historial de interacciones, exportable a PDF o CSV. | Media | HU-50 · HU_66, HU_71 | Prueba de interfaz + API |
| RF-VIP-04 | El sistema debe actualizar los datos del cliente VIP y su nivel y beneficios, excepto el identificador, registrando fecha y hora de la actualización. | Media | HU-51 · HU_67, HU_72 | Prueba funcional (API) |
| RF-VIP-05 | El sistema debe cambiar el estado VIP entre activo e inactivo con razón obligatoria al inactivar, registrando fecha y auditoría de cada cambio. | Media | HU-52 · HU_68, HU_73 | Inspección + prueba funcional |
| RF-VIP-06 | El sistema debe generar el reporte de clientes VIP filtrable por periodo, nivel y estado con totales, exportable a PDF, CSV y Excel. | Baja | HU-53 · HU_69, HU_74 | Prueba funcional (API) |
| RF-VIP-07 | El sistema debe gestionar niveles VIP con nombre único, descuentos en reservas y consumo (0–100 %), multiplicador de puntos, acceso prioritario y descripción de beneficios. | Media | HU-54 · Inferida (ficha) | Prueba funcional (API) |
| RF-VIP-08 | El sistema debe aplicar automáticamente los beneficios del nivel en reservas, ventas, acumulación de puntos e ingreso. | Media | HU-54 · Inferida (ficha) | Prueba funcional (API) |

### 4.9 Control de entradas

**4.9.1 Descripción y prioridad**

Controla el ingreso de los clientes con su código QR: valida identidad, edad, estado y aforo, da prioridad a los VIP, registra salidas para conocer la ocupación y entrega reportes de afluencia. **Prioridad: Alta.**

Actores: Administrador, Empleado. Historias: HU-55, HU-56, HU-57, HU-58, HU-59, HU-60, HU-61. Depende de: 007-clientes, 008-clientes-vip. Spec: `specs/009-control-entradas/spec.md`.

**4.9.2 Secuencias de estímulo/respuesta**

| HU | Estímulo del actor | Respuesta del sistema |
|---|---|---|
| HU-55 | Administrador o Empleado de ingreso solicita registrar rápidamente en la puerta a un cliente nuevo con su documento | Se crea el cliente con su QR y veo la confirmación con la opción de registrar su ingreso de inmediato. |
| HU-56 | Administrador o Empleado solicita generar, asociar, desactivar y listar los códigos QR de los clientes | Se genera automáticamente un QR único legible por cualquier lector, visible en su perfil y descargable o imprimible. |
| HU-57 | Administrador o Empleado de ingreso solicita escanear o digitar un QR y ver la información del cliente | Veo nombre, documento parcialmente oculto, edad, foto si existe, condición VIP, estado y fecha de registro, sin registrar ingreso. |
| HU-58 | Empleado de ingreso o Administrador solicita escanear el QR de cada cliente y registrar su entrada | Veo «Permitido» en verde, se registra la entrada con fecha, hora y empleado y la ocupación pasa a 351. |
| HU-59 | Empleado o Administrador solicita consultar los ingresos por fechas o cliente | Veo la lista de ingresos con cliente, fecha, hora, puerta y prioridad, y el total de ingresos del periodo. |
| HU-60 | Administrador o Empleado solicita generar reportes de ingresos con gráficos | Veo total de ingresos, clientes únicos, ingresos por noche y por hora en gráficos, intentos fallidos por motivo y la lista de ingresos, descargable en PDF o CSV. |
| HU-61 | Administrador o Empleado de ingreso solicita configurar el aforo máximo y registrar la salida de los clientes | La pantalla de ingreso y el tablero muestran la alerta. |

**4.9.3 Requerimientos funcionales**

| ID | Requerimiento | Prioridad | Fuente | Verificación |
|---|---|---|---|---|
| RF-ING-01 | El sistema debe permitir un registro rápido de clientes en la puerta con nombre, documento, fecha de nacimiento, teléfono opcional y autorización de datos, generando su QR. | Alta | HU-55 · HU_56 | Prueba funcional (API) |
| RF-ING-02 | El sistema debe detectar documentos ya registrados y mostrar el cliente existente. | Alta | HU-55 · HU_56 | Prueba de interfaz + API |
| RF-ING-03 | El sistema debe generar automáticamente un código QR único por cliente que codifique un token aleatorio, descargable en PNG o PDF e imprimible. | Alta | HU-56 · HU_57, HU_64 | Prueba funcional (API) |
| RF-ING-04 | El sistema debe permitir regenerar y desactivar códigos QR, inactivando el anterior al regenerar, y listar los QR con su estado. | Alta | HU-56 · HU_57, HU_64 | Prueba funcional (API) |
| RF-ING-05 | El sistema debe consultar la información del cliente asociada a un QR escaneado o digitado, sin registrar ingreso, e informar cuando el código no exista. | Alta | HU-57 · HU_58 | Prueba funcional (API) |
| RF-ING-06 | El sistema debe registrar la entrada de un cliente al escanear su QR, validando QR activo, cliente activo, mayoría de edad, que no esté adentro en la noche y que la ocupación sea menor que el aforo. | Alta | HU-58 · HU_59, HU_61 | Prueba funcional (API) |
| RF-ING-07 | El sistema debe mostrar el resultado permitido o denegado con el motivo y registrar fecha, hora, puerta, empleado y dispositivo de cada ingreso y de cada intento fallido. | Alta | HU-58 · HU_59, HU_61 | Prueba de interfaz + API |
| RF-ING-08 | El sistema debe marcar como prioritarios los ingresos de clientes VIP con acceso prioritario. | Alta | HU-58 · HU_59, HU_61 | Prueba funcional (API) |
| RF-ING-09 | El sistema debe permitir el registro manual buscando al cliente por nombre o documento cuando el QR falle. | Alta | HU-58 · HU_59, HU_61 | Prueba funcional (API) |
| RF-ING-10 | El sistema debe consultar los ingresos por rango de fechas y cliente, mostrando fecha, hora, puerta y prioridad, y el total del periodo. | Media | HU-59 · HU_62 | Prueba funcional (API) |
| RF-ING-11 | El sistema debe generar el reporte de afluencia por rango de fechas con total de ingresos, clientes únicos, distribución por noche y por hora en gráficos e intentos fallidos por motivo, descargable en PDF y CSV. | Media | HU-60 · HU_60, HU_63 | Prueba funcional (API) |
| RF-ING-12 | El sistema debe permitir al Administrador configurar el aforo máximo y el umbral de alerta. | Alta | HU-61 · Inferida (ficha) | Prueba funcional (API) |
| RF-ING-13 | El sistema debe registrar salidas por escaneo de QR y calcular la ocupación de la noche como entradas menos salidas, alertando al superar el umbral. | Alta | HU-61 · Inferida (ficha) | Prueba funcional (API) |

### 4.10 Servicios

**4.10.1 Descripción y prioridad**

Gestiona el catálogo de servicios (alquiler de espacios y servicios adicionales como DJ, decoración, sonido, iluminación y catering) que se usan en reservas, eventos, agenda y ventas. **Prioridad: Alta.**

Actores: Administrador, Empleado. Historias: HU-62, HU-63, HU-64, HU-65, HU-66. Depende de: 001-roles-permisos. Spec: `specs/010-servicios/spec.md`.

**4.10.2 Secuencias de estímulo/respuesta**

| HU | Estímulo del actor | Respuesta del sistema |
|---|---|---|
| HU-62 | Administrador o Empleado solicita registrar un servicio con nombre, descripción, precio, categoría e imágenes | El servicio queda activo y veo el mensaje de confirmación. |
| HU-63 | Administrador o Empleado solicita buscar servicios y ver su información | Veo los coincidentes o un mensaje si no hay. |
| HU-64 | Administrador o Empleado solicita modificar nombre, descripción, precio e imágenes de un servicio | Se actualiza (edición parcial) y veo el mensaje de confirmación. |
| HU-65 | Administrador o Empleado solicita activar o inactivar un servicio | Deja de ofrecerse y el cambio queda con fecha y hora. |
| HU-66 | Administrador o Empleado solicita generar reportes de los servicios con sus solicitudes e ingresos | Veo cada servicio con las veces solicitado (reservas, eventos y ventas) y los ingresos generados, descargable en PDF o CSV. |

**4.10.3 Requerimientos funcionales**

| ID | Requerimiento | Prioridad | Fuente | Verificación |
|---|---|---|---|---|
| RF-SER-01 | El sistema debe registrar servicios con nombre único, descripción, precio no negativo, categoría e imágenes opcionales (JPG, PNG o WEBP, máximo 2 MB), en estado activo. | Alta | HU-62 · HU_75, HU_80 | Prueba funcional (API) |
| RF-SER-02 | El sistema debe buscar servicios por nombre, parte del nombre o categoría, filtrables por estado, y mostrar su detalle. | Alta | HU-63 · HU_76, HU_81 | Prueba de interfaz + API |
| RF-SER-03 | El sistema debe actualizar parcial o totalmente un servicio validando campos obligatorios y formato de precio. | Media | HU-64 · HU_77, HU_82 | Prueba funcional (API) |
| RF-SER-04 | El sistema debe cambiar el estado del servicio entre activo e inactivo, mostrando el estado actual y registrando fecha y hora del cambio. | Media | HU-65 · HU_78, HU_83 | Prueba funcional (API) |
| RF-SER-05 | El sistema debe generar el reporte de servicios por fecha, categoría, estado y servicio con número de solicitudes e ingresos generados, en PDF o CSV. | Media | HU-66 · HU_79, HU_84 | Prueba funcional (API) |

### 4.11 Empleados y categorías de empleados

**4.11.1 Descripción y prioridad**

Gestiona las categorías del personal y la información de los empleados, que se programan en la agenda y se asignan a servicios y eventos. **Prioridad: Alta.**

Actores: Administrador. Historias: HU-67, HU-68, HU-69, HU-70, HU-71, HU-72, HU-73, HU-74, HU-75. Depende de: 002-gestion-usuarios. Spec: `specs/011-empleados/spec.md`.

**4.11.2 Secuencias de estímulo/respuesta**

| HU | Estímulo del actor | Respuesta del sistema |
|---|---|---|
| HU-67 | Administrador solicita registrar categorías de empleado como DJ, Mesero, Ingreso y Administrativo | Veo el mensaje de confirmación. |
| HU-68 | Administrador solicita buscar una categoría por nombre o id y ver su información | Veo nombre, descripción, estado y número de empleados; si no existe, veo un mensaje. |
| HU-69 | Administrador solicita modificar nombre, descripción y estado de una categoría | Veo el mensaje de confirmación. |
| HU-70 | Administrador solicita activar o inactivar una categoría de empleado | Se registra fecha y hora y no se ofrece al registrar empleados. |
| HU-71 | Administrador solicita registrar a un empleado con sus datos y su categoría | El empleado queda activo con id único, fecha y hora de registro y veo el mensaje de confirmación. |
| HU-72 | Administrador solicita buscar y listar empleados con filtros | Veo los coincidentes con categoría y estado, ordenables y filtrables por categoría y estado. |
| HU-73 | Administrador solicita modificar la información personal y laboral de un empleado | Veo el mensaje de confirmación y el cambio queda en su historial con fecha y hora. |
| HU-74 | Administrador solicita activar o inactivar a un empleado | Su estado se muestra en el perfil, se registra fecha y hora y su usuario (si tiene) queda inactivo. |
| HU-75 | Administrador solicita generar reportes de empleados por categoría y estado | Descargo un PDF o CSV con los empleados y los totales por categoría. |

**4.11.3 Requerimientos funcionales**

| ID | Requerimiento | Prioridad | Fuente | Verificación |
|---|---|---|---|---|
| RF-EMP-01 | El sistema debe registrar categorías de empleado con nombre único, descripción y estado inicial. | Media | HU-67 · HU_85 | Prueba funcional (API) |
| RF-EMP-02 | El sistema debe buscar categorías de empleado por nombre o id y mostrar nombre, descripción, estado y número de empleados. | Baja | HU-68 · HU_86 | Prueba de interfaz + API |
| RF-EMP-03 | El sistema debe actualizar nombre, descripción y estado de la categoría validando que el nombre no esté en uso y permitir descartar los cambios antes de guardar. | Baja | HU-69 · HU_87 | Prueba funcional (API) |
| RF-EMP-04 | El sistema debe cambiar el estado de la categoría registrando fecha y hora e impedir asignar empleados a categorías inactivas. | Baja | HU-70 · HU_88 | Prueba funcional (API) |
| RF-EMP-05 | El sistema debe registrar empleados con nombre, apellido, documento único, fecha de nacimiento (mayor de edad), contacto, categoría activa y fecha de ingreso, en estado activo. | Alta | HU-71 · HU_89 | Prueba funcional (API) |
| RF-EMP-06 | El sistema debe permitir crear y vincular el usuario del sistema del empleado. | Alta | HU-71 · HU_89 | Prueba funcional (API) |
| RF-EMP-07 | El sistema debe buscar empleados por nombre, apellido, documento o id, con lista ordenable y filtrable por categoría y estado. | Alta | HU-72 · HU_90 | Prueba funcional (API) |
| RF-EMP-08 | El sistema debe actualizar la información personal y la categoría del empleado, validándola y registrando cada cambio en su historial. | Media | HU-73 · HU_91 | Prueba funcional (API) |
| RF-EMP-09 | El sistema debe cambiar el estado del empleado con confirmación, registrar fecha y hora, inactivar su usuario vinculado y listar sus turnos futuros afectados. | Media | HU-74 · HU_92 | Prueba funcional (API) |
| RF-EMP-10 | El sistema debe generar el reporte de empleados filtrable por categoría y estado con totales, en PDF y CSV. | Baja | HU-75 · HU_93 | Prueba funcional (API) |

### 4.12 Agenda de empleados

**4.12.1 Descripción y prioridad**

Programa los turnos y actividades de cada empleado asociados a un servicio (y opcionalmente a un evento), evitando cruces de horario. **Prioridad: Alta.**

Actores: Administrador, Empleado. Historias: HU-76, HU-77, HU-78, HU-79, HU-80. Depende de: 010-servicios, 011-empleados. Spec: `specs/012-agenda-empleados/spec.md`.

**4.12.2 Secuencias de estímulo/respuesta**

| HU | Estímulo del actor | Respuesta del sistema |
|---|---|---|
| HU-76 | Administrador o Empleado solicita registrar un turno o actividad con empleado, servicio, fechas y descripción | La actividad queda pendiente y veo el mensaje de confirmación. |
| HU-77 | Administrador o Empleado solicita ver la agenda en calendario con filtros | Veo las actividades con fecha, hora, servicio y descripción. |
| HU-78 | Administrador o Empleado solicita modificar fecha, hora, servicio y descripción de una actividad | Se guarda y veo el mensaje de confirmación. |
| HU-79 | Administrador o Empleado solicita marcar una actividad como completada o cancelada | Se registra fecha y hora del cambio y veo el mensaje de confirmación. |
| HU-80 | Administrador o Empleado solicita generar reportes de la agenda por fecha, empleado, servicio y estado | Descargo un PDF o CSV con fecha, hora, descripción, empleado, servicio, estado y horas programadas por empleado. |

**4.12.3 Requerimientos funcionales**

| ID | Requerimiento | Prioridad | Fuente | Verificación |
|---|---|---|---|---|
| RF-AGE-01 | El sistema debe registrar actividades de agenda con empleado activo, servicio activo opcional, título, descripción e inicio y fin válidos, en estado pendiente. | Alta | HU-76 · HU_94, HU_98, HU_100 | Prueba funcional (API) |
| RF-AGE-02 | El sistema debe impedir actividades que se crucen con otras no canceladas del mismo empleado. | Alta | HU-76 · HU_94, HU_98, HU_100 | Prueba funcional (API) |
| RF-AGE-03 | El sistema debe mostrar la asociación empleado-servicio en la agenda y en los reportes. | Alta | HU-76 · HU_94, HU_98, HU_100 | Prueba de interfaz + API |
| RF-AGE-04 | El sistema debe mostrar la agenda en vista de calendario (día, semana, mes) y de lista, filtrable por empleado, fecha, servicio, título y estado, limitando al Empleado a su propia agenda. | Alta | HU-77 · HU_95, HU_101 | Prueba de interfaz + API |
| RF-AGE-05 | El sistema debe actualizar título, descripción, fechas y servicio de actividades pendientes, validando fechas y ausencia de cruces. | Media | HU-78 · HU_96, HU_102 | Prueba funcional (API) |
| RF-AGE-06 | El sistema debe cambiar el estado de las actividades entre pendiente, completado y cancelado, mostrando el estado actual y registrando fecha y hora del cambio. | Media | HU-79 · HU_97, HU_103 | Prueba funcional (API) |
| RF-AGE-07 | El sistema debe generar el reporte de agenda filtrable por fecha, empleado, servicio y estado, con horas programadas por empleado, en PDF o CSV. | Media | HU-80 · HU_99, HU_104 | Prueba funcional (API) |

### 4.13 Reservas

**4.13.1 Descripción y prioridad**

Gestiona las reservas de mesas y salas VIP con validación de disponibilidad y capacidad, servicios adicionales con descuentos VIP y el ciclo de estados de cada reserva. **Prioridad: Alta.**

Actores: Administrador, Empleado, Cliente. Historias: HU-81, HU-82, HU-83, HU-84, HU-85, HU-86, HU-87, HU-88. Depende de: 007-clientes, 010-servicios. Spec: `specs/013-reservas/spec.md`.

**4.13.2 Secuencias de estímulo/respuesta**

| HU | Estímulo del actor | Respuesta del sistema |
|---|---|---|
| HU-81 | Administrador solicita registrar las mesas y salas VIP con su capacidad, zona y consumo mínimo | Queda activo y disponible para reservas. |
| HU-82 | Administrador o Empleado solicita registrar la reserva de una mesa o sala VIP para un cliente | La reserva queda pendiente con código único y veo el mensaje de confirmación. |
| HU-83 | Administrador o Empleado solicita buscar las reservas y ver sus detalles | Veo fecha, hora, tipo, espacio, cliente, personas y estado, ordenables por fecha, hora o cliente. |
| HU-84 | Administrador o Empleado solicita modificar fecha, hora, personas o cliente de una reserva | Se guarda, queda en el historial y veo el mensaje de confirmación. |
| HU-85 | Administrador o Empleado solicita confirmar, cancelar o marcar cumplida una reserva | Queda confirmada con fecha y hora del cambio y el cliente recibe un correo de confirmación. |
| HU-86 | Administrador o Empleado solicita eliminar reservas canceladas o erróneas | Desaparece de la lista y la eliminación queda en el historial con usuario y fecha. |
| HU-87 | Administrador o Empleado solicita generar reportes de reservas por periodo, tipo y cliente | Veo número de reservas por estado, ocupación por espacio, ingresos por servicios adicionales y el detalle, en PDF o CSV. |
| HU-88 | Cliente solicita reservar una mesa o sala VIP desde mi celular | Veo los espacios disponibles con su consumo mínimo y al elegir uno la reserva queda pendiente. |

**4.13.3 Requerimientos funcionales**

| ID | Requerimiento | Prioridad | Fuente | Verificación |
|---|---|---|---|---|
| RF-RES-01 | El sistema debe gestionar espacios reservables (mesas y salas VIP) con nombre único, tipo, zona, capacidad, consumo mínimo y estado. | Alta | HU-81 · Inferida (ficha) | Prueba funcional (API) |
| RF-RES-02 | El sistema debe registrar reservas con fecha y hora futuras, tipo y espacio, número de personas, cliente existente o nuevo y servicios adicionales, en estado pendiente con código único. | Alta | HU-82 · HU_105, HU_111 | Prueba funcional (API) |
| RF-RES-03 | El sistema debe validar la disponibilidad del espacio y su capacidad, sugiriendo espacios disponibles cuando no lo esté. | Alta | HU-82 · HU_105, HU_111 | Prueba funcional (API) |
| RF-RES-04 | El sistema debe aplicar el descuento del nivel VIP del cliente a los servicios adicionales de la reserva. | Alta | HU-82 · HU_105, HU_111 | Prueba funcional (API) |
| RF-RES-05 | El sistema debe buscar reservas por fecha, hora, tipo, cliente o código, con lista ordenable y filtrable y detalle con servicios adicionales. | Alta | HU-83 · HU_106, HU_112 | Prueba funcional (API) |
| RF-RES-06 | El sistema debe actualizar fecha, hora, número de personas, cliente y servicios de reservas pendientes o confirmadas, validando disponibilidad y capacidad y registrando el historial de cambios. | Media | HU-84 · HU_107, HU_113 | Prueba funcional (API) |
| RF-RES-07 | El sistema debe cambiar el estado de la reserva entre pendiente, confirmada y cancelada, registrando fecha y hora y notificando al cliente por correo. | Alta | HU-85 · HU_108 | Prueba funcional (entorno de pruebas de correo) |
| RF-RES-08 | El sistema debe marcar como cumplida la reserva confirmada cuando el cliente ingresa esa noche. | Alta | HU-85 · HU_108 | Prueba funcional (API) |
| RF-RES-09 | El sistema debe eliminar reservas pendientes o canceladas con confirmación, registrando la eliminación en el historial. | Baja | HU-86 · HU_109, HU_114 | Prueba funcional (API) |
| RF-RES-10 | El sistema debe generar el reporte de reservas por periodo (día, semana, mes, año), tipo y cliente, con totales por estado, ocupación por espacio e ingresos, en PDF o CSV. | Media | HU-87 · HU_110, HU_115 | Prueba funcional (API) |
| RF-RES-11 | El sistema debe permitir al cliente consultar disponibilidad y crear reservas propias en estado pendiente. | Alta | HU-88 · Inferida (ficha) | Prueba funcional (API) |
| RF-RES-12 | El sistema debe permitir al cliente ver sus reservas y cancelarlas hasta 2 horas antes de la hora reservada. | Alta | HU-88 · Inferida (ficha) | Prueba funcional (API) |

### 4.14 Eventos y fichas técnicas

**4.14.1 Descripción y prioridad**

Gestiona los eventos (temáticos de la discoteca y fiestas privadas de clientes) y su ficha técnica, que planifica temática, franja horaria, invitados y servicios. Es el par padre-hijo `/eventos` → `/fichas-tecnicas`. **Prioridad: Alta.**

Actores: Administrador, Empleado. Historias: HU-89, HU-90, HU-91, HU-92, HU-93, HU-94, HU-95, HU-96, HU-97, HU-98. Depende de: 010-servicios, 007-clientes. Spec: `specs/014-eventos/spec.md`.

**4.14.2 Secuencias de estímulo/respuesta**

| HU | Estímulo del actor | Respuesta del sistema |
|---|---|---|
| HU-89 | Administrador o Empleado solicita registrar un evento con nombre, tipo, fechas, ubicación, capacidad, imagen y adjuntos | El evento queda programado con código único y aparece en la lista. |
| HU-90 | Administrador o Empleado solicita buscar eventos y ver su información detallada | Veo los coincidentes. |
| HU-91 | Administrador o Empleado solicita modificar la información de un evento registrado | Se reflejan en la lista y veo el mensaje de confirmación. |
| HU-92 | Empleado o Administrador solicita cambiar el estado de un evento | El cambio se registra con fecha y hora y se muestra el estado actual. |
| HU-93 | Administrador o Empleado solicita generar reportes de eventos por periodo, tipo y estado | Veo cantidad de eventos por tipo, temática y estado y el listado de asistentes de un evento, con fecha y hora de generación, en PDF o CSV. |
| HU-94 | Administrador o Empleado solicita registrar la ficha técnica de un evento con temática, franja horaria, invitados y servicios | La ficha queda pendiente y veo el mensaje de confirmación. |
| HU-95 | Administrador o Empleado solicita buscar fichas técnicas y ver su información | Veo las fichas coincidentes paginadas. |
| HU-96 | Administrador o Empleado solicita modificar temática, franja, invitados y servicios de una ficha | Se guarda, queda en el historial y veo el mensaje de confirmación. |
| HU-97 | Administrador o Empleado solicita cambiar el estado de la ficha con una nota | El cambio queda con fecha y hora. |
| HU-98 | Administrador o Empleado solicita generar reportes de fichas técnicas agrupadas por temática | Veo la cantidad de eventos por temática y un resumen de cada evento (fecha, hora, invitados, servicios), con fecha y hora de generación, en PDF o CSV. |

**4.14.3 Requerimientos funcionales**

| ID | Requerimiento | Prioridad | Fuente | Verificación |
|---|---|---|---|---|
| RF-EVE-01 | El sistema debe registrar eventos con nombre, tipo (temático o fiesta privada), descripción, ubicación, fechas de inicio y fin coherentes, capacidad máxima no mayor al aforo e imagen, con código único, en estado programado. | Alta | HU-89 · HU_116, HU_120 | Prueba funcional (API) |
| RF-EVE-02 | El sistema debe exigir el cliente asociado en las fiestas privadas. | Alta | HU-89 · HU_116, HU_120 | Prueba funcional (API) |
| RF-EVE-03 | El sistema debe permitir adjuntar archivos al evento (PDF, PPTX, JPG o PNG, máximo 10 MB). | Alta | HU-89 · HU_116, HU_120 | Prueba funcional (API) |
| RF-EVE-04 | El sistema debe listar los eventos paginados con búsqueda por nombre, código, fecha, ubicación o tipo y filtro por estado, y mostrar el detalle con ficha técnica y adjuntos. | Alta | HU-90 · HU_117, HU_121 | Prueba de interfaz + API |
| RF-EVE-05 | El sistema debe actualizar cualquier dato del evento excepto su código, validando los obligatorios y la coherencia de fechas. | Alta | HU-91 · HU_118, HU_122 | Prueba funcional (API) |
| RF-EVE-06 | El sistema debe permitir actualizar eventos en curso solo en capacidad, descripción, ubicación y ampliación de la hora de fin. | Alta | HU-91 · HU_118, HU_122 | Prueba funcional (API) |
| RF-EVE-07 | El sistema debe cambiar el estado del evento según el flujo solicitado → programado → en curso → finalizado, o a cancelado desde cualquier estado previo a finalizado, registrando fecha y hora. | Alta | HU-92 · HU_123 | Prueba funcional (API) |
| RF-EVE-08 | El sistema debe, al cancelar un evento, cancelar su ficha técnica y actividades pendientes y notificar a los usuarios asociados. | Alta | HU-92 · HU_123 | Prueba funcional (entorno de pruebas de correo) |
| RF-EVE-09 | El sistema debe generar reportes de eventos por periodo, tipo, temática y estado, y el listado de asistentes por evento, en PDF o CSV con fecha y hora de generación. | Media | HU-93 · HU_119, HU_124 | Prueba de interfaz + API |
| RF-EVE-10 | El sistema debe registrar una ficha técnica por evento con temática (de la lista o nueva), franja horaria dentro de las fechas del evento, cantidad de invitados entre 0 y la capacidad del evento y servicios activos con su cantidad, en estado pendiente. | Alta | HU-94 · HU_125, HU_130 | Prueba funcional (API) |
| RF-EVE-11 | El sistema debe permitir crear temáticas nuevas desde la ficha técnica. | Alta | HU-94 · HU_125, HU_130 | Prueba funcional (API) |
| RF-EVE-12 | El sistema debe buscar fichas técnicas por id, evento, temática, franja horaria o rango de fechas, paginadas, y mostrar su detalle con servicios e historial. | Alta | HU-95 · HU_126, HU_131 | Prueba de interfaz + API |
| RF-EVE-13 | El sistema debe actualizar temática, franja horaria, invitados y servicios de fichas pendientes o en proceso, con las mismas validaciones del registro, registrando el historial de cambios. | Alta | HU-96 · HU_127, HU_132 | Prueba funcional (API) |
| RF-EVE-14 | El sistema debe cambiar el estado de la ficha entre pendiente, en proceso, completado y cancelado, con nota opcional, registrando fecha y hora. | Media | HU-97 · HU_128, HU_133 | Prueba funcional (API) |
| RF-EVE-15 | El sistema debe permitir completar la ficha solo si todos sus servicios están registrados. | Media | HU-97 · HU_128, HU_133 | Prueba funcional (API) |
| RF-EVE-16 | El sistema debe generar el reporte de fichas técnicas agrupadas por temática con cantidad de eventos y resumen por evento, filtrable por rango de fechas, en PDF o CSV. | Media | HU-98 · HU_129, HU_134 | Prueba funcional (API) |

### 4.15 Agenda de eventos

**4.15.1 Descripción y prioridad**

Organiza las actividades de cada evento con sus responsables y servicios, envía recordatorios por correo a empleados y clientes y permite a los clientes solicitar y seguir sus fiestas privadas. **Prioridad: Media.**

Actores: Administrador, Empleado, Cliente. Historias: HU-99, HU-100, HU-101, HU-102, HU-103, HU-104, HU-105, HU-106, HU-107, HU-108, HU-109, HU-110. Depende de: 014-eventos, 011-empleados, 012-agenda-empleados. Spec: `specs/015-agenda-eventos/spec.md`.

**4.15.2 Secuencias de estímulo/respuesta**

| HU | Estímulo del actor | Respuesta del sistema |
|---|---|---|
| HU-99 | Administrador o Empleado solicita registrar una actividad de un evento con fechas, título, descripción, ubicación y adjuntos | Queda pendiente con fecha y hora de creación y veo el mensaje de confirmación. |
| HU-100 | Administrador o Empleado solicita ver la agenda de eventos con filtros | Veo las actividades con fecha, hora, título, descripción y estado, paginadas. |
| HU-101 | Administrador o Empleado solicita modificar los datos y responsables de una actividad | Se guarda con fecha, hora y usuario de la modificación y las agendas de los empleados se actualizan. |
| HU-102 | Administrador o Empleado solicita cambiar el estado de una actividad | El cambio se registra con fecha y hora. |
| HU-103 | Administrador solicita asociar empleados y servicios a cada actividad del evento | La asociación se guarda, se muestra en la actividad y se crea la actividad en la agenda de cada empleado. |
| HU-104 | Administrador o Empleado solicita generar reportes de la agenda de eventos por empleado, servicio, fecha y estado | Descargo un PDF o CSV con las actividades de cada empleado. |
| HU-105 | Administrador o Empleado solicita que empleados y clientes asociados reciban correos sobre fechas clave, reuniones y plazos del evento | Cada empleado recibe un correo con título, fecha, hora, ubicación y descripción. |
| HU-106 | Cliente solicita solicitar una fiesta privada con fecha, horario, descripción, invitados y servicios | Se crea un evento tipo fiesta privada en estado solicitado y veo el mensaje de confirmación. |
| HU-107 | Cliente solicita ver los eventos temáticos programados y mis fiestas privadas | Veo los eventos temáticos programados con nombre, fecha, hora, imagen y descripción, filtrables por fecha. |
| HU-108 | Cliente solicita modificar los datos de mi fiesta privada antes de que sea aprobada | Veo los datos actuales antes de editar y al guardar veo el mensaje de confirmación. |
| HU-109 | Cliente solicita ver el estado de mi fiesta privada y cancelarla si lo necesito | Veo su estado actual y el historial de cambios con fecha y hora. |
| HU-110 | Cliente solicita seleccionar y cambiar los servicios de mi fiesta privada | Veo los servicios asociados y el valor estimado. |

**4.15.3 Requerimientos funcionales**

| ID | Requerimiento | Prioridad | Fuente | Verificación |
|---|---|---|---|---|
| RF-AGV-01 | El sistema debe registrar actividades de evento con evento no cancelado, título, tipo, descripción, ubicación, inicio y fin coherentes y adjuntos opcionales, registrando fecha y hora de creación. | Media | HU-99 · HU_135, HU_142 | Prueba funcional (API) |
| RF-AGV-02 | El sistema debe mostrar la agenda de eventos en calendario y lista paginada, filtrable por fecha, evento, empleado, servicio y estado y con búsqueda por palabra clave. | Media | HU-100 · HU_136, HU_143 | Prueba de interfaz + API |
| RF-AGV-03 | El sistema debe actualizar los datos y las asignaciones de empleados y servicios de una actividad, controlando la coherencia de fechas y registrando fecha, hora y usuario de la modificación. | Media | HU-101 · HU_137, HU_144 | Prueba funcional (API) |
| RF-AGV-04 | El sistema debe cambiar el estado de las actividades según el flujo definido, registrando fecha y hora de cada cambio. | Media | HU-102 · HU_138, HU_145 | Prueba funcional (API) |
| RF-AGV-05 | El sistema debe asociar empleados activos y servicios activos a una actividad de evento y mostrar la lista de asociados. | Alta | HU-103 · HU_139 | Prueba de interfaz + API |
| RF-AGV-06 | El sistema debe crear la actividad correspondiente en la agenda de cada empleado asignado, validando que no tenga cruces. | Alta | HU-103 · HU_139 | Prueba funcional (API) |
| RF-AGV-07 | El sistema debe generar reportes de la agenda de eventos por empleado, servicio, fecha y estado, en PDF o CSV. | Baja | HU-104 · HU_140, HU_146 | Prueba funcional (API) |
| RF-AGV-08 | El sistema debe enviar recordatorios por correo a los empleados y clientes asociados a las actividades de un evento con antelación configurable por tipo de actividad (24 horas por defecto). | Media | HU-105 · HU_141, HU_147 | Prueba funcional (entorno de pruebas de correo) |
| RF-AGV-09 | El sistema debe usar una plantilla de correo configurable y registrar el estado de cada envío con el motivo de falla. | Media | HU-105 · HU_141, HU_147 | Prueba funcional (API) |
| RF-AGV-10 | El sistema debe permitir al cliente solicitar fiestas privadas con nombre, fecha y hora de inicio y fin futuras y coherentes, descripción, invitados estimados y servicios deseados, creando el evento en estado solicitado. | Alta | HU-106 · HU_148 | Prueba funcional (API) |
| RF-AGV-11 | El sistema debe notificar al cliente por correo la aprobación o el rechazo de su solicitud. | Alta | HU-106 · HU_148 | Prueba funcional (entorno de pruebas de correo) |
| RF-AGV-12 | El sistema debe mostrar al cliente la cartelera de eventos temáticos programados y el detalle de sus propias fiestas privadas. | Media | HU-107 · HU_149 | Prueba de interfaz + API |
| RF-AGV-13 | El sistema debe permitir al cliente modificar nombre, fechas, descripción, invitados y servicios de sus solicitudes en estado solicitado, validando las fechas. | Media | HU-108 · HU_150 | Prueba funcional (API) |
| RF-AGV-14 | El sistema debe mostrar al cliente el estado y el historial de estados de sus fiestas privadas y permitirle cancelar las que estén en estado solicitado. | Media | HU-109 · HU_151 | Prueba de interfaz + API |
| RF-AGV-15 | El sistema debe permitir al cliente seleccionar servicios activos con cantidad para su solicitud mientras esté en estado solicitado, mostrando los asociados y el valor estimado. | Media | HU-110 · HU_152 | Prueba funcional (API) |

### 4.16 Pedidos

**4.16.1 Descripción y prioridad**

Gestiona los pedidos de consumo en mesas, salas VIP y barra: productos y servicios, mesero, cliente, estados con historial y descuento de existencias al entregar. Los clientes pueden hacer pre-pedidos asociados a su reserva. **Prioridad: Alta.**

Actores: Administrador, Empleado, Cliente. Historias: HU-111, HU-112, HU-113, HU-114, HU-115, HU-116, HU-117, HU-118, HU-119. Depende de: 005-productos-existencias, 007-clientes, 013-reservas. Spec: `specs/016-pedidos/spec.md`.

**4.16.2 Secuencias de estímulo/respuesta**

| HU | Estímulo del actor | Respuesta del sistema |
|---|---|---|
| HU-111 | Administrador o Empleado solicita registrar un pedido con ubicación, mesero, cliente, productos, cantidades y método de pago | El pedido queda en «pendiente de confirmación» con número único, fecha y hora automáticas y veo su resumen. |
| HU-112 | Administrador o Empleado solicita buscar pedidos y ver su estado e historial | Veo los pedidos con su estado actual. |
| HU-113 | Administrador o Empleado solicita agregar o quitar productos, cambiar cantidades y método de pago de un pedido | El total se recalcula y se registran fecha, hora y empleado de la modificación. |
| HU-114 | Administrador o Empleado solicita avanzar el pedido por sus estados con una nota | Se descuentan las existencias, el cambio queda con fecha, hora, empleado y nota y veo la confirmación. |
| HU-115 | Administrador o Empleado solicita vincular un cliente registrado a un pedido | Queda asociado con fecha y hora y veo la confirmación. |
| HU-116 | Administrador o Empleado solicita generar reportes de pedidos por fecha, estado, cliente y producto | Veo cantidad de pedidos por estado, total vendido, productos más pedidos y tiempo promedio de entrega, en PDF o CSV. |
| HU-117 | Cliente solicita pedir con anticipación productos o servicios para mi reserva | Se genera un número de pedido en estado pendiente de confirmación y recibo un correo de confirmación. |
| HU-118 | Cliente solicita ver mis pedidos y su estado | Veo cada pedido con productos, cantidades, fecha, ubicación y estado. |
| HU-119 | Cliente solicita cambiar mi pre-pedido antes de que se prepare | Se valida, se guarda y recibo un correo de confirmación. |

**4.16.3 Requerimientos funcionales**

| ID | Requerimiento | Prioridad | Fuente | Verificación |
|---|---|---|---|---|
| RF-PED-01 | El sistema debe registrar pedidos con ubicación (barra, mesa o sala), mesero, cliente opcional, productos y servicios activos con cantidad y precio, y método de pago previsto, con número único, fecha y hora automáticas, en estado pendiente de confirmación. | Alta | HU-111 · HU_183, HU_189 | Prueba funcional (API) |
| RF-PED-02 | El sistema debe validar la existencia disponible de cada producto al agregarlo. | Alta | HU-111 · HU_183, HU_189 | Prueba funcional (API) |
| RF-PED-03 | El sistema debe buscar pedidos por número, fecha, estado, cliente y ubicación y mostrar su detalle con el historial de estados. | Alta | HU-112 · HU_184, HU_190 | Prueba de interfaz + API |
| RF-PED-04 | El sistema debe permitir agregar y quitar productos, cambiar cantidades, ubicación y método de pago en pedidos no entregados, recalculando el total y registrando fecha, hora y empleado. | Alta | HU-113 · HU_185, HU_191 | Prueba funcional (API) |
| RF-PED-05 | El sistema debe cambiar el estado del pedido solo a estados válidos del flujo, con nota opcional, registrando fecha, hora y usuario, y restringiendo por rol la cancelación de pedidos en preparación. | Alta | HU-114 · HU_186, HU_192 | Prueba funcional (API) |
| RF-PED-06 | El sistema debe descontar las existencias al marcar el pedido como entregado, en la misma transacción. | Alta | HU-114 · HU_186, HU_192 | Prueba funcional (API) |
| RF-PED-07 | El sistema debe asociar un cliente activo a un pedido buscándolo por nombre, documento o QR, registrando fecha y hora de la asociación. | Media | HU-115 · HU_187, HU_193 | Prueba funcional (API) |
| RF-PED-08 | El sistema debe generar reportes de pedidos filtrables por fecha, estado, cliente y producto con cantidad, total, productos más pedidos y tiempo promedio de entrega, en PDF o CSV. | Media | HU-116 · HU_188, HU_194 | Prueba funcional (API) |
| RF-PED-09 | El sistema debe permitir al cliente registrar pre-pedidos asociados a una reserva propia confirmada, con productos, cantidades y método de pago previsto, confirmándolos por correo. | Media | HU-117 · HU_195 | Prueba funcional (API) |
| RF-PED-10 | El sistema debe mostrar al cliente sus pedidos con búsqueda por número o rango de fechas y detalle de productos y estado. | Media | HU-118 · HU_196 | Prueba de interfaz + API |
| RF-PED-11 | El sistema debe permitir al cliente modificar productos, cantidades y método de pago de sus pedidos en estado pendiente de confirmación, notificándole el cambio por correo. | Baja | HU-119 · HU_197 | Prueba funcional (entorno de pruebas de correo) |

### 4.17 Ventas

**4.17.1 Descripción y prioridad**

Registra las ventas (venta directa en barra o cobro de un pedido entregado) con descuentos VIP, canjes e impuestos, descuenta existencias, acumula puntos y emite el comprobante de pago numerado. **Prioridad: Alta.**

Actores: Administrador, Empleado. Historias: HU-120, HU-121, HU-122, HU-123, HU-124, HU-125. Depende de: 016-pedidos, 005-productos-existencias. Spec: `specs/017-ventas/spec.md`.

**4.17.2 Secuencias de estímulo/respuesta**

| HU | Estímulo del actor | Respuesta del sistema |
|---|---|---|
| HU-120 | Administrador o Empleado solicita registrar una venta con productos, cantidades, precios, descuentos, impuestos y método de pago | Queda pagada como consumidor final con número de comprobante, fecha y hora automáticas, las existencias se descuentan y veo el mensaje de confirmación. |
| HU-121 | Empleado o Administrador solicita convertir un pedido entregado en venta y cobrarlo | Se crea la venta pagada con sus ítems, el pedido pasa a pagado y se emite el comprobante. |
| HU-122 | Administrador o Empleado solicita buscar ventas y ver su detalle | Veo número, fecha, cliente, total, método de pago y estado, ordenables. |
| HU-123 | Administrador o Empleado solicita cambiar el estado de una venta a un estado válido | Se registra fecha y hora, se descuentan existencias y se otorgan puntos. |
| HU-124 | Administrador o Empleado solicita generar el comprobante de pago de cada venta | Obtengo en 3 segundos o menos un PDF imprimible con número único, datos de la empresa, fecha, cliente, productos, cantidades, precios, descuentos, impuestos, total y puntos acumulados. |
| HU-125 | Administrador o Empleado solicita generar reportes de ventas por periodo con gráficos y filtros | Veo total vendido, cantidad de ventas, ticket promedio y productos más vendidos en tablas y gráficos, exportable a CSV, Excel o PDF. |

**4.17.3 Requerimientos funcionales**

| ID | Requerimiento | Prioridad | Fuente | Verificación |
|---|---|---|---|---|
| RF-VEN-01 | El sistema debe registrar ventas con o sin cliente, uno o más productos o servicios con cantidad y precio mayores que cero, descuentos, impuestos y método de pago, asignando número de comprobante y fecha y hora automáticas. | Alta | HU-120 · HU_153, HU_158 | Prueba funcional (API) |
| RF-VEN-02 | El sistema debe aplicar automáticamente el descuento del nivel VIP del cliente y calcular el total en el servidor. | Alta | HU-120 · HU_153, HU_158 | Prueba funcional (API) |
| RF-VEN-03 | El sistema debe descontar existencias y otorgar los puntos al cliente cuando la venta queda pagada, en la misma transacción. | Alta | HU-120 · HU_153, HU_158 | Prueba funcional (API) |
| RF-VEN-04 | El sistema debe crear la venta pagada a partir de un pedido entregado, con sus ítems y precios, y pasar el pedido a pagado. | Alta | HU-121 · Inferida (ficha) | Prueba funcional (API) |
| RF-VEN-05 | El sistema debe advertir al cobrar cuando no se alcanza el consumo mínimo de la reserva asociada. | Alta | HU-121 · Inferida (ficha) | Prueba funcional (API) |
| RF-VEN-06 | El sistema debe buscar ventas por número, fecha, cliente y producto con orden y filtros, mostrar su detalle y exportar el listado a CSV y PDF. | Alta | HU-122 · HU_154, HU_159 | Prueba de interfaz + API |
| RF-VEN-07 | El sistema debe cambiar el estado de la venta solo a estados válidos (pendiente de pago → pagada → anulada), mostrando la lista de estados posibles, con confirmación e historial de cambios. | Alta | HU-123 · HU_155, HU_160 | Prueba funcional (API) |
| RF-VEN-08 | El sistema debe permitir solo al Administrador anular ventas pagadas, con motivo, devolviendo existencias y revirtiendo puntos en la misma transacción. | Alta | HU-123 · HU_155, HU_160 | Prueba funcional (API) |
| RF-VEN-09 | El sistema debe generar el comprobante de pago en PDF imprimible, con número único y datos de la empresa y de la venta, para una o varias ventas a la vez. | Alta | HU-124 · HU_156, HU_161 | Prueba funcional (API) |
| RF-VEN-10 | El sistema debe permitir enviar el comprobante por correo al cliente. | Alta | HU-124 · HU_156, HU_161 | Prueba funcional (entorno de pruebas de correo) |
| RF-VEN-11 | El sistema debe generar reportes de ventas por periodo (diario, semanal, mensual, anual), filtrables por cliente, producto y método de pago, con totales, cantidad, productos más vendidos y gráficos, exportables a CSV, Excel y PDF. | Media | HU-125 · HU_157, HU_162 | Prueba funcional (API) |

### 4.18 Notificaciones

**4.18.1 Descripción y prioridad**

Envía correos a los clientes sobre promociones, eventos especiales y cumpleaños, con plantillas reutilizables, listas segmentadas, envíos programados y recurrentes, monitoreo y baja de suscripción. **Prioridad: Media.**

Actores: Administrador, Empleado, Cliente. Historias: HU-126, HU-127, HU-128, HU-129, HU-130, HU-131, HU-132. Depende de: 007-clientes, 014-eventos. Spec: `specs/018-notificaciones/spec.md`.

**4.18.2 Secuencias de estímulo/respuesta**

| HU | Estímulo del actor | Respuesta del sistema |
|---|---|---|
| HU-126 | Administrador o Empleado solicita programar el envío de promociones por correo a un grupo de clientes, único o recurrente | Queda programada y se envía cada viernes a la hora definida. |
| HU-127 | Administrador solicita enviar un correo sobre un evento especial con imágenes o video a los clientes objetivo | El correo incluye nombre, fecha, hora e imagen del evento y cada envío queda registrado con su estado. |
| HU-128 | Administrador o Empleado solicita que cada cliente reciba un correo personalizado con un cupón el día de su cumpleaños | Recibe el correo con su nombre y un cupón de descuento y el envío queda registrado. |
| HU-129 | Administrador solicita crear, editar, duplicar y eliminar plantillas de correo con variables | El correo de prueba llega con el nombre reemplazado. |
| HU-130 | Administrador solicita ver cuántos correos se enviaron, entregaron y fallaron | Veo enviados, entregados (si el proveedor lo informa), fallidos y rebotados por campaña, y descargo el informe. |
| HU-131 | Empleado o Administrador solicita crear listas de clientes por tipo de notificación y segmentarlas | Incluye a los clientes que cumplen los criterios y tienen autorización. |
| HU-132 | Cliente solicita dejar de recibir promociones desde el correo o mi perfil | Sin iniciar sesión veo la confirmación y no recibo más promociones. |

**4.18.3 Requerimientos funcionales**

| ID | Requerimiento | Prioridad | Fuente | Verificación |
|---|---|---|---|---|
| RF-NOT-01 | El sistema debe programar campañas de promociones con asunto, cuerpo o plantilla, adjuntos, lista de destinatarios o todos los suscritos, fecha y hora de envío y recurrencia (ninguna, diaria, semanal, mensual). | Media | HU-126 · HU_198, HU_203 | Prueba funcional (API) |
| RF-NOT-02 | El sistema debe registrar cada envío con fecha, hora, destinatario, estado y razón de falla, y gestionar los rebotes. | Media | HU-126 · HU_198, HU_203 | Prueba funcional (API) |
| RF-NOT-03 | El sistema debe incluir en cada correo promocional un enlace de baja y excluir a los clientes sin autorización o dados de baja. | Media | HU-126 · HU_198, HU_203 | Prueba funcional (API) |
| RF-NOT-04 | El sistema debe enviar notificaciones de eventos especiales vinculadas a un evento, con contenido multimedia (imágenes y enlaces a video), a los grupos de clientes elegidos, registrando cada envío y respetando las bajas. | Media | HU-127 · HU_199 | Prueba funcional (entorno de pruebas de correo) |
| RF-NOT-05 | El sistema debe enviar diariamente un correo de cumpleaños personalizado con el nombre del cliente y un cupón o beneficio configurable, usando la plantilla de cumpleaños. | Media | HU-128 · HU_200, HU_204 | Prueba funcional (entorno de pruebas de correo) |
| RF-NOT-06 | El sistema debe omitir y registrar a los clientes sin fecha de nacimiento o sin correo y registrar el estado de cada envío. | Media | HU-128 · HU_200, HU_204 | Prueba funcional (API) |
| RF-NOT-07 | El sistema debe gestionar plantillas de correo (crear, editar, duplicar, eliminar o inactivar) con variables de personalización y tipo de notificación asociado. | Media | HU-129 · HU_201 | Prueba funcional (entorno de pruebas de correo) |
| RF-NOT-08 | El sistema debe permitir enviar un correo de prueba de una plantilla. | Media | HU-129 · HU_201 | Prueba funcional (entorno de pruebas de correo) |
| RF-NOT-09 | El sistema debe mostrar el número de correos enviados, entregados, fallidos y rebotados por campaña, filtrable por tipo y fecha, y descargar el informe en CSV o PDF. | Baja | HU-130 · HU_202 | Prueba de interfaz + API |
| RF-NOT-10 | El sistema debe crear, editar y eliminar listas de destinatarios por tipo de notificación, segmentadas por categoría, nivel VIP, ciudad, género y preferencias, con miembros manuales. | Media | HU-131 · HU_205 | Prueba funcional (entorno de pruebas de correo) |
| RF-NOT-11 | El sistema debe importar y exportar listas en CSV, validando que los importados sean clientes registrados. | Media | HU-131 · HU_205 | Prueba funcional (API) |
| RF-NOT-12 | El sistema debe procesar la baja de suscripción desde el enlace del correo sin iniciar sesión y desde el perfil del cliente, por tipo de notificación. | Media | HU-132 · Inferida (ficha) | Prueba funcional (entorno de pruebas de correo) |

### 4.19 Programa de puntos

**4.19.1 Descripción y prioridad**

Fideliza a los clientes con puntos por consumo y por ingreso, canjeables por recompensas (descuentos, productos o entradas gratis), con historial y comprobantes. **Prioridad: Media.**

Actores: Administrador, Empleado, Cliente. Historias: HU-133, HU-134, HU-135, HU-136, HU-137, HU-138, HU-139. Depende de: 007-clientes, 017-ventas, 009-control-entradas. Spec: `specs/019-programa-puntos/spec.md`.

**4.19.2 Secuencias de estímulo/respuesta**

| HU | Estímulo del actor | Respuesta del sistema |
|---|---|---|
| HU-133 | Administrador solicita definir cuántos puntos otorga cada consumo, producto, servicio o ingreso | Cada venta pagada y cada ingreso otorgan los puntos correspondientes. |
| HU-134 | Administrador solicita definir las recompensas canjeables y sus puntos requeridos | Aparece en la lista de recompensas del perfil del cliente. |
| HU-135 | Administrador o Empleado solicita buscar un cliente y ver su saldo e historial de puntos | Veo su saldo, la fecha de su última actualización y el historial de acumulaciones y canjes. |
| HU-136 | Empleado solicita que el cliente identificado acumule puntos al pagar su consumo o al ingresar | Acumula 200 puntos (300 si es VIP con multiplicador 1,5), su saldo se actualiza en tiempo real y el comprobante muestra los puntos y el nuevo saldo. |
| HU-137 | Empleado solicita canjear los puntos de un cliente por una recompensa | Se descuentan los puntos, queda en el historial y se genera el comprobante con el nuevo saldo de 150. |
| HU-138 | Administrador solicita generar reportes de la actividad del programa de puntos | Veo puntos acumulados por todos los clientes, puntos canjeados por recompensa y la actividad diaria, exportable a CSV o PDF. |
| HU-139 | Cliente solicita ver mi saldo de puntos, su historial y las recompensas que puedo canjear | Veo mi saldo, mis movimientos y las recompensas activas marcando cuáles alcanzo con mi saldo. |

**4.19.3 Requerimientos funcionales**

| ID | Requerimiento | Prioridad | Fuente | Verificación |
|---|---|---|---|---|
| RF-PUN-01 | El sistema debe gestionar reglas de acumulación por valor de consumo, por producto, por servicio y por ingreso, activables e inactivables, con prioridad de la regla específica sobre la general. | Media | HU-133 · HU_206 | Prueba funcional (API) |
| RF-PUN-02 | El sistema debe gestionar recompensas (descuento en próxima compra, producto gratis, entrada gratis) con puntos requeridos, stock opcional y estado. | Media | HU-134 · HU_207 | Prueba funcional (API) |
| RF-PUN-03 | El sistema debe mostrar al cliente en su perfil las recompensas activas disponibles. | Media | HU-134 · HU_207 | Prueba de interfaz + API |
| RF-PUN-04 | El sistema debe mostrar el saldo de puntos de un cliente, buscado por id, nombre, documento o QR, con la fecha de última actualización y el historial de movimientos. | Media | HU-135 · HU_208, HU_212 | Prueba de interfaz + API |
| RF-PUN-05 | El sistema debe calcular y acumular puntos al pagar una venta con cliente identificado o al registrar su ingreso, aplicando las reglas activas y el multiplicador VIP, actualizando el saldo en tiempo real. | Alta | HU-136 · HU_210 | Prueba funcional (API) |
| RF-PUN-06 | El sistema debe mostrar en el comprobante el consumo, los puntos acumulados y el saldo resultante. | Alta | HU-136 · HU_210 | Prueba de interfaz + API |
| RF-PUN-07 | El sistema debe canjear recompensas activas con disponibilidad verificando saldo suficiente, descontar los puntos y generar el comprobante del canje con el nuevo saldo. | Alta | HU-137 · HU_211 | Prueba funcional (API) |
| RF-PUN-08 | El sistema debe registrar cada canje en el historial de movimientos y la bitácora. | Alta | HU-137 · HU_211 | Inspección + prueba funcional |
| RF-PUN-09 | El sistema debe generar reportes de puntos acumulados, puntos canjeados por recompensa y actividad del programa por rango de fechas, en CSV o PDF. | Baja | HU-138 · HU_209 | Prueba funcional (API) |
| RF-PUN-10 | El sistema debe mostrar al cliente su saldo, su historial de movimientos y las recompensas activas indicando cuáles puede canjear. | Media | HU-139 · Inferida (ficha) | Prueba de interfaz + API |

### 4.20 Medición y desempeño

**4.20.1 Descripción y prioridad**

Entrega los reportes de desempeño definidos en la ficha, con filtros por periodo, gráficos y exportación a PDF y CSV. Las historias con rol Cliente sobre estos reportes se interpretan como del dueño de la discoteca (TBD-11). **Prioridad: Media.**

Actores: Administrador, Empleado. Historias: HU-140, HU-141, HU-142, HU-143, HU-144, HU-145. Depende de: 017-ventas, 013-reservas, 014-eventos, 012-agenda-empleados. Spec: `specs/020-desempeno/spec.md`.

**4.20.2 Secuencias de estímulo/respuesta**

| HU | Estímulo del actor | Respuesta del sistema |
|---|---|---|
| HU-140 | Administrador o Empleado solicita ver los 10 clientes VIP y los 10 clientes generales con mayor gasto en un periodo | Veo dos listas separadas con nombre, id, gasto total y número de visitas, ordenables ascendente o descendente. |
| HU-141 | Administrador o Empleado solicita ver los servicios más y menos solicitados con su participación | Veo dos listas con el servicio, las veces solicitado (reservas, fichas técnicas y ventas) y su porcentaje sobre el total, ordenables, en PDF y CSV. |
| HU-142 | Administrador o Empleado solicita ver qué empleados están asignados a cada servicio con fechas y horas | Veo en lista o calendario los empleados asignados con fecha y horario, filtrable por empleado, servicio y fechas, en CSV y PDF. |
| HU-143 | Administrador o Empleado solicita ver las ventas de cada mes con la venta mayor, la menor y los subtotales | Veo por mes el total vendido, la venta mayor, la venta menor y el subtotal, con gráfico de barras o líneas, en PDF y CSV. |
| HU-144 | Administrador o Empleado solicita ver los 10 eventos temáticos más solicitados | Veo las 10 temáticas con más eventos realizados y su asistencia, ordenables, en PDF y CSV. |
| HU-145 | Administrador o Empleado solicita comparar la cantidad de eventos temáticos y fiestas privadas | Veo un gráfico de barras o de pastel y una tabla con la cantidad, asistentes e ingresos de cada tipo, en PDF y CSV. |

**4.20.3 Requerimientos funcionales**

| ID | Requerimiento | Prioridad | Fuente | Verificación |
|---|---|---|---|---|
| RF-DES-01 | El sistema debe generar dos listas separadas con el top 10 de clientes VIP y el top 10 de clientes generales por gasto total en un periodo (día, semana, mes, año o rango), con nombre, id, gasto y visitas, ordenables y descargables en PDF y CSV. | Media | HU-140 · HU_213, HU_219, HU_225 | Prueba funcional (API) |
| RF-DES-02 | El sistema debe generar las listas de servicios más y menos solicitados en un periodo, con número de solicitudes y porcentaje de participación, ordenables y descargables en PDF y CSV. | Media | HU-141 · HU_214, HU_220, HU_226 | Prueba funcional (API) |
| RF-DES-03 | El sistema debe mostrar la programación de empleados por servicio en lista y calendario, filtrable por empleado, servicio y periodo, exportable a CSV y PDF. | Media | HU-142 · HU_215, HU_221 | Prueba de interfaz + API |
| RF-DES-04 | El sistema debe generar el reporte de ventas mes a mes de un año o rango con total, venta mayor, venta menor y subtotal por mes, en gráfico de barras o líneas, descargable en PDF y CSV. | Alta | HU-143 · HU_216, HU_222, HU_227 | Prueba funcional (API) |
| RF-DES-05 | El sistema debe generar el top 10 de eventos temáticos por temática con la cantidad de veces realizados y la asistencia en el periodo, ordenable y descargable en PDF y CSV. | Media | HU-144 · HU_217, HU_223, HU_228 | Prueba funcional (API) |
| RF-DES-06 | El sistema debe generar el comparativo entre eventos temáticos y fiestas privadas en un periodo con cantidad, asistentes e ingresos, en gráfico de barras o pastel y tabla, descargable en PDF y CSV. | Media | HU-145 · HU_218, HU_224, HU_229 | Prueba funcional (API) |

## 5. Otros requerimientos no funcionales

### 5.1 Requerimientos de rendimiento

| ID | Requerimiento | Prioridad | Verificación |
|---|---|---|---|
| RNF-REN-01 | La validación de un código QR en la puerta (escaneo, consulta y resultado permitido/denegado) debe completarse en 2 s o menos en el percentil 95 (valor de referencia, TBD-06). | Alta | Prueba de carga |
| RNF-REN-02 | Las búsquedas y listados deben responder en 1 s o menos en el percentil 95 con 50 000 clientes y 500 000 ingresos registrados (valor de referencia, TBD-06). | Media | Prueba de carga |
| RNF-REN-03 | Los comprobantes de venta deben generarse en 3 s o menos; los reportes en PDF, CSV o Excel en 10 s o menos para un año de datos. | Media | Prueba funcional |

### 5.2 Requerimientos de seguridad física / safety

| ID | Requerimiento | Prioridad | Verificación |
|---|---|---|---|
| RNF-SAF-01 | El sistema debe impedir registrar como cliente, dejar ingresar y vender a personas menores de 18 años según su fecha de nacimiento, porque la venta de alcohol a menores está prohibida (Ley 124 de 1994). | Alta | Prueba funcional |
| RNF-SAF-02 | El sistema debe denegar ingresos cuando la ocupación de la noche alcance el aforo máximo configurado, porque superar el aforo autorizado pone en riesgo la seguridad de las personas (TBD-04). | Alta | Prueba funcional |
| RNF-SAF-03 | Ninguna venta, pedido entregado o anulación debe dejar existencias negativas ni saldos de puntos inconsistentes: el ajuste ocurre en la misma transacción que la operación. | Alta | Prueba funcional |

### 5.3 Requerimientos de seguridad informática y privacidad

| ID | Requerimiento | Prioridad | Verificación |
|---|---|---|---|
| RNF-SEG-01 | Toda comunicación en producción debe usar HTTPS con TLS 1.2 o superior. | Alta | Inspección |
| RNF-SEG-02 | Las contraseñas deben almacenarse con bcrypt (costo 10 o mayor), cumplir mínimo 8 caracteres con mayúscula, minúscula, número y carácter especial y nunca devolverse en respuestas. | Alta | Inspección + prueba |
| RNF-SEG-03 | Todo endpoint, salvo inicio de sesión, registro de clientes, recuperación de contraseña, cartelera pública y baja de suscripción, debe exigir un token JWT válido; el token expira a las 8 horas y se invalida al cerrar sesión. | Alta | Prueba funcional |
| RNF-SEG-04 | Cada operación debe verificar en el servidor el permiso del rol y responder 403 con «Acceso denegado» cuando no lo tenga. | Alta | Prueba funcional |
| RNF-SEG-05 | Tras 3 intentos fallidos consecutivos de inicio de sesión de un mismo usuario, el sistema debe bloquear nuevos intentos durante 15 minutos (requisito de la matriz). | Alta | Prueba funcional |
| RNF-SEG-06 | Toda entrada debe validarse en el servidor y toda consulta SQL debe ser parametrizada. | Alta | Inspección de código |
| RNF-SEG-07 | El sistema debe registrar en una bitácora (usuario, fecha y hora, acción, valores anterior y nuevo) los inicios de sesión, los cambios de roles y permisos, los cambios de estado, los ajustes de existencias, los movimientos de puntos y las anulaciones y eliminaciones. | Media | Inspección + prueba |
| RNF-PRI-01 | Los formularios de registro de clientes y empleados deben mostrar el aviso de privacidad y exigir la autorización de tratamiento de datos (Ley 1581 de 2012); la autorización para recibir promociones debe ser una casilla aparte, desmarcada por defecto. | Alta | Prueba de interfaz |
| RNF-PRI-02 | Un Cliente solo accede a su propia información; los reportes y listados con datos de otros clientes, ventas o empleados solo están disponibles para roles internos con permiso. | Alta | Prueba funcional |
| RNF-PRI-03 | El código QR debe codificar un identificador aleatorio de al menos 128 bits, sin nombre, documento ni otros datos personales en claro. | Alta | Inspección |
| RNF-PRI-04 | Cada correo promocional debe incluir un enlace de baja que funcione sin iniciar sesión; la baja se aplica a los envíos programados desde ese momento. | Media | Prueba funcional |

### 5.4 Atributos de calidad de software

| ID | Requerimiento | Prioridad | Verificación |
|---|---|---|---|
| RNF-USA-01 | La interfaz debe ser usable entre 360 px y 1920 px de ancho sin desplazamiento horizontal. | Alta | Prueba de interfaz |
| RNF-USA-02 | La pantalla de control de ingreso debe operarse con una mano en un celular, en modo oscuro de alto contraste, con botones de al menos 48 × 48 px y el resultado permitido/denegado legible a un metro de distancia. | Alta | Prueba de interfaz |
| RNF-USA-03 | Los mensajes de éxito y error deben ser específicos, aparecer junto al campo o en una notificación no bloqueante y no exponer detalles técnicos. | Media | Prueba de interfaz |
| RNF-USA-04 | La interfaz debe cumplir criterios básicos de WCAG 2.1 AA: etiquetas asociadas, navegación con teclado, foco visible y contraste mínimo de 4.5:1. | Media | Inspección |
| RNF-CAL-01 | El sistema debe estar disponible el 99,5 % del tiempo durante el horario de operación de la discoteca (valor de referencia, TBD-06). | Media | Monitoreo |
| RNF-CAL-02 | Debe existir una copia de seguridad diaria de la base de datos, tomada fuera del horario de operación, con retención de 30 días. | Media | Inspección |
| RNF-CAL-03 | Cada endpoint debe tener en la colección de pruebas al menos un caso de éxito y uno de error. | Alta | Inspección |

### 5.5 Reglas de negocio

| ID | Regla | Característica | RF que la hacen cumplir |
|---|---|---|---|
| RN-01 | El sistema arranca con los roles base Administrador, Empleado y Cliente; un usuario tiene un solo rol y un rol inactivo no da acceso a ninguna funcionalidad. | ROL, USR | RF-ROL-01, RF-ROL-05, RF-ROL-06, RF-USR-01 |
| RN-02 | Toda persona registrada como cliente debe ser mayor de 18 años en la fecha de registro. | CLI, ING | RF-CLI-05, RF-CLI-06, RF-CLI-07, RF-CLI-12, RF-CLI-13, RF-ING-01, RF-ING-02 |
| RN-03 | Un rol debe tener al menos un permiso y no puede tener el mismo permiso dos veces; un permiso asociado a algún rol no se inactiva. | ROL | RF-ROL-01, RF-ROL-11, RF-ROL-12, RF-ROL-13, RF-ROL-14 |
| RN-04 | Los roles base no se inactivan; un rol con usuarios activos no se inactiva. | ROL | RF-ROL-05, RF-ROL-06 |
| RN-05 | El nombre de usuario y el correo son únicos; el nombre de usuario no se modifica; no se inactiva al único Administrador activo. | USR | RF-USR-01, RF-USR-03, RF-USR-04, RF-USR-05 |
| RN-06 | Tras 3 intentos fallidos consecutivos la cuenta se bloquea 15 minutos; el enlace de recuperación es de un solo uso y vence en 30 minutos. | ACC | RF-ACC-01, RF-ACC-02, RF-ACC-03, RF-ACC-04, RF-ACC-05 |
| RN-07 | Un proveedor inactivo o suspendido no puede recibir compras nuevas; todo cambio de estado lleva una nota que lo justifica. | PRV | RF-PRV-05, RF-PRV-06 |
| RN-08 | stock_minimo debe ser menor que stock_maximo; un ajuste manual no deja la existencia por debajo de cero ni por encima del máximo; todo cambio de existencia genera un movimiento. | PRD | RF-PRD-04, RF-PRD-05, RF-PRD-06 |
| RN-09 | Un producto con existencia 0 pasa a «agotado» automáticamente y vuelve a «activo» al recibir una compra; un producto inactivo no se vende. | PRD | RF-PRD-07, RF-PRD-08 |
| RN-10 | Flujo de estados: pendiente → aprobada → pagada → recibida; cualquier estado anterior a recibida → anulada. Al pasar a recibida se suman las existencias y se recalcula el costo promedio en la misma transacción. | COM | RF-COM-06, RF-COM-07 |
| RN-11 | Una compra solo se edita en estado pendiente o aprobada; la fecha de compra solo la corrige el Administrador mientras está pendiente. | COM | RF-COM-04, RF-COM-05 |
| RN-12 | Solo se registran clientes mayores de 18 años con autorización de tratamiento de datos; a una categoría inactiva no se asignan clientes. | CLI | RF-CLI-04, RF-CLI-05, RF-CLI-06, RF-CLI-07, RF-CLI-12, RF-CLI-13 |
| RN-13 | Un cliente inactivo no puede ingresar, reservar, hacer pedidos ni acumular puntos. | CLI | RF-CLI-10 |
| RN-14 | Solo un cliente activo puede ser VIP; cada cliente tiene una sola condición VIP; al inactivarla se registra fecha y razón y se pierden los beneficios. | VIP | RF-VIP-01, RF-VIP-02, RF-VIP-05 |
| RN-15 | Un ingreso se permite solo si el QR está activo, el cliente activo y mayor de 18 años, no tiene una entrada sin salida en la misma noche y la ocupación es menor que el aforo; los VIP con acceso prioritario se marcan como prioritarios. | ING | RF-ING-06, RF-ING-07, RF-ING-08, RF-ING-09 |
| RN-16 | Generar un QR nuevo inactiva el anterior del mismo cliente. | ING | RF-ING-03, RF-ING-04 |
| RN-17 | Un servicio inactivo no se ofrece en reservas, fichas técnicas, agenda ni ventas nuevas; los registros existentes lo conservan. | SER | RF-SER-04 |
| RN-18 | No se asignan empleados a categorías inactivas; un empleado inactivo no se programa en la agenda; la información salarial está fuera del alcance. | EMP | RF-EMP-04, RF-EMP-08, RF-EMP-09 |
| RN-19 | Un empleado no puede tener dos actividades no canceladas que se crucen en horario; fin debe ser posterior a inicio. | AGE | RF-AGE-01, RF-AGE-02, RF-AGE-03, RF-AGE-05 |
| RN-20 | Un empleado solo registra y modifica actividades de su propia agenda; el Administrador gestiona las de todos. | AGE | RF-AGE-01, RF-AGE-02, RF-AGE-03 |
| RN-21 | Un espacio no puede tener dos reservas pendientes o confirmadas que se crucen en fecha y hora; el número de personas no supera la capacidad del espacio. | RES | RF-RES-02, RF-RES-03, RF-RES-04, RF-RES-06 |
| RN-22 | Solo se eliminan reservas pendientes o canceladas, dejando registro en el historial; las confirmadas se cancelan. | RES | RF-RES-09 |
| RN-23 | Una reserva confirmada pasa a cumplida cuando el cliente registra su ingreso esa noche. | RES | RF-RES-07, RF-RES-08 |
| RN-24 | Cada evento tiene como máximo una ficha técnica; la franja horaria está dentro de las fechas del evento y los invitados no superan la capacidad del evento. | EVE | RF-EVE-10, RF-EVE-11, RF-EVE-13 |
| RN-25 | La ficha solo se modifica en estado pendiente o en proceso y solo pasa a completado cuando todos sus servicios están registrados. | EVE | RF-EVE-13, RF-EVE-14, RF-EVE-15 |
| RN-26 | Los datos de un evento en curso se pueden actualizar (capacidad, descripción, ubicación); sus fechas solo se amplían, no se adelantan. | EVE | RF-EVE-05, RF-EVE-06 |
| RN-27 | Cancelar un evento cancela su ficha técnica y sus actividades de agenda pendientes y notifica a los empleados y clientes asociados. | EVE | RF-EVE-07, RF-EVE-08 |
| RN-28 | Las actividades están dentro de un evento no cancelado; asignar un empleado crea su actividad en la agenda de empleados y respeta la regla de no cruce. | AGV | RF-AGV-01, RF-AGV-05, RF-AGV-06 |
| RN-29 | Flujo de estados de una actividad: pendiente → en progreso → completado, o cancelado desde pendiente o en progreso. | AGV | RF-AGV-04 |
| RN-30 | Un cliente solo ve, modifica y cancela sus propias solicitudes de fiesta privada, y solo mientras estén en estado solicitado. | AGV | RF-AGV-10, RF-AGV-11, RF-AGV-13, RF-AGV-14 |
| RN-31 | Flujo: pendiente de confirmación → en preparación → entregado → pagado (al cobrarlo como venta); cancelado desde pendiente o en preparación. Solo el Administrador cancela pedidos en preparación. | PED | RF-PED-05, RF-PED-06 |
| RN-32 | Un pedido solo se modifica antes de entregarse; al pasar a entregado se descuentan las existencias en la misma transacción; productos con alcohol solo para clientes mayores de 18 años. | PED | RF-PED-04, RF-PED-05, RF-PED-06 |
| RN-33 | El servidor calcula subtotal, descuentos (nivel VIP, canjes), impuesto y total; el número de comprobante es consecutivo y no se reutiliza. | VEN | RF-VEN-01, RF-VEN-02, RF-VEN-03, RF-VEN-09, RF-VEN-10 |
| RN-34 | Al quedar pagada, la venta descuenta existencias (si no vienen de un pedido ya entregado) y otorga puntos al cliente; al anularse, devuelve existencias y revierte los puntos en la misma transacción. | VEN | RF-VEN-01, RF-VEN-02, RF-VEN-03, RF-VEN-07, RF-VEN-08 |
| RN-35 | Solo el Administrador anula ventas pagadas, con motivo. | VEN | RF-VEN-07, RF-VEN-08 |
| RN-36 | Las campañas de promociones y eventos solo se envían a clientes activos con autorización de promociones vigente y sin baja; la felicitación de cumpleaños solo a clientes con fecha de nacimiento y correo. | NOT | RF-NOT-01, RF-NOT-02, RF-NOT-03, RF-NOT-05, RF-NOT-06 |
| RN-37 | Todo correo promocional incluye el enlace de baja; un rebote permanente marca el correo como inválido para envíos futuros. | NOT | RF-NOT-01, RF-NOT-02, RF-NOT-03, RF-NOT-12 |
| RN-38 | Los puntos se calculan con las reglas activas y el multiplicador del nivel VIP; se acumulan al pagar la venta o registrar el ingreso y se revierten al anular la venta. | PUN | RF-PUN-01, RF-PUN-05, RF-PUN-06 |
| RN-39 | Un canje requiere saldo suficiente y recompensa activa con disponibilidad; nunca deja saldo negativo. | PUN | RF-PUN-07, RF-PUN-08 |
| RN-40 | Los indicadores excluyen ventas anuladas, reservas canceladas y eventos cancelados; los reportes con datos de clientes solo los ven roles internos con permiso. | DES | RF-DES-01, RF-DES-04 |

## 6. Otros requerimientos

### 6.1 Modelo lógico de datos

Entidades y atributos que se desprenden de las historias. Es un modelo **lógico** de referencia para `/speckit.plan` (data-model.md): nombres en snake_case, claves `id_<entidad>` y columnas de auditoría `created_at` / `updated_at` en todas las tablas. El equipo puede ajustarlo en su script SQL siempre que respete las reglas de negocio.

**4.1 Roles y permisos**

*Rol* — Perfil de acceso.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_rol | INT | PK |
| nombre | VARCHAR(40) | obligatorio, único |
| descripcion | VARCHAR(150) |  |
| estado | ENUM('activo','inactivo') | por defecto 'activo' |
| created_at | DATETIME |  |
| updated_at | DATETIME |  |

*Permiso* — Permiso del catálogo.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_permiso | INT | PK |
| nombre | VARCHAR(60) | único (p. ej. ventas.crear) |
| descripcion | VARCHAR(150) |  |
| modulo | VARCHAR(40) |  |
| estado | ENUM('activo','inactivo') |  |
| created_at | DATETIME |  |

*RolPermiso* — Permisos del rol.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_rol | INT | FK |
| id_permiso | INT | FK |
| PK compuesta |  |  |

**4.2 Gestión de usuarios**

*Usuario* — Cuenta de acceso.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_usuario | INT | PK |
| nombre_usuario | VARCHAR(30) | único, no modificable |
| nombre_completo | VARCHAR(100) |  |
| correo | VARCHAR(100) | único, válido |
| contrasena_hash | VARCHAR(255) |  |
| id_rol | INT | FK |
| estado | ENUM('activo','inactivo') |  |
| created_at | DATETIME |  |
| updated_at | DATETIME |  |

*HistorialUsuario* — Cambios de la cuenta.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_historial | INT | PK |
| id_usuario | INT | FK |
| accion | VARCHAR(40) |  |
| detalle | VARCHAR(300) |  |
| id_usuario_autor | INT | FK |
| fecha | DATETIME |  |

**4.3 Gestión de acceso**

*TokenRecuperacion* — Enlace de restablecimiento.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_token | INT | PK |
| id_usuario | INT | FK |
| token_hash | VARCHAR(255) |  |
| expira_en | DATETIME | +30 min |
| usado | BOOLEAN |  |

*RegistroAcceso* — Intento de inicio de sesión.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_acceso | INT | PK |
| id_usuario | INT | FK, nulo si no existe |
| usuario_ingresado | VARCHAR(100) |  |
| fecha_hora | DATETIME |  |
| exitoso | BOOLEAN |  |
| ip | VARCHAR(45) |  |
| tipo_dispositivo | VARCHAR(30) |  |

**4.4 Proveedores**

*Proveedor* — Proveedor de la discoteca.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_proveedor | INT | PK |
| tipo_documento | ENUM('NIT','CC','CE') |  |
| numero_documento | VARCHAR(15) | único |
| razon_social | VARCHAR(100) | obligatorio |
| direccion | VARCHAR(120) |  |
| nombre_contacto | VARCHAR(80) |  |
| telefono | VARCHAR(10) |  |
| correo | VARCHAR(100) | válido |
| tipo_producto | VARCHAR(60) |  |
| estado | ENUM('activo','inactivo','suspendido') |  |
| created_at | DATETIME |  |

*DocumentoProveedor* — Soportes.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_documento | INT | PK |
| id_proveedor | INT | FK |
| tipo | ENUM('RUT','camara_comercio','contrato','certificacion','otro') |  |
| url | VARCHAR(255) |  |
| fecha_carga | DATETIME |  |

*HistorialProveedor* — Cambios.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_historial | INT | PK |
| id_proveedor | INT | FK |
| campo | VARCHAR(40) |  |
| valor_anterior | VARCHAR(200) |  |
| valor_nuevo | VARCHAR(200) |  |
| nota | VARCHAR(200) |  |
| id_usuario | INT | FK |
| fecha | DATETIME |  |

**4.5 Productos y existencias**

*Producto* — Producto del bar.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_producto | INT | PK |
| codigo | VARCHAR(20) | único |
| nombre | VARCHAR(100) | obligatorio |
| tipo | ENUM('licor','cerveza','coctel','bebida_sin_alcohol','snack','insumo') |  |
| unidad | VARCHAR(20) |  |
| precio_venta | DECIMAL(12,2) | > 0 |
| costo_promedio | DECIMAL(12,2) | ≥ 0 |
| stock | INT | ≥ 0 |
| stock_minimo | INT | ≥ 0 |
| stock_maximo | INT | > stock_minimo |
| contiene_alcohol | BOOLEAN |  |
| estado | ENUM('activo','inactivo','agotado') |  |
| created_at | DATETIME |  |

*MovimientoInventario* — Kardex.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_movimiento | INT | PK |
| id_producto | INT | FK |
| tipo | ENUM('inicial','compra','venta','ajuste_entrada','ajuste_salida','anulacion') |  |
| cantidad | INT |  |
| stock_resultante | INT |  |
| motivo | VARCHAR(200) |  |
| documento_ref | VARCHAR(30) |  |
| id_usuario | INT | FK |
| fecha | DATETIME |  |

*ConfigAlertaStock* — Destinatarios de alertas.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_config | INT | PK |
| correos | VARCHAR(500) | lista de correos válidos |
| frecuencia | ENUM('inmediata','diaria','semanal') |  |
| activa | BOOLEAN |  |

**4.6 Compras**

*Compra* — Compra a un proveedor.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_compra | INT | PK |
| numero | VARCHAR(20) | único, consecutivo |
| fecha_compra | DATE | ≤ hoy |
| id_proveedor | INT | FK, activo |
| descripcion | VARCHAR(300) |  |
| total | DECIMAL(14,2) | calculado |
| estado | ENUM('pendiente','aprobada','pagada','recibida','anulada') |  |
| id_usuario | INT | FK |
| created_at | DATETIME |  |
| updated_at | DATETIME |  |

*CompraDetalle* — Producto comprado.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_detalle | INT | PK |
| id_compra | INT | FK |
| id_producto | INT | FK |
| cantidad | INT | > 0 |
| costo_unitario | DECIMAL(12,2) | > 0 |
| subtotal | DECIMAL(14,2) |  |

*AdjuntoCompra* — Factura u otro soporte.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_adjunto | INT | PK |
| id_compra | INT | FK |
| url | VARCHAR(255) |  |
| nombre | VARCHAR(120) |  |

*HistorialEstadoCompra* — Flujo.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_historial | INT | PK |
| id_compra | INT | FK |
| estado_anterior | VARCHAR(20) |  |
| estado_nuevo | VARCHAR(20) |  |
| comentario | VARCHAR(200) |  |
| id_usuario | INT | FK |
| fecha | DATETIME |  |

**4.7 Clientes y categorías de clientes**

*CategoriaCliente* — Clasificación comercial.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_categoria | INT | PK |
| nombre | VARCHAR(50) | único |
| descripcion | VARCHAR(200) |  |
| estado | ENUM('activa','inactiva') |  |
| created_at | DATETIME |  |
| updated_at | DATETIME |  |

*Cliente* — Cliente de la discoteca.

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

*HistorialCliente* — Cambios.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_historial | INT | PK |
| id_cliente | INT | FK |
| accion | VARCHAR(40) |  |
| detalle | VARCHAR(300) |  |
| id_usuario | INT | FK |
| fecha | DATETIME |  |

**4.8 Clientes VIP**

*NivelVip* — Nivel de beneficios.

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

*ClienteVip* — Condición VIP.

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

*AdjuntoVip* — Documentos.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_adjunto | INT | PK |
| id_cliente_vip | INT | FK |
| url | VARCHAR(255) |  |

**4.9 Control de entradas**

*CodigoQR* — Credencial del cliente.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_qr | INT | PK |
| id_cliente | INT | FK |
| token | CHAR(32) | único, aleatorio |
| estado | ENUM('activo','inactivo') |  |
| generado_en | DATETIME |  |
| desactivado_en | DATETIME |  |

*Ingreso* — Entrada o salida.

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

*IntentoFallido* — Ingreso denegado.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_intento | INT | PK |
| token_leido | VARCHAR(64) |  |
| motivo | ENUM('qr_invalido','qr_inactivo','cliente_inactivo','menor_edad','aforo_completo','ya_adentro') |  |
| fecha_hora | DATETIME |  |
| id_empleado | INT | FK |

*ConfigAforo* — Aforo.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_config | INT | PK |
| aforo_maximo | INT | > 0 |
| umbral_alerta | TINYINT | % (por defecto 90) |

**4.10 Servicios**

*Servicio* — Servicio ofrecido.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_servicio | INT | PK |
| nombre | VARCHAR(80) | único |
| descripcion | VARCHAR(500) |  |
| categoria | ENUM('alquiler_espacio','servicio_adicional') |  |
| precio | DECIMAL(12,2) | ≥ 0 |
| imagen_url | VARCHAR(255) | opcional |
| estado | ENUM('activo','inactivo') |  |
| created_at | DATETIME |  |
| updated_at | DATETIME |  |

**4.11 Empleados y categorías de empleados**

*CategoriaEmpleado* — Tipo de puesto.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_categoria | INT | PK |
| nombre | VARCHAR(50) | único |
| descripcion | VARCHAR(200) |  |
| estado | ENUM('activa','inactiva') |  |
| updated_at | DATETIME |  |

*Empleado* — Persona del equipo.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_empleado | INT | PK |
| nombre | VARCHAR(60) |  |
| apellido | VARCHAR(60) |  |
| tipo_documento | ENUM('CC','CE','PPT') |  |
| numero_documento | VARCHAR(15) | único |
| fecha_nacimiento | DATE | edad ≥ 18 |
| telefono | VARCHAR(10) |  |
| correo | VARCHAR(100) |  |
| direccion | VARCHAR(120) |  |
| id_categoria | INT | FK, activa |
| fecha_ingreso | DATE |  |
| id_usuario | INT | FK, opcional |
| estado | ENUM('activo','inactivo') |  |
| created_at | DATETIME |  |
| updated_at | DATETIME |  |

*HistorialEmpleado* — Cambios.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_historial | INT | PK |
| id_empleado | INT | FK |
| campo | VARCHAR(40) |  |
| valor_anterior | VARCHAR(200) |  |
| valor_nuevo | VARCHAR(200) |  |
| id_usuario | INT | FK |
| fecha | DATETIME |  |

**4.12 Agenda de empleados**

*AgendaEmpleado* — Turno o actividad.

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

**4.13 Reservas**

*Espacio* — Mesa o sala VIP.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_espacio | INT | PK |
| nombre | VARCHAR(40) | único |
| tipo | ENUM('mesa','sala_vip') |  |
| zona | VARCHAR(40) |  |
| capacidad | TINYINT | > 0 |
| consumo_minimo | DECIMAL(12,2) | ≥ 0 |
| estado | ENUM('activo','inactivo') |  |

*Reserva* — Apartado de un espacio.

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

*DetalleReserva* — Servicios adicionales.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_detalle | INT | PK |
| id_reserva | INT | FK |
| id_servicio | INT | FK |
| cantidad | INT | > 0 |
| precio_unitario | DECIMAL(12,2) |  |
| descuento | DECIMAL(5,2) | % del nivel VIP |
| subtotal | DECIMAL(14,2) |  |

*HistorialReserva* — Cambios y eliminaciones.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_historial | INT | PK |
| id_reserva | INT |  |
| accion | VARCHAR(30) |  |
| detalle | VARCHAR(400) |  |
| id_usuario | INT | FK |
| fecha | DATETIME |  |

**4.14 Eventos y fichas técnicas**

*Evento* — Evento de la discoteca.

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

*AdjuntoEvento* — Presentaciones y archivos.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_adjunto | INT | PK |
| id_evento | INT | FK |
| url | VARCHAR(255) |  |
| nombre | VARCHAR(120) |  |

*Tematica* — Catálogo de temáticas.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_tematica | INT | PK |
| nombre | VARCHAR(60) | único |
| estado | ENUM('activa','inactiva') |  |

*FichaTecnica* — Planificación del evento (hijo de Evento).

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

*FichaServicio* — Servicios de la ficha.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_ficha_servicio | INT | PK |
| id_ficha | INT | FK |
| id_servicio | INT | FK, activo |
| cantidad | INT | > 0 |
| registrado | BOOLEAN | servicio confirmado |

*HistorialFicha* — Cambios y estados.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_historial | INT | PK |
| id_ficha | INT | FK |
| accion | VARCHAR(30) |  |
| detalle | VARCHAR(400) |  |
| nota | VARCHAR(200) |  |
| id_usuario | INT | FK |
| fecha | DATETIME |  |

**4.15 Agenda de eventos**

*ActividadEvento* — Actividad de la agenda de un evento.

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

*ActividadEmpleado* — Responsables.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_actividad | INT | FK |
| id_empleado | INT | FK |
| PK compuesta |  |  |

*ActividadServicio* — Servicios.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_actividad | INT | FK |
| id_servicio | INT | FK |
| PK compuesta |  |  |

*NotificacionEvento* — Envíos.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_notificacion | INT | PK |
| id_actividad | INT | FK |
| destinatario | VARCHAR(100) |  |
| programada_para | DATETIME |  |
| enviada_en | DATETIME |  |
| estado | ENUM('pendiente','enviada','fallida') |  |
| error | VARCHAR(200) |  |

**4.16 Pedidos**

*Pedido* — Pedido de consumo.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_pedido | INT | PK |
| numero | VARCHAR(12) | único |
| fecha_hora | DATETIME | del servidor |
| id_cliente | INT | FK, opcional |
| id_espacio | INT | FK, opcional |
| id_reserva | INT | FK, opcional |
| ubicacion | VARCHAR(40) | barra, mesa o sala |
| id_empleado | INT | FK, mesero |
| metodo_pago_previsto | ENUM('efectivo','tarjeta','transferencia') |  |
| total | DECIMAL(14,2) | calculado |
| estado | ENUM('pendiente_confirmacion','en_preparacion','entregado','cancelado','pagado') |  |
| origen | ENUM('interno','cliente') |  |
| updated_at | DATETIME |  |

*PedidoDetalle* — Ítem.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_detalle | INT | PK |
| id_pedido | INT | FK |
| id_producto | INT | FK, opcional |
| id_servicio | INT | FK, opcional |
| cantidad | INT | > 0 |
| precio_unitario | DECIMAL(12,2) |  |
| subtotal | DECIMAL(14,2) |  |

*HistorialPedido* — Estados y cambios.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_historial | INT | PK |
| id_pedido | INT | FK |
| estado_anterior | VARCHAR(30) |  |
| estado_nuevo | VARCHAR(30) |  |
| nota | VARCHAR(200) |  |
| id_usuario | INT | FK |
| fecha | DATETIME |  |

**4.17 Ventas**

*Venta* — Transacción.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_venta | INT | PK |
| numero_comprobante | VARCHAR(20) | consecutivo único |
| fecha_hora | DATETIME | del servidor |
| id_cliente | INT | FK, opcional (consumidor final) |
| id_pedido | INT | FK, opcional |
| id_empleado | INT | FK |
| metodo_pago | ENUM('efectivo','tarjeta','transferencia','mixto') |  |
| subtotal | DECIMAL(14,2) |  |
| descuento | DECIMAL(14,2) |  |
| impuesto | DECIMAL(14,2) |  |
| total | DECIMAL(14,2) | > 0 |
| puntos_otorgados | INT |  |
| estado | ENUM('pendiente_pago','pagada','anulada') |  |
| motivo_anulacion | VARCHAR(200) |  |

*VentaDetalle* — Ítem vendido.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_detalle | INT | PK |
| id_venta | INT | FK |
| id_producto | INT | FK, opcional |
| id_servicio | INT | FK, opcional |
| cantidad | INT | > 0 |
| precio_unitario | DECIMAL(12,2) | > 0 |
| descuento | DECIMAL(12,2) |  |
| subtotal | DECIMAL(14,2) |  |

*HistorialEstadoVenta* — Cambios.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_historial | INT | PK |
| id_venta | INT | FK |
| estado_anterior | VARCHAR(20) |  |
| estado_nuevo | VARCHAR(20) |  |
| nota | VARCHAR(200) |  |
| id_usuario | INT | FK |
| fecha | DATETIME |  |

**4.18 Notificaciones**

*Plantilla* — Plantilla de correo.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_plantilla | INT | PK |
| nombre | VARCHAR(60) | único |
| tipo | ENUM('promocion','evento','cumpleanos') |  |
| asunto | VARCHAR(150) |  |
| cuerpo_html | TEXT | variables {{nombre}}, {{fecha}}, {{cupon}} |
| estado | ENUM('activa','inactiva') |  |

*ListaDestinatarios* — Segmento.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_lista | INT | PK |
| nombre | VARCHAR(60) |  |
| criterios_json | JSON | categoría, nivel VIP, ciudad, género, preferencias |
| tipo_notificacion | ENUM('promocion','evento','cumpleanos') |  |
| created_at | DATETIME |  |

*ListaCliente* — Miembros manuales.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_lista | INT | FK |
| id_cliente | INT | FK |
| PK compuesta |  |  |

*Campana* — Envío programado.

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

*Envio* — Correo individual.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_envio | INT | PK |
| id_campana | INT | FK |
| id_cliente | INT | FK |
| correo | VARCHAR(100) |  |
| estado | ENUM('pendiente','enviado','entregado','fallido','rebotado') |  |
| motivo | VARCHAR(200) |  |
| fecha | DATETIME |  |

*AdjuntoCampana* — Multimedia.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_adjunto | INT | PK |
| id_campana | INT | FK |
| url | VARCHAR(255) |  |
| tipo | VARCHAR(20) |  |

**4.19 Programa de puntos**

*ReglaPuntos* — Regla de acumulación.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_regla | INT | PK |
| tipo | ENUM('por_valor','por_producto','por_servicio','por_ingreso') |  |
| id_producto | INT | FK, opcional |
| id_servicio | INT | FK, opcional |
| valor_base | DECIMAL(12,2) | p. ej. $ 1.000 |
| puntos | INT | > 0 |
| estado | ENUM('activa','inactiva') |  |

*Recompensa* — Canjeable.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_recompensa | INT | PK |
| nombre | VARCHAR(80) |  |
| tipo | ENUM('descuento','producto_gratis','entrada_gratis') |  |
| puntos_requeridos | INT | > 0 |
| id_producto | INT | FK, opcional |
| valor_descuento | DECIMAL(12,2) |  |
| stock | INT | opcional |
| estado | ENUM('activa','inactiva') |  |

*MovimientoPuntos* — Kardex de puntos.

| Atributo | Tipo | Restricciones |
|---|---|---|
| id_movimiento | INT | PK |
| id_cliente | INT | FK |
| tipo | ENUM('acumulacion','canje','reversion','ajuste') |  |
| puntos | INT |  |
| saldo_resultante | INT | ≥ 0 |
| id_venta | INT | FK, opcional |
| id_ingreso | INT | FK, opcional |
| id_recompensa | INT | FK, opcional |
| id_usuario | INT | FK |
| fecha | DATETIME |  |

### 6.2 Requerimientos legales

Tratamiento de datos personales conforme a la Ley 1581 de 2012, con autorización separada para recibir mensajes promocionales y opción de baja en cada correo. Prohibición de venta de bebidas alcohólicas y de ingreso a menores de 18 años (Ley 124 de 1994 y Ley 1801 de 2016). Los comprobantes de venta tienen numeración consecutiva y no se eliminan.

### 6.3 Internacionalización

Español (Colombia), COP, zona horaria America/Bogota. Una «noche de operación» se contabiliza desde las 6:00 p. m. hasta las 6:00 a. m. del día siguiente.

## Apéndice A: Glosario

| Término | Definición |
|---|---|
| Código QR de acceso | Código único de cada cliente que codifica un identificador opaco y se escanea en la puerta para registrar su ingreso. |
| Aforo | Número máximo de personas que pueden estar dentro del establecimiento al mismo tiempo, según su autorización. |
| Ocupación | Personas dentro en la noche de operación: ingresos registrados menos salidas registradas. |
| Noche de operación | Periodo de 6:00 p. m. a 6:00 a. m. del día siguiente al que se asignan ingresos, ventas y reportes. |
| Cliente VIP | Cliente con un nivel VIP vigente que le da acceso prioritario y beneficios exclusivos. |
| Nivel VIP | Categoría de beneficios VIP (p. ej. Oro, Platino) con descuentos y puntos adicionales. |
| Categoría de cliente | Clasificación comercial de los clientes (p. ej. Frecuente, Corporativo, Nuevo) usada en campañas y reportes. |
| Espacio | Mesa o sala VIP reservable, con capacidad y zona. |
| Reserva | Apartado de un espacio para una fecha y hora, con número de personas y servicios adicionales. |
| Servicio | Oferta de la discoteca distinta de los productos del bar: alquiler de espacios, DJ, decoración, sonido, iluminación, catering, etc. |
| Evento temático | Evento organizado por la discoteca con una temática (p. ej. Noche de los 80). |
| Fiesta privada | Evento solicitado por un cliente para una celebración propia. |
| Ficha técnica | Planificación de un evento: temática, franja horaria, invitados y servicios con sus cantidades. |
| Agenda de empleados | Turnos y actividades programadas a cada empleado, asociadas a un servicio y opcionalmente a un evento. |
| Agenda de eventos | Actividades de un evento (reuniones, montaje, plazos, presentación) con responsables y notificaciones. |
| Pedido | Solicitud de productos o servicios de un cliente o una mesa, que se prepara, entrega y cobra. |
| Venta | Transacción pagada con comprobante de pago numerado. |
| Puntos | Unidades de fidelización que un cliente acumula por consumo e ingresos y canjea por recompensas. |
| Campaña | Envío de correo a un grupo de clientes (promoción, evento especial o cumpleaños). |
| Spec | Especificación de una funcionalidad en formato GitHub spec-kit (`specs/NNN-modulo/spec.md`). |

## Apéndice B: Modelos de análisis

**B.1 Contrato API REST sugerido.** Base `/api/v1`, JSON, sobre de respuesta `{ ok, data, meta, error }`, autenticación Bearer JWT salvo en los endpoints públicos de acceso. Listados con `?page=1&limit=10&q=texto` y filtros propios; `meta` devuelve `{ page, limit, total }`.

*4.1 Roles y permisos*

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/roles` | Registrar un rol | HU-01 |
| GET | `/api/v1/roles?q` | Consultar un rol | HU-02 |
| GET | `/api/v1/roles/:id` | Consultar detalle (roles) | HU-02 |
| PUT | `/api/v1/roles/:id` | Actualizar un rol | HU-03 |
| PATCH | `/api/v1/roles/:id/estado` | Cambiar el estado de un rol | HU-04 |
| GET | `/api/v1/roles?page&limit&sort` | Listar roles | HU-05 |
| POST | `/api/v1/permisos` | Registrar un permiso | HU-06 |
| GET | `/api/v1/permisos?modulo&q` | Listar o consultar permisos | HU-06 |
| GET | `/api/v1/roles/:id/permisos` | Consultar los permisos de cada rol | HU-07 |
| PATCH | `/api/v1/permisos/:id/estado` | Cambiar el estado de un permiso | HU-08 |
| PUT | `/api/v1/roles/:id/permisos` | Asociar permisos a un rol | HU-09 |

*4.2 Gestión de usuarios*

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/usuarios` | Registrar un usuario | HU-10 |
| GET | `/api/v1/usuarios?q&page&limit&rol&estado` | Consultar usuarios | HU-11 |
| GET | `/api/v1/usuarios/:id` | Consultar detalle (usuarios) | HU-11 |
| PUT | `/api/v1/usuarios/:id` | Actualizar un usuario | HU-12 |
| PATCH | `/api/v1/usuarios/:id/estado` | Cambiar el estado de usuarios | HU-13 |
| PATCH | `/api/v1/usuarios/estado` | (masivo) | HU-13 |
| GET | `/api/v1/reportes/usuarios?desde&hasta&rol&estado&formato` | Generar el reporte de usuarios | HU-14 |

*4.3 Gestión de acceso*

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/auth/login` | Iniciar sesión | HU-15 |
| POST | `/api/v1/auth/recuperar` | Recuperar la contraseña | HU-16 |
| POST | `/api/v1/auth/restablecer` | Restablecer la contraseña | HU-17 |
| POST | `/api/v1/auth/logout` | Cerrar sesión | HU-18 |
| GET | `/api/v1/auth/accesos?desde&hasta&usuario&exitoso` | Consultar la bitácora de accesos | HU-19 |

*4.4 Proveedores*

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/proveedores` | Registrar un proveedor | HU-20 |
| POST | `/api/v1/proveedores/:id/documentos` | Registrar (documentos) | HU-20 |
| GET | `/api/v1/proveedores?q&estado&tipo&page&limit` | Consultar proveedores | HU-21 |
| GET | `/api/v1/proveedores/:id` | Consultar detalle (proveedores) | HU-21 |
| PUT | `/api/v1/proveedores/:id` | Actualizar un proveedor | HU-22 |
| PATCH | `/api/v1/proveedores/:id/estado` | Cambiar el estado de un proveedor | HU-23 |
| GET | `/api/v1/reportes/proveedores?estado&desde&hasta&formato` | Generar el reporte de proveedores | HU-24 |

*4.5 Productos y existencias*

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/productos` | Registrar un producto | HU-25 |
| PUT | `/api/v1/productos/:id` | Actualizar (productos) | HU-25 |
| POST | `/api/v1/productos/:id/existencia-inicial` | Registrar las existencias iniciales | HU-26 |
| GET | `/api/v1/productos?q&tipo&estado&nivel&sort&page&limit` | Consultar existencias | HU-27 |
| GET | `/api/v1/productos/:id` | Consultar detalle (productos) | HU-27 |
| POST | `/api/v1/productos/:id/ajustes` | Ajustar existencias | HU-28 |
| GET | `/api/v1/productos/:id/movimientos` | Listar o consultar movimientos | HU-28 |
| PATCH | `/api/v1/productos/:id/limites` | Definir stock mínimo y máximo | HU-29 |
| PATCH | `/api/v1/productos/:id/estado` | Cambiar el estado de un producto | HU-30 |
| GET | `/api/v1/reportes/inventario?desde&hasta&producto&tipo&formato` | Generar el reporte de inventario | HU-31 |
| GET | `/api/v1/configuracion/alertas-stock` | Recibir alertas de stock mínimo por correo | HU-32 |
| PUT | `/api/v1/configuracion/alertas-stock` | Actualizar (alertas stock) | HU-32 |
| GET | `/api/v1/productos/alertas` | Listar o consultar alertas | HU-32 |

*4.6 Compras*

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/compras` | Registrar una compra | HU-33 |
| POST | `/api/v1/compras/:id/adjuntos` | Registrar (adjuntos) | HU-33 |
| GET | `/api/v1/compras?q&proveedor&estado&desde&hasta&page&limit` | Consultar compras | HU-34 |
| GET | `/api/v1/compras/:id` | Consultar detalle (compras) | HU-34 |
| PUT | `/api/v1/compras/:id` | Actualizar una compra | HU-35 |
| PATCH | `/api/v1/compras/:id/estado` | Cambiar el estado de una compra | HU-36 |
| GET | `/api/v1/reportes/compras?periodo&desde&hasta&proveedor&estado&formato` | Generar el reporte de compras | HU-37 |

*4.7 Clientes y categorías de clientes*

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

*4.8 Clientes VIP*

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

*4.9 Control de entradas*

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

*4.10 Servicios*

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/servicios` | Registrar un servicio | HU-62 |
| GET | `/api/v1/servicios?q&categoria&estado&page&limit` | Consultar servicios | HU-63 |
| GET | `/api/v1/servicios/:id` | Consultar detalle (servicios) | HU-63 |
| PUT | `/api/v1/servicios/:id` | Actualizar un servicio | HU-64 |
| PATCH | `/api/v1/servicios/:id` | Actualizar parcialmente | HU-64 |
| PATCH | `/api/v1/servicios/:id/estado` | Cambiar el estado de un servicio | HU-65 |
| GET | `/api/v1/reportes/servicios?desde&hasta&categoria&estado&formato` | Generar el reporte de servicios | HU-66 |

*4.11 Empleados y categorías de empleados*

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/categorias-empleados` | Registrar una categoría de empleado | HU-67 |
| GET | `/api/v1/categorias-empleados?q` | Consultar las categorías de empleado | HU-68 |
| GET | `/api/v1/categorias-empleados/:id` | Consultar detalle (categorias-empleados) | HU-68 |
| PUT | `/api/v1/categorias-empleados/:id` | Actualizar una categoría de empleado | HU-69 |
| PATCH | `/api/v1/categorias-empleados/:id/estado` | Cambiar el estado de una categoría de empleado | HU-70 |
| POST | `/api/v1/empleados` | Registrar un empleado | HU-71 |
| GET | `/api/v1/empleados?q&categoria&estado&sort&page&limit` | Consultar empleados | HU-72 |
| GET | `/api/v1/empleados/:id` | Consultar detalle (empleados) | HU-72 |
| PUT | `/api/v1/empleados/:id` | Actualizar un empleado | HU-73 |
| PATCH | `/api/v1/empleados/:id/estado` | Cambiar el estado de un empleado | HU-74 |
| GET | `/api/v1/reportes/empleados?categoria&estado&formato` | Generar el reporte de empleados | HU-75 |

*4.12 Agenda de empleados*

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/agenda-empleados` | Programar una actividad en la agenda de un empleado | HU-76 |
| GET | `/api/v1/agenda-empleados?empleado&servicio&estado&desde&hasta` | Consultar la agenda de empleados | HU-77 |
| GET | `/api/v1/agenda-empleados/:id` | Consultar detalle (agenda-empleados) | HU-77 |
| PUT | `/api/v1/agenda-empleados/:id` | Actualizar una actividad de la agenda | HU-78 |
| PATCH | `/api/v1/agenda-empleados/:id/estado` | Cambiar el estado de una actividad de la agenda | HU-79 |
| GET | `/api/v1/reportes/agenda-empleados?desde&hasta&empleado&servicio&estado&formato` | Generar el reporte de agenda de empleados | HU-80 |

*4.13 Reservas*

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

*4.14 Eventos y fichas técnicas*

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

*4.15 Agenda de eventos*

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

*4.16 Pedidos*

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/pedidos` | Registrar un pedido | HU-111 |
| GET | `/api/v1/pedidos?q&estado&cliente&ubicacion&desde&hasta&page&limit` | Consultar pedidos y su estado | HU-112 |
| GET | `/api/v1/pedidos/:id` | Consultar detalle (pedidos) | HU-112 |
| PUT | `/api/v1/pedidos/:id` | Actualizar un pedido | HU-113 |
| PATCH | `/api/v1/pedidos/:id/estado` | Cambiar el estado de un pedido | HU-114 |
| PATCH | `/api/v1/pedidos/:id/cliente` | Asociar un cliente a un pedido | HU-115 |
| GET | `/api/v1/reportes/pedidos?desde&hasta&estado&cliente&producto&formato` | Generar el reporte de pedidos | HU-116 |
| POST | `/api/v1/clientes/me/pedidos` | Hacer un pre-pedido como cliente | HU-117 |
| GET | `/api/v1/clientes/me/pedidos?q&desde&hasta` | Consultar mis pedidos | HU-118 |
| PUT | `/api/v1/clientes/me/pedidos/:id` | Modificar mi pedido | HU-119 |

*4.17 Ventas*

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| POST | `/api/v1/ventas` | Registrar una venta | HU-120 |
| POST | `/api/v1/pedidos/:id/cobro` | Cobrar un pedido | HU-121 |
| GET | `/api/v1/ventas?q&desde&hasta&cliente&producto&estado&sort&page&limit&formato` | Consultar ventas | HU-122 |
| GET | `/api/v1/ventas/:id` | Consultar detalle (ventas) | HU-122 |
| PATCH | `/api/v1/ventas/:id/estado` | Cambiar el estado de una venta | HU-123 |
| GET | `/api/v1/ventas/:id/comprobante.pdf` | Generar el comprobante de pago | HU-124 |
| POST | `/api/v1/ventas/comprobantes` | (lote) | HU-124 |
| POST | `/api/v1/ventas/:id/comprobante/envio` | Registrar (envio) | HU-124 |
| GET | `/api/v1/reportes/ventas?periodo&desde&hasta&cliente&producto&metodo&formato` | Generar el reporte de ventas | HU-125 |

*4.18 Notificaciones*

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

*4.19 Programa de puntos*

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| GET | `/api/v1/puntos/reglas` | Configurar las reglas de acumulación de puntos | HU-133 |
| POST | `/api/v1/puntos/reglas` | Registrar (reglas) | HU-133 |
| PUT | `/api/v1/puntos/reglas/:id` | Actualizar (reglas) | HU-133 |
| GET | `/api/v1/puntos/recompensas` | Configurar las recompensas | HU-134 |
| POST | `/api/v1/puntos/recompensas` | Registrar (recompensas) | HU-134 |
| PUT | `/api/v1/puntos/recompensas/:id` | Actualizar (recompensas) | HU-134 |
| GET | `/api/v1/puntos/clientes/:idCliente` | Consultar el saldo de puntos de un cliente | HU-135 |
| GET | `/api/v1/puntos/clientes/:idCliente/movimientos` | Listar o consultar movimientos | HU-135 |
| (parte | `de` | POST /api/v1/ventas y POST /api/v1/ingresos) | HU-136 |
| POST | `/api/v1/puntos/canjes` | Canjear puntos | HU-137 |
| GET | `/api/v1/reportes/puntos?desde&hasta&formato` | Generar el reporte del programa de puntos | HU-138 |
| GET | `/api/v1/clientes/me/puntos` | Consultar mis puntos y recompensas | HU-139 |

*4.20 Medición y desempeño*

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| GET | `/api/v1/indicadores/top-clientes?desde&hasta&orden&formato` | Consultar el top 10 de clientes VIP y generales | HU-140 |
| GET | `/api/v1/indicadores/servicios-solicitados?desde&hasta&orden&formato` | Consultar los servicios más y menos solicitados | HU-141 |
| GET | `/api/v1/indicadores/programacion-servicios?desde&hasta&empleado&servicio&formato` | Consultar la programación de empleados por servicio | HU-142 |
| GET | `/api/v1/indicadores/ventas-mensuales?anio&desde&hasta&formato` | Consultar las ventas mes a mes | HU-143 |
| GET | `/api/v1/indicadores/top-tematicas?desde&hasta&orden&formato` | Consultar el top 10 de eventos temáticos | HU-144 |
| GET | `/api/v1/indicadores/tematicos-vs-privadas?desde&hasta&formato` | Comparar eventos temáticos y fiestas privadas | HU-145 |

**B.2 Mapa de pantallas.**

| Característica | Pantalla / componente | HU |
|---|---|---|
| ROL | Configuración › Roles › Nuevo rol | HU-01 |
| ROL | Configuración › Roles › Detalle | HU-02 |
| ROL | Configuración › Roles › Editar | HU-03 |
| ROL | Configuración › Roles (interruptor de estado) | HU-04 |
| ROL | Configuración › Roles (listado) | HU-05 |
| ROL | Configuración › Permisos | HU-06 |
| ROL | Configuración › Roles › Permisos (matriz) | HU-07 |
| ROL | Configuración › Permisos (Cambiar estado) | HU-08 |
| ROL | Configuración › Roles › Permisos (Guardar) | HU-09 |
| USR | Configuración › Usuarios › Nuevo usuario | HU-10 |
| USR | Configuración › Usuarios (listado y detalle) | HU-11 |
| USR | Configuración › Usuarios › Editar | HU-12 |
| USR | Configuración › Usuarios (Cambiar estado, selección múltiple) | HU-13 |
| USR | Configuración › Usuarios › Reporte | HU-14 |
| ACC | Inicio de sesión | HU-15 |
| ACC | Recuperar contraseña | HU-16 |
| ACC | Restablecer contraseña | HU-17 |
| ACC | Menú de usuario › Cerrar sesión | HU-18 |
| ACC | Configuración › Bitácora de accesos | HU-19 |
| PRV | Compras › Proveedores › Nuevo proveedor | HU-20 |
| PRV | Compras › Proveedores (listado y detalle) | HU-21 |
| PRV | Compras › Proveedores › Editar | HU-22 |
| PRV | Compras › Proveedores (Cambiar estado) | HU-23 |
| PRV | Compras › Proveedores › Reporte | HU-24 |
| PRD | Existencias › Productos › Nuevo producto | HU-25 |
| PRD | Existencias › Productos › Existencia inicial | HU-26 |
| PRD | Existencias (listado) | HU-27 |
| PRD | Existencias › Ajustar; Existencias › Kardex | HU-28 |
| PRD | Existencias › Productos › Límites de stock | HU-29 |
| PRD | Existencias (Cambiar estado) | HU-30 |
| PRD | Existencias › Reporte | HU-31 |
| PRD | Configuración › Alertas de stock; Inicio (alerta) | HU-32 |
| COM | Compras › Nueva compra | HU-33 |
| COM | Compras (listado y detalle) | HU-34 |
| COM | Compras › Editar | HU-35 |
| COM | Compras › Detalle (Cambiar estado) | HU-36 |
| COM | Compras › Reporte | HU-37 |
| CLI | Clientes › Categorías › Nueva categoría | HU-38 |
| CLI | Clientes › Categorías | HU-39 |
| CLI | Clientes › Categorías › Editar | HU-40 |
| CLI | Clientes › Categorías (Cambiar estado) | HU-41 |
| CLI | Clientes › Nuevo cliente | HU-42 |
| CLI | Clientes (listado y detalle) | HU-43 |
| CLI | Clientes › Editar | HU-44 |
| CLI | Clientes (Cambiar estado) | HU-45 |
| CLI | Clientes › Reporte | HU-46 |
| CLI | Registro de cliente | HU-47 |
| CLI | Portal del cliente › Mi perfil | HU-48 |
| VIP | Clientes VIP › Nuevo VIP | HU-49 |
| VIP | Clientes VIP (listado y detalle) | HU-50 |
| VIP | Clientes VIP › Editar | HU-51 |
| VIP | Clientes VIP (Cambiar estado) | HU-52 |
| VIP | Clientes VIP › Reporte | HU-53 |
| VIP | Configuración › Niveles VIP | HU-54 |
| ING | Ingreso › Registro rápido | HU-55 |
| ING | Clientes › Detalle › Código QR; Ingreso › Códigos QR | HU-56 |
| ING | Ingreso › Verificar QR | HU-57 |
| ING | Ingreso › Control de entrada (modo puerta) | HU-58 |
| ING | Ingreso › Registro de ingresos | HU-59 |
| ING | Ingreso › Reporte de afluencia | HU-60 |
| ING | Configuración › Aforo; Ingreso › Control de salida | HU-61 |
| SER | Servicios › Nuevo servicio | HU-62 |
| SER | Servicios (listado y detalle) | HU-63 |
| SER | Servicios › Editar | HU-64 |
| SER | Servicios (Cambiar estado) | HU-65 |
| SER | Servicios › Reporte | HU-66 |
| EMP | Empleados › Categorías › Nueva categoría | HU-67 |
| EMP | Empleados › Categorías | HU-68 |
| EMP | Empleados › Categorías › Editar | HU-69 |
| EMP | Empleados › Categorías (Cambiar estado) | HU-70 |
| EMP | Empleados › Nuevo empleado | HU-71 |
| EMP | Empleados (listado y detalle) | HU-72 |
| EMP | Empleados › Editar | HU-73 |
| EMP | Empleados (Cambiar estado) | HU-74 |
| EMP | Empleados › Reporte | HU-75 |
| AGE | Agenda › Nueva actividad | HU-76 |
| AGE | Agenda (calendario) | HU-77 |
| AGE | Agenda › Editar actividad | HU-78 |
| AGE | Agenda (Cambiar estado) | HU-79 |
| AGE | Agenda › Reporte | HU-80 |
| RES | Configuración › Espacios | HU-81 |
| RES | Reservas › Nueva reserva | HU-82 |
| RES | Reservas (listado, vista por noche y detalle) | HU-83 |
| RES | Reservas › Editar | HU-84 |
| RES | Reservas › Detalle (Cambiar estado) | HU-85 |
| RES | Reservas (Eliminar) | HU-86 |
| RES | Reservas › Reporte | HU-87 |
| RES | Portal del cliente › Mis reservas | HU-88 |
| EVE | Eventos › Nuevo evento | HU-89 |
| EVE | Eventos (listado y detalle) | HU-90 |
| EVE | Eventos › Editar | HU-91 |
| EVE | Eventos › Detalle (Cambiar estado) | HU-92 |
| EVE | Eventos › Reporte | HU-93 |
| EVE | Eventos › Detalle › Ficha técnica | HU-94 |
| EVE | Eventos › Fichas técnicas (listado y detalle) | HU-95 |
| EVE | Eventos › Ficha técnica › Editar | HU-96 |
| EVE | Eventos › Ficha técnica (Cambiar estado) | HU-97 |
| EVE | Eventos › Fichas técnicas › Reporte | HU-98 |
| AGV | Eventos › Agenda › Nueva actividad | HU-99 |
| AGV | Eventos › Agenda (calendario) | HU-100 |
| AGV | Eventos › Agenda › Editar actividad | HU-101 |
| AGV | Eventos › Agenda (Cambiar estado) | HU-102 |
| AGV | Eventos › Agenda › Asignar | HU-103 |
| AGV | Eventos › Agenda › Reporte | HU-104 |
| AGV | Configuración › Recordatorios de eventos | HU-105 |
| AGV | Portal del cliente › Mis eventos › Solicitar fiesta privada | HU-106 |
| AGV | Cartelera (pública); Portal del cliente › Mis eventos | HU-107 |
| AGV | Portal del cliente › Mis eventos › Editar | HU-108 |
| AGV | Portal del cliente › Mis eventos › Detalle | HU-109 |
| AGV | Portal del cliente › Mis eventos › Servicios | HU-110 |
| PED | Pedidos › Nuevo pedido (vista móvil para meseros) | HU-111 |
| PED | Pedidos (tablero por estado y detalle) | HU-112 |
| PED | Pedidos › Editar | HU-113 |
| PED | Pedidos (Cambiar estado) | HU-114 |
| PED | Pedidos › Detalle (Asociar cliente) | HU-115 |
| PED | Pedidos › Reporte | HU-116 |
| PED | Portal del cliente › Mis reservas › Pre-pedido | HU-117 |
| PED | Portal del cliente › Mis pedidos | HU-118 |
| PED | Portal del cliente › Mis pedidos › Editar | HU-119 |
| VEN | Ventas › Nueva venta (caja / barra) | HU-120 |
| VEN | Pedidos › Detalle (Cobrar) | HU-121 |
| VEN | Ventas (historial y detalle) | HU-122 |
| VEN | Ventas › Detalle (Cambiar estado) | HU-123 |
| VEN | Ventas › Detalle (Comprobante) | HU-124 |
| VEN | Ventas › Reporte | HU-125 |
| NOT | Notificaciones › Nueva campaña | HU-126 |
| NOT | Notificaciones › Evento especial | HU-127 |
| NOT | Configuración › Cumpleaños | HU-128 |
| NOT | Notificaciones › Plantillas | HU-129 |
| NOT | Notificaciones › Monitor de envíos | HU-130 |
| NOT | Notificaciones › Listas | HU-131 |
| NOT | Baja de suscripción (pública); Portal del cliente › Mis suscripciones | HU-132 |
| PUN | Puntos › Reglas | HU-133 |
| PUN | Puntos › Recompensas | HU-134 |
| PUN | Puntos › Consultar saldo | HU-135 |
| PUN | Ventas › Nueva venta (cliente y puntos) | HU-136 |
| PUN | Puntos › Canjear | HU-137 |
| PUN | Puntos › Reporte | HU-138 |
| PUN | Portal del cliente › Mis puntos | HU-139 |
| DES | Reportes › Top clientes | HU-140 |
| DES | Reportes › Servicios solicitados | HU-141 |
| DES | Reportes › Programación por servicio | HU-142 |
| DES | Reportes › Ventas mes a mes | HU-143 |
| DES | Reportes › Top eventos temáticos | HU-144 |
| DES | Reportes › Comparativo de eventos | HU-145 |

## Apéndice C: Lista TBD

| ID | Sección | Qué falta | Quién debe decidir | Fecha límite |
|---|---|---|---|---|
| TBD-01 | 1.1 | Nombre comercial de la discoteca y del aplicativo («xxxxxx» en la ficha) | Cliente | Antes de la entrega final |
| TBD-02 | 3.3 | Proveedor de correo transaccional y masivo; volumen máximo de envíos por hora | Instructor | Sprint del módulo NOT |
| TBD-03 | 1.4, 4.17 | Impuestos aplicables a las ventas (IVA o impuesto nacional al consumo) y obligación de factura electrónica DIAN | Dueño de la discoteca | Sprint del módulo VEN |
| TBD-04 | 4.9 | Aforo máximo autorizado del establecimiento y por zona | Dueño de la discoteca | Sprint del módulo ING |
| TBD-05 | 4.8 | Niveles VIP, beneficios de cada nivel y criterios para otorgar la condición VIP | Dueño de la discoteca | Sprint del módulo VIP |
| TBD-06 | 2.4, 5.1, 5.4 | Horario de operación y metas de rendimiento y disponibilidad (valores de referencia) | Cliente y Product Owner | Antes de las pruebas de aceptación |
| TBD-07 | 4.19 | Reglas del programa de puntos: puntos por cada $ 1.000 de consumo, puntos por ingreso y vencimiento de los puntos | Dueño de la discoteca | Sprint del módulo PUN |
| TBD-08 | 1.4 | Si se cobra entrada (cover) y si el sistema debe vender boletería | Dueño de la discoteca | Antes del sprint del módulo ING |
| TBD-09 | 4.16 | La matriz menciona dirección de envío en pedidos: confirmar que no hay domicilios | Dueño de la discoteca | Sprint del módulo PED |
| TBD-10 | 4.5 | Manejo de cócteles y copas: venta por producto o descuento de insumos por receta | Dueño de la discoteca | Sprint del módulo PRD |
| TBD-11 | 4.20 | Confirmar que los reportes pedidos con rol «Cliente» (HU_225 a HU_229) son para el dueño y no para clientes finales | Product Owner | Sprint del módulo DES |

## Apéndice D: Matriz de trazabilidad HU → RF → spec

| HU | Historia | Prioridad | RF | Spec | Excel |
|---|---|---|---|---|---|
| HU-01 | Registrar un rol | Alta | RF-ROL-01 | `001-roles-permisos` | HU_01 |
| HU-02 | Consultar un rol | Media | RF-ROL-02 | `001-roles-permisos` | HU_02 |
| HU-03 | Actualizar un rol | Alta | RF-ROL-03, RF-ROL-04 | `001-roles-permisos` | HU_03 |
| HU-04 | Cambiar el estado de un rol | Alta | RF-ROL-05, RF-ROL-06 | `001-roles-permisos` | HU_04 |
| HU-05 | Listar roles | Media | RF-ROL-07 | `001-roles-permisos` | HU_05 |
| HU-06 | Registrar un permiso | Media | RF-ROL-08, RF-ROL-09 | `001-roles-permisos` | HU_06 |
| HU-07 | Consultar los permisos de cada rol | Media | RF-ROL-10 | `001-roles-permisos` | HU_07 |
| HU-08 | Cambiar el estado de un permiso | Baja | RF-ROL-11, RF-ROL-12 | `001-roles-permisos` | HU_08 |
| HU-09 | Asociar permisos a un rol | Alta | RF-ROL-13, RF-ROL-14 | `001-roles-permisos` | HU_09 |
| HU-10 | Registrar un usuario | Alta | RF-USR-01 | `002-gestion-usuarios` | HU_10 |
| HU-11 | Consultar usuarios | Alta | RF-USR-02 | `002-gestion-usuarios` | HU_10 |
| HU-12 | Actualizar un usuario | Media | RF-USR-03 | `002-gestion-usuarios` | HU_11 |
| HU-13 | Cambiar el estado de usuarios | Alta | RF-USR-04, RF-USR-05 | `002-gestion-usuarios` | HU_12 |
| HU-14 | Generar el reporte de usuarios | Baja | RF-USR-06 | `002-gestion-usuarios` | HU_13 |
| HU-15 | Iniciar sesión | Alta | RF-ACC-01, RF-ACC-02, RF-ACC-03, RF-ACC-04 | `003-gestion-acceso` | HU_14, HU_17, HU_20 |
| HU-16 | Recuperar la contraseña | Alta | RF-ACC-05 | `003-gestion-acceso` | HU_15, HU_18, HU_21 |
| HU-17 | Restablecer la contraseña | Alta | RF-ACC-06, RF-ACC-07 | `003-gestion-acceso` | Inferida (ficha) |
| HU-18 | Cerrar sesión | Alta | RF-ACC-08 | `003-gestion-acceso` | HU_16, HU_19, HU_22 |
| HU-19 | Consultar la bitácora de accesos | Baja | RF-ACC-09 | `003-gestion-acceso` | Inferida (ficha) |
| HU-20 | Registrar un proveedor | Alta | RF-PRV-01, RF-PRV-02 | `004-proveedores` | HU_33, HU_38 |
| HU-21 | Consultar proveedores | Alta | RF-PRV-03 | `004-proveedores` | HU_34, HU_39 |
| HU-22 | Actualizar un proveedor | Media | RF-PRV-04 | `004-proveedores` | HU_35, HU_40 |
| HU-23 | Cambiar el estado de un proveedor | Media | RF-PRV-05, RF-PRV-06 | `004-proveedores` | HU_36, HU_41 |
| HU-24 | Generar el reporte de proveedores | Baja | RF-PRV-07 | `004-proveedores` | HU_37, HU_42 |
| HU-25 | Registrar un producto | Alta | RF-PRD-01 | `005-productos-existencias` | Inferida (ficha) |
| HU-26 | Registrar las existencias iniciales | Alta | RF-PRD-02 | `005-productos-existencias` | HU_43, HU_49 |
| HU-27 | Consultar existencias | Alta | RF-PRD-03 | `005-productos-existencias` | HU_44, HU_50 |
| HU-28 | Ajustar existencias | Alta | RF-PRD-04, RF-PRD-05 | `005-productos-existencias` | HU_45, HU_51 |
| HU-29 | Definir stock mínimo y máximo | Alta | RF-PRD-06 | `005-productos-existencias` | HU_46, HU_53 |
| HU-30 | Cambiar el estado de un producto | Media | RF-PRD-07, RF-PRD-08 | `005-productos-existencias` | HU_52 |
| HU-31 | Generar el reporte de inventario | Media | RF-PRD-09 | `005-productos-existencias` | HU_47, HU_54 |
| HU-32 | Recibir alertas de stock mínimo por correo | Alta | RF-PRD-10, RF-PRD-11, RF-PRD-12 | `005-productos-existencias` | HU_48, HU_55 |
| HU-33 | Registrar una compra | Alta | RF-COM-01, RF-COM-02 | `006-compras` | HU_23, HU_28 |
| HU-34 | Consultar compras | Alta | RF-COM-03 | `006-compras` | HU_24, HU_29 |
| HU-35 | Actualizar una compra | Media | RF-COM-04, RF-COM-05 | `006-compras` | HU_25, HU_30 |
| HU-36 | Cambiar el estado de una compra | Alta | RF-COM-06, RF-COM-07 | `006-compras` | HU_26, HU_31 |
| HU-37 | Generar el reporte de compras | Media | RF-COM-08 | `006-compras` | HU_27, HU_32 |
| HU-38 | Registrar una categoría de clientes | Media | RF-CLI-01 | `007-clientes` | HU_163, HU_167 |
| HU-39 | Consultar las categorías de clientes | Media | RF-CLI-02 | `007-clientes` | HU_164, HU_168 |
| HU-40 | Actualizar una categoría de clientes | Media | RF-CLI-03 | `007-clientes` | HU_165, HU_169 |
| HU-41 | Cambiar el estado de una categoría de clientes | Media | RF-CLI-04 | `007-clientes` | HU_166, HU_170 |
| HU-42 | Registrar un cliente | Alta | RF-CLI-05, RF-CLI-06, RF-CLI-07 | `007-clientes` | HU_171, HU_176 |
| HU-43 | Consultar clientes | Alta | RF-CLI-08 | `007-clientes` | HU_172, HU_177 |
| HU-44 | Actualizar un cliente | Media | RF-CLI-09 | `007-clientes` | HU_173, HU_178 |
| HU-45 | Cambiar el estado de un cliente | Media | RF-CLI-10 | `007-clientes` | HU_174, HU_179 |
| HU-46 | Generar el reporte de clientes | Baja | RF-CLI-11 | `007-clientes` | HU_175, HU_180 |
| HU-47 | Registrarme como cliente | Alta | RF-CLI-12, RF-CLI-13 | `007-clientes` | HU_181 |
| HU-48 | Actualizar mi perfil | Media | RF-CLI-14, RF-CLI-15 | `007-clientes` | HU_182 |
| HU-49 | Registrar un cliente VIP | Alta | RF-VIP-01, RF-VIP-02 | `008-clientes-vip` | HU_65, HU_70 |
| HU-50 | Consultar clientes VIP | Media | RF-VIP-03 | `008-clientes-vip` | HU_66, HU_71 |
| HU-51 | Actualizar un cliente VIP | Media | RF-VIP-04 | `008-clientes-vip` | HU_67, HU_72 |
| HU-52 | Cambiar el estado de un cliente VIP | Media | RF-VIP-05 | `008-clientes-vip` | HU_68, HU_73 |
| HU-53 | Generar el reporte de clientes VIP | Baja | RF-VIP-06 | `008-clientes-vip` | HU_69, HU_74 |
| HU-54 | Configurar los niveles y beneficios VIP | Media | RF-VIP-07, RF-VIP-08 | `008-clientes-vip` | Inferida (ficha) |
| HU-55 | Registrar un cliente en la entrada | Alta | RF-ING-01, RF-ING-02 | `009-control-entradas` | HU_56 |
| HU-56 | Generar y gestionar códigos QR | Alta | RF-ING-03, RF-ING-04 | `009-control-entradas` | HU_57, HU_64 |
| HU-57 | Consultar un cliente por su código QR | Alta | RF-ING-05 | `009-control-entradas` | HU_58 |
| HU-58 | Registrar el ingreso con código QR | Alta | RF-ING-06, RF-ING-07, RF-ING-08, RF-ING-09 | `009-control-entradas` | HU_59, HU_61 |
| HU-59 | Consultar el registro de ingresos | Media | RF-ING-10 | `009-control-entradas` | HU_62 |
| HU-60 | Generar el reporte de afluencia | Media | RF-ING-11 | `009-control-entradas` | HU_60, HU_63 |
| HU-61 | Configurar el aforo y registrar salidas | Alta | RF-ING-12, RF-ING-13 | `009-control-entradas` | Inferida (ficha) |
| HU-62 | Registrar un servicio | Alta | RF-SER-01 | `010-servicios` | HU_75, HU_80 |
| HU-63 | Consultar servicios | Alta | RF-SER-02 | `010-servicios` | HU_76, HU_81 |
| HU-64 | Actualizar un servicio | Media | RF-SER-03 | `010-servicios` | HU_77, HU_82 |
| HU-65 | Cambiar el estado de un servicio | Media | RF-SER-04 | `010-servicios` | HU_78, HU_83 |
| HU-66 | Generar el reporte de servicios | Media | RF-SER-05 | `010-servicios` | HU_79, HU_84 |
| HU-67 | Registrar una categoría de empleado | Media | RF-EMP-01 | `011-empleados` | HU_85 |
| HU-68 | Consultar las categorías de empleado | Baja | RF-EMP-02 | `011-empleados` | HU_86 |
| HU-69 | Actualizar una categoría de empleado | Baja | RF-EMP-03 | `011-empleados` | HU_87 |
| HU-70 | Cambiar el estado de una categoría de empleado | Baja | RF-EMP-04 | `011-empleados` | HU_88 |
| HU-71 | Registrar un empleado | Alta | RF-EMP-05, RF-EMP-06 | `011-empleados` | HU_89 |
| HU-72 | Consultar empleados | Alta | RF-EMP-07 | `011-empleados` | HU_90 |
| HU-73 | Actualizar un empleado | Media | RF-EMP-08 | `011-empleados` | HU_91 |
| HU-74 | Cambiar el estado de un empleado | Media | RF-EMP-09 | `011-empleados` | HU_92 |
| HU-75 | Generar el reporte de empleados | Baja | RF-EMP-10 | `011-empleados` | HU_93 |
| HU-76 | Programar una actividad en la agenda de un empleado | Alta | RF-AGE-01, RF-AGE-02, RF-AGE-03 | `012-agenda-empleados` | HU_94, HU_98, HU_100 |
| HU-77 | Consultar la agenda de empleados | Alta | RF-AGE-04 | `012-agenda-empleados` | HU_95, HU_101 |
| HU-78 | Actualizar una actividad de la agenda | Media | RF-AGE-05 | `012-agenda-empleados` | HU_96, HU_102 |
| HU-79 | Cambiar el estado de una actividad de la agenda | Media | RF-AGE-06 | `012-agenda-empleados` | HU_97, HU_103 |
| HU-80 | Generar el reporte de agenda de empleados | Media | RF-AGE-07 | `012-agenda-empleados` | HU_99, HU_104 |
| HU-81 | Gestionar los espacios reservables | Alta | RF-RES-01 | `013-reservas` | Inferida (ficha) |
| HU-82 | Registrar una reserva | Alta | RF-RES-02, RF-RES-03, RF-RES-04 | `013-reservas` | HU_105, HU_111 |
| HU-83 | Consultar reservas | Alta | RF-RES-05 | `013-reservas` | HU_106, HU_112 |
| HU-84 | Actualizar una reserva | Media | RF-RES-06 | `013-reservas` | HU_107, HU_113 |
| HU-85 | Cambiar el estado de una reserva | Alta | RF-RES-07, RF-RES-08 | `013-reservas` | HU_108 |
| HU-86 | Eliminar una reserva | Baja | RF-RES-09 | `013-reservas` | HU_109, HU_114 |
| HU-87 | Generar el reporte de reservas | Media | RF-RES-10 | `013-reservas` | HU_110, HU_115 |
| HU-88 | Reservar como cliente | Alta | RF-RES-11, RF-RES-12 | `013-reservas` | Inferida (ficha) |
| HU-89 | Registrar un evento | Alta | RF-EVE-01, RF-EVE-02, RF-EVE-03 | `014-eventos` | HU_116, HU_120 |
| HU-90 | Consultar eventos | Alta | RF-EVE-04 | `014-eventos` | HU_117, HU_121 |
| HU-91 | Actualizar un evento | Alta | RF-EVE-05, RF-EVE-06 | `014-eventos` | HU_118, HU_122 |
| HU-92 | Cambiar el estado de un evento | Alta | RF-EVE-07, RF-EVE-08 | `014-eventos` | HU_123 |
| HU-93 | Generar el reporte de eventos | Media | RF-EVE-09 | `014-eventos` | HU_119, HU_124 |
| HU-94 | Registrar la ficha técnica de un evento | Alta | RF-EVE-10, RF-EVE-11 | `014-eventos` | HU_125, HU_130 |
| HU-95 | Consultar fichas técnicas | Alta | RF-EVE-12 | `014-eventos` | HU_126, HU_131 |
| HU-96 | Actualizar una ficha técnica | Alta | RF-EVE-13 | `014-eventos` | HU_127, HU_132 |
| HU-97 | Cambiar el estado de una ficha técnica | Media | RF-EVE-14, RF-EVE-15 | `014-eventos` | HU_128, HU_133 |
| HU-98 | Generar el reporte de fichas técnicas por temática | Media | RF-EVE-16 | `014-eventos` | HU_129, HU_134 |
| HU-99 | Programar una actividad en la agenda de eventos | Media | RF-AGV-01 | `015-agenda-eventos` | HU_135, HU_142 |
| HU-100 | Consultar la agenda de eventos | Media | RF-AGV-02 | `015-agenda-eventos` | HU_136, HU_143 |
| HU-101 | Actualizar una actividad de evento | Media | RF-AGV-03 | `015-agenda-eventos` | HU_137, HU_144 |
| HU-102 | Cambiar el estado de una actividad de evento | Media | RF-AGV-04 | `015-agenda-eventos` | HU_138, HU_145 |
| HU-103 | Asignar empleados y servicios a una actividad | Alta | RF-AGV-05, RF-AGV-06 | `015-agenda-eventos` | HU_139 |
| HU-104 | Generar el reporte de agenda de eventos | Baja | RF-AGV-07 | `015-agenda-eventos` | HU_140, HU_146 |
| HU-105 | Enviar notificaciones de eventos por correo | Media | RF-AGV-08, RF-AGV-09 | `015-agenda-eventos` | HU_141, HU_147 |
| HU-106 | Solicitar una fiesta privada | Alta | RF-AGV-10, RF-AGV-11 | `015-agenda-eventos` | HU_148 |
| HU-107 | Consultar mis eventos y la cartelera | Media | RF-AGV-12 | `015-agenda-eventos` | HU_149 |
| HU-108 | Modificar mi solicitud de fiesta privada | Media | RF-AGV-13 | `015-agenda-eventos` | HU_150 |
| HU-109 | Seguir y cancelar mi solicitud | Media | RF-AGV-14 | `015-agenda-eventos` | HU_151 |
| HU-110 | Elegir los servicios de mi evento | Media | RF-AGV-15 | `015-agenda-eventos` | HU_152 |
| HU-111 | Registrar un pedido | Alta | RF-PED-01, RF-PED-02 | `016-pedidos` | HU_183, HU_189 |
| HU-112 | Consultar pedidos y su estado | Alta | RF-PED-03 | `016-pedidos` | HU_184, HU_190 |
| HU-113 | Actualizar un pedido | Alta | RF-PED-04 | `016-pedidos` | HU_185, HU_191 |
| HU-114 | Cambiar el estado de un pedido | Alta | RF-PED-05, RF-PED-06 | `016-pedidos` | HU_186, HU_192 |
| HU-115 | Asociar un cliente a un pedido | Media | RF-PED-07 | `016-pedidos` | HU_187, HU_193 |
| HU-116 | Generar el reporte de pedidos | Media | RF-PED-08 | `016-pedidos` | HU_188, HU_194 |
| HU-117 | Hacer un pre-pedido como cliente | Media | RF-PED-09 | `016-pedidos` | HU_195 |
| HU-118 | Consultar mis pedidos | Media | RF-PED-10 | `016-pedidos` | HU_196 |
| HU-119 | Modificar mi pedido | Baja | RF-PED-11 | `016-pedidos` | HU_197 |
| HU-120 | Registrar una venta | Alta | RF-VEN-01, RF-VEN-02, RF-VEN-03 | `017-ventas` | HU_153, HU_158 |
| HU-121 | Cobrar un pedido | Alta | RF-VEN-04, RF-VEN-05 | `017-ventas` | Inferida (ficha) |
| HU-122 | Consultar ventas | Alta | RF-VEN-06 | `017-ventas` | HU_154, HU_159 |
| HU-123 | Cambiar el estado de una venta | Alta | RF-VEN-07, RF-VEN-08 | `017-ventas` | HU_155, HU_160 |
| HU-124 | Generar el comprobante de pago | Alta | RF-VEN-09, RF-VEN-10 | `017-ventas` | HU_156, HU_161 |
| HU-125 | Generar el reporte de ventas | Media | RF-VEN-11 | `017-ventas` | HU_157, HU_162 |
| HU-126 | Programar una campaña de promociones | Media | RF-NOT-01, RF-NOT-02, RF-NOT-03 | `018-notificaciones` | HU_198, HU_203 |
| HU-127 | Notificar eventos especiales | Media | RF-NOT-04 | `018-notificaciones` | HU_199 |
| HU-128 | Felicitar a los clientes en su cumpleaños | Media | RF-NOT-05, RF-NOT-06 | `018-notificaciones` | HU_200, HU_204 |
| HU-129 | Gestionar plantillas de correo | Media | RF-NOT-07, RF-NOT-08 | `018-notificaciones` | HU_201 |
| HU-130 | Monitorear los envíos de correo | Baja | RF-NOT-09 | `018-notificaciones` | HU_202 |
| HU-131 | Gestionar listas de destinatarios | Media | RF-NOT-10, RF-NOT-11 | `018-notificaciones` | HU_205 |
| HU-132 | Darme de baja de las notificaciones | Media | RF-NOT-12 | `018-notificaciones` | Inferida (ficha) |
| HU-133 | Configurar las reglas de acumulación de puntos | Media | RF-PUN-01 | `019-programa-puntos` | HU_206 |
| HU-134 | Configurar las recompensas | Media | RF-PUN-02, RF-PUN-03 | `019-programa-puntos` | HU_207 |
| HU-135 | Consultar el saldo de puntos de un cliente | Media | RF-PUN-04 | `019-programa-puntos` | HU_208, HU_212 |
| HU-136 | Acumular puntos por consumo e ingreso | Alta | RF-PUN-05, RF-PUN-06 | `019-programa-puntos` | HU_210 |
| HU-137 | Canjear puntos | Alta | RF-PUN-07, RF-PUN-08 | `019-programa-puntos` | HU_211 |
| HU-138 | Generar el reporte del programa de puntos | Baja | RF-PUN-09 | `019-programa-puntos` | HU_209 |
| HU-139 | Consultar mis puntos y recompensas | Media | RF-PUN-10 | `019-programa-puntos` | Inferida (ficha) |
| HU-140 | Consultar el top 10 de clientes VIP y generales | Media | RF-DES-01 | `020-desempeno` | HU_213, HU_219, HU_225 |
| HU-141 | Consultar los servicios más y menos solicitados | Media | RF-DES-02 | `020-desempeno` | HU_214, HU_220, HU_226 |
| HU-142 | Consultar la programación de empleados por servicio | Media | RF-DES-03 | `020-desempeno` | HU_215, HU_221 |
| HU-143 | Consultar las ventas mes a mes | Alta | RF-DES-04 | `020-desempeno` | HU_216, HU_222, HU_227 |
| HU-144 | Consultar el top 10 de eventos temáticos | Media | RF-DES-05 | `020-desempeno` | HU_217, HU_223, HU_228 |
| HU-145 | Comparar eventos temáticos y fiestas privadas | Media | RF-DES-06 | `020-desempeno` | HU_218, HU_224, HU_229 |

## Apéndice E: Equivalencias v1.0 → v2.0

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

