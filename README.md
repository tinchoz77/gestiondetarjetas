# Sistema de Gestión de Tarjetas de Crédito

**Alumno**
Zavala, Martín - 0107957

**Repositorio**
[https://github.com/tinchoz77/gestiondetarjetas]

## Alcance

**Objetivo**
Se trata de una empresa fintech que solicita el desarrollo de un sistema para realizar el seguimiento de las tarjetas de crédito virtuales que ofrece a sus clientes.
Para ello el sistema permitirá realizar la gestión integral de movimientos en cuenta de tarjetas de crédito para los clientes.

**Funciones**
- ABM de Clientes
- ABM de Tarjetas de Crédito
- Asignación de tarjetas a clientes
- Alta de movimientos de tarjeta de crédito
- Listado de movimientos para un cliente/período determinado

## Documentación de servicios

##### Recurso: clientes

**Crear un cliente**
`POST /api/clientes`

Body:
- nombre
- apellido
- email
- activo

Responses:
- id
- nombre
- apellido
- email
- activo

Status codes:
- 201: cliente creado

**Actualizar un cliente**
`PUT /api/clientes`

Body:
- nombre
- apellido
- email
- activo

Responses:
- id
- nombre
- apellido
- email
- activo

Status codes:
- 200: cliente actualizado
- 404: cliente inexistente

**Cambiar un dato de un cliente**
`PATCH /api/clientes`

Body:
- nombre
- apellido
- email
- activo

Responses:
- id
- nombre
- apellido
- email
- activo

Status codes:
- 200: cliente actualizado
- 404: cliente inexistente

**Listar todos los clientes**
`GET /api/clientes`

Responses:
- id
- nombre
- apellido
- email
- activo

Status codes:
- 200: clientes listados

**Listar un cliente**
`GET /api/clientes/{id}`

Responses:
- id
- nombre
- apellido
- email
- activo

Status codes:
- 200: cliente listado
- 404: cliente inexistente

**Eliminar un cliente**
`DELETE /api/clientes/{id}`

Responses:
- id
- nombre
- apellido
- email
- activo

Status codes:
- 200: cliente eliminado
- 404: cliente inexistente

##### Recurso: tarjetas
`TODO: documentar`

##### Recurso: movimientos
`TODO: documentar`

## Tecnologías propuestas

- Frontend: React
- Backend: Node.js
- Base de datos: MongoDB
