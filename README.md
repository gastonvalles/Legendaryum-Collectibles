# Legendaryum Collectibles
![Legendaryum Collectibles Logo](https://media.licdn.com/dms/image/C4D0BAQFRUqCmn-u-yw/company-logo_200_200/0/1662364611557?e=1701302400&v=beta&t=NmOCAc4fMa4g3Q8a5mq6G_L1AY_dSBnCypnw4qYmPag)

## Contexto: 
La funcionalidad radica en que en el metaverso aparezcan coleccionables representados en forma de una moneda en 3D, la persona se acerca y obtiene la moneda y su recompensa.
El tema está en que una vez que una persona agarra la moneda, ya desaparece y nadie más la puede obtener, por lo menos la moneda que estaba en esa posición.

## Challenge: 
1. Crear un microservicio en donde un cliente se pueda conectar por socket (Socket.io).

2. Al conectarse el usuario deberia ver las rooms disponibles y, al ingresar a alguna room, esta le deberia devolver la posicion x, y, z de todas las monedas disponibles.

3. El usuario ya conectado a una room debe poder agarrar una moneda al moverse a la posicion de esta.

4. El microservicio debe mandar una señal a todos los usuarios, indicando qué monedas dejan de estar disponibles (cuando alguien más la agarra).

5. Api rest para consultar cantidad de monedas disponibles en una room.

6. La forma de configurar el microservicio, es mediante un JSON. Donde le vamos a indicar las rooms, la cantidad de monedas a generar, y un area 3D(xmax, xmin, ymax...), donde se van a generar las monedas.

7. La persistencia debe ser en redis, para guardar las posiciones de las monedas generadas.

8. Las monedas generadas deben tener ttl, osea que cada 1 hora se generen otro set de monedas, y las de la hora anterior, se borren.