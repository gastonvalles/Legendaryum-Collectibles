# Legendaryum Collectibles

![Legendaryum Collectibles Logo](https://media.licdn.com/dms/image/C4D0BAQFRUqCmn-u-yw/company-logo_200_200/0/1662364611557?e=1701302400&v=beta&t=NmOCAc4fMa4g3Q8a5mq6G_L1AY_dSBnCypnw4qYmPag)

## Contexto

Legendaryum Collectibles es una app diseñada para crear una experiencia de coleccionismo en un metaverso. Los usuarios pueden conectarse al servicio a través de Socket.io y explorar diferentes "rooms" que contienen "coins" en 3D como objetos coleccionables. El objetivo principal es permitir que los usuarios encuentren y recojan estas monedas en un espacio virtual compartido.

## Challenge

1. Crear un microservicio en donde un cliente se pueda conectar por socket (Socket.io).
2. Al conectarse, el usuario debería ver las rooms disponibles y, al ingresar a alguna room, esta le debería devolver la posición x, y, z de todas las monedas disponibles.
3. El usuario ya conectado a una room debe poder agarrar una moneda al moverse a la posición de esta.
4. El microservicio debe mandar una señal a todos los usuarios, indicando qué monedas dejan de estar disponibles (cuando alguien más la agarra).
5. API REST para consultar la cantidad de monedas disponibles en una room.
6. La forma de configurar el microservicio es mediante un JSON. Donde le vamos a indicar las rooms, la cantidad de monedas a generar y un área 3D (xmax, xmin, ymax...) donde se van a generar las monedas.
7. La persistencia debe ser en Redis, para guardar las posiciones de las monedas generadas.
8. Las monedas generadas deben tener TTL, o sea que cada 1 hora se generen otro set de monedas, y las de la hora anterior se borren.

## Tecnologías Utilizadas

- Node.js
- Express.js
- Socket.io
- Redis
- Axios
- TypeScript
- Docker
- HTML

## Endpoints de la API REST

### Monedas (Coins)

- Obtener todas las monedas:

  - **URL**: `/coins`
  - **Método**: GET

- Obtener una moneda por posición:

  - **URL**: `/coins/:x/:y/:z`
  - **Método**: GET
  - **Parámetros de la URL**:
    - `x` (entero): Coordenada X de la moneda.
    - `y` (entero): Coordenada Y de la moneda.
    - `z` (entero): Coordenada Z de la moneda.

- Crear una nueva moneda:

  - **URL**: `/coins`
  - **Método**: POST
  - **Cuerpo de la Solicitud (JSON)**:
    ```json
    {
      "x": 1,
      "y": 2,
      "z": 3
    }
    ```

- Actualizar el estado de una moneda:

  - **URL**: `/coins/:x/:y/:z`
  - **Método**: PUT
  - **Parámetros de la URL**:
    - `x` (entero): Coordenada X de la moneda.
    - `y` (entero): Coordenada Y de la moneda.
    - `z` (entero): Coordenada Z de la moneda.
  - **Cuerpo de la Solicitud (JSON)**:
    ```json
    {
      "available": true
    }
    ```

- Eliminar una moneda:
  - **URL**: `/coins/:x/:y/:z`
  - **Método**: DELETE
  - **Parámetros de la URL**:
    - `x` (entero): Coordenada X de la moneda.
    - `y` (entero): Coordenada Y de la moneda.
    - `z` (entero): Coordenada Z de la moneda.

### Salas (Rooms)

- Obtener todas las salas:

  - **URL**: `/rooms`
  - **Método**: GET

- Obtener una sala por nombre:

  - **URL**: `/rooms/:name`
  - **Método**: GET
  - **Parámetros de la URL**:
    - `name` (cadena): El nombre de la sala que se desea obtener.

- Crear una nueva sala:

  - **URL**: `/rooms`
  - **Método**: POST
  - **Cuerpo de la Solicitud (JSON)**:
    ```json
    {
      "name": "NuevaSala",
      "numCoins": 10,
      "coinGenerationArea": {
        "xmin": -5,
        "xmax": 5,
        "ymin": -5,
        "ymax": 5,
        "zmin": -5,
        "zmax": 5
      }
    }
    ```

- Actualizar una sala por nombre:

  - **URL**: `/rooms/:name`
  - **Método**: PUT
  - **Parámetros de la URL**:
    - `name` (cadena): El nombre de la sala que se desea actualizar.
  - **Cuerpo de la Solicitud (JSON)**:
    ```json
    {
      "numCoins": 20,
      "coinGenerationArea": {
        "xmin": -8,
        "xmax": 8,
        "ymin": -4,
        "ymax": 4,
        "zmin": -4,
        "zmax": 4
      }
    }
    ```

- Eliminar una sala por nombre:
  - **URL**: `/rooms/:name`
  - **Método**: DELETE
  - **Parámetros de la URL**:
    - `name` (cadena): El nombre de la sala que se desea eliminar.
