# Feature Specification: Medición y desempeño

**Feature Branch**: `020-desempeno`  
**Created**: 2026-11-21  
**Status**: Draft  
**Proyecto**: Sistema de Gestión Integral para Discoteca (Discoteca (Envigado)) · **SRS**: `SRS-Discoteca-v2.0.md` §4.20 · **Historias**: HU-140 – HU-145  
**Input**: "Entrega los reportes de desempeño definidos en la ficha, con filtros por periodo, gráficos y exportación a PDF y CSV. Las historias con rol Cliente sobre estos reportes se interpretan como del dueño de la discoteca (TBD-11). Actores: Administrador, Empleado."

> Spec generada a partir del SRS v2.0 y de las historias de usuario del proyecto. Respeta la estructura de `spec-template.md` de spec-kit; los encabezados van en español con su equivalente en inglés. Antes de `/speckit.plan`, ejecute `/speckit.clarify` si hay marcas `[NEEDS CLARIFICATION]`.

## Escenarios de usuario y pruebas (User Scenarios & Testing) *(obligatorio)*

### Historia 1 — Consultar el top 10 de clientes VIP y generales (Prioridad: P2) · HU-140

**Como** Administrador o Empleado, **quiero** ver los 10 clientes VIP y los 10 clientes generales con mayor gasto en un periodo, **para** identificar a los clientes más importantes.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite identificar a los clientes más importantes.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/indicadores/top-clientes?desde&hasta&orden&formato` y en la pantalla «Reportes › Top clientes», con los datos semilla, verificando los escenarios 1 a 2.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el periodo mensual, **cuando** genero el reporte, **entonces** veo dos listas separadas con nombre, id, gasto total y número de visitas, ordenables ascendente o descendente.
2. **Dado** el reporte, **cuando** lo descargo, **entonces** obtengo PDF y CSV.

### Historia 2 — Consultar los servicios más y menos solicitados (Prioridad: P2) · HU-141

**Como** Administrador o Empleado, **quiero** ver los servicios más y menos solicitados con su participación, **para** optimizar la oferta de servicios.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite optimizar la oferta de servicios.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/indicadores/servicios-solicitados?desde&hasta&orden&formato` y en la pantalla «Reportes › Servicios solicitados», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un rango de fechas, **cuando** genero el reporte, **entonces** veo dos listas con el servicio, las veces solicitado (reservas, fichas técnicas y ventas) y su porcentaje sobre el total, ordenables, en PDF y CSV.

### Historia 3 — Consultar la programación de empleados por servicio (Prioridad: P2) · HU-142

**Como** Administrador o Empleado, **quiero** ver qué empleados están asignados a cada servicio con fechas y horas, **para** gestionar la asignación de personal.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite gestionar la asignación de personal.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/indicadores/programacion-servicios?desde&hasta&empleado&servicio&formato` y en la pantalla «Reportes › Programación por servicio», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** la semana actual y el servicio «Mesero VIP», **cuando** genero el reporte, **entonces** veo en lista o calendario los empleados asignados con fecha y horario, filtrable por empleado, servicio y fechas, en CSV y PDF.

### Historia 4 — Consultar las ventas mes a mes (Prioridad: P1) · HU-143

**Como** Administrador o Empleado, **quiero** ver las ventas de cada mes con la venta mayor, la menor y los subtotales, **para** analizar la rentabilidad del negocio.

**Por qué esta prioridad (Why this priority)**: Prioridad Alta en el backlog del proyecto. Aporta valor porque permite analizar la rentabilidad del negocio.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/indicadores/ventas-mensuales?anio&desde&hasta&formato` y en la pantalla «Reportes › Ventas mes a mes», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** el año 2026, **cuando** genero el reporte, **entonces** veo por mes el total vendido, la venta mayor, la venta menor y el subtotal, con gráfico de barras o líneas, en PDF y CSV.

### Historia 5 — Consultar el top 10 de eventos temáticos (Prioridad: P2) · HU-144

**Como** Administrador o Empleado, **quiero** ver los 10 eventos temáticos más solicitados, **para** saber qué tipos de eventos son más populares.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite saber qué tipos de eventos son más populares.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/indicadores/top-tematicas?desde&hasta&orden&formato` y en la pantalla «Reportes › Top eventos temáticos», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un rango de fechas, **cuando** genero el reporte, **entonces** veo las 10 temáticas con más eventos realizados y su asistencia, ordenables, en PDF y CSV.

### Historia 6 — Comparar eventos temáticos y fiestas privadas (Prioridad: P2) · HU-145

**Como** Administrador o Empleado, **quiero** comparar la cantidad de eventos temáticos y fiestas privadas, **para** analizar las preferencias de los clientes.

**Por qué esta prioridad (Why this priority)**: Prioridad Media en el backlog del proyecto. Aporta valor porque permite analizar las preferencias de los clientes.

**Prueba independiente (Independent Test)**: Se prueba de forma aislada invocando `GET /api/v1/indicadores/tematicos-vs-privadas?desde&hasta&formato` y en la pantalla «Reportes › Comparativo de eventos», con los datos semilla, verificando los escenarios 1 a 1.

**Escenarios de aceptación (Acceptance Scenarios)**:

1. **Dado** un rango de fechas, **cuando** genero el comparativo, **entonces** veo un gráfico de barras o de pastel y una tabla con la cantidad, asistentes e ingresos de cada tipo, en PDF y CSV.

### Casos límite (Edge Cases)

- Periodo sin datos: los reportes muestran «Sin datos para el periodo» y los gráficos vacíos con sus ejes.

## Requerimientos (Requirements) *(obligatorio)*

### Requerimientos funcionales (Functional Requirements)

- **FR-001**: El sistema DEBE generar dos listas separadas con el top 10 de clientes VIP y el top 10 de clientes generales por gasto total en un periodo (día, semana, mes, año o rango), con nombre, id, gasto y visitas, ordenables y descargables en PDF y CSV. *(RF-DES-01 · HU-140)*
- **FR-002**: El sistema DEBE generar las listas de servicios más y menos solicitados en un periodo, con número de solicitudes y porcentaje de participación, ordenables y descargables en PDF y CSV. *(RF-DES-02 · HU-141)*
- **FR-003**: El sistema DEBE mostrar la programación de empleados por servicio en lista y calendario, filtrable por empleado, servicio y periodo, exportable a CSV y PDF. *(RF-DES-03 · HU-142)*
- **FR-004**: El sistema DEBE generar el reporte de ventas mes a mes de un año o rango con total, venta mayor, venta menor y subtotal por mes, en gráfico de barras o líneas, descargable en PDF y CSV. *(RF-DES-04 · HU-143)*
- **FR-005**: El sistema DEBE generar el top 10 de eventos temáticos por temática con la cantidad de veces realizados y la asistencia en el periodo, ordenable y descargable en PDF y CSV. *(RF-DES-05 · HU-144)*
- **FR-006**: El sistema DEBE generar el comparativo entre eventos temáticos y fiestas privadas en un periodo con cantidad, asistentes e ingresos, en gráfico de barras o pastel y tabla, descargable en PDF y CSV. *(RF-DES-06 · HU-145)*

### Requerimientos no funcionales aplicables

Aplican todos los principios de `constitution.md` y los RNF transversales del SRS §5. En particular:

- **RNF-REN-03**: Los comprobantes de venta deben generarse en 3 s o menos; los reportes en PDF, CSV o Excel en 10 s o menos para un año de datos.
- **RNF-PRI-02**: Un Cliente solo accede a su propia información; los reportes y listados con datos de otros clientes, ventas o empleados solo están disponibles para roles internos con permiso.

## Criterios de éxito (Success Criteria) *(obligatorio)*

### Resultados medibles (Measurable Outcomes)

- **SC-001**: Cada reporte se genera en 10 segundos o menos para un año de datos.
- **SC-002**: Los totales de ventas del reporte coinciden con el historial de ventas pagadas en el 100 % de las pruebas.

## Supuestos (Assumptions)

- Se implementa después de (o junto con) las specs: 017-ventas, 013-reservas, 014-eventos, 012-agenda-empleados.
- La autenticación JWT y la autorización por permisos están disponibles (spec de acceso); mientras no lo estén, los endpoints se prueban con un usuario semilla.

## Insumos para `/speckit.plan` (no normativo)

Detalle orientativo para el plan técnico. No reemplaza las decisiones del plan, pero cualquier desviación debe quedar justificada en `plan.md`.

**API REST sugerida** (base `/api/v1`, sobre `{ ok, data, meta, error }`):

| Método | Ruta | Propósito | HU |
|---|---|---|---|
| GET | `/api/v1/indicadores/top-clientes?desde&hasta&orden&formato` | Consultar el top 10 de clientes VIP y generales | HU-140 |
| GET | `/api/v1/indicadores/servicios-solicitados?desde&hasta&orden&formato` | Consultar los servicios más y menos solicitados | HU-141 |
| GET | `/api/v1/indicadores/programacion-servicios?desde&hasta&empleado&servicio&formato` | Consultar la programación de empleados por servicio | HU-142 |
| GET | `/api/v1/indicadores/ventas-mensuales?anio&desde&hasta&formato` | Consultar las ventas mes a mes | HU-143 |
| GET | `/api/v1/indicadores/top-tematicas?desde&hasta&orden&formato` | Consultar el top 10 de eventos temáticos | HU-144 |
| GET | `/api/v1/indicadores/tematicos-vs-privadas?desde&hasta&formato` | Comparar eventos temáticos y fiestas privadas | HU-145 |

**Pantallas (frontend vanilla):**

- Reportes › Top clientes — HU-140
- Reportes › Servicios solicitados — HU-141
- Reportes › Programación por servicio — HU-142
- Reportes › Ventas mes a mes — HU-143
- Reportes › Top eventos temáticos — HU-144
- Reportes › Comparativo de eventos — HU-145

**Reglas de negocio:**

- **RN-40**: Los indicadores excluyen ventas anuladas, reservas canceladas y eventos cancelados; los reportes con datos de clientes solo los ven roles internos con permiso.

## Trazabilidad

| Historia spec | HU | RF | Excel |
|---|---|---|---|
| 1 | HU-140 | RF-DES-01 | HU_213, HU_219, HU_225 |
| 2 | HU-141 | RF-DES-02 | HU_214, HU_220, HU_226 |
| 3 | HU-142 | RF-DES-03 | HU_215, HU_221 |
| 4 | HU-143 | RF-DES-04 | HU_216, HU_222, HU_227 |
| 5 | HU-144 | RF-DES-05 | HU_217, HU_223, HU_228 |
| 6 | HU-145 | RF-DES-06 | HU_218, HU_224, HU_229 |

