<h1 align="center">Instrucciones para correr el proyecto </h1>
*La carpeta es un workspace que contiene tanto el back como el front
*El backend esta hecho con nestJS
*El frontend con NextJS usando reactQuery
*Base de datos Mongo
*TypeScript

-----------###################################-----------------------

# Nos posicionmos dentro de cada carpeta y corremos el comando npm install
# Luego cada parte en un respectivo terminal lo corremos con npm star:dev (para NestJS) y npm dev para el caso de NextJS
# El archivo OSIRIS_BACKEND.json contiene el manifiesto de la API y sus rutas
# Se usa para el backend el Bearer Authentication
# Para la mayoria de las rutas se debe logear primero para obtener un token que debe ser enviado bajo la autorizacion Bearer

-------------------Estructura del backend-----------------------------
El backend se compone de "modulos" completamente individuales uno del otro
Cada módulo posee sus propios controladores, interfaces, servicios, schemas de bases de datos, DTOs y demás
Cada componente del módulo tiene un espacio de trabajo constituido por carpetas
Cada carpeta contiene un "indexador" que contiene registrado todo los archivos creados en dicho "espacio de trabajo"/carpeta
El módulo de base de datos, manejo de fechas, manejo de archivos y demás elementos casi globales estan presentes la carpeta de clases/servicios
Las respuestas intersistemas y de usuarios son manejadas por un grupo de interfaces localizados en la carpeta "Response"
Toda la arquitectura procura ser lo mas modular posible de esta forma el programador solo estará enfocado única y exclusivamente en el módulo donde esta "parado"
Si se requiere d un componente de otro módulo, para poder usarlo se requiere llevar todo el módulo en sí, ya que de esta forma se mantiene la intgridad y pulcritud de la arquitectura
Las funciones para manejo de base de datos tienen la función de abstraer lo mas que e pueda la forma en que se maneja esta, con el propósito de solo cambiar lo necesario a la hr de cambiar de base de datos
La carpeta guards se encarga de establecer las funciones de protección de rutas y estas solo manejan valores booleanos
La carpeta middleware contiene todos los middleware que prestan servicio en 2do plano al backend, tal como la paginación y cualquier otro servicio requerido mediante el request

-------------------Estructura del frontend-----------------------------
En esta se intento recrear un poco la misma arquitectura del back, pero mas simple; mantenindo la consistencia de ciertos tipos de datos manejados en el backend

<h2>Si desea saber mas como correr las partes del proyecto en cada espacio de trabajo existe un README.md propio de cada tecnologìa usada en el proyecto</h2>