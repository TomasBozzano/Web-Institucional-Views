# WebInstituto
Proyecto institucional de comunicaciones de profesores, donde realizan las acciones de cursadas y finales. Lo que se pudo apreciar de este proyecto es como los datos pueden manipularse, mostrando la visualización y modificaciones de ellos, a traves de, distintas funciones que lleva a cabo el organismo 

# Como iniciarlo
Debemos tener el cuenta que la DB que se utiliza es MICROSOFT ACCESS 2000, en donde es personal en cada PC, para ello, debemos cambiar los datos de nuestra variable de entorno, en nuestro DB ↓ y luego iniciarlo desde la consola con el comando "npm start". 

# Verificar DB
Cada uno deberá dirigirse al archivo .env para cambiar el valor de la ruta, con el de su PC, ejemplo : "C:\Users\tomyc\Downloads" en el punto SOURCE

# Servicio continuo por errores
pm2 start tu_archivo_de_inicio.js
pm2 startup //para generar un script de inicio
pm2 save //Para guardar la configuración actual
pm2 stop tu_archivo_de_inicio.js //frenar la ejecución

# Herramientas que se utilizan en el proyecto
-Html
-Css
-JavaScript
-Node js (Comunicación con servidor) =>(
    Dependencias:
            Express
            Morgan
            Nodemon
            DotEnv
            pm2 -g
)
-Microsoft Access (DB)