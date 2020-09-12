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

`PUT /api/clientes/{id}`

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

`PATCH /api/clientes/{id}`

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

**Crear una tarjeta**

`POST /api/clientes/{id_cliente}/tarjetas`

Body:
- numero
- limite
- fechaVencimiento
- activo

Responses:
- id
- cliente
- numero
- limite
- fechaVencimiento
- activo

Status codes:
- 201: tarjeta creada

**Actualizar una tarjeta**

`PUT /api/tarjetas/{id}`

Body:
- numero
- limite
- fechaVencimiento
- activo

Responses:
- id
- cliente
- numero
- limite
- fechaVencimiento
- activo

Status codes:
- 200: tarjeta actualizada
- 404: tarjeta inexistente

**Cambiar un dato de una tarjeta**

`PATCH /api/tarjetas/{id}`

Body:
- numero
- limite
- fechaVencimiento
- activo

Responses:
- id
- cliente
- numero
- limite
- fechaVencimiento
- activo

Status codes:
- 200: tarjeta actualizado
- 404: tarjeta inexistente

**Listar todas las tarjetas**

`GET /api/tarjetas`

Responses:
- id
- cliente
- numero
- limite
- fechaVencimiento
- activo

Status codes:
- 200: tarjetas listadass

**Listar una tarjeta**

`GET /api/tarjetas/{id}`

Responses:
- id
- cliente
- numero
- limite
- fechaVencimiento
- activo

Status codes:
- 200: tarjeta listada
- 404: tarjeta inexistente

**Listar las tarjetas de un cliente**

`GET /api/clientes/{id_cliente}/tarjetas`

Responses:
- id
- cliente
- numero
- limite
- fechaVencimiento
- activo

Status codes:
- 200: tarjetas listada
- 404: el cliente no tiene tarjetas

**Eliminar una tarjeta**

`DELETE /api/tarjetas/{id}`

Responses:
- id
- cliente
- numero
- limite
- fechaVencimiento
- activo

Status codes:
- 200: tarjeta eliminada
- 404: tarjeta inexistente

##### Recurso: movimientos

**Crear un movimiento**

`POST /api/clientes/{id_cliente}/tarjetas/{id_tarjeta}/movimientos`

Body:
- fecha
- descripcion
- importe
- activo

Responses:
- id
- cliente
- tarjeta
- fecha
- descripcion
- importe
- activo

Status codes:
- 201: cliente creado

**Actualizar un movimiento**

`PUT /api/movimientos/{id}`

Status codes:
- 403: operación no permitida

**Cambiar el estado de un movimiento**

`PATCH /api/movimientos/{id}`

Body:
- activo

Responses:
- cliente
- tarjeta
- fecha
- descripcion
- importe
- activo

Status codes:
- 200: movimiento actualizado
- 404: movimiento inexistente

**Listar todos los movimientos**

`GET /api/movimientos`

Responses:
- id
- cliente
- tarjeta
- fecha
- descripcion
- importe
- activo

Status codes:
- 200: movimientos listados

**Listar un movimiento**

`GET /api/movimientos/{id}`

Responses:
- cliente
- tarjeta
- fecha
- descripcion
- importe
- activo

Status codes:
- 200: movimiento listado
- 404: movimiento inexistente

**Listar los movimientos para una tarjeta**

`GET /api/clientes/{id_cliente}/tarjetas/{id_tarjeta}/movimientos`

Responses:
- cliente
- tarjeta
- fecha
- descripcion
- importe
- activo

Status codes:
- 200: movimientos listados
- 404: la tarjeta no tiene movimientos

**Eliminar un movimiento**

`DELETE /api/movimiento/{id}`

Status codes:
- 403: no se permite eliminar movimientos

## Tecnologías propuestas

- Frontend: React
- Backend: Node.js
- Base de datos: MongoDB
