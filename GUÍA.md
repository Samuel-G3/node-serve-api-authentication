1- CREAR CARPETA:

-  crear carpeta: mkadir <nombre carpeta>
-  entrar a carpeta: cd <nombre carpeta>
-  npm init -y   --> esto crea package .json
-  abrirla en Visual Code


2- CREAR ESTRUCTURA DE CARPETAS:

-  crear carpeta 'src' a nivel global
-  dentro de 'src' crear carpeta 'api'
-  dentro de 'api' crear dos carpetas: 'models' y 'routes'
-  dentro e 'utils' crear carpeta 'database' para conexion a base de datos  
-  crear fichero 'index.js' a nivel global
-  crear '.gitignore' y poner: '/node_modules' y '.env'
  

3- INSTALAR DEPENDENCIAS:

- 3.1 en la terminal instalar:
 
    - npm i express          <!--librería/framework sobre el que trabajamos-->
    - npm i mongoose         <!--método de esta librería para trabjar sobre nuestra base de datos con mongo-->
    - npm i cors             <!--cabeceras y http-->
    - npm i dotenv           <!--coger variables de entorno y configuración-->
    - npm i body-parser      <!---->
 
    - npm i nodemon -D       <!--liveserver que escucha continuamente-->
    - npm i morgan -D        <!--visualizar cuando lanzo datos-->  
  
- 3.2 en package.json sustiruir por:  
   
    - "scripts": {
            "start": "node index.js",     <!--levantar con NODE puro-->   
             "dev": "nodemon index.js"    <!--levatar la version de desarrollo-->
        },
    - "version": "0.0.0" 
    - "description": "CRUD Node Server",  <!--Create, Read, Update, Delete-->


4- CREAR VARIABLE DE ENTORNO (antes crear mongo atlas):

- crear nuevo archivo '.env' a nivel global y añadir:

    MONGO_DB= <!--creada en Mongo Atlas. Sustituir por mi constraseña, ussuario y collección-->
    PORT=5000

<!-- en Mongo Atlas: 
      - IP Address: 0.0.0.0/0
      - Description: Global-->


5- CREAR 'db.js' 

- dentro de 'database'  <!--este fichero SIEMPRE es igual para toas las APIs-->


6- index.js

- configurar el server
- no cors
- requerir puerto
- definir manejador de errores


7- Levantamos Server para comprobar si conecta a la base da datos


8- empezar a trabajar con models

- crear Schemas 
- exportar

9- crear rutas y populate

10- en 'index.js' crear links api 

11- crear nuestras rutas en 'index.js'