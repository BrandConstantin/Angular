<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Teslo API

1. Clonar proyecto
2. `yarn install`
3. Clonar el archivo `.env.template` y renombrarlo a `.env`
4. Cambiar las variables de entorno
5. Levantar la base de datos

```
docker-compose up -d
```

6. Levantar:

```
npm run start:dev
yarn start:dev

```

7. Ejecutar SEED

```
http://localhost:3000/api/seed
```

  this.tempImages.set(imageUrls);
}
```

## Aprovisionar la BBDD
* Base de datos en Postgres: https://neon.com/
  * Se crea proyecto y luego en apartado Connect se copia la cadena de conexión de tipo ```psql 'postgresql://neondb_owner:npg_XXXXX```
  * Cambiar en el proyecto nest el package.json -> engine -> la versión de node a la más superior
* Desplegar en producción, en netifly o render: https://render.com/
  * Escogemos desplegar un web service
