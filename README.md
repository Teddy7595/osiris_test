<h2 align="center">Acerca de la esturcutra el proyecto </h2>
<p align="center">Aclaratoria: por motivos prácticos y evitar futuros errores en la entrega del proyecto 
decidí disolver el workspace y hacer cada carpeta un proyecto individual</p>

## ---------------- Tecnologías usadas en el proyecto ---------------- 
>NestJS (su última versión, julio 2021)
>MongoDB (su última version, julio 2021)
>NextJS (su última versión,  julio 2021)
>React (su última version,  julio 2021)
>TailwinCSS (su última versión,  julio 2021)
>TypeScript (su última versión,  julio 2021)

# ---------------- Estructura del backend ----------------
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

# ---------------- Estructura del frontend ----------------
<p> En esta se intento recrear un poco la misma arquitectura del back, pero mas simple; mantenindo la consistencia de ciertos tipos de datos manejados en el backend </p>

# ---------------- Rutas de la API ----------------
>Antes de continuar, se recomienta usar los formatos de petició mostrados ya que estos se basan en las interfaces y DTOs que componen la API
<br>
<ul>
    <li>Todas las rutas tendrán una interfaz de respuesta compuestas por :</li>
    <li><code>
        responseInterface 
        {
            ok             //determina si la operación fue o no exitosa
            status         //devuelve el codigo de respuesta de la API
            data           //devuelve la data o vacio de ser exitoso o no la petición
            message        //retorna el mensaje de respuesta de la API
            paginator      //retorna el estatus de la paginación del servicio
            err            //en caso de ocurrir algún error grave, dicha variable contendrá el mensaje con detalles del problema
        }
    </code</li>
    <li>La mayoria de las rutas necesitan un autenticación ó token para poder gozar de las funciones de cada servicio</li>
    <li>Para poder obtener el token solo necesita registrarse e iniciar sesión</li>
    <li>Para poder ser admin solo debe incluir un dominio @admin.com en su usuario Ej: usuario@admin.com</li>
    <li>Para poder tener un role de usuario registrado sin privilegios de administracion sólo deberá registrarse con el dominio de su preferencia Ej: usuario@gmail.com</li>
    <li>El token de autenticación contiene los datos de usuario (excepto la contrasña)</li>
    <li>Para usar el token si se usa "Insomnia" para prueba de APIS, en el apartado de de "Authentication" se escoge la verificacion Bearer, donde mostrará luego dos inputs; uno para introducir el token obtenido luego de iniciar sessión y el otro pedirá un "prefijo" que lo dejaremos en blanco</li> 
    <li>En caso de usar postman u otro, por favor revisar el manual de sus respectivos programas para poder usar dicho modo de autenticación</li>
    <li>Aunque para evitar posibles problemas en la importación del manifiesto de rutas, recomiendo usar INSOMNIA https://insomnia.rest/download </li>
    <li>
        <span>Composición de rutas, todas las rutas devolverán un dato bajo el responseInterface</span>
        <ul>
            <li><h4>En el apartado de producto tenemos:</h4></li>
            <li>GET:</li>
            <li>servidor/products/hello [solo verifica si la ruta esta disponible]</li>
            <li>servidor/products/?paginate=x [retorna todos los productos registrados mediante un painador]</li>
            <li>servidor/products/idProduct [retorna el producto especificado a través de si _id]</li>
            <li>servidor/products/purchase/history/idUSer [retorna el historial de compra através del id del usuario]</li>
            <br>
            <li>POST:</li>
            <li>servidor/products/ [guarda un producto en base de datos, se requiere de un nombre, stock, precio] Ej: 
                <br><code> 
                {
                    "name" :"TOMATES",
                    "stock":12,
                    "price": 1234.56
                }
                </code><br></li></li>
            <li>servidor/products/purchase [requiere un array de productos tomando su id, cantidad, y el id del usuario quien esta haciendo la compra] Ej: 
                <br><code> 
                {
                    "list":
                    [
                        {
                            "prod_id": "60f9b675061e5b1b43a6e0ad",
                            "qnty": 10
                        }
                    ],
	                "user_id": "60f8a65f7cbaa65a8710d585"
                }
                </code><br></li>
            <li>servidor/products/verify [requiere de un array de objetos con el id del producto y la cantidad para verificar la            disponibilidad de los mismos] Ej: 
                <br><code> 
                {
                    "list":
                    [
                        {
                            "prod_id": "60f9b675061e5b1b43a6e0ad",
                            "qnty": 10
                        }
                    ]
                }
                </code><br>
            </li>
            <li>servidor/products/upload/idProduct [sube una foto y toma el id del producto a través del query de la ruta para su posterior enlace con el producto en base de datos]</li>
            <li>PUT:</li>
            <li>servidor/products/idProduct [requiere de un objeto con los datos del producto y el id del producto pasado por el query de la ruta] Ej: 
                <br><code> 
                {
                    "name" :"ZANAHORIAS",
                    "stock":1200,
                    "price": 898989.56
                }
                </code><br>
            </li>
            <li>DELETE:</li>
            <li>servidor/products/idProduct [requiere el id del producto pasado por el query de la ruta para borrar logicamente un producto de la bd] </li>
        </ul>
        <ul>
            <li><h4>En el apartado de usaurios tenemos:</h4></li>
            <li>servidor/products/verify [requiere de un array de objetos con el id del producto y la cantidad para verificar la            disponibilidad de los mismos] Ej: 
                <br><code> 
                {
                    "name": "teddy",
                    "last_name": "pottella",
                    "email": "admin@admin.com",
                    "dir_domicilio":"lugar de domicilio",
                    "pass": "teddy7595"
                }
                </code><br>
            </li>
        </ul>
    </li>

</ul>

# ---------------- INSTRUCCIONES ----------------
>Debido a que el workspace podría generar conflicto en un entorno nuevo se accedió a separar cada proyecto, es decir cada una contendrá su propio "node_modules" (para efectos prácticos por el pomento)

>Se recomienda instalar/instanciar/correr primero el backend

<br>
<h3>Backend:</h3><br>
<ul>
    <li>1) Para iniciar el backend, nos posicionamos en las carpeta correspondiente a través de la consola y escribimos yarn install ó npm install en el caso de usar uno u otro</li>
    <li>2) Al tener completado la instalación de paquetes, se procede a iniciar el proyecto usando el comando *yarn start:dev ó npm start:dev*</li>
    <li>3) *Se recomienda usar un solo gestor de paquetes bien sea yarn o nmp* </li>
    <li>4) Seguir los modelos de rutas planteados en el apartado de RUTAS </li>
</ul>
<br>
<h3>Frontend:</h3><br>
<ul>
    <li></li>
</ul>