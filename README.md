RETAIL - PARTE - FRONTEND

FRONTEND RETAIL Consideraciones: Para la realización de este reto he utilizado tecnología angular específicamente la version 10. También hemos utilizado angular material. PASO 1: Para desplegar el aplicativo necesitamos restaurar la carpeta node_modules con el comando npm install.

PASO 2: Para visualizarlo en el navegador utilizamos el comando ng start adicionando lo siguiente en el archivo package.json: set NODE_OPTIONS=--openssl-legacy-provider && ng serve para solucionar temas de imcompatibilidad y con en la url http://localhost:4200/ podremos ver corriendo el proyecto.

PASO 3: Para probar utilizaremos un usuario y contraseña que lo creamos en la parte backend.

De ser correcto nos mostrara un dashboard con un formulario para registrar clientes.

PASO 4: De ser el login incorrecto nos mostrar una alerta con mensaje de error 400.

PASO 5 : Tenemos la opcion de cerrar la sesion para terminar nuestra sesion.