# React + Vite

- Este proyecto contiene principios basicos de conocimientos en react, utilizando los estandar de maquetacion de 
  tailwind, y manejo de componentes y navegacion por router.
- 1. implementacion de crud basico usuarios.
- 2. implementacion de cards y box de maquetacion.
- 3. redireccionamientos a otras paginas web.
- 4. manejo de iconos y modales.
- 5. implementación de formulario.
- 6. implementacion de crud basico vehiculos.
- 7. implementacion de crud basico reserva.
- 8. implementacion de facturacion y pagos.
- 9. Backend con node js.
- 10. Base de datos MONGO DB.

  # COLECCIONES MONGODB:
- bookings:
{
  "_id": {
    "$oid": "66187c4e9f422cfacf9daffa"
  },
  "userId": "6615f349836eed0b274c7b83",
  "vehicleId": "66187c3b9f422cfacf9dafef",
  "spaceId": "660df41487c9f9a89051cc0d",
  "dateStart": {
    "$date": "2024-04-12T00:11:58.096Z"
  },
  "dateEnd": {
    "$date": "2024-04-12T00:11:58.096Z"
  },
  "minuteValue": 50,
  "__v": 0
}
- spaces:
{
  "_id": {
    "$oid": "660df41487c9f9a89051cc0c"
  },
  "number": 1,
  "available": true
}

- users:
{
  "_id": {
    "$oid": "660defff87c9f9a89051cc09"
  },
  "rol": "Cliente",
  "email": "usuario@correo.com",
  "lastName": "Perez",
  "name": "Pedro"
}

- vehicules:
{
  "_id": {
    "$oid": "660defff87c9f9a89051cc01"
  },
  "plate": "ABC123",
  "brand": "Toyota",
  "model": "Corolla",
  "color": "GRIS",
  "userId": {
    "$oid": "660defff87c9f9a89051cc09"
  }
}

  # INICIAR PROYECTO:
  - 1. agregar cadena de conexion a mongo db
  - 1. desde la consola ejecutar npm install
  - 2. navegar desde la consola a la carperta /backend y ejecutar el comando: node server.js
  - 1. desde la consola ejecutar npm run dev


  # REFERENCIAS:
-  https://tailwindcss.com/docs/installation
-  https://tailblocks.cc/
-  https://www.material-tailwind.com/docs/react/carousel
-  

  # CONTACTO:

- Implementeción realizada por:
- Brayan  Alberto Castellanos Vargas
- https://github.com/brayanCas
- castellanosbrayan518@gmail.com