<h2 align="center">Acerca de la esturcutra el proyecto </h2>
<p align="center">Aclaratoria: por motivos prácticos y evitar futuros errores en la entrega del proyecto 
decidí disolver el workspace y hacer cada carpeta un proyecto individual</p>

# -------------------Estructura del backend-----------------------------
<ul>
    <li> El backend se compone de "modulos" completamente individuales uno del otro</li>
    <li> Cada módulo posee sus propios controladores, interfaces, servicios, schemas de bases de datos, DTOs y demás </li>
    <li> Cada componente del módulo tiene un espacio de trabajo constituido por carpetas </li>
    <li> Cada carpeta contiene un "indexador" que contiene registrado todo los archivos creados en dicho "espacio de trabajo"/carpeta</li>
    <li> El módulo de base de datos, manejo de fechas, manejo de archivos y demás elementos casi globales estan presentes la carpeta de clases/servicios</li>
    <li> Las respuestas intersistemas y de usuarios son manejadas por un grupo de interfaces localizados en la carpeta "Response" </li>
    <li> Toda la arquitectura procura ser lo mas modular posible de esta forma el programador solo estará enfocado única y exclusivamente en el módulo donde esta "parado" </li>
    <li>Si se requiere de un componente de otro módulo, para poder usarlo se requiere llevar todo el módulo en sí, ya que de esta forma se mantiene la intgridad y pulcritud de la arquitectura</li>
    <li>Los métodoss para manejo de base de datos tienen la función de abstraer lo mas que se pueda la forma en que se maneja esta, con el propósito de solo cambiar lo necesario ante algún cambio de paradigma de bd, o sencillamente algún cambio en la forma de interactuar con la misma</li>
    <li>La carpeta guards se encarga de establecer las funciones de protección de rutas y estas solo manejan valores booleanos</li>
    <li>La carpeta middleware contiene todos los middleware que prestan servicio en 2do plano al backend, tal como la paginación y cualquier otro servicio requerido mediante el request</li>
</ul>

# -------------------Estructura del frontend-----------------------------
<p> En esta se intento recrear un poco la misma arquitectura del back, pero mas simple; mantenindo la consistencia de ciertos tipos de datos manejados en el backend </p>

<h2 align="center">  Rutas </h2>
<h2 align="center">Instrucciones</h2>
<ul>
    <li><h3>Backend:</h3></li><br>
    <li>1) Debido a que el workspace podría generar conflicto en un entorno nuevo se accedió a separar cada proyecto, es decir cada una contendrá su propio "node_modules" (para efectos prácticos por el pomento)</li>
    <li>2) Se recomienda instalar los paquetes del bakend/instanciar/correr primero el backend</li>
    <li>3) Para iniciar el backend, nos posicionamos en las carpeta correspondiente a través de la consola y escribimos yarn install ó npm install en el caso de usar uno u otro</li>
    <li>4) Al tener completado la instalación de paquetes, se procede a iniciar el proyecto usando el comando yarn start:dev ó npm start:dev</li>
    <li color="#45f">5) Se recomienda usar un solo gestor de paquetes bien sea yarn o nmp</li>
</ul>