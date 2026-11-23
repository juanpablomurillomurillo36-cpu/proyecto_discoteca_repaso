# Specs de spec-kit — Sistema de Gestión Integral para Discoteca

Una spec por módulo, generadas desde `SRS-Discoteca-v2.0.md` y `historias-usuario-Discoteca.md` (2026-11-21). Cada carpeta corresponde a una rama de spec-kit (`NNN-modulo`).

## Cómo usarlas con GitHub spec-kit

1. Inicialice spec-kit en el repositorio del proyecto: `specify init . --ai <agente>` (o `uvx --from git+https://github.com/github/spec-kit.git specify init .`).
2. Copie `../constitution.md` en `.specify/memory/constitution.md` (o pásele su contenido a `/speckit.constitution`).
3. Copie esta carpeta `specs/` en la raíz del repositorio. Para cada módulo cree la rama con el mismo nombre de la carpeta: `git checkout -b 001-...`.
4. En la rama del módulo: `/speckit.clarify` (si hay `[NEEDS CLARIFICATION]`) → `/speckit.plan` → `/speckit.tasks` → `/speckit.analyze` → `/speckit.implement`.
5. No use `/speckit.specify` para reescribir estas specs: si algo cambia, edítelas a mano y registre el cambio en el SRS (los IDs `RF-` son la trazabilidad).

## Índice y orden sugerido

El orden sigue las dependencias: primero seguridad y datos maestros, luego operación, al final reportes. Dentro de cada spec, las historias P1 forman el MVP del módulo.

| Spec | Módulo | Prioridad | Historias | P1 / P2 / P3 | Puntos | Depende de |
|---|---|---|---|---|---|---|
| [`001-roles-permisos`](001-roles-permisos/spec.md) | Roles y permisos | Alta | 9 | 4 / 4 / 1 | 19 | — |
| [`002-gestion-usuarios`](002-gestion-usuarios/spec.md) | Gestión de usuarios | Alta | 5 | 3 / 1 / 1 | 12 | 001-roles-permisos |
| [`003-gestion-acceso`](003-gestion-acceso/spec.md) | Gestión de acceso | Alta | 5 | 4 / 0 / 1 | 10 | 002-gestion-usuarios |
| [`004-proveedores`](004-proveedores/spec.md) | Proveedores | Alta | 5 | 2 / 2 / 1 | 11 | 001-roles-permisos |
| [`005-productos-existencias`](005-productos-existencias/spec.md) | Productos y existencias | Alta | 8 | 6 / 2 / 0 | 19 | 001-roles-permisos |
| [`006-compras`](006-compras/spec.md) | Compras | Alta | 5 | 3 / 2 / 0 | 15 | 004-proveedores, 005-productos-existencias |
| [`007-clientes`](007-clientes/spec.md) | Clientes y categorías de clientes | Alta | 11 | 3 / 7 / 1 | 21 | 002-gestion-usuarios |
| [`008-clientes-vip`](008-clientes-vip/spec.md) | Clientes VIP | Alta | 6 | 1 / 4 / 1 | 13 | 007-clientes |
| [`009-control-entradas`](009-control-entradas/spec.md) | Control de entradas | Alta | 7 | 5 / 2 / 0 | 21 | 007-clientes, 008-clientes-vip |
| [`010-servicios`](010-servicios/spec.md) | Servicios | Alta | 5 | 2 / 3 / 0 | 8 | 001-roles-permisos |
| [`011-empleados`](011-empleados/spec.md) | Empleados y categorías de empleados | Alta | 9 | 2 / 3 / 4 | 15 | 002-gestion-usuarios |
| [`012-agenda-empleados`](012-agenda-empleados/spec.md) | Agenda de empleados | Alta | 5 | 2 / 3 / 0 | 13 | 010-servicios, 011-empleados |
| [`013-reservas`](013-reservas/spec.md) | Reservas | Alta | 8 | 5 / 2 / 1 | 21 | 007-clientes, 010-servicios |
| [`014-eventos`](014-eventos/spec.md) | Eventos y fichas técnicas | Alta | 10 | 7 / 3 / 0 | 26 | 010-servicios, 007-clientes |
| [`015-agenda-eventos`](015-agenda-eventos/spec.md) | Agenda de eventos | Media | 12 | 2 / 9 / 1 | 26 | 014-eventos, 011-empleados, 012-agenda-empleados |
| [`016-pedidos`](016-pedidos/spec.md) | Pedidos | Alta | 9 | 4 / 4 / 1 | 22 | 005-productos-existencias, 007-clientes, 013-reservas |
| [`017-ventas`](017-ventas/spec.md) | Ventas | Alta | 6 | 5 / 1 / 0 | 19 | 016-pedidos, 005-productos-existencias |
| [`018-notificaciones`](018-notificaciones/spec.md) | Notificaciones | Media | 7 | 0 / 6 / 1 | 20 | 007-clientes, 014-eventos |
| [`019-programa-puntos`](019-programa-puntos/spec.md) | Programa de puntos | Media | 7 | 2 / 4 / 1 | 18 | 007-clientes, 017-ventas, 009-control-entradas |
| [`020-desempeno`](020-desempeno/spec.md) | Medición y desempeño | Media | 6 | 1 / 5 / 0 | 16 | 017-ventas, 013-reservas, 014-eventos, 012-agenda-empleados |

